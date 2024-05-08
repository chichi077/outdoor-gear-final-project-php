<?php

    function sendHttpCode($code,$message,$die_flag=false)
    {   
        http_response_code($code);
     
        if($die_flag){
            die($message);
        }
        else{
            echo $message;
        }
        
    }

    function check_key($keys,$sourceData){
        foreach($keys as $key){
            if(!array_key_exists($key,$sourceData)){
                throw new Exception("Invalid Parameters",400);
            }
        }
        return true;
    }

    
    function Session_handler($sid){
        session_id($sid);
        session_start();

        if (isset($_SESSION["time_out"] )&& $_SESSION["time_out"]>time()){ // check if the session is still active
            $_SESSION["time_out"] = time()+ TIME_OUT;
        }else{
            session_unset();
            session_destroy();
            throw new Exception("Session timed out/ does not exist", 408);
        }
    }

    

    // date, time , type of event , ip:port, [user email,] outcome [success|fail], desc
    function Audit_generator($eventType,$outcome,$desc,$userEmail=""){
        $aduit = date("Y-m-d H:i:s ",$_SERVER["REQUEST_TIME"]).$_SERVER["REMOTE_ADDR"].":".$_SERVER["REMOTE_PORT"]." $userEmail $eventType $outcome $desc \n";
        $file = new File("../data/audit");
        $file->writeFile("Audit ".date("Ymd").".txt",$aduit);
    }

    function get_audit_text($date){
        $targetFile = "../data/audit/$date.txt"; 


    }

    // function listFile(){
    //     $listfile = scandir("../data/audit");
    //     $listfile = array_diff($listfile, array('..', '.'));
    //     return $listfile;

    // }

    function Audit_parseJson($date){
        $fileName = "Audit $date.txt"; 
        $file = new File("../data/audit");
        $auditTxt = $file->readFile($fileName);
        // Split the text into lines
        $lines = explode("\n", $auditTxt);
        $audits=[];
        
        // Parse each line into an array of values
        foreach($lines as $line){

            if ($line == ""){ // Skip empty lines
                break;
            }

            $line = explode(" ", $line); // split the line based on the space 
            $date = $line[0];
            $time = $line[1];
            $REMOTE_ADDR = $line[2];
            $user_email = $line[3];
            $type = $line[4];
            $outcome = $line[5];
            $desc = array_slice($line, 6); // Get the rest of the line as the description
         
            $desc = implode(" ", array_slice($line, 6)); // Combine the description array into a string


            array_push($audits,['Date'=> $date, 'time'=> $time,'Remote_Addr'=>$REMOTE_ADDR, 'User_Email'=>$user_email, 'Type'=>$type, 'Outcome'=>$outcome, 'Desc'=>$desc]);
        }

        // Convert the audits to JSON
        $auditJson = json_encode($audits);

        // $file->writeFile("Audit $date.json", $auditJson); // write the json to a file

        return $auditJson;
    }

   
    function listFolderFiles($fileRoute){
        $files = scandir($fileRoute); // get all files in the directory
        $files = array_diff($files, array('..', '.'));
        $files = array_values($files);
        $files = implode("\n", $files); //  dispaly the files name line by line
    
        return $files;
    }
  
    



     
?>