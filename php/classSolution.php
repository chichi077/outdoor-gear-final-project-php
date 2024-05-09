<?php                                                                                    
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
    require("./classes.php");
    try{

        if($_SERVER["REQUEST_METHOD"]!="POST"){
                throw new Exception("Invalid request method",405);
            }
        
        if(isset($_POST["sid"])){
            Session_Hanlder($_POST["sid"]);
        }
        switch($_SERVER["PATH_INFO"]){
            // case "/reg":
            //     check_key(["fname", "lname", "email", "password","user_type"], $_POST);
            //     $dbobj = new DB(DB_SERVER_NAME, DB_USER_NAME, DB_PASSWORD, DB_NAME);
            //     $dbCon = $dbobj->connect();
            //     $selectCmd = "SELECT email FROM user_tb WHERE email='".$_POST["email"]."'";
            //     $result = $dbCon->query($selectCmd);
            //     if($result->num_rows > 0) {
            //         $dbobj->db_close();
            //         Audit_generator("Registeration", "Failed", "User email already exsits.",
            //         $_POST["email"]);
            //         throw new Exception("Registeration Failed", 406);
            //     }
            //     switch(strtolower($_POST["user_type"])){
            //         case "staff":
            //             $user_type = 1;
            //         break;
            //         case "customer":
            //             $user_type = 2;
            //         break;
            //         case "admin":
            //             $user_type = 3;
            //         break;
            //         default:
            //             throw new Exception("Invalid user_type choose from 'staff', 'customer', 'admin'",406);
            //     }
                
            //     $password = password_hash($_POST["password"], PASSWORD_BCRYPT, ["cost"=>10]);   //hash and salt
            //     $insertCmd =$dbCon->prepare("INSERT INTO user_tb (fname, lname, email, password, user_type) VALUES (?,?,?,?,?)");
            //     $insertCmd->bind_param("ssssi", $_POST["fname"], $_POST["lname"], $_POST["email"], $password, $user_type);
            //     $insertCmd->execute();
            //     $db_obj->db_close();
            //     Audit_generator("registeration","success","User registered.",$_POST["email"]);
            //     sendHttp_Code(201,"Record added!");
            // break;
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
    }catch(Exception $err){
        sendHttp_Code($err->getCode(),$err->getMessage());
    }
    
?>