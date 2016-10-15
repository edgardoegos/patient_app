$(function () {
    $('#edit-name').click(function(){

        $('#dv-name-container').find('input').prop('disabled', false);
        $('#dv-name-container').removeClass('hidden');
        
        $('#dv-username-container').addClass('hidden');
        $('#dv-contact-container').addClass('hidden');
        $('#dv-password-container').addClass('hidden');

        $('#dv-username-container').find('input').prop('disabled', true);
        $('#dv-contact-container').find('input').prop('disabled', true);
        $('#dv-password-container').find('input').prop('disabled', true);


        $('#spn-edit-name').text('full name');

        $('#mdl-edit-account').modal('toggle');
    });

    $('#edit-username').click(function(){
        $('#dv-username-container').find('input').prop('disabled', false);
        $('#dv-username-container').removeClass('hidden');

        $('#dv-name-container').addClass('hidden');
        $('#dv-contact-container').addClass('hidden');
        $('#dv-password-container').addClass('hidden');

        $('#dv-name-container').find('input').prop('disabled', true);
        $('#dv-contact-container').find('input').prop('disabled', true);
        $('#dv-password-container').find('input').prop('disabled', true);

        $('#spn-edit-name').text('username');

        $('#mdl-edit-account').modal('toggle');
    });

    $('#edit-contact').click(function(){

        $('#dv-contact-container').find('input').prop('disabled', false);
        $('#dv-contact-container').removeClass('hidden');

        $('#dv-name-container').addClass('hidden');
        $('#dv-username-container').addClass('hidden');
        $('#dv-password-container').addClass('hidden');

        $('#dv-name-container').find('input').prop('disabled', true);
        $('#dv-username-container').find('input').prop('disabled', true);
        $('#dv-password-container').find('input').prop('disabled', true);

        $('#spn-edit-name').text('contact information');

        $('#mdl-edit-account').modal('toggle');
    });

    $('#edit-password').click(function(){

        $('#dv-password-container').find('input').prop('disabled', false);
        $('#dv-password-container').removeClass('hidden');

        $('#dv-name-container').addClass('hidden');
        $('#dv-username-container').addClass('hidden');
        $('#dv-contact-container').addClass('hidden');

        $('#dv-name-container').find('input').prop('disabled', true);
        $('#dv-username-container').find('input').prop('disabled', true);
        $('#dv-contact-container').find('input').prop('disabled', true);

        $('#spn-edit-name').text('current password (Min: 8 characters)');

        $('#mdl-edit-account').modal('toggle');
    });
})