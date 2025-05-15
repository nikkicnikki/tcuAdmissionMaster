import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
    page: {
        position: 'relative',
        padding: 40,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    watermarkImageTop: {
        position: 'absolute',
        top: '5%',
        left: '15%',
        width: 400,
        opacity: 0.1,
        transform: 'rotate(-00deg)',
    },
    watermarkImageBot: {
        position: 'absolute',
        top: '50.1%',
        left: '15%',
        width: 400,
        opacity: 0.1,
        transform: 'rotate(-00deg)',
    },

    watermarkImageSchedList: {
        position: 'absolute',
        top: '15.5%',
        left: '15%',
        width: 450,
        opacity: 0.1,
        transform: 'rotate(-00deg)',
    },

    icon1: {
        position: 'absolute',
        top: '3%',
        left: '9%',
        width: 60,
        height: 60,
    },
    icon2: {
        position: 'absolute',
        top: '49.5%',
        left: '9%',
        width: 60,
        height: 60,
    },
    viewHead: { textAlign: 'center', },
    head1: { fontFamily: 'Times-Roman', fontSize: 14, fontWeight: 'bold', marginBottom: 2, },
    head2: { fontSize: 10, marginBottom: 2, },
    head3: { fontSize: 9, fontWeight: 'bold', marginBottom: 2, },
    head4: { fontSize: 10, fontWeight: 'bold', marginBottom: 16, },
    head5: { fontSize: 13, fontWeight: 'bold', marginBottom: 20, },

    

    content: { flexDirection: 'row', marginBottom: 1, marginLeft: 50,},
    contentId: { flexDirection: 'row', marginBottom: 15, },
    contField: { fontSize: 10, fontWeight: 'bold', },
    contField2: { fontSize: 10, },
    contValue: { fontSize: 9, borderBottom: '1px solid black', paddingLeft: 2, paddingRight: 2, },
    contValue2: { fontSize: 9, borderBottom: '1px solid black', paddingLeft: 2, paddingRight: 2, marginBottom: 5, },

    dv: { flexDirection: 'row', marginBottom: 2, },
    remindHead: { fontSize: 13, fontWeight: 'bold', margin: 14, },
    remindBold: { fontSize: 10, fontWeight: 'bold' },
    remind: { fontSize: 10, },
    dvEnd: { marginBottom: 31, borderBottomWidth: 2, borderBottomColor: 'orange', borderBottomStyle: 'dashed', paddingBottom: 25, },


    pic1: {
        width: 110,  // Set the width of the image
        height: 110, // Set the height of the image
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid',
        position: 'absolute', // Set position to absolute
        top: 30,
        right: 30,
        padding: 2,
    },

    pic2: {
        width: 110,  // Set the width of the image
        height: 110, // Set the height of the image
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'solid',
        position: 'absolute', // Set position to absolute
        top: 497,
        right: 30,
        padding: 2,
    },

    table: {
        display: "table",
        width: "auto",
        // borderStyle: "solid",
        // borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "10.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        backgroundColor: '#f0f0f0',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 10,
    },
    tableColHeader1: {
        width: "10.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        backgroundColor: '#f0f0f0',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 10,
    },
    tableColHeader2: {
        width: "65.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        backgroundColor: '#f0f0f0',
        padding: 5,
        fontWeight: 'bold',
        fontSize: 10,
    },
    tableCol: {
        width: "10.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        padding: 5,
        fontSize: 10,
    },
    tableCol1: {
        width: "10.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        padding: 5,
        fontSize: 10,
    },
    tableCol2: {
        width: "65.33%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1,
        padding: 5,
        fontSize: 10,
    },
    tableCell: {
        margin: "auto",
    },



    scoretable: {
        display: "table",
        width: "auto",
        // borderStyle: "solid",
        // borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
    scoretableRow: {
        flexDirection: "row",
    },
    scoretableColHeader: {
        width: "30px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },
    scoretableColHeaderID: {
        width: "30px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },
    scoretableColHeaderNAME: {
        width: "200px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },
    scoretableColHeaderPROGRAM: {
        width: "50px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 7,
    },
    scoretableColHeaderSCORE: {
        width: "50px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },
    scoretableColHeaderPASSING: {
        width: "50px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },
    scoretableColHeaderRESULT: {
        width: "50px",
        borderStyle: "solid",
        borderBottomWidth: 1,
        marginBottom: 5,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
        fontSize: 8,
    },




    scoretableCol: {
        width: "30px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColID: {
        width: "30px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColNAME: {
        width: "200px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColPROGRAM: {
        width: "50px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColSCORE: {
        width: "50px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColPASSING: {
        width: "50px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableColRESULT: {
        width: "50px",
        marginBottom: 2,
        fontSize: 8,
    },
    scoretableCell: {
        margin: "auto",
    },
});