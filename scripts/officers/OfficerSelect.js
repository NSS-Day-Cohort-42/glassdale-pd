import { getOfficers, useOfficers } from "./OfficerProvider.js";

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

// Capture that the user generated a change event by the browser
eventHub.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "officerSelect") {

        console.log("OfficerSelect: User chose an officer option")

        const officerSelectedEvent = new CustomEvent("officerSelected", {
            detail: {
                officerName: changeEvent.target.value  // "Suzie Police"
            }
        })

        console.log("Dispatch custom officerSelected event")
        eventHub.dispatchEvent(officerSelectedEvent)
    }
})

// Render the officer dropdown based on array input
const render = (officers) => {
    console.log("OfficerSelect: Officer select rendered to DOM")
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officers.map(
                    officer => {
                        return `<option value="${ officer.name }">${officer.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

export const OfficerSelect = () => {
    console.log("OfficerSelect: Initial render of officer select")
    getOfficers().then(() => {
        const allOfficers = useOfficers()
        render(allOfficers)
    })
}