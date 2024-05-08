<?php
// require("./config.php");
require("./Functions.php");
require("./Enc.php");


    class File{
        private $src_addr;
        private $fileAddr;
        function __construct($src_addr)
        {
            $this->src_addr = $src_addr;
        }

        function readFile($fileName){
            $this->fileAddr = $this->src_addr."/$fileName"; //this is key point 
            if(file_exists($this->fileAddr)){
                $file = fopen($this->fileAddr,"r");
                $data = fread($file,filesize($this->fileAddr));
                fclose($file);
                return $data;
            }else{
                return false;
            }
        }
        function writeFile($fileName,$data,$hardWrite = false){ //to write on File
            $this->fileAddr = $this->src_addr."/$fileName";
            $writeFlag = "w";
            if(file_exists($this->fileAddr) && !$hardWrite){
                $extension = explode(".",$fileName)[1]; //devide by . and select the 2nd stuff
                    switch(strtolower($extension)){ //strtolower($extension) means to change lowercase
                        case "txt":
                            $writeFlag = "a";
                        break;
                        case "json":
                            $this->writeJSON($fileName,$data);
                            return 0;
                    }
            }
                $file = fopen($this->fileAddr,$writeFlag);
                fwrite($file,(is_array($data))?json_encode([$data]):$data); //(is_array($data)) means to check $data is array or not if not-> chamge to Array from json
                fclose($file);
        }
        private function writeJSON($fileName,$data){    //to write in Json 
            $prevData = json_decode($this->readFile($fileName));
            array_push($prevData,$data);    //add the $data at the end of $prevData
            $this->writeFile($fileName,json_encode($prevData),true);
        }
    }
    class User{ 
        private $id;
        private $fname;
        private $lname;
        private $email;
        private $user_type;
        function __construct($email)    //it happens automatically and intilazied objects when new instance is created
        {
            $this->email = $email;
        }
        function authenticate($password){
            $dbObj  =new DB(DB_SERVER_NAME, DB_USER, DB_PASSWORD, DB_NAME);
            $dbCon = $dbObj->connect(); //conect to database
            $selectCmd = "SELECT * FROM user_tb WHERE email='".$this->email."'";
            $result = $dbCon->query($selectCmd);
            $attempt = null;
            if($result->num_rows > 0){ 
                $row = $result->fetch_assoc();
                switch($row["user_type"]){
                    case 1:
                        $user_typeDB = "staff";
                    break;
                    case 2:
                        $user_typeDB = "customer";
                    break;
                    case 3:
                        $user_typeDB ="admin";
                    break;
                    default:
                        throw new Exception("Some trouble about user_type on DataBase");
                }
                $attempt = $row["attempt"];
                if($row["attempt"] == 0) {
                    Audit_generator("login","failed","User account locked.",$this->email);
                    throw new Exception("There is a problem logging in, please contact the system admin.",401);
                }
                if(password_verify($password, $row["$password"])){
                    $loginFlag = true;
                    $attempt = 5;
                    $this->fname = $row["fname"];
                    $this->lname = $row["lname"];
                    $this->user_type = $user_typeDB;    //$this->user_type is already converted to lowercase
                    $this->id = $row["uid"];
                    session_start();
                    $_SESSION["login_user"] = $this;    //Question!!,
                    $_SESSION["time_out"] = time() + TIME_OUT;
                    Audit_generator("login","success","User login via password.",$this->email);
                }else{
                    $attempt -= 1;
                    $loginFlag = "pass";
                }
                // to update  "UPDATE [table name] SET [col_name] = new_value, WHERE condition"
                $updateCmd = "UPDATE user_tb SET attempt = $attempt WHERE uid=".$row["uid"];
                $dbCon ->query($updateCmd);
                $dbObj->db_close();
            }else {
                $loginFlag = "email";
            }

            if($loginFlag!==true) {
                switch($loginFlag){ //if failed to login 
                    case "email":
                        Audit_generator("login","failed","Invalid email address.",$this->email);
                        throw new Exception("Username/Password Wrong.",401);
                    case "pass":
                        Audit_generator("login","failed","Invalid password. Attempts(".$attempt.")",$attempt);
                        throw new Exception("Username/Password Wrong.",401);
                } 
            }
            
            return session_id();
        }
        function display_info(){
            return json_encode(["uid"=>$this->id, "fname"=>$this->fname, "lname"=>$this->lname,"email"=>$this->email]);
        }
    }
    class DB {
        private $db_hostname;
        private $db_userName;
        private $db_password;
        private $db_name;
        private $db_connect;
        function __construct($db_hostname, $db_userName, $db_password, $db_name) {
            $this->db_hostname = $db_hostname;
            $this->db_userName = $db_userName;
            $this->db_password = $db_password;
            $this->db_name = $db_name;
        }
        function connect() {
            $dbCon = new mysqli($this->db_hostname, $this->db_userName, $this->db_password, $this->db_name);
            if($dbCon->connect_error) {
                throw new Exception("DB connection failed", 500);
            }
            $this->db_connect = $dbCon;
            return $dbCon;
        }

        function db_close() {
            $this->db_connect->close();
        }
    }


    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
?>