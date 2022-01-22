import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { divIcon } from 'leaflet'

// Components
import { Error } from './Error'

const Container = styled.div`
  width: 100%;
  height: 90vh;
`

export const LeafletMap = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [markers, setMarkers] = useState([])
  const position = [52.229, 21.011]

  const iconMarkup = renderToStaticMarkup(
    <img src="/marker-blue.png" alt="blue marker" />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: 'blue-icon',
  })

  useEffect(() => {
    fetch('/api-client-portal/map?objectType=VEHICLE')
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result.objects)
          setIsLoaded(true)
        },

        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  useEffect(() => {
    if (isLoaded) {
      console.log(items)
      /*   for (const car of items) {
        console.log(
          Number(car.location.latitude.toFixed(4)),
          Number(car.location.longitude.toFixed(4))
        )
      } */

      const temp = items.map((car) => (
        <Marker
          key={car.id}
          position={[car.location.latitude, car.location.longitude]}
          icon={customMarkerIcon}
        >
          <Popup>{car.name}</Popup>
        </Marker>
      ))
      setMarkers(temp)
    }
  }, [isLoaded])

  return (
    <Container>
      {error && <Error />}
      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />

        {markers}
      </MapContainer>
    </Container>
  )
}
