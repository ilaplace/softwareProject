import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import Diagnose from '../views/Diagnose'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'

const GET_DIAGNOSE_RESPONSE = gql`
{
    diagnoseResponse @client
}
`
const ModalDiag = ({typesOfFeatures}) => {
    
    const [state, setMyState] = useState(false);
    const [secondState, setSecondState] = useState(false);
    const [patientNumber, setPatientNumber] = useState(1);
    const { data } = useQuery(GET_DIAGNOSE_RESPONSE);
    
    const toggle = () => {
        setMyState(!state)
    }

    const secondToggle = () => {
        setMyState(false)
        setSecondState(!secondState)
    }

    const selectHandler = (event) => {
        setPatientNumber(event.target.value);
    }
   data && data.diagnoseResponse && console.log(data.diagnoseResponse);
//    useEffect(() => {
//     data && data.diagnoseResponse && secondToggle();
//    }, [data])
    
    return (
        <div>
            {/* <Form >
                <Label>Please select the number of patients that you want to diagnose</Label>
                <FormGroup >
                 <Label for="Select the number of patients"></Label>
                    <Input type="select" name="select" style={{width: "20%"}} onChange={selectHandler} value={patientNumber}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                </FormGroup>
            </Form> */}
            <Diagnose classifier={typesOfFeatures} numberOfPatients={patientNumber}/>
            {/* <Button onClick={toggle} className="my-3">Diagnose</Button>{' '} */}
            <Button color="primary" className="my-3" onClick={secondToggle}>Forward</Button>

             {/* Patient register modal */}
            <Modal isOpen={state} toggle={toggle}>
                <ModalHeader toggle={toggle}>Diagonse</ModalHeader>
                <ModalBody>

                    <Diagnose classifier={typesOfFeatures} numberOfPatients={patientNumber} />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={secondToggle}>Forward</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
             {/* Result Modal */}
            <Modal isOpen={secondState} toggle={secondToggle}>
                <ModalHeader toggle={secondToggle}>Results</ModalHeader>
                <ModalBody>
                {data && data.diagnoseResponse}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={secondToggle}>Ok</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ModalDiag;