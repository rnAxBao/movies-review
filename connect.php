<?php
$host = "127.0.0.1";
$user = "root";
$password = "12345678";
$database = "mymovie";
$port = 8889;

$mysql = new mysqli($host, $user, $password, $database, $port);
if ($mysql->connect_error) {
    die('Connect Error(' . $mysql->connect_errno . ')' . $mysql->connect_error);
}
// 将编码设置为utf8
if (!$mysql->set_charset("utf8")) {
    die('Error loading character set utf8:' . $mysql->error);
}