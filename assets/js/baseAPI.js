$.ajaxPrefilter(function (option) {
    console.log(option, 'ok1');

    option.url = 'http://www.liulongbin.top:3007' + option.url;
    // 设置权限网页的响应头配置
    if (option.url.includes('/my')) {
        option.headers = {
            Authorization: localStorage.getItem('token')
        }
        console.log("用户信息已采集");

        // 设置权限进入用户网页
        option.complete = function (res) {
            console.log(res);

            if (res.responseJSON.status !== 0 && res.responseText.message !== "获取用户基本信息成功!") {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    }

})