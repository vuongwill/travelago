import axios from "axios";

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

// const options = {
//     params: {
//       bl_latitude: '11.847676',
//       tr_latitude: '12.838442',
//       bl_longitude: '109.095887',
//       tr_longitude: '109.149359',
//     },
//     headers: {
//       'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//       'x-rapidapi-key': '078d46b5cemsh1d7820b8eced7c1p19d48djsn22c4933dd5d3'
//     }
//   };

// export const getPlacesData = async (sw, ne) => {
//     try {
//         const {data:{data}} = await axios.get(URL, options)
//         return data

//     } catch (error) {
//         console.log(error)

//     }
// }


export const getPlacesData = async (type, sw, ne) => {
    try {
      const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
          'x-rapidapi-key': 'API_KEY',
        }
      })
      return data
    } catch (error) {
      console.log(error)
    }
  };
