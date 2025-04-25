import React, { Fragment, useEffect, useState } from 'react';
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Dialog } from "@headlessui/react";
import { BackspaceIcon, CameraIcon, ExclamationTriangleIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react'
import Webcam from 'react-webcam';


export default function Permit({ auth, applicants, users, examdates, examrooms }) {

    const [isWebcamReady, setIsWebcamReady] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { error } = usePage().props;

    useEffect(() => {
        if (error || errorMessage) {
            setShowErrorModal(true);
        }
    }, [error, errorMessage]);

    const curr_user = auth.user.id;
    const vald_user_id = applicants.validate_by;
    const vald_user_name = users.find(user => user.id === vald_user_id)?.name;
    const vald_user_role = users.find(user => user.id === vald_user_id)?.role;
    const schedule_date_id = examdates.find(examdate => examdate.status === 2)?.id;
    const schedule_exam_date = examdates.find(examdate => examdate.status === 2)?.exam_date;
    const room_id = examrooms.find(examroom => examroom.set_user === curr_user)?.id;
    const room_exam = examrooms.find(examroom => examroom.set_user === curr_user)?.exam_room;

    const { data, setData, put, errors, reset } = useForm({
        //header
        status: applicants.status || '',
        created_at: applicants.created_at || '',
        updated_at: applicants.updated_at || '',

        validate_by: vald_user_id || '',
        validate_name: vald_user_name || '',

        printed_by: auth.user.id || curr_user,
        printed_name: auth.user.name || '',

        applicant_id: applicants.id || '',

        f_name: applicants.f_name || '',
        m_name: applicants.m_name || '',
        sr_name: applicants.sr_name || '',
        prog: applicants.prog || '',

        sex: applicants.sex.toLowerCase() || '',
        cont: applicants.cont || '',
        curr_add: applicants.curr_add || '',

        image_capture: applicants.image_capture || '',

        exam_date: schedule_date_id || '',
        exam_room: room_id || '',

    });

    if (auth.user.role == 3 && (data.status == 1 || data.status == 2)) {
        data.status = 2;
    }

    const handlePrintClick = (e) => {
        e.preventDefault();
        if (!cap) return alert("No image captured");

        const queryParams = new URLSearchParams({
            image_capture: cap,
            printed_by: data.printed_by,
            exam_date: data.exam_date,
            exam_room: data.exam_room,
            exam_date_name: schedule_exam_date,
            exam_room_name: room_exam,
        }).toString();

        router.get(route('permit.print', { applicant_id: data.applicant_id }) + '?' + queryParams);

    };

    const [cap, setCap] = useState('');

    const webcamRef = React.useRef(null);
    const capture = React.useCallback(() => {
        // Check if the webcam is ready
        if (!isWebcamReady) {
            setErrorMessage("Webcam not ready yet!");
            setShowErrorModal(true);
            return;
        }

        // Check if the webcam reference is valid
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot({
                width: 640,
                height: 480
            });

            // Check if the screenshot was actually captured
            if (imageSrc) {
                setCap(imageSrc);
                setErrorMessage(""); // Clear any previous error

                const base64Length = imageSrc.length - 'data:image/jpeg;base64,'.length;
                const fileSizeInBytes = 4 * Math.ceil(base64Length / 3);
                const fileSizeInKB = fileSizeInBytes / 1024;
                console.log('File size (KB):', fileSizeInKB.toFixed(2));
            } else {
                setErrorMessage("Unable to capture image. Please try again.");
                setShowErrorModal(true);
            }
        } else {
            setErrorMessage("Webcam reference not available.");
            setShowErrorModal(true);
        }
    }, [webcamRef, isWebcamReady]);


    const ucwords = (str) => {
        return str
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex ">
                    <a
                        onClick={() => window.history.back()}
                        className="text-xl cursor-pointer font-semibold leading-tight text-gray-800 dark:text-gray-200 cursor-pointer hover:underline transition-colors duration-200">
                        &laquo; back
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;

                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Permit for {` "${ucwords(`${data.f_name} ${data.m_name} ${data.sr_name}`)}"`}
                    </h2>
                </div>
            }
        >
            <Head title={`Applicant "${ucwords(`${data.f_name} ${data.m_name} ${data.sr_name}`)}"`} />


            {/* APPLICANT STATUS */}
            <div className="pt-8 pb-2">
                <div className="mx-auto max-w-7xl sm:px- lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <div className="p-1 sm:p-3 bg-white shadow sm:rounded-lg flex flex-nowrap" >

                            <div className="mt-1 flex-1">

                                <label className="font-bold text-lg ml-2">STATUS :</label>
                                <span
                                    className={
                                        "px-1 py-1 ml-1 rounded text-white " +
                                        APPLICANT_STATUS_CLASS_MAP[data.status]
                                    }
                                >
                                    {APPLICANT_STATUS_TEXT_MAP[data.status]}
                                </span>
                                <br />


                            </div>

                            <div className="mt-1 flex-1 text-right ">
                                <p className="text-[11px]">
                                    <label className="font-bold ml-2 ">APPLIED : </label>
                                    {new Date(data.created_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}

                                    <label className="font-bold ml-2 ">UPDATE : </label>
                                    {new Date(data.updated_at).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-[11px] ">
                                    <label className="font-bold ">PRINTED BY :</label> {data.printed_name.toUpperCase()}
                                    <span
                                        className={
                                            "px-1 py-1 ml-3 rounded text-white text-[10px] " +
                                            USER_STATUS_CLASS_MAP[auth.user.role]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[auth.user.role]}
                                    </span>

                                    <label className="font-bold pl-2"> VALIDATED BY : </label> {data.validate_name.toUpperCase()}
                                    <span
                                        className={
                                            "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                            USER_STATUS_CLASS_MAP[vald_user_role]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[vald_user_role]}
                                    </span>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* PRINTABLE APPLICANT INFO */}
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">

                        <div className="mt-2 p-10 flex bg-[rgb(250,245,226)] shadow-inner">
                            <div className="w-full p-5 m-3" >
                                <table className="text-left">
                                    <tbody>
                                        <tr className="pb-20">
                                            <th className="text-gray-500 text-xs">APPLICANT NO. : </th>
                                            <td className="border-b border-black px-3 text-md">{applicants.id}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">DATE OF EXAMINATION : </th>
                                            <td className="border-b border-black px-3 text-md">
                                                {new Date(schedule_exam_date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <th className="text-right text-gray-500 text-xs"> ROOM NO. : </th>
                                            <td className="border-b border-black px-3 text-md">{room_exam}</td>
                                        </tr>

                                        <tr>
                                            <th className="text-gray-500 text-xs">NAME : </th>
                                            <td className="border-b border-black px-3 text-md" colSpan="3">
                                                {ucwords(data.sr_name) + ", " + ucwords(data.f_name) + " " + ucwords(data.m_name)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">PROGRAM : </th>
                                            <td className="border-b border-black px-3 text-md" colSpan="3">
                                                {
                                                    data.prog.acronym + " - " +
                                                    data.prog.name
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">GENDER : </th>
                                            <td className="border-b border-black px-3 text-md" colSpan="3">{data.sex}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">CONTACT No. : </th>
                                            <td className="border-b border-black px-3 text-md" colSpan="3">{data.cont}</td>
                                        </tr>
                                        <tr>
                                            <th className="text-gray-500 text-xs">ADDRESS : </th>
                                            <td className="border-b border-black px-3 text-md" colSpan="3">{data.curr_add}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className=" text-right  " >
                                {cap &&
                                    <div className='pl-20 pb-20'>
                                        <label htmlFor="" className='bg-blue-500 p-2 text-white'> CAPTURED</label>
                                        <img src={cap} alt="Captured image" className="w-full h-auto rounded pl-20" />
                                    </div>
                                }
                                <div className='pl-20 pb-20'>
                                    <label htmlFor="" className='bg-red-500 p-2 text-white '> LIVE</label>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        screenshotQuality={0.6}
                                        videoConstraints={{
                                            width: 640, // smaller than 1280
                                            height: 480, // smaller than 720
                                            facingMode: "user", // Use "environment" for the rear camera
                                        }}
                                        onUserMedia={() => setIsWebcamReady(true)}
                                        onUserMediaError={() => {
                                            setErrorMessage("Failed to access webcam.");
                                            setShowErrorModal(true);
                                        }}
                                        className="w-full h-auto rounded pl-20"
                                    />
                                </div>

                            </div>
                        </div>



                        <div className="flex justify-end mb-10 pr-10 mr-5 mt-2">
                            <button
                                onClick={capture}
                                className="ml-2 py-1 px-3 text-white bg-blue-500 rounded shadow shadow-lg transition-all hover:bg-blue-600"
                            >
                                <CameraIcon className="h-[30px]" />
                            </button>

                            {cap ?
                                (<Button
                                    onClick={handlePrintClick}
                                    title="PDF PRINT"
                                    className="ml-2 py-1 px-3 text-gray-800 bg-[rgb(239,228,176)] rounded shadow shadow-lg transition-all hover:bg-yellow-600 "
                                >
                                    <PrinterIcon className="h-[30px] mt-2" />
                                </Button>) :
                                <div className="ml-2 py-1 px-3 text-white bg-gray-300 rounded shadow shadow-lg transition-all" title="CAPTURE IMAGE FIRST">
                                    <PrinterIcon className="h-[30px] mt-2" />
                                </div>
                            }

                            <Link href={route("applicant.index")}
                                title="BACK / CANCEL"
                                className=" bg-gray-500 ml-2 py-1 px-3 text-white rounded shadow  hover:bg-gray-800 mr-2"
                            >
                                <BackspaceIcon className="h-[30px] mt-1" />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* ERROR MODAL */}
            <Dialog open={showErrorModal} onClose={() => setShowErrorModal(false)} as={Fragment}>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                        <div className="flex items-start">
                            <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mt-1 mr-2" />
                            <div>
                                <Dialog.Title className="text-lg font-semibold text-red-700">Error</Dialog.Title>
                                <Dialog.Description className="text-gray-700 mt-1">
                                    {errorMessage || error}
                                </Dialog.Description>
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => setShowErrorModal(false)}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Close
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>


        </AuthenticatedLayout >
    )


}