$(function() {
    $('#link_login').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_reg').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})