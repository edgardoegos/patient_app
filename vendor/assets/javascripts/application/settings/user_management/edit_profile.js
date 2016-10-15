$(function(){
    // image avatar
    var fileName = "";
    var $image = $(".image-avatar-crop > img")

    $($image).cropper({
        aspectRatio: 1/1,
        preview: ".img-avatar-preview",
        done: function (data) {
            // Output the result data for cropping image.
        }
    });

    var $inputImage = $("#inputImage");
    if (window.FileReader) {
        $inputImage.change(function () {
            var fileReader = new FileReader(),
                files = this.files,
                file;

            if (!files.length) {
                return;
            }

            file = files[0];

            fileName = file.name

            if (/^image\/\w+$/.test(file.type)) {
                fileReader.readAsDataURL(file);
                fileReader.onload = function () {
                    $inputImage.val("");
                    $image.cropper("reset", true).cropper("replace", this.result);
                };
            } else {
                showMessage("Please choose an image file.");
            }
        });
    } else {
        $inputImage.addClass("hide");
    }

    $("#btn-crop").click(function () {
        event.preventDefault();

        if (fileName != "") {
            $('#user_avatar').val($image.cropper("getDataURL"));
            $('#avatar_file_name').val(fileName);
            $('#frm-user-avatar').submit();
        } else {
            Messenger().post({
                message: "Upload you image first",
                type: "error",
                showCloseButton: true,
                position: 'top'
            });
        }
    });

    $("#zoomIn").click(function () {
        $image.cropper("zoom", 0.1);
    });

    $("#zoomOut").click(function () {
        $image.cropper("zoom", -0.1);
    });

    $("#rotateLeft").click(function () {
        $image.cropper("rotate", 45);
    });

    $("#rotateRight").click(function () {
        $image.cropper("rotate", -45);
    });

    $("#setDrag").click(function () {
        $image.cropper("setDragMode", "crop");
    });

    $("#btn-reload").click(function () {
        $image.cropper("reset", "true");
    });

    $('#data_3 .input-group.date').datepicker({
        startView: 2,
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true
    });

    $(".select2_demo_1").select2();

});


