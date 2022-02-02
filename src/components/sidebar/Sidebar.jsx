import React, {useState,useEffect,createRef} from "react";
import { CircularProgress, Grid, Typography,InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import useStyles from './styles'
import Details from '../details/Details'


const Sidebar = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    const classes = useStyles()

    const [elRefs, setElRefs] = useState([])

    console.log({childClicked})

    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef());
        
        setElRefs(refs)
      }, [places]);

    return (
    <div className={classes.container}>
        <Typography variant ='h4'>Places near you </Typography>
        {isLoading ? (
            <div className={classes.loading}>
                <CircularProgress/>
            </div>
        ) : (
            <>
        <FormControl className={classes.formControl}>
            <InputLabel>Places</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value='restaurants'>Restaurants</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
                <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>3 stars and above</MenuItem>
                <MenuItem value={4}>4 stars and above</MenuItem>
                <MenuItem value={4.5}>4.5 stars and above</MenuItem>
            </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i)=>(
                <Grid item key={i} xs={12}>
                    <Details 
                    place={place} 
                    selected={Number(childClicked)===i}
                    refProp={elRefs[i]}
                    />
                </Grid> 
            
            ))}
        </Grid>
        </>
    )}
    </div>
    )
}

export default Sidebar