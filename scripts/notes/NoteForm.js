import { saveNote } from "./NoteProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "noteForm--saveNote") {

        const noteTitle = document.querySelector("#noteForm--title")
        const noteAuthor = document.querySelector("#noteForm--author")
        const noteContent = document.querySelector("#noteForm--content")
        const noteCriminal = document.querySelector("#noteForm--criminal")

        const criminalId = parseInt(noteCriminal.value)

        // Do not create and save a criminal object if the detective did not choose a criminal
        if (criminalId !== 0) {
            // Make a new object representation of a note
            const newNote = {
                title: noteTitle.value,
                author: noteAuthor.value,
                content: noteContent.value,
                criminalId: parseInt(noteCriminal.value),
                timestamp: Date.now()
            }

            // Change API state and application state
            saveNote(newNote)
        }
        else {
            window.alert("Please choose a criminal, dummy!")
        }

    }
})

const render = (criminals) => {
    contentTarget.innerHTML = `
        <section class="noteForm">
            <input type="text" id="noteForm--title" placeholder="Enter note title" />
            <input type="text" id="noteForm--author" placeholder="Your name here" />
            <select id="noteForm--criminal">
                <option value="0">Select a criminal...</option>
                ${
                    criminals.map(
                        (criminalObject) => {
                            return `<option value="${criminalObject.id}">
                                ${ criminalObject.name }
                            </option>`
                        }
                    )
                }
            </select>
            <textarea id="noteForm--content" placeholder="Note text here"></textarea>

            <button id="noteForm--saveNote">Save Note</button>
        </section>
    `
    console.log("Note form rendered")
}

export const NoteForm = () => {
    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            render(criminals)
        })
}