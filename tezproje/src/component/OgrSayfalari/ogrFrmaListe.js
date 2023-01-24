import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, Alert,TouchableOpacity } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';

const { width, height } = Dimensions.get('window');
class ogrFrmaListe extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    try {
      const response = await fetch(getIp() + '/react-native-insert/ogrenciFirmalar.php');
      const responseJson = await response.json();
      this.setState({
        dataSource: responseJson
      });
    }
    catch (error) {
      Alert.alert("Firma yok");
      { this.props.navigation.goBack() };
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
  render() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken2 = navigation.getParam('degisken2');
    console.log(degisken2, "buraya");
    this.props.navigation.getParam('degisken2')
    return (
      <>

        <LinearGradient
          colors={['#bedbbb', '#789e7f']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} style={styles.container}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>FİRMALAR</Text>

          <FlatList
            style={styles.fl}
            data={this.state.dataSource}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            keyExtractor={dataSource => dataSource.id.toString()}

            renderItem={({ item }) =>


              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => Actions.OgrenciFirmaBasvuru(

                  {
                    degiskeno: degisken2,
                    degisken7: item.id,
                    degisken1: item.name,
                    degisken2: item.faaliyetAlani,
                    degisken3: item.adres,
                    degisken4: item.phone_number,
                    degisken5: item.email
                  })}>
                  <Text style={styles.baslik}>{item.name}</Text>
                  <Text style={styles.altbaslik}>{item.email}</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </LinearGradient>
      </>
    );
  }
}
const styles = StyleSheet.create({
  fl: {
    marginTop: 30,
    height: 1,
    width: width,
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  baslik: {
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 10,
    padding: 50,
    fontSize: 18,
    fontWeight: 'bold',
    height: 44,
  },
  altbaslik: {
    paddingBottom: 10,
    textAlign: 'center',
    paddingTop: 10,
    fontStyle: 'italic',
    padding: 50,
    fontSize: 15,
    height: 44,
  },
  button: {
    backgroundColor: '#859a9b',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  image: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',

  },
  container: {
    width, height,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 22
  },
  item: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  section: {
    flex: 9,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.70,
    height: height * 0.07,
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 10
  },
});
export default ogrFrmaListe;

