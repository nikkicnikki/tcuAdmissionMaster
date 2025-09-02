import React, { useMemo } from 'react';
import { Page, Text, View, Document, PDFViewer, Image } from '@react-pdf/renderer';
import { styles } from './style';
import { Head, usePage } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Print({ auth }) {

    const { applicant, exam_date_name, exam_time_name, exam_room_name, image_capture } = usePage().props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const ucwords = (str) => {
        return str
            .split(" ") // Split the string into an array by spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
            .join(" "); // Join the words back into a string
    };

    const formattedDate = formatDate(exam_date_name);

    const HeadTitle = () => (
        <View style={styles.viewHead}>
            <Text style={styles.head1}>Taguig City University</Text>
            <Text style={styles.head2}>Gen. Santos Ave., Central Bicutan, Taguig City</Text>
            <Text style={styles.head3}>TAGUIG CITY UNIVERSITY GRADUATE STUDIES ENTRANCE EXAM</Text>
            <Text style={styles.head4}>AY 2025-2026</Text>
            <Text style={styles.head5}>EXAMINATION PERMIT</Text>
        </View>
    );

    const ApplicantINFO = ({ applicant }) => (
        <View>
            
            <View style={styles.contentId}>
                <Text style={styles.contField}> APPLICATION NO : </Text>
                <Text style={styles.contValue2}> {applicant.id} </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField}>DATE OF EXAMINATION :</Text>
                <Text style={styles.contValue2}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formattedDate}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contField}>TIME :</Text>
                <Text style={styles.contValue2}>{exam_time_name}</Text>
                <Text style={styles.contField}>ROOM NO. :</Text>
                <Text style={styles.contValue2}>{exam_room_name}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField2}> NAME : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contValue}>
                    {ucwords(applicant.sr_name) + ", " + ucwords(applicant.f_name) + " " + ucwords(applicant.m_name)}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField2}> PROGRAM : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contValue}> {applicant.prog.acronym.toUpperCase() + " - " + applicant.prog.name.toUpperCase()} </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField2}> GENDER : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contValue}> {applicant.sex} </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField2}> CONTACT NO.: &nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contValue}> {applicant.cont} </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.contField2}> ADDRESS : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                <Text style={styles.contValue}> {applicant.curr_add} </Text>
            </View>

        </View>
    );

    const Reminders = () => (
        <>
            <View style={styles.viewHead}>
                <Text style={styles.remindHead}>IMPORTANT REMINDERS</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>1. &nbsp;Please print and bring this permit on the date of examination.</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>2. &nbsp;</Text>
                <Text style={styles.remindBold}>NO PERMIT, NO EXAMINATION</Text>
                <Text style={styles.remind}>. This policy is strictly implemented.</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>3. </Text>
                <Text style={styles.remindBold}> NO SHOW</Text>
                <Text style={styles.remind}> on scheduled date shall mean </Text>
                <Text style={styles.remindBold}>INVALIDATION</Text>
                <Text style={styles.remind}> of the admission application. </Text>
                <Text style={styles.remindBold}>RESCHEDULING OF </Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEST IS NOT ALLOWED.</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>4. </Text>
                <Text style={styles.remindBold}> WEAR PROPER ATTIRE:</Text>
                <Text style={styles.remind}> Wear a </Text>
                <Text style={styles.remindBold}>WHITE TOP</Text>
                <Text style={styles.remind}> &nbsp;(polo shirt with or without collar, blouse), decent pants or </Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;slacks, skirt on examination day. You are </Text>
                <Text style={styles.remindBold}>NOT ALLOWED</Text>
                <Text style={styles.remind}> to wear a sleeveless shirt/blouse/dress, shorts or pants</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>&nbsp;&nbsp;&nbsp;&nbsp; (skinny/reap jeans, leggings), and slippers.</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>5. Bringing gadgets, including smartphones and watches, calculators, and all other similar items are</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;NOT ALLOWED.</Text>
            </View>
            <View style={styles.dv}>
                <Text style={styles.remind}>6. Bring the following items and put it in transparent plastic envelope:</Text>
                <Text style={styles.remindBold}> Printed Test Permit, VALID ID, </Text>
            </View>

        </>
    );


    const PermitPrintPDF = () => (
        <Document>
            <Page size="legal" style={styles.page}>

                <Image
                    style={styles.watermarkImageTop}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />
                <Image
                    style={styles.watermarkImageBot}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />

                <Image
                    style={styles.icon1}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />
                <Image
                    style={styles.icon2}
                    src="/storage/source/TCU2024.png" // can also be base64 or local path
                />

                <Image
                    style={styles.pic1}
                    src={"/storage/" + image_capture}
                />
                <Image
                    style={styles.pic2}
                    src={"/storage/" + image_capture}
                />
                <HeadTitle />
                {applicant ? <ApplicantINFO applicant={applicant} /> : <View><Text>NO DATA INPUT</Text></View>}
                <Reminders />
                <View style={styles.dv}>
                    <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;BLACK Ballpen </Text>
                    <Text style={styles.remind}> (2 pcs), and Bottled drinking water.</Text>
                </View>
                <View style={styles.dvEnd}>
                </View>


                <HeadTitle />
                {applicant ? <ApplicantINFO applicant={applicant} /> : <View><Text>NO DATA INPUT</Text></View>}
                <Reminders />
                <View style={styles.dv}>
                    <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;BLACK Ballpen </Text>
                    <Text style={styles.remind}> (2 pcs), and Bottled drinking water.</Text>
                </View>


            </Page>
        </Document>
    );

    if (!applicant || !exam_date_name || !exam_room_name) {
        return <p>Loading...</p>;
    }

    const memoizedPDF = useMemo(() => <PermitPrintPDF />, [applicant, exam_date_name, exam_room_name]);

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
            <Head title={"PDF PRINT"} />

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