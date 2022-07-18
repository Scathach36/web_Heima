$(function () {

    let layer = layui.layer
    let form = layui.form
    // 初始化图片裁剪器
    let $image = $('#image')
    // 裁剪选项
    let options = {
        aspectRadio: 400 / 280,
        preview: '.img-preview'
    }
    // 定义文章的发布状态
    let art_state = '已发布'


    initCate()
    // 初始化富文本编辑器
    initEditor()
    // 初始化裁剪区域
    $image.cropper(options)

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 按下选择按钮的事件
    $('#btnChooseCover').on('click', function () {
        $('#coverFile').click()
    })

    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        let file = e.target.files
        if (file.length === 0) {
            return layer.msg('请选择要上传的图片！')
        }
        let newImgURL = URL.createObjectURL(file[0])
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })

    // 按下存为草稿按钮的事件
    $('#btnSave').on('click', function () {
        art_state = '草稿'
    })

    // 监听表单的提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()

        // 基于 form 表单，快速创建一个 FormData 对象
        let fd = new FormData($(this)[0])

        fd.append('state', art_state)

        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(function (blob) {
            // 将画布上的对象，转换为文件对象
            // 得到文件对象后，进行后续的操作
            // 将文件对象，存储到 fd 之中
            fd.append('cover_img', blob)
            // 发起 ajax 请求
            publishArticle(fd)
        })

        fd.forEach(function (v, k) {
            console.log(k, v);
        })
    })

    // 发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 如果传递的是 FormData 类型的数据，要添加如下配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
            }
        })
    }
})

