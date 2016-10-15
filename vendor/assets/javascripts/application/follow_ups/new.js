$(function() {

    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    $('#fld-next-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        startDate: dateToday,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy',
        showOn: 'button'
    });
   
    $(".touchspin").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white',
        max: 200,
    });

     $(".select2_demo_1").select2();

    $('#appointment_status').on("select2:selecting", function(e) {
        // what you would like to happen
    });
});
    
