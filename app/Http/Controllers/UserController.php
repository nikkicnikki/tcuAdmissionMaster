<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");


        if (request( "name" )) {
            $query->where("name", "like", "%" . request("name") . "%" );
        }

        if (request( "email" )) {
            $query->where("email", "like", "%" . request("email") . "%" );
        }

        if (request()->has( "role" )) {
            $query->where( "role" , request("role"));
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(20)->onEachSide(1);
        
        return inertia('User/Index', [
            'users' => UserResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'sucType' => session('sucType'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        //$data['email_verified_at'] = time(); add if there's a email_verified_at @ users table to verifiend the new user
        $data['password'] = bcrypt($data['password']);
        //dd($data);
        User::create($data);
        $user = $data['name'];


        return to_route('user.index')->with([
            'success' => "Successful Add Schedule \"{$user}\" ",
            'sucType' => 'add'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return inertia('User/Show', [
            'user' => new UserResource($user) , 
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'User' => new UserResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        
        $password = $data['password'] ?? null;

        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }
        
        $user->update($data);

        $name = $data['name'];

        return to_route('user.index')->with([
            'success' => "User \"$name\" was Updated" ,
            'sucType' => 'edit',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user_name = $user->name;
        $user->delete();

        return to_route('user.index')->with([
            'success' => "User \"$user_name\" was deleted" ,
            'sucType' => 'delete',
        
        ]);
    }
}
