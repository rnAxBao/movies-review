<?php
include "../connect.php";

if(empty($_POST)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}
$movieId = $_POST['movie_id'];
$title = $_POST['title'];
$summary = addslashes($_POST['summary']);
$score = $_POST['rating']['average'];
$count = $_POST['rating']['numRaters'];
$aka = $_POST['alt_title'];
$image = $_POST['image'];
$country = implode($_POST['attrs']['country'], " / ");
$director = explode(" ", $_POST['attrs']['director'][0])[0];
$cast = "";

for ($i = 0; $i < count($_POST['attrs']['cast']); $i++) {
    $cast .= explode(" ", $_POST['attrs']['cast'][$i])[0];
    if ($i < count($_POST['attrs']['cast']) - 1) {
        $cast .= " / ";
    }
}
$year = implode($_POST['attrs']['year'], " / ");
$type = implode($_POST['attrs']['movie_type'], " / ");
$sql = "insert into movies values ('{$movieId}', '{$title}', '{$summary}', '{$score}', '{$count}', '{$aka}', '{$image}', '{$country}', '{$director}', '{$cast}', '{$year}', '{$type}')";
if ($mysql->query($sql)) {
    $json["errorcode"] = 0;
    $json["msg"] = "添加成功!";
} else {
    $json["errorcode"] = 1;
    $json["msg"] = "影片已存在!";
}
echo json_encode($json);