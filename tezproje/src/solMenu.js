import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'; 
import {Actions} from 'react-native-router-flux';
import parolaGuncelleme from './component/parolaGuncelleme';
const {width,height}= Dimensions.get('window');



class  solMenu extends Component {
  render(){
  const { navigation } = this.props;
  const {navigate}=this.props.navigation;
  let sayfa=navigation.getParam('sayfa'); 
  let mail=navigation.getParam('mail');
  console.log(mail)
// const solMenu = props => {
//   const {
//     loading,
//     ...attributes
//   } = props; }
  
  return (
    <Modal
      transparent={true} 
      animationType={'none'}
      // visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}> 
            <TouchableOpacity onPress={()=>Actions.pop() }>
                <Image source={require('../src/img/drawable-ldpi/close.png')}></Image>
            </TouchableOpacity>
        <View style={styles.activityIndicatorWrapper}> 

      {sayfa=='firma' ?
      <View>
            <TouchableOpacity
                style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                onPress={()=>Actions.frmaBilgiGuncelleme({mail:mail},Actions.pop())}>
                <Image source={require("../src/img/drawable-ldpi/user.png")}></Image>
                <Text>Hesabımı Güncelle</Text>
            </TouchableOpacity>
        </View>
      :
      console.log("devam et")}

        <View> 
            <TouchableOpacity
                style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                onPress={()=>Actions.parolaGuncelleme({mail:mail},Actions.pop())}>
                <Image source={require('../src/img/drawable-mdpi/key.png')}></Image>
                <Text>Parolamı Değiştir</Text>
            </TouchableOpacity>
        </View>

        <View>
            <TouchableOpacity 
                style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                onPress={()=>Actions.jump('Anasayfa')}>
                <Image source={require('../src/img/drawable-ldpi/logout.png')}></Image>
                <Text>Çıkış Yap</Text>
            </TouchableOpacity>
        </View>


        </View>
      </View>
    </Modal>
  )

}
}
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000099'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#d3d3d3',
    height: height/2+100,
    width: width/2+100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default solMenu;