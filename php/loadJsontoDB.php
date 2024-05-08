<?php
include("./config.php");

$file = fopen("../backend_data/users_tb.json", "r") or die("Unable to open the file.");
$data = fread($file, filesize("../backend_data/users_tb.json"));
fclose($file); // Good practice to close the file after reading
$data = json_decode($data, true); // Decode as an associative array

$db = new mysqli(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
if ($db->connect_error) {
    die("Connection error: " . $db->connect_error);
}

foreach ($data as $item) {
    $insertCmd = $db->prepare("INSERT INTO user_tb (uid, first_name, last_name, email, password, user_type, attempt) VALUES (?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE first_name = VALUES(first_name), last_name = VALUES(last_name), email = VALUES(email), password = VALUES(password), user_type = VALUES(user_type), attempt = VALUES(attempt)");
    $insertCmd->bind_param("isssssi", $item['uid'], $item['first_name'], $item['last_name'], $item['email'], $item['password'], $item['user_type'], $item['attempt']);
    $insertCmd->execute();
}

$insertCmd->close();
$db->close();

?>
