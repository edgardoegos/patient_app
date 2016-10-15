$(function() {

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $('#data_3 .input-group.date').datepicker({
        startView: 2,
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });


    $(".touchspin").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
    });

});