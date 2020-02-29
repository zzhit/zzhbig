$(function () {
    // 引入layui内置对象
    var form = layui.form;
    var layer = layui.layer;
    // 设置密码检验格式
    form.verify({
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        fPsd: function (value, item) {
            var oldPsd = $('.oldPsd').val().trim();
            if (value === oldPsd) {
                return '新旧密码不允许一致'
            }
        },
        rePsd: function (value, item) {
            var userPsd = $('.userPsd').val().trim();
            if (value !== userPsd) {
                return '两次输入密码不一致!'
            }
        }
    });
    // 请求修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更改密码失败!')
                }
                layer.msg('更改密码成功!');
                $('#form1')[0].reset();
            }
        })
    })

})