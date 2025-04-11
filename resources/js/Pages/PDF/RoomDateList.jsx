import React, { useMemo } from 'react';
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { Head, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Print({ auth }) {

    const { exam_date_id, exam_room_id, exam_date, exam_room, roomDateApplicants, } = usePage().props;
    console.log(roomDateApplicants)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formattedDate = formatDate(exam_date);

    const HeadTitle = () => (
        <View style={styles.viewHead}>
            <Text style={styles.head1}>Taguig City University</Text>
            <Text style={styles.head2}>Gen. Santos Ave., Central Bicutan, Taguig City</Text>
            <Text style={styles.head3}>TAGUIG CITY UNIVERSITY GRADUATE STUDIES ENTRANCE EXAM</Text>
            <Text style={styles.head4}>AY 2025-2026</Text>
            <Text style={styles.head5}>APPLICANTS LIST</Text>
        </View>
    );

    const ApplicantINFO = ({ applicant }) => (
        <View>


            <View style={styles.content}>
                <Text style={styles.contField}>DATE OF EXAMINATION :</Text>
                <Text style={styles.contValue2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contField}>ROOM NO. :</Text>
                <Text style={styles.contValue2}>{exam_room}</Text>
            </View>

            <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                    <Text style={styles.tableColHeader}>#</Text>
                    <Text style={styles.tableColHeader1}>ID</Text>
                    <Text style={styles.tableColHeader2}>NAME</Text>
                </View>

            {applicant.map((app ,index) => (
                <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCol}> {index+1} </Text>
                    <Text style={styles.tableCol1}> {app.id} </Text>
                    <Text style={styles.tableCol2}> {app.NAME} </Text>
                </View>
            ))}

            </View>

        </View>
    );


    const PermitPrintPDF = () => (
        <Document>
            <Page size="legal" style={styles.page}>

                <Image
                    style={styles.watermarkImageSchedList}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />

                <Image
                    style={styles.icon1}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />

                <HeadTitle />
                {roomDateApplicants ? <ApplicantINFO applicant={roomDateApplicants} /> : <View><Text>NO DATA INPUT</Text></View>}


            </Page>
        </Document>
    );

    if (!exam_date_id || !exam_room_id || !exam_date || !exam_room || !roomDateApplicants) {
        return <p>Loading...</p>;
    }

    const memoizedPDF = useMemo(() => <PermitPrintPDF />, [exam_date_id, exam_room_id, exam_date, exam_room, roomDateApplicants]);

    return (

        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between ">
                    <a
                        onClick={() => window.history.back()}
                        className="text-xl cursor-pointer font-semibold leading-tight text-gray-800 dark:text-gray-200 hover:underline">
                        &laquo; back
                    </a>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        PDF PRINT
                    </h2>
                </div>
            }
        >
            <Head title={"SCHED LIST PRINT"} />

            <div className="flex items-center justify-center">
                <div className="w-full h-[780px]">
                    <PDFViewer width={"100%"} height={"100%"}>
                        {memoizedPDF}
                    </PDFViewer>
                </div>
            </div>
        </AuthenticatedLayout>

    )

}