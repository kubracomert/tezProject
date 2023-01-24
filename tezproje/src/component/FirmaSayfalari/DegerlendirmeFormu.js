import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Alert, Image } from 'react-native';

import { CheckBox } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';

import getIp from '../../commons/getIp';


const { width, height } = Dimensions.get('window');
class DegerlendirmeFormu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            isChecked1: false,
            isChecked2: false,
            isChecked3: false,
            cevap: 'bos',
            checked: false,
            checked1: false,
            cokiyi: false, iyi: false, yeterli: false, zayıf: false, durum: '',
            cokiyi1: false, iyi1: false, yeterli1: false, zayıf1: false, durum1: '',
            cokiyi2: false, iyi2: false, yeterli2: false, zayıf2: false, durum2: '',
            cokiyi3: false, iyi3: false, yeterli3: false, zayıf3: false, durum3: '',
            cokiyi4: false, iyi4: false, yeterli4: false, zayıf4: false, durum4: '',
            cokiyi5: false, iyi5: false, yeterli5: false, zayıf5: false, durum5: '',
            cokiyi6: false, iyi6: false, yeterli6: false, zayıf6: false, durum6: '',
            cokiyi7: false, iyi7: false, yeterli7: false, zayıf7: false, durum7: '',
            cokiyi8: false, iyi8: false, yeterli8: false, zayıf8: false, durum8: '',
            cokiyi9: false, iyi9: false, yeterli9: false, zayıf9: false, durum9: '',
        }
    }



    DegerlendirmeKayıt = () => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let degiskencomId = navigation.getParam('degiskencomId');
        let degiskenOgrenciId = navigation.getParam('degiskenOgrenciId');
        console.log(degiskencomId);
        console.log(degiskenOgrenciId);
        console.log(this.state.durum);

        if (this.state.durum1 == "" || this.state.durum2 == "" || this.state.durum3 == "" || this.state.durum4 == ""
            || this.state.durum5 == "" || this.state.durum6 == "" || this.state.durum7 == "" || this.state.durum8 == "" ||
            this.state.durum9 == "" || this.state.durum == "") { Alert.alert("Lütfen alanları doldurunuz!"); }
        else {
            //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
            fetch(getIp() + '/react-native-insert/degerlendirmeFormuFirma.php',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ogrId: this.props.navigation.getParam('degiskenOgrenciId'),
                        comID: this.props.navigation.getParam('degiskencomId'),
                        durum: this.state.durum,
                        durum1: this.state.durum1,
                        durum2: this.state.durum2,
                        durum3: this.state.durum3,
                        durum4: this.state.durum4,
                        durum5: this.state.durum5,
                        durum6: this.state.durum6,
                        durum7: this.state.durum7,
                        durum8: this.state.durum8,
                        durum9: this.state.durum9,
                    })
                })
                .then((response) => response.json())
                .then((responseJson) => {

                    //Bilgileri kaydettikten sonra bilgi mesajını gösterme
                    Alert.alert(responseJson);
                    { this.props.navigation.goBack(); }
                })

                .catch((error) => {
                    console.error(error);
                });


        }
    }

    renderSection(text) {
        return (
            <View style={styles.section} >
                <View
                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ textAlign: 'center' }}>{text}</Text>
                </View>

            </View>);
    }
    render() {
        return (
            <LinearGradient
                style={{
                    width, height, flex: 1,
                    justifyContent: 'center',

                }}
                colors={['#2B448C', '#B0BAD9', '#F2F2F2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <ScrollView style={{ width, height }}>

                    {this.renderSection('Kendine güven:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi} title={"Çok İyi"} onPress={() => this.setState({ cokiyi: true, iyi: false, yeterli: false, zayıf: false, durum: 'cokiyi' })} />

                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi} title={"İyi"} onPress={() => this.setState({ cokiyi: false, iyi: true, yeterli: false, zayıf: false, durum: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli} title={"Yeterli"} onPress={() => this.setState({ cokiyi: false, iyi: false, yeterli: true, zayıf: false, durum: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf} title={"Zayıf"} onPress={() => this.setState({ cokiyi: false, iyi: false, yeterli: false, zayıf: true, durum: 'zayıf' })} />
                    {console.log(this.state.durum)}


                    {this.renderSection('İnisiyatif:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi1} title={"Çok İyi"} onPress={() => this.setState({ cokiyi1: true, iyi1: false, yeterli1: false, zayıf1: false, durum1: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi1} title={"İyi"} onPress={() => this.setState({ cokiyi1: false, iyi1: true, yeterli1: false, zayıf1: false, durum1: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli1} title={"Yeterli"} onPress={() => this.setState({ cokiyi1: false, iyi1: false, yeterli1: true, zayıf1: false, durum1: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf1} title={"Zayıf"} onPress={() => this.setState({ cokiyi1: false, iyi1: false, yeterli1: false, zayıf1: true, durum1: 'zayıf' })} />
                    {console.log(this.state.durum1)}


                    {this.renderSection('İşine gösterdiği özen:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi2} title={"Çok İyi"} onPress={() => this.setState({ cokiyi2: true, iyi2: false, yeterli2: false, zayıf2: false, durum2: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi2} title={"İyi"} onPress={() => this.setState({ cokiyi2: false, iyi2: true, yeterli2: false, zayıf2: false, durum2: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli2} title={"Yeterli"} onPress={() => this.setState({ cokiyi2: false, iyi2: false, yeterli2: true, zayıf2: false, durum2: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf2} title={"Zayıf"} onPress={() => this.setState({ cokiyi2: false, iyi2: false, yeterli2: false, zayıf2: true, durum2: 'zayıf' })} />
                    {console.log(this.state.durum2)}


                    {this.renderSection('Yaratıcılık:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi3} title={"Çok İyi"} onPress={() => this.setState({ cokiyi3: true, iyi3: false, yeterli3: false, zayıf3: false, durum3: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi3} title={"İyi"} onPress={() => this.setState({ cokiyi3: false, iyi3: true, yeterli3: false, zayıf3: false, durum3: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli3} title={"Yeterli"} onPress={() => this.setState({ cokiyi3: false, iyi3: false, yeterli3: true, zayıf3: false, durum3: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf3} title={"Zayıf"} onPress={() => this.setState({ cokiyi3: false, iyi3: false, yeterli3: false, zayıf3: true, durum3: 'zayıf' })} />
                    {console.log(this.state.durum3)}

                    {this.renderSection('Üstü ile iletişimi:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi4} title={"Çok İyi"} onPress={() => this.setState({ cokiyi4: true, iyi4: false, yeterli4: false, zayıf4: false, durum4: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi4} title={"İyi"} onPress={() => this.setState({ cokiyi4: false, iyi4: true, yeterli4: false, zayıf4: false, durum4: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli4} title={"Yeterli"} onPress={() => this.setState({ cokiyi4: false, iyi4: false, yeterli4: true, zayıf4: false, durum4: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf4} title={"Zayıf"} onPress={() => this.setState({ cokiyi4: false, iyi4: false, yeterli4: false, zayıf4: true, durum4: 'zayıf' })} />
                    {console.log(this.state.durum4)}

                    {this.renderSection('Çalışma arkadaşları ile iletişim:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi5} title={"Çok İyi"} onPress={() => this.setState({ cokiyi5: true, iyi5: false, yeterli5: false, zayıf5: false, durum5: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi5} title={"İyi"} onPress={() => this.setState({ cokiyi5: false, iyi5: true, yeterli5: false, zayıf5: false, durum5: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli5} title={"Yeterli"} onPress={() => this.setState({ cokiyi5: false, iyi5: false, yeterli5: true, zayıf5: false, durum5: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf5} title={"Zayıf"} onPress={() => this.setState({ cokiyi5: false, iyi5: false, yeterli5: false, zayıf5: true, durum5: 'zayıf' })} />
                    {console.log(this.state.durum5)}

                    {this.renderSection('İşe devamda titizliği:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi6} title={"Çok İyi"} onPress={() => this.setState({ cokiyi6: true, iyi6: false, yeterli6: false, zayıf6: false, durum6: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi6} title={"İyi"} onPress={() => this.setState({ cokiyi6: false, iyi6: true, yeterli6: false, zayıf6: false, durum6: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli6} title={"Yeterli"} onPress={() => this.setState({ cokiyi6: false, iyi6: false, yeterli6: true, zayıf6: false, durum6: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf6} title={"Zayıf"} onPress={() => this.setState({ cokiyi6: false, iyi6: false, yeterli6: false, zayıf6: true, durum6: 'zayıf' })} />
                    {console.log(this.state.durum6)}

                    {this.renderSection('Sorumluluk alma:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi7} title={"Çok İyi"} onPress={() => this.setState({ cokiyi7: true, iyi7: false, yeterli7: false, zayıf7: false, durum7: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi7} title={"İyi"} onPress={() => this.setState({ cokiyi7: false, iyi7: true, yeterli7: false, zayıf7: false, durum7: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli7} title={"Yeterli"} onPress={() => this.setState({ cokiyi7: false, iyi7: false, yeterli7: true, zayıf7: false, durum7: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf7} title={"Zayıf"} onPress={() => this.setState({ cokiyi7: false, iyi7: false, yeterli7: false, zayıf7: true, durum7: 'zayıf' })} />
                    {console.log(this.state.durum7)}

                    {this.renderSection('Görevini yerine getirme:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi8} title={"Çok İyi"} onPress={() => this.setState({ cokiyi8: true, iyi8: false, yeterli8: false, zayıf8: false, durum8: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi8} title={"İyi"} onPress={() => this.setState({ cokiyi8: false, iyi8: true, yeterli8: false, zayıf8: false, durum8: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli8} title={"Yeterli"} onPress={() => this.setState({ cokiyi8: false, iyi8: false, yeterli8: true, zayıf8: false, durum8: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf8} title={"Zayıf"} onPress={() => this.setState({ cokiyi8: false, iyi8: false, yeterli8: false, zayıf8: true, durum8: 'zayıf' })} />
                    {console.log(this.state.durum8)}

                    {this.renderSection('Genel Değerlendirme:')}
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.cokiyi9} title={"Çok İyi"} onPress={() => this.setState({ cokiyi9: true, iyi9: false, yeterli9: false, zayıf9: false, durum9: 'cokiyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.iyi9} title={"İyi"} onPress={() => this.setState({ cokiyi9: false, iyi9: true, yeterli9: false, zayıf9: false, durum9: 'iyi' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.yeterli9} title={"Yeterli"} onPress={() => this.setState({ cokiyi9: false, iyi9: false, yeterli9: true, zayıf9: false, durum9: 'yeterli' })} />
                    <CheckBox
                        checkedIcon={<Image source={require('../../img/checked.png')} />}
                        uncheckedIcon={<Image source={require('../../img/check.png')} />}
                        checked={this.state.zayıf9} title={"Zayıf"} onPress={() => this.setState({ cokiyi9: false, iyi9: false, yeterli9: false, zayıf9: true, durum9: 'zayıf' })} />
                    {console.log(this.state.durum9)}



                </ScrollView>
                <Button text={'kaydet'} onPress={() => {
                    this.DegerlendirmeKayıt(
                        this.setState.durum, this.setState.durum1, this.setState.durum2, this.setState.durum3,
                        this.setState.durum4, this.setState.durum5, this.setState.durum6, this.setState.durum7,
                        this.setState.durum8, this.setState.durum9)
                }}></Button>
            </LinearGradient>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',



    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    section: {

        marginTop: 20,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    }
});
export default DegerlendirmeFormu;