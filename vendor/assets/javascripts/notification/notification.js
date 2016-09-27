$.notification = function(options) {
    var opts = $.extend({}, {type: 'notice', time: 3000}, options);
    var o    = opts;

//    Messenger().post({
//        message: o.message,
//        type: o.type,
//        showCloseButton: true,
//        position: 'top'
//    });  
    
    
    if (o.type == "success") {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 4000,
            positionClass: "toast-top-center",
        };
        toastr.success(o.message);
    } else {
        toastr.options = {
            closeButton: true,
            progressBar: true,
            showMethod: 'slideDown',
            timeOut: 4000,
            positionClass: "toast-top-center",
        };
        toastr.error(o.message);
    }
};