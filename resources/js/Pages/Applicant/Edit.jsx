import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { APPLICANT_STATUS_CLASS_MAP, APPLICANT_STATUS_TEXT_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ auth, applicants, programs }) {

    const curr_user = auth.user.id;

    const { data, setData, put, errors, reset } = useForm({

        status: applicants.status || '',
        created_at: applicants.created_at || '',
        updated_at: applicants.updated_at || '',
        validate_by: applicants.validate_by || curr_user,
        validator_name: auth.user.name || '',
        created_at: applicants.created_at || '',
        updated_at: applicants.updated_at || '',

        applicant_id: applicants.id || '',

        f_name: applicants.f_name || '',
        m_name: applicants.m_name || '',
        sr_name: applicants.sr_name || '',
        prog: applicants.prog || '',
        reason: applicants.reason || '',

        bs_degree: applicants.bs_degree || '',
        yr_grad: applicants.yr_grad || '',
        l_schl_att: applicants.l_schl_att || '',
        tor: applicants?.tor || '',

        curr_emp: applicants.curr_emp.toLowerCase() || '',
        curr_occ: applicants.curr_occ || '',
        l_serv: applicants.l_serv || '',
        gov_id: applicants?.gov_id || '',
        voter_id: applicants?.voter_id || '',
        conn_com_ins: applicants.conn_com_ins || '',

        sex: applicants.sex.toLowerCase() || '',
        bday: applicants.bday || '',
        bplace: applicants.bplace || '',
        cont: applicants.cont || '',
        email: applicants.email || '',
        tag_res: applicants.tag_res.toLowerCase() || '',
        curr_add: applicants.curr_add || '',
        fb_acc: applicants.fb_acc || '',
        fb_acc_link: applicants.fb_acc_link || '',
        remarks: applicants.remarks || '',

    });

    if ((auth.user.role == 3 || auth.user.role == 1) && (data.status == 1 || data.status == 2)) {
        data.status = 2;
        data.validate_by = curr_user;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        //console.log("Form Data before submit:", data.applicant_id);

        // Log the data before submitting
        //console.log("Form Data before submit:", data);


        put(route('applicant.update', data.applicant_id));
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex">
                    <a
                        onClick={() => window.history.back()}
                        className="text-xl cursor-pointer font-semibold leading-tight text-gray-800 dark:text-gray-200 cursor-pointer hover:underline transition-colors duration-200">
                        &laquo; back
                    </a>&nbsp;&nbsp;&nbsp;&nbsp;
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Validation / Update Information of {`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`}
                    </h2>
                </div>
            }
        >
            <Head title={`Applicant "${`${data.f_name} ${data.m_name} ${data.sr_name}`.toUpperCase()}"`} />

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
                                <label className="font-bold text-lg ml-2">ID: </label> {applicants.id}

                            </div>

                            <div className="mt-1 flex-1 text-right ">
                                <p className="text-[11px]">
                                    <label className="font-bold ml-2 ">CREATE : </label>
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
                                <p className="text-[11px]">
                                    <label className="font-bold ">UPDATING BY : </label> {data.validator_name.toUpperCase()}
                                    <span
                                        className={
                                            "px-1 py-1 ml-3 rounded text-white text-[10px]" +
                                            USER_STATUS_CLASS_MAP[auth.user.role]
                                        }
                                    >
                                        {USER_STATUS_TEXT_MAP[auth.user.role]}
                                    </span>
                                </p>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* EDITABLE APPLICANT INFO */}
            <div className="py-2">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <TextInput type="hidden" value={data.validated_by} name="validated_by" />
                            <InputError message={errors.validated_by} className="text-red-500 mt-2" />
                            <TextInput type="hidden" value={data.status} name="status" />
                            <InputError message={errors.status} className="text-red-500 mt-2" />
                            <div className="flex flex-nowrap" key={applicants.id} >
                                {/* name of applicant */}
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_f_name"
                                        value="firstname"
                                    />

                                    <TextInput
                                        id="app_f_name"
                                        className="mt-2 block w-full"
                                        name="f_name"
                                        value={data.f_name}
                                        onChange={(e) => setData("f_name", e.target.value)}
                                    />
                                    <InputError message={errors.f_name} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_m_name"
                                        value="middlename"
                                    />
                                    <TextInput
                                        id="app_m_name"
                                        className="mt-2 block w-full"
                                        name="m_name"
                                        value={data.m_name}
                                        onChange={(e) => setData("m_name", e.target.value)}
                                    />
                                    <InputError message={errors.m_name} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_sr_name"
                                        value="Surname"
                                    />
                                    <TextInput
                                        id="app_sr_name"
                                        className="mt-2 block w-full"
                                        name="sr_name"
                                        value={data.sr_name}
                                        onChange={(e) => setData("sr_name", e.target.value)}
                                    />
                                    <InputError message={errors.sr_name} className="text-red-500 mt-2" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="app_prog"
                                    value="Program"
                                />
                                <SelectInput
                                    id="app_prog"
                                    className="mt-2 block w-full"
                                    name="prog"
                                    value={data.prog}
                                    onChange={e => {
                                        console.log("Selected Value:", e.target.value);
                                        setData('prog', e.target.value);
                                    }}>
                                    {programs.map(program => (
                                        <option key={program.id} value={program.id}>{program.acronym + " - " + program.name}</option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.prog} className="text-red-500 mt-2" />

                            </div>

                            <div className="mt-4">
                                <InputLabel
                                    htmlFor="app_reason"
                                    value="Why do you want to take this program?"
                                />
                                <TextAreaInput
                                    name="reason"
                                    value={data.reason}
                                    className="mt-4 block w-full h-[200px]"
                                    onChange={(e) => setData("reason", e.target.value)}
                                    readOnly
                                />
                                <InputError message={errors.reason} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-4 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="app_bs_degree"
                                        value="Bachelor's Degree"
                                    />
                                    <TextInput
                                        id="app_bs_degree"
                                        className="mt-2 block w-full"
                                        name="bs_degree"
                                        value={data.bs_degree}
                                        onChange={(e) => setData("bs_degree", e.target.value)}
                                    />
                                    <InputError message={errors.bs_degree} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_yr_grad"
                                        value="Year Graduate"
                                    />
                                    <TextInput
                                        id="app_yr_grad"
                                        className="mt-2 block w-full"
                                        name="yr_grad"
                                        value={data.yr_grad}
                                        onChange={(e) => setData("yr_grad", e.target.value)}
                                    />
                                    <InputError message={errors.yr_grad} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="app_l_schl_att"
                                        value="Last school attend"
                                    />
                                    <TextInput
                                        id="app_l_schl_att"
                                        className="mt-2 block w-full"
                                        name="l_schl_att"
                                        value={data.l_schl_att}
                                        onChange={(e) => setData("l_schl_att", e.target.value)}
                                    />
                                    <InputError message={errors.l_schl_att} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_tor"
                                        value="Transcript of Record"
                                    />
                                    <TextInput
                                        id="app_tor"
                                        className="mt-2 block w-full"
                                        name="tor"
                                        value={data.tor}
                                        onChange={(e) => setData("tor", e.target.value)}
                                    />
                                    <Link
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(data.tor, "_blank");
                                        }}
                                    >
                                        view here
                                    </Link>
                                    <InputError message={errors.tor} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4  flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="app_curr_emp"
                                        value="Employed"
                                    />
                                    <SelectInput
                                        id="app_curr_emp"
                                        className="mt-2 block w-full"
                                        name="curr_emp"
                                        value={data.curr_emp}
                                        onChange={e => setData('curr_emp', e.target.value.toLowerCase())}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </SelectInput>
                                    <InputError message={errors.curr_emp} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_curr_occ"
                                        value="Occupation "
                                    />
                                    <TextInput
                                        id="app_curr_occ"
                                        className="mt-2 block w-full"
                                        name="curr_occ"
                                        value={data.curr_occ}
                                        onChange={(e) => setData("curr_occ", e.target.value)}
                                    />
                                    <InputError message={errors.curr_occ} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_l_serv"
                                        value="Length of Service"
                                    />
                                    <TextInput
                                        id="app_l_serv"
                                        className="mt-2 block w-full"
                                        name="l_serv"
                                        value={data.l_serv}
                                        onChange={(e) => setData("l_serv", e.target.value)}
                                    />
                                    <InputError message={errors.l_serv} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4 flex flex-nowrap">

                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_gov_id"
                                        value="Gov. issued ID "
                                    />
                                    <TextInput
                                        id="app_gov_id"
                                        className="mt-2 block w-full"
                                        name="gov_id"
                                        value={data.gov_id}
                                        onChange={(e) => setData("gov_id", e.target.value)}
                                    />
                                    <Link
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(data.gov_id, "_blank");
                                        }}
                                    >
                                        view here
                                    </Link>
                                    <InputError message={errors.gov_id} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel
                                        htmlFor="app_voter_id"
                                        value="Voters ID "
                                    />
                                    <TextInput
                                        id="app_voter_id"
                                        className="mt-2 block w-full"
                                        name="voter_id"
                                        value={data.voter_id}
                                        onChange={(e) => setData("voter_id", e.target.value)}
                                    />
                                    <Link
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(data.voter_id, "_blank");
                                        }}
                                    >
                                        view here
                                    </Link>
                                    <InputError message={errors.voter_id} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-2">
                                <InputLabel
                                    htmlFor="app_conn_com_ins"
                                    value="Company/Institution Currently Connected "
                                />
                                <TextInput
                                    id="app_conn_com_ins"
                                    className="mt-2 block w-full"
                                    name="conn_com_ins"
                                    value={data.conn_com_ins}
                                    onChange={(e) => setData("conn_com_ins", e.target.value)}
                                />
                                <InputError message={errors.conn_com_ins} className="text-red-500 mt-2" />
                            </div>

                            <div className="mt-20 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel
                                        htmlFor="app_sex"
                                        value="Gender"
                                    />
                                    <SelectInput
                                        id="app_sex"
                                        className="mt-2 block w-full"
                                        name="sex"
                                        value={data.sex}
                                        onChange={e => {
                                            //console.log("Selected Value:", e.target.value);
                                            setData('sex', e.target.value.toLowerCase())
                                        }
                                        }>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </SelectInput>
                                    <InputError message={errors.sex} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-1">
                                    <InputLabel htmlFor="app_bday" value="Birth Day" />
                                    <TextInput
                                        id="app_bday"
                                        className="mt-2 block w-full"
                                        name="bday"
                                        type="date"
                                        value={data.bday}
                                        onChange={(e) => setData('bday', e.target.value)}
                                    />
                                    <InputError message={errors.bday} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-1">
                                    <InputLabel htmlFor="app_bplace" value="Birth Place" />
                                    <TextInput
                                        id="app_bplace"
                                        name="bplace"
                                        value={data.bplace}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setData('bplace', e.target.value)}
                                    />
                                    <InputError message={errors.bplace} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel htmlFor="app_cont" value="Contact" />
                                    <TextInput
                                        id="app_cont"
                                        name="cont"
                                        value={data.cont}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setData('cont', e.target.value)}
                                    />
                                    <InputError message={errors.cont} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel htmlFor="app_email" value="Email" />
                                    <TextInput
                                        type="email"
                                        id="app_email"
                                        name="email"
                                        value={data.email}
                                        className="mt-2 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} className="text-red-500 mt-2" />
                                </div>
                            </div>

                            <div className="mt-4 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel htmlFor="app_tag_res" value="Taguig Resident?" />
                                    <SelectInput
                                        id="app_tag_res"
                                        className="mt-2 block w-full"
                                        name="tag_res"
                                        value={data.tag_res}
                                        onChange={(e) => setData('tag_res', e.target.value.toLowerCase())}
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </SelectInput>
                                    <InputError message={errors.tag_res} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel htmlFor="app_curr_add" value="Current Address" />
                                    <TextInput
                                        id="app_curr_add"
                                        name="curr_add"
                                        className="mt-2 block w-full"
                                        value={data.curr_add}
                                        onChange={(e) => setData('curr_add', e.target.value)}
                                    />
                                    <InputError message={errors.curr_add} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4 flex flex-nowrap">
                                <div className="flex-1">
                                    <InputLabel htmlFor="app_fb_acc" value="Facebook Account" />
                                    <TextInput
                                        id="app_fb_acc"
                                        name="fb_acc"
                                        className="mt-2 block w-full"
                                        value={data.fb_acc}
                                        onChange={(e) => setData('fb_acc', e.target.value)}
                                    />
                                    <InputError message={errors.fb_acc} className="text-red-500 mt-2" />
                                </div>
                                <div className="flex-1 pl-2">
                                    <InputLabel htmlFor="app_fb_acc_link" value="Facebook Link" />
                                    <TextInput
                                        id="app_fb_acc"
                                        name="fb_acc_link"
                                        className="mt-2 block w-full"
                                        value={data.fb_acc_link}
                                        onChange={(e) => setData('fb_acc_link', e.target.value)}
                                    />
                                    <Link
                                        to="#"  // Prevents navigation within the app
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent React Router from handling the link
                                            window.open(data.fb_acc_link, "_blank");
                                        }}
                                    >
                                        view here
                                    </Link>
                                    <InputError message={errors.fb_acc_link} className="text-red-500 mt-2" />
                                </div>

                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="app_remarks" value="Remaks" />
                                <TextAreaInput
                                    id="app_remarks"
                                    className="mt-2 block w-full h-[180px]"
                                    name="remarks"
                                    value={data.remarks}
                                    onChange={e => setData('remarks', e.target.value)}
                                    placeholder="Enter other information / Remarks / Notes"
                                />
                                <InputError message={errors.remarks} className="text-red-500 mt-2" />

                            </div>
                            <div className="mt-4 text-right">

                                <button className="bg-blue-500 ml-2 py-1 px-3 text-white rounded shadow transition-all hover:bg-blue-600 ">UPDATE</button>
                                <Link
                                    href={route("applicant.index")}
                                    className="bg-gray-500 ml-2 py-2 px-3 text-white rounded shadow transition-all hover:bg-gray-800 mr-2"
                                >
                                    Cancel
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}