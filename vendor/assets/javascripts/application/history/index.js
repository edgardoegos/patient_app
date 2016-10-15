$(function() {

    $('#select-filter-type').on("change", function(e) {
        var theSelection = $(this).chosen().val()
        console.log(theSelection);

        $('#date .input-group.date').datepicker("remove");

        if (theSelection == 0) {
            $('#range').find('input').prop('disabled', false);
            $('#range').removeClass('hidden');

            $('#date').find('input').prop('disabled', true);
            $('#date').addClass('hidden');

        } else if (theSelection == 1) {

            $('#date').find('input').prop('disabled', false);
            $('#date').removeClass('hidden');

            $('#range').find('input').prop('disabled', true);
            $('#range').addClass('hidden');

            $('#date .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
            });
        } else if (theSelection == 2) {
            $('#date').find('input').prop('disabled', false);
            $('#date').removeClass('hidden');

            $('#range').find('input').prop('disabled', true);
            $('#range').addClass('hidden');

            $('#date .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: "mm/yyyy",
                viewMode: "months",
                minViewMode: "months"
            });
        } else {
            $('#date').find('input').prop('disabled', false);
            $('#date').removeClass('hidden');

            $('#range').find('input').prop('disabled', true);
            $('#range').addClass('hidden');

            $('#date .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: "yyyy",
                viewMode: "years",
                minViewMode: "years"
            });

        }

        $('#date .input-group.date').datepicker('update');

    });

    $(".select2_demo_1 ").select2();

    $('#range .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#tbl-appointments').dataTable({
        "bSort": false
    });

    var config = {
        '.chosen-select': {},
        '.chosen-select-deselect': { allow_single_deselect: true },
        '.chosen-select-no-single': { disable_search_threshold: 10 },
        '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
        '.chosen-select-width': { width: "95%" }
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }

});