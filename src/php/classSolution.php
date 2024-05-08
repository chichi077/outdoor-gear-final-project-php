<?php
    require("./classes.php");
    
    try{
         // block of code which may throw exception
        if ($_SERVER["REQUEST_METHOD"]!="POST"){
            throw new Exception("Invalid Request Method",405);
        }

        if(isset($_POST["id"])){
            Session_handler($_POST["id"]);
        }

        switch ($_SERVER["PATH_INFO"]) {
            case "/reg":
                $postKey=["firstName","lastName","email","isAdmin","password"];
                check_key($postKey,$_POST);
              
                    $dbObj=new DB(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
                    $dbCon = $dbObj->connect(); // connect to the database
                    $pass =password_hash($_POST['pass'],PASSWORD_BCRYPT,['cost'=>10]);
                    // select [col_names|*] from  user_tb where condition 
                    $selectCmd = "SELECT * FROM user_tb WHERE email='".$_POST['email']."'";


                    //This line executes the SQL query on the database using the query method of the
                    // $dbCon object, which is presumably a connection to the database. 
                    //The result of the query is stored in the $result variable.
                    $result = $dbCon->query($selectCmd); // execute the sql statement


                    //This line checks if the number of rows returned by the query is greater than 0. 
                    // If it is, that means a user with the provided email already exists in the database.
                    if($result->num_rows>0){ 
                        // print_r("num_row".$result->num_rows);
                        $dbObj->db_close();
                        Audit_generator("Registration","Failed","User already exists",$_POST["email"]);
                        throw new Exception("Register failed",406);
                    }

                    $insertCmd = "INSERT INTO user_tb (firstName,lastName,email,pass) VALUES ('".$_POST['firstName']."','".$_POST['lastName']."','".$_POST['email']."','".$pass."',".$_POST['isAdmin'].")";
                    $insertCmd = $dbCon -> prepare("INSERT INTO user_tb (firstName,lastName,email,isAdmin,password) VALUES (?,?,?,?,?)"); // prepare the sql statement
                    $insertCmd -> bind_param("sssss",$_POST['firstName'],$_POST['lastName'],$_POST['email'],$pass,$_POST['isAdmin']); // bind the parameters

                    $insertCmd -> execute(); // execute the sql statement
                    $dbObj->db_close();

                   
                    Audit_generator("Registration","Success","User Registered",$_POST["email"]);
                    sendHttpCode(201,"\nusers added");
                 

           
                break;
                
            case "/login":
                check_key(["email", "pass"],$_POST);
                $userObj = new User($_POST["email"]);
                echo $userObj->authenticate($_POST["pass"]);
            break;

            case "/info":
                if(session_status()===PHP_SESSION_NONE) throw new Exception("Forbiden request.",401);
                print_r($_SESSION["login_user"]->display_info());
            break;
            case "/users":
                //send a json output containing the information of all books
                $db = new DB(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
                $dbCon = $db->connect();
                $selectCmd = "SELECT * FROM users_tb";
                $result = $dbCon->query($selectCmd);
                //show it in the json format
                $output = [];
                while($row = $result->fetch_assoc()){
                    array_push($output,$row);
                }
                // sent to the fortent end?
                $db->db_close();
                echo json_encode($output);
                break;
            // to read a line of file 
            // when user send a request to /audit display the list of available audits based on date
            // after user send "$_POST[date]" post key to /audit, display the audit record in json format 

            // user shall be login to access this path
             
            case "/audit":
                if (session_status() === PHP_SESSION_NONE) throw new Exception("Forbiden request.", 401);
                header("Content-Type: application/json");
                
                $fileRoute = AUDIT_PATH;
              
                if (isset($_POST["date"])){
                    $date = $_POST["date"];
                    echo Audit_parseJson($date);
                }else{
                    $allFiles =listFolderFiles($fileRoute);
                
                    print_r($allFiles);
                }
              
                break;
            //     case "/upload":
            //     //    enctype = "multipart/form-data"
            //        check_key(["bid"],$_POST);
            //         $fileUpload = new fileUpload($_FILES["file1"],"./data/userFiles",5000000);
            //         $img_addr = $fileUpload->commitUpload();
            //         $db = new DB(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
            //         $dbCon = $db->connect();                    
            //         $insertCmd ="INSERT INTO book_img_tb (bid,img_addr) VALUES (".$_POST["bid"].
            //         ",'$img_addr')";
            //         if($dbCon->query($insertCmd)===TRUE){
            //             sendHttp_Code(201,"Image added at $img_addr");
            //             $db->db_close();
            //         }else{
            //             $db->db_close();
            //             throw new Exception("Image upload failed",500);
            //         }
            //         break;
            //         case "/binfo":
            //             check_key(["bid"],$_POST);
            //             $db = new DB(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
            //             $dbCon = $db->connect();
            //             $joinCmd = "SELECT * FROM book_tb LEFT JOIN book_img_tb ON book_tb.bid = 
            //             book_img_tb.bid WHERE book_tb.bid=".$_POST["bid"];
            //             $result = $dbCon->query($joinCmd);
            //             if($result->num_rows<0){
            //                 throw new Exception("No book info",500);
            //             }
            //             $output = [];
            //             while($book_data = $result->fetch_assoc()){
            //                 array_push($output,$book_data);
            //             }
            //             sendHttp_Code(200,json_encode($output));

            // default:
            //     throw new Exception("Invalid Path",400);
            //     break;
        }

    }
    catch(Exception $err){
        //block of code which will handle the exception
        echo "Exception caught";
        sendHttpCode($err->getCode(),$err->getMessage());
    }
 

?>