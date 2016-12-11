$(function() {

    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    /* Init DataTables */
    $('#tbl-appointments').dataTable({
        "bSort": false
    });
    $('#tbl-future').dataTable();
    $('#tbl-appointments-all').dataTable();


    $("body").delegate("#fld-record-date .input-group.date", "focusin", function(){
        $(this).datepicker({
            todayBtn: "linked",
            keyboardNavigation: false,
            forceParse: false,
            autoclose: true,
            format: 'dd/mm/yyyy'
        }).on('changeDate', function (e) {
            $("#filter_record_date").prop('required', true);
            $('#fld-start').val("");
            $('#fld-end').val("");
            $("#fld-start").prop('required', false);
            $('#fld-end').prop('required', false);
        });
    });

    $('#fld-record-date-range .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (e) {
        $("#fld-start").prop('required', true);
        $('#fld-end').prop('required', true);
        $('#fld-record-date .input-group.date').find('input').val("");
        $('#fld-record-date .input-group.date').find('input').prop('required', false);
    });

    $('#advance-filter').click(function() {
        $('#mdl-advance-filter').modal();
    });

    $(document).on('click', '.btn-current-status-complete', function(){

        var id = $(this).closest('.btn-group').data('appointment-id');
        var name = $(this).closest('.btn-group').data('patient');

        $('#mdl-btn-complete').removeClass('hidden');
        $('#mdl-btn-cancel').addClass('hidden');

        $('#mdl-message').text('Are you sure you want to mark ' + name + ' appointment complete? This process is irreversible.');
        $('#fld-hdn-appointment-id').val(id);
        $('#mdl-appointment').modal();
    });

    $(document).on('click', '.btn-future-status-cancel', function(){

        var id = $(this).closest('.btn-group').data('id');
        var name = $(this).closest('.btn-group').data('patient-name');

        $('#mdl-btn-complete').addClass('hidden');
        $('#mdl-btn-cancel').removeClass('hidden');

        $('#mdl-message').text('Are you sure you want to cancel ' + name + ' appointment complete? This process is irreversible.');
        $('#fld-hdn-appointment-id').val(id);
        $('#mdl-appointment').modal();
    });

    $(document).on('click', '.btn-overdue-status-cancel', function(){

        var id = $(this).closest('.btn-group').data('id');
        var name = $(this).closest('.btn-group').data('patient-name');

        $('#mdl-btn-complete').addClass('hidden');
        $('#mdl-btn-cancel').removeClass('hidden');

        $('#mdl-message').text('Are you sure you want to cancel ' + name + ' appointment complete? This process is irreversible.');
        $('#fld-hdn-appointment-id').val(id);
        $('#mdl-appointment').modal();
    });

    $('#mdl-btn-complete').click(function () {
        var id = $('#fld-hdn-appointment-id').val();
        var self = $(this);

        var data = {
            appointment: {
                status: "complete"
            }
        }

        $.ajax({
            type: "POST",
            url: "/api/v1/appointments/" + id,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", "PUT");
            },
            success: function (data) {
                $('#mdl-appointment').modal('toggle');
                location.reload();
            },
            error: function (data) {
                console.log('Failed: ' + JSON.stringify(data));
            }
        });

    });

    $('#mdl-btn-cancel').click(function () {
        var id = $('#fld-hdn-appointment-id').val();
        var self = $(this);

        var data = {
            appointment: {
                status: "cancel"
            }
        }

        $.ajax({
            type: "POST",
            url: "/api/v1/appointments/" + id,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", "PUT");
            },
            success: function (data) {
                $('#mdl-appointment').modal('toggle');
                location.reload();
            },
            error: function (data) {
                console.log('Failed: ' + JSON.stringify(data));
            }
        });

    })

    $(document).on('click', '#btn-delete', function(){
        var user = $( this ).data('user')
        $("#frm-delete").attr("action", "/settings/users/" + user.id);
        $('#spn-name').text(toTitleCase(user.first_name) + " " + toTitleCase(user.last_name));
        $('#mdl-delete').modal()
    });

    $(document).on('click', ".btn-current-status", function () {
        var id = $( this ).closest('.btn-group').data('appointment-id');
        var self = $(this)
        var data = {
            appointment: {
                status: $(this).data('type')
            }
        }

        $.ajax({
            type: "POST",
            url: "/api/v1/appointments/" + id,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", "PUT");
            },
            success: function (data) {

                $('.btn-status-' + id).removeClass('btn-warning');
                $('.btn-status-' + id).removeClass('btn-white');

                $('.btn-status-' + id).addClass('btn-white');

                self.removeClass('btn-white');
                if (self.data('type') == "complete") {
                    self.addClass('btn-primary');
                } else {
                    self.addClass('btn-warning');
                }
            },
            error: function (data) {
                console.log('Failed: ' + JSON.stringify(data));
            }
        });

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

    $('.btn-edit').click(function () {
        console.log('this: ' + JSON.stringify($( this ).data('patient')))
        $('#mdl-header').text($( this ).data('patient') + " Appointment");
    });



    $('#fld-consultation-date .input-group.date').datepicker({
            todayBtn: "linked",
        startDate: dateToday,
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
        });

    $('#fld-new-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        startDate: dateToday,
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

    $(document).on('click', '.btn-future-reschedule', function() {
        var appointment_id = $( this ).closest('.btn-group').data('id');
        var patient_name = $( this ).closest('.btn-group').data('patient-name');

        $('#mdl-reschedule-header').text('Reschedule '  + patient_name  + ' Appointment');

        $('#appointment_id').val(appointment_id);

        $('#mdl-appointment-reschedule').modal();

    });

    $(document).on('click', '.btn-future-reschedule', function() {
        var appointment_id = $( this ).closest('.btn-group').data('id');
        var patient_name = $( this ).closest('.btn-group').data('patient-name');

        $('#mdl-reschedule-header').text('Reschedule '  + patient_name  + ' Appointment');

        $('#appointment_id').val(appointment_id);

        $('#mdl-appointment-reschedule').modal();

    });

    $('#mdl-btn-reschedule').click(function () {
        var appointment_id = $('#appointment_id').val();
        var new_date = $('#new_date').val();

        var self = $(this)
        var data = {
            appointment: {
                consultation_date: new_date
            }
        }

        $.ajax({
            type: "POST",
            url: "/api/v1/appointments/" + appointment_id,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(data),
            beforeSend: function(xhr) {
                xhr.setRequestHeader("X-Http-Method-Override", "PUT");
            },
            success: function (data) {
                $('#mdl-appointment-reschedule').modal();
                location.reload();
            },
            error: function (data) {
                console.log('Failed: ' + JSON.stringify(data));
            }
        });

    });
    
});
    
function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}