import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLCoverter.js";

const contentTarget = document.querySelector(".noteList")
const eventHub = document.querySelector(".container")

const render = notes => {
    contentTarget.innerHTML = notes.map(
        (noteObject) => {
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



