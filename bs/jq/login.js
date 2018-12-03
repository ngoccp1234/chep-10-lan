var validator = $('#login-form').validate({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true
        }
    },
    messages: {
        email:{
            required: '*Vui lòng nhập email để đăng nhập',
            email: '*Sai định dạng email'
        },
        password: {
            required: '*Vui lòng nhập mật khẩu để đăng nhập'
        }
    },
    submitHandler: function (form, event) {
        event.preventDefault();
        var senderObject = {
            email: $(form["email"]).val(),
            password: $(form["password"]).val(),
        };
        $.ajax({
            url: LOGIN_API,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(senderObject),
            success: function (data, textStatus, jqXHR) {
                alert("đăng nhập thành công", data.token);
                localStorage.setItem('my-token',data.token)
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (Object.keys(jqXHR.responseJSON.error).length > 0) {
                    $('#summary')
                        .text(`Please fix ${Object.keys(jqXHR.responseJSON.error).length} below!`);
                    validator.showErrors(jqXHR.responseJSON.error);
                }
            }
        });
        return false;
    }
});