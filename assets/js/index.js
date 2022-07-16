$(function () {
    getUserinfo()
})

function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        }
        // 无论请求成功与否，都会执行 complete 中的内容
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空 token
        //         localStorage.removeItem('token')
        //         // 返回登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })

    // 用户退出
    $('#btn-Logout').on('click', function () {
        let layer = layui.layer
        // 弹出提示框
        layer.confirm('是否要退出?', { icon: 3, title: '提示' }, function (index) {
            // 清空 token
            localStorage.removeItem('token')
            // 跳转回登录页
            location.href = '/login.html'

            layer.close(index);
        });
    })
}

function renderAvatar(user) {
    // 获取用户名称
    let name = user.nickname || user.username
    // 渲染欢迎的文本
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 确认渲染的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        // 获取第一个字母
        let first = user.username[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}