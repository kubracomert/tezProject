import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import getIp from '../../commons/getIp';
import { Actions } from 'react-native-router-flux';
const { width, height } = Dimensions.get('window');

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      durum: ''
    }
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken = navigation.getParam('degisken');
    console.log(degisken, "ol be gayrı")

    try {
      //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
      const response = await fetch(getIp() + '/react-native-insert/defterKontrol.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ogrenciemail: this.props.navigation.getParam('degisken'),
        })
      });
      const responseJson = await response.json();
      if (responseJson == 'Kabul') {
        console.log(responseJson);
        this.setState({
          durum: true,
        });
      }
      else if (responseJson == 'Red') {
        console.log(responseJson);
        this.setState({
          durum: false,
        });
      } 
    }
    catch (error) {
      console.log(error.name + '::::!!!:' + error.message)

    }
  }



  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken = navigation.getParam('degisken');
    console.log(this.props.navigation.getParam('degisken'))
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={['#bedbbb', '#789e7f']}
          start={{ x: 0, y: 1}}
          end={{ x: 1, y: 0}}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'flex-end' }}>

            <TouchableOpacity style={{ flexDirection: 'column', alignItems: 'flex-end', marginTop: 15, paddingRight: 15 }} onPress={() => Actions.solMenu({ mail: degisken })}>
              <Image source={require('../../img/drawable-ldpi/user.png')} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={{ flexDirection:'column',alignItems:'flex-end' }} onPress={()=>Actions.jump('Anasayfa')}>
                        <Image source={require('../../img/drawable-ldpi/logout.png')}/>
                      </TouchableOpacity>  */}
          </View>
          <View style={{ alignItems: 'center', marginTop: 50, justifyContent: 'center' }}>
             {this.state.durum ?

              <Button text={strings.defter} onPress={() => Actions.Defter({ degisken1: degisken })} />

              :
              <TouchableOpacity onPress={() => Alert.alert("Geçerli bir staj durumu yok!")}>
                <Text style={styles.section}>STAJ DEFTERİ</Text>
              </TouchableOpacity>
            }

            <Button text={strings.basvuruislem} onPress={() => Actions.okulBasvuru({ degisken1: degisken })} > </Button>
            <Button text="Firmalar" onPress={() => Actions.ogrFrmaListe({ degisken2: degisken })} > </Button>
            <Button text="Başvurulan firmalar" onPress={() => Actions.OgrenciBasvurulanFirmalar({ degiskena: degisken })}></Button>
          </View>

        </LinearGradient>
      </View>
    );
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.08,
    backgroundColor: 'white',
    marginTop: 20,
    textAlign: 'center'
  },
  section: {
    fontSize:20,
    paddingTop:10,
    textAlign:'center',
    borderWidth: 0.6,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.08,
    marginTop: 15
  }
};
export default Menu;