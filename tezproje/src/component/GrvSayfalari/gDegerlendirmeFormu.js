import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux'
import getIp from '../../commons/getIp';
import { Alert } from "react-native";
const { width, height } = Dimensions.get('window');
class gDegerlendirmeFormu extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    async componentDidMount() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let ogrId = navigation.getParam('ogrId');
        console.log(ogrId);

        try {
            //Noktalı yere kendi ip adresinizi yazın.192.168.43.168  172.16.0.158
            const response = await fetch(getIp() + '/react-native-insert/degerlendirmeFormuHoca.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ogrId: this.props.navigation.getParam('ogrId')

                })
            });
            const responseJson = await response.json();
            if (responseJson == 'Böyle Bir Form Bulunmamaktadır.') { Alert.alert(responseJson); }

            this.setState({
                dataSource: responseJson
            });
        }
        catch (error) {
            Alert.alert('Böyle Bir Form Bulunmamaktadır.');
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
        return (

            <LinearGradient colors={['#D9CAC1', '#A3B0D9']}
            //  colors={['gray', 'blue']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }} style={styles.container}>

                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Değerlendirme Formu</Text>


                <FlatList
                    data={this.state.dataSource}
                    ItemSeparatorComponent={this.FlatListItemSeparator}
                    keyExtractor={dataSource => dataSource.id}

                    renderItem={({ item }) =>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Kendine güven:</Text>
                            <Text style={styles.section}>{item.soru1}</Text>
                            <Text>İnisiyatif:</Text>
                            <Text style={styles.section} >{item.soru2}</Text>
                            <Text>İşine gösterdiği özen:</Text>
                            <Text style={styles.section} >{item.soru3}</Text>
                            <Text>Yaratıcılık:</Text>
                            <Text style={styles.section}>{item.soru4}</Text>
                            <Text>Üstü ile iletişimi:</Text>
                            <Text style={styles.section} >{item.soru5}</Text>
                            <Text>Çalışma arkadaşları ile iletişim:</Text>
                            <Text style={styles.section} >{item.soru6}</Text>
                            <Text>İşe devamda titizliği:</Text>
                            <Text style={styles.section}>{item.soru7}</Text>
                            <Text>Sorumluluk alma:</Text>
                            <Text style={styles.section}>{item.soru8}</Text>
                            <Text>Görevini yerine getirme:</Text>
                            <Text style={styles.section} >{item.soru9}</Text>
                            <Text>Genel Değerlendirme:</Text>
                            <Text style={styles.section}>{item.soru10}</Text>



                        </View>
                    }
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
        marginTop: 10,
        textAlign: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        width: width * 0.70,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 10
    },
});
export default gDegerlendirmeFormu;