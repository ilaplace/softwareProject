import React, { useState } from 'react';
import { Button, Alert } from "reactstrap";
import axios from 'axios'
import ReactDataSheet from 'react-datasheet';
import { useApolloClient } from '@apollo/react-hooks';
import 'react-datasheet/lib/react-datasheet.css';
import { configURI } from '../constants'

const Diagnose = ({ classifier, numberOfPatients }) => {

    // If condition the avoid this error if classifier could not be read


    var objects = [];

    for (var i = 0; i < classifier.length; i++) {
        objects.push({ value: '' });
    }

    // const grid = [
    //     [{ value: 'A', readOnly: true },
    //      { value: 'B', readOnly: true },
    //      { value: 'C', readOnly: true }]]

    const grid = []
    const header = []
    for (var k = 0; k < classifier.length; k++) {
        header.push({ value: classifier[k], readOnly: true })
    }
    grid.push(header)

    for (var j = 0; j < numberOfPatients; j++) {
        grid.push(objects)
    }
    const [myState, setMyState] = useState(grid);
    const [submitted, setSubmitted] = useState(false);

    const client = useApolloClient();

    const sendToServer = async (data) => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(configURI.url.API_URL.concat("api/diagnose"),
                data, {
                    headers:
                    {
                        Authorization: token ? `Bearer ${token}` : ""
                    }
                }
            );
            client.writeData({
                data: { diagnoseResponse: response.data.message }
            })
            console.log(response);
        } catch (error) {
            console.error(error)
        }
    };
    // When submitted send the registered data to server
    const handleSubmit = (e) => {
        setSubmitted(true);
        e.preventDefault();
        sendToServer(myState.concat(
            { "numberOfPatients": numberOfPatients }));
    };
    return (
        <div>
            {(submitted == true) ? <Alert color="success">Submitted</Alert> : ""}
            <ReactDataSheet
                data={myState}
                overflow={'clip'}
                valueRenderer={(cell) => cell.value}
                onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
                onCellsChanged={changes => {
                    const grid = myState.map(row => [...row])
                    changes.forEach(({ cell, row, col, value }) => {
                        grid[row][col] = { ...grid[row][col], value }
                    })
                    setMyState(grid)
                }}
            />


            <Button color="primary" className="mt-5" onClick={handleSubmit}>
                Submit
        </Button>



        </div>
    )
}

export default Diagnose;