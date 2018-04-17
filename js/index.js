$(function() {
    // 请求影片信息
    $.ajax({
        url: "https://api.douban.com/v2/movie/subject/1764796",
        type: "get",
        dataType: "jsonp",
        success: function (data) {
            console.log(data);
        }
    });
});