<?php
include "../connect.php";

if(empty($_GET)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}

$movieId = $_GET['movieId'];
$sql = "select * from comment where movie_id = '{$movieId}'";
$result = $mysql->query($sql);
if ($result) {
    $data = $result->fetch_all();
    $json['errorcode'] = 0;
    if(!empty($data)) {
        $json['msg'] = "查询成功";
        foreach ($data as $key => $value) {
            $json['datas'][] = [
                name => $value[1],
                score => $value[2],
                comment => $value[3],
                datetime => $value[4],
                agree => $value[5],
                disagree => $value[6]
            ];
        }
    } else {
        $json['msg'] = "抱歉!该影片暂时没有评论,快来抢占沙发吧!";
    }
} else {
    $json['errorcode'] = 1;
    $json['msg'] = "抱歉!服务器出错啦!";
}
echo json_encode($json);