import React, { Component } from 'react';
import {Viev,Text,Button} from 'react-native';
import { Router, Scene, Stack,ActionConst,Drawer} from 'react-native-router-flux';

import Anasayfa from './component/Anasayfa';
import Giris from './component/Giris';
import parolaUnutma from './component/parolaUnutma';
import Menu from './component/OgrSayfalari/Menu';
import frmaBilgiDoldurma from './component/OgrSayfalari/frmaBilgiDoldurma';
import Grvli from './component/GrvSayfalari/Grvli';
import ogrStajBasvuru from './component/GrvSayfalari/ogrStajBasvuru';
import OgrenciBasvurulanFirmalar from './component/OgrSayfalari/OgrenciBasvurulanFirmalar';
import ogrFrmaListe from './component/OgrSayfalari/ogrFrmaListe';
import OgrenciFirmaBasvuru from './component/OgrSayfalari/OgrenciFirmaBasvuru';
import ogrBasvuruİptali from './component/OgrSayfalari/ogrBasvuruİptali';
import ogrStajYapan from './component/GrvSayfalari/ogrStajYapan';
import frmaHocaOnay from './component/GrvSayfalari/frmaHocaOnay';
import frmaListe from './component/GrvSayfalari/frmaListe';
import frmaRedListe from './component/GrvSayfalari/frmaRedListe';
import frmaRedSil from './component/GrvSayfalari/frmaRedSil';
import frmaOnayListe from './component/GrvSayfalari/frmaOnayListe';
import ogrListe from './component/GrvSayfalari/ogrListe';
import ogrStajBilgileri from './component/GrvSayfalari/ogrStajBilgileri';
import ogrSyf from './component/GrvSayfalari/ogrSyf';
import Defter from './component/OgrSayfalari/Defter'; 
import okulBasvuru from './component/OgrSayfalari/okulBasvuru'; 
import FirmaKayit from './component/FirmaSayfalari/FirmaKayit';
import FirmaGiris from './component/FirmaSayfalari/FirmaGiris';
import OgrenciDetayFirma from './component/FirmaSayfalari/OgrenciDetayFirma';
import FirmaBasvuranlar from './component/FirmaSayfalari/FirmaBasvuranlar';
import FirmaStajYapanlarDetay from './component/FirmaSayfalari/FirmaStajYapanlarDetay';
import StajYapanlar from './component/FirmaSayfalari/StajYapanlar';
import FirmaReddedilenler from './component/FirmaSayfalari/FirmaReddedilenler';
import FirmaOnaylananlar from './component/FirmaSayfalari/FirmaOnaylananlar';
import FirmaReddedilenlerDetay from './component/FirmaSayfalari/FirmaReddedilenlerDetay';
import FirmaOnaylananlarDetay from './component/FirmaSayfalari/FirmaOnaylananlarDetay';
import FirmaOgrListe from './component/FirmaSayfalari/FirmaOgrListe';
import FirmaOgrSyf from './component/FirmaSayfalari/FirmaOgrSyf';
import parolaGuncelleme from './component/parolaGuncelleme';
import DegerlendirmeFormu from './component/FirmaSayfalari/DegerlendirmeFormu';
import dogrulamaKoduOnay from './component/GrvSayfalari/dogrulamaKoduOnay';
import hocaDTKF from './component/GrvSayfalari/hocaDTKF';
import grvStajDefteri from './component/GrvSayfalari/grvStajDefteri';
import gDegerlendirmeFormu from './component/GrvSayfalari/gDegerlendirmeFormu';
import frmaBilgiGuncelleme from './component/FirmaSayfalari/frmaBilgiGuncelleme';
import frmaDTKF from './component/FirmaSayfalari/frmaDTKF';
import solMenu from './solMenu';
import Tarih from './Tarih';


// import solMenu from './solMenu';  
//import Todos from './Todos';<Scene key="Todos" component={Todos} hideNavBar/>
// import indirmeYukleme from './indirmeYukleme';
//import react from 'react';


export default class Root extends Component {
 
