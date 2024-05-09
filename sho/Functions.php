<?php
function sendHttp_Code($code, $msg, $die_flag = false)
{
    http_response_code($code);
    if ($die_flag) {
        die($msg);
    } else {
        echo ($msg);
    }
}
function check_key($keys, $sourceData)
{
    foreach ($keys as $key) {
        if (!array_key_exists($key, $sourceData)) {
            throw new Exception("Invalid keys", 400);
        }
    }
}
function Session_Hanlder($sid)
{
    session_id($sid);
    session_start();
    if (isset($_SESSION["time_out"]) && $_SESSION["time_out"] > time()) {
        $_SESSION["time_out"] = time() + TIME_OUT;
    } else {
        session_unset();
        session_destroy();
        throw new Exception("Session timed out/does not exist.", 408);
    }
}
function Audit_generator($eventType, $outcome, $desc, $userEmail = "")
{
    $aduit = date("Y-m-d H:i:s ", $_SERVER["REQUEST_TIME"]) . $_SERVER["REMOTE_ADDR"] . ":" . $_SERVER["REMOTE_PORT"] . " $userEmail $eventType $outcome $desc \n";
    $file = new File("./data/audit");
    $file->writeFile("Audit " . date("Ymd") . ".txt", $aduit);
}

