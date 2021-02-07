import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Permissions from 'expo-permissions'
import MapView,{Marker} from 'react-native-maps';

export default class App extends React.Component {
  state={
    latitude:null,
    longitude:null,
    isLoading: true,
      dataSource: [],
  }
  
  async componentDidMount(){
    const {status}=await Permissions.getAsync(Permissions.LOCATION)

    if(status !== 'granted'){
      const response= await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({coords: {latitude, longitude}})=>this.setState({latitude,longitude}),
      (error)=>console.log('Error',error)
    )

    fetch('http://192.168.100.26:3030/donadores')
    .then((response) => response.json())
    .then((json) => {
      this.setState({dataSource: json})
      // console.log(this.state.dataSource)        
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      this.setState({isLoading:false})
    });
    
  }
  
  

 render(){
  const {latitude,longitude}=this.state
  const ubicacion = this.state.dataSource;
   if(latitude){
    return(
      <MapView
      showsUserLocation
      style={{ flex: 1 }}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      >
         {
          ubicacion.map((location) => {
            
            return (
              <Marker
                key={location.id}
                coordinate={{  latitude : parseFloat(location.latitude) , longitude : parseFloat(location.longitude) }}
                title={location.nombre + " "+location.apellido}
                description={location.email}
              />
            )
          })
        }
        
      </MapView>
    );
   }
   return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>We need your permission!</Text>
    </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});