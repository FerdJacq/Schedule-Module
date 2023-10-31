@extends('layouts.master')


@section('content')

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
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody id="schedule-content">
            </tbody>
          </table>
    </div>

    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title" id="exampleModalLabel">Create Schedule</h1>
                </div>
                <div class="modal-body">
                    <!-- Form to create a schedule -->
                    <form id="scheduleForm" class="d-flex mr-4 w-100">
                        <div class="table-content">
                            <div class="form-group">
                                <label for="users">Select Users</label>
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
                            <button type="button" class="btn btn-primary" id="createSchedule">Save Schedule</button>
                        </div>
                        <div class="date-forms" >
                            <div class="form-group">
                                <label for="start_time">Start Time</label>
                                <input type="datetime-local" class="form-control" id="start_time" name="start_time">
                            </div>
                            <div class="form-group">
                                <label for="end_time">End Time</label>
                                <input type="datetime-local" class="form-control" id="end_time" name="end_time">
                            </div>
                            <div>

                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Manage</th>
                                            <th scope="col">Name</th>
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

    <script src='js/module/schedule.js' ></script>
@endsection


