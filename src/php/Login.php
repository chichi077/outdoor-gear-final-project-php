
// header("Access-Control-Allow-Origin: *");
// header("Content-Type: application/json; charset=UTF-8");
// header("Access-Control-Allow-Methods: POST");
// header("Access-Control-Max-Age: 3600");
// header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// $data = json_decode(file_get_contents('php://input'), true);
// $email = $data['email'];
// $password = $data['password'];

// // Here you would typically check the email and password against your database
// // For simplicity, we're just checking if they match a certain string
// if ($email == 'test@test.com' && $password == 'password') {
//     http_response_code(200);
//     echo json_encode(array("message" => "Login successful."));
// } else {
//     http_response_code(401);
//     echo json_encode(array("message" => "Login failed."));
// }

<?php
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "outdoor_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Assume you have JSON data like this
$json = '{"email":"test@test.com","password":"password"}';

// Decode the JSON data to a PHP array
$data = json_decode($json, true);

// Prepare an SQL statement
$stmt = $conn->prepare("INSERT INTO users (email, password) VALUES (?, ?)");

// Bind the email and password from the decoded JSON data to the SQL statement
$stmt->bind_param("ss", $data['email'], $data['password']);

// Execute the SQL statement
$stmt->execute();

echo "New record created successfully";

$stmt->close();
$conn->close();
?>
