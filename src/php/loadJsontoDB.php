<?php
    include("./config.php");
    $file = fopen(".public/data/users.json" ,"r") or die("Unable to open the file.");
    $data = fread($file,filesize("./data/users.json"));
    $data = json_decode($data);
    $db = new mysqli(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
    if($db->connect_error){
        die("Connection error.");
    }
    foreach($data as $item){
        $insertCmd = $db->prepare("INSERT INTO outdoor_tb (uid,fname,lname,email,password,user_type,attempt)
        VALUES (?,?,?,?,?,?,?)");
        $insertCmd->bind_param("sssssss",$item->uid,$item->fname,$item->lname,$item->email,$item->password,
        $item->user_type,$item->attempt);
        $insertCmd->execute();
    }
    $db->close();
    ?>