@extends('layouts.master')

@section('content')

    <section>
        <div class="container w-100">
            <div class="login-container">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                        <h4 class="text-center">Register</h4></div>
                        <div class="card-body">
                            <form id="regForm">
                                <input type="hidden" name="_token" id="_token" value="{{ csrf_token() }}">
                                <div class="form-group mb-2">
                                    <label for="Name">Name</label>
                                    <input type="text" name="name" id="name" class="form-control" placeholder="Enter Name" minlength="1" >
                                    <span class="error" id="nameError"></span>
                                   
                                </div>
                                <div class="form-group mb-2">
                                    <label for="Email">Email</label>
                                    <input type="text" name="email" id="email" class="form-control" placeholder="Enter Email" >
                                    <span class="error" id="emailError"></span>
                                </div>
                                <div class="form-group mb-2">
                                    <label for="password">Password</label>
                                    <input type="password" name="password" id="password" class="form-control" placeholder="Enter Password" >
                                    <span class="error" id="passwordError"></span>
                                </div>
                                <div class="form-group">
                                    <label for="cpassword">Confirm Password</label>
                                    <input type="password" name="cpassword" id="cpassword" class="form-control" placeholder="Enter Confirm Password">
                                    <span class="error" id="confirmPasswordError"></span>
                                </div>
                                <button type="button" class="btn btn-primary mt-4 w-100" id="register_btn">Register</button>
                            </form>
                        </div>
                    </div>
            </div>
        </div>
        
    </section>
    <script src='js/module/register.js' ></script>
@endsection

