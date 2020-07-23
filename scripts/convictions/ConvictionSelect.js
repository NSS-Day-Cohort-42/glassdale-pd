/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

const render = convictionsCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(
                    convictionObject => {
                        return `<option>${convictionObject.name}</option>`
                    }
                ).join("")
            }
        </select>
    `
}

export const ConvictionSelect = () => {
    getConvictions().then(() => {
        // Get all convictions from application state
        const convictions = useConvictions()

        render(convictions)
    })
}