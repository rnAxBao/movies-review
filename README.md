# movies-review
利用html,js,php,mysql实现的个人影评网  
数据库配置在connect.php文件里
```php
    $host = "127.0.0.1";
    $user = "root";
    $password = "12345678";
    $database = "mymovie";//数据库名
    $port = 8889;//MySQL端口号

    $mysql = new mysqli($host, $user, $password, $database, $port);
    if ($mysql->connect_error) {
        die('Connect Error(' . $mysql->connect_errno . ')' . $mysql->connect_error);
    }
    // 将编码设置为utf8
    if (!$mysql->set_charset("utf8")) {
        die('Error loading character set utf8:' . $mysql->error);
    }
```
电影资源库依靠豆瓣电影  
(当时年轻的自己啊😂)
