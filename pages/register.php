<?php
include "checkout.php";
include "../connect.php";
if ($json['errorcode'] == 0 && !empty($_POST)) {
    $password = md5($_POST['pwdInp']);
    $sql = "insert into account (username, password, name) values ('$_POST[usernameInp]', '$password', '$_POST[nickname]')";
    if ($mysql->query($sql)) {
       $json['msg'] = "注册成功!";
    } else {
        $json["errorcode"] = 1;
        $json['msg'] = "注册失败!";
    }
    echo json_encode($json);
} else {
    echo json_encode($json);
}
