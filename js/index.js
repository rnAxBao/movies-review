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
            console.log(data);
            let res = data;
            let ulWrap = $(".screening .ui-slide-content");
            for (let i = 0; i < res.total; i++) {
                let li = $('<li class="ui-slide-item"></li>');
                if (i < res.subjects.length) {
                    addMovieItem(ulWrap, li, res, i);
                } else {
                    // $.ajax({
                    //     url: "https://api.douban.com/v2/movie/in_theaters",
                    //     type: "get",
                    //     data: {
                    //         city: "上海",
                    //         start: 20
                    //     },
                    //     dataType: "jsonp",
                    //     success: function (data) {
                    //         let res2 = data;
                    //         console.log(i);
                    //         let j = i - 20;
                    //         addMovieItem(ulWrap, li, res2, j);
                    //     }
                    // });
                }
            }

            function addMovieItem(faEle, sonEle, data, index) {
                let movieId = data.subjects[index].id;
                let moviePic = data.subjects[index].images.small;
                let movieName = data.subjects[index].title;
                let movieRating = data.subjects[index].rating.average;
                let html = `
                            <ul>
								<li class="poster">
									<a href="">
									    <img src=${moviePic} alt=${movieName}>
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
            // let lastLiCount = data.subjects.length % 5;
            // for (let i = 0; i < 5; i++) {
            //     if (i < lastLiCount) {
            //         let html = `<li class="ui-slide-item" data-id="${movieId}">
            // 				<ul>
            // 					<li class="poster">
            // 						<a href="">
            // 							< img src = "${moviePic}"
            // 							alt = "${movieName}" >
            // 						</a>
            // 					</li>
            // 					<li class="title">
            // 						<a href="">${movieName}</a>
            // 					</li>
            // 					<li class="rating">
            // 						<span class="rating-star"></span>
            // 						<span class="subject-rate">${movieRating}</span>
            // 					</li>
            // 					<li class="ticket_btn">
            // 						<span>
            // 							<a href="" target="_blank">加入影库</a>
            // 						</span>
            // 					</li>
            // 				</ul>
            //             </li>`;
            //         let movieId = res.subjects[i].id;
            //         let moviePic = res.subjects[i].images.small;
            //         let movieName = res.subjects[i].title;
            //         let movieRating = res.subjects[i].rating.average;

            //     } 
            // }
        }
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