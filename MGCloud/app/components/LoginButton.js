import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    View,
} from 'react-native';

let Dimensions = require('Dimensions');
let width = Dimensions.get('window').width;
export default class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <TouchableHighlight style={[styles.button,{backgroundColor:this.props.backgroundColor},this.props.style]}>

                    <Text style={{color:this.props.color,fontSize:14}}>{this.props.text}</Text>

            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button:{
        height:40,
        width:width-80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        borderRadius:20
    }

});


