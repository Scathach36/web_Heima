$(function () {
    const layer = layui.layer
    // 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 创建裁剪区域
    $image.cropper(options)

    // 上传按钮绑定事件
    $('#btnUpload').on('click', function (e) {
        $('#file').click()
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function (e) {
        let filesList = e.target.files
        console.log(filesList);
        if (filesList.length === 0) {
            layer.msg('请选择照片！')
        }

        // 拿到用户选择的文件
        let file = filesList[0]
        // 根据选择的文件，创建一个对应的 URL 地址
        let newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置照片的路径，之后创建新的裁剪区域
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })

    // 确定按钮事件
    $('#btnConfirm').on('click', function (e) {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        let dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png')   // 将 Canvas 画布上的内容，转换为 base64 格式的字符串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar : dataURL
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    layer.msg('更新头像失败！')
                }
                layer.msg('更新头像成功！')
                window.parent.getUserinfo()
            }
        })
    })
})