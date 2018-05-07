$(function () {
    getMovies();
    $(".movie-class .nav-tabs li a").each(function () {
        $(this).click(function () {
            $(this).parent().addClass("active").siblings().removeClass("active");
            $(".movie-list").empty();
            $(".movie-main .movie-empty").remove();
            getMovies();
        });
    });

    function getMovies() {
        $.getJSON("getMovies.php", {
            type: $(".movie-class .active a").text()
        }, function (data) {
            let res = data;
            console.log(res);
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
                $(".movie-main").append($("<div>").addClass("movie-empty").text(res.msg));
            }
        });
    }


    /* 封装插入电影条目函数 */
    function addMovieItem(faEle, sonEle, data, index, fun) {
        let movieId = data.datas[index].movieId;
        let moviePic = data.datas[index].image;
        let movieName = data.datas[index].title;
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
                </ul>`;
        faEle.append(sonEle.attr("data-id", movieId).append(html));

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