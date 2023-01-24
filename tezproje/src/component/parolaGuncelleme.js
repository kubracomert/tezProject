import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, Dimensions, StyleSheet, Alert } from 'react-native';
import { strings } from '../Dil/strings';
import Button from '../commons/Button';
import { Actions } from 'react-native-router-flux';
import Loader from '../commons/Loader';
import getIp from '../commons/getIp';
const { width, height } = Dimensions.get('window');

class parolaGuncelleme extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputEski: '',
      TextInputYeni: '',
      TextInputYeni1: '',
      loading: false,
      email: '',

    }
  };
  submitAndClear = () => {
    setTimeout(() => {
      this.setState({
        TextInputEski: '',
        TextInputYeni: '',
        TextInputYeni1: '',
      });
    }, 2500);
  }
  async getCoordinates(query) {
    this.setState({
      loading: true
    });

    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 2500);
  }

  parolaGuncelle = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { TextInputEski } = this.state;
    const { TextInputYeni } = this.state;
    const { TextInputYeni1 } = this.state;
    console.log(this.props.navigation.getParam('mail'));
    // Aşağıdaki noktalı yerde IP adresiniz yer almalı192.168.43.168
    fetch(getIp() + '/react-native-insert/parolaGuncelle.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Populate User email from JSON $obj array and store into $email.
        email: this.props.navigation.getParam('mail'),
        eskipass: TextInputEski,
        yenipass: TextInputYeni,
        yenipass1: TextInputYeni1,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === 'Parolanız Güncellendi') {//Then open Profile activity and send user email to profile activity.
          //this.props.navigation.navigate('Second', { Email: UserEmail });

          Alert.alert(responseJson);
        }
        else {

          //Bilgileri kaydettikten sonra bilgi mesajını gösterme
          Alert.alert(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {

    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['#CACCEB', '#EAB6C1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>

        <TextInput
          style={style.input}
          secureTextEntry={true}
          placeholder={'Eski Parolanızı Giriniz'}
          value={this.state.TextInputEski}
          onChangeText={TextInputEski => this.setState({ TextInputEski })}
        />
        <TextInput
          style={style.input}
          secureTextEntry={true}
          placeholder={'Yeni Parolanızı Giriniz'}
          value={this.state.TextInputYeni}
          onChangeText={TextInputYeni => this.setState({ TextInputYeni })}
        />
        <TextInput
          style={style.input1}
          secureTextEntry={true}
          value={this.state.TextInputYeni1}
          placeholder={'Yeni Parolanızı Tekrar Giriniz'}
          onChangeText={TextInputYeni1 => this.setState({ TextInputYeni1 })}
        />
        <Loader loading={this.state.loading} />
        <Button text={'Güncelle'}
          onPress={() => { this.getCoordinates(this.parolaGuncelle(), this.submitAndClear()) }}
          style={style.section}></Button>


      </LinearGradient>
    );
  }
}
const style = StyleSheet.create({
  section: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.09,
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },
  input: {
    fontSize: 13,
    textAlign: 'center',
    width: width * 0.75,
    height: height * 0.09,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
  },
  input1: {
    fontSize: 11,
    textAlign: 'center',
    width: width * 0.75,
    height: height * 0.09,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
  }
});
export default parolaGuncelleme;