import React ,{ useState, useEffect} from 'react'
import Learner from './Learner'
import DiagModal from '../components/DiagModal'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Alert } from 'reactstrap'

const GET_CLASSIFIER = gql`
query GetClassifie{
    getClassifier{
        featureTypes
        classifierStatus
  }
}
`

 const TheApp = () => {

    const { data } = useQuery(GET_CLASSIFIER);
    const [ baseExists, setBaseExists ] = useState();
  
    // Effect triggered on mount or when the data variable modified
    useEffect(()=>{
      if(data && data.getClassifier && data.getClassifier.classifierStatus )
        {setBaseExists(true)
      }else
        {setBaseExists(false)     
        }
    },[data])

   
    //data && data.getClassifier && console.log(data.getClassifier.classifierStatus);
    const istate = data && data.getClassifier && data.getClassifier.classifierStatus  

    const typesOfFeatures = data && data.getClassifier && data.getClassifier.featureTypes 

    return (
        baseExists ?
        <>
       <Learner initialState={istate}/>  
            <hr />
            <h2>Run Diagnostics</h2>
            <DiagModal typesOfFeatures={typesOfFeatures} />
        </>
        :
        <>            
            <Alert color="warning"> 
                <h1>Warning</h1>
                <p>To start diagnosing first you must upload a  
                    <a href="/external-api" className="alert-link"> database</a></p>
            </Alert>

        </>
    )
}
export default TheApp;