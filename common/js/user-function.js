$(".top-nav").load(location.pathname.indexOf("/pages") > -1 ? "../common/pages/top-bar.html" : "common/pages/top-bar.html", function() {
    $(".con-right").load(location.pathname.indexOf("/pages") > -1 ? "../common/pages/user-part.html" : "common/pages/user-part.html", function() {
        /* 保持登录状态 */
        if (sessionStorage.getItem("username") && sessionStorage.getItem("name") && sessionStorage.getItem("type")) {
            showUser();
        }
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

        /* 退出登录 */
        $("#logout, #userLogout").click(function () {
            $(".user-info, #username, #logout").hide();
            $(".login, #login, #register").slideDown();
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("type");
        });

        // 记住我
        if ($.cookie("username") != "null" && $.cookie("password") != "null") {
            $("#usernameInput").val($.cookie("username"));
            $("#pwdInput").val($.cookie("password"));
        }

        /* 验证码src适配 */
        /* 验证码点击刷新 */
        $(".changeCap").each(function () {
            $(this).children(".captcha").prop("src", location.pathname.indexOf("/pages") > -1 ? "captcha.php" : "pages/captcha.php");
            $(this).click(function () {
                let capSrc = $(this).children(".captcha").prop("src");
                $(this).children(".captcha").prop("src", capSrc + "?r=" + Math.random());
            });
        });

        /* 注册框验证 */
        addCheck($("#usernameInp"), /^[a-zA-Z0-9_]{4,12}$/, "请输入正确的用户名!");
        addCheck($("#pwdInp"), /^[a-zA-Z0-9_]{4,16}$/, "请输入正确的密码!");
        (function () {
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
        addCheck($("#nickname"), /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,6}$/, "请输入正确的昵称!");
        addCheck($("#regCaptcha"), /^[a-zA-Z0-9]{4}$/, "请输入正确的验证码!");
        addCheck($("#loginCaptcha"), /^[a-zA-Z0-9]{4}$/, "请输入正确的验证码!");

        /* 正则验证 */

        function addCheck(ele, regCon, warnStr) {
            ele.on("input", function () {
                let con = $(this).val();
                if (isReg(con, regCon)) {
                    $(this).css("border-color", "green");
                    if ($(this).siblings(".error")) {
                        $(this).siblings(".error").remove();
                        return false;
                    }
                } else {
                    $(this).css("border-color", "red");
                    if ($(this).parent().children(".error").length == 0) {
                        $(this).parent().append($("<p>").addClass("error").text(warnStr));
                    }
                    return true;
                }
            });
        }

        function isReg(str, regCon) {
            let reg = regCon;
            return reg.test(str);
        }
    });
});

function showUser() {
    $(".login, #login, #register").hide();
    /* 登录成功后显示用户信息 */
    $(".user-info .show-name").text(sessionStorage.getItem("name"));
    $(".user-info .show-username, #username").text(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("type") == 0) {
        $(".user-info .show-type").text("管理员");
        $(".user-info img").prop({
            src: location.pathname.indexOf("/pages") > -1 ? "../img/admin.jpg" : "img/admin.jpg",
            width: 100
        });
    } else {
        $(".user-info .show-type").text("会员");
        $(".user-info img").prop({
            src: location.pathname.indexOf("/pages") > -1 ? "../img/default_head.png" : "img/default_head.png",
            width: 70
        });
    }
    $(".user-info, #username, #logout").slideDown();
}

function changeAHref(ele, url1, url2) {
    if (ele instanceof jQuery) {
        ele.prop("href", location.pathname.indexOf('/pages') == -1 ? url1 : url2);
    } else {
        $(ele).prop("href", location.pathname.indexOf('/pages') == -1 ? url1 : url2);
    }
}

/* 登录表单提交 */
function doLogin() {
    let logCaptcha = isGreen($("#loginCaptcha"));
    if (logCaptcha) {
        $.post(location.pathname.indexOf("/pages") > -1 ? "login.php" : "pages/login.php", $(".login form").serializeArray(),
                function (res) {
            $(".login form").children(".notice").remove();
            if (res.errorcode == 0) {
                /* 记住我 */
                if ($("#rememberMe").prop("checked")) {
                    $.cookie("username", $("#usernameInput").val(), {
                        expires: 7
                    });
                    $.cookie("password", $("#pwdInput").val(), {
                        expires: 7
                    });
                } else {
                    $.cookie("username", null, {
                        expires: 7
                    });
                    $.cookie("password", null, {
                        expires: 7
                    });
                }
                /* 保持用户登录状态 */
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("name", res.data.name);
                sessionStorage.setItem("type", res.data.type);
                $(".login #loginCaptcha").css("border-color", "#ccc");
                $(".login form")[0].reset();
                showUser();
            } else {
                $(".login form").children(".notice").remove();
                $(".login #subLogin").before($("<div>").addClass("notice").text(res.msg));
            }
        }, "json");
    } else {
        $(".login form").children(".notice").remove();
        $(".login #subLogin").before($("<div>").addClass("notice").text("请填写空字段!"));
    }
    return false;
}

/* 注册表单提交 */
function doReg() {
    let regUsername = isGreen($("#usernameInp"));
    let regPwd = isGreen($("#pwdInp"));
    let regConfirmPwd = isGreen($("#confirmpwd"));
    let regNickName = isGreen($("#nickname"));
    let regCaptcha = isGreen($("#regCaptcha"));
    if (regUsername == true && regPwd == true && regConfirmPwd == true && regNickName == true && regCaptcha == true) {
        $.post(location.pathname.indexOf("/pages") > -1 ? "register.php" : "pages/register.php", $(".register form").serializeArray(), function (res) {
            $(".register form").children(".notice").remove();
            if (res.errorcode == 0) {
                $(".register #subReg").before($("<div>").addClass("notice").css("color", "green").text(res.msg));
                $(".register form")[0].reset();
            } else {
                $(".register #subReg").before($("<div>").addClass("notice").text(res.msg));
            }
        }, "json");
    } else {
        $(".register form").children(".notice").remove();
        $(".register #subReg").before($("<div>").addClass("notice").text("请填写空字段!"));
    }
    return false;
}

function isGreen(ele) {
    if (ele.css("border-color") == "rgb(0, 128, 0)") {
        return true;
    } else {
        return false;
    }
}