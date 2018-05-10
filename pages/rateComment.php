<?php
include "../connect.php";

if(empty($_POST)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}

$movieId = $_POST['movieId'];
$name = $_POST['name'];
$time = $_POST['time'];
if($_POST['type'] == 0) {
    $type = "agree";
} else {
    $type = "disagree";
}
$rate = $_POST['rate'];

$sql = "UPDATE comment SET {$type}='{$rate}' WHERE  movie_id='{$movieId}' AND user_name='{$name}' AND time='{$time}'";
if($mysql->query($sql)) {
    $json["errorcode"] = 0;
    $json["msg"] = "执行成功!";
} else {
    $json["errorcode"] = 1;
    $json["msg"] = "服务器出错了!";
}
echo json_encode($json);