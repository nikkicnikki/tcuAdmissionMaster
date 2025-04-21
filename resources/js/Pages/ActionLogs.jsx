import { ACTION_CLASS_MAP, USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from "@/constants";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, logs }) {
    console.log(logs);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Action Logs
                </h2>
            }
        >
            <Head title="Action logs" />

            <div className="pt-10">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 p-4 flex justify-between">

                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 border">Timestamp</th>
                                        <th className="p-2 border">User</th>
                                        <th className="p-2 border">Action</th>
                                        <th className="p-2 border">Target ID</th>
                                        <th className="p-2 border">Changed Fields</th>
                                        <th className="p-2 border">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.map((log) => {
                                        let meta = {};
                                        try {
                                            meta = JSON.parse(log.metadata);
                                        } catch (e) {
                                            console.error("Invalid metadata JSON:", log.metadata);
                                        }

                                        return (
                                            <tr key={log.id} className="text-sm">
                                                <td className="p-2 border">{new Date(log.created_at).toLocaleString()}</td>
                                                <td className="p-2 border">
                                                    {log.user?.name || 'System'}
                                                    <span className={"text-[9px] rounded p-1 ml-1"+USER_STATUS_CLASS_MAP[log.user.role]}>{USER_STATUS_TEXT_MAP[log.user.role]}</span>
                                                </td>
                                                <td className="p-2 border"> <span className={"p-1 rounded text-[11px]"+ACTION_CLASS_MAP[log.action]}>{log.action}</span></td>
                                                <td className="p-2 border">{log.target_id}</td>
                                                <td className="p-2 border">
                                                    {meta.changed_fields?.length ? (
                                                        <ul className="list-disc list-inside">
                                                            {meta.changed_fields.map((field, i) => (
                                                                <li key={i}>
                                                                    <strong>{field}</strong>:&nbsp;
                                                                    <span className="text-red-500 line-through">{meta.previous_values?.[field]}</span> ➜{' '}
                                                                    <span className="text-green-600">{meta.new_values?.[field]}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <em>—</em>
                                                    )}
                                                </td>
                                                <td className="p-2 border">{meta.description || '—'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>

            {/* <pre>{JSON.stringify(logs, null, 3)}</pre> */}

        </AuthenticatedLayout>
    );
}