import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, Dimensions, Image, TextInput, Keyboard, FlatList, Alert } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import getIp from '../../commons/getIp';
import Loader from '../../commons/Loader';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');

class frmaBilgiDoldurma extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
      TextInputAdres: '',
      TextInputfaaliyetAlani: '',
      tur: 3,
      loading: false,
    }
  };

  async getCoordinates(query) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
        TextInputName: '',
        TextInputEmail: '',
        TextInputPhoneNumber: '',
        TextInputAdres: '',
        TextInputfaaliyetAlani: '',
      });
    }, 2500);
  }

  InsertDataToServer = () => {

    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputfaaliyetAlani } = this.state;
    const { TextInputAdres } = this.state;

    if (TextInputName == "" || TextInputEmail == "" || TextInputPhoneNumber == "" || TextInputfaaliyetAlani == "" || TextInputAdres == "") {
      Alert.alert("Lütfen Gerekli Alanları Doldurunuz!")
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 125);
    }
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı
      fetch(getIp() + '/react-native-insert/only_firma_user.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: TextInputName,
          email: TextInputEmail,
          phone_number: TextInputPhoneNumber,
          tur: 3,
          basvuruDurumu: 3,
          faaliyetAlani: TextInputfaaliyetAlani,
          adres: TextInputAdres
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Bilgileri kaydettikten sonra bilgi mesajını gösterme
          this.setState({
            dataSource: responseJson
          });
          //yeni kaydedilen firmanın idsini okulBasvuruya gönderme
          Actions.jump('okulBasvuru', { firmaId: this.state.dataSource })
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken2 = navigation.getParam('degisken2');
    console.log(this.props.navigation.getParam('degisken2'))
    return (
      <LinearGradient
        colors={['#bedbbb', '#789e7f']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >

        <View style={styles.section}>
          <TextInput placeholder={strings.KurumAdi} value={this.state.TextInputName} onChangeText={TextInputName => this.setState({ TextInputName })}></TextInput>
        </View>

        <View style={styles.section}>
          <TextInput placeholder={strings.eposta} value={this.state.TextInputEmail} onChangeText={TextInputEmail => this.setState({ TextInputEmail })}></TextInput>
        </View>


        <View style={styles.section}>
          <TextInput placeholder={strings.Telefon} value={this.state.TextInputPhoneNumber} keyboardType='name-phone-pad' onChangeText={TextInputPhoneNumber => this.setState({ TextInputPhoneNumber })}></TextInput>
        </View>

        <View style={styles.section}>
          <TextInput placeholder={strings.FaaliyetAlani} value={this.state.TextInputfaaliyetAlani} onChangeText={TextInputfaaliyetAlani => this.setState({ TextInputfaaliyetAlani })}></TextInput>
        </View>

        <View style={styles.section}>
          <TextInput placeholder={strings.adres} value={this.state.TextInputAdres} onChangeText={TextInputAdres => this.setState({ TextInputAdres })}></TextInput>
        </View>

        <Loader
          loading={this.state.loading} />
        <Button
          onPress={() => this.getCoordinates(this.InsertDataToServer())}
          containerViewStyle={{ width: '100%', marginBottom: 20 }}
          text={"Kaydet"}
          fontWeight="bold"
          buttonStyle={{ borderRadius: 2 }}
          backgroundColor='#333333'
          underlayColor="#cccccc" />

      </LinearGradient>

    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    width: width * 0.70,
    height: height * 0.06,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.08,
    backgroundColor: 'white',
    marginTop: 20,
    textAlign: 'center'
  }
};
export default frmaBilgiDoldurma;