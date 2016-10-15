$(function() {
    
    $(".select2_demo_1").select2(); 
    
     $('#fld-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });
    
});