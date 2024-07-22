
//Functión para gestionar la petición y la respuesta desde un servicio WFS

export function fetchWFSData(url){
    return fetch(url,{
        method:'GET',
        mode: 'cors'
    })
    .then(response=>{
        if(response.status ===200){
            
            return response.json()
        } else{
            throw new Error ("Fetch API could not fetch the data")
        }
    })
    .catch(function(error){
        
        console.log(error);
        //throw error; 
    })
}