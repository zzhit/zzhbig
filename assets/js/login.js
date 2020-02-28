$(function () {
    // 登录注册切换功能
    $('.login').on('click', function () {
        $('.loginBox').hide();
        $('.regBox').show();
    })
    $('.reg').on('click', function () {
        $('.loginBox').show();
        $('.regBox').hide();
    })
    // 设置表单校验
    var form = layui.form;
    var layer = layui.layer;
    var value = $('.loginBox input [name=username]').val()
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePsd: function (value, item) {
            var rePsd = $('.firstPsd').val().trim();
            if (value !== rePsd) {
                return '两次密码不一致,请重新输入'
            }
        }

    });

    //ajax发送表单
    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录!');
                $('.reg').click();
                console.log('ok');
            }
        })
    })

    // ajax登录

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token);
                console.log(1);

                location.href = '/index.html';
            }
        })
    })



})