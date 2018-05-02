<?php
if(isset($_POST['authcode'])) {
    session_start();
    if (strtolower($_POST['authcode']) == $_SESSION['authcode']) {
        $json["errorcode"] = 0;
    }else {
        $json["errorcode"] = 1;
        $json["msg"] = "验证码错误!";
    }
}