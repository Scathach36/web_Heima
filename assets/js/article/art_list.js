$(function () {

    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    // 定义一个查询参数 q ,之后请求数据就把 q 提交到服务器
    let q = {
        pagenum: 1, // 页码，默认请求第一页
        pagesize: 2, // 每页显示几条数据，默认为 2
        cate_id: '',    //文章分类的id
        state: ''   // 文章发布的状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        let d = dt.getDate()

        let hh = dt.getHours()
        let mm = dt.getMinutes()
        let ss = dt.getSeconds()

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 获取文章列表数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                let htmlStr = template('tpl-list', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 获取文章分类列表
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                let htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 筛选功能的实现
    $('#form-search').on('submit', function (e) {
        e.preventDefault()

        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()

        q.cate_id = cate_id
        q.state = state

        initTable()
    })

    // 渲染页面
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 删除按钮绑定事件
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        let len = $('.btn-delete').length
        console.log(len);
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 判断列表中是否还有数据
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })

            layer.close(index);
        });
    })

    initTable()
    initCate()
})