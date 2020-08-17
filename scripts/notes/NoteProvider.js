let notes = []

const eventHub = document.querySelector(".container")

const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")

    eventHub.dispatchEvent(noteStateChangedEvent)
}

export const saveNote = (note) => {
    const jsonNote = JSON.stringify(note)

    return fetch('http://localhost:8088/notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
}

export const deleteNote = (noteId) => {
    return fetch(`http://localhost:8088/notes/${ noteId }`, {
        method: "DELETE"
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
    .catch(
        (error) => {
            console.log(error)
        }
    )
}

export const useNotes = () => {
    return notes.slice()
}

export const getNotes = () => {
    return fetch('http://localhost:8088/notes')
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })

}







