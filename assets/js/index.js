$(function () {
    // 登录页面时渲染用户头像及姓名
    // $(document).on('load', getInfo());

    getInfo();
    // 退出登录
    backOut();

})

// 获取用户信息并渲染
var getInfo = function () {
    console.log(111);
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res, '用户信息');
            if (res.status !== 0) {
                return
            }
            rander(res);
        }
    })

}

// 渲染信息
function rander(res) {
    // 头像&名字
    var uname = res.data.nickname || res.data.username;
    if (!res.data.user_pic) {
        $('.account img').hide();
        $('.avatar').html(uname[0].toUpperCase()).show();
        $('.welcome').html('欢迎&nbsp;&nbsp;' + uname);
        console.log('执行');

    } else {
        $('.account img').prop('src', res.data.user_pic).show();
        $('.avatar').hide();
        $('.welcome').html('欢迎&nbsp;&nbsp;' + uname);
        console.log('执行');

    }
}

// 退出登录功能
function backOut() {
    var layer = layui.layer;
    $('.outBtn').on('click', function () {
        layer.confirm('确认退出吗?', { icon: 3, title: '提示' }, function (index) {
            console.log('yes');
            layer.close(index);
            // 清除用户信息
            localStorage.removeItem('token');
            location.href = '/login.html';
        }, function (index) {
            console.log('no');
            layer.close(index);
        });
    })
}

