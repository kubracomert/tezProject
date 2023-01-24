// import React, { Component, useState } from 'react';
// import {View,Text,ImageBackground,Dimensions,Image,TextInput,Alert,TextInputBase,FlatList,ScrollView}from 'react-native'
// import LinearGradient from 'react-native-linear-gradient';
// import { strings } from '../../Dil/strings';
// import getIp from '../../commons/getIp';  
// import Button from '../../commons/Button';  
// import { Actions } from 'react-native-router-flux';
// import { TouchableOpacity } from 'react-native'; 
// const {width,height}= Dimensions.get('window');


// class Defter extends Component {

//   constructor(props){
//     super(props);
//     this.state = {}
//   }  
//     async componentDidMount(){
//       const { navigation } = this.props;
//       const {navigate}=this.props.navigation;
//       let degisken1=navigation.getParam('degisken1'); 
//       console.log(degisken1) 
//       try {
//         //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
//         const response = await fetch( getIp()+'/react-native-insert/ogrTarihSiniri.php', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ogrenciemail:this.props.navigation.getParam('degisken1')
//           })
//         });
//         const responseJson = await response.json();
//         this.setState({
//           dataSource: responseJson 
//         });
//       } 
//       catch (error) {
//         Alert.alert(" yok"); 
//       }
//     }
//     FlatListItemSeparator = () => {
//       return (
//         <View
//           style={{
//             height: 1,
//             width: "100%",
//             backgroundColor: "gray",
//           }}
//         />
//       );
//     }

//     render() { 
//       const {navigate}=this.props.navigation;
//         return (
//             <LinearGradient
//             colors={['brown', 'white']}
//             style={styles.container}
//             start={{ x: 0, y: 1 }}
//             end={{ x: 1, y: 0 }}
//             > 
//               <FlatList    
//                 data={ this.state.dataSource }
//                 ItemSeparatorComponent = { this.FlatListItemSeparator }
//                 keyExtractor={ dataSource => dataSource.id }
//                 renderItem={({item}) =>  
//                               <View style={styles.input}>
//                                 <TextInput  style={{flex:1}} 
//                                 placeholder={strings.tarih} keyboardType='numeric' />
//                                 <TouchableOpacity onPress={()=>{Actions.jump('Tarih',{baslangicT:item.baslangicT,bitisT:item.bitisT})}}  >
//                                         <Image source={require('../../img/2.png')}/>
//                                 </TouchableOpacity>  
//                               </View> 
//                            } 
//               />
//                 <TextInput style={styles.input2} placeholder={strings.konu}  autoCapitalize='sentences'></TextInput>

//                 <TextInput style={styles.input3} autoCapitalize='sentences' ></TextInput>

//                <View style={styles.ek}>
//                   <TouchableOpacity onPress={()=>console.log('EKleme işleri')}>
//                       <Image source={require('../../img/3.png')}></Image>
//                   </TouchableOpacity>
//                </View>

//           </LinearGradient>

//         );
//     }
// }   

// const styles={
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },

//   input:{
//     flex:0.7,
//     borderWidth:0.6,
//     borderRadius:32,
//     width:width*0.8,
//     height:height*0.069,
//     backgroundColor:'white',
//     marginTop:10,
//     fontSize:15,
//     flexDirection:'row',
//     alignItems:'center',
//     justifyContent:'space-between',
//     paddingLeft:15,
//     paddingRight:20
//   },
//   input2:{
//     borderWidth:0.6,
//     borderRadius:32,
//     width:width*0.8,
//     height:height*0.09,
//     backgroundColor:'white',
//     marginTop:10,
//     paddingLeft:25,
//     fontSize:15

//   },
//   input3:{
//     width:width*0.86,
//     height:height*0.65,
//     backgroundColor:'white',
//     borderTopRightRadius:32,
//     marginTop:10,
//     textAlign:'left',
//     textAlignVertical:'top'
//   },
//   ek:{
//     backgroundColor:'white',
//     width:width*0.86,
//     height:height*0.087,
//     flexDirection:'row-reverse',
//     alignItems:'flex-end',
//     borderBottomLeftRadius: 32,
//     borderBottomRightRadius: 32,
//   }

