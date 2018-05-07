$(function () {
    let movieId = location.search.split("=")[1];
    $.ajax({
        url: "https://api.douban.com/v2/movie/" + movieId,
        type: "get",
        dataType: "jsonp",
        success: function (res) {
            let data = res;
            /* 电影信息 */
            $("title").text(data.attrs.title[0]);
            $(".con-left .moviename").text(data.attrs.title[0]);
            $(".con-left h1 span").eq(1).text("(" + data.attrs.year[0] + ")");
            $(".subject .mainpic img").prop("src", data.image);
            $(".subject .subject-info .directors").text(data.attrs.director[0].split(" ")[0]);
            let cast = "";
            for (let i = 0; i < data.attrs.cast.length; i++) {
                cast += data.attrs.cast[i].split(" ")[0];
                if (i < (data.attrs.cast.length) - 1) {
                    cast += " / ";
                }
            }
            $(".subject .subject-info .actors").text(cast);
            let movie_type = data.attrs.movie_type.join("/");
            $(".subject .subject-info .genre").text(movie_type);
            let country = data.attrs.country.join("/")
            $(".subject .subject-info .countries").text(country);
            $(".subject .subject-info .aka").text(data.alt_title);

            /* 豆瓣评分 */
            $(".rating-left strong").text(data.rating.average);
            $(".movie-rating").starRating({
                initialRating: (data.rating.average / 10 * 5).toFixed(1),
                starSize: 15,
                readOnly: true,
                useGradient: false,
                activeColor: "orange"
            });
            $(".douban-rating .rating-count").text(data.rating.numRaters + "评价");

            /* 加入我的影库 */
            $("#addToMy").click(function () {
                $.post("addMovie.php", {
                    movie_id: movieId,
                    title: data.title,
                    summary: data.summary,
                    rating: data.rating,
                    alt_title: data.alt_title,
                    image: data.image,
                    attrs: {
                        country: data.attrs.country,
                        director: data.attrs.director,
                        cast: data.attrs.cast,
                        year: data.attrs.year,
                        movie_type: data.attrs.movie_type
                    }
                }, function (res) {
                    if (res.errorcode == 0) {
                        alert(res.msg);
                        location.href = "my-movies.html";
                    } else {
                        alert(res.msg);
                    }
                }, "json");
            })

            /* 电影简介 */
            $(".movie-info p").text(data.summary);
        }
    });

    /* 获取评论 */

    $.getJSON("getComment.php", {
        'movieId': movieId
    }, function(data) {
        let res = data;
        for (let i = 0; i < res.datas.length; i++) {
            let name = res.datas[i].name;
            let headpic = name == "包包大人" ? "../img/admin.JPG" : "../img/default_head.png";
            let datetime = res.datas[i].datetime;
            let commentCon = res.datas[i].comment;
            let score = res.datas[i].score;
            let agree = res.datas[i].agree;
            let disagree = res.datas[i].disagree;
            let html = `<div class="comment-item">
                        <div class="item-head">
                            <img src=${headpic} alt="" width="24">
                            <span class="commenter">${name}</span>
                            <span class="user-rating"></span>
                            <span class="item-datetime">${datetime}</span>
                        </div>
                        <div class="item-main">
                            <p>${commentCon}</p>
                            <a href="javascript:void(0);" class="unfold" title="展开">展开</a>
                        </div>
                        <div class="item-action">
                            <a href="javascript:void(0);" class="action-btn up" title="有用">
                                <img src="https://img3.doubanio.com/f/zerkalo/536fd337139250b5fb3cf9e79cb65c6193f8b20b/pics/up.png">
                                <span id="r-useful_count-9283541">${agree}</span>
                            </a>
                            <a href="javascript:void(0);" class="action-btn down" title="没用">
                                <img src="https://img3.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png">
                                <span id="r-useless_count-9283541">${disagree}</span>
                            </a>
                            <a href="javascript:void(0);" class="fold">收起</a>
                        </div>
                    </div>`;
            $(".comment-body").append(html);
            $(".comment-item .user-rating").starRating({
                initialRating: score,
                starSize: 12,
                readOnly: true,
                useGradient: false,
                activeColor: "orange"
            });
            $(".comment-item .unfold").click(function () {
                $(this).siblings("p").css({
                    overflow: "visible",
                    display: "block"
                });
                $(this).hide();
                $(".comment-item .fold").show();
            });
            $(".comment-item .fold").click(function () {
                $(".item-main p").css({
                    overflow: "hidden",
                    display: "-webkit-box"
                });
                $(this).hide();
                $(".comment-item .unfold").show();
            });
        }
    });

    /* 添加评论 */

    $("#addComment").click(function () {
        if (sessionStorage.getItem("username") && sessionStorage.getItem("name") && sessionStorage.getItem("type")) {
            let html = `<div class="comment-wrap"></div>
        <div class="comment-container">
            <div class="interest-form-hd">
                <button type="button" class="close" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h2>添加评论：写影评</h2>
            </div>
            <div class="interest-rating">
                <span class="rate_stars">给个评价吧?:</span>
                <span id="rating"></span>
            </div>
            <div class="interest-comment">
                <span>你的评论:</span>
                <textarea id="comment" maxlength="350"></textarea>
            </div>
            <div class="interest-form-ft">
                <button type="button" class="btn btn-default" id="subComment">提交</button>
            </div>
        </div>`;
            $("body").prepend(html);
            $("#rating").starRating({
                starSize: 14,
                useGradient: false,
                activeColor: "orange",
                callback: function (rating, ele) {
                    $(ele).data("score", rating);
                }
            });
            $("#subComment").click(function() {
                if($("#rating").data("score") && $("#comment").val()) {
                    $(".error").remove();
                    $.post("addComment.php", {
                        'movieId': movieId,
                        'username': sessionStorage.getItem("name"),
                        'score': $("#rating").data("score"),
                        'comment': $("#comment").val()
                    }, function(res) {
                        if (res.errorcode == 0) {
                            location.reload();
                        } else {
                            $("#subComment").before($("<span>").addClass("error").text(res.msg));
                        }
                    }, "json");
                } else {
                    $(".error").remove();
                    $("#subComment").before($("<span>").addClass("error").text("请填写空字段!"));
                }
            })
            $(".close").click(function () {
                $(".comment-wrap, .comment-container").slideUp(500, function () {
                    $(this).remove();
                });
            });
        } else {
            alert("请先登录!");
        }
    });
});