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
//use App\Http\Resources\ExamRoomResource;

use App\Http\Resources\ExamRoomEditResource;
use App\Models\Applicant;
use App\Models\User;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $examDateQuery = ExamDate::query();
        $programQuery = Program::query();
        $examRoomQuery = ExamRoom::query();

        $activeDateID = ExamDate::where('status', 2)->value('id');

        // $examRoomQuery = DB::table('applicants')
        //     ->join('exam_rooms', 'applicants.exam_room', '=', 'exam_rooms.id')
        //     ->select(
        //         DB::raw('COUNT(exam_rooms.id) as curr_count'),
        //         'exam_rooms.exam_room',
        //         'applicants.exam_date',
        //         'exam_rooms.status',
        //         'exam_rooms.set_user',
        //         'exam_rooms.limit',
        //         'exam_rooms.des',
        //         'exam_rooms.created_at',
        //         'exam_rooms.id'
        //     )
        //     ->where('applicants.exam_date',$activeDateID)
        //     ->groupBy(
        //         'exam_rooms.exam_room',
        //         'applicants.exam_date',
        //         'exam_rooms.status',
        //         'exam_rooms.set_user',
        //         'exam_rooms.limit',
        //         'exam_rooms.des',
        //         'exam_rooms.created_at',
        //         'exam_rooms.id'
        //     )
        //     ->get();


        $applicantWithPermit = Applicant::selectRaw('COUNT(exam_room) AS curr_count, exam_room, exam_date')
            ->where('exam_date', $activeDateID)
            ->groupBy('exam_room', 'exam_date')
            ->get();




        $examDates = $examDateQuery->paginate(50)->onEachSide(1);
        $examRooms = $examRoomQuery->paginate(50)->onEachSide(1);
        $programs = $programQuery->paginate(50)->onEachSide(1);
        $users = User::all();

        return inertia('Setting/Index', [
            'examDates' => $examDates,
            'examRooms' => $examRooms,
            'programs' => $programs,
            'users' => $users,
            'applicantWithPermit' => $applicantWithPermit,
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
            'examroom' => new ExamRoomEditResource($examroom),
            'users' => User::all(),
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

        // Update the current exam room with validated data
        $examroom->update($data);

        // Store the original set_user before updating
        $originalSetUser = $examroom->set_user;

        // Check if the original set_user is assigned to another ExamRoom and reset it
        if (!is_null($originalSetUser)) {
            ExamRoom::where('set_user', '=', $originalSetUser)
                ->where('id', '!=', $examroom->id) // Avoid updating the current exam room
                ->update(['set_user' => null]);
        }

        return to_route('setting.index')->with([
            'success' => "Room \"$examroom->exam_room\" was updated",
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



    public function setLimit($limit)
    {
        // Validate the limit
        $validator = Validator::make(['limit' => $limit], [
            'limit' => 'required|integer|min:1'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Perform the update operation
        $updateSuccess = ExamRoom::query()->update(['limit' => (int) $limit]);

        if (!$updateSuccess) {
            return response()->json(['error' => 'Failed to update exam rooms.'], 409);
        }

        
        // Send back a success message to the frontend
        //return response()->json(['message' => 'Limit updated successfully.']);
    }



}
