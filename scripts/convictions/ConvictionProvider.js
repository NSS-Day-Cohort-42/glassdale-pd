let convictions = []

export const useConvictions = () => convictions.slice()

export const getConvictions = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last `then()` sets the local `convictions`
        variable to what is in the response from the API.
    */
   return fetch("https://criminals.glassdale.us/crimes")
       .then(response => response.json())
       .then(crimeArray => {
           convictions = crimeArray
       })
}