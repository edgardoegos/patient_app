$(function() {

    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    $(".select2_demo_1").select2();

     $('#fld-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#date_lmp .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (e) {

        var date = $('#date_lmp').find('input').val().split('/');

        var day = date[0];
        var month = date[1];
        var year = date[2];

        var newDate = new Date(month + "/" + day + "/" + year );
        var aogNewDate = new Date(month + "/" + day + "/" + year );

        var dateForWeeks =  new Date(year + "/" + month + "/" + day );

        var less3Months = new Date(newDate.setMonth(newDate.getMonth() - 3));
        var add7Days = new Date(less3Months.setDate(new Date(moment(less3Months).format('L')).getDate() + 7));
        var add1Year = new Date(add7Days.setFullYear(new Date(moment(add7Days).format('L')).getFullYear() + 1));

        var displayDate = moment(add1Year).format("LL");
        var edcDate = moment(add1Year).format("L");
        var formatEDCDate = edcDate.split('/')[1] + "/" + edcDate.split('/')[0] + "/" + edcDate.split('/')[2]

        var aogAdd33Date = new Date(aogNewDate.setDate(aogNewDate.getDate() + 33));
        var aogDate = moment(aogAdd33Date).format("L");
        var aogDisplayDate = moment(aogAdd33Date).format("LL");
        var formatAOGDate = aogDate.split('/')[1] + "/" + aogDate.split('/')[0] + "/" + aogDate.split('/')[2];

        var totalWeeks = moment(new Date()).diff(moment(dateForWeeks), 'weeks');

        $('#fld-edc-display').val(displayDate);
        $('#appointment_medical_records_edc').val(formatEDCDate);

        $('#fld-aog-display').val(totalWeeks);
        $('#appointment_medical_records_aog').val(totalWeeks);

    });

    $('#fld-record-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy',
        showOn: 'button'
    });

    $('#fld-return-visit .input-group.date').datepicker({
        todayBtn: "linked",
        startDate: dateToday,
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#appointment_medical_records_type').change(function() {
        console.log('type: ' + $( this ).val())
        if ($( this ).val() == 'gyne') {

            $('#edc-container').addClass('hidden');
            $('#aog-container').addClass('hidden');

            $('#edc-container').find('input').val("");
            $('#aog-container').find('input').val("");

        } else {

            $('#edc-container').removeClass('hidden');
            $('#aog-container').removeClass('hidden');

            if ($('#date_lmp').find('input').val() != "") {
                var date = $('#date_lmp').find('input').val().split('/');

                var day = date[0];
                var month = date[1];
                var year = date[2];

                var newDate = new Date(month + "/" + day + "/" + year );
                var aogNewDate = new Date(month + "/" + day + "/" + year );

                var dateForWeeks =  new Date(year + "/" + month + "/" + day );

                var less3Months = new Date(newDate.setMonth(newDate.getMonth() - 3));
                var add7Days = new Date(less3Months.setDate(new Date(moment(less3Months).format('L')).getDate() + 7));
                var add1Year = new Date(add7Days.setFullYear(new Date(moment(add7Days).format('L')).getFullYear() + 1));

                var displayDate = moment(add1Year).format("LL");
                var edcDate = moment(add1Year).format("L");
                var formatEDCDate = edcDate.split('/')[1] + "/" + edcDate.split('/')[0] + "/" + edcDate.split('/')[2];

                var aogAdd33Date = new Date(aogNewDate.setDate(aogNewDate.getDate() + 33));
                var aogDate = moment(aogAdd33Date).format("L");
                var aogDisplayDate = moment(aogAdd33Date).format("LL");
                var formatAOGDate = aogDate.split('/')[1] + "/" + aogDate.split('/')[0] + "/" + aogDate.split('/')[2];

                var totalWeeks = moment(new Date()).diff(moment(dateForWeeks), 'weeks');

                $('#fld-edc-display').val(displayDate);
                $('#appointment_medical_records_edc').val(formatEDCDate);

                $('#fld-aog-display').val(totalWeeks);
                $('#appointment_medical_records_aog').val(totalWeeks);
            }
        }
    });

});