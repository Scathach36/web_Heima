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
            console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 渲染用户头像
            renderAvatar(res.data)
        }
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