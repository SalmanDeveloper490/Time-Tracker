<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use App\Models\Time;


class TimeController extends Controller
{

    public function index($todoId)
    {
        $time = Todo::find($todoId)->times;
        // $time = Todo::latest()->find($todoId)->times;
        return response()->json($time);
    }

    //  public function index()
    // {
    //     $time = Todo::latest()->find(1)->times;
    //     return response()->json($time);
    // }
 
    public function store(Request $request)
    {
        $time = new Time();
        $time->time = $request->time;
        $time->todo_id = $request->todo_id;
        $time->save();

        // Return a success response
        return response()->json([
            'message' => 'Elapsed time saved to the database',
        ], 201);
    }
}
