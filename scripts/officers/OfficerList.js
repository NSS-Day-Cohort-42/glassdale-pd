import { useOfficers, getOfficers } from "./OfficerProvider.js";
import { OfficerHTMLConverter } from "./OfficerHTMLConverter.js";

const contentTarget = document.querySelector(".officersContainer")

export const OfficerList = () => {

    getOfficers()
        .then(() => {
            const officerArray = useOfficers()

            let officerHTMLRepresentations = ""

            officerArray.forEach(officer => {
                officerHTMLRepresentations += OfficerHTMLConverter(officer)
            })

            contentTarget.innerHTML = `
                <h2>Glassdale PD Officers</h2>
                <article class="officerList">
                    ${ officerHTMLRepresentations }
                </article>
            `
        })
}