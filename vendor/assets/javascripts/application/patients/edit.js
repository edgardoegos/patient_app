$(function() {

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

    $('#past-medical-history').on('filepredelete', function(event, key) {
        console.log('Key = ' + key);
    });


    //File Delete

    //File Attach
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

    $('.kv-file-remove').click(function () {
        var id = $(this).data('key');

        $("#frm-delete").attr("action", "/patients/attachment_delete/" + id);

        $('#mdl-delete').modal();
    });

    $('#date_lms .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (e) {

        if ($('#date_lms').find('input').val() != null) {

            var date = $('#date_lms').find('input').val().split('/');

            var day = date[0];
            var month = date[1];
            var year = date[2];

            var newDate = new Date(month + "/" + day + "/" + year );

            var less3Months = new Date(newDate.setMonth(newDate.getMonth() - 3));
            var add7Days = new Date(less3Months.setDate(new Date(moment(less3Months).format('L')).getDate() + 7));
            var add1Year = new Date(add7Days.setFullYear(new Date(moment(add7Days).format('L')).getFullYear() + 1));

            var displayDate = moment(add1Year).format("LL");
            var edcDate = moment(add1Year).format("L");
            var formatEDCDate = edcDate.split('/')[1] + "/" + edcDate.split('/')[0] + "/" + edcDate.split('/')[2]

            $('#fld-edc-display').val(displayDate)
            $('#patient_medical_record_edc').val(formatEDCDate)

        } else {
            $('#fld-edc-display').val("")
            $('#patient_medical_record_edc').val("")
        }

    });

    $('#fld-record-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
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