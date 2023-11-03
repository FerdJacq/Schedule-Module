var Schedule = {

    selectedEmployee : [],
    lookUpData:[],

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

        $('#openModal').click(function(e) {
            e.preventDefault();
            var self = Schedule;
            $('#myModal').modal('show');
            self.api.get.allModal();
        });

        $('#createSchedule').click(function(){
            var self = this;
            self.apu.post.create();
        });

        $('button[class*=removeEmployee-]').unbind().bind('click', function () {
			var id = parseInt($(this).attr('class').split(' ')[1].split('-')[1]);
			var index = self.selectedEmployee.findIndex(x => x.id == id);
			if(index > -1) {
				self.selectedEmployee.splice(index, 1);
                $(".checkbox-" + id).prop('checked',false);
				self.updateScheduleCart("#modal-schedule-cart-content")
			}
		});


        $('input[class*=checkbox-]').unbind().bind('click', function () {
			var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
			var data = self.getSelectedData(id);

            console.log(data)
            var checkbox = $('.checkbox-' + id).prop('checked')
			// var allchecked = $('input:checkbox:checked').length;
			// if(allchecked == 1) {
			// 	var className = $('input:checkbox').filter(':checked')[0].className
			// 	var valueId = parseInt(className.split("-")[1])
			// 	$(".edit-" + valueId).trigger('click')
			// }

			// //$('#date-time-in').val(moment().format("YYYY-MM-DD"))
			// //$("#date-time-in").trigger('click')
            // var name = data.user.account.last_name + ', ' +data.user.account.first_name + ' ' + (data.user.account.middle_name || '');
			var index = self.selectedEmployee.findIndex(x => x.id == id);
			if(index == -1) {
                if(checkbox == true) {
					var shift = ''
					// if(data.shift)
					// 	shift = data.shift.shift_type

					// var hourly = parseFloat(data.daily_rate) / parseFloat(data.working_hours)
                    self.selectedEmployee.push({
                        'id' : id,
                        // 's.hift' : shift,
                        // 'in' : data.set_time_in,
                        // 'out' : data.set_time_out,
                        'name' : data.name,
						// 'daily' : data.daily_rate,
						// 'work' : data.working_hours,
						// 'hourly' : hourly,
						// 'incentive' : data.incentive,
                    });
                    self.updateScheduleCart("#modal-schedule-cart-content")
                }
			}
			else {
                if(checkbox == false) {
                    var index = self.selectedEmployee.findIndex(x => x.id == id);
                    if(index != -1) {
                        self.selectedEmployee.splice(index, 1);
                        self.updateScheduleCart("#modal-schedule-cart-content")
                    }
                }
				//Helper.warn('Warning', 'Sorry, this employee has already selected');
			}
            console.log('Array', self.selectedEmployee);
            self.updateScheduleCart("#modal-schedule-cart-content")
        })

        
        $(".btn-checkall").click( function(e) {
            e.preventDefault();
            var clicked = false
            $(".checked").prop("checked", !clicked);
            clicked = !clicked;
        });

        $(".btn-uncheckall").click( function(e) {
            e.preventDefault();
            var clicked = true
            $(".checked").prop("checked", !clicked);
            clicked = !clicked;
        });

        $('a[class*=page-button-]').unbind().bind('click', function(e) {
			e.preventDefault();			
			page = parseInt($(this).html().trim());
			// self.paginationType === 0 ? self.api.get.all(self.page) : self.paginationType === 1 ? self.api.get.schedulesAll(self.page) : ''
            console.log(page);
            self.api.get.all(page);
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

    renderTablePagination : function(data)
	{
		var self = this;
		$('#table-pagination div').remove();
		$('#table-pagination').append(data);
		$.each($('#table-pagination div a'), function(key, val)
		{
			var id = $(val).html().trim();
			$(val).attr('href', '#');
            $(val).addClass('page-button-'+ id +' pages');
            // console.log(data);
		});

		self.addEvents();
	},

    renderModalSchedule: function(data){
        var self = this;
        self.lookUpData = data;
            var content = $('#modal-schedule-content');
            $('#modal-schedule-content tr').remove();

            $.each(data, function(key,val){
                var manageButton = '<button class="delsched-' + val.id + ' btn-sm design-btn"><img src="storage/images/icons/svg/delete.svg" class="svg-size"></button>'
                + '<input type="checkbox" class="checkbox-'+ val.id +' checked" value="' + val.id + '">'

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

    updateScheduleCart:function(elem){
        var self = this;
        console.log(self.selectedEmployee)
		if(self.selectedEmployee.length >= 0) {

			$(elem +' tr').remove();
			$.each(self.selectedEmployee, function(key, val){
				var manageButton = '<button type="button" class=" removeEmployee-'+ val.id +' btn-sm btn-danger design-btn blk-center"><img src="storage/images/icons/svg/delete.svg" class="svg-size"></button>';

				var elemHtml = '<tr class="">'
							 +		'<td class="text-left">'+ manageButton +'</td>'
							 + 		'<td class="text-left"><b>'+ val.name.toUpperCase() +'</b></td>'
							 + '</tr>';
				$(elem).append(elemHtml);
			});
			self.addEvents();
		}
    },
    getSelectedData : function(user_id) {
		var self = this;
		var index = 0;

		$.each(self.lookUpData, function(key, val) {
			if(val.id == user_id) {
				index = key;
			}
		});

		return self.lookUpData[index];
	},

    api : {
		get : {
			// Your get method
            all:function(page){
                var self = Schedule;
                var params = {
					'page' : page,
					'limit' : 11, //9
				};

                $.ajax({
                    
                    url: '/schedule/all',
                    type: 'GET',
                    data:params,
                    success:function(resp){
                        if(resp.success){
                            self.renderSchedule(resp.data.data);
                            self.renderTablePagination(resp.links);
                        }
                    }
                });
            },
            allModal:function(page){
                var self = Schedule;
                var params = {
					'page' : page,
					'limit' : 11, //9
				};

                $.ajax({
                    url: '/schedule/all',
                    type: 'GET',
                    data:params,
                    success:function(resp){
                        if(resp.success){
                            self.renderModalSchedule(resp.data.data);
                            self.renderTablePagination(resp.links);

                        }
                    }
                });
            },
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
            },
            create:function(){
                var scheduleData = {
                    start_time: $('#start_time').val(),
                    end_time: $('#end_time').val(),
                    description: $('#description').val(),
                    users: selectedUsers
                };

                $.ajax({
                    url: '/sched-create',
                    type: 'POST',
                    dataType: 'json',
                    data: scheduleData,
                    success: function(resp) {
                        if(resp.success){
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: resp.success,
                                showConfirmButton: false,
                                timer: 1500
                              })
                              setTimeout(() => {
                                $('#myModal').modal('hide');
                                self.api.get.all();
                              }, 1500);
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: resp.error
                              });
                        }
                    },
                    error: function(xhr, status, error) {
                        // Handle error
                        console.error(xhr.responseJSON);
                    }
                });

            }

		}
    }
}

$(function(){
	Schedule.init();
})
