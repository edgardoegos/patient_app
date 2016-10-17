$(function() {

    /* Init DataTables */
    var oTable = $('#tbl-hmo').dataTable();

    $('.btn-delete').click(function(){

        var data = $(this).data('hmo');
        $("#frm-delete").attr("action", "../../health_maintenance_organizations/" + data.id);
        $('#spn-name').text(data.name)
        $('#mdl-delete').modal();

    });

});

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}