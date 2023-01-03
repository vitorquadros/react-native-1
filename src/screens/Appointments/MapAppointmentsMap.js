import React from 'react';
import {Alert, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

// import { Container } from './styles';

const Appointments = () => {
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={map => (this.map = map)}
        mapType={mapType}
        showsUserLocation={true}
        followsUserLocation={true}
        onPress={e => {
          Alert.alert(
            'Coordenadas',
            'latitude= ' +
              e.nativeEvent.coordinates.latitude +
              ' longitude= ' +
              e.nativeEvent.coordinates.longitude,
          );
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {markers.map(marker => {
          return (
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              title={marker.title}
              description={marker.description}
              draggable
              image={marker.image}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default Appointments;
