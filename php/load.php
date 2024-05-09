<?php

include("./config.php");
include("./Classes.php");
//include("./Functions.php");

header("Access-Control-Allow-Origin:http://localhost:3000");
header("Access-Control-Allow-Methods:GET,POST");
header("Access-Control-Allow-Headers:Content-Type, Authorization");

try {

    switch ($_SERVER["PATH_INFO"]) {
        case "/loadCategory":
            $db_obj = new db(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
            $dbCon = $db_obj->connect();
            $selectCmd = "SELECT cname, cid FROM category_tb";
            $result = $dbCon->query($selectCmd);

            $output = [];
            while ($row = $result->fetch_assoc()) {
                array_push($output, $row);
            }
            $db_obj->db_close();
            echo json_encode($output);
            break;

        case "/regProduct":

            $jsonData = file_get_contents('php://input');
            $data = json_decode($jsonData, true);

            $fileUpload = new fileUpload($_FILES["image"], "./data/productsImg", 400000);
            $fileAddress = $fileUpload->commitUpload();

            $db_obj = new db(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
            $dbCon = $db_obj->connect();
            $insertCmd = $dbCon->prepare("INSERT INTO product_tb (pname, category_id, price, description) VALUES (?,?,?,?)");
            $insertCmd->bind_param("sids", $_POST["pname"], $_POST["category_id"], $_POST["price"],  $_POST["description"],);


            if ($insertCmd->execute()) {
                $selectCmd = "SELECT max(pid) as pid FROM product_tb";
                echo $selectCmd;
                $result = $dbCon->query($selectCmd);
                $row = $result->fetch_assoc();
                $pid = $row['pid'];
                if ($result->num_rows < 0) {
                    throw new Exception("No info", 500);
                } else {
                    $insertCmdImg = $dbCon->prepare("INSERT INTO product_img_tb ( img_addr, pid) VALUES (?, ?)");
                    $insertCmdImg->bind_param("si", $fileAddress, $pid);
                    if ($insertCmdImg->execute()) {
                        sendHttp_Code(201, "Product added");
                    } else {
                        throw new Exception("Product not stored");
                    }
                }
            } else {
                throw new Exception("Product not stored");
            }
            $db_obj->db_close();

            break;

        case "/loadProducts":
            $db_obj = new db(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
            $dbCon = $db_obj->connect();
            $selectCmd = "SELECT pro.pid as pid, pname, description, price, img_addr
                            FROM product_tb pro
                            LEFT JOIN category_tb cat ON pro.category_id = cat.cid
                            LEFT JOIN product_img_tb pimg ON pimg.pid = pro.pid
                            WHERE 1=1
                            AND (pro.category_id = ? OR ? = 0)
                            ORDER BY pid DESC";
            $runSelectCmd = $dbCon->prepare($selectCmd);
            $runSelectCmd->bind_param("ii", $_GET['cid'], $_GET['cid']);
            $runSelectCmd->execute();
            $result = $runSelectCmd->get_result();

            $output = [];
            while ($row = $result->fetch_assoc()) {
                array_push($output, $row);
            }
            $db_obj->db_close();
            echo json_encode($output);
            break;
    }
} catch (Exception $err) {
    sendHttp_Code($err->getCode(), $err->getMessage());
    echo $err->getMessage();
}