// };
// export default Defter;












import React, { Component, useState } from 'react';
import { View, Text, ImageBackground, FlatList, Dimensions, Image, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TextInputBase } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import getIp from '../../commons/getIp';
import Button from '../../commons/Button';
import { strings } from '../../Dil/strings';
import Loader from '../../commons/Loader';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
const { width, height } = Dimensions.get('window');

const options = {
  title: 'Select a pikçıır',
  takePhotoButtonTitle: 'Foti çek',
  chooseFromLibraryButtonTitle: 'galeriden seç',
  quality: 1,
};


class DefterOgrenci extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ImageSource: null,
      data: null,
      TextInputKonu: '',
      TextInputMetin: '',
      tarih: '',
      loading: false,
      Image_TAG: '',
      gun: '',
      refreshing: false,
      dataSource1: ''
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
    }, 1029);
  }

  selectphoto() {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };

        this.setState({
          ImageSource: source,
          data: response.data
        });
      }
    });
  }

  fotiYukle = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { TextInputKonu } = this.state;
    const { TextInputMetin } = this.state;
    let gun = navigation.getParam('gun');
    console.log(gun);
    console.log(this.props.navigation.getParam('degisken1'));
    if (gun == undefined) {
      Alert.alert('tarih Seçiniz');
    }
    else {
      RNFetchBlob.fetch('POST', getIp() + '/react-native-insert/uploadImage.php', {
        Authorization: "Bearer access-token",
        otherHeader: "foo",
        'Content-Type': 'multipart/form-data',
      },

        [
          { name: 'ogrenciemail', data: this.props.navigation.getParam('degisken1') },
          { name: 'tarih', data: gun },
          { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
          { name: 'image_tag', data: this.state.Image_TAG }
        ]
      )

        .then((response) => response.json())
        .then((responseJson) => {

          //Bilgileri kaydettikten sonra bilgi mesajını gösterme
          Alert.alert(responseJson);
        })
        .catch((error) => {
          console.log(error.name + '::::' + error.message);
        });
    }
  }

  defterKayıt = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { TextInputKonu } = this.state;
    const { TextInputMetin } = this.state;
    let degisken1 = navigation.getParam('degisken1');
    let gun = navigation.getParam('gun');
    console.log(gun);
    console.log(degisken1);
    console.log(TextInputKonu);
    console.log(TextInputMetin);

    if (gun == undefined || TextInputKonu == '' || TextInputMetin == '') {
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 100);
      Alert.alert("Lütfen alanları doldurunuz!");
    }
    else {
      //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
      fetch(getIp() + '/react-native-insert/defterOgrenci.php',
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ogrEmail: this.props.navigation.getParam('degisken1'),
            konu: TextInputKonu,
            metin: TextInputMetin,
            tarih: gun,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          //Bilgileri kaydettikten sonra bilgi mesajını gösterme

          Alert.alert(responseJson);
        })
        .catch((error) => {
          Alert.alert('Hata Oluştu.')
        });
    }
  }

  handleRefresh = () => {
    this.setState({
      // page: 1,
      refreshing: true,
      // seed: this.state.seed + 1,
    }, () => {
      this.componentDidMount();
    }
    );
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken1 = navigation.getParam('degisken1');
    console.log(degisken1);
    try {
      //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
      const response = await fetch(getIp() + '/react-native-insert/ogrTarihSiniri.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ogrenciemail: this.props.navigation.getParam('degisken1'),
        })
      });
      const responseJson = await response.json();
      this.setState({
        dataSource: responseJson
      });
    }
    catch (error) {
      console.log(error.name + ':::::' + error.message)
    }
  }

  goster = () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    let degisken1 = navigation.getParam('degisken1');
    let gun = navigation.getParam('gun');
    // let gun=navigation.getParam('gun');
    console.log(gun);
    //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
    fetch(getIp() + '/react-native-insert/goster.php',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ogrenciemail: this.props.navigation.getParam('degisken1'),
          gun: this.props.navigation.getParam('gun'),
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson == 'YOK') {
          console.log("veri yok")
        }
        else {
          this.setState({
            dataSource1: responseJson
          });
        }

      })
      .catch((error) => {
        console.log(error.name + '::::burasi mi:' + error.message)
      });
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
    let gun = navigation.getParam('gun');
    let sayfa = navigation.getParam('sayfa');
    let genebaslangicT = navigation.getParam('genebaslangicT');
    let genebitisT = navigation.getParam('genebitisT');
    let degisken1 = navigation.getParam('degisken1');
    return (
      <LinearGradient
        colors={['#bedbbb', '#789e7f']}
        style={styles.container}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {/* {this.goster()} */}
          {gun ? this.goster() : console.log("else")}
          {/* eğer gun seçilmiş ve sql sorgusundan dönen varsa onu gösterecek ya da güncelleme oluşturacak bir sayfa */}
          {gun && this.state.dataSource1 ?
            <>
              <FlatList
                data={this.state.dataSource1}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={dataSource1 => dataSource1.id}
                // refreshing={this.state.refreshing}
                // onRefresh={this.handleRefresh}
                renderItem={({ item }) =>
                  <ScrollView>
                    <View style={styles.input2}>
                      <TextInput style={{ flex: 1, paddingLeft: 3 }}
                        placeholder={gun} placeholderTextColor={'black'} keyboardType='numeric' />
                      <TouchableOpacity onPress={() => { Actions.jump('Tarih', { baslangicT: genebaslangicT, bitisT: genebitisT }) }}>
                        <Image source={require('../../img/2.png')} />
                      </TouchableOpacity>
                    </View>

                    <TextInput
                      style={styles.input2} placeholder={item.konu}
                      onChangeText={TextInputKonu => this.setState({ TextInputKonu })} value={this.state.TextInputKonu} />
                    {item.konu && this.state.TextInputKonu ? console.log("else") : this.setState({ TextInputKonu: item.konu })}

                    <TextInput
                      style={styles.input3} placeholder={item.metin} value={this.state.TextInputMetin}
                      onChangeText={TextInputMetin => this.setState({ TextInputMetin })}>
                    </TextInput>
                    {item.metin && this.state.TextInputMetin ? console.log("else") : this.setState({ TextInputMetin: item.metin })}

                    <TextInput placeholder="Açıklama Giriniz " onChangeText={data => this.setState({ Image_TAG: data })} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column', marginTop: 2 }}>
                        <Loader loading={this.state.loading} />
                        <Button text="Kaydet" onPress={() => { this.getCoordinates(this.defterKayıt()) }}></Button>
                        <Button text="Yükle" onPress={() => { this.fotiYukle() }}></Button>
                      </View>
                      <View style={{ flexDirection: 'column-reverse' }}>
                        <TouchableOpacity onPress={() => { this.selectphoto() }}>
                          <Image style={styles.image} source={require('../../img/3.png')}></Image>
                        </TouchableOpacity>
                        <Image style={styles.image} source={this.state.ImageSource != null ?
                          this.state.ImageSource : require('../../img/ni.jpeg')}></Image>
                      </View>
                      {/* ☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻☻ */}

                    </View>
                  </ScrollView>
                } />
            </>


            :

            //eğer gün seçilmiş ve sql sorgusundan dönen olmazsa tarih girili şekilde yeni bir sayfa oluşturmak için sayfa
            gun && this.state.dataSource1 == '' ?

              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={dataSource => dataSource.id}
                // refreshing = { this.state.refreshing }
                // onRefresh = { this.handleRefresh }
                renderItem={({ item }) =>
                  <ScrollView>
                    <View style={styles.input}>
                      <TextInput style={{ flex: 1 }}
                        placeholder={gun} keyboardType='numeric' />
                      <TouchableOpacity onPress={() => { Actions.jump('Tarih', { ogrenciemail: degisken1, baslangicT: item.baslangicT, bitisT: item.bitisT }) }}  >
                        <Image source={require('../../img/2.png')} />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input2} placeholder={strings.konu} // autoCapitalize='sentences'
                      onChangeText={TextInputKonu => this.setState({ TextInputKonu })} />

                    <TextInput
                      style={styles.input3}// autoCapitalize='sentences'  
                      onChangeText={TextInputMetin => this.setState({ TextInputMetin })}>
                    </TextInput>

                    <TextInput placeholder="Açıklama Giriniz " onChangeText={data => this.setState({ Image_TAG: data })} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column', marginTop: 2 }}>
                        <Loader loading={this.state.loading} />
                        <Button text="Kaydet" onPress={() => { this.getCoordinates(this.defterKayıt()) }}></Button>
                        <Button text="Yükle" onPress={() => { this.fotiYukle() }}></Button>
                      </View>
                      <View style={{ flexDirection: 'column-reverse' }}>
                        <TouchableOpacity onPress={() => { this.selectphoto() }}>
                          <Image style={styles.image} source={require('../../img/3.png')}></Image>
                        </TouchableOpacity>
                        <Image style={styles.image} source={this.state.ImageSource != null ?
                          this.state.ImageSource : require('../../img/ni.jpeg')}></Image>
                      </View>

                    </View>

                  </ScrollView>

                }
              />

              :

              //sayfa da hiç bir şey yoksa boş gösterecek sayfayı
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.FlatListItemSeparator}
                keyExtractor={dataSource => dataSource.id}
                // refreshing = { this.state.refreshing }
                // onRefresh = { this.handleRefresh }
                renderItem={({ item }) =>
                  <ScrollView>
                    <View style={styles.input}>
                      <TextInput style={{ flex: 1 }}
                        placeholder={"Lütfen Bir Tarih Seçiniz:"} keyboardType='numeric' />
                      <TouchableOpacity onPress={() => { Actions.jump('Tarih', { ogrenciemail: degisken1, baslangicT: item.baslangicT, bitisT: item.bitisT }) }}  >
                        <Image source={require('../../img/2.png')} />
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input2} placeholder={strings.konu} // autoCapitalize='sentences'
                      onChangeText={TextInputKonu => this.setState({ TextInputKonu })} />

                    <TextInput
                      style={styles.input3}// autoCapitalize='sentences'  
                      onChangeText={TextInputMetin => this.setState({ TextInputMetin })}>
                    </TextInput>

                    <TextInput placeholder="Açıklama Giriniz " onChangeText={data => this.setState({ Image_TAG: data })} />
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flexDirection: 'column', marginTop: 2 }}>
                        <Loader loading={this.state.loading} />
                        <Button text="Kaydet" onPress={() => { this.getCoordinates(this.defterKayıt()) }}></Button>
                        <Button text="Yükle" onPress={() => { this.fotiYukle() }}></Button>
                      </View>
                      <View style={{ flexDirection: 'column-reverse' }}>
                        <TouchableOpacity onPress={() => { this.selectphoto() }}>
                          <Image style={styles.image} source={require('../../img/3.png')}></Image>
                        </TouchableOpacity>
                        <Image style={styles.image} source={this.state.ImageSource != null ?
                          this.state.ImageSource : require('../../img/ni.jpeg')}></Image>
                      </View>


                    </View>

                  </ScrollView>

                }
              />

          }

        </View>
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
  input1: {
    flex: 0.13,
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.74,
    height: height * 0.02,
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20
  },
  input: {
    flex: 0.7,
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.8,
    height: height * 0.09,
    backgroundColor: 'white',
    marginTop: 10,
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 20
  },
  input2: {
    paddingTop: 15,
    paddingRight: 19,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 0.6,
    borderRadius: 32,
    width: width * 0.8,
    height: height * 0.09,
    backgroundColor: 'white',
    marginTop: 10,
    paddingLeft: 25,
    fontSize: 15

  },
  input3: {
    width: width * 0.86,
    height: height * 0.6,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    marginTop: 10,
    textAlign: 'left',
    textAlignVertical: 'top'
  },
  ek: {
    marginBottom: 10,
    backgroundColor: 'white',
    width: width * 0.86,
    height: height * 0.087,
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  image: {
    width: width * 0.12,
    height: height * 0.08,
    marginLeft: 5,
    marginTop: 5,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    direction: 'ltr',
    flexDirection: 'row-reverse',
  }

};
export default DefterOgrenci;