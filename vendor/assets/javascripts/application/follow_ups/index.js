

$(function() {

    $(document).on('click', '.btn-update', function(){
        var appointment = $( this ).data('appointment')
        $("#frm-appointment").attr("action", "/appointments/" + appointment.id);
        
        $('#mdl-header').text(appointment.last_name + ', ' + appointment.first_name + ' ' + appointment.middle_name + ' Appointment')
        $('#appointment_consultation_date').val(moment(appointment.consultaion_date).format('DD/MM/YYYY'));
        $('#appointment_systolic').val(appointment.systolic);
        $('#appointment_diastolic').val(appointment.diastolic);
        $('#appointment_weight').val(appointment.weight);
        $('#appointment_complaint').val(appointment.complaint);
        
        $('#mdl-appointment').modal();
    });
    
    $(document).on('click', '#btn-delete', function(){
        var user = $( this ).data('user')
        $("#frm-delete").attr("action", "/settings/users/" + user.id);
        $('#spn-name').text(toTitleCase(user.first_name) + " " + toTitleCase(user.last_name));
        $('#mdl-delete').modal()
    });
    
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });

    /* Init DataTables */
    var oTable = $('#tbl-appointments').dataTable();

    $('#fld-consultation-date .input-group.date').datepicker({
            todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
        });
    
    $(".touchspin").TouchSpin({
            verticalbuttons: true,
            buttondown_class: 'btn btn-white',
            buttonup_class: 'btn btn-white'
        });
        
    
});
    
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}