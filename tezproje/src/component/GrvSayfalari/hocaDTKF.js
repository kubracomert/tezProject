import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';
import { Alert } from "react-native";

class hocaDTKF extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let ogrId = navigation.getParam('ogrId');
        console.log(ogrId);
        try {
            //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
            const response = await fetch(getIp() + '/react-native-insert/HocaDKTF.php',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ogrId: this.props.navigation.getParam('ogrId'),
                    })
                });
            const responseJson = await response.json();
            if (responseJson == 'Böyle Bir Belge Bulunmamaktadır.') { Alert.alert(responseJson); }

            this.setState({
                dataSource: responseJson
            });
        }
        catch (error) {

            Alert.alert("Bilgi yok");
            { this.props.navigation.goBack() };
        }
    }/*async componentWillUnmount(){
        Alert.alert(" sdfghj");
      }*/
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "gray",
                }}
            />);
    }

    render() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let ogrId = navigation.getParam('ogrId');
        console.log(ogrId);
        return (
            <LinearGradient
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue'
                }}
                colors={['#D9CAC1', '#A3B0D9']}
                // colors={['gray', 'white']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                <View>
                    <Text style={{ textAlign: 'center', paddingLeft: 10, paddingRight: 10, color: 'black', fontSize: 20, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>STAJ YAPAN ÖĞRENCİLER İÇİN DEVLET KATKISI TALEP FORMU</Text>

                    <Text style={{ textAlign: 'left', color: '#1c1c1c', fontSize: 15, alignItems: 'center', justifyContent: 'center', paddingLeft: 15, paddingRight: 15 }}>
                        Pamukkale Üniversitesi Mühendislik Fakültesi Dekanlığı bünyesinde yükseköğrenimlerini görmekte
                        iken 3308 sayılı Mesleki Eğitim Kanunu kapsamında 2021/2022 yılı içerisinde firmamız bünyesinde
                        zorunlu staja tabi tutulan ve taraflarına yapılan ödemelere ilişkin ispat edici belgeler (banka dekontu )
                        ile ekte yer alan öğrencilerinize ilişkin firmamıza yapılacak Mesleki Eğitim devlet Katkısının aşağıda
            belirtilen bilgiler doğrultusunda firmamız hesaplarına aktarılmasını arz ederiz.</Text>

                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={dataSource => dataSource.id}

                        renderItem={({ item }) =>
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text>Staj Yapılan Firmanın Adı:</Text>
                                <Text  >{item.name}</Text>
                                <Text>Staj Yapılan Firmanın Faaliyet Alanı:</Text>
                                <Text  >{item.faaliyetAlani}</Text>
                                <Text>Staj Yapılan Firmanın Adresi:</Text>
                                <Text  >{item.adres}</Text>
                                <Text>Staj Yapılan Firmanın İletişim Numarası:</Text>
                                <Text >{item.phone_number}</Text>
                                <Text>Staj Yapılan Firmanın E-posta Adresi:</Text>
                                <Text  >{item.email}</Text>
                                <Text>Firmanın Çalışan Sayisi:</Text>
                                <Text  >{item.calısanSayisi}</Text>
                                <Text>Firmanın Web Adresi:</Text>
                                <Text >{item.webAdresi}</Text>
                                <Text>Firmanın Iban No:</Text>
                                <Text  >{item.IbanNo}</Text>
                                <Text>Yetkili Ad Soyad:</Text>
                                <Text  >{item.YetkiliAdSoyad}</Text>
                                <Text>Firmanın İşletme Vergi No:</Text>
                                <Text >{item.IsletmeVergiNo}</Text>



                            </View>
                        }
                    />
                </View>


            </LinearGradient>
        );
    }
}
export default hocaDTKF;