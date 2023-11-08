<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Schedule;
use App\Models\User;
use Carbon\Carbon;

class ScheduleController extends Controller
{

    public function sched()
    {
        return view('page.schedule');
    }

    public function createSched(Request $request, $id)
    {
        $user = User::find($id);

        // Validate input
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'shift' => 'required',
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
        return response()->json(['success' => 'User Registeration Complete!']);
    }


    public function showSched(Request $request)
    {
        $users = Schedule::with('user:id,name')->offset($request->get('page'))->paginate($request->get('limit'));



        $links = str_replace('/?', '?', $users->render());
        return response()->json([
            'success' => true,
            'data' => $users,
            'links' => $links
        ]);
    }

    public function showSchedModal(Request $request)
    {
        $users = User::offset($request->get('page'))->paginate($request->get('limit'));

        $links = str_replace('/?', '?', $users->render());
        return response()->json(['success' => true, 'data' => $users, 'links' => $links]);
    }


    public function editSched(Request $request)
    {

        $dataArray = $request->input('user_ids');
        $firstValue = reset($dataArray);

        $validator = Validator::make($request->all(), [
            'user_id' => $firstValue,
            'date' => 'required|date',
            'shift_id' => 'required|numeric',
            'time_in' => 'required|date_format:H:i:s',
            'time_out' => 'required|date_format:H:i:s|after:start_time',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $schedId =  $request->input('sched_id');
        $userId = $request->input('user_ids')[0];
        Schedule::where('id',$schedId)->update([
            'user_id' => $userId,
            'time_in' => $request->input('time_in'),
            'time_out' => $request->input('time_out'),
            'shift_id' => $request->input('shift_id'),
            'working_hours' => $request->input('working_hours'),
            'breaktime' => $request->input('breaktime_no'),
            'end_date' => $request->input('end_date'),
            'date' => $request->input('date'),

        ]);

        return response()->json(['success' => 'Schedule is succesfully created!']);
    }


    public function delSched($id)
    {
        $schedule = Schedule::find($id);
        if ($schedule) {
            $schedule->delete();
            return response()->json(['success' => 'Schedule is Deleted!']);
        } else {
            return response()->json([
                'error' => "Schedule is no longer existing!",
            ]);
        }
    }

    public function updateSched(Request $request)
    {

        $dataArray = $request->input('user_ids');
        $firstValue = reset($dataArray);

        $validator = Validator::make($request->all(), [
            'user_id' => $firstValue,
            'date' => 'required|date',
            'shift_id' => 'required|numeric',
            'time_in' => 'required|date_format:H:i:s',
            'time_out' => 'required|date_format:H:i:s|after:start_time',
            'end_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }


        $date = Carbon::parse($request->input('date'));
        $date->subDays();
        $scheduleDays = $request->input('schedule_days');


        for ($x = 1; $x <= $scheduleDays; $x++) {
            $newDate = $date->addDays();

            for ($i = 0; $i < $request->input('ids_length'); $i++) {

                $userId = $request->input('user_ids')[$i];


                $users = Schedule::where('user_id', $userId)->updateOrCreate([
                    'user_id' => $userId,
                    'time_in' => $request->input('time_in'),
                    'time_out' => $request->input('time_out'),
                    'shift_id' => $request->input('shift_id'),
                    'working_hours' => $request->input('working_hours'),
                    'breaktime' => $request->input('breaktime_no'),
                    'end_date' => $request->input('end_date'),
                    'date' => $newDate,

                ]);

                $users->save();
            }
        }

        return response()->json(['success' => 'Schedule is succesfully created!']);
    }
}
