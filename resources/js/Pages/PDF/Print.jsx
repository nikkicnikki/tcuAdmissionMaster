import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { styles } from './style'; 

export default function Print({ auth, applicant, examroom, examdate }) {

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

                <View style={styles.viewHead}>
                    <Text style={styles.head1}>Taguig City University</Text>
                    <Text style={styles.head2}>Gen. Santos Ave., Central Bicutan, Taguig City</Text>
                    <Text style={styles.head3}>TAGUIG CITY UNIVERSITY GRADUATE STUDIES ENTRANCE EXAM</Text>
                    <Text style={styles.head4}>AY 2025-2026</Text>
                    <Text style={styles.head5}>EXAMINATION PERMIT</Text>
                </View>
                <View style={styles.contentId}>
                    <Text style={styles.contField}> APPLICATION NO : </Text>
                    <Text style={styles.contValue}> {applicant.id} </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contField}>DATE OF EXAMINATION :</Text>
                    <Text style={styles.contValue}></Text>
                    <Text style={styles.contField}>ROOM NO. :</Text>
                    <Text style={styles.contValue}></Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contField2}> NAME : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.contValue}> {applicant.sr_name.toUpperCase() + ", " + applicant.f_name.toUpperCase() + " " + applicant.m_name.toUpperCase()} </Text>
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
                    <Text style={styles.remindBold}> Printed Test Permit, VALID ID, BLACK</Text>
                </View>
                <View style={styles.dvEnd}>
                    <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;Ballpen </Text>
                    <Text style={styles.remind}> (2 pcs), and Bottled drinking water.</Text>
                </View>
                
                




                <View style={styles.viewHead}>
                    <Text style={styles.head1}>Taguig City University</Text>
                    <Text style={styles.head2}>Gen. Santos Ave., Central Bicutan, Taguig City</Text>
                    <Text style={styles.head3}>TAGUIG CITY UNIVERSITY GRADUATE STUDIES ENTRANCE EXAM</Text>
                    <Text style={styles.head4}>AY 2025-2026</Text>
                    <Text style={styles.head5}>EXAMINATION PERMIT</Text>
                </View>
                <View style={styles.contentId}>
                    <Text style={styles.contField}> APPLICATION NO : </Text>
                    <Text style={styles.contValue}> {applicant.id} </Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contField}>DATE OF EXAMINATION :</Text>
                    <Text style={styles.contValue}></Text>
                    <Text style={styles.contField}>ROOM NO. :</Text>
                    <Text style={styles.contValue}></Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contField2}> NAME : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                    <Text style={styles.contValue}> {applicant.sr_name.toUpperCase() + ", " + applicant.f_name.toUpperCase() + " " + applicant.m_name.toUpperCase()} </Text>
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
                    <Text style={styles.remindBold}> Printed Test Permit, VALID ID, BLACK</Text>
                </View>
                <View style={styles.dv}>
                    <Text style={styles.remindBold}>&nbsp;&nbsp;&nbsp;&nbsp;Ballpen </Text>
                    <Text style={styles.remind}> (2 pcs), and Bottled drinking water.</Text>
                </View>
                
                



            </Page>
        </Document>
    );

    const memoizedPDF = useMemo(() => <PermitPrintPDF />, []);

    return (

        <div className="flex items-center justify-center">
            <div className="w-full h-[780px]">
                <PDFViewer width={"100%"} height={"100%"}>
                    {memoizedPDF}
                </PDFViewer>
            </div>
        </div>

    )

}