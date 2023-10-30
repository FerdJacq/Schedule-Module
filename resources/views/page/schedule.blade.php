@extends('layouts.master')


@section('content')

    <div class="container">
        <br>
        <h1>Schedules</h1>
        <div class="pull-right">
            <a class="btn btn-primary" data-toggle="modal" id="mediumButton" data-target="#mediumModal">
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

    <div class="modal fade" id="mediumModal" tabindex="-1" aria-labelledby="mediumModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Create Schedule</h2>
                </div>
                <div class="modal-body" id="mediumBody">
                    <div class="modal-body" id="smallBody">
                        <div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // display a modal (medium modal)
        $(document).on('click', '#mediumButton', function(event) {
            event.preventDefault();
            let href = $(this).attr('data-attr');
            $.ajax({
                url: href,
                beforeSend: function() {
                    $('#loader').show();
                },
                // return the result
                success: function(result) {
                    $('#mediumModal').modal("show");
                },
                complete: function() {
                    $('#loader').hide();
                },
                error: function(jqXHR, testStatus, error) {
                    console.log(error);
                    alert("Page " + href + " cannot open. Error:" + error);
                    $('#loader').hide();
                },
                timeout: 8000
            })
        });

    </script>

    <script src='js/module/schedule.js' ></script>
@endsection


  