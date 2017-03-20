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
    }).on('changeDate', function (e) {
        var date = $('#data_3').find('input').val().split('/');

        var day = date[0];
        var month = date[1];
        var year = date[2];

        var dob = new Date(month + "/" + day + "/" + year );

        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        console.log('dob: ' + $('#data_3').find('input').val());

        $('#patient_age').val(age);
        $('#display_field_age').val(age);
    });

    $(".touchspin").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white'
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
        var formatEDCDate = edcDate.split('/')[1] + "/" + edcDate.split('/')[0] + "/" + edcDate.split('/')[2];

        var aogAdd33Date = new Date(aogNewDate.setDate(aogNewDate.getDate() + 33));
        var aogDate = moment(aogAdd33Date).format("L");
        var aogDisplayDate = moment(aogAdd33Date).format("LL");
        var formatAOGDate = aogDate.split('/')[1] + "/" + aogDate.split('/')[0] + "/" + aogDate.split('/')[2];

        var totalWeeks = moment(new Date()).diff(moment(dateForWeeks), 'weeks');

        $('#fld-edc-display').val(displayDate);
        $('#patient_medical_record_edc').val(formatEDCDate);

        $('#fld-aog-display').val(totalWeeks);
        $('#patient_medical_record_aog').val(totalWeeks);

    });

    $('#fld-record-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#fld-return-visit .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $("#past-medical-history").change(function(){
        processMedicalHistoryFiles(this.files);
    });

    $('#past-medical-history').on('filecleared', function(event) {
        $('#medical-records-conrtainer').empty();
    });

    $("#laboratory-results").change(function(){
        processLaboratoryResultsFiles(this.files);
    });

    $('#laboratory-results').on('filecleared', function(event) {
        $('#laboratory-results-container').empty();
    });

    $("#physical-examinations").change(function(){
        processPhysicalExaminationFiles(this.files);
    });

    $('#physical-examinations').on('filecleared', function(event) {
        $('#physical-examinations-container').empty();
    });

    $("#past-medical-history").fileinput({
        showUpload: false,
        layoutTemplates: {
            main1: "{preview}\n" +
            "<div class=\'input-group {class}\'>\n" +
            "   <div class=\'input-group-btn\'>\n" +
            "       {browse}\n" +
            "       {upload}\n" +
            "       {remove}\n" +
            "   </div>\n" +
            "   {caption}\n" +
            "</div>"
        }
    });

    $("#laboratory-results").fileinput({
        showUpload: false,
        layoutTemplates: {
            main1: "{preview}\n" +
            "<div class=\'input-group {class}\'>\n" +
            "   <div class=\'input-group-btn\'>\n" +
            "       {browse}\n" +
            "       {upload}\n" +
            "       {remove}\n" +
            "   </div>\n" +
            "   {caption}\n" +
            "</div>"
        }
    });

    $("#physical-examinations").fileinput({
        showUpload: false,
        layoutTemplates: {
            main1: "{preview}\n" +
            "<div class=\'input-group {class}\'>\n" +
            "   <div class=\'input-group-btn\'>\n" +
            "       {browse}\n" +
            "       {upload}\n" +
            "       {remove}\n" +
            "   </div>\n" +
            "   {caption}\n" +
            "</div>"
        }
    });

    $('input[type=radio][name="patient[medical_record][type]"]').change(function() {
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
                $('#patient_medical_record_edc').val(formatEDCDate);

                $('#fld-aog-display').val(totalWeeks);
                $('#patient_medical_record_aog').val(totalWeeks);
            }
        }
    });

});

function processMedicalHistoryFiles(files) {

    $('#medical-records-conrtainer').empty();

    var numFiles = files.length;

    if (numFiles > 1) {

        function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if ( files && files[0] ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {

                    var index = $('#medical-records-container > .patient-attachment-container').length

                    var html = '';

                    html += '<div class="patient-attachment-container" data-index="' + index + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + this.result + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][type]" value="past_medical_records">';
                    html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                    html += '</div>';

                    $('#medical-records-container').append( html );

                }, false);

                reader.readAsDataURL(file);
            }

        }

        if (files) {
            [].forEach.call(files, readAndPreview);
        }

    } else {
        if (files && files[0]) {
            var FR= new FileReader();
            FR.onload = function(e) {
                var html = '';

                html += '<div class="patient-attachment-container" data-index="0">';
                html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + e.target.result + '">';
                html += '<input type="hidden" name="patient[patient_attachments][][type]" value="past_medical_records">';
                html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                html += '</div>';

                $('#medical-records-container').append( html );
                console.log("base64: " + e.target.result);
        };
            FR.readAsDataURL( files[0] );
        }
    }
}

function processLaboratoryResultsFiles(files) {

    $('#laboratory-results-container').empty();

    var numFiles = files.length;

    if (numFiles > 1) {

        function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if ( files && files[0] ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {

                    var index = $('#laboratory-results-container > .patient-attachment-container').length

                    var html = '';

                    html += '<div class="patient-attachment-container" data-index="' + index + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + this.result + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][type]" value="laboratory_results">';
                    html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                    html += '</div>';

                    $('#laboratory-results-container').append( html );

                }, false);

                reader.readAsDataURL(file);
            }

        }

        if (files) {
            [].forEach.call(files, readAndPreview);
        }

    } else {

        if (files && files[0]) {
            var FR= new FileReader();
            FR.onload = function(e) {
                var html = '';

                html += '<div class="laboratory-results-container" data-index="0">';
                html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + e.target.result + '">';
                html += '<input type="hidden" name="patient[patient_attachments][][type]" value="laboratory_results">';
                html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                html += '</div>';

                $('#laboratory-results-container').append( html );
            };
            FR.readAsDataURL( files[0] );
        }

    }

}

function processPhysicalExaminationFiles(files) {

    $('#physical-examinations-container').empty();

    var numFiles = files.length;

    if (numFiles > 1) {

        function readAndPreview(file) {
            // Make sure `file.name` matches our extensions criteria
            if ( files && files[0] ) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {

                    var index = $('#physical-examinations-container > .patient-attachment-container').length

                    var html = '';

                    html += '<div class="physical-examinations-container" data-index="' + index + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + this.result + '">';
                    html += '<input type="hidden" name="patient[patient_attachments][][type]" value="physical_examinations">';
                    html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                    html += '</div>';

                    $('#physical-examinations-container').append( html );

                }, false);

                reader.readAsDataURL(file);
            }

        }

        if (files) {
            [].forEach.call(files, readAndPreview);
        }

    } else {

        if (files && files[0]) {
            var FR= new FileReader();
            FR.onload = function(e) {
                var html = '';

                html += '<div class="physical-examinations-container" data-index="0">';
                html += '<input type="hidden" name="patient[patient_attachments][][document]" value="' + e.target.result + '">';
                html += '<input type="hidden" name="patient[patient_attachments][][type]" value="physical_examinations">';
                html += '<input type="hidden" name="patient[patient_attachments][][file_name]" value="' + files[0].name + '">';
                html += '</div>';

                $('#physical-examinations-container').append( html );
            };
            FR.readAsDataURL( files[0] );
        }

    }

}