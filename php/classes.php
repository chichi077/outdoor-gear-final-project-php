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

//    require("./config.php");
   require("./function.php");

   
    class File{
        private $src_addr;
        private $fileAddr;
        function __construct($src_addr)
        {
            $this->src_addr = $src_addr;
        }
        function readFile($fileName){
            $this->fileAddr = $this->src_addr."/$fileName";
            if(file_exists($this->src_addr."/$fileName")){
                $file = fopen($this->fileAddr,"r");
                $data = fread($file,filesize($this->fileAddr));
                fclose($file);
                return $data;
            }else{
                return false;
            }

        }

        function listFiles()
        {
            $files = scandir($this->src_addr); // get all files in the directory
            $files = array_diff($files, array(".", "..")); 
            $files = array_values($files);
            $files = implode("\n", $files); //  dispaly the files name line by line
            return $files;
        }

        function writeFile($fileName,$data,$hardWrite = false){
            $this->fileAddr = $this->src_addr."/$fileName";
            $writeFlag = "w";
            if(file_exists($this->fileAddr) && !$hardWrite){
                $extension = explode(".",$fileName)[1];
                    switch(strtolower($extension)){
                        case "txt":
                            $writeFlag = "a";
                        break;
                        case "json":
                            $this->writeJSON($fileName,$data);
                            return 0;
                        break;
                    }
            }
                $file = fopen($this->fileAddr,$writeFlag);
                fwrite($file,(is_array($data))?json_encode([$data]):$data);
                fclose($file);
        }
        private function writeJSON($fileName,$data){
            $prevData = json_decode($this->readFile($fileName));
            array_push($prevData,$data); // add the new data to the array
            $this->writeFile($fileName,json_encode($prevData),true);
        }
    }
    //book system
    class User {
        private $uid;
        private $first_name;
        private $last_name;
        private $email;
        private $isAdmin;
        private $user_type;
        private $attempt;
        

        function __construct($email)
        {
          
            $this->email = $email;
         
        }

        function authenticate($pass){
            $dbObj = new DB(DB_SERVER_NAME,DB_USER_NAME,DB_PASSWORD,DB_NAME);
            $dbCon=$dbObj->connect();
            $selectCom = "SELECT * FROM user_tb WHERE email='".$this->email."'";
            // $result = $dbCon->query($selectCmd); // 找不到selectCmd
            $result = $dbCon->query($selectCom); // execute the sql statement
            $attempt=null;
            if ($result->num_rows > 0){

                $row = $result->fetch_assoc(); // fetch the result as an associative array ["fna,e"=> "Natalia",
                // "lname"=>"something",...];
                $attempt = $row['attempt'];
                if($row['attempt']==0){
                    Audit_generator("login","failed","User account locked.",$this->email);
                    throw new Exception("There is a problem logging in, please contact the system admin.",401);
                }
                if(password_verify($pass,$row['pass'])){
                    $loginFlag = true;
                    $attempt =5;
                    $this->first_name = $row['first_name'];
                    $this->last_name = $row['last_name'];
                    $this->isAdmin = $row['isAdmin'];
                    $this->user_type = $row['user_type'];
                    $this->attempt = $attempt;
                    $this->uid = $row['uid'];
                    session_start();
                    $_SESSION["login_user"] = $this;
                    $_SESSION["time_out"] = time() + TIME_OUT;
                    Audit_generator("login","success","User login via password.",$this->email);
                }else{
                    $attempt -= 1;
                    $loginFlag = "pass";
                    //刪除
                    // Audit_generator("login","failed","Invalid password.",$this->email);
                    // throw new Exception("Username/Password Wrong.",401);
                }
       
               //UPDATE [table_name] SET [column_name] = new_value, [col2_name] =new_value2 WHERE condition
               $updateCmd = "UPDATE user_tb SET attempt = $attempt WHERE id = ".$row['uid'];
               $dbCon->query($updateCmd);
               $dbObj->db_close();

            }else{
                $loginFlag = "email";
            }
            if($loginFlag!==true){
                switch($loginFlag){
                    case "email":
                        Audit_generator("login","failed","Invalid email address.",$this->email);
                        throw new Exception("Username/Password Wrong.",401);
                        break;
                    case "pass":
                        Audit_generator("login","failed","Invalid password. Attempts(".$attempt.")",$this->email);
                        throw new Exception("Username/Password Wrong.",401);
                    break;
                } 
            }
              
            return session_id();
                                        // foreach($prevUsers as $user){
                                        //     if($user->email == $this->email){
                                        //         if($user->attempt == 0) {
                                        //         Audit_generator("login","failed","User account locked.",$this->email);
                                        //         throw new Exception("There is a problem logging in, please contact the system admin.",401);
                                        //         }
                                        //         if(password_verify($pass,$user->pass)){
                                        //             $loginFlag = NULL;
                                        //             $attempt = 5;
                                        //             $this->fname = $user->fname;
                                        //             $this->lname = $user->lname;
                                        //             $this->userID = $user->userID;
                                        //             session_start();
                                        //             $_SESSION["login_user"] = $this;
                                        //             $_SESSION["time_out"] = time() + TIME_OUT;
                                        //             Audit_generator("login","success","User login via password.",$this->email);
                                        //         }else{
                                                
                                        //         }
                                            
                                                
                                        //     }
                                        // }
        
        }


        function display_info(){
            return json_encode([
                'uid' => $this->uid,
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'email' => $this->email
            ]);
        }     

    }
    class DB {
        private $db_hostname;
        private $db_username;
        private $db_password;
        private $db_name;
        private $db_connect;

        function __construct($db_hostname,$db_username,$db_password,$db_name)
        {
            $this->db_hostname = $db_hostname;
            $this->db_username = $db_username;
            $this->db_password = $db_password;
            $this->db_name = $db_name;
        }

        function connect (){
            $conn = new mysqli($this->db_hostname,$this->db_username,$this->db_password,$this->db_name);
            if($conn->connect_error){
                throw new Exception("Connection failed: ".$conn->connect_error,500);
            }
           $this->db_connect = $conn;
            return $conn;
        }

        function db_close(){
            $this->db_connect->close();
        }

       
        // Insert into table_name (col_name,col_name, ...) VALUES (val_1,val_2, ...)
        function insert($table_name, $col_names=null, $values_array)
        {
            // $values is going to be an array of values
            // $col_names is going to be an array of column names

           if ($col_names != null){
                $fields = "(".implode(",",$col_names).")"; // ['fname','lname']
           } else{
                $fields = "";
              }
                $values = "(".implode(",",$values_array).")"; // ['fname','lname']
                $inserCmd = "INSERT INTO $table_name $fields VALUES $values";
                

                // $inserCmd = $this->db_connect->prepare("INSERT INTO $table_name $fields VALUES (?,?,?,?)");
                // $inserCmd->bind_param("sssds", $values_array[0], $values_array[1], $values_array[2], $values_array[3]);

                if ($this->db_connect->query($inserCmd) === TRUE) {
                 return true;
                } else {

                    throw new Exception("Insert data error",500);

                }
                
           }            

        
    }
    class fileUpload{
        private $srcFile;
        private $destAddr;
        private $sizeCap;
        function __construct($srcFile,$destAddr,$sizeCap)
        {
            $this->srcFile = $srcFile;
            $this->destAddr = $destAddr."/".$this->srcFile["name"];
            $this->sizeCap = $sizeCap;
        }
        private function fileSize(){
            if($this->srcFile['size'] > $this->sizeCap){
                throw new Exception("File size larger than ".$this->sizeCap,413);
            }
        }
        private function ext_Chk(){
            $contType = substr($this->srcFile['type'],0,stripos($this->srcFile['type'],"/"));
            $extArray = null;
            switch($contType){
                case "image":
                    $extArray = ["jpeg","jpg","png","bmp"];
                break;
                case "application":
                    $extArray = ["json"];
                break;
                default:
                    throw new Exception("Invalid file type.",403);
            }
            $finfo = new finfo(FILEINFO_MIME_TYPE);
            $realExt = basename($finfo->file($this->srcFile['tmp_name']));
            if(!(false===array_search($realExt,$extArray))){
                return true;
            }
            throw new Exception("Invalid file type.",403);
        }
        function commitUpload(){
            $this->fileSize();
            $this->ext_Chk();
            if(!move_uploaded_file($this->srcFile['tmp_name'],$this->destAddr)){
                throw new Exception("File to upload.",500);
            }
            $destAddr = "/images/".$this->srcFile["name"];
            return $destAddr;
        }
    }
?>