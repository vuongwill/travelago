import React, {useEffect, useState} from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/header/Header";
import Details from "./components/details/Details";
import Sidebar from "./components/sidebar/Sidebar";

import Map from "./components/map/Map";
import { getPlacesData } from "./api/travelapi";

const App = () => {
    const [places, setPlaces] = useState([])
    const [childClicked, setChildClicked] =useState({})

    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})

    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState(0)

    const [filteredPlaces, setFilteredPlaces] = useState([])

    const [isloading, SetIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
          setCoordinates({ lat: latitude, lng: longitude });
        });
      }, []);

    useEffect(() => {
        const filteredPlaces = places.filter((place)=> place.rating>rating)

        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(()=>{
        if (bounds.sw && bounds.ne){
        SetIsLoading(true)
        getPlacesData(type,bounds.sw,bounds.ne)
        .then((data)=> {
            console.log(data)
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
            setFilteredPlaces([])
            SetIsLoading(false)
        })
        }
    }, [type,bounds])
    return (
            <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates}/>
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <Sidebar 
                    places={filteredPlaces.length ? filteredPlaces : places}
                    childClicked={childClicked}
                    isloading={isloading}
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />


                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
            </>
    )

}
export default App