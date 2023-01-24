import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, Alert, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { StackNavigator } from 'react-navigation';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';

const { width, height } = Dimensions.get('window');

class FirmaGiris extends Component {

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken = navigation.getParam('degisken');
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-end' }}>

            <TouchableOpacity st yle={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15, paddingRight: 15 }} onPress={() => Actions.solMenu({ sayfa: 'firma', mail: degisken })}>
              <Image source={require('../../img/drawable-ldpi/user.png')} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ flexDirection:'column',alignItems:'flex-end' }} onPress={()=>Actions.jump('Anasayfa')}>
                    <Image source={require('../../img/drawable-ldpi/logout.png')}/>
                  </TouchableOpacity>  */}
          </View>
          <View style={{ alignItems: 'center', marginTop: 50, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>FİRMA GİRİŞ SAYFASI</Text>

            <Button text={'Başvuran Öğrenciler'} onPress={() => Actions.FirmaBasvuranlar({ degisken1: degisken })} style={style.section}></Button>
            <Button text={'Staj Yapan Öğrenciler'} onPress={() => Actions.StajYapanlar({ degisken1: degisken })} style={style.section}></Button>
            <Button text={'Reddedilen Öğrenciler'} onPress={() => Actions.FirmaReddedilenler({ degisken1: degisken })}></Button>
            <Button text={'Onaylanan öğrenciler'} onPress={() => Actions.FirmaOnaylananlar({ degisken1: degisken })}></Button>
          </View>

        </LinearGradient>
      </View>
    );
  }
}
export default FirmaGiris;

const style = StyleSheet.create({
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    color: '#4f4f4f'
  }
});