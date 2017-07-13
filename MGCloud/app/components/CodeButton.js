import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

export default class CodeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                activeOpacity={0.5}
                style={[styles.code,{backgroundColor:this.props.disabled?'#ccc':'#83b233'}]}>
                <Text style={{color:this.props.disabled?'#aaa':'#fff'}}>{this.props.codeText}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    code:{
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:40,
        backgroundColor:'#83b233',
        borderRadius:6,
        position:'absolute',
        right:0,
        alignSelf:'center'
    }
});

