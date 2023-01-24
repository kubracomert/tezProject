import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux';
import Loader from '../../commons/Loader';
import getIp from '../../commons/getIp';
const { width, height } = Dimensions.get('window');

class OgrenciFirmaBasvuru extends Component {

  constructor(props) {
    super(props);
    this.state = {
      basvuruButonu: false,
      loading: false,
    }
  }

  async getCoordinates(query) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 1000);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken7 = navigation.getParam('degisken7');
    let degiskeno = navigation.getParam('degiskeno');
    console.log(degisken7);
    console.log(degiskeno);
    //Noktalı yere kendi ip adresinizi yazın.192.168.43.168  172.16.0.158
    const response = fetch(getIp() + '/react-native-insert/basvuruButonu.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.navigation.getParam('degisken7'),
        ogrenciemail: this.props.navigation.getParam('degiskeno')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == '1') {
          this.setState({
            basvuruButonu: true,
          })
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  basvuruYap = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let degisken7 = navigation.getParam('degisken7');
    console.log(this.props.navigation.getParam('degisken7'))
    let degiskeno = navigation.getParam('degiskeno');
    console.log(this.props.navigation.getParam('degiskeno'))
    fetch(getIp() + '/react-native-insert/ogrenciFirmaBasvuru.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.props.navigation.getParam('degisken7'),
        ogrenciemail: this.props.navigation.getParam('degiskeno')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderSection(Baslik) {
    return (

      <View>
        <Text style={{ marginTop: 10 }}>{Baslik}</Text>

      </View>

    );
  }
  uyarıPenceresi() {
    Alert.alert(
      'Başvuru Yap',
      'Başvuru Yapmak İstediğinize Emin Misiniz',
      [
        {
          text: 'İptal Et',
          onPress: () => Alert.alert("İptal edildi!"),
          style: 'cancel'
        },
        { text: 'Başvuru Yap', onPress: () => { this.getCoordinates(this.basvuruYap()) } }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    // const{navigation}=this.props;    <Text>{navigation.getParam('name')}</Text>
    let degisken1 = navigation.getParam('degisken1');
    let degisken2 = navigation.getParam('degisken2');
    let degisken3 = navigation.getParam('degisken3');
    let degisken4 = navigation.getParam('degisken4');
    let degisken5 = navigation.getParam('degisken5');
    let degiskeno = navigation.getParam('degiskeno');

    return (

      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['#bedbbb', '#789e7f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>

        <Text style={{ textAlign: 'center' }}>{degisken1}</Text>
        {this.renderSection('Faaliyet Alani:')}
        <Text style={style.section}>{degisken2}</Text>
        {this.renderSection('Adres:')}
        <Text style={style.section}>{degisken3}</Text>
        {this.renderSection('Telefon:')}
        <Text style={style.section}>{degisken4}</Text>
        {this.renderSection('Eposta:')}
        <Text style={style.section}>{degisken5}</Text>

        <View style={{ width: width * 0.7, height: height * 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

          {this.state.basvuruButonu ?
            <Text style={style.section1}>Başvuru Yapıldı</Text>
            :
            <Button onPress={() => this.uyarıPenceresi()} style={style.section} text={'Başvuru Yap'}></Button>
          }
        </View>

        <Loader loading={this.state.loading} />

      </LinearGradient>
    );
  }
}



const style = StyleSheet.create({
  tikc: {
    marginLeft: 20,
    marginRight: 20,
    width: width * 0.2,
    height: height * 0.13,
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row'
  },
  section1: {
    color: 'gray',
    paddingTop: 10,
    backgroundColor: '#bebebe',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.09,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  section: {
    paddingTop: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.09,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10
  }
});
export default OgrenciFirmaBasvuru;