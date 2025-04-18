import React, { useMemo } from 'react';
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { Head, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Print({ auth }) {

    const { exam_result, type } = usePage().props;
    // console.log(type)
    // console.log(exam_result)

    const HeadTitle = () => (
        <View style={styles.viewHead}>
            <Text style={styles.head1}>Taguig City University</Text>
            <Text style={styles.head2}>Gen. Santos Ave., Central Bicutan, Taguig City</Text>
            <Text style={styles.head3}>TAGUIG CITY UNIVERSITY GRADUATE STUDIES ENTRANCE EXAM</Text>
            <Text style={styles.head4}>AY 2025-2026</Text>
            {type === 'all' ?
                <Text style={styles.head5}>ALL EXAM RESULT FROM ADMISSION</Text>
                :
                <Text style={styles.head5}>EXAM RESULT FROM ADMISSION</Text>
            }
        </View>
    );

    const ApplicantINFO = ({ applicant }) => (
        <View>

            {type === 'all' ?
                <Text></Text>
                :
                <View style={styles.content}>
                    <Text style={styles.contField}>{type} - {applicant[0].program_name} </Text>
                    <Text style={styles.contField}> {"("+ applicant[0].passing +"%)" } </Text>
                </View>
            }

            {/* <Text style={styles.contValue2}>{""}</Text> */}


            <View style={styles.scoretable}>
                {/* Table Header */}
                <View style={styles.scoretableRow}>
                    <Text style={styles.scoretableColHeader}>#</Text>
                    <Text style={styles.scoretableColHeaderID}>ID</Text>
                    <Text style={styles.scoretableColHeaderNAME}>NAME</Text>
                    {type === 'all' ? <Text style={styles.scoretableColHeaderPROGRAM}>PROGRAM</Text> : null}
                    <Text style={styles.scoretableColHeaderSCORE}>SCORE</Text>
                    {type === 'all' ? <Text style={styles.scoretableColHeaderPASSING}>PASSING GRADE</Text> : null}
                    <Text style={styles.scoretableColHeaderRESULT}>RESULT</Text>
                </View>

                {applicant.map((app, index) => (
                    <View style={styles.scoretableRow} key={index}>
                        <Text style={styles.scoretableCol}> {index + 1} </Text>
                        <Text style={styles.scoretableColID}> {app.id} </Text>
                        <Text style={styles.scoretableColNAME}> {app.name} </Text>
                        {type === 'all' ? <Text style={styles.scoretableColPROGRAM}> {app.program_acronym} </Text> : null}
                        <Text style={styles.scoretableColSCORE}> {app.score} </Text>
                        {type === 'all' ? <Text style={styles.scoretableColPASSING}> {app.passing} </Text> : null}
                        <Text style={styles.scoretableColRESULT}> {app.result} </Text>
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
                {exam_result ? <ApplicantINFO applicant={exam_result} /> : <View><Text>NO DATA INPUT</Text></View>}


            </Page>
        </Document>
    );

    if (!exam_result) {
        return <p>Loading...</p>;
    }

    const memoizedPDF = useMemo(() => <PermitPrintPDF />, [exam_result]);

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
            <Head title={"EXAM RESULT"} />

            <div className="flex items-center justify-center">
                <div className="w-full h-screen">
                    <PDFViewer width={"100%"} height={"100%"}>
                        {memoizedPDF}
                    </PDFViewer>
                </div>
            </div>
        </AuthenticatedLayout>

    )

}