
import React, {Component} from 'react';
import {
    StatusBar
} from 'react-native';

export default class TransparentStatusBar extends Component {
    constructor(props) {
        super(props);

    }
    opacity(opacity){
        if(this.props.opacity){
            return 'rgba(0,0,0,'+this.props.opacity+")"
        }
        return "rgba(0,0,0,0)"
    }
    render() {
        return (
            <StatusBar
                backgroundColor={this.opacity(this.props.opacity)}
                translucent={true}
                barStyle="light-content"
                hidden={false}
            />
        );
    }
}

