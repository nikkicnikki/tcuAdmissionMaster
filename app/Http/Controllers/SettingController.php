<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Resources\ProgramResource;

use App\Models\Barangay;
use App\Http\Requests\StoreBarangayRequest;
use App\Http\Requests\UpdateBarangayRequest;
use App\Http\Resources\BarangayResource;

use App\Models\ExamDate;
use App\Http\Requests\StoreExamDateRequest;
use App\Http\Requests\UpdateExamDateRequest;
use App\Http\Resources\ExamDateResource;

use App\Models\ExamRoom;
use App\Http\Requests\StoreExamRoomRequest;
use App\Http\Requests\UpdateExamRoomRequest;
use App\Http\Resources\ExamRoomResource;

use App\Models\User;

use Carbon\Carbon;

class SettingController extends Controller
{
    public function index()
    {
        $examDateQuery = ExamDate::query();
        $examRoomQuery = ExamRoom::query();
        $programQuery = Program::query();


        $examDates = $examDateQuery->paginate(20)->onEachSide(1);
        $examRooms = $examRoomQuery->paginate(20)->onEachSide(1);
        $programs = $programQuery->paginate(20)->onEachSide(1);


        return inertia('Setting/Index', [
            'examDates' => $examDates,
            'examRooms' => $examRooms,
            'programs' => $programs,
            'success' => session('success'),
            'sucType' => session('sucType'),

        ]);
    }

    public function examDateCreate()
    {
        // do something here
        return inertia("Setting/DateCreate");
    }

    public function examRoomCreate()
    {
        return inertia("Setting/RoomCreate");
    }

    public function programCreate()
    {
        return inertia("Setting/ProgramCreate");
    }

    public function barangayCreate()
    {
        return inertia("Setting/BarangayCreate");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function examDateStore(StoreExamDateRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        ExamDate::create($data);


        $date = $data['exam_date'];
        $formattedDate = date("F j, Y", strtotime($date));

        return to_route('setting.index')->with([
            'success' => "Successful Add Schedule \"{$formattedDate}\" ",
            'sucType' => 'add'
        ]);

    }

    public function examRoomStore(StoreExamRoomRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        ExamRoom::create($data);

        return to_route('setting.index')->with([
            'success' => "Successful Add Room \"{$data['exam_room']}\" ",
            'sucType' => 'add',
        ]);

    }

    public function programStore(StoreProgramRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Program::create($data);

        return to_route('setting.index')->with([
            'success' => "Successful Add Program \"{$data['name']}\" ",
            'sucType' => 'add',
        ]);

    }


    public function barangayStore(StoreBarangayRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Barangay::create($data);

        return to_route('setting.index')->with([
            'success' => "Successful Add Barangay \"{$data['name']}\" ",
            'sucType' => 'add',
        ]);

    }

    /* DESTROY or DELETE */
    public function examDateDestroy(ExamDate $examdate)
    {
        //dd($examdate);
        $date = $examdate->exam_date;
        $formattedDate = date("F j, Y", strtotime($date));

        $examdate->delete();

        return to_route('setting.index')->with([
            'success' => "Schedule \"$formattedDate\" was deleted",
            'sucType' => 'delete',

        ]);
    }

    public function examRoomDestroy(ExamRoom $examroom)
    {
        //dd($examdate);
        $room = $examroom->exam_room;
        $examroom->delete();

        return to_route('setting.index')->with([
            'success' => "Room \"$room\" was deleted",
            'sucType' => 'delete',

        ]);
    }


    public function programDestroy(Program $program)
    {
        //dd($examdate);
        $prog = $program->name;
        $program->delete();

        return to_route('setting.index')->with([
            'success' => "Program \"$prog\" was deleted",
            'sucType' => 'delete',

        ]);
    }

    public function barangayDestroy(Barangay $barangay)
    {
        //dd($examdate);
        $brgy = $barangay->name;
        $barangay->delete();

        return to_route('setting.index')->with([
            'success' => "Barangay \"$brgy\" was deleted",
            'sucType' => 'delete',

        ]);
    }


    /* EDIT get what you want to deit then redirect you to setting/edit*/
    public function examDateEdit(ExamDate $examdate)
    {
        return inertia('Setting/DateEdit', [
            'examdate' => new ExamDateResource($examdate),
        ]);
    }

    public function examRoomEdit(ExamRoom $examroom)
    {
        return inertia('Setting/RoomEdit', [
            'examroom' => new ExamRoomResource($examroom),
            'users'     => User::all() ,
        ]);
    }

    public function programEdit(Program $program)
    {
        return inertia('Setting/ProgramEdit', [
            'program' => new ProgramResource($program),
        ]);
    }

    public function barangayEdit(Barangay $barangay)
    {
        return inertia('Setting/BarangayEdit', [
            'barangay' => new BarangayResource($barangay),
        ]);
    }


    /* UPDATE */
    public function examDateUpdate(UpdateExamDateRequest $request, ExamDate $examdate)
    {
        $data = $request->validated();

        // Check if the updated status is 2
        if ($data['status'] == 2) {
            // Set all other ExamDate statuses to 1
            ExamDate::where('id', '!=', $examdate->id)->update(['status' => 1]);
        }

        // Update the current exam date record
        $examdate->update($data);

        $date = $examdate->exam_date;
        $formattedDate = date("F j, Y", strtotime($date));

        return to_route('setting.index')->with([
            'success' => "Schedule \"$formattedDate\" was Updated",
            'sucType' => 'edit',
        ]);
    }


    public function examRoomUpdate(UpdateExamRoomRequest $request, ExamRoom $examroom)
    {
        $data = $request->validated();
        $examroom->update($data);

        return to_route('setting.index')->with([
            'success' => "Room \"$examroom->exam_room\" was Updated",
            'sucType' => 'edit',

        ]);
    }

    public function programUpdate(UpdateProgramRequest $request, Program $program)
    {
        $data = $request->validated();
        $program->update($data);

        return to_route('setting.index')->with([
            'success' => "Program \"$program->name\" was Updated",
            'sucType' => 'edit',

        ]);
    }

    public function barangayUpdate(UpdateBarangayRequest $request, Barangay $barangay)
    {
        $data = $request->validated();
        $barangay->update($data);

        return to_route('setting.index')->with([
            'success' => "Barangay \"$barangay->name\" was Updated",
            'sucType' => 'edit',

        ]);
    }


}
