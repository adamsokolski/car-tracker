import { Marker, Popup } from 'react-leaflet'

export const MarkerComponent = ({
  id,
  latitude,
  longitude,
  icon,
  name,
  discriminator,
}) => {
  return (
    <Marker position={[latitude, longitude]} icon={icon}>
      <Popup>
        {name}
        <br />
        {discriminator}
      </Popup>
    </Marker>
  )
}
