$(function () {
    let form = layui.form

    form.verify({
        nickname: [
            /^[\S]{1,6}$/,
            '请输入1-6位的昵称'
        ]
    })

    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    layui.layer.msg('获取用户信息失败！')
                }
                // 使用 form.val 快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo()

    // 重置效果
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 表单提交事件
    $('#formUserInfo').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg('更新用户信息失败！')
                }
                layui.layer.msg('更新用户信息成功！')

                // 调用父页面中的方法
                window.parent.getUserinfo()
            }
        })
    })
})