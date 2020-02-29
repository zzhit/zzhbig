$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 设置邮箱昵称校验
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        }
    });
    // 初始化用户信息
    $(document).on('load', initUserinfo());
    // 提交修改
    $('.userForm .layui-form').on('submit', function (e) {
        e.preventDefault();
        randerUserinfo();
    })
    // 重置表单
    $('.layui-btn-primary').on('click', function (e) {
        e.preventDefault();
        // $.ajax({
        //     type: 'POST',
        //     url: '/my/userinfo',
        //     data: $('.userForm .layui-form').serialize(),
        //     success: function (res) {
        //         if (res.status !== 0) {
        //             return layer.msg('修改用户资料失败!')
        //         }
        //         // console.log(res, '修改');
        //         // window.parent.getInfo();
        //         layer.msg('更新用户信息成功！')
        //         window.parent.way();
        //         window.parent.getInfo();

        //     }
        // });
    })

    // 初始化用户信息(当前用户信息)
    function initUserinfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户资料失败!')
                }
                // $('.user').val(res.data.username);
                // $('.nick').val(res.data.nickname);
                // $('.email').val(res.data.email);
                form = layui.form;
                form.val('form1', res.data);
            }
        });

    }
    // 渲染修改的信息
    function randerUserinfo() {
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $('.userForm .layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户资料失败!')
                }
                // console.log(res, '修改');
                // window.parent.getInfo();
                layer.msg('更新用户信息成功！')
                window.parent.getInfo();

            }
        });
    }

})


