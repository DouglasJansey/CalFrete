import { Loader } from "@googlemaps/js-api-loader";
export const googleMaps = () =>{ 
const loader = new Loader({
  apiKey: process.env.REACT_APP_API_KEY,
  version: "weekly",
})
loader.load().then(() =>{
  const service = new window.google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: ['aveiro'],
      destinations: ['porto'],
      travelMode: 'DRIVING',
    },(res)=> res)
})

}
