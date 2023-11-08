var Schedule = {

    selectedEmployee : [],
    lookUpData:[],
    lookUpData2:[],

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

        $('button[class*=editsched-]').unbind().bind('click', function () {			
			var id = parseInt($(this).attr('class').split('-')[1]);
			var data = self.getSelectedData2(id);
			$("#edit_schedule_modal").modal('show');
			$('#e-start_time').val(data.time_in);
			$('#e-end_time').val(data.time_out);
			$('#e-working_hours').val(parseInt(data.working_hours));	
			$('#e-break_time').val(parseInt(data.breaktime));
			$("#e-shift").val(data.shift_id);
			self.editUserId = data.user.id;
			self.editShiftId = data.shift_id;
			self.editDate = data.date;
            self.editEndDate = data.end_date;
            self.schedId = id;

		});

        $('#btn-edit-schedule').unbind().bind('click', function () {		
			if($("#e-shift").val() != self.editShiftId) {
				Swal.fire({
					icon: 'error',
					title: 'Warning',
					text: 'Sorry, paki-check ang iniligay na oras ng pasok, hindi tugma sa shift. Gumawa na lang ng panibagong schedule na naaayon sa shift',
				})

				return;
			}
			self.api.post.modifySchedule()
            console.log(self.editShiftId);
		});

        $('#openModal').click(function(e) {
            e.preventDefault();
            var self = Schedule;
            $('#myModal').modal('show');
            $('#shift').trigger('click');
            let day = moment().format('YYYY-MM-DD')
            $('#start_date').val(day);
            $('#start_time').val("07:00:00");
            self.api.get.allModal();
            let data = self.dataFiltering('start_date', 'start_date', '');
            self.getTimeout(data);
            
        });

        $('#createSchedule').unbind().bind('click', function(){
            self.api.post.accept();
        });

        $('button[class*=removeEmployee-]').unbind().bind('click', function () {
			var id = parseInt($(this).attr('class').split(' ')[1].split('-')[1]);
			var index = self.selectedEmployee.findIndex(x => x.id == id);
			if(index > -1) {
				self.selectedEmployee.splice(index, 1);
                $(".checkbox-" + id).prop('checked',false);
                console.log('Array', self.selectedEmployee);
				self.updateScheduleCart("#modal-schedule-cart-content")
			}
		});


        $('input[class*=checkbox-]').unbind().bind('click', function () {
			var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
			var data = self.getSelectedData(id);

            console.log(data)
            var checkbox = $('.checkbox-' + id).prop('checked')
			var allchecked = $('input:checkbox:checked').length;
			if(allchecked == 1) {
				var className = $('input:checkbox').filter(':checked')[0].className
				var valueId = parseInt(className.split("-")[1])
				// $(".edit-" + valueId).trigger('click')
			}
            
			// //$('#start_time').val(moment().format("YYYY-MM-DD"))
			// //$("#date-time-in").trigger('click')
            // var name = data.user.account.last_name + ', ' +data.user.account.first_name + ' ' + (data.user.account.middle_name || '');
			var index = self.selectedEmployee.findIndex(x => x.id == id);
			if(index == -1) {
                if(checkbox == true) {
					//var shift = ''
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
                $('input[class*=checkbox-]').prop('checked', true); // Check all checkboxes
            
                // Loop through all checked checkboxes
                $('input[class*=checkbox-]:checked').each(function() {
                    var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
                    var data = self.getSelectedData(id);
                    var index = self.selectedEmployee.findIndex(x => x.id == id);
            
                    if (index == -1) {
                        self.selectedEmployee.push({
                            'id': id,
                            'name': data.name,
                        });
                    }
                });
            
                self.updateScheduleCart("#modal-schedule-cart-content"); // Update the cart
            
        });

        $(".btn-uncheckall").click( function(e) {
            e.preventDefault();
            $('input[class*=checkbox-]').prop('checked', false); // Uncheck all checkboxes

            // Loop through all unchecked checkboxes
            $('input[class*=checkbox-]:not(:checked)').each(function() {
                var id = parseInt($(this).attr('class').split(' ')[0].split('-')[1]);
                var index = self.selectedEmployee.findIndex(x => x.id == id);
        
                if (index != -1) {
                    self.selectedEmployee.splice(index, 1); // Remove from selectedEmployee array
                }
            });
        
            self.updateScheduleCart("#modal-schedule-cart-content"); // Update the cart
        });

        $('a[class*=page-button-]').unbind().bind('click', function(e) {
			e.preventDefault();			
			page = parseInt($(this).html().trim());
			// self.paginationType === 0 ? self.api.get.all(self.page) : self.paginationType === 1 ? self.api.get.schedulesAll(self.page) : ''
            self.api.get.all(page);
		});

        $('#start_date').unbind('keyup change').bind('keyup change', function(e) {	
			var buttonId = $(this).attr("id");
            let data = self.dataFiltering(buttonId, 'start_date','')
           
            self.getTimeout(data);
			self.getShiftId(0);
		});

		$('#end_date, #e-end_date').unbind('change keyup').bind('change keyup', function(e) {
            var buttonId = $(this).attr("id");
            let data = self.dataFiltering(buttonId, 'end_date', 'e-end_date')	
			self.getTimeIn(data);
			self.getShiftId(0);
		});

		$('#end_time, e-end_time').unbind('change keyup').bind('change keyup', function(e) {
            var buttonId = $(this).attr("id");
            let data = self.dataFiltering(buttonId, 'end_time', 'e-end_time')	
			self.getTimeIn(data);
			self.getShiftId(0);
			self.updateScheduleCart("#modal-schedule-cart-content")
		});	

		$('#start_time, #e-start_time').unbind('keyup change').bind('keyup change', function(e) {
            var buttonId = $(this).attr("id");
            let data = self.dataFiltering(buttonId, '#start_time', '#e-start_time')
           
			self.getTimeout(data);
			self.getShiftId(0);
			self.updateScheduleCart("#modal-schedule-cart-content")
            console.log();
		});	

        $('#shift , #e-shift').unbind().bind('change keyup', function (e) {
            
			let shift_id = parseInt($('#shift').val())
			let start_time = shift_id === 1 ? "07:00:00" : shift_id === 2 ? "13:00:00" : shift_id === 3 ? "19:00:00" : "07:00:00";
			let day = moment().format('YYYY-MM-DD') + ' ' + start_time
			let time = moment(day).format('HH:mm');
			$("#start_time").val(start_time)

            var buttonId = $(this).attr("id");
            let data = self.dataFiltering(buttonId, 'shift', 'e-shift')
			self.getTimeout(data)
			self.updateScheduleCart("#modal-schedule-cart-content");
           
		});

        $('#working_hours, #break_time , #working_hours, #e-break_time').unbind('keyup change').bind('keyup change', function(e) {	
			var buttonId = $(this).attr("id");
            if(buttonId == "working_hours" || "e-working_hours"){
                let data = self.dataFiltering(buttonId, 'working_hours', 'e-working_hours');
            }else{
                let data = self.dataFiltering(buttonId, 'break_time', 'e-break_time');
            }
            console.log(data);
            self.getTimeout(data);
            self.updateScheduleCart("#modal-schedule-cart-content");
		});

	},

    renderSchedule: function(data){
        var self = this;
        self.lookUpData2 = data;
            var content = $('#schedule-content');
            $('#schedule-content tr').remove();

            $.each(data, function(key,val){
                var manageButton = '<button class="delsched-' + val.id + ' btn-sm design-btn"><img src="storage/images/icons/svg/delete.svg" class="svg-size"></button>'
                + '<button class="editsched-' + val.id + ' btn-sm design-btn"><img src="storage/images/icons/svg/edit.svg" class="svg-size"></button>';

                var endtime = val.end_date+' '+val.time_out ;
                var starttime = val.time_in +' '+ val.date;
                let shift = val.shift_id === 1 ? 'Morning' : val.shift_id === 2 ? 'Afternoon' : 'Night';
                let time_in = starttime !== null ? moment(starttime).format('lll') : '';
				let time_out = endtime!== null ? moment(endtime).format('lll') : '';
                let breaktime = parseInt(val.breaktime)	
                
                

                let elemtHtml = '<tr>'
                        +	'<td>' + manageButton
                        +   '</td>'
                        +	'<td>' + val.id + '</td>'
                        +	'<td>' + val.user.name  + '</td>'
                        +	'<td>' + time_in + '</td>'
                        +	'<td>' + time_out + '</td>'
                        +	'<td>' + shift + '</td>'
                        +	'<td>' + val.working_hours+ '</td>'
                        +	'<td>' + ((breaktime == 0) ? 0 : (breaktime == 1) ? breaktime + " hr" : breaktime + " hrs") + '</td>'
                        +	'<td>' + val.date + '</td>'
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
            
		});

		self.addEvents();
	},

    dataFiltering : function(button, elem1, elem2) {
        if(button == elem1){
            data={
                'start_date':'#start_date',
                'start_time':'#start_time',
                'break_time':'#break_time',
                'end_time':'#end_time',
                'end_date':'#end_date',
                'working_hours':'#working_hours',

            }
        }
        else{
            data={
                'start_date':'#e-start_date',
                'start_time':'#e-start_time',
                'break_time':'#e-break_time',
                'end_time':'#e-end_time',
                'end_date':'#e-end_date',
                'working_hours':'#e-working_hours',

            }
        }
        return data;
    },

    getTimeout : function(data) {

		if(!$(data.start_date).val())
			return;

		let time = new Date($(data.start_date).val())	
		let workingHours = parseInt($(data.working_hours).val());	
		today = time.toDateString() + " " + $(data.start_time).val();
		let now = today;
		let date = new Date(today);
		let hrs = date.getHours();
		let add = parseInt($(data.break_time).val()) > 0 ? parseInt($(data.break_time).val()) : 0
		// if(workingHours == 8 || workingHours == 7)

		date.setHours(date.getHours() + workingHours + add)		
		let currentDate = new Date(date)
		currentHours = currentDate.getHours() 
		currentMinutes = currentDate.getMinutes() 
		currentSeconds = currentDate.getSeconds() 
		currentHours = ("0" + currentHours).slice(-2);
		currentMinutes = ("0" + currentMinutes).slice(-2);
		currentSeconds = ("0" + currentSeconds).slice(-2);

		let day = moment(currentDate).format('YYYY-MM-DD')
		let timer =  currentHours+ ":" + currentMinutes + ":" + currentSeconds;	
		$(data.end_date).val(day);
		$(data.end_time).val(timer);
	},

    getTimeIn : function(data) {

		if(!$(data.end_date).val())
			return;

		let time = new Date($(data.end_date).val())	
		let workingHours = parseInt($(data.working_hours).val());	
		today = time.toDateString() + " " +$(data.end_time).val();
		let now = today;
		let date = new Date(today);
		let hrs = date.getHours();
		let add = parseInt($(data.break_time).val()) > 0 ? parseInt($(data.break_time).val()) : 0
		//if(workingHours == 8 || workingHours == 7)

		date.setHours(date.getHours() - workingHours - add)		
		let currentDate = new Date(date)
		currentHours = currentDate.getHours() 
		currentMinutes = currentDate.getMinutes() 
		currentSeconds = currentDate.getSeconds() 
		currentHours = ("0" + currentHours).slice(-2);
		currentMinutes = ("0" + currentMinutes).slice(-2);
		currentSeconds = ("0" + currentSeconds).slice(-2);
		let day = moment(currentDate).format('YYYY-MM-DD')

		let timer =  currentHours+ ":" + currentMinutes + ":" + currentSeconds;
		$(data.start_date).val(day)
		$(data.start_time).val(timer)
	},

    getShiftId : function(val) {
		let timein = $("#start_time").val();
		if(timein) {
			let hour = timein.split(":")[0]
			let shift = (hour >= 03 && hour <= 10) ? 1 : (hour >= 10 && hour <= 18) ? 2 : (hour >= 18 && hour <= 23 || hour >= 00 && hour <= 03) ? 3 : 0
            $("#shift").val(shift)
		}
       
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
		if(self.selectedEmployee.length >= 0) {
			$.each(self.selectedEmployee, function(key, val) {
				//let daily = self.manageEmp === 'ONC' ? (parseFloat(($("#h-rate").val()|| 0)) * parseFloat(val.work)) : ($("#rate").val() || 0)
				
				let shift_name = "";
				let shift_id = $("#shift").val();
				val.in = $("#start_time").val()
				val.out = $("#end_time").val()
				//val.daily = daily
				//val.hourly =  daily / parseFloat(val.work)
				//val.incentive = $("#incentive").val()
				val.shift = (shift_id == 1) ? "MORNING" : (shift_id == 2) ? "AFTERNOON" : "NIGHT";
			})
	
			$(elem +' tr').remove();		
			$.each(self.selectedEmployee, function(key, val) 
			{		
				let manageButton ='<button type="button" class=" removeEmployee-'+ val.id +' btn-sm btn-danger design-btn blk-center"><img src="storage/images/icons/svg/delete.svg" class="svg-size"></button>';
				let time_in = val.in !== null ? moment("2023-01-01 " + val.in).format('hh:mm A') : ''
				let time_out = val.out !== null ? moment("2023-01-01 " + val.out).format('hh:mm A') : ''

				var elemHtml = '<tr class="">'
							 +		'<td class="text-left">'+ manageButton +'</td>'
							 + 		'<td class="text-left"><b>'+ val.name.toUpperCase() +'</b></td>'
                             + 		'<td class="text-left"><b>'+ val.shift +'</b></td>'
                             + 		'<td class="text-left"><b>'+ time_in+'</b></td>'
                             + 		'<td class="text-left"><b>'+ time_out +'</b></td>'
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

    getSelectedData2 : function(user_id) {
		var self = this;
		var index = 0;

		$.each(self.lookUpData2, function(key, val) {
			index = parseInt(val.id) === user_id ? key : index;
		});

		return self.lookUpData2[index];
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
                // var params = {
				// 	'page' : page,
				// 	'limit' : 11, //9
				// };

                $.ajax({
                    url: '/schedule/all/modal',
                    type: 'GET',
                    //data:params,
                    data:{},
                    success:function(resp){
                        if(resp.success){
                            self.renderModalSchedule(resp.data.data);

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

            },
            accept : function() {
				var self = Schedule;

				var ids = [];
				$.each(self.selectedEmployee, function(key, val) {
					ids.push(val.id)
				});

				var sched = self.scheduleSwitch;
				var overtime = 0;//$("#overtime-switch").prop("checked") == true ? 1 : 0;
				var daily = self.dailySwitch;//$("#daily-switch").prop("checked") == true ? 1 : 0;
				var position = self.positionSwitch;//$("#position-switch").prop("checked") == true ? 1 : 0;
				
				var params = {
					'user_ids' : ids,
                    'ids_length': ids.length,
					'shift_id' : $("#shift").val(),
					// 'schedule_switch' : sched,
					// 'overtime_switch' : overtime,
					// 'daily_switch' : daily,
					// 'position_switch' : position,
					// 'daily_rate' : $('#rate').val(),
                    // 'hourly_rate' : $('#h-rate').val(),
                    // 'incentive' : $('#incentive').val(),
                    // 'employment_type' : self.manageEmp,
					'time_in' : $('#start_time').val(),
					'date' : $('#start_date').val(),
					'time_out' : $('#end_time').val(),
					// 'overtime_rate' : $('#overtime-rate').val(),
					// 'employment' : $('#employment').val(),
					// 'position' : $('#position').val(),
					// 'department' : $('#department').val(),
					'working_hours' : $('#working_hours').val(),
					'breaktime_no' : $('#break_time').val(),
                    'schedule_days':$('#scheduleDays').val(),
                    'end_date':$('#end_date').val(), 
					// 'sss' : $('#sss').val(),
					// 'gsis' : $('#gsis').val(),
					// 'phil_health' : $('#phil').val(),
					// 'pagibig' : $('#pagibig').val(),
					'_token'  : $('#_token').val()
				};

				$.ajax({
					url : '/sched-create',
					method : 'POST',
					data : params,
					// beforeSend : function() {
					// 	//Main.resetShowErrors()
					// 	$("#btn-accept-account").attr('disabled', 'disabled').html('...');				
					// },
					success : function(resp) {
						if(resp.success) {
							// Helper.notify('Success', 'Successfully saved');	
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: resp.success,
                                showConfirmButton: false,
                                timer: 1000
                              })
                              setTimeout(() => {
                                self.selectedEmployee = [];
                                $('#scheduleForm')[0].reset();
                                $("#myModal").modal('hide');
                                self.api.get.all();		
                              }, 1000);				
						}
						else {
                            Swal.fire({
                                icon: 'error',
                                title: resp.error
                              });
							$("#err-time-out").html(resp.errors)
							// Helper.warn('Warning', resp.errors)
						}
					},
					error : function(resp) {
						// Main.showErrors(resp.responseJSON.errors)	
						// //Several Input Fields with same params key, need to manual	
						// $("#err-user-ids").html(resp.responseJSON.errors.user_ids);
						// $("#err-time-in").html(resp.responseJSON.errors.time_in);
						// $("#err-time-out").html(resp.responseJSON.errors.time_out)
						// $("#err-rate").html(resp.responseJSON.errors.daily_rate)
                        // $("#err-h-rate").html(resp.responseJSON.errors.hourly_rate)   						
					},
					complete : function() {
						// $("#btn-accept-account").removeAttr('disabled').html('<span class="fa fa-download"></span> SAVE SCHEDULED');
					}
				});
			},
            modifySchedule : function(id, shift_id, date) {
				var self = Schedule;

				var ids = [self.editUserId ];
			
				var sched = 1;
				var overtime = 0;//$("#overtime-switch").prop("checked") == true ? 1 : 0;
				var daily = 0;//$("#daily-switch").prop("checked") == true ? 1 : 0;
				var position = 0;//$("#position-switch").prop("checked") == true ? 1 : 0;

				var params = {
                    'sched_id':self.schedId,
					'user_ids' : ids,
					'shift_id' : self.editShiftId,
					// 'schedule_switch' : sched,
					// 'overtime_switch' : overtime,
					// 'daily_switch' : daily,
					// 'position_switch' : position,	
					// 'daily_rate' : 0,
                    // 'hourly_rate' : 0,
                    // 'incentive' : 0,
                    // 'employment_type' : 'ALL',					
					'time_in' : $('#e-start_time').val(),
					'date' : self.editDate,
					'time_out' : $('#e-end_time').val(),		
					'working_hours' : $('#e-working_hours').val(),
					'breaktime_no' : $('#e-break_time').val(),
                    'end_date':self.editEndDate,
					'_token'  : $('#_token').val()
				};

				$.ajax({
					url : '/sched-edit',
					method : 'POST',
					data : params,
					beforeSend : function() {				
						// $("#err-time-in-3").html("")
						// $("#err-time-out-3").html("")			
						// $("#btn-edit-schedule").attr('disabled', 'disabled').html('...');				
					},
					success : function(resp) {
						if(resp.success) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: resp.success,
                                showConfirmButton: false,
                                timer: 1000
                              })
                              setTimeout(() => {
                                $("#edit_schedule_modal").modal('hide');	
                                self.api.get.all();						
                               
                              }, 1000);
						}
						else {
                            Swal.fire({
                                icon: 'error',
                                title: resp.error
                              });
							// Helper.warn('Warning', resp.errors)
						}
					},
					error : function(resp) {
						// $("#err-time-in-3").html(resp.responseJSON.errors.time_in);
						// $("#err-time-out-3").html(resp.responseJSON.errors.time_out)						
					},

					complete : function() {
						// $("#btn-edit-schedule").removeAttr('disabled').html('SAVE');
					}
				});
			},

		}
    }
}

$(function(){
	Schedule.init();
})
