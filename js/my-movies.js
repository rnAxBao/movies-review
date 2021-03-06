$(function () {
    /* 获取电影 */
    getMovies(1, function (res) {
        let totalItems = res.count;
        let pages = Math.ceil((totalItems - 0) / 15);
        $(".paging").pagination({
            pageCount: pages,
            mode: 'fixed',
            count: 10,
            prevContent: '<',
            nextContent: '>',
            isHide: true,
            callback: function (api) {
                $(".movie-list").empty();
                getMovies(api.getCurrent());
            }
        });
    });
    $(".movie-class .nav-tabs li a").each(function () {
        $(this).click(function () {
            $(this).parent().addClass("active").siblings().removeClass("active");
            $(".movie-list").empty();
            $(".movie-main .movie-empty").remove();
            getMovies(1, function (res) {
                let totalItems = res.count;
                let pages = Math.ceil((totalItems - 0) / 15);
                $(".paging").pagination({
                    pageCount: pages,
                    mode: 'fixed',
                    count: 10,
                    prevContent: '<',
                    nextContent: '>',
                    isHide: true,
                    callback: function (api) {
                        $(".movie-list").empty();
                        getMovies(api.getCurrent());
                    }
                });
            });
        });
    });

    /* 管理员功能: 编辑电影 */
    if (sessionStorage.getItem("type") == 0) {
        $("#editMovie").fadeIn();
    }
    $("#editMovie").click(function() {
        if (!$(this).data("statu")) {
            $(".movie-list .deleteIt").fadeIn();
            $(this).data("statu", "on");
        } else {
            $(".movie-list .deleteIt").fadeOut();
            $(this).removeData("statu");
        }
    });

    function getMovies(pageIndex, fun) {
        $.getJSON("getMovies.php", {
            type: $(".movie-class .active a").text(),
            pageIndex: pageIndex
        }, function (data) {
            let res = data;
            if(res.datas) {
                for (let i = 0; i < res.datas.length; i++) {
                    let li = $('<li class="list-item"></li>');
                    addMovieItem($(".movie-list"), li, res, i, function () {
                        $("img.lazy").lazyload({
                            placeholder: "../img/white.gif",
                            effect: "fadeIn"
                        });
                    });
                }
            } else {
                $(".movie-main .movie-empty").remove();
                $(".movie-main").append($("<div>").addClass("movie-empty").text("抱歉!该分类下暂时没有影片,请联系站长添加!"));
            }
            if(fun) {
                fun(res);
            }
        });
    }


    /* 封装插入电影条目函数 */
    function addMovieItem(faEle, sonEle, data, index, fun) {
        let movieId = data.datas[index].movieId;
        let moviePic = data.datas[index].image;
        let movieName = "";
        if (data.datas[index].country.indexOf("中国大陆") > -1) {
            movieName = data.datas[index].title;
        } else {
            movieName = data.datas[index].aka.split(" / ")[0];
        }
        let movieRating = data.datas[index].score;
        let html = `
                <ul>
					<li class="poster">
						<a href="movie.html?movie_id=${movieId}" target="_blank">
						    <img class="lazy" data-original=${moviePic} alt=${movieName} width="128" height="179">
						</a>
					</li>
					<li class="title">
					    <a href="movie.html?movie_id=${movieId}" target="_blank">${movieName}</a>
					</li>
					<li class="rating">
					    <span class="rating-star"></span>
					    <span class="subject-rate">${movieRating}</span>
					</li>
					<li class="ticket_btn">
					    <span>
					    	<a href="movie.html?movie_id=${movieId}" target="_blank">查看详情</a>
						</span>
					</li>
                </ul>
                <button type="button" class="btn btn-danger deleteIt">&times;</button>`;
        faEle.append(sonEle.attr("data-id", movieId).append(html));

        /* 管理员删除电影 */
        sonEle.find(".deleteIt").click(function() {
            let that = $(this);
            $.getJSON("deleteMovie.php", {
                'movieId': movieId,
            }, function(res) {
                if(res.errorcode == 0) {
                    that.parent().fadeOut(500, function() {
                        $(this).remove();
                    })
                } else {
                    alert(res.msg);
                }
            });
        });

        /* 使用评分插件 */
        if (movieRating != 0) {
            sonEle.find(".rating .rating-star").starRating({
                initialRating: (movieRating / 10 * 5).toFixed(1),
                starSize: 12,
                readOnly: true,
                useGradient: false,
                activeColor: "orange"
            });
        } else {
            sonEle.find(".rating").empty().append('<span class="text-tip">暂无评分</span>');
        }
        if (fun) {
            fun();
        }
    }
});