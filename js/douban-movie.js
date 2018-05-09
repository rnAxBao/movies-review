$(function () {
    let movieId = location.search.split("=")[1];
    $.ajax({
        url: "https://api.douban.com/v2/movie/" + movieId,
        type: "get",
        dataType: "jsonp",
        success: function (res) {
            let data = res;
            /* 电影信息 */
            /* 进口电影显示中文名及外文名 */
            if (isReg(data.attrs.title[0], /^[\u4e00-\u9fa5]$/)) {
                $("title, .con-left .moviename").text(data.attrs.title[0]);
                $(".subject .subject-info .aka").text(data.alt_title);
            } else {
                let nameArr = data.alt_title.split(" / ");
                $("title, .con-left .moviename").text(nameArr[0]);
                $(".con-left>h1>.moviename").text(nameArr[0] + " " + data.attrs.title[0]);
                let newAka = data.alt_title.split(nameArr[0] + " / ")[1];
                $(".subject .subject-info .aka").text(newAka);
            }
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

            /* 电影简介 */
            $(".movie-info p").text(data.summary);
            /* 加入我的影库 */
            $(".subject-info").append($('<button type="button" class="btn btn-primary" id="addToMy">加入我的影库</button>'));
            /* 切换账号时判断用户类型 */
            /* 判断登录的用户的身份并提供功能 */
            if (sessionStorage.getItem("type") == 0) {
                $("#addToMy").slideDown();
            }
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
            });
        }
    });
});

function isReg(str, regCon) {
    let reg = regCon;
    return reg.test(str);
}