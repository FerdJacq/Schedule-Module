var Schedule = {   
	                                
	init : function(){
		//onload function
        var self = this;
        self.api.get.all();
        self.addEvents();
	}, 

	addEvents : function(){
        var self = this;
		//js events
        $('#edit-btn').click(function(e){
            e.preventDefault();
            self.apu.post.delete();
        });

        $('button[class*=delsched-]').unbind().bind('click', function () {
			var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);

            Swal.fire({
                title: 'Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    self.api.post.delete(id);
                }
              })
		});
            
	},
    renderSchedule: function(data){
        var self = this;
            var content = $('#schedule-content');
            $('#schedule-content tr').remove();

            $.each(data, function(key,val){
                var manageButton = '<button class="delsched-' + val.id + ' btn-sm design-btn"><img src="storage/images/icons/svg/delete.svg" class="svg-size"></button>'
                + '<button class="editsched-' + val.id + ' btn-sm design-btn"><img src="storage/images/icons/svg/edit.svg" class="svg-size"></button>'

                let elemtHtml = '<tr>'
                        +	'<td>' + manageButton
                        +   '</td>'
                        +	'<td>' + val.id + '</td>'
                        +	'<td>' + val.name + '</td>'
                        +	'<td>' + val.email + '</td>'
                        + '</tr>'
                content.append(elemtHtml);
            
        });
        self.addEvents();
    },

    api : {
		get : {
			// Your get method
            all:function(){
                var self = Schedule;
                
                $.ajax({
                    url: '/schedule/all',
                    type: 'GET',
                    data:{},
                    success:function(resp){
                        if(resp.success){
                            self.renderSchedule(resp.data);
                        }
                    }
                });
            }
		},
		post : {
            // Your post method
            delete:function(id){
                var self = Schedule;
                $.ajax({
                    url: '/del-sched/'+id,
                    type: 'DELETE',
                    data: {
                        _token: $('input[name=_token]').val()
                    },
                    success: function(resp){
                        if(resp.success){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: resp.success,
                                showConfirmButton: false,
                                timer: 1500
                              })
                              setTimeout(() => {
                                self.api.get.all();
                              }, 1500);
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: resp.error
                              });  
                        }
                    }
                });
            }
            
		}
    }             
}

$(function(){
	Schedule.init();
})
