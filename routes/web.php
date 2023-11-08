<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('logins');
});


Route::get('/logins', [App\Http\Controllers\LoginsController::class,'logins'])->name('login');
Route::post('/api_login', [App\Http\Controllers\LoginsController::class,'user_login'])->name('home');

Route::get('registers',[App\Http\Controllers\RegistersController::class,'registers'])->name('register');
Route::post('api_register',[App\Http\Controllers\RegistersController::class,'api_register'])->name('login');

Route::get('/logout', [App\Http\Controllers\LoginsController::class,'logout'])->name('login');

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/schedule', function () {
    return view('page.schedule');
});
Route::get('/schedule/all',[App\Http\Controllers\ScheduleController::class, 'showSched']);
Route::get('/schedule/all/modal',[App\Http\Controllers\ScheduleController::class, 'showSchedModal']);

Route::post('/sched-edit',[App\Http\Controllers\ScheduleController::class,'editSched']);


Route::delete('del-sched/{id}', [App\Http\Controllers\ScheduleController::class,'delSched']);

Route::post('/sched-create', [App\Http\Controllers\ScheduleController::class,'updateSched']);


