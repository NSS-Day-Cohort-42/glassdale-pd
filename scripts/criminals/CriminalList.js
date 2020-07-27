import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./Criminal.js";
import { useConvictions } from "../convictions/ConvictionProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    // GOAL: Filter displayed criminals by the crime that was chosen

    // Which crime was chosen?????
    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId  // 9

    // Get actual crime name. Number is not enough.
    const arrayOfCrimes = useConvictions()
    const foundCrimeObject = arrayOfCrimes.find(
        (crime) => {
            return parseInt(crimeThatWasSelected) === crime.id   // NaN  "falsy"
        }
    ) // { id: 9, name: "Theft" }

    // Filter criminal array to only criminal that have a matching `conviction` property value
    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals.filter(
        (currentCriminalObject) => {
            return foundCrimeObject.name === currentCriminalObject.conviction
        }
    ) // [ {}, {}, {}]

    render(filteredCriminals)
})

const render = (arrayOfCriminals) => {
    let criminalHTML = ""

    arrayOfCriminals.forEach(criminal => {
        criminalHTML += CriminalHTMLConverter(criminal)
    })

    contentTarget.innerHTML = `
        <h2>Glassdale Convicted Criminals</h2>
        <article class="criminalList">
            ${ criminalHTML }
        </article>
    `
}

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            render(criminals)
        })
}