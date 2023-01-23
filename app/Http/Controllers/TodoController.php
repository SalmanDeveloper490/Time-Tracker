<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use App\Models\Time;

class TodoController extends Controller
{

    
    public function index(Request $request)
    {
        if($request->search){
           return response()->json(Todo::where('todo','like','%'.$request->search.'%')->paginate(2));
        }
        return response()->json(Todo::whereUserId($request->user()->id)->paginate(2));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $data['user_id'] = $request->user()->id;
        $data['todo'] = $request->todo;
        // $data['time'] = $request->time;
        $todo = Todo::create($data);

        return response()->json($todo);
    }

    public function show(Todo $todo)
    {
         //
    }

    public function edit(Todo $todo)
    {
        //
    }

    public function update(Request $request, Todo $todo)
    {
        $todo->update(['todo'=>$request->todo]);
        return response()->json($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json('success');
    }
}
