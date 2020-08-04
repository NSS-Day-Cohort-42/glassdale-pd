import { useCriminals } from "./CriminalProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("associatesClicked", customEvent => {
    const contentTarget = document.querySelector(".associatesDialog")
    const criminalId = customEvent.detail.chosenCriminal

    const targetCriminal = useCriminals().find(
        (criminal) => criminal.id === parseInt(criminalId)
    )

    contentTarget.innerHTML = `${
        targetCriminal.known_associates.map(associate => {
            return `
                <h4>${associate.name}</h4>
                <div>${associate.alibi}</div>
            `
        }).join("")
    }`

    // Show the dialog element
    contentTarget.showModal()
})

export const AssociatesDialog = () => {
    return `
        <dialog class="associatesDialog">

        </dialog>
    `
}