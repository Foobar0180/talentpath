/**
 * Theme: Minton Admin Template
 * Author: Coderthemes
 * SweetAlert -
 * Usage: $.SweetAlert.methodname
 */

! function($) {
    "use strict";

    var SweetAlert = function() {};

    //examples
    SweetAlert.prototype.init = function() {

            //Basic
            $('#sa-basic').click(function() {
                swal("Here's a message!");
            });

            //A title with a text under
            $('#sa-title').click(function() {
                swal("Here's a message!", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lorem erat, tincidunt vitae ipsum et, pellentesque maximus enim. Mauris eleifend ex semper, lobortis purus sed, pharetra felis")
            });

            //Success Message
            $('#sa-invite').click(function() {
                swal("Good job!", "1 invitation email was sent successfully.", "success")
            });

            $('#sa-roles').click(function() {
                swal("Sorry! You cannot delete this role.", "There is 1 user currently assigned to this role.", "warning")
            });

            $('#sa-subscription').click(function() {
                swal("We are sorry to see you go!", "All your data is safe and will be right here waiting for you, if you change your mind.", "warning")
            });

            $('#sa-save').click(function() {
                swal("Good job!", "Your changes have been saved successfully.", "success")
            });

            //Warning Message
            $('#sa-warning').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                }, function() {
                    swal("Deleted!", "Your content been deleted.", "success");
                });
            });

            //Parameter
            $('#sa-params').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#dd6b55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                }, function(isConfirm) {
                    if (isConfirm) {
                        swal("Deleted!", "Your content has been deleted.", "success");
                    } else {
                        swal("Cancelled", "Your content is safe :)", "error");
                    }
                });
            });

            //Custom Image
            $('#sa-image').click(function() {
                swal({
                    title: "Sweet!",
                    text: "Here's a custom image.",
                    imageUrl: "assets/plugins/bootstrap-sweetalert/thumbs-up.jpg"
                });
            });

            //Auto Close Timer
            $('#sa-close').click(function() {
                swal({
                    title: "Auto close alert!",
                    text: "I will close in 2 seconds.",
                    timer: 2000,
                    showConfirmButton: false
                });
            });

            //Primary
            $('#primary-alert').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "info",
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default waves-effect',
                    confirmButtonClass: 'btn-primary waves-effect',
                    confirmButtonText: 'Primary!'
                });
            });

            //Info
            $('#info-alert').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-info waves-effect',
                    confirmButtonText: 'Info!'
                });
            });

            //Success
            $('#success-alert').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "success",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-success waves-effect',
                    confirmButtonText: 'OK'
                });
            });

            //Warning
            $('#warning-alert').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-warning waves-effect',
                    confirmButtonText: 'Warning!'
                });
            });

            //Danger
            $('#danger-alert').click(function() {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "error",
                    showCancelButton: true,
                    confirmButtonClass: 'btn-danger waves-effect',
                    confirmButtonText: 'Delete!'
                });
            });


        },
        //init
        $.SweetAlert = new SweetAlert, $.SweetAlert.Constructor = SweetAlert
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.SweetAlert.init()
}(window.jQuery);
