$(function() {
    renderUsers()
})
function renderUsers() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) return alert(res.message)
            console.log(res.data);
            var name = res.data.nickname || res.data.username;
            $('#usersname').html('欢迎您,' + name);
            $('#user-avatar').attr('src', res.data.user_pic || '/assets/images/logo.png')
        }
    })
}