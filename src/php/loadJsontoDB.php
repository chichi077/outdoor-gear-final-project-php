<?php
// Allow requests from any origin - not recommended for production
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With, Authorization');
header('Access-Control-Allow-Credentials: true');
// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Should return HTTP 200 status code
    http_response_code(200);
    exit;
}

    include("./config.php");

    

    $file = fopen("../../public/data/users.json" ,"r") or die("Unable to open the file.");
    $data = fread($file,filesize("../../public/data/users.json"));
    $data = json_decode($data);
    $db = new mysqli(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
    if($db->connect_error){
        die("Connection error.");
    }
    foreach($data as $item){
        $insertCmd = $db->prepare("INSERT INTO user_tb (id,firstName,lastName,email,isAdmin,password)
        VALUES (?,?,?,?,?,?)");
        $insertCmd->bind_param("isssss",$item->id,$item->firstName,$item->lastName,$item->email,$item->isAdmin,$item->password
        );
        $insertCmd->execute();
    }
    $db->close();

    echo exec('whoami');
    ?>