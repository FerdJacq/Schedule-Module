<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginsController extends Controller
{
  

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function logins(){
        return view('login');
    }

    public function user_login(Request $request){
        if(Auth::attempt([
            'email' => $request->input('email'), 
            'password' => $request->input('password')
            ])){
                return response()->json(
                    ['success' => 'Successfully Logged In']
                );
            }
            else{
                return response()->json(
                    ['error' => 'Logged in Failed']
                );
            }

    }
    
    public function logout () {
        //logout user
        auth()->logout();
        // redirect to homepage
        return redirect('/logins');
    }
}
