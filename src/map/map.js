import React from 'react';

import Section from '../components/Section';
import messages from '../constants/message';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import usePoi from '../hooks/usePoi';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

    <GoogleMap defaultZoom={3} defaultCenter={{ lat: 45, lng: -95 }}>
        <MarkerClusterer averageCenter gridSize={50}>
        {props.markers.map((marker, index) => (
            <Marker key={index}
                label={{color: 'white', text:marker.name}}
                position={{ lat: marker.lat, lng: marker.lon }} />
        ))}
        </MarkerClusterer>
    </GoogleMap>
))

const Map = () => {
    const [poi] = usePoi();
    const {title, description } = messages.map;

    return (
        <Section title={title} description={description} >
            <MyMapComponent
                markers={poi}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </Section>
    );
};

export default Map;
