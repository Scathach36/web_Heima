$(function () {

    initArtCateList()

    let layer = layui.layer
    let form = layui.form

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败！')
                }
                let htmlStr = template('tpl-table', res)
                $('#table-artCate').html(htmlStr)
            }
        })
    }

    let indexAdd = null
    let indexEdit = null

    // 添加类别按钮事件
    $('#btnAddCate').on('click', function (e) {
        indexAdd = layer.open(
            {
                type: 1,
                title: '添加文章类别',
                area: [
                    '500px', '300px'
                ],
                content: $('#dialog-addCate').html()
            }
        )
    })

    // 通过代理的方式，为 form-addCate 添加 submit 事件
    $('body').on('submit', '#form-addCate', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章类别失败！')
                }
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    // 通过代理的方式，为 btn-editCate 添加点击事件
    $('#table-artCate').on('click', '.btn-editCate', function (e) {
        indexEdit = layer.open(
            {
                type: 1,
                title: '修改文章类别',
                area: [
                    '500px', '300px'
                ],
                content: $('#dialog-editCate').html()
            }
        )

        // 获取 id
        let id = $(this).attr('data-id')
        // 根据 id 发起获取文章分类
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-editCate', res.data)
            }
        })
    })

    // 通过代理的方式，为 form-editCate 添加 submit 事件
    $('body').on('submit', '#form-editCate', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 通过代理的方式，为 btn-deleteCate 添加点击事件
    $('#table-artCate').on('click', '.btn-deleteCate', function (e) {
        let id = $(this).attr('data-id')

        layer.confirm('确认要删除文章分类？', { icon: 3, title: '提示' }, function (index) {
            
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    initArtCateList()
                }
            })

            layer.close(index);
        });
    })
})