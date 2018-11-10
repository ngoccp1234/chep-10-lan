var REGISTER_API = 'https://2-dot-backup-server-001.appspot.com/_api/v2/members';

document.addEventListener('DOMContentLoaded', function () {
    var registerForm = document.forms['register-form'];
    if (registerForm == null || registerForm['btn-submit'] == null) {
        alert('Vui lòng thử lại!');
        return;
    }
    registerForm['btn-submit'].onclick = function () {
        var txtFirstName = registerForm['firstName'];
        var txtLastName = registerForm['lastName'];
        var pwdPassword = registerForm['password'];
        var confirmPassword = registerForm['confirm-password'];
        var txtPhone = registerForm['phone'];
        var txtAddress = registerForm['address'];
        var txtAvatar = registerForm['avatar'];
        var txtEmail = registerForm['email'];
        var selectGender = registerForm['gender'];
        var birthday = registerForm['birthday'];
        if (txtFirstName == null
            || txtLastName == null
            || pwdPassword == null
            || confirmPassword == null
            || txtPhone == null
            || txtAddress == null
            || txtAvatar == null
            || txtEmail == null
            || selectGender == null
            || birthday == null
        ) {
            alert('Vui lòng thử lại!');
            return;
        }
        if (pwdPassword.value != confirmPassword.value) {
            alert('Password không đồng bộ. Vui lòng thử lại!');
            return;
        }
        var jsMember = {
            firstName: txtFirstName.value,
            lastName: txtLastName.value,
            password: pwdPassword.value,
            phone: txtPhone.value,
            address: txtAddress.value,
            avatar: txtAvatar.value,
            gender: selectGender.value,
            birthday: formatDate(birthday.value),
            email: txtEmail.value,
        }
        doRegister(jsMember);
    }
});

function doRegister(jsMember) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var member = JSON.parse(this.responseText);
            alert(`Đăng ký thành công với email ${member.email}`);
        }
    }
    xhr.open('POST', REGISTER_API, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(jsMember));
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}







