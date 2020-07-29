import { getNotes, useNotes } from "./NoteProvider.js";
import { NoteHTMLConverter } from "./NoteHTMLCoverter.js";

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

const render = (noteArray) => {
    const allNotesConvertedToStrings = noteArray.map(
        (currentNote) => {
            return NoteHTMLConverter(currentNote)
        }
    ).join("")

    contentTarget.innerHTML = allNotesConvertedToStrings
}

export const NoteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })

}