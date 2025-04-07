import { StyleSheet } from "@react-pdf/renderer";

// Create styles
export const styles = StyleSheet.create({
    page: {
        position: 'relative',
        padding: 40,
        paddingTop: 30,
        backgroundColor: '#fff'
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
        top: '51.5%',
        left: '15%',
        width: 400,
        opacity: 0.1,
        transform: 'rotate(-00deg)',
    },
    viewHead: { textAlign: 'center', },
    head1: { fontFamily: 'Times-Roman', fontSize: 14, fontWeight: 'bold', marginBottom: 2, },
    head2: { fontSize: 10, marginBottom: 2, },
    head3: { fontSize: 9, fontWeight: 'bold', marginBottom: 2, },
    head4: { fontSize: 10, fontWeight: 'bold', marginBottom: 16, },
    head5: { fontSize: 13, fontWeight: 'bold', marginBottom: 20, },

    content: { flexDirection: 'row', marginBottom: 1, },
    contentId: { flexDirection: 'row', marginBottom: 15, },
    contField: { fontSize: 10, fontWeight: 'bold', },
    contField2: { fontSize: 10, },
    contValue: { fontSize: 9, borderBottom: '1px solid black', paddingLeft: 2, paddingRight: 2, },
    contValue2: { fontSize: 9, borderBottom: '1px solid black', paddingLeft: 2, paddingRight: 2, marginBottom: 5, },

    dv: { flexDirection: 'row', marginBottom: 2, },
    remindHead: { fontSize: 13, fontWeight: 'bold', margin: 14, },
    remindBold: { fontSize: 10, fontWeight: 'bold' },
    remind: { fontSize: 10, },
    dvEnd: { marginBottom: 45, borderBottomWidth: 2, borderBottomColor: 'orange', borderBottomStyle: 'dashed', paddingBottom: 15, },


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
});