    render() {
        return (
            <Router>
                <Stack key="Root">  
                    <Scene key="Anasayfa" component={Anasayfa} initial hideNavBar/>
                    <Scene key="Giris" component={Giris} hideNavBar/>
                    <Scene key="Menu" component={Menu} hideNavBar/>
                    <Scene key="Grvli" component={Grvli} hideNavBar/>
                    <Scene key="frmaListe" component={frmaListe} hideNavBar/>
                    <Scene key="ogrListe" component={ogrListe} hideNavBar/>
                    <Scene key="ogrSyf" component={ogrSyf} hideNavBar/>
                    <Scene key="Defter" component={Defter} hideNavBar/>
                    <Scene key="Tarih" component={Tarih} hideNavBar/>
                    <Scene key="FirmaKayit" component={FirmaKayit} hideNavBar/>
                    <Scene key="FirmaGiris" component={FirmaGiris} hideNavBar/>
                    <Scene key="FirmaOgrListe" component={FirmaOgrListe} hideNavBar/>
                    <Scene key="FirmaOgrSyf" component={FirmaOgrSyf} hideNavBar/>
                    {/* <Scene key="indirmeYukleme" component={indirmeYukleme} hideNavBar/> */}
                    <Scene key="frmaHocaOnay" component={frmaHocaOnay} hideNavBar/>
                    <Scene key="frmaRedListe" component={frmaRedListe} hideNavBar/>
                    <Scene key="frmaOnayListe" component={frmaOnayListe} hideNavBar/>
                    <Scene key="frmaRedSil" component={frmaRedSil} hideNavBar/> 
                    <Scene key="parolaGuncelleme" component={parolaGuncelleme} hideNavBar/>
                    <Scene key="parolaUnutma" component={parolaUnutma} hideNavBar/>
                    <Scene key="frmaBilgiDoldurma" component={frmaBilgiDoldurma} hideNavBar/>
                    <Scene key="okulBasvuru" component={okulBasvuru} hideNavBar/>
                    <Scene key="ogrFrmaListe" component={ogrFrmaListe} hideNavBar/>
                    <Scene key="OgrenciFirmaBasvuru" component={OgrenciFirmaBasvuru} hideNavBar/>
                    <Scene key="OgrenciBasvurulanFirmalar" component={OgrenciBasvurulanFirmalar} hideNavBar/>
                    <Scene key="ogrStajBasvuru" component={ogrStajBasvuru} hideNavBar/>
                    <Scene key="ogrBasvuruİptali" component={ogrBasvuruİptali} hideNavBar/>
                    <Scene key="dogrulamaKoduOnay" component={dogrulamaKoduOnay} hideNavBar/>
                    <Scene key="ogrStajYapan" component={ogrStajYapan} hideNavBar/>
                    <Scene key="ogrStajBilgileri" component={ogrStajBilgileri} hideNavBar/>
                    <Scene key="OgrenciDetayFirma" component={OgrenciDetayFirma} hideNavBar/>
                    <Scene key="FirmaBasvuranlar" component={FirmaBasvuranlar} hideNavBar/>
                    <Scene key="StajYapanlar" component={StajYapanlar} hideNavBar/>
                    <Scene key="FirmaStajYapanlarDetay" component={FirmaStajYapanlarDetay} hideNavBar/>
                    <Scene key="FirmaReddedilenler" component={FirmaReddedilenler} hideNavBar/>
                    <Scene key="FirmaReddedilenlerDetay" component={FirmaReddedilenlerDetay} hideNavBar/>
                    <Scene key="FirmaOnaylananlar" component={FirmaOnaylananlar} hideNavBar/>
                    <Scene key="FirmaOnaylananlarDetay" component={FirmaOnaylananlarDetay} hideNavBar/>
                    <Scene key="frmaBilgiGuncelleme" component={frmaBilgiGuncelleme} hideNavBar/>
                    <Scene key="DegerlendirmeFormu" component={DegerlendirmeFormu} hideNavBar/>
                    <Scene key="solMenu" component={solMenu} hideNavBar/>
                    <Scene key="hocaDTKF" component={hocaDTKF} hideNavBar/>
                    <Scene key="gDegerlendirmeFormu" component={gDegerlendirmeFormu} hideNavBar/>
                    <Scene key="frmaDTKF" component={frmaDTKF} hideNavBar/>
                    <Scene key="grvStajDefteri" component={grvStajDefteri} hideNavBar/>
                    
                    
                </Stack> 
            </Router>
        );
    }
}