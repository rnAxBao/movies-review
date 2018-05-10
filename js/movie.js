$(function () {
    let movieId = location.search.split("=")[1];
    $.getJSON("getMovies.php", {
        'movieId': movieId
    }, function (res) {
        let data = res;
        /* 电影信息 */
        /* 进口电影显示中文名及外文名 */
        if (data.datas[0].country.indexOf("中国大陆") > -1) {
            $("title, .con-left .moviename").text(data.datas[0].title);
            $(".subject .subject-info .aka").text(data.datas[0].aka);
        } else {
            let nameArr = data.datas[0].aka.split(" / ");
            $("title, .con-left .moviename").text(nameArr[0]);
            $(".con-left>h1>.moviename").text(nameArr[0] + " " + data.datas[0].title);
            let newAka = data.datas[0].aka.split(nameArr[0] + " / ")[1];
            $(".subject .subject-info .aka").text(newAka);
        }
        $(".con-left h1 span").eq(1).text("(" + data.datas[0].year + ")");
        $(".subject .mainpic img").prop("src", data.datas[0].image);
        $(".subject .subject-info .directors").text(data.datas[0].director);
        $(".subject .subject-info .actors").text(data.datas[0].cast);
        $(".subject .subject-info .genre").text(data.datas[0].type);
        $(".subject .subject-info .countries").text(data.datas[0].country);

        /* 豆瓣评分 */
        $(".rating-left strong").text(data.datas[0].score);
        $(".movie-rating").starRating({
            initialRating: (data.datas[0].score / 10 * 5).toFixed(1),
            starSize: 15,
            readOnly: true,
            useGradient: false,
            activeColor: "orange"
        });
        $(".douban-rating .rating-count").text(data.datas[0].count + "评价");

        /* 电影简介 */
        $(".movie-info p").text(data.datas[0].summary);
    });

    /* 获取评论 */

    $.getJSON("getComment.php", {
        'movieId': movieId
    }, function (data) {
        let res = data;
        if (!res.datas) {
            $(".comment-body").append($("<div>").addClass("comment-empty").text(res.msg));
            return;
        }
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
                            <button type="button" class="btn btn-danger delete-comment">删除</button>
                        </div>
                        <div class="item-main">
                            <p>${commentCon}</p>
                            <a href="javascript:void(0);" class="unfold" title="展开">展开</a>
                        </div>
                        <div class="item-action">
                            <a href="javascript:void(0);" class="action-btn up" title="有用">
                                <img src="https://img3.doubanio.com/f/zerkalo/536fd337139250b5fb3cf9e79cb65c6193f8b20b/pics/up.png">
                                <span>${agree}</span>
                            </a>
                            <a href="javascript:void(0);" class="action-btn down" title="没用">
                                <img src="https://img3.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png">
                                <span>${disagree}</span>
                            </a>
                            <a href="javascript:void(0);" class="fold">收起</a>
                        </div>
                    </div>`;
            $(".comment-body").append(html);
            $(".comment-item:eq(" + i + ") .user-rating").starRating({
                initialRating: score,
                starSize: 12,
                readOnly: true,
                useGradient: false,
                activeColor: "orange"
            });
            $(".comment-item:eq(" + i + ") .unfold").click(function () {
                $(this).siblings("p").css({
                    overflow: "visible",
                    display: "block"
                });
                $(this).hide();
                $(".comment-item:eq(" + i + ") .fold").show();
            });
            $(".comment-item:eq(" + i + ") .fold").click(function () {
                $(".item-main p").css({
                    overflow: "hidden",
                    display: "-webkit-box"
                });
                $(this).hide();
                $(".comment-item:eq(" + i + ") .unfold").show();
            });
            /* 顶或踩评论 */
            $(".comment-item:eq(" + i + ") .item-action .up").click(function () {
                let agreeNum = agree - 0;
                if (!$(this).data("status")) {
                    $(this).data("status", "on");
                    $(this).children("img").prop("src", "https://img3.doubanio.com/f/zerkalo/635290bb14771c97270037be21ad50514d57acc3/pics/up-full.png");
                    rateComment(movieId, name, datetime, 0, agreeNum + 1);
                    $(this).children("span").text(agreeNum + 1);
                } else {
                    $(this).removeData("status");
                    $(this).children("img").prop("src", "https://img3.doubanio.com/f/zerkalo/536fd337139250b5fb3cf9e79cb65c6193f8b20b/pics/up.png");
                    rateComment(movieId, name, datetime, 0, agreeNum);
                    $(this).children("span").text(agreeNum);
                }
            });
            $(".comment-item:eq(" + i + ") .item-action .down").click(function () {
                let disagreeNum = disagree - 0;
                if (!$(this).data("status")) {
                    $(this).data("status", "on");
                    $(this).children("img").prop("src", "https://img3.doubanio.com/f/zerkalo/23cee7343568ca814238f5ef18bf8aadbe959df2/pics/down-full.png");
                    rateComment(movieId, name, datetime, 1, disagreeNum + 1);
                    $(this).children("span").text(disagreeNum + 1);
                } else {
                    $(this).removeData("status");
                    $(this).children("img").prop("src", "https://img3.doubanio.com/f/zerkalo/68849027911140623cf338c9845893c4566db851/pics/down.png");
                    rateComment(movieId, name, datetime, 1, disagreeNum);
                    $(this).children("span").text(disagreeNum);
                }
            });
            /* 管理员删除评论 */
            if (sessionStorage.getItem("type") == 0) {
                $(".comment-item:eq(" + i + ") .delete-comment").slideDown();
            }
            $(".comment-item:eq(" + i + ") .delete-comment").click(function () {
                let that = $(this);
                $.getJSON("deleteComment.php", {
                    'movieId': movieId,
                    'name': name,
                    'time': datetime
                }, function (res) {
                    if (res.errorcode == 0) {
                        that.parent().parent().slideUp(500, function () {
                            $(this).remove()
                        });
                    } else {
                        alert("无法删除");
                    }
                });
            });
        }
        if (sessionStorage.getItem("type") == 0) {
            $(".delete-comment").slideDown();
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
            $("#subComment").click(function () {
                if ($("#rating").data("score") && $("#comment").val()) {
                    $(".error").remove();
                    $.post("addComment.php", {
                        'movieId': movieId,
                        'username': sessionStorage.getItem("name"),
                        'score': $("#rating").data("score"),
                        'comment': $("#comment").val()
                    }, function (res) {
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

function rateComment(movieId, name, datetime, type, rate) {
    $.post("rateComment.php", {
        'movieId': movieId,
        'name': name,
        'time': datetime,
        'type': type,
        'rate': rate
    }, "json");
}