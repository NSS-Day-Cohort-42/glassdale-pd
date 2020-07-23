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

            contentTarget.innerHTML = officerHTMLRepresentations
        })
}