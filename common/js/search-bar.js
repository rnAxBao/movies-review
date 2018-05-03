$(".search-nav").load(location.pathname.indexOf("/pages") > -1 ? "../common/pages/search-bar.html" : "common/pages/search-bar.html", function() {
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

    /* 导航栏样式变更 */

    if (location.pathname.indexOf("index.html") > -1) {
        $(".tab-nav a").removeClass("actived").eq(0).addClass("actived");
    }
    if (location.pathname.indexOf("my-movies.html") > -1) {
        $(".tab-nav a").removeClass("actived").eq(1).addClass("actived");
    }
});
