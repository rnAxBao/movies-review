$(function () {
    // 请求影片信息
    $.ajax({
        url: "https://api.douban.com/v2/movie/in_theaters",
        type: "get",
        data: {
            city: "上海",
            start: 0
        },
        dataType: "jsonp",
        success: function (data) {
            let res = data;
            console.log(res);
            let ulWrap = $(".screening .ui-slide-content");
            for (let i = 0; i < res.subjects.length; i++) {
                let li = $('<li class="ui-slide-item"></li>');
                addMovieItem(ulWrap, li, res, i);
            }

            $.ajax({
                url: "https://api.douban.com/v2/movie/in_theaters",
                type: "get",
                data: {
                    city: "上海",
                    start: 20
                },
                dataType: "jsonp",
                success: function (data) {
                    let res2 = data;
                    for (let j = 0; j < res2.subjects.length; j++) {
                        let li = $('<li class="ui-slide-item"></li>');
                        addMovieItem(ulWrap, li, res2, j);
                    }

                    /* 给图片绑定懒加载 */
                    $("img.lazy").lazyload({
                        placeholder: "img/grey.gif",
                        effect: "fadeIn",
                        threshold: 3000
                    });
                }
            });

            /* 取得slider的总页数 */
            $(".show-page .ui-slide-max").text(Math.ceil(res.total / 5));

            function addMovieItem(faEle, sonEle, data, index) {
                let movieId = data.subjects[index].id;
                let moviePic = data.subjects[index].images.small;
                let movieName = data.subjects[index].title;
                let movieRating = data.subjects[index].rating.average;
                let html = `
                            <ul>
								<li class="poster">
									<a href="">
									    <img class="lazy" data-original=${moviePic} alt=${movieName} width="128" height="179">
								    </a>
								</li>
								<li class="title">
								    <a href="">${movieName}</a>
								</li>
								<li class="rating">
								    <span class="rating-star"></span>
								    <span class="subject-rate">${movieRating}</span>
								</li>
								<li class="ticket_btn">
								    <span>
								    	<a href="" target="_blank">加入影库</a>
								    </span>
								</li>
                            </ul>`;
                faEle.append(sonEle.attr("data-id", movieId).append(html));
                if (movieRating != 0) {
                    sonEle.find(".rating .rating-star").starRating({
                        initialRating: (movieRating / 10 * 5).toFixed(1),
                        starSize: 12,
                        readOnly: true,
                        useGradient: false,
                        activeColor: "orange"
                    })
                } else {
                    sonEle.find(".rating").empty().append('<span class="text-tip">暂无评分</span>');
                }
            }
        }
    });

    /* 绑定slider事件 */
    let slideIndex = 1;
    let slideX = 0;
    $(".paging .btn-next").click(function () {
        slideIndex++;
        slideX += -700;
        if (slideIndex == 8) {
            slideIndex = 1;
            slideX = 0;
        }
        /* 显示当前页数 */
        $(".show-page .ui-slide-index").text(slideIndex);
        $(".screening .ui-slide-content").css("transform", "translateX(" + slideX + "px)");
    });
    $(".paging .btn-prev").click(function () {
        slideIndex--;
        slideX += 700;
        if (slideIndex == 0) {
            slideIndex = 7;
            slideX = -4200;
        }
        /* 显示当前页数 */
        $(".show-page .ui-slide-index").text(slideIndex);
        $(".screening .ui-slide-content").css("transform", "translateX(" + slideX + "px)");
    });
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