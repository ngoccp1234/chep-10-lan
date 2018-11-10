var LOGIN_API = 'https://2-dot-backup-server-001.appspot.com/_api/v2/members/authentication';

document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.forms['login-form'];
    if (loginForm == null || loginForm['btn-submit'] == null) {
        alert('Vui lòng thử lại!');
        return;
    }
    loginForm['btn-submit'].onclick = function () {
        var pwdPassword = loginForm['password'];
        var txtEmail = loginForm['email'];
        if (pwdPassword == null || txtEmail == null) {
            alert('Vui lòng thử lại!');
            return;
        }
        var jsMemberLogin = {
            password: pwdPassword.value,
            email: txtEmail.value,
        }
        doLogin(jsMemberLogin);
    }
});

function doLogin(jsMemberLogin) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            var tokenObject = JSON.parse(this.responseText);
            alert(`Đăng nhập thành công. Token là ${tokenObject.token}`);
            localStorage.setItem('token-key', tokenObject.token);
        }
    }
    xhr.open('POST', LOGIN_API, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(JSON.stringify(jsMemberLogin));
}