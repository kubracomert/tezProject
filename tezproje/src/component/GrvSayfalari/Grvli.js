import React,{Component} from 'react';
import {View,Text,Image,Dimensions,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient'; 
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
const {width,height}= Dimensions.get('window');

class Grvli extends Component {
 
    

    render() {
        const { navigation } = this.props;
        const {navigate}=this.props.navigation;
        let degisken=navigation.getParam('degisken');
        return (
            <View style={{flex:1}}>
                <LinearGradient 
                style={{flex: 1, 
                }}
                colors={['#D9CAC1', '#A3B0D9']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <View style={{flexDirection:'row',alignItems:'baseline',justifyContent:'flex-end'}}>    
                      
                      <TouchableOpacity style={{ flexDirection:'column',alignItems:'flex-end',marginTop:15 ,paddingRight:15}} onPress={()=>Actions.solMenu({mail:degisken})}>
                        <Image source={require('../../img/drawable-ldpi/user.png')}/>
                      </TouchableOpacity>  
                      
                </View>
                <View style={{alignItems:'center',marginTop:50,justifyContent:'center'}}>
                        <Button borderWidth={0.7}  borderColor='black' color='black' text="Staj Yapanlar" onPress={()=>Actions.ogrStajBasvuru()}></Button>
                        <Button  borderWidth={0.7}  borderColor='black'  color='black' text={strings.ogrListe} onPress={()=>Actions.ogrListe()}></Button>
                        <Button  borderWidth={0.7}  borderColor='black' text={strings.frmaListe} onPress={()=>Actions.frmaListe()}></Button>     
                        <Button  borderWidth={0.7}  borderColor='black' text={strings.frmaRed} onPress={()=>Actions.frmaRedListe()}></Button>
                        <Button  borderWidth={0.7}  borderColor='black' text={strings.frmaOnay} onPress={()=>Actions.frmaOnayListe()}></Button> 
                </View>
          
                </LinearGradient>
          </View> 
      
        );
    }
}
const styles={
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth:0.6,
    borderRadius:32,
    width:width*0.74,
    height:height*0.08,
    backgroundColor:'white',
    marginTop:20,
    textAlign:'center'
  }
};
export default Grvli;



