import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'

// Leaflet
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { divIcon } from 'leaflet'

// Components
import { Error } from './Error'
import { MarkerComponent } from './MarkerComponent'

import useFetch from '../hooks/useFetch'

// styled-components

const Container = styled.div`
  width: 100%;
  height: 90vh;
`

const Map = styled(MapContainer)`
  background: #090909;
`

export const LeafletMap = () => {
  const [vehiclesMarkers, setVehiclesMarkers] = useState([])
  const [parkingsMarkers, setParkingsMarkers] = useState([])
  const [pointsOfInterestMarkers, setPointsOfInterestMarkers] = useState([])
  const position = [52.229, 21.011]

  // VEHICLES
  const {
    data: vehicles,
    isLoaded: vehiclesAreLoaded,
    error: vehiclesError,
  } = useFetch('/api-client-portal/map?objectType=VEHICLE')
  useEffect(() => {
    const blueIcon = renderToStaticMarkup(
      <img src="/marker-blue.png" alt="blue marker" />
    )
    const blueMarker = divIcon({
      html: blueIcon,
      className: 'no-shadow1',
    })
    if (vehiclesAreLoaded && vehicles) {
      const temp = vehicles.map((car) => (
        <MarkerComponent
          key={car.id}
          latitude={car.location.latitude}
          longitude={car.location.longitude}
          icon={blueMarker}
          name={car.name}
          discriminator={car.discriminator}
        />
      ))
      setVehiclesMarkers(temp)
    }
  }, [vehiclesAreLoaded, vehicles])

  // PARKINGS
  const {
    data: parkings,
    isLoaded: parkingsAreLoaded,
    error: parkingsError,
  } = useFetch('/api-client-portal/map?objectType=PARKING')

  useEffect(() => {
    const orangeIcon = renderToStaticMarkup(
      <img src="/marker-orange.png" alt="orange marker" />
    )
    const orangeMarker = divIcon({
      html: orangeIcon,
      className: 'no-shadow2',
    })
    if (parkingsAreLoaded && parkings) {
      console.log(parkings)
      const temp = parkings.map((car) => (
        <MarkerComponent
          key={car.id}
          latitude={car.location.latitude}
          longitude={car.location.longitude}
          icon={orangeMarker}
          name={car.name}
          discriminator={car.discriminator}
        />
      ))
      setParkingsMarkers(temp)
    }
  }, [parkingsAreLoaded, parkings])

  // Points of interest
  const {
    data: pointsOfInterest,
    isLoaded: pointsOfInterestAreLoaded,
    error: pointsOfInterestError,
  } = useFetch('/api-client-portal/map?objectType=POI')

  useEffect(() => {
    const purpleIcon = renderToStaticMarkup(
      <img src="/marker-purple.png" alt="purple marker" />
    )
    const purpleMarker = divIcon({
      html: purpleIcon,
      className: 'no-shadow3',
    })

    if (pointsOfInterestAreLoaded && pointsOfInterest) {
      console.log(pointsOfInterest)
      const temp = pointsOfInterest.map((car) => (
        <MarkerComponent
          key={car.id}
          latitude={car.location.latitude}
          longitude={car.location.longitude}
          icon={purpleMarker}
          name={car.name}
          discriminator={car.discriminator}
        />
      ))
      setPointsOfInterestMarkers(temp)
    }
  }, [pointsOfInterestAreLoaded, pointsOfInterest])

  return (
    <Container>
      {vehiclesError && parkingsError && pointsOfInterestError && <Error />}
      <Map
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        {vehiclesMarkers}
        {parkingsMarkers}
        {pointsOfInterestMarkers}
      </Map>
    </Container>
  )
}
