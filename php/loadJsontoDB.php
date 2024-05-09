<?php
include("./config.php");

// Establish database connection
$db = new mysqli(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
if ($db->connect_error) {
    die("Connection error: " . $db->connect_error);
}

// Define paths to your JSON files
$files = [
    "users" => "../backend_data/users_tb.json",
    "categories" => "../backend_data/category_tb.json",
    "product_images" => "../backend_data/product_img_tb.json",
    "products" => "../backend_data/product_tb.json"
];

// Process each file
foreach ($files as $type => $filepath) {
    if (file_exists($filepath)) {
        $data = json_decode(file_get_contents($filepath), true);
        if ($data === null) {
            continue; // Skip if data is not valid JSON
        }

        switch ($type) {
            case "users":
                foreach ($data as $item) {
                    $insertCmd = $db->prepare("INSERT INTO user_tb (uid, first_name, last_name, email, password, user_type, attempt) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE first_name=VALUES(first_name), last_name=VALUES(last_name), email=VALUES(email), password=VALUES(password), user_type=VALUES(user_type), attempt=VALUES(attempt)");
                    $insertCmd->bind_param("isssssi", $item['uid'], $item['first_name'], $item['last_name'], $item['email'], $item['password'], $item['user_type'], $item['attempt']);
                    $insertCmd->execute();
                }
                break;

            case "categories":
                foreach ($data as $item) {
                    $insertCmd = $db->prepare("INSERT INTO category_tb (cid, cname) VALUES (?, ?) ON DUPLICATE KEY UPDATE cname=VALUES(cname)");
                    $insertCmd->bind_param("is", $item['cid'], $item['cname']);
                    $insertCmd->execute();
                }
                break;

            case "product_images":
                foreach ($data as $item) {
                    $insertCmd = $db->prepare("INSERT INTO product_img_tb (p_img_id, pid, img_addr) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE img_addr=VALUES(img_addr)");
                    $insertCmd->bind_param("iis", $item['p_img_id'], $item['pid'], $item['img_addr']);
                    $insertCmd->execute();
                }
                break;

            case "products":
                foreach ($data as $item) {
                    $insertCmd = $db->prepare("INSERT INTO product_tb (pid, pname, category_id, `desc`, price) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE pname=VALUES(pname), category_id=VALUES(category_id), `desc`=VALUES(`desc`), price=VALUES(price)");
                    $insertCmd->bind_param("isisd", $item['pid'], $item['pname'], $item['category_id'], $item['desc'], $item['price']);
                    $insertCmd->execute();
                }
                break;
        }
    } else {
        echo "File not found: $filepath";
    }
}

$db->close();
?>