import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./Criminal.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";
import { AssociatesDialog } from "./AssociatesDialog.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facilities/CriminalFacilityProvider.js";
import { getFacilities, useFacilities } from "../facilities/FacilityProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

/*
    State variables
*/
let criminals = []
let criminalFacilities = []
let facilities = []
const chosenFilters = {
    crime: "0",
    officer: "0"
}

/*
    Main component initialization function
*/
export const CriminalList = () => {
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            criminals = useCriminals()
            criminalFacilities = useCriminalFacilities()
            facilities = useFacilities()

            render()
        })
}



/*
    Component render function
*/
const render = () => {
    console.log("CriminalList: Rendered to DOM")
    let criminalHTML = ""

    const arrayOfCriminalHTMLRepresentations = criminals.map(
        (criminal) => {
            // Get all of the criminal/facility relationships for this criminal
            const criminalFacilityRelationships = criminalFacilities.filter(
                (cf) => {
                    return criminal.id === cf.criminalId
                }
            )

            // Convert the relationship objects to facility objects
            const matchingFacilities = criminalFacilityRelationships.map(
                (currentRelationship) => {
                    return facilities.find(
                        (facility) => {
                            return currentRelationship.facilityId === facility.id
                        }
                    )
                }
            )

            return CriminalHTMLConverter(criminal, matchingFacilities)
        }
    )

    contentTarget.innerHTML = `
        <h2>Glassdale Convicted Criminals</h2>
        <article class="criminalList">
            ${arrayOfCriminalHTMLRepresentations.join("")}
        </article>
        ${AssociatesDialog()}
    `
}


/*
    Check component's state, and perform necessary filtering
*/
const filterCriminals = () => {
    criminals = useCriminals()
    const arrayOfCrimes = useConvictions()

    // If a crime was chosen, filter all criminals by that crime
    if (chosenFilters.crime !== "0") {
        const foundCrimeObject = arrayOfCrimes.find(
            (crime) => {
                return parseInt(chosenFilters.crime) === crime.id
            }
        )

        criminals = criminals.filter(
            (currentCriminalObject) => {
                return foundCrimeObject.name === currentCriminalObject.conviction
            }
        )
    }

    // If an officer was chosen, filter all criminals by that crime
    if (chosenFilters.officer !== "0") {
        criminals = criminals.filter(
            (currentCriminal) => {
                if (currentCriminal.arrestingOfficer === chosenFilters.officer) {
                    return true
                }
                return false
            }
        )
    }
}



/*
    EventHub event listeners
*/
eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    console.log("CriminalList: Custom officerSelected event heard on event hub")

    chosenFilters.officer = officerSelectedEvent.detail.officerName
    filterCriminals()
    render()
})


eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    console.log("CriminalList: Custom crimeSelected event heard on event hub")

    chosenFilters.crime = crimeSelectedEvent.detail.crimeId

    filterCriminals()
    render()
})


