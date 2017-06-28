/**
 * 清空
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';

export default class Empty extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <TouchableOpacity  style={[styles.clear,{right:this.props.value===''?-100:34,}]}>
                <Text style={{fontSize:10}}>╳</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    clear:{
        width:44,
        height:44,
        position: 'absolute',
        right:34,
        justifyContent:'center',
        alignItems:'center'
    }
});


