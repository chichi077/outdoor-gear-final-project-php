<?php
    require("./Classes.php");

    try{
        if($_SERVER["REQUEST_METHOD"]!="POST"){
            throw new Exception("Invalid request method",405);
        }
        if(isset($_POST["sid"])){
            Session_Hanlder($_POST["sid"]);
        }
    switch($_SERVER["PATH_INFO"]){
        case "/reg":
            check_key(["fname", "lname", "email", "pass"], $_POST);
            $fileObj = new File("./data");
            $prevUsers = ($fileObj->readFile("users.json"))?json_decode($fileObj->readFile("users.json")):false;
            $uid = (!$prevUsers)?1:count($prevUsers)+1;
            $pass = password_hash($_POST["pass"],PASSWORD_BCRYPT,["cost"=>10]); //salt and hash
            $fileObj->writeFile("users.json",["id"=>$uid,"fname"=>$_POST["fname"],"lname"=>$_POST["lname"],"email"=>$_POST["email"],"pass"=>$pass,"attempt"=>ATTEMPT_LIMIT]);
            Audit_generator("registeration","success","User registered.",$_POST["email"]);
            sendHttp_Code(201,"Record added!");
        break;
        case "/login":
            check_key(["email", "pass"],$_POST);    //check is correct or not
            $userObj = new User($_POST["email"]);   //use __construct() and initialized objects
            echo $userObj->authenticate($_POST["pass"]);
        break;
    }
    }catch(Exception $err){
        sendHttp_Code($err->getCode(),$err->getMessage());
    }
?>