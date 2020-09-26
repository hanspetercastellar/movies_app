import React from 'react';
import {StyleSheet, Button, View, SafeAreaView, Text, Alert, Image} from 'react-native';
import Bar from '../components/bar/bar';


const MovieDetail = ({route, navigation}) => {
    const { detalle, imagen, titulo,duracion} = route.params;


    console.log(route)
    return (
        <SafeAreaView>
            <View style={{marginHorizontal:20}}>
                <Text style={{marginVertical:10,  fontSize:24, fontWeight:'bold'}}>{titulo}</Text>
                <View style={{flex: 2, flexDirection: 'row', justifyContent:'space-between'}}>
                    <Image  style={{width: 150, height: 250,  resizeMode: "contain", justifyContent: "space-around"}}
                            source={{uri: imagen}} />
                            <View>
                                <View style={{ height:250, justifyContent:'space-between', marginLeft:10}}>
                                    <Text style={{marginVertical:10}}>Fecha: <Text style={{marginHorizontal:30}}>{detalle.fecha}</Text> </Text>
                                    <Text>Duracion: {duracion} </Text>

                                    <View style={{marginVertical:10, width:220}}>
                                        <Text style={{fontWeight:"bold"}}>Reparto:</Text>
                                        <Text >{detalle.reparto}</Text>
                                    </View>
                                    <View style={{marginVertical:10}}>
                                        <Text style={{fontWeight:"bold"}}>Director:</Text>
                                        <Text >{detalle.director}</Text>
                                    </View>
                                </View>

                            </View>

                </View>
                <Text style={{marginTop:260, fontSize:18, fontWeight:'bold'}}>
                    Descripcion:
                </Text>
                <Text style={{ width:390, marginVertical:20}}>
                    {detalle.descripcion}
                </Text>
                <Button style={{marginTop:20}}  onPress={()=>console.log("fsdf")}
                         title="Favorito"
                         color="#f194ff"
                         accessibilityLabel="Learn more about this purple button" />
            </View>


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        flex:2,
        flexDirection:'column'

    }
})

export default MovieDetail
