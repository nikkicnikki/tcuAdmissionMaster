<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use App\Models\Program;
use App\Models\ExamDate;
use App\Models\ExamRoom;
use App\Http\Resources\ApplicantPermitResource;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PermitController extends Controller
{

    public function permit_print(Request $request, $applicant_id)
    {
        $request->validate([
            'image_capture' => 'required|string'
        ]);

        $examDate = $request->input('exam_date');
        $examRoom = $request->input('exam_room');
        // SELECT COUNT(*) FROM `applicants` WHERE exam_date = 4 AND exam_room = 1
        $applicant = Applicant::findOrFail($applicant_id);

        $limit = Applicant::where('exam_date', $examDate)
            ->where('exam_room', $examRoom)->count();

        $userID = auth()->user()->id;
        $activeDateID = ExamDate::where('status', 2)->value('id');
        $setLimit = ExamRoom::where('set_user', $userID)->value('limit');
        //                                   'id'  ,  exam_room

        if ($limit >= $setLimit) {
            //change State to complete
            return redirect()->back()->with('error', 'Limit of $setLimit applicants per room has been reached.');
        }

        $imageData = $request->input('image_capture');

        // Clean and decode image
        if (!preg_match('/^data:image\/(\w+);base64,/', $imageData)) {
            return response()->json(['error' => 'Invalid image data'], 422);
        }

        $image = preg_replace('/^data:image\/\w+;base64,/', '', $imageData);
        $image = str_replace(' ', '+', $image);
        $imageName = 'applicant_' . $applicant_id . '_' . time() . '.jpg';

        Storage::disk('public')->put("applicants/{$imageName}", base64_decode($image));

        $applicant->image_capture = "applicants/{$imageName}";
        $applicant->printed_by = $request->input('printed_by');
        $applicant->exam_date = $examDate;
        $applicant->exam_room = $examRoom;
        $applicant->status = 4;
        $applicant->printed_date = now();
        $applicant->save();

        return Inertia::render('PDF/Print', [
            'applicant' => new ApplicantPermitResource($applicant),
            'exam_date_name' => $request->input('exam_date_name'),
            'exam_room_name' => $request->input('exam_room_name'),
            'image_capture' => "applicants/{$imageName}"
        ]);
    }

}
