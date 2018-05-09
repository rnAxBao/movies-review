<?php
include "../connect.php";

if(empty($_GET)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}

$movieId = $_GET['movieId'];
$name = $_GET['name'];
$time = $_GET['time'];

$sql = "delete from comment where movie_id='{$movieId}' AND user_name='{$name}' AND time='{$time}'";

if ($mysql->query($sql)) {
    $json["errorcode"] = 0;
    $json["msg"] = "删除成功!";
} else {
    $json["errorcode"] = 1;
    $json["msg"] = "无法删除!";
}
echo json_encode($json);