$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 统一为有权限的请求，添加 Headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局 complete
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空 token
            localStorage.removeItem('token')
            // 返回登录页面
            location.href = '/login.html'
        }
    }
})
