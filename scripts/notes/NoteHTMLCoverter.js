import { deleteNote } from "./NoteProvider.js"


const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("noteBtn--")) {
        const [ prompt, noteIdString ] = clickEvent.target.id.split("--")  // "3"

        deleteNote(noteIdString)
    }
})

export const NoteHTMLConverter = (noteObject) => {
    return `
        <section class="note">
            <div class="note--title">Title: ${ noteObject.title }</div>
            <div class="note--title">Criminal: ${ noteObject.criminal.name }</div>
            <div class="note--content">${ noteObject.content }</div>
            <div class="note--author">Author: ${ noteObject.author }</div>
            <div class="note--timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>

            <button id="noteBtn--${ noteObject.id }">Delete</button>
        </section>
    `
}
