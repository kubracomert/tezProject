import React, { Component, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, Dimensions,
    ScrollView, Image, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TextInputBase
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { strings } from '../../Dil/strings';
import Button from '../../commons/Button';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity } from 'react-native';
import ImageModal from 'react-native-image-modal';
import getIp from '../../commons/getIp';
const { width, height } = Dimensions.get('window');


class grvStajDefteri extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    fotoGoster = () => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let gun = navigation.getParam('gun');
        let ogrId = navigation.getParam('ogrId');

        fetch(getIp() + '/react-native-insert/StajDefteriFotoGoruntulemeHoca.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gun: this.props.navigation.getParam('gun'),
                ogrId: this.props.navigation.getParam('ogrId')
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource2: responseJson
                });
            })
            .catch((error) => {
                console.log(error.name + ':' + error.message);
            });
    }
    gunuGoster = () => {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let gun = navigation.getParam('gun');
        let ogrId = navigation.getParam('ogrId');
        this.fotoGoster();
        fetch(getIp() + '/react-native-insert/ogrDefterGoruntu.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gun: this.props.navigation.getParam('gun'),
                ogrId: this.props.navigation.getParam('ogrId')
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource1: responseJson
                });
                if (responseJson == 'YOK Kİİİ') {
                    Alert.alert("Kayıtlı Bilgi Yok!")
                    { this.props.navigation.goBack() };
                }
            })
            .catch((error) => {
                console.log(error.name + '......m:' + error.message);
            });
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const { navigate } = this.props.navigation;
        let ogrId = navigation.getParam('ogrId');

        // let gun=navigation.getParam('gun');

        try {
            //Noktalı yere kendi ip adresinizi yazın.172.16.0.158
            const response = await fetch(getIp() + '/react-native-insert/ogrTarihSiniriHoca.php', {
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
            this.setState({
                dataSource: responseJson
            });
        }
        catch (error) {
            console.log(error.name + ':::::' + error.message)

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
        let gun = navigation.getParam('gun');
        let sayfa = navigation.getParam('sayfa');
        let genebaslangicT = navigation.getParam('genebaslangicT');
        let genebitisT = navigation.getParam('genebitisT');
        let ogrId = navigation.getParam('ogrId');

        return (
            <LinearGradient
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'blue',
                    marginBottom: 10
                }}
                colors={['#D9CAC1', '#A3B0D9']}
                // colors={['gray', 'red']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>

                {gun ? this.gunuGoster() : console.log("else")}

                { gun ?
                    <>
                        {/* <View style={{ flex: 1, flexDirection: 'column-reverse' }}> */}
                            {/* <Button text="Görüntüle" onPress={() => this.gunuGoster()}></Button> */}
                            <FlatList
                                data={this.state.dataSource1}
                                ItemSeparatorComponent={this.FlatListItemSeparator}
                                keyExtractor={dataSource1 => dataSource1.id}
                                renderItem={({ item }) =>
                                    <>
                                        <View style={styles.input2}>
                                            <TextInput style={{ flex: 1, paddingLeft: 3 }}
                                                placeholder={gun} placeholderTextColor={'black'} keyboardType='numeric' />
                                            <TouchableOpacity onPress={() => { Actions.jump('Tarih', { baslangicT: genebaslangicT, bitisT: genebitisT, sayfa: 'StajDefteri' }) }}  >
                                                <Image source={require('../../img/2.png')} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* burayı konu ve metnin görüntülenmesi viewleri tasarlanman gerek */}
                                        <Text style={styles.input2}>{item.konu}</Text>
                                        <Text style={styles.input3}>{item.metin}</Text>

                                        <FlatList
                                            data={this.state.dataSource2}
                                            ItemSeparatorComponent={this.FlatListItemSeparator}
                                            keyExtractor={dataSource2 => dataSource2.id}
                                            renderItem={({ item }) =>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text>{item.image_tag}</Text>
                                                    <ImageModal
                                                        resizeMode="contain"
                                                        imageBackgroundColor="#000000"
                                                        style={styles.image}
                                                        source={{ uri: item.image_path }}
                                                    />
                                                </View>
                                            } /> 
                                    </>

                                } />
                        {/* </View> */}

                    </>
                    :

                    <FlatList
                        data={this.state.dataSource}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        keyExtractor={dataSource => dataSource.id}
                        renderItem={({ item }) =>
                            <>
                                <View style={styles.input}>
                                    <TextInput style={{ flex: 1 }}
                                        placeholder={"Başlangıç:" + " YYYY-MM-DD"} fontSize={14} keyboardType='numeric' />
                                    <TouchableOpacity onPress={() => { Actions.jump('Tarih', { baslangicT: item.baslangicT, bitisT: item.bitisT, sayfa: 'StajDefteri' }) }}  >
                                        <Image source={require('../../img/2.png')} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.input2}>Konu</Text>
                                <Text style={styles.input3}>Metin</Text>
                            </>
                        }
                    />}




            </LinearGradient>
        );
    }
}
const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }, input1: {
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

    tikc: {
        marginLeft: 20,
        marginRight: 20,
        width: width * 0.2,
        height: height * 0.13,
        alignItems: 'center',

        borderRadius: 30,
        marginTop: 20,
        flexDirection: 'row'
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
        paddingTop: 10,
        paddingLeft: 5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 0.6,
        borderRadius: 32,
        width: width * 0.8,
        height: height * 0.08,
        backgroundColor: 'white',
        marginTop: 10,
        paddingLeft: 25,
        fontSize: 15

    },
    input3: {
        padding: 15,
        textAlign: 'center',
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
export default grvStajDefteri;