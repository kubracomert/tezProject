import React, { Component } from "react";
import { View, Text, FlatList ,StyleSheet,Dimensions,Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import {Actions} from 'react-native-router-flux'
import getIp from '../../commons/getIp';
import { Alert } from "react-native";
const{width,height}=Dimensions.get('window');

class ogrStajYapan extends Component{
    constructor(props){
      super(props);
      this.state = {}
    }   
    async componentDidMount(){ 
        const { navigation } = this.props;
        const {navigate}=this.props.navigation;
        let ogrenciId=navigation.getParam('ogrenciId');  
        console.log(this.props.navigation.getParam('ogrenciId'),"buraya da zahmet olmazsa öğrencinin idsini yazıve") ;
        try {
          const response = await fetch(getIp() + '/react-native-insert/ogrStajBilgileri.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Populate User email from JSON $obj array and store into $email.
              ogrenciId:this.props.navigation.getParam('ogrenciId'),
              sayfa:'ogrStajBilgisi'
            })
          });
          const responseJson = await response.json();
          this.setState({
            dataSource: responseJson
          }); 
        }
        catch (error) {
          console.error(error);
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

    render(){ 
        return( 
            <LinearGradient colors={['#D9CAC1', '#A3B0D9']}
            // colors={['white','green','pink', 'purple']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}style={styles.container}>
                <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>STAJ BİLGİLERİ</Text>
                <ScrollView style={{paddingVertical: 30}}></ScrollView>
                <FlatList    
                  data={ this.state.dataSource }
                  ItemSeparatorComponent = { this.FlatListItemSeparator }
                  keyExtractor={ dataSource => dataSource.id }
                  renderItem={({item}) => 
                  <>
                    <Text>Staj Yapılan Firmanın Adı:</Text>
                    <Text  style={styles.section}>{item.name}</Text>  
                    <Text>Staj Yapılan Firmanın Faaliyet Alanı:</Text>
                    <Text  style={styles.section}>{item.faaliyetAlani}</Text>  
                    <Text>Staj Yapılan Firmanın Adresi:</Text>
                    <Text  style={styles.section}>{item.adres}</Text>
                    <Text>Staj Yapılan Firmanın İletişim Numarası:</Text>
                    <Text  style={styles.section}>{item.phone_number}</Text>
                    <Text>Staj Yapılan Firmanın E-posta Adresi:</Text>
                    <Text  style={styles.section}>{item.email}</Text>
                    <Text>Stajın Başlangıç Tarihi:</Text>
                    <Text  style={styles.section}>{item.baslangicT}</Text>
                    <Text>Stajın Bitiş Tarihi:</Text>
                    <Text  style={styles.section}>{item.bitisT}</Text>
                  </>} 
                />  
            </LinearGradient>
        );
    }
  }
const styles = StyleSheet.create({
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
    image:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'flex-end',
    },
    container: {
     width,height,
     alignItems:'center',
     justifyContent:'center',
     flex: 1,
     paddingTop: 22
    },
    item: {
        textAlign:'center',
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    section:{
      color:'#39375b',
        flex:9,
        marginTop:10,
        backgroundColor:'#dedef0',
        borderRadius:20,
        width:width*0.70,
        height:height*0.07,
        alignItems:'center',
        paddingLeft:20,
        paddingTop:10,
        paddingRight:10
      },
  });
export default ogrStajYapan;