<?php
include "../connect.php";

if(empty($_POST)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}

$movieId = $_POST['movieId'];
$username = $_POST['username'];
$score = $_POST['score'];
$comment = $_POST['comment'];

$sql = "insert into comment (movie_id, user_name, user_score, comment) values ('{$movieId}', '{$username}', '{$score}', '{$comment}')";
if ($mysql->query($sql)) {
    $json["errorcode"] = 0;
    $json["msg"] = "评论成功!";
} else {
    $json["errorcode"] = 1;
    $json["msg"] = "评论失败!";
}
echo json_encode($json);