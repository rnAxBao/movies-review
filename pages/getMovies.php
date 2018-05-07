<?php
include "../connect.php";
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
$sql = "select * from movies where movie_type like '%{$type}%'";

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
        $json['msg'] = "抱歉!该分类下暂时没有影片,请联系站长添加!";
    }
} else {
    $json['errorcode'] = 1;
    $json['msg'] = "抱歉!服务器出错啦!";
}
echo json_encode($json);