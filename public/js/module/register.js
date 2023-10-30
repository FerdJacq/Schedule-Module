var Register = {   
	                                
	init : function(){
		//onload function
        var self = this;
        self.addEvents();
	}, 

	addEvents : function(){
        var self = this;
		//js events
        $('#register_btn').click(function(e){
            e.preventDefault();

            // var name = $('#name').val();
            // var email = $('#email').val();
            // var password = $('#password').val();
            // var cpassword = $('#cpassword').val();
            // var form = $('#regForm')[0]
            // $(form).validate({
            //     rules:{
            //         name:{
            //             require:true,
            //         },
            //         email:{
            //             require:true,
            //         },
            //         password:{
            //             require:true,
            //             minlength: 8,
            //         },
            //         cpassword:{
            //             require:true,
            //             equalto: "#password",
            //         },
            //     },
            //     messages:{
            //         name: "Name is required",
            //         email: "Email is required",
            //         password: "Password is required",
            //         cpassword: {
            //             equalto: "Confirm Password are not match"
            //         },
            //     },
            //     highlight: function(e){
            //         $(e).addClass('error')
            //     },
            //     submitHandler: function(){
                    self.api.post.create();
                    
            //     }
            // });
            
        });
            //button
        $("#cpassword").keyup(function (e) {
            if (e.keyCode === 13) {
                self.api.post.create();
            }
          
        });

        $("#name, #email, #password, #confirm_password").on('input', function() {
            // Get the ID and corresponding error message ID
            var fieldId = $(this).attr('id');
            var errorId = fieldId + "Error";
    
            // Hide the error message if user is typing
            $("#" + errorId).text('');
        });
	}, 

    api : {
		get : {
			// Your get method
		},
		post : {
            // Your post method
            create:function(e){
            var name = $('#name').val();
            var email = $('#email').val();
            var password = $('#password').val();
            var cpassword =$("#cpassword").val();
                // var formData = new FormData(form[0]);
                $.ajax ({
                    type: 'POST',
                    url: 'api_register',
                    data: {
                        // formData:formData,
                        name:name,
                        email:email,
                        password:password,
                        cpassword:cpassword,
                        _token:$('#_token').val()
                    },
                    
                    success:function(data){
                        if(data.exists){
                            Swal.fire({
                                icon: 'error',
                                title: data.exists
                              })
                        } else if (data.success){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: data.success,
                                showConfirmButton: false,
                                timer: 1500
                              })
                              setTimeout(() => {
                                window.location = "/logins";
                              }, 1500);
                        // }else{
                        //     Swal.fire({
                        //         icon: 'error',
                        //         title: 'here ererr'
                        //       })
                        }
                    },
                    error:function(data){
                        var errors = data.responseJSON.errors;

                        $.each(errors, function(key, value) {
                            var errorMessage = value[0];
                            $("#" + key + "Error").text(errorMessage);
        
                            // Add event handler for input change
                            $("#" + key).on('input', function() {
                                if ($(this).val() !== '') {
                                    $("#" + key + "Error").text('');
                                }
                            });
                        });        
                    }
                });
            }
		}
    }             
}

$(function(){
	Register.init();
})
