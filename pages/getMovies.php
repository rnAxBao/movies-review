<?php
include "../connect.php";
define("PAGE_SIZE", 15);
if(empty($_GET)) {
    $json["errorcode"] = 1;
    $json["msg"] = "请求不到的数据!";
    die(json_encode($json));
}
if (!empty($_GET['type'])) {
    $type = "";
    switch ($_GET['type']) {
        case '剧情':
            $type = "剧情";
            break;
        case '动作':
            $type = "动作";
            break;
        case '科幻':
            $type = "科幻";
            break;
        case '犯罪':
            $type = "犯罪";
            break;
        case '惊悚':
            $type = "惊悚";
            break;
        case '战争':
            $type = "战争";
            break;
        case '动画':
            $type = "动画";
            break;
        default:
            break;
    }
    $pageIndex = $_GET['pageIndex'];
    $countSql = "select count(movie_id) from movies where movie_type like '%{$type}%'";
    $countResult = $mysql->query($countSql);
    $count = $countResult->fetch_array(MYSQLI_NUM);
    $totalItems = $count[0];//count(id) 在sql语句中是第1个字段, 也就是下标为0
    $allPages = ceil($totalItems / PAGE_SIZE);
    $start = ($pageIndex-1)*PAGE_SIZE;
    $sql = "select * from movies where movie_type like '%{$type}%' ORDER BY movie_id DESC";
    $sql .= " limit $start, ".PAGE_SIZE;
    $json["count"] = $totalItems;
} else if(!empty($_GET['movieId'])) {
    $movieId = $_GET['movieId'];
    $sql = "select * from movies where movie_id = '{$movieId}'";
}
$result = $mysql->query($sql);
if ($result) {
    $data = $result->fetch_all();
    $json['errorcode'] = 0;
    if(!empty($data)) {
        $json['msg'] = "查询成功";
        foreach ($data as $key => $value) {
            $json['datas'][] = [
                movieId => $value[0],
                title => $value[1],
                summary => $value[2],
                score => $value[3],
                count => $value[4],
                aka => $value[5],
                image => $value[6],
                country => $value[7],
                director => $value[8],
                cast => $value[9],
                year => $value[10],
                type => $value[11]
            ];
        }
    } else {
        $json['msg'] = "未查找到电影信息";
    }
} else {
    $json['errorcode'] = 1;
    $json['msg'] = "抱歉!服务器出错啦!";
}
echo json_encode($json);