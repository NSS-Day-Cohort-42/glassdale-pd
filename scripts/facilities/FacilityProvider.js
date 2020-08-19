let facilities = []

export const useFacilities = () => {
    return facilities.slice()
}



export const getFacilities = () => {
    return fetch("https://criminals.glassdale.us/facilities")
        .then(response => response.json())
        .then(data => {
            facilities = data
        })
}