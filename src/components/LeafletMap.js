import { useEffect } from 'react'
import styled from 'styled-components'
import { renderToStaticMarkup } from 'react-dom/server'

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { divIcon } from 'leaflet'

const Container = styled.div`
  width: 100%;
  height: 90vh;
`

export const LeafletMap = () => {
  const position = [52.229, 21.011]

  const iconMarkup = renderToStaticMarkup(
    <img src="/marker-blue.png" alt="blue marker" />
  )
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: 'blue-icon',
  })

  const makeAPICall = async () => {
    try {
      const response = await fetch(
        'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE',
        { mode: 'cors' }
      )
      const data = await response.json()
      console.log({ data })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    makeAPICall()
  }, [])

  return (
    <Container>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
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
