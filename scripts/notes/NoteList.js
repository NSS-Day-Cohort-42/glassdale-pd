import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLCoverter.js";
import { useCriminals } from "../criminals/CriminalProvider.js";

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")


eventHub.addEventListener("noteStateChanged", customEvent => {
    const allNotes = useNotes()
    render(allNotes)
})

const render = (notes) => {
    const criminals = useCriminals()

    contentTarget.innerHTML = notes.reverse().map(
        (noteObject) => {
            // Find the criminal that this note is about
            noteObject.criminal = criminals.find(
                (criminalObject) => {
                    return criminalObject.id === noteObject.criminalId
                }
            )

            // Send the criminal to the HTML converter
            return NoteHTMLConverter(noteObject)
        }
    ).join("")
}

export const NoteList = () => {
    getNotes()
        .then(useNotes)
        .then(render)
}

eventHub.addEventListener("showNotesClicked", NoteList)
eventHub.addEventListener("noteStateChanged", () => {
    const newNotes = useNotes()
    render(newNotes)
})



