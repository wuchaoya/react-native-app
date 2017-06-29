/**
 * 游戏精选
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import TextConst from '../const/TextConst'

let width = Dimensions.get('window').width;
let widthPixels = width

export default class ScrollGameHighlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height:0
        }
    }
    render() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  showsHorizontalScrollIndicato={false}>
                {this.props.data.map(
                    (obj,i)=>{
                        return(
                            <TouchableOpacity key={i}
                                activeOpacity={0.9}
                                onPress={() =>this.props.navigation.navigate('GameDetails')}
                                style={styles.container}>
                                <Image style={styles.radiuImg} source={{uri:obj.icon}} />
                                <Text numberOfLines={2} style={styles.name}>{obj.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                )}
            </ScrollView>
        );
    }
    componentDidMount(){
        Image.getSize(this.props.data[0].icon, (width, height) => {
            this.setState(
                {height:height/(width/widthPixels)}
            )
        });
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:12,
        marginBottom:18,
    },
    radiuImg:{
        width:86,
        height:86,
        borderRadius:18,
        marginBottom:9
    },
    name:{
        width:86,
        fontSize:13,
        color:'#333',
        lineHeight:20
    }
});

