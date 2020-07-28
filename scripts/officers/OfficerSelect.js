import { getOfficers, useOfficers } from "./OfficerProvider.js";

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

// Capture that the user generated a change event by the browser
eventHub.addEventListener("change", (changeEvent) => {

})

// Render the officer dropdown based on array input
const render = (officers) => {
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officers.map(
                    officer => {
                        return `<option value="${ officer.id }">${officer.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

export const OfficerSelect = () => {
    getOfficers().then(() => {
        const allOfficers = useOfficers()
        render(allOfficers)
    })
}