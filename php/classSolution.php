<?php
    require("./classes.php");
    require("./config.php");
    
    try{
         // block of code which may throw exception
        if ($_SERVER["REQUEST_METHOD"]!="POST"){
            throw new Exception("Invalid Request Method",405);
        }

        if(isset($_POST["id"])){
            Session_handler($_POST["id"]);
        }

        switch($_SERVER["PATH_INFO"]){
            case "/reg":
                check_key(["first_name", "last_name", "email", "password"], $_POST);
                $dbobj = new DB(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
                $dbCon = $dbobj->connect();
                $selectCmd = "SELECT email FROM user_tb WHERE email='".$_POST["email"]."'";
                $result = $dbCon->query($selectCmd);
                if($result->num_rows > 0) {
                    $dbobj->db_close();
                    Audit_generator("Registeration", "Failed", "User email already exsits.",
                    $_POST["email"]);
                    throw new Exception("Registeration Failed", 406);
                }
                
                $password = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost"=>10]);   //hash and salt
                
                $insertCmd =$dbCon->prepare("INSERT INTO user_tb (first_name, last_name, email, password, isAdmin) VALUES (?,?,?,?,0)");
                $insertCmd->bind_param("ssss", $_POST["first_name"], $_POST["last_name"], $_POST["email"], $password);
                $insertCmd->execute();
                $dbobj->db_close();
                Audit_generator("registeration","success","User registered.",$_POST["email"]);
                sendHttpCode(201,"Record added!");
            break;
            case "/login":
                check_key(["email", "password"],$_POST);    //check is correct or not
                $userObj = new User($_POST["email"]); //use __construct() and initialized objects
                echo $userObj->authenticate($_POST["password"]);
            break;
            case "/logout";
            case "/info":
                if(session_status()===PHP_SESSION_NONE) throw new Exception("Forbiden request.",401);   //session_status() show session is active or not. PHP_SESSION_NONE means session is unactive
                echo($_SESSION["login_user"]->display_info());  //change to json file and return
            break;
            case "/audit":
                $file = new File("./data/audit/Audit".$_POST["date"]."txt");
                $fileObj = new File("./data");//use __construct() and initialized objects
                $auditData = ($fileObj->readFile($file)) ? json_decode($fileObj->readFile($file), true) : [];
                $auditline = explode(",", $auditData);
                print_r($auditline);
        break;
        default:
            throw new Exception("Invalid path",400);
        }
    }
    catch(Exception $err){
        //block of code which will handle the exception
        echo "Exception caught";
        sendHttpCode($err->getCode(),$err->getMessage());
    }
 

?>