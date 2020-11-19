import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { apiClient } from '../apiClient'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function CharterPage(props) {

    const [data, setData] = useState({
        name: '',
        height: "172",
        mass: "77",
        hairColor: "blond",
        skinColor: "fair",
        eyeColor: "blue",
        birthYear: "19BBY",
        gender: "male",
        homeworld: "",
        vehicles: [],
        films: ""
    })

    const fetchData = (arr) => {
        let promises = [];
        arr.map((request) => {
            promises.push(apiClient.get(request).then(res => res.data));
        })
        return Promise.all(promises)
    }


    const getVehicles = async (arr) => {
        const vehicles = await fetchData(arr);
        setData((prevState) => ({ ...prevState, vehicles: vehicles }))
    }

    const getFilms = async (arr) => {
        const films = await fetchData(arr);
        setData((prevState) => ({ ...prevState, films: films }))
    }

    useEffect(() => {
        apiClient.get(props.homeworld).then(res => { setData((prevState) => ({ ...prevState, homeworld: res.data.name })) });
        if (props.vehicles.length > 0) {
            getVehicles(props.vehicles)
        }
        if (props.films.length > 0) {
            getFilms(props.films)
        }
        setData({ ...data, ...props })

    }, [])
    const classes = useStyles();



    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <Button variant="contained" onClick={() => { props.setCharacter({}) }}>Back</Button>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {`Name: ${data.name}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Height: ${data.height}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Mass: ${data.mass}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Hair-color: ${data.hairColor}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Skin color: ${data.skinColor}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Eye-color: ${data.eyeColor}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Birth year: ${data.birthYear}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Gender: ${data.gender}`}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {`Homeword: ${data.homeworld}`}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">Vehicles:</Typography>
                    <List>
                        {data.vehicles.length > 0 && data.vehicles.map(vehicle => <ListItem key={vehicle.name}>
                            <Typography className={classes.pos} color="textSecondary">{`${vehicle.name} - ${vehicle.model}`}</Typography>
                        </ListItem>)}
                    </List>
                    <Typography className={classes.pos} color="textSecondary">Films:</Typography>
                    <List>
                        {data.films.length > 0 && data.films.map(film => <ListItem key={film.title}>
                            <Typography className={classes.pos} color="textSecondary">{`${film.title}`}</Typography>
                        </ListItem>)}
                    </List>

                </CardContent>
            </Card>
        </Container>

    )
}
