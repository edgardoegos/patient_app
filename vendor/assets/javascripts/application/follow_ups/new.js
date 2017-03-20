$(function() {

    var dateToday = new Date();

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

    $('#appointment_patient_id').change(function() {
        $.get( "/api/v1/get_appointment_by_patient_id", { id: $(this).find(":selected").val() } )
            .done(function( data ) {
            console.log('data: ' + JSON.stringify(data))
                if (data['appointments'].length != 0) {
                    var options = $("#appointment_id");
                    $.each(data['appointments'], function() {
                        options.find('option')
                            .remove()
                            .end().append($("<option />").val(this.id).text(moment(this.consultation_date).format('MMMM Do YYYY')));
                    });
                    
                } else {

                }
                get_appointment_by_id($('#appointment_id').val());
            });

    });
    
    $('#appointment_id').change(function(){
        get_appointment_by_id($(this).val());
    });

});

function get_appointment_by_id(id) {
   
    console.log('id: ' + id)
    $.get( "/api/v1/get_appointment_by_id", { id: id } )
            .done(function( data ) {
        
        console.log('data: ' + JSON.stringify(data.appointment.medical_records))
        
        $('#appointment_medical_records_type').val(data.appointment.medical_records.type);
        $('#appointment_medical_records_lmp').val(data.appointment.medical_records.lmp);
        $('#fld-edc-display').val(data.appointment.medical_records.edc);
        $('#appointment_medical_records_edc').val(data.appointment.medical_records.edc);
        $('#fld-aog-display').val(data.appointment.medical_records.aog);
        $('#appointment_medical_records_aog').val(data.appointment.medical_records.aog);
        $('#appointment_medical_records_chief_complaint').val(data.appointment.medical_records.chief_complaint);
        
        
        $('#appointment_medical_records_menarche').val(data.appointment.medical_records.menarche);
        $('#appointment_medical_records_gravida').val(data.appointment.medical_records.gravida);
        $('#appointment_medical_records_para').val(data.appointment.medical_records.para);
        $('#appointment_medical_records_t').val(data.appointment.medical_records.t);
        $('#appointment_medical_records_p').val(data.appointment.medical_records.p);
        $('#appointment_medical_records_a').val(data.appointment.medical_records.a);
        $('#appointment_medical_records_l').val(data.appointment.medical_records.l);
        
        
        
    });
}
    
