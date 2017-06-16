/**
 * 用法:<Star starNumber = {number}></Star>
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Star extends Component {
    constructor(props) {
        super(props);
        this.state ={
            starNumber:8
        }
    }
    getStar(number){
        let star = ''
        for (let i =0;i<number;i++){
            star+='★'
        }
        return star
    }
    
    _renderStar(number){
        let
            yellowStarNumber=parseInt(number/2),
            grayStarNumber = 5-yellowStarNumber
           return(
            <Text>
                <Text style={[styles.yellowStar,this.props.style]}>{this.getStar(yellowStarNumber)}</Text>
                <Text style={[styles.grayStar,this.props.style]}>{this.getStar(grayStarNumber)}</Text>
            </Text>
           )
    }
    render() {
        return (
            <View>
                {this._renderStar(this.props.starNumber)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    yellowStar:{
        color:'#ff8800'
    },
    grayStar:{
        color:'gray'
    }

});

