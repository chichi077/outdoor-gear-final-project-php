<?php
require("./config.php");
require("./Functions.php");
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
                        break;
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
    class User{ //
        private $id;
        private $fname;
        private $lname;
        private $email;
        function __construct($email)    //it happens automatically and intilazied objects when new instance is created
        {
            $this->email = $email;
        }
        function authenticate($pass){
            $fileObj = new File("./data");
            $prevUsers = ($fileObj->readFile("users.json"))?json_decode($fileObj->readFile("users.json")):false;
            if(!$prevUsers) throw new Exception("Server Error.",500); //when there is no users.json file
            $loginFlag = "email";
            foreach($prevUsers as $user){
                if($user->email == $this->email){
                    if($user->attempt == 0) {
                    Audit_generator("login","failed","User account locked.",$this->email);
                    throw new Exception("There is a problem logging in, please contact the system admin.",401);
                    }
                    if(password_verify($pass,$user->pass)){
                        $loginFlag = true;
                        $user->attempt = 5;
                        $this->fname = $user->fname;
                        $this->lname = $user->lname;
                        $this->id = $user->id;
                        session_start();
                        $_SESSION["login_user"] = $this;
                        $_SESSION["time_out"] = time() + TIME_OUT;
                        Audit_generator("login","success","User login via password.",$this->email);
                    }else{
                        $user->attempt -= 1;
                        $loginFlag = "pass";
                    }
                    $fileObj->writeFile("users.json",json_encode($prevUsers),true);
                    
                }
            }
            switch($loginFlag){
                case "email":
                    Audit_generator("login","failed","Invalid email address.",$this->email);
                    throw new Exception("Username/Password Wrong.",401);
                break;
                case "pass":
                    Audit_generator("login","failed","Invalid password. Attempts(".$user->attempt.")",$this->email);
                    throw new Exception("Username/Password Wrong.",401);
                break;
            } 
            return session_id();
        }
        function display_info(){
            return json_encode(["uid"=>$this->id, "fname"=>$this->fname, "lname"=>$this->lname,"email"=>$this->email]);
        }
    }
?>