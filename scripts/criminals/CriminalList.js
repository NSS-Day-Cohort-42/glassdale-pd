import { useCriminals, getCriminals } from "./CriminalProvider.js";
import { CriminalHTMLConverter } from "./Criminal.js";

const contentTarget = document.querySelector(".criminalsContainer")

export const CriminalList = () => {

    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            let criminalHTML = ""
            criminals.forEach(criminal => {
                criminalHTML += CriminalHTMLConverter(criminal)
            })

            contentTarget.innerHTML = `
                <h2>Glassdale Convicted Criminals</h2>
                <article class="criminalList">
                    ${ criminalHTML }
                </article>
            `
        })
}