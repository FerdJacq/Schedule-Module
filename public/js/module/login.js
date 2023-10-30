var Login = {   
	                                
	init : function(){
		//onload function
        var self = this;
        self.addEvents();
	}, 

	addEvents : function(){
        var self = this;
		//js events
        $('#login_btn').click(function(e){
            e.preventDefault();
            self.api.post.create();
            
        });
            //button
        $("#password").keyup(function (e) {
            if (e.keyCode === 13) {
                self.api.post.create();
            }
          
        });
	}, 

    api : {
		get : {
			// Your get method
		},
		post : {
            // Your post method
            create:function(){
                var email = $('#email').val();
                var password = $('#password').val();

                $.ajax({
                    url: 'api_login',
                    type: 'POST',
                    data:{
                        email:email,
                        password:password,
                        _token:$('#_token').val(),
                    },
                    success:function(data){
                        if($.isEmptyObject(data.error)){
                            if(data.success){
                                window.location = "/home";
                            }
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: data.error
                              });
                                
                        }
                        
                    }
                });
            }
			
            
            
		}
    }             
}

$(function(){
	Login.init();
})



