import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { strings } from '../../Dil/strings';
import getIp from '../../commons/getIp';
const { width, height } = Dimensions.get('window');

class ogrBasvuruİptali extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    renderAlertIptali() {
        Alert.alert(
            'Başvuruyu İptal Et',
            'Başvuruyu geri çekmek istediğinizden emin misiniz?',
            [
                {
                    text: 'İptal',
                    onPress: () => Alert.alert("İptal edildi!"),
                    style: 'cancel'
                },
                { text: 'Evet', onPress: () => { this.UpdatebasvuruReddi() } }
            ],
            { cancelable: false }
        );
    }
    UpdatebasvuruReddi = () => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        console.log(this.props.navigation.getParam('degisken8'))
        console.log(this.props.navigation.getParam('degisken7'))

        fetch(getIp() + '/react-native-insert/ogrFirmayaBasvuruReddi.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comid: this.props.navigation.getParam('degisken7'),
                ogrenciemail: this.props.navigation.getParam('degisken8')

            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
                { this.props.navigation.goBack() };
            })
            .catch((error) => {
                console.error("ogrBasvuruİptali Sayfasından Kaynaklı Bir Hata oluştu!");
            });
    }
    renderSection(Baslik) {
        return (
            <View>
                <Text style={{ marginTop: 10 }}>{Baslik}</Text>
            </View>
        );
    }
    render() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let degisken1 = navigation.getParam('degisken1');
        let degisken2 = navigation.getParam('degisken2');
        let degisken3 = navigation.getParam('degisken3');
        let degisken4 = navigation.getParam('degisken4');
        let degisken5 = navigation.getParam('degisken5');
        let degisken6 = navigation.getParam('degisken6');
        let degisken9 = navigation.getParam('degisken9');

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

                {this.renderSection('Adı:')}
                <Text style={{ textAlign: 'center' }}>{degisken1}</Text>
                {this.renderSection('Eposta:')}
                <Text style={style.section}>{degisken5}</Text>
                {this.renderSection('Telefon:')}
                <Text style={style.section}>{degisken4}</Text>
                {this.renderSection('Faaliyet Alani:')}
                <Text style={style.section}>{degisken6}</Text>
                {this.renderSection('Adres:')}
                <Text style={style.section}>{degisken9}</Text>

                <View style={{ width: width * 0.7, height: height * 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => { this.renderAlertIptali() }}>
                        <Image source={require('../../img/carpi.png')} style={style.tikc} Text={strings.Reddet} />
                    </TouchableOpacity>
                </View>
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
export default ogrBasvuruİptali;