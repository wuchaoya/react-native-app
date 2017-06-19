import ColorStyle from './ColorStyle'

const CommonStyle ={
    center:{
        justifyContent:'center',
        alignItems: 'center',
    },
    container:{
        flex: 1,
        marginTop:12,
        paddingTop:12,
        paddingLeft:12,
        backgroundColor:ColorStyle.colorWhite
    },
    headerStyle:{
        height:60,
        backgroundColor:ColorStyle.colorGreen,
    },
    headerTitleStyle:{
        alignSelf:'center',
        color:ColorStyle.colorWhite,
        fontFamily:'Arial',
    }
}

module.exports = CommonStyle