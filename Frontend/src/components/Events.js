import React,{ useEffect} from 'react'

const Events = () => {
useEffect(() => {
    const es = new EventSource('http://127.0.0.1:3010/sse',
        {withCredentials: true});

    es.onmessage =  e => {        
        console.log(e.data)};     
    es.onerror = e => {
        console.log("EvensSource Failed:", e)}
    return () => {
        
        es.close()
    };
}, [])
    
   
   
   
   return(
       <div>mk</div>
   )


}
export default Events;
