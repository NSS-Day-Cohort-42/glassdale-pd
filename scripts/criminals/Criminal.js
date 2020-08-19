const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("criminal__alibiButton")) {
        const [prompt, criminalId] = clickEvent.target.id.split("--")

        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalId
            }
        })

        eventHub.dispatchEvent(alibiEvent)
    }
})

export const CriminalHTMLConverter = (criminal, facilities) => {
    return `
        <section class="criminal">
            <h4>${criminal.name}</h4>

            <div class="criminal__age">Age: ${ criminal.age }</div>
            <div class="criminal__crime">Crime: ${ criminal.conviction }</div>
            <div class="criminal__term-start">Term start: ${ new Date(criminal.incarceration.start).toLocaleDateString('en-US') }</div>
            <div class="criminal__term-end">Term end: ${ new Date(criminal.incarceration.end).toLocaleDateString('en-US') }</div>

            <ul>
                ${
                    facilities.map(
                        (facility) => {
                            return `<li>${facility.facilityName}</li>`
                        }
                    ).join("")
                }
            </ul>


            <button id="criminal__alibiButton--${ criminal.id }">Alibis</button>
        </section>
    `
}
