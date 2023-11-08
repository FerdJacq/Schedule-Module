<?php $__env->startSection('content'); ?>
    <div class="container">
        <br>
        <h1>Schedules</h1>
        <div class="pull-right">
            <a class="btn btn-primary" id="openModal">
                Create Schedule<i class="fas fa-plus-circle"></i>
            </a>
        </div>
        <table class="table table-hover">
            <thead>

                <tr>
                    <th scope="col">Manage</th>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Time In</th>
                    <th scope="col">Time Out</th>
                    <th scope="col">Shift</th>
                    <th scope="col">Working Hours</th>
                    <th scope="col">Break Time</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody id="schedule-content">
            </tbody>
        </table>
        <div class="pagination justify-content-center mt-4">
            <div id="table-pagination">
            </div>
        </div>
    </div>


    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="exampleModalLabel">Create Schedule</h1>
                </div>
                <div class="modal-body">
                    <!-- Form to create a schedule -->
                    <div>
                        <button class="btn btn-danger btn-uncheckall">Clear Selected</button>
                        <button class="btn btn-primary btn-checkall">Select all</button>
                    </div>
                    <form id="scheduleForm" class="d-flex mr-4 w-100 ">
                        <div class="table-content">
                            <div class="form-group">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Manage</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modal-schedule-content">
                                        <!-- Users will be populated here via JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="pagination ">
                                <div id="table-pagination">
                                </div>
                            </div>
                            <button type="button" class="btn btn-primary" id="createSchedule">Save Schedule</button>
                        </div>
                        <div class="date-forms">
                            <div class="d-flex justify-content-between">
                                <div class="form-group">
                                    <label for="shift" class="form-label">Shift</label>
                                    <select class="form-select mb-2" id="shift">
                                        <option value="1">Morning</option>
                                        <option value="2">Afternoon</option>
                                        <option value="3">Night</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="working_hours" class="form-label">Working Hours</label>
                                    <input type="number" id="working_hours" class="form-control mb-2" value="8"
                                        min="1" max="8">
                                </div>
                                <div class="form-group">
                                    <label for="break_time" class="form-label">Break Time</label>
                                    <select class="form-select mb-2" id="break_time">
                                        <option value="0">0</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="scheduleDays">Apply Schedule within (No.) of Days</label>
                                    <input type="number" class="form-control" id="scheduleDays"
                                        name="scheduleDays" value="1">
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <div class="form-group">
                                    <label for="start_time">Start Date</label>
                                    <input type="date" class="form-control" id="start_date" name="start_date"
                                        value="">
                                </div>
                                <div class="form-group">
                                    <label for="end_time">Start Time</label>
                                    <input type="time" class="form-control" id="start_time" name="start_time">
                                </div>
                                <div class="form-group">
                                    <label for="end_time">End Date</label>
                                    <input type="date" class="form-control" id="end_date" name="end_date">
                                </div>
                                <div class="form-group">
                                    <label for="end_time">End Time</label>
                                    <input type="time" class="form-control" id="end_time" name="end_time">
                                </div>
                            </div>
                            <div>

                                <table class="table mt-4">
                                    <thead>
                                        <tr>
                                            <th scope="col">Manage</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Shift</th>
                                            <th scope="col">Schedule In</th>
                                            <th scope="col">Schedule Out</th>
                                        </tr>
                                    </thead>
                                    <tbody id="modal-schedule-cart-content">
                                        <!-- Users will be populated here via JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>



<div class="modal fade" id="edit_schedule_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title" id="exampleModalLabel">Edit Schedule</h1>
        </div>
        <div class="modal-body">
            <div class="row" id="editSchedForm">
                <div class="column">
                    <div class="form-group mb-2">
                        <label for="e-shift" class="form-label">Shift</label>
                        <select class="form-select" id="e-shift">
                            <option value="1">Morning</option>
                            <option value="2">Afternoon</option>
                            <option value="3">Night</option>
                        </select>
                    </div>
                    <div class="form-group mb-2">
                        <label for="e-working_hours" class="form-label">Working Hours</label>
                        <input type="number" id="e-working_hours" class="form-control " value="8"
                            min="1" max="8">
                    </div>
                    <div class="form-group mb-2">
                        <label for="e-break-time" class="form-label">Break Time</label>
                        <select class="form-select " id="e-break_time">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
                <div class="column">
                    <div class="form-group mb-2 mt-2">
                        <label for="e-scheduleDays">Apply Schedule within (No.) of Days</label>
                        <input type="number" class="form-control" id="e-scheduleDays"
                            name="scheduleDays" value="1">
                    </div>
                    <div class="form-group mb-2 mt-3">
                        <label for="e-start_time">Start Time</label>
                        <input type="time" class="form-control" id="e-start_time" name="start_time">
                    </div>
                    <div class="form-group mb-2 mt-3">
                        <label for="e-end_time">End Time</label>
                        <input type="time" class="form-control" id="e-end_time" name="end_time">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="btn-edit-schedule" class="btn btn-primary">Save Schedule</button>
        </div>
      </div>
    </div>
  </div>

    <script src='js/module/schedule.js'></script>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.master', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\xampp\htdocs\EmployeeSched\resources\views/page/schedule.blade.php ENDPATH**/ ?>