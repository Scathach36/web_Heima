$(function() {
    $('#link_login').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_reg').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 获取layui的form表单
    let form = layui.form
    // 获取layui的layer
    let layer = layui.layer
    // 自定义校验规则
    form.verify({
        password:[
            /^[\S]{6,12}$/,
            '密码必须为6-12位，且不包含空格'
        ],
        repassword: function(value) {
            let password = $('.reg-box [name=password]').val()
            if (value !== password) {
               return '两次输入的密码不一致' 
            }
        },
        username: [
            /^[a-zA-Z]([a-zA-Z0-9_]{5,11})$/,
            '只能以英文字母开头，且只包含英文、数字、下划线的6-12位'
        ]
    })

    // 注册
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()

        let data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }

        $.post('/api/reguser', data, function (res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            $('#link_reg').click()
        })
    })

    // 登录
    $('#form-login').on('submit', function (e) {
        e.preventDefault()

        let data = {
            username: $('.login-box [name=username]').val(),
            password: $('.login-box [name=password]').val()
        }

        $.post('/api/login', data, function (res) {
            if(res.status !== 0) {
                layer.msg(res.message)
            }
            layer.msg('登录成功')
            // 将登录成功的token值，放到localStorage中
            localStorage.setItem('token',res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        })
    })
})