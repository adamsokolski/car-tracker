import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { divIcon } from 'leaflet'

const Container = styled.div`
  width: 100%;
  height: 90vh;
`

export const LeafletMap = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const position = [52.229, 21.011]

  const iconMarkup = renderToStaticMarkup(
    <img src="/marker-blue.png" alt="blue marker" />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: 'blue-icon',
  })

  useEffect(() => {
    fetch('https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE', {
      mode: 'cors',
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setItems(result)
          console.log(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  return (
    <Container>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarkerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[52.229, 21.1]} icon={customMarkerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  )
}
