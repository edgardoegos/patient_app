window.onload = function () {
    document.getElementById("user_password").onchange = validatePassword;
    document.getElementById("user_password_confirmation").onchange = validatePassword;
}

$(function() {

    $(".select2_demo_1").select2();

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
    
    $('#data_3 .input-group.date').datepicker({
        startView: 2,
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });

});

function validatePassword() {
    var pass2 = document.getElementById("user_password_confirmation").value;
    var pass1 = document.getElementById("user_password").value;
    if (pass1 != pass2) {
        document.getElementById("user_password_confirmation").setCustomValidity("Passwords do not match");
    } else {
        document.getElementById("user_password_confirmation").setCustomValidity('');
    }
}