import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    DeviceEventEmitter
} from 'react-native';


export default class LoadingAnimation extends Component {

    constructor(props) {
        super(props);
        this.number= 0
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
    if(this.time){
        clearInterval(this.time)
    }
     this.time  = setInterval(() => {
          this.number===11?this.number=0:this.number++
            this.setState({
                number:this.number

            },()=>{
            });

        }, 200);

    }
    componentWillMount() {
        this.onRefresh(false)
    }
    componentWillUnmount(){
        console.log('清除定时')
        clearInterval(this.time)
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


