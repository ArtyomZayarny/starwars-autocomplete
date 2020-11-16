import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { apiClient } from '../apiClient';
import axios from 'axios'

export default function HomePage(props) {

    const [people, setPeople] = useState([])

    useEffect(() => {

        function getAllStarwarsPeople() {
            let people = [];
            // first page
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
    }, [])

    return (

        <Autocomplete
            id="combo-box-demo"
            options={people}
            getOptionLabel={(option) => option.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Character" variant="outlined" />}
        />
    )

}
