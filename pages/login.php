<?php
include "checkout.php";
include "../connect.php";

if ($json['errorcode'] == 0 && !empty($_POST)) {
    $sql = "select * from account where username='{$_POST[username]}'";
    $result = $mysql->query($sql);
    if ($result) {
        $datas = $result->fetch_array(MYSQLI_ASSOC);
        if ($datas['password'] == md5($_POST['password'])) {
            $json['data'] = [
                'username' => $datas['username'],
                'name' => $datas['name'],
                'type' => $datas['type'],
            ];
            $json['msg'] = "登录成功!";
        } else {
            $json["errorcode"] = 1;
            $json['msg'] = "密码错误!";
        }
    } else {
        $json["errorcode"] = 1;
        $json['msg'] = "用户不存在!";
    }
    echo json_encode($json);
} else {
    echo json_encode($json);
}