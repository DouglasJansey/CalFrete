
export const googleMaps = (cepOrigem, cepDestino) =>{ 
  let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${cepOrigem}&destinations=${cepDestino}&key=${process.env.REACT_APP_API_KEY}`,
      };
    return config;
}