import React, {useState, useLayoutEffect} from "react";
import { 
  SafeAreaView,
  ScrollView, 
  Text,
  View, 
  Image, 
  Animated,
  StyleSheet, 
  Dimensions,
  Platform
} from "react-native";
import { HeaderBackButton } from '@react-navigation/elements'

import moment from 'moment';
import { PULIC_BUCKET_URL } from '../config';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import Svg from 'react-native-svg';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
// const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
moment.locale('es', {
  months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
  monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
  weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_')
}
);

export default function ShowObservation({ route, navigation }) {  
    console.log(route.params)
    console.log(navigation)
    const [item, setItem] = useState(route.params?.item);
   
    useLayoutEffect( () => {
      navigation.setOptions({
        // title: item.title === '' ? 'No title' : item.title,
        title: 'Observación',
        headerLeft: (props) => (
          <HeaderBackButton labelVisible={true} onPress={()=>{
            navigation.goBack();
          }}></HeaderBackButton>
        )
      });
    })
    // console.log(item);

    const accidentObs = () => {
      if (item.observationTypes.accident.status == true) {
        return (
          <View style={[styles.obsCard]}>
            <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
            <Image
                style={styles.rightImage}
                source={require("../../assets/images/icons/buttonIcons/button-accident.png")}
              />
              <Text style={styles.subtitle}>Accidente</Text>
            </View>
            <View style={styles.spacer}/> 
            <View style={styles.linkContainer}>
              <Text style={styles.link}>Actividad:</Text>
              { item.observationTypes.accident.values.activityType === 0 && (<Text style={styles.description}>Esqui de montaña / Splitboard</Text>)}
              { item.observationTypes.accident.values.activityType === 1 && (<Text style={styles.description}>Raquetas de nieve</Text>)}
              { item.observationTypes.accident.values.activityType === 2 && (<Text style={styles.description}>Escalada/Alpinismo</Text>)}
              { item.observationTypes.accident.values.activityType === 3 && (<Text style={styles.description}>Esqui/Snowboard (Pista)</Text>)}
              { item.observationTypes.accident.values.activityType === 4 && (<Text style={styles.description}>Trekking</Text>)}
              { item.observationTypes.accident.values.activityType === 5 && (<Text style={styles.description}>{item.observationTypes.accident.values.customActivityType}</Text>)}
            </View>
          
            {/* <View style={styles.spacer}/> */}
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Personas en el grupo:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfPeople}</Text>
            </View>
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Personas parcialmente enterradas:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfPartiallyBuried}</Text>
              </View>
              <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Personas totalmente enterradas:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfBuried}</Text>
              </View>
              <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Personas con lesiones leves:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfInjured}</Text>
              </View>
              <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Personas con lesiones graves:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfSeverlyInjured}</Text>
              </View>
              <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Num. de fallecidos:</Text><Text style={styles.description}>{item.observationTypes.accident.values.numOfDead}</Text>
              </View>
            
            {/* <View style={styles.spacer}/> */}
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Profundida de la cicatriz:</Text><Text style={styles.description}>{item.observationTypes.accident.values.crackDepth}</Text>
            </View>
            
           
            
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Tamaño del alud:</Text>
            </View>
            
              { item.observationTypes.accident.values.avalancheSize?.size_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>1-Peligro de enterramiento mínimo (peligro de caida)</Text></View>)}
              { item.observationTypes.accident.values.avalancheSize?.size_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>2-Puede enterrar, herir o matar a una persona</Text></View>)}
              { item.observationTypes.accident.values.avalancheSize?.size_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>3-Puede enterrar o destruir un coche</Text></View>)}
              { item.observationTypes.accident.values.avalancheSize?.size_4 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>4-Puede enterrar o destruir un vagon de tren</Text></View>)}
              { item.observationTypes.accident.values.avalancheSize?.size_5 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>55-Puede modificar el paisaje, posibilidad de daños desastrosos</Text></View>)}
            
         

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Trampas del terreno:</Text>
              {!item.observationTypes.accident.values.terrainTraps === 0 && (<Text style={styles.description}>Sin apariencia</Text>)}
              { item.observationTypes.accident.values.terrainTraps === 1 && (<Text style={styles.description}>Corto/zanja</Text>)}
              { item.observationTypes.accident.values.terrainTraps === 2 && (<Text style={styles.description}>Desnivel/Cambio de pendiente</Text>)}
              { item.observationTypes.accident.values.terrainTraps === 3 && (<Text style={styles.description}>Árboles</Text>)}
              { item.observationTypes.accident.values.terrainTraps === 4 && (<Text style={styles.description}>Barranco</Text>)}
            </View>

         
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Quieres ser contactado?</Text><Text style={styles.description}>{item.observationTypes.accident.values.contactMe ? 'Sí' : 'No'}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Otras observaciones:</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={[styles.description,{paddingVertical: 5, maxWidth:'100%', textAlign:'left'}]}>{item.observationTypes.accident.values.comments}</Text>
            </View>
          </View>
        )
      }
    }

    const avalancheObs = () => {
      if (item.observationTypes.avalanche.status == true) {
        return (
          <View style={[styles.obsCard]}>
            <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
            <Image
                style={styles.rightImage}
                source={require("../../assets/images/icons/buttonIcons/button-avalanche.png")}
              />
              <Text style={styles.subtitle}>Avalancha</Text>
            </View>
            <View style={styles.spacer}/> 
            <View style={styles.linkContainer}>
              <Text style={styles.link}>Observación singular o síntesis de la salida:</Text>
              { item.observationTypes.avalanche.values.obsType === 1 && (<Text style={styles.description}>Singular</Text>)}
              { item.observationTypes.avalanche.values.obsType === 2 && (<Text style={styles.description}>Síntesis</Text>)}
            </View>
          
            <View style={[styles.linkContainer,{marginTop:5}]}>
            <Text style={[styles.link,{maxWidth: 150}]}>La geolocalización de la observación es precisa?</Text>
              { item.observationTypes.avalanche.values.geoAccuracy === 1 && (<Text style={styles.description}>Exacta (20-50m)</Text>)}
              { item.observationTypes.avalanche.values.geoAccuracy === 2 && (<Text style={styles.description}>Bastante precisa (50-500m)</Text>)}
              { item.observationTypes.avalanche.values.geoAccuracy === 3 && (<Text style={styles.description}>Poco precisa (+500m)</Text>)}
             
            </View>
          

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>La observación fué hace:</Text>
              { item.observationTypes.avalanche.values.when === 1 && (<Text style={styles.description}>Del mismo día</Text>)}
              { item.observationTypes.avalanche.values.when === 2 && (<Text style={styles.description}>Del día anterior</Text>)}
              { item.observationTypes.avalanche.values.when === 3 && (<Text style={styles.description}>Mas de dos días</Text>)}
             
            </View>
      
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Núm. de avalanchas:</Text>
              { item.observationTypes.avalanche.values.amount === 1 && (<Text style={styles.description}>1</Text>)}
              { item.observationTypes.avalanche.values.amount === 2 && (<Text style={styles.description}>2-5</Text>)}
              { item.observationTypes.avalanche.values.amount === 3 && (<Text style={styles.description}>6-10</Text>)}
              { item.observationTypes.avalanche.values.amount === 4 && (<Text style={styles.description}>+10</Text>)}
            </View>
           

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Medida:</Text>
            </View>
            
              { item.observationTypes.avalanche.values.dangerLevel?.level_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>1-Peligro de enterramiento mínimo (peligro de caída)</Text></View>)}
              { item.observationTypes.avalanche.values.dangerLevel?.level_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>2-Puede enterrar, herir o matar a una persona</Text></View>)}
              { item.observationTypes.avalanche.values.dangerLevel?.level_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>3-Puede enterrar o destruir un choche</Text></View>)}
              { item.observationTypes.avalanche.values.dangerLevel?.level_4 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>4-Puede enterrar o destruir un vagón de tren</Text></View>)}
              { item.observationTypes.avalanche.values.dangerLevel?.level_5 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>5-Puede modificar el paisaje, posibilidad de daños desastrosos.</Text></View>)}

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Tipología de alud:</Text>
            </View>
            
              { item.observationTypes.avalanche.values.avalancheType?.type_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Placa de nieve reciente</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Placa de viento</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Capa débil persistente</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_4 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Placa húmeda</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_5 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Cornisa</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_6 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Cornisa y placa</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_7 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Puntual húmeda</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_8 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Puntual seca</Text></View>)}
              { item.observationTypes.avalanche.values.avalancheType?.type_9 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Deslizamiento basal</Text></View>)}

            <View style={[styles.linkContainer,{marginTop:5, marginBottom: 5}]}>
              <Text style={styles.link}>Caracteristicas de la avalancha</Text>
              
            </View>
            <View style={[styles.linkContainer,{marginLeft: 15}]}>
              <Text style={styles.link}>Profundidad de la fractura (cm):</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.depth}</Text>
            </View>
            <View style={[styles.linkContainer,{marginLeft: 15}]}>
              <Text style={styles.link}>Ancho (m):</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.width}</Text>
            </View>
            <View style={[styles.linkContainer,{marginLeft: 15}]}>
              <Text style={styles.link}>Largo (m):</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.length}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Desencadenamiento:</Text>
              { item.observationTypes.avalanche.values.trigger === 1 && (<Text style={styles.description}>Accidental</Text>)}
              { item.observationTypes.avalanche.values.trigger === 2 && (<Text style={styles.description}>Natural</Text>)}
              { item.observationTypes.avalanche.values.trigger === 3 && (<Text style={styles.description}>Artificial</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Franja altitudinal:</Text>
            </View>
            
              { item.observationTypes.avalanche.values.heightRange?.range_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>-2.000m</Text></View>)}
              { item.observationTypes.avalanche.values.heightRange?.range_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>2.000-2.300m</Text></View>)}
              { item.observationTypes.avalanche.values.heightRange?.range_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>+2.300m</Text></View>)}
            
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Cota altimerica zona de salida (m):</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.height}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Inclinación zona de salida (m):</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.inclination}º</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Orientación:</Text>
            </View>
            
              { item.observationTypes.avalanche.values.orientation?.N && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>N</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.NE && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>NE</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.E && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>E</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.SE && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>SE</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.S && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>S</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.SO && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>SO</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.O && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>O</Text></View>)}
              { item.observationTypes.avalanche.values.orientation?.NO && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>NO</Text></View>)}        
            
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Grano de la capa débil:</Text>
              <Text style={styles.description}>{item.observationTypes.avalanche.values.snowType}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Exposición:</Text>
              { item.observationTypes.avalanche.values.windExposure === 1 && (<Text style={styles.description}>Sotavento</Text>)}
              { item.observationTypes.avalanche.values.windExposure === 2 && (<Text style={styles.description}>Carga cruzada</Text>)}
              { item.observationTypes.avalanche.values.windExposure === 3 && (<Text style={styles.description}>Otras situaciones</Text>)}
              { item.observationTypes.avalanche.values.windExposure === 4 && (<Text style={styles.description}>Sin exposición al viento</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Otras observaciones:</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={[styles.description,{paddingVertical: 5, maxWidth:'100%', textAlign:'left'}]}>{item.observationTypes.avalanche.values.comments}</Text>
            </View>
          </View>
        )
      }
    }

    const snowObs = () => {
      if (item.observationTypes.snowpack.status == true) {
        return (
          <View style={[styles.obsCard]}>
            <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
            <Image
                style={styles.rightImage}
                source={require("../../assets/images/icons/buttonIcons/button-snow.png")}
              />
              <Text style={styles.subtitle}>Manto de nieve</Text>
            </View>
            <View style={styles.spacer}/> 
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={[styles.link,{maxWidth: 150}]}>La geolocalización de la observación es precisa?</Text>
              { item.observationTypes.snowpack.values.geoAccuracy === 1 && (<Text style={styles.description}>Exacta (20-50m)</Text>)}
              { item.observationTypes.snowpack.values.geoAccuracy === 2 && (<Text style={styles.description}>Bastante precisa (50-500m)</Text>)}
              { item.observationTypes.snowpack.values.geoAccuracy === 3 && (<Text style={styles.description}>Poco precisa (+500m)</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Franja altitudinal del test (m):</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.altitude}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Orientación:</Text>
            </View>
            
              { item.observationTypes.snowpack.values.orientation?.N && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>N</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.NE && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>NE</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.E && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>E</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.SE && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>SE</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.S && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>S</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.SO && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>SO</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.O && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>O</Text></View>)}
              { item.observationTypes.snowpack.values.orientation?.NO && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>NO</Text></View>)}        
            
            <View style={[styles.linkContainer,{marginTop: 5}]}>
              <Text style={styles.link}>Profundidad del manto (cm):</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.depth}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Has escuchado/sentido woumpfs?</Text>
              { item.observationTypes.snowpack.values.woumpfs === 1 && (<Text style={styles.description}>Sí</Text>)}
              { item.observationTypes.snowpack.values.woumpfs === 2 && (<Text style={styles.description}>No</Text>)}
            </View>
            
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Has observado fisurascon propagación?</Text>
              { item.observationTypes.snowpack.values.cracks === 1 && (<Text style={styles.description}>Sí</Text>)}
              { item.observationTypes.snowpack.values.cracks === 2 && (<Text style={styles.description}>No</Text>)}
            </View>
             
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Nive en superfície:</Text>
            </View>
            
              { item.observationTypes.snowpack.values.layerSnowType?.type_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Nueva</Text></View>)}
              { item.observationTypes.snowpack.values.layerSnowType?.type_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Crosta</Text></View>)}
              { item.observationTypes.snowpack.values.layerSnowType?.type_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Escarcha de superfície</Text></View>)}
              { item.observationTypes.snowpack.values.layerSnowType?.type_4 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Facetas</Text></View>)}
              { item.observationTypes.snowpack.values.layerSnowType?.type_5 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Grano fino</Text></View>)}
              { item.observationTypes.snowpack.values.layerSnowType?.type_6 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Variable</Text></View>)}

           
            <View style={[styles.linkContainer,{marginTop: 5}]}>
              <Text style={styles.link}>Penetración pie (cm):</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.footPenetration}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop: 5}]}>
              <Text style={styles.link}>Penetración esquí (cm):</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.skiPenetration}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Test cizalla de mano:</Text>
              { item.observationTypes.snowpack.values.handTest === 1 && (<Text style={styles.description}>Muy fácil</Text>)}
              { item.observationTypes.snowpack.values.handTest === 2 && (<Text style={styles.description}>Fácil</Text>)}
              { item.observationTypes.snowpack.values.handTest === 3 && (<Text style={styles.description}>Moderado</Text>)}
              { item.observationTypes.snowpack.values.handTest === 4 && (<Text style={styles.description}>Difícil</Text>)}
              { item.observationTypes.snowpack.values.handTest === 5 && (<Text style={styles.description}>No concluyente</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Test de compresión:</Text>
              { item.observationTypes.snowpack.values.compresionTest === 1 && (<Text style={styles.description}>1 a 10 golpes</Text>)}
              { item.observationTypes.snowpack.values.compresionTest === 2 && (<Text style={styles.description}>11 a 20 golpes</Text>)}
              { item.observationTypes.snowpack.values.compresionTest === 3 && (<Text style={styles.description}>21 a 30 golpes</Text>)}
              { item.observationTypes.snowpack.values.compresionTest === 4 && (<Text style={styles.description}>No concluyente</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Test columna extendida (ECT):</Text>
              { item.observationTypes.snowpack.values.extensionTest === 1 && (<Text style={styles.description}>Propagación</Text>)}
              { item.observationTypes.snowpack.values.extensionTest === 2 && (<Text style={styles.description}>Sin propagación</Text>)}
              { item.observationTypes.snowpack.values.extensionTest === 3 && (<Text style={styles.description}>No concluyente</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Tipo de fractura:</Text>
            </View>
            
              { item.observationTypes.snowpack.values.fractureType?.type_1 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Colapso súbito</Text></View>)}
              { item.observationTypes.snowpack.values.fractureType?.type_2 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Planar súbito</Text></View>)}
              { item.observationTypes.snowpack.values.fractureType?.type_3 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Planar resistente</Text></View>)}
              { item.observationTypes.snowpack.values.fractureType?.type_4 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Colapso progresivo</Text></View>)}
              { item.observationTypes.snowpack.values.fractureType?.type_5 && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={[styles.description, {maxWidth:250}]}>Rotura (break)</Text></View>)}
             

            <View style={[styles.linkContainer,{marginTop: 5}]}>
              <Text style={styles.link}>Profundida de la fractura (cm):</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.fractureDepth}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Dureza de la placa (sobre la capa débil):</Text>
              { item.observationTypes.snowpack.values.layerHardness === 1 && (<Text style={styles.description}>1-(P) Puño</Text>)}
              { item.observationTypes.snowpack.values.layerHardness === 2 && (<Text style={styles.description}>2-(4d) 4 Dedos</Text>)}
              { item.observationTypes.snowpack.values.layerHardness === 3 && (<Text style={styles.description}>3-(1d) 1 Dedo</Text>)}
              { item.observationTypes.snowpack.values.layerHardness === 4 && (<Text style={styles.description}>4-(L) Lápiz</Text>)}
              { item.observationTypes.snowpack.values.layerHardness === 5 && (<Text style={styles.description}>5-(C) Cuchillo</Text>)}
              { item.observationTypes.snowpack.values.layerHardness === 6 && (<Text style={styles.description}>6-(H) Hielo</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Dureza de la capa débil:</Text>
              { item.observationTypes.snowpack.values.weakLayerHardness === 1 && (<Text style={styles.description}>1-(P) Puño</Text>)}
              { item.observationTypes.snowpack.values.weakLayerHardness === 2 && (<Text style={styles.description}>2-(4d) 4 Dedos</Text>)}
              { item.observationTypes.snowpack.values.weakLayerHardness === 3 && (<Text style={styles.description}>3-(1d) 1 Dedo</Text>)}
              { item.observationTypes.snowpack.values.weakLayerHardness === 4 && (<Text style={styles.description}>4-(L) Lápiz</Text>)}
              { item.observationTypes.snowpack.values.weakLayerHardness === 5 && (<Text style={styles.description}>5-(C) Cuchillo</Text>)}
              { item.observationTypes.snowpack.values.weakLayerHardness === 6 && (<Text style={styles.description}>6-(H) Hielo</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Humedad de la capa:</Text>
              { item.observationTypes.snowpack.values.snowHumidity === 1 && (<Text style={styles.description}>1-Seca-Bola imposible</Text>)}
              { item.observationTypes.snowpack.values.snowHumidity === 2 && (<Text style={styles.description}>2-Húmeda-Bola fácil</Text>)}
              { item.observationTypes.snowpack.values.snowHumidity === 3 && (<Text style={styles.description}>3-Mojada-Guante no se moja</Text>)}
              { item.observationTypes.snowpack.values.snowHumidity === 4 && (<Text style={styles.description}>4-Muy mojada-Guante se moja</Text>)}
              { item.observationTypes.snowpack.values.snowHumidity === 5 && (<Text style={styles.description}>5-Slush-Sin aire en los poros</Text>)}
              
            </View>

            <View style={[styles.linkContainer,{marginTop: 5}]}>
              <Text style={styles.link}>Tipo de grano de la capa débil:</Text>
              <Text style={styles.description}>{item.observationTypes.snowpack.values.snowType}</Text>
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Otras observaciones:</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={[styles.description,{paddingVertical: 5, maxWidth:'100%', textAlign:'left'}]}>Lorem ipsum very long text about the observation to see how this displays.{item.observationTypes.snowpack.values.comments}</Text>
            </View>
          </View>
        )
      }
    }

    const quickObs = () => {
      if (item.observationTypes.quick.status == true) {
        return (
          <View style={[styles.obsCard]}>
            <View style={{flexDirection:'row', marginTop: 10, marginBottom: 10}}>
            <Image
                style={styles.rightImage}
                source={require("../../assets/images/icons/buttonIcons/button-quick.png")}
              />
              <Text style={styles.subtitle}>Rápida</Text>
              
            </View>
            <View style={styles.spacer}/> 
           
            <View style={styles.linkContainer}>
              <Text style={styles.link}>Actividad:</Text>
              { item.observationTypes.quick.values.activityType === 0 && (<Text style={styles.description}>Esqui de montaña / Splitboard</Text>)}
              { item.observationTypes.quick.values.activityType === 1 && (<Text style={styles.description}>Raquetas de nieve</Text>)}
              { item.observationTypes.quick.values.activityType === 2 && (<Text style={styles.description}>Alpinismo</Text>)}
              { item.observationTypes.quick.values.activityType === 3 && (<Text style={styles.description}>Esquí/Snowboard (Pista)</Text>)}
              { item.observationTypes.quick.values.activityType === 4 && (<Text style={styles.description}>Esquí de fondo</Text>)}
              { item.observationTypes.quick.values.activityType === 5 && (<Text style={styles.description}>Sin Actividad</Text>)}
            </View>
        
            {/* <View style={styles.spacer}/> */}
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Evaluacion general de la actividad:</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={styles.link}></Text>
              { item.observationTypes.quick.values.ridingQuality === 0 && (<Text style={styles.description}>Muy buenas condiciones</Text>)}
              { item.observationTypes.quick.values.ridingQuality === 1 && (<Text style={styles.description}>Buenas condiciones</Text>)}
              { item.observationTypes.quick.values.ridingQuality === 2 && (<Text style={styles.description}>Condiciones aceptables</Text>)}
              { item.observationTypes.quick.values.ridingQuality === 3 && (<Text style={styles.description}>Malas condiciones</Text>)}
            </View>

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Condiciones de la nieve:</Text>
            </View>
            
              { item.observationTypes.quick.values.snowConditions.crusty  && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Crosta</Text></View>)}
              {/* { item.observationTypes.quick.values.snowConditions.deepPowder && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text>Polvo</Text></View>)} */}
              { item.observationTypes.quick.values.snowConditions.hard && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Dura</Text></View>)}
              { item.observationTypes.quick.values.snowConditions.heavy && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Pesad</Text></View>)}
              { item.observationTypes.quick.values.snowConditions.powder && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Polvo</Text></View>)}
              { item.observationTypes.quick.values.snowConditions.wet && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Húmeda</Text></View>)}
              { item.observationTypes.quick.values.snowConditions.windyAffected && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Ventada</Text></View>)}

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Tipo de terreno:</Text>
            </View>
            
              { item.observationTypes.quick.values.rodeSlopeTypes?.mellow  && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Suave</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.alpine && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Alpino</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.steep && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Empinado</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.clear && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Terreno abierto</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.dense && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Bosque denso</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.openTrees && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Bosque abierto</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.shade && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Unbrío</Text></View>)}
              { item.observationTypes.quick.values.rodeSlopeTypes?.sunny && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Soleado</Text></View>)}
            
            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>El tiempo:</Text>
            </View>
            
              { item.observationTypes.quick.values.dayType?.cloudy  && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Nublado</Text></View>)}
              { item.observationTypes.quick.values.dayType?.cold && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Frio</Text></View>)}
              { item.observationTypes.quick.values.dayType?.foggy && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Niebla</Text></View>)}
              { item.observationTypes.quick.values.dayType?.stormy && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Lluvia</Text></View>)}
              { item.observationTypes.quick.values.dayType?.sunny && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Soleado</Text></View>)}
              { item.observationTypes.quick.values.dayType?.warm && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Caluroso</Text></View>)}
              { item.observationTypes.quick.values.dayType?.weakSnow && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Nevada leve</Text></View>)}
              { item.observationTypes.quick.values.dayType?.wet && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Húmedo</Text></View>)}
              { item.observationTypes.quick.values.dayType?.windy && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Venteado</Text></View>)}

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Señales de alerta:</Text>
            </View>
            
              { item.observationTypes.quick.values.avalancheConditions?.newConditions  && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Carga de nieve nueva (más de 30cm en 48h)</Text></View>)}
              { item.observationTypes.quick.values.avalancheConditions?.slabs && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Aludes de placa recientes</Text></View>)}
              { item.observationTypes.quick.values.avalancheConditions?.snowAccumulation && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Acumulaciones recientes por viento</Text></View>)}
              { item.observationTypes.quick.values.avalancheConditions?.sounds && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Woumfs o fisuras con propagación</Text></View>)}
              { item.observationTypes.quick.values.avalancheConditions?.tempChanges && (<View style={styles.linkContainer}><Text style={styles.link}></Text><Text style={styles.description}>Sobrecarga por fusión o lluvia</Text></View>)}

            <View style={[styles.linkContainer,{marginTop:5}]}>
              <Text style={styles.link}>Otras observaciones:</Text>
            </View>
            <View style={styles.linkContainer}>
              <Text style={[styles.description,{paddingVertical: 5, maxWidth:'100%', textAlign:'left'}]}>{item.observationTypes.quick.values.comments}</Text>
            </View>
          </View>
        )
      }
    }

    const locationCard = () => {
      return (
      <View style={[styles.locationCard]}>
        <View style={{flexDirection:'row'}}>
        <Image
            style={[styles.locationIcon]}
            source={require("../../assets/images/pins/atesmaps-icon.png")}
          
          />
          <View style={{flexDirection:'column'}}>
          <Text style={{fontSize: 12, paddingVertical:3, color: "gray"}}>Lat: {item.location?.coordinates[1]}</Text>
          <Text style={{fontSize: 12, paddingVertical:3, color: "gray"}}>Long: {item.location?.coordinates[0]}</Text>
          </View>
        </View>
      </View>
      )  
    }
    const getMapRegion = () => {       
      return {latitude: Number(item.location?.coordinates[1]),
              longitude: Number(item.location?.coordinates[0]),
              latitudeDelta: 0.0170,
              longitudeDelta: 0.0170
            }
      
    };

    const obsHeader = () => {
      return (
      <View style={styles.obsHeader}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={{fontSize: 12}}>{moment(item.date).format('Do MMMM YY - HH:mm')}</Text>
        { item.status === 0 && (<Text style={{fontSize: 12}}>Tomada: Durante la salida (sobre el terreno)</Text>)}
        { item.status === 1 && (<Text style={{fontSize: 12}}>Tomada: Immediatamente después de la salida (parquing)</Text>)}
        { item.status === 2 && (<Text style={{fontSize: 12}}>Tomada: Posteriormente (casa/refugio)</Text>)}
      </View>
      )
    }

    const mapBlock = () => {
      return (
        <MapView
          provider={Platform.OS == "android" ?  "google" : undefined}
          style={styles.map}
          showsUserLocation = {false}
          region={getMapRegion()}
        >
        <UrlTile
              // urlTemplate={"https://4umaps.atesmaps.org/{z}/{x}/{y}.png"}
              urlTemplate={"https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=0a7d6a77a3f34d94a359058bd54f0857"}
              /**
              * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
              * MKTileOverlay. iOS only.
              */
              maximumZ={19}
              /**
              * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
              * to be used. Its default value is false.
              */
              flipY={false}
            />    
          <Marker
            key={1}
            coordinate={{latitude:Number(item.location?.coordinates[1]),longitude:Number(item.location?.coordinates[0])}}
          >
            <Svg style={styles.pin} >
              <Image style={styles.pin}
                    source={require('../../assets/images/pins/atesmaps-blue.png')}/> 
            </Svg>
          </Marker>
           
        </MapView>
      )
    }

    const imagesCards = () => {
      return (
        <Animated.ScrollView
        // contentInsetAdjustmentBehavior="automatic"
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center" 
        >
          {item.images.map((image, index)=>(
            <View key={index} style={styles.card}>
              <Image 
                source={{uri:PULIC_BUCKET_URL+'/'+item.directoryId+'/'+image}}
                style={styles.cardImage}
                resizeMode="cover" 
              />  
            </View>
            )
          )} 
     
        </Animated.ScrollView>
      )
    }

    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        >
          {mapBlock()}
          {obsHeader()}
          <View style={styles.container}>
            {/* <View style={styles.spacer}/> */}
            {locationCard()}
            {imagesCards()}
            {quickObs()}
            {avalancheObs()}
            {snowObs()}
            {accidentObs()}
          </View>
        </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: Platform.OS == "android" ? 0 : 40
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    // borderRadius:5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:5,
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  scrollView: {
   marginTop: 10
  },
  obsImage: {
    width:"100%",
    height:200,
    flex:1,
    alignSelf:"center",
    flexDirection:"column",
    borderRadius:5,
  },
  obsCard:{
    backgroundColor: "#FFF",
    borderRadius:5,
    marginTop: 10,
    padding: 15,
  },
  obsHeader: {
    backgroundColor: "rgba(255,255,255,0.6)",
    position:"absolute",
    width: "90%",
    padding: 10,
    top:10,
    left: 20,
    borderRadius:5,
  },
  locationCard: {
    backgroundColor: "#FFF",
    borderRadius:5,
    marginTop: 0,
    padding: 10,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    // paddingVertical: 8,
  },
  link: {
    flex: 2,
    color: 'gray',
    fontWeight: '600', 
    fontSize: 12, 
    // maxWidth: 200,
    //marginRight: 100,
  },
  description: {
    color: 'gray',
    flex: 3,
    fontSize: 12, 
    maxWidth: 120,
    textAlign: 'right',
    // fontWeight: '400',
  },
  map: {
    width:"100%",
    marginLeft: -5,
    marginRight:-5,
    height:300,
    flex:1,
    alignSelf:"center",
    flexDirection:"column",
    // borderRadius:5,
  },
  label:{ 
    fontWeight: 'bold', 
    fontSize: 15, 
    marginBottom: 5,
    marginTop: 5
  },
  title:{
    fontWeight: 'bold', 
    fontSize: 20, 
    marginBottom: 5,
    
  },
  subtitle:{
    fontWeight: 'bold', 
    fontSize: 15, 
    marginBottom: 20,
  
  },
  container: {
    flex: 1,
    padding: 15
  },
  spacer: {
    width: '100%',
    marginTop: -10,
    marginBottom: 20,
    backgroundColor: 'rgb(230,230,230)',
    height: 1,
  },
  rightImage: {
    // marginTop: 5,
    marginRight: 10,
    height: 20,
    width: 40,
  },
  locationIcon: {
    marginTop: 5,
    marginRight: 20,
    resizeMode: 'contain',
    height: 30,
    width: 30,
  },
  pin: {
    ...Platform.select({
      ios: {
        width: 42,
        height: 50,
        marginBottom: 55,
      },
      android: {
        marginBottom: 0,
      },
      default: {
        // other platforms, web for example
        marginBottom: 0,
      },
    }),
  },
});