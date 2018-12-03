var validator = $('#create-form').validate({
    rules:{
        name:{
            required: true,
        },
        singer:{
            required: true,
        },
        author:{
            required: true,
        },
        thumbnail:{
            required: true,
        },
        link:{
            required: true,
        },
        description: {
            required:true
        }

    },
    messages:{
        name:{
            required: '*Vui lòng nhập tên bài hát.',
        },
        singer:{
            required: '*Vui lòng nhập tên ca sĩ.',
        },
        author:{
            required: '*Vui lòng nhập tên tác giả.',
        },
        thumbnail:{
            required: '*Vui lòng chèn ảnh.',
        },
        link:{
            required: '*Vui lòng nhập link bài hát.',
        },
        description: {
            required: '*vui lòng nhập mô tả'
        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            name: $(form['name']).val(),
            singer: $(form['singer']).val(),
            author: $(form['author']).val(),
            thumbnail: $(form['thumbnail']).val(),
            link: $(form['link']).val(),
            description: $(form['description']).val(),
        };
        $.ajax({
                url: CREATE_SONG_API,
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(senderObject),
                headers: { 'authorization': "Basic "+localStorage.getItem('my-token') },
                success: function (data, textStatus, jqXHR) {
                    console.log('success');
                    console.log(data);
                    console.log('----');
                    console.log(data.responseText);
                    console.log('----');
                    console.log(textStatus);
                    console.log('----');
                    console.log(jqXHR);
                    // alert(Lưu thành công bài hát ${data.name});
                    alert('lưu thành công bài hát');

                },
                error: function () {
                    if(Object.keys(jqXHR.responseJSON.error).length > 0)
                    {
                        $('#summary')
                            .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                        validator.showErrors(jqXHR.responseJSON.error);
                    }
                    alert('error');
                }
            }
        );
        return false;
    }
});