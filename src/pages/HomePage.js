import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CharacterPage from './CharterPage';
import Container from '@material-ui/core/Container';
import { apiClient } from '../apiClient';

export default function HomePage(props) {

    const [people, setPeople] = useState([]);
    const [character, setCharacter] = useState({})

    useEffect(() => {

        function getAllStarwarsPeople() {
            let people = [];
            return apiClient.get("/people")
                .then(response => {
                    // collect people from first page
                    people = response.data.results;
                    return response.data.count;
                })
                .then(count => {
                    // exclude the first request
                    const numberOfPagesLeft = Math.ceil((count - 1) / 10);
                    let promises = [];
                    // start at 2 as you already queried the first page
                    for (let i = 2; i <= numberOfPagesLeft; i++) {
                        promises.push(apiClient.get(`/people?page=${i}`));
                    }
                    return Promise.all(promises);
                })
                .then(response => {
                    //get the rest records - pages 2 through n.
                    people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
                    return people;
                })
        }

        (async () => {
            const starwarsPeople = await getAllStarwarsPeople();
            setPeople(starwarsPeople)
        })();
    }, []);

    const handleChange = (event, obj) => {
        setCharacter(obj)
    }

    return (

        <Container maxWidth="sm">
            {Object.keys(character).length > 0 ? < CharacterPage {...character} setCharacter={setCharacter} /> :
                <Autocomplete
                    id="combo-box-demo"
                    options={people}
                    onChange={handleChange}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
                />
            }
        </Container>

    )

}
