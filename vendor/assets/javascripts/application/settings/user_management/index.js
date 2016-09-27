$(function() {

    $(document).on('click', '#btn-delete', function(){
        var user = $( this ).data('user')
        $("#frm-delete").attr("action", "/settings/user_management/" + user.id);
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
    var oTable = $('#editable').dataTable();

});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}