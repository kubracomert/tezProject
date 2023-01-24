import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert, AppRegistry, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux';
import getIp from '../../commons/getIp';
import Loader from '../../commons/Loader';
const { width, height } = Dimensions.get('window');

class frmaBilgiGuncelleme extends Component {

  constructor(props) {
    super(props)
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputPhoneNumber: '',
      TextInputAdres: '',
      TextInputfaaliyetAlani: '',
      TextInputAciklama: '',
      tur: 3,
      loading: false,
    }
  };
  submitAndClear = () => {
    setTimeout(() => {
      this.setState({
        TextInputName: '',
        TextInputEmail: '',
        TextInputPhoneNumber: '',
        TextInputAdres: '',
        TextInputfaaliyetAlani: '',
        TextInputAciklama: '',
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
  async componentDidMount() {

    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let mail = navigation.getParam('mail');
    console.log(mail)
    try {
      //Noktalı yere kendi ip adresinizi yazın.192.168.43.168
      const response = await fetch(getIp() + '/react-native-insert/FirmaGuncellemeGoruntuleme.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comEmail: mail

        })
      });
      const responseJson = await response.json();

      this.setState({
        dataSource: responseJson,
      });
    }
    catch (error) {
      Alert.alert("Yeni Başvuru Yok!");
      { this.props.navigation.goBack() }
    }
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "gray",
        }}
      />
    );
  }

  InsertDataToServer = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let mail = navigation.getParam('mail');
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputPhoneNumber } = this.state;
    const { TextInputfaaliyetAlani } = this.state;
    const { TextInputAdres } = this.state;
    const { TextInputAciklama } = this.state;
    if (TextInputName == "" && TexTextInputEmailtInputName == "" &&
      TextInputPhoneNumber == "" &&
      TextInputfaaliyetAlani == "" &&
      TextInputAdres == "" &&
      TextInputAciklama == "") {
      Alert.alert("Lütfen gerekli alanları doldurunuz!");
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 100);
    }
    else {
      // Aşağıdaki noktalı yerde IP adresiniz yer almalı
      fetch(getIp() + '/react-native-insert/frmaBilgiGuncelleme.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: mail,
          name: TextInputName,
          email: TextInputEmail,
          phone_number: TextInputPhoneNumber,
          faaliyetAlani: TextInputfaaliyetAlani,
          adres: TextInputAdres,
          aciklama: TextInputAciklama
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Bilgileri kaydettikten sonra bilgi mesajını gösterme

          Alert.alert(responseJson);
        })
        .catch((error) => {
          console.error(error + '::::' + error.message);
        });
    }
  }


  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let mail = navigation.getParam('mail');
    console.log("maileeyuhhie", mail)
    return (
      <LinearGradient
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'blue'
          , marginBottom: 10
        }}
        colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>

        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          keyExtractor={dataSource => dataSource.id}
          style={{marginTop:30,flex:0.8}}
          renderItem={({ item }) =>
            <>
              <Text>Firma Adı:</Text>
              <TextInput placeholder={item.name} value={this.state.TextInputName} onChangeText={TextInputName => this.setState({ TextInputName })}></TextInput>
              {item.name ? this.state.TextInputName ? console.log("if") : this.setState({ TextInputName: item.name }) : console.log("else")}

              <Text>Firma Email:</Text>
              <TextInput placeholder={item.email} value={this.state.TextInputEmail} onChangeText={TextInputEmail => this.setState({ TextInputEmail })}></TextInput>
              {item.email ? this.state.TextInputEmail ? console.log("if") : this.setState({ TextInputEmail: item.email }) : console.log("else")}

              <Text>Firma Telefon:</Text>
              <TextInput placeholder={item.phone_number} value={this.state.TextInputPhoneNumber} onChangeText={TextInputPhoneNumber => this.setState({ TextInputPhoneNumber })}></TextInput>
              {item.phone_number ? this.state.TextInputPhoneNumber ? console.log("if") : this.setState({ TextInputPhoneNumber: item.phone_number }) : console.log("else")}

              <Text>Firma Faaliyet Alanı:</Text>
              <TextInput placeholder={item.faaliyetAlani} value={this.state.TextInputfaaliyetAlani} onChangeText={TextInputfaaliyetAlani => this.setState({ TextInputfaaliyetAlani })}></TextInput>
              {item.faaliyetAlani ? this.state.TextInputfaaliyetAlani ? console.log("if") : this.setState({ TextInputfaaliyetAlani: item.faaliyetAlani }) : console.log("else")}

              <Text>Firma Adres:</Text>
              <TextInput placeholder={item.adres} value={this.state.TextInputAdres} onChangeText={TextInputAdres => this.setState({ TextInputAdres })}></TextInput>
              {item.adres ? this.state.TextInputAdres ? console.log("if") : this.setState({ TextInputAdres: item.adres }) : console.log("else")}

              <Text>Firma Açıklama:</Text>
              <TextInput placeholder={item.aciklama} value={this.state.TextInputAciklama} onChangeText={TextInputAciklama => this.setState({ TextInputAciklama })}></TextInput>
              {item.aciklama && this.state.TextInputAciklama ? this.setState({ TextInputAciklama: item.aciklama }) : console.log("else")}

            </>}
        />

        <Loader loading={this.state.loading} />
        <Button marginBottom={30}
          onPress={() => this.getCoordinates(this.InsertDataToServer(), this.submitAndClear())}
          text={'Güncelle'} />

      </LinearGradient>
    );
  }
}
const style = StyleSheet.create({
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
    textAlign: 'left',
    marginTop: 5,
  },
  container: {
    backgroundColor: '#CCCCCC',
    height: height,
    padding: 15,
    display: 'flex',
    alignItems: 'flex-start',
    width: width,
    paddingTop: 50
  }
}
);

export default frmaBilgiGuncelleme;
