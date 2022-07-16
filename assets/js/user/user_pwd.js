$(function () {
    const form = layui.form

    // 自定义密码校验规则
    form.verify({
        password: [
            /^[\S]{6,12}$/,
            '密码必须为6-12位，且不包含空格'
        ],
        repassword: function (value) {
            let password = $('.layui-form-item [name=newPwd]').val()
            if (value !== password) {
                return '两次输入的密码不一致'
            }
        }
    })

    // 表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg('更新密码失败！')
                } else if (res.status === 1 && res.message === '原密码错误！') {
                    layui.layer.msg('原密码错误！')
                }
                layui.layer.msg('更新密码成功！请重新登录！')
                $('.layui-form')[0].reset()
                // 清除 token
                localStorage.removeItem('token')
                // 返回登录页面
                window.parent.location.href = '/login.html'
            }
        })
    })
})