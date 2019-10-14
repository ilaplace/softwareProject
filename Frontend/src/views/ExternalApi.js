import React, { useState , useEffect} from "react";
import FileUpload from "../components/FileUpload";
import axios from 'axios';
import { Alert } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import { Button } from 'reactstrap'
import gql from 'graphql-tag';
import { configURI } from '../constants'


const DELETE_DATABASE = gql`
    mutation DeleteDatabase{
        deleteDatabase

}`


const ExternalApi = ({ data, refetch}) => {
  const [success, setSuccess] = useState(false);
  const [deleteDatabase] = useMutation(DELETE_DATABASE);
  const [ baseExists, setBaseExists ] = useState();
  
  // Effect triggered on mount or when the data variable modified
  useEffect(()=>{
    if(data && data.getClassifier && data.getClassifier.classifierStatus )
      {setBaseExists(true)
    }
      
    else
      {setBaseExists(false)
      }
  },[data])

  
  const handleDelete = () => {
    deleteDatabase()
    setBaseExists(false)
    refetch()

  };
     
  const sendToServer = async (data) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(configURI.url.API_URL.concat("api/upload"),
        data, { headers: { Authorization: token ? `Bearer ${token}` : "" } });
      console.log(response);
      setSuccess(true)
      setBaseExists(true)
      refetch()
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <div className="mb-5">

        {success ? <Alert>
          <h3>Info</h3>
          <p>Your database is successfully Uploaded</p></Alert> : null}

        <h1>Databases</h1>
        {baseExists ?
        <>
         <h2>You have uploaded a database</h2> 
         <Button className="my-3" color="danger" onClick={handleDelete}>Delete Database</Button>
        </> : (
          <>
        <p>You can upload your database from here!</p>
        <FileUpload sendToServer={sendToServer} /> 
        </>
        )}
      </div>
      

      {/* <div className={`result-block ${showResult && "show"}`}> */}

    </>
  );
};

export default ExternalApi;
