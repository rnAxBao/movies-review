$(function () {
    // 请求影片信息
    // $.ajax({
    //     url: "https://api.douban.com/v2/movie/in_theaters?city=上海",
    //     type: "get",
    //     dataType: "jsonp",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });

    /* 电影搜索 */
    $("#searchBtn").click(function () {
        let keyword = $("#searchInput").val();
        if (keyword) {
            $.ajax({
                url: "https://api.douban.com/v2/movie/search?q=" + keyword,
                type: "get",
                dataType: "jsonp",
                success: function (data) {
                    console.log(data);
                }
            });
        } else {
            alert("请输入内容!");
        }
    });
});