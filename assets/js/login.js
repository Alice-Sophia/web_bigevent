$(function() {
    $('#reg-link').on('click', function() {
        $('.reg-content').hide();
        $('.login-content').show();
    })
    $('#login-link').on('click', function() {
        $('.reg-content').show();
        $('.login-content').hide();

    })
    $('#reg-btn').on('click', function(e) {
        var regUsername = /^[\S]+$/;
        var regPassword = /^[a-zA-Z0-9_]{6,20}$/;
        var usernameValue = $('#reg-form [name="username"]').val().trim();
        var passwordValue = $('#reg-form [name="password"]').val().trim();
        var repasswordValue = $('#reg-form [name="repassword"]').val().trim();
        var resultUsername = regUsername.test(usernameValue);
        var resultPassword = regPassword.test(passwordValue);
        if (!resultUsername) return alert('用户名不能为空或包含空字符');
        if (!resultPassword) return alert('密码必须为6-20位数字/字母/下划线组成')
        if (!(repasswordValue == passwordValue)) return alert('两次密码输入不一致!')
        var data = {
            username: usernameValue,
            password: passwordValue
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) return alert(res.message)
            alert('注册成功,请登录!')
            $('#reg-link').click();
            $('#login-form [name="username"]').val(usernameValue);
            $('#login-form [name="password"]').val(passwordValue);
        })

        
    })
    $('#login-btn').on('click', function(e) {
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $('#login-form').serialize(),
            success: function(res) {
                if (res.status != 0) return alert(res.message);
                alert('登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html';
            }
        })
    })
})
