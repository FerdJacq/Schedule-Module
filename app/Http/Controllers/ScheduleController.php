<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Schedule;
use App\Models\User;

class ScheduleController extends Controller
{

    public function sched(){
        return view('page.schedule');
    }

    public function createSched(Request $request, $id){
        $user = User::find($id);
        // Validate input
    $validator = Validator::make($request->all(), [
        'user_id' => 'required|exists:users,id',
        'date' => 'required|date',
        'start_time' => 'required|date_format:H:i',
        'end_time' => 'required|date_format:H:i|after:start_time',
    ]);
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Create new schedule
    $schedule = Schedule::create([
        'user_id' => $request->input('user_id'),
        'date' => $request->input('date'),
        'start_time' => $request->input('start_time'),
        'end_time' => $request->input('end_time'),
    ]);
    $schedule->save();
    return response()->json(['success'=>'User Registeration Complete!']);
    }


    public function showSched(){
        $users = User::all();
        return response()->json([
            'success'=>true,
            'data' => $users
        ]);
    }


    public function editSched($id){
        $user = User::find($id);
        if($user){
            $user->get();
            return response()->json($user);
        }else{
            return response()->json([
                'error' => "Product with the id:$id is not existing!",
            ]);
        }
    }

    public function delSched($id){
        $user = User::find($id);
        if($user){
            $user->delete();
            return response()->json(['success'=>'User is Deleted!']);
        }else{
            return response()->json([
                'error' => "User is no longer existing!",
            ]);
        }
    }

}


