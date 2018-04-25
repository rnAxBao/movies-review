<?php
if(isset($_POST['authcode'])) {
    session_start();
    if (strtolower($_POST['authcode']) == $_SESSION['authcode']) {
        echo "输入正确";
    }else {
        echo "输入错误";
    }
    exit();
}