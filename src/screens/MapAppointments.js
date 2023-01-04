import React, {useContext} from 'react';
import {Alert, Image, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {AppointmentContext} from '../context/AppointmentProvider';
import {StyleSheet} from 'react-native';

// import { Container } from './styles';

const MapAppointments = () => {
  const [mapType, setMapType] = React.useState('standard');
  const [markers, setMarkers] = React.useState([]);
  const {appointment} = useContext(AppointmentContext);

  React.useEffect(() => {
    let arr = [];
    appointment.map(item => {
      arr.push({
        key: item.uid,
        coords: {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        },
        title: item.type,
        description: item.description,
        image: require('../assets/images/marker.png'),
      });
    });

    setMarkers(arr);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        style={styles.map}
        onPress={() => {}}
        initialRegion={{
          latitude: -31.766108372781073,
          longitude: -52.35215652734042,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => {
          return (
            <Marker
              key={marker.key}
              coordinate={{
                longitude: marker.coords.longitude
                  ? marker.coords.longitude
                  : 0,
                latitude: marker.coords.latitude ? marker.coords.latitude : 0,
              }}
              title={marker.title}
              description={marker.description}
              draggable>
              <Image
                source={marker.image}
                style={{width: 25, height: 25}}
                resizeMode="contain"
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

export default MapAppointments;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.abosluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
