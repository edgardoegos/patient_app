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

    var dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + 1);

    $('.actions').find('li:nth-child(3)').addClass('hidden');
    // $('.actions').find('li:nth-child(4) a').attr("href", "/appointments");
    $('#fld-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $(".touchspin").TouchSpin({
        verticalbuttons: true,
        buttondown_class: 'btn btn-white',
        buttonup_class: 'btn btn-white',
        max: 200,
    });

    $('#fld-consultation-date .input-group.date').datepicker({
        todayBtn: "linked",
        startDate: dateToday,
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
    });

    $(".select2_demo_1").select2();
});
    
function checkPatientIfRegistered() {
    var last_name       = $('#patient_appointments_last_name').val();
    var first_name      = $('#patient_appointments_first_name').val();
    var middle_name     = $('#patient_appointments_middle_name').val();
    var weight          = $('#patient_appointments_weight').val();

    $.get( "/api/v1/get_patient_by_name", { last_name: last_name, first_name: first_name, middle_name: middle_name  } )
        .done(function( data ) {

            if (data.length != 0) {
                console.log('data.id: ' + data.id)
                $('#dv-new-patient-container').addClass('hidden');
                $('#dv-patient-container').removeClass('hidden');
                $('#patient_appointments_patient_id').val(data.id);

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
    $('#p-complaint').text(form_data['patient[appointments][complaint]']);
    
    $('#p-name').text(name);
    
    $('#p-birth-date').text(form_data['patient[birth_date]']);
    $('#p-gender').text(form_data['patient[gender]']);
    $('#p-civil-status').text(form_data['patient[civil_status]']);
    $('#p-address').text(form_data['patient[address]']);
    
    $('#p-contact').text(form_data['patient[contact]']);
    $('#p-occupation').text(form_data['patient[occupation]']);
    $('#p-blood-type').text(form_data['patient[blood_type]']);
    $('#p-weight-2').text(form_data['patient[appointments][weight]']);
    $('#p-height').text(form_data['patient[height]']);
    $('#p-menarche').text(form_data['patient[medical_record][menarche]']);
    $('#p-gravida').text(form_data['patient[medical_record][gravida]']);
    $('#p-para').text(form_data['patient[medical_record][para]']);
    $('#p-t').text(form_data['patient[medical_record][t]']);
    $('#p-p').text(form_data['patient[medical_record][p]']);
    $('#p-a').text(form_data['patient[medical_record][a]']);
    $('#p-l').text(form_data['patient[medical_record][l]']);
    $('#p-ob-history').text(form_data['patient[medical_record][ob_history]']);
    
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