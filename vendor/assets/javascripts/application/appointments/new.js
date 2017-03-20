// window.onload = initFunction();

$(function() {

    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    $("#wizard").steps();

    $("#frm-appointment").steps({
        bodyTag: "fieldset",
        onStepChanging: function (event, currentIndex, newIndex) {
            // Always allow going backward even if the current step contains invalid fields!
            if (currentIndex > newIndex) {
                return true;
            }

            // var last_name           = $('#patient_appointments_last_name').val();
            // var first_name          = $('#patient_appointments_first_name').val();
            // var middle_name         = $('#patient_appointments_middle_name').val();
            // var consultation_date   = $('#patient_appointments_consultation_date').val();
            //
            //
            // var myfunction = function(data){
            //     console.log('data: ' + data)
            //     return false
            // }
            //
            // $.get( "/api/v1/get_patient_by_name_and_consultation_date", { last_name: last_name, first_name: first_name, middle_name: middle_name, consultation_date: consultation_date} )
            //     .done(function( data ) {
            //         //
            //         myfunction(data)
            //
            //     });

            // Forbid suppressing "Warning" step if the user is to young
            if (newIndex === 3 && Number($("#age").val()) < 18) {
                return false;
            }

            var form = $(this);

            // Clean up if user went backward before
            if (currentIndex < newIndex) {
                // To remove error styles
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }

            // Disable validation on fields that are disabled or hidden.
            form.validate().settings.ignore = ":disabled,:hidden";

            // Start validation; Prevent going forward if false
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {

            if (currentIndex == 1 && priorIndex == 0) {
                checkPatientIfRegistered();
            }

            if (currentIndex == 2 &&  priorIndex == 1) {
                $('.actions').find('li:nth-child(3)').removeClass('hidden');

                populateReview();
            } else {
                $('.actions').find('li:nth-child(3)').addClass('hidden');
//                clearReview();
            }

            // Suppress (skip) "Warning" step if the user is old enough.
            if (currentIndex === 2 && Number($("#age").val()) >= 18) {
                $(this).steps("next");

            }

            // Suppress (skip) "Warning" step if the user is old enough and wants to the previous step.
            if (currentIndex === 2 && priorIndex === 3) {
                $(this).steps("previous");
            }

        },
        onFinishing: function (event, currentIndex) {
            var form = $(this);

            // Disable validation on fields that are disabled.
            // At this point it's recommended to do an overall check (mean ignoring only disabled fields)
            form.validate().settings.ignore = ":disabled";

            // Start validation; Prevent form submission if false
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            var form = $(this);
            // Submit form input
            form.submit();
        },
        onCanceled:function (event) {
            window.location.href = "/appointments";
        }
    }).validate({
        errorPlacement: function (error, element) {
//            element.before(error);

            var element_name = element.data("name")
            error.insertAfter(".lbl-" + element_name);

        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });

    $('.actions').find('li:nth-child(3)').addClass('hidden');
    // $('.actions').find('li:nth-child(4) a').attr("href", "/appointments");
    // $('#fld-consultation-date .input-group.date').datepicker({
    //     todayBtn: "linked",
    //     keyboardNavigation: false,
    //     forceParse: false,
    //     autoclose: true,
    //     format: 'dd/mm/yyyy'
    // });

    $(".touchspin").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white',
        max: 200,
    });

    $('#fld-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        // startDate: dateToday,
        minDate: new Date(),
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy',
        showOn: 'button'
    });

    $('#fld-birth-date .input-group.date').datepicker({
        startView: 2,
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    }).on('changeDate', function (e) {
        var date = $('#fld-birth-date').find('input').val().split('/');

        var day = date[0];
        var month = date[1];
        var year = date[2];

        var dob = new Date(month + "/" + day + "/" + year );

        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));

        console.log('dob: ' + $('#data_3').find('input').val());

        $('#patient_age').val(age);
        $('#display_field_age').val(age);
    });;

    $(".select2_demo_1").select2({
        tag: true
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
        $('#patient_appointments_medical_records_edc').val(formatEDCDate);

        $('#fld-aog-display').val(totalWeeks);
        $('#patient_appointments_medical_records_aog').val(totalWeeks);

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

    // Review
    $("#past-medical-history-review").fileinput({
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

    $("#laboratory-results-review").fileinput({
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

    $("#physical-examinations-review").fileinput({
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

    $('#patient_appointments_medical_records_type').change(function() {
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
                $('#patient_appointments_medical_records_edc').val(formatEDCDate);

                $('#fld-aog-display').val(totalWeeks);
                $('#patient_appointments_medical_records_aog').val(totalWeeks);
            }
        }
    });

    $('#fld-option').change(function () {
        setPatientFields($(this).val());
    });

    initFunction();
});

function initFunction() {
    if (window.location.search) {
        var first_name = getUrlParameter('first_name');
        var last_name = getUrlParameter('last_name');
        var middle_name = getUrlParameter('middle_name');

        // $('#fld-option option[value="Existing Patient"]').prop('selected', true);
        $('#fld-option').val('Existing Patient').trigger('change');
        $('#appointment_patient_id').select2().select2('val', last_name + ',' + first_name + ',' +middle_name);


        $('#patient_appointments_last_name').val(last_name);
        $('#patient_appointments_first_name').val(first_name);
        $('#patient_appointments_middle_name').val(middle_name);

    } else {
        setPatientFields('New Patient');
    }
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function setPatientFields(option) {

    var html = '';

    if (option == "New Patient") {
        html += '<div class="col-md-4">';
        html += '<label class="control-label lbl-last-name">Last Name *</label>';
        html += '<input type="text" id="patient_appointments_last_name" name="patient[appointments][last_name]" class="form-control required" value="" data-last-name="">';
        html += '</div>';
        html += '<div class="col-md-4">';
        html += '<label class="control-label lbl-first-name">First Name *</label>';
        html += '<input type="text" id="patient_appointments_first_name" name="patient[appointments][first_name]" class="form-control required" value="" data-first-name="">';
        html += '</div>';
        html += '<div class="col-md-4">';
        html += '<label class="control-label lbl-middle-name">Middle Name *</label>';
        html += '<input type="text" id="patient_appointments_middle_name" name="patient[appointments][middle_name]" class="form-control required" value="" data-middle-name="">';
        html += '</div>';
    } else {
        html += '<div class="col-md-12">';
        html += '<label class="control-label lbl-last-name">Patient Full Name *</label>';
        html += '<select name="patient[appointments][last_name]" id="appointment_patient_id" required="required" class="select2_demo_1 form-control m-b">';
        html += '</select>';
        html += '<div class="hdn-container">';
        html += '<input type="hidden" id="patient_appointments_last_name" name="patient[appointments][last_name]" class="form-control required" value="" data-last-name="">';
        html += '<input type="hidden" id="patient_appointments_first_name" name="patient[appointments][first_name]" class="form-control required" value="" data-first-name="">';
        html += '<input type="hidden" id="patient_appointments_middle_name" name="patient[appointments][middle_name]" class="form-control required" value="" data-middle-name="">';
        html += '</div>';
        html += '</div>';
    }
    var data =[];
    // var data = JSON.parse($('#hdn-fld-patients').val());
    //
    // console.log('data: ' + JSON.stringify(data))
    $.each( JSON.parse($('#hdn-fld-patients').val()), function( key, value ) {
        data.push({id: value.last_name + "," + value.first_name + "," + value.middle_name,text: value.last_name + ", " + value.first_name + " " + value.middle_name});
    });

    console.log('html: ' + html);
    $('#patient-name-container').empty();
    $('#patient-name-container').append(html);
    $('#appointment_patient_id').select2({
        placeholder: "SELECT A PATIENT",
        allowClear: true,
        data: data
    }).on("select2:select", function (e) {
        var name = $(this).val().split(',');

        $('#patient_appointments_last_name').val(name[0]);
        $('#patient_appointments_first_name').val(name[1]);
        $('#patient_appointments_middle_name').val(name[2]);

        console.log("select2:select :", $(this).val());
    });

}
    
function checkPatientIfRegistered() {
    var last_name       = $('#patient_appointments_last_name').val();
    var first_name      = $('#patient_appointments_first_name').val();
    var middle_name     = $('#patient_appointments_middle_name').val();
    var weight          = $('#patient_appointments_weight').val();
    var complaint       = $('#patient_appointments_complaint').val();

    $.get( "/api/v1/get_patient_by_name", { last_name: last_name, first_name: first_name, middle_name: middle_name  } )
        .done(function( data ) {
            console.log('data: ' + JSON.stringify(data))
            if (data.length != 0) {


                console.log('data.id: ' + data.id)

                var first_name = data.first_name;
                var last_name = data.last_name;
                var middle_name = data.middle_name;

                $('#dv-new-patient-container').addClass('hidden');
                $('#dv-patient-container').removeClass('hidden');
                $('#patient_appointments_patient_id').val(data.id);
                $('#dv-patient-container').find('h1').text(last_name + ', ' + first_name + ' ' + middle_name + " is already registered")

                // Disable fields
                $('#dv-new-patient-container').find('input').prop("disabled", true);
                $('#dv-new-patient-container').find('select').prop("disabled", true);
                $('#dv-new-patient-container').find('textarea').prop("disabled", true);

                // Clear Patient Info
                $('#patient_last_name').val("");
                $('#patient_first_name').val("");
                $('#patient_middle_name').val("");
                $('#patient_weight').val("");

                populateReviewForExistingPatient(data);

            } else {

                var last_name       = $('#patient_appointments_last_name').val();
                var first_name      = $('#patient_appointments_first_name').val();
                var middle_name     = $('#patient_appointments_middle_name').val();

                $('#dv-new-patient-container').removeClass('hidden');
                $('#dv-patient-container').addClass('hidden');
                $('#patient_appointments_patient_id').val(0)


                // Enable fields
                $('#dv-new-patient-container').find('input').prop("disabled", false);
                $('#dv-new-patient-container').find('select').prop("disabled", false);
                $('#dv-new-patient-container').find('textarea').prop("disabled", false);

                // Populate Patient Info
                $('#patient_last_name').val(last_name);
                $('#patient_first_name').val(first_name);
                $('#patient_middle_name').val(middle_name);
                $('#patient_weight').val(weight);
                $('#patient_medical_record_chief_complaint').val(complaint);

            }

    });

}

function populateReview() {
    
    var form_data = $('#frm-appointment').serializeObject();
    
    var name = form_data['patient[appointments][last_name]'] + ', ' + form_data['patient[appointments][first_name]'] + ' ' + form_data['patient[appointments][middle_name]']  
    
    $('#p-consultation-date').text(form_data['patient[appointments][consultation_date]']);
    $('#p-systolic').text(form_data['patient[appointments][systolic]']);
    $('#p-diastolic').text(form_data['patient[appointments][diastolic]']);
    $('#p-weight').text(form_data['patient[appointments][weight]']);
    $('#p-complaint').text(form_data['patient[appointments][medical_records][chief_complaint]']);
    
    $('#p-name').text(name);
    
    $('#p-birth-date').text(form_data['patient[birth_date]']);
    $('#p-gender').text(form_data['patient[gender]']);
    $('#p-civil-status').text(form_data['patient[civil_status]']);
    $('#p-address').text(form_data['patient[address]']);
    
    $('#p-contact').text(form_data['patient[contact]']);
    $('#p-occupation').text(form_data['patient[occupation]']);
    $('#p-blood-type').text(form_data['patient[blood_type]']);
    $('#p-address').text(form_data['patient[address]']);
    $('#p-weight-2').text(form_data['patient[appointments][weight]']);
    $('#p-height').text(form_data['patient[height]']);
    $('#p-menarche').text(form_data['patient[appointments][medical_records][menarche]']);
    $('#p-gravida').text(form_data['patient[appointments][medical_records][gravida]']);
    $('#p-para').text(form_data['patient[appointments][medical_records][para]']);
    $('#p-t').text(form_data['patient[appointments][medical_records][t]']);
    $('#p-p').text(form_data['patient[appointments][medical_records][p]']);
    $('#p-a').text(form_data['patient[appointments][medical_records][a]']);
    $('#p-l').text(form_data['patient[appointments][medical_records][l]']);
    $('#p-ob-history').text(form_data['patient[appointments][medical_records][ob_history]']);

    $('#p-hmo').text(form_data['patient[appointments][medical_records][recommendations]']);
    $('#p-type').text(form_data['patient[appointments][medical_records][type]']);
    $('#p-lmp').text(form_data['patient[appointments][medical_records][lmp]']);
    $('#p-edc').text(form_data['patient[appointments][medical_records][edc]']);
    $('#p-aog').text(form_data['patient[appointments][medical_records][aog]']);
    $('#p-history-of-present-illness').text(form_data['patient[appointments][medical_records][history_of_present_illness]']);
    $('#p-diagnosis').text(form_data['patient[appointments][medical_records][diagnosis]']);
    $('#p-return-visit').text(form_data['patient[appointments][medical_records][return_visit]']);
    $('#p-record-date').text(form_data['patient[appointments][medical_records][record_date]']);
    $('#p-past-medical-history').text(form_data['patient[appointments][medical_records][past_medical_history]']);
    $('#p-laboratory-results').text(form_data['patient[appointments][medical_records][laboratory_results]']);
    $('#p-physical-examinations').text(form_data['patient[appointments][medical_records][physical_examinations]']);
    $('#p-management').text(form_data['patient[appointments][management]']);
    $('#p-recommendations').text(form_data['patient[appointments][recommendations]']);
    $('#p-summary').text(form_data['patient[appointments][summary]']);
}
    
function populateReviewForExistingPatient(patient) {
    
    var form_data = $('#frm-appointment').serializeObject();
    
    var name = form_data['patient[appointments][last_name]'] + ', ' + form_data['patient[appointments][first_name]'] + ' ' + form_data['patient[appointments][middle_name]']  
    
    $('#p-consultation-date').text(form_data['patient[appointments][consultation_date]']);
    $('#p-systolic').text(form_data['patient[appointments][systolic]']);
    $('#p-diastolic').text(form_data['patient[appointments][diastolic]']);
    $('#p-weight').text(form_data['patient[appointments][weight]']);
    $('#p-complaint').text(form_data['patient[appointments][complaint]']);
    
    $('#p-name').text(name);
    $('#p-birth-date').text(patient.birth_date);
    $('#p-gender').text(patient.gender);
    $('#p-civil-status').text(patient.civil_status);
    $('#p-address').text(patient.address);
    
    $('#p-contact').text(patient.contact);
    $('#p-occupation').text(patient.occupation);
    $('#p-blood-type').text(patient.blood_type);
    $('#p-weight-2').text(patient.weight);
    $('#p-height').text(patient.height);
    $('#p-menarche').text(patient.medical_record['menarche']);
    $('#p-gravida').text(patient.medical_record['gravida']);
    $('#p-para').text(patient.medical_record['para']);
    $('#p-t').text(patient.medical_record['t']);
    $('#p-p').text(patient.medical_record['p']);
    $('#p-a').text(patient.medical_record['a']);
    $('#p-l').text(patient.medical_record['l']);
    $('#p-ob-history').text(patient.medical_record['ob_history']);
}
    
function clearReview() {
    $('.review-display').text("");
}

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

$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};