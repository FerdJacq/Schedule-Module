<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->integer('shift_id');
            $table->integer('working_hours');
            $table->integer('breaktime');
            $table->date('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('schedules', function (Blueprint $table) {
            $table->dropColumn('shift_id');
            $table->dropColumn('working_hours');
            $table->dropColumn('breaktime');
            $table->dropColumn('date');
        });
    }
};
