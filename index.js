let slider = document.querySelector("#slider")
let output = document.querySelector(".dim")
let board = document.querySelector(".drawboard")

const clearGrid = () => {
    while (board.lastChild) {
        board.removeChild(board.lastChild)
    }
}

let blockColor = "black"

const createBlock = () => {
    let block = document.createElement('block')
    block.style.cssText = "margin: 0; padding 0; border: 1px solid grey; flex: 1;"

    // attach listeners to block on hover
    block.addEventListener('mouseover', () => {
        if (blockColor == "random") {
            let r = Math.floor(Math.random() * 256)
            let g = Math.floor(Math.random() * 256)
            let b = Math.floor(Math.random() * 256)
            block.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        } else {
            block.style.backgroundColor = blockColor
        }
        
    })
    return block
}

const populateGrid = (dim) => {
    clearGrid()
    for (let i=0; i<dim; i++) {
        let row = document.createElement('div')
        row.style.cssText = "margin: 0; padding: 0; display: flex; flex: 1; background-color: white;"
        for (let j=0; j<dim; j++) {
            let block = createBlock()
            row.appendChild(block)
        }
        
        board.appendChild(row)
    }
}
populateGrid(slider.value)
output.innerHTML = `${slider.value} x ${slider.value}`; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.addEventListener('input', (evt) => {
    let dim = evt.target.value;
    output.innerHTML = `${dim} x ${dim}`
    populateGrid(dim)
})

let clearBtn = document.querySelector("#clear-btn")
clearBtn.addEventListener('click', () => {
    clearGrid()
    populateGrid(slider.value)
})

let rainbowRoad = document.querySelector("#rainbow-road")
rainbowRoad.addEventListener('click', () => {
    if (rainbowRoad.getAttribute("data-key") == "active") {
        blockColor = "black"
        rainbowRoad.innerHTML = "Rainbow road"
        rainbowRoad.style.cssText
        rainbowRoad.setAttribute("data-key", "inactive")
    } else {
        blockColor = "random"
        rainbowRoad.innerHTML = "Black"
        rainbowRoad.setAttribute("data-key", "active")
    }
    rainbowRoad.classList.toggle("rainbow")
})