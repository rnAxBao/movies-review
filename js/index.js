$(function () {

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
            let ulWrap = $(".screening .ui-slide-content");
            let minItems = Math.ceil(res.subjects.length / 5) * 5;
            for (let i = 0; i < minItems; i++) {
                let li = $('<li class="ui-slide-item"></li>');
                if (i < res.subjects.length) {
                    addMovieItem(ulWrap, li, res, i);
                } else {
                    ulWrap.append(li);
                }
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
                    let minItems2 = Math.ceil(res2.subjects.length / 5) * 5;
                    for (let j = 0; j < minItems2; j++) {
                        let li = $('<li class="ui-slide-item"></li>');
                        if (j < res2.subjects.length) {
                            addMovieItem(ulWrap, li, res2, j);
                        } else {
                            ulWrap.append(li);
                        }
                    }
                    /* 循环轮播的html结构 */
                    let behindItems = $(".screening-body>ul>li").slice(0, 5);
                    ulWrap.append(behindItems.clone());

                    // /* 给图片绑定懒加载 */
                    $("img.lazy").lazyload({
                        placeholder: "img/white.gif",
                        effect: "fadeIn",
                        threshold: 10000,
                        container: $(".screening-body")
                    });
                }
            });

            /* 取得slider的总页数 */
            let pages = Math.ceil(res.total / 5);
            $(".show-page .ui-slide-max").text(pages);

            /* 绑定slider事件 */

            /* 自动轮播 */
            let timer;
            clearInterval(timer);
            timer = setInterval(slideNext, 5000);
            $(".screening").mouseover(function () {
                clearInterval(timer);
            });
            $(".screening").mouseout(function () {
                timer = setInterval(slideNext, 5000);
            });

            let sliderTimer;
            let slideIndex = 0;
            $(".paging .btn-next").click(slideNext);

            function slideNext() {
                if (slideIndex == pages) {
                    slideIndex = 0;
                    $(".screening .ui-slide-content").css("transform", "translateX(0px)");
                }
                slideIndex++;
                autoSlide();
            }
            $(".paging .btn-prev").click(function () {
                if (slideIndex == 0) {
                    slideIndex = pages;
                    $(".screening .ui-slide-content").css("transform", "translateX(" + -700 * slideIndex + "px)");
                }
                slideIndex--;
                autoSlide();
            });

            function autoSlide() {
                /* 缓动函数动画 */
                let t = 0;
                let b = $(".screening .ui-slide-content").position().left;
                let c = -700 * slideIndex - b;
                let d = 50;
                clearInterval(sliderTimer);
                sliderTimer = setInterval(function () {
                    t++;
                    if (t == 50) {
                        clearInterval(sliderTimer);
                    }
                    $(".screening .ui-slide-content").css("transform", "translateX(" + Tween.Cubic.easeOut(t, b, c, d) + "px)");
                }, 10);
                /* 显示当前页数 */
                if (slideIndex == pages) {
                    $(".show-page .ui-slide-index").text(1);
                } else {
                    $(".show-page .ui-slide-index").text(slideIndex + 1);
                }
            }


        }
    });

    /* 封装插入电影条目函数 */
    function addMovieItem(faEle, sonEle, data, index, fun) {
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
								    	<a href="" target="_blank">查看详情</a>
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
            })
        } else {
            sonEle.find(".rating").empty().append('<span class="text-tip">暂无评分</span>');
        }
        if (fun) {
            fun();
        }
    }

    /* top250 */
    let startItem = 0;
    getMovieData(startItem);
    $(".top250-body .more").click(function () {
        startItem += 15;
        $(".loading").css("display", "block");
        $(".more").css("display", "none");
        getMovieData(startItem, function () {
            $(".loading").css("display", "none");
            $(".more").css("display", "block");
        });
    });

    function getMovieData(start, fun) {
        $.ajax({
            type: "get",
            url: "https://api.douban.com/v2/movie/top250",
            data: {
                count: 15,
                start: start
            },
            dataType: "jsonp",
            success: function (res) {
                let data = res;
                for (let i = 0; i < data.subjects.length; i++) {
                    let li = $('<li class="list-item"></li>');
                    addMovieItem($(".top250-lists"), li, data, i, function () {
                        $("img.lazy").lazyload({
                            placeholder: "img/white.gif",
                            effect: "fadeIn",
                            container: start > 0 ? $(".top250-lists>li:eq(" + (start + i) + ")") : $(".top250-lists>li"),
                        });
                    });
                }
                if (fun) {
                    fun();
                }
            }
        });
    }



    /* 验证码点击刷新 */
    $(".changeCap").each(function () {
        $(this).click(function () {
            $(this).children(".captcha").prop("src", "pages/captcha.php?r=" + Math.random());
        });
    });

    /* 按钮与登录注册框的交互 */
    $(".login button[type=button], #register").each(function () {
        $(this).click(function () {
            $(".login").hide();
            $(".register").slideDown();
        });
    });
    $("#login").click(function () {
        $(".register").hide();
        $(".login").slideDown();
    });

    /* 注册框 */
    let regUsername = addCheck($("#usernameInp"), /^[a-zA-Z0-9_]{4,12}$/, "请输入正确的用户名!");
    let regPwd = addCheck($("#pwdInp"), /^[a-zA-Z0-9_]{4,16}$/, "请输入正确的密码!");
    let regConfirmPwd = (function () {
        $("#confirmpwd").change(function () {
            if ($(this).val() == $("#pwdInp").val()) {
                $(this).css("border-color", "green");
                if ($(this).siblings(".error")) {
                    $(this).siblings(".error").remove();
                    return false;
                }
            } else {
                $(this).css("border-color", "red");
                $(this).parent().append($("<p>").addClass("error").text("两次密码输入不一致!"));
                return true;
            }
        });
    })();
    let regNickName = addCheck($("#nickname"), /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,6}$/, "请输入正确的昵称!");
    let regCaptcha = addCheck($("#regCaptcha"), /^[a-zA-Z0-9]{4}$/, "请输入正确的验证码!");
    function doReg() {
        if (regUsername == true && regPwd == true && regConfirmPwd == true && regNickName == true && regCaptcha == true) {
            console.log("!!");
            console.log($(".register form").serializeArray());
            // $.post("pages/register.php", $(".register form").serializeArray(), function (res) {
            //     console.log(res);
            // }, "json");
        }
        return false;
    };


    /* 正则验证 */

    function addCheck(ele, regCon, warnStr) {
        ele.change(function () {
            let con = $(this).val();
            if (isReg(con, regCon)) {
                $(this).css("border-color", "green");
                if ($(this).siblings(".error")) {
                    $(this).siblings(".error").remove();
                    return false;
                }
            } else {
                $(this).css("border-color", "red");
                $(this).parent().append($("<p>").addClass("error").text(warnStr));
                return true;
            }
        });
    }

    function isReg(str, regCon) {
        let reg = regCon;
        return reg.test(str);
    }
});