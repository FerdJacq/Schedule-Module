<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'date', 'time_in', 'time_out','shift_id','working_hours','breaktime','end_date'];

    public function user(){
        //$this->belongsTo(user::class);
        return $this->hasOne('App\Models\User', 'id' , 'user_id');
    }

}
