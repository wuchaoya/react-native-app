import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';

let numer =0
let time
export default class LoadingAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconList:[
                require('../static/img/loading/loading01.png'),
                require('../static/img/loading/loading02.png'),
                require('../static/img/loading/loading03.png'),
                require('../static/img/loading/loading04.png'),
                require('../static/img/loading/loading05.png'),
                require('../static/img/loading/loading06.png'),
                require('../static/img/loading/loading07.png'),
                require('../static/img/loading/loading08.png'),
                require('../static/img/loading/loading09.png'),
                require('../static/img/loading/loading10.png'),
                require('../static/img/loading/loading11.png'),
                require('../static/img/loading/loading12.png'),
            ],
            number:0,
        }
    }
    onRefresh() {
      time  = setInterval(() => {
            numer===11?numer=0:numer++
            this.setState({
                number:numer

            },()=>{
            });

        }, 100);

    }
    componentWillMount() {
        this.onRefresh(false)
    }
    componentWillUnmount(){
        clearInterval(time)
    }
    render() {

        return (
            <View style={[styles.container,this.props.style]}>
                {this.state.iconList.map((img,i)=>{
                    return(
                        <Image key={i}
                               style={
                                   {width:27,height:29,
                                       position: 'absolute',
                                       left:this.state.number==i?0:-999,
                                   }}
                               source={img}/>
                    )
                })  }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        width:27,
        height:27,
        overflow:'hidden',

    }
});


