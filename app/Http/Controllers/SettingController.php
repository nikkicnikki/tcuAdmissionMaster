<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Program;
use App\Http\Requests\StoreProgramRequest;
use App\Http\Requests\UpdateProgramRequest;
use App\Http\Requests\ProgramResource;

use App\Models\Barangay;
use App\Http\Requests\StoreBarangayRequest;
use App\Http\Requests\UpdateBarangayRequest;
use App\Http\Requests\BarangayResource;

use App\Models\ExamDate;
use App\Http\Requests\StoreExamDateRequest;
use App\Http\Requests\UpdateExamDateRequest;
use App\Http\Resources\ExamDateResource;

use App\Models\ExamRoom;
use App\Http\Requests\StoreExamRoomRequest;
use App\Http\Requests\UpdateExamRoomRequest;
use App\Http\Resources\ExamRoomResource;



use Carbon\Carbon;

class SettingController extends Controller
{
    public function index()
    {
        $examDateQuery = ExamDate::query(); 
        $examRoomQuery = ExamRoom::query();
        $programQuery  = Program::query(); 
        $barangayQuery  = Barangay::query(); 


        $examDates = $examDateQuery->paginate(20)->onEachSide(1);
        $examRooms = $examRoomQuery->paginate(20)->onEachSide(1);
        $programs = $programQuery->paginate(20)->onEachSide(1);
        $barangays = $barangayQuery->paginate(50)->onEachSide(1); //need a to set an individual pagination


        return inertia('Setting/Index',[
            'examDates' => $examDates,
            'examRooms' => $examRooms,
            'programs'  => $programs,
            'barangays' => $barangays,
            'success'   => session('success'),
            'sucType'   => session('sucType'),

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

        return to_route('setting.index')->with([
            'success' => $data['exam_date'],
            'sucType' => 'exam_date'
        ]);

    }

    public function examRoomStore(StoreExamRoomRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        ExamRoom::create($data);

        return to_route('setting.index')->with([
            'success' => $data['exam_room'] , 
            'sucType' => 'exam_room',
        ]);

    }

    public function programStore(StoreProgramRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Program::create($data);

        return to_route('setting.index')->with([
            'success' => $data['name'] ,
            'sucType' => 'program',
        ]);

    }


    public function barangayStore(StoreBarangayRequest $request)
    {
        $data = $request->validated();
        //dd($data);
        Barangay::create($data);

        return to_route('setting.index')->with([
            'success' => $data['name'],
            'sucType' => 'barangay',
        ]);

    }

    /* DESTROY or DELETE */
    public function examDateDestroy(ExamDate $examdate)
    {
        //dd($examdate);
        $examdate->delete();

        return to_route('setting.index')->with('success', 'Schedule was deleted');
    }

    public function examRoomDestroy(ExamRoom $examroom)
    {
        //dd($examdate);
        $examroom->delete();

        return to_route('setting.index')->with('success', 'Room was deleted');
    }


    public function programDestroy(Program $program)
    {
        //dd($examdate);
        $program->delete();

        return to_route('setting.index')->with('success', 'Program was deleted');
    }

    public function barangayDestroy(Barangay $barangay)
    {
        //dd($examdate);
        $barangay->delete();

        return to_route('setting.index')->with('success', 'Barangay was deleted');
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
        ]);
    }

    public function programEdit(Program $program)
    {
        //
    }

    public function barangayEdit(Barangay $barangay)
    {
        //
    }


    /* UPDATE */
    public function examDateUpdate(UpdateExamDateRequest $request, ExamDate $examdate)
    {
        $data = $request->validated();
        $examdate->update($data);

        return to_route('setting.index')->with('success', "Schedule \"$examdate->exam_date\" was Updated");
    }

    public function examRoomUpdate(UpdateExamRoomRequest $request, ExamRoom $examroom)
    {
        $data = $request->validated();
        $examroom->update($data);

        return to_route('setting.index')->with('success', "Room \"$examroom->exam_room\" was Updated");
    }
 
}
