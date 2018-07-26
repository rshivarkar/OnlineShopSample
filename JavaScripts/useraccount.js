var userdata = 
{
    emailaddress: '',
    password: '',
    id : 0,
};

function loginuser() {
    $("#iddivlogin").html("");

    var emailaddress = document.getElementById('idemailaddress').value;
    var password = document.getElementById('idpassword').value;

    userdata = {
        emailaddress: emailaddress,
        password: password,
        id : 0,
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:7543/api/Default1/login",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(userdata),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () { beforeLogin(); },
        success: function (id) { AfteLoginSuccess(id); },
        failure: function (errMsg) { AfterLoginFailure(); }
    });


}

function beforeLogin() {
    $("#iddivlogin").append('<img src="Images/checkoutwait.gif" alt="processing ....">');
}
function AfteLoginSuccess(id) {
    $("#iddivlogin").html("");

    if (id > 0) {

        userdata.id = id;
             
        $('#idloginlink').css("display", "none");
        $('#iduserlogindropdown').css("display", "block");

        var t = document.getElementById('idImageUser');
        //// t.src = 'blah.jpg'; you can show iser image here.
        t.title = "Logged in as:" + userdata.emailaddress;
        $('[data-toggle="tooltip"]').tooltip();
        $("#btnclose").click();
    }
    else {
        $("#iddivlogin").append('<p> Login failed </p>');
    }


}
function AfterLoginFailure() {
    $("#btnclose").click();
}

function logout() {
    $('#idloginlink').css("display", "block");
    $('#iduserlogindropdown').css("display", "none");
}