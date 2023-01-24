import React,{Component} from 'react';
import {View,Text,StyleSheet,Dimensions,Image,TouchableOpacity}from'react-native'
import Button from '../../commons/Button';
import { strings } from '../../Dil/strings';

import LinearGradient from 'react-native-linear-gradient';

import {Actions} from 'react-native-router-flux'
import DataBase from '../../commons/DataBase';
//import {TouchableOpacity} from 'react-native-gesture-handler';

const{width,height}=Dimensions.get('window');

export default class FirmaOgrSyf extends Component {

 
    renderSection(text){
    return(
      <View style={style.section} >
        <View
         style={{flex:1,justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text style={{textAlign:'center'}}>{text}</Text>
      </View>
            {this.renderSection('Ogrenci Adi Soyadi')}
    </View> );
    }

render(){
  const {navigate}=this.props.navigation;
  const {navigation}=this.props;
  let greet=navigation.getParam('greet');
        return (
            <LinearGradient 
            style={{flex: 1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'blue'
            ,marginBottom:10}}
            colors={['purple', 'blue']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>

             <Text style={{color:'white'}}>{this.props.navigation.getParam('greet')}</Text> 
          
          <Button text={strings.degerlendirmeF} onPress={()=>Actions.Degerlendirme()}></Button>  
          
          <Button text={strings.devletTKF} onPress={()=>console.log('2')}></Button>      
          <Button text={strings.sigortaB} onPress={()=>console.log('3')}></Button> 
          <View style={{width:width*0.7,height:height*0.2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TouchableOpacity >
              <Image source={require('../../img/4.jpg')} style={style.tikc} Text={strings.Onayla}/>
          </TouchableOpacity>
         <TouchableOpacity>
              <Image source={require('../../img/5.jpg')} style={style.tikc} Text={strings.Reddet}/>
         </TouchableOpacity>
         </View>
          </LinearGradient>
        );}
    
}
const style=StyleSheet.create({
   
    tikc:{
        marginLeft:20,
        marginRight:20,
        width:width*0.2,
        height:height*0.13,
        alignItems:'center',
        
        borderRadius:30,
        marginTop:20,
        flexDirection:'row'
    },
    section:{
      
      marginTop:20,
      backgroundColor:'white',
      borderRadius:20,
      width:width*0.70,
      height:height*0.09,
      alignItems:'center',
      paddingLeft:10,
      paddingRight:10
    }
    }
   );
  