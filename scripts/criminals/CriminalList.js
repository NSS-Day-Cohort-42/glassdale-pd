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

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    console.log("CriminalList: Custom officerSelected event heard on event hub")
    // GOAL: FIlter displayed criminals by the arresting officer that was chosen

    // Which officer was chosen: "Suzie Police" -> arrestingOfficer
    const officerChosen = officerSelectedEvent.detail.officerName

    // Filter criminal array based on what's chosen
    const allCriminals = useCriminals()

    // Array of criminals that were arrested by chosen officer
    const filteredByOfficer = allCriminals.filter(
        (currentCriminal) => {
            if (currentCriminal.arrestingOfficer === officerChosen) {
                return true
            }
            return false
        }
    )

    criminals = filteredByOfficer

    render()
})


eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    console.log("CriminalList: Custom crimeSelected event heard on event hub")

    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId  // 9

    const arrayOfCrimes = useConvictions()
    const foundCrimeObject = arrayOfCrimes.find(
        (crime) => {
            return parseInt(crimeThatWasSelected) === crime.id   // NaN  "falsy"
        }
    )

    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals.filter(
        (currentCriminalObject) => {
            return foundCrimeObject.name === currentCriminalObject.conviction
        }
    )

    criminals = filteredCriminals

    render()
})

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
            ${ arrayOfCriminalHTMLRepresentations.join("") }
        </article>
        ${ AssociatesDialog() }
    `
}

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