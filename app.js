const containter = document.querySelector("#container > div");
// default
generateGrid(16);
addColor();

const clearButton = document.querySelector("button#clear");
clearButton.addEventListener("click", function(e) {
    clearColor();
});

const button = document.querySelector("button#start_over");
button.addEventListener("click", function(e) {
    let newSize = window.prompt("Please enter the number of squares per side");
    if (!newSize) return;
    while (newSize <=0 || newSize > 100) {
        newSize = window.prompt("Please enter a number more than 0 and less than 100");
        if (!newSize) return;
    }

    const rowDivs = Array.from(document.querySelectorAll(".rowDiv"));
    rowDivs.forEach(rowDiv => rowDiv.remove());

    generateGrid(newSize);
    addColor();
})

function generateGrid(gridSize) {
    for (let row=0; row<gridSize; row++) {
        const rowDiv = document.createElement("div");
        rowDiv.className = "rowDiv";
        rowDiv.setAttribute("style", `display:flex; height:calc(100% * (1/${gridSize}));`);
        for(let column=0; column<gridSize; column++) {
            const div = document.createElement("div");
            div.setAttribute("style", `flex: 1, 1, auto; width: calc(100% * (1/${gridSize}));`)
            div.className = "square";
            rowDiv.appendChild(div);
        }
        containter.appendChild(rowDiv);  
    }
}

function addColor() {
    const divs = Array.from(document.querySelectorAll(".square"));
    const rgb = randomRGB();
    const reduceR = rgb[0] * 0.1;
    const reduceG = rgb[1] * 0.1;
    const reduceB = rgb[2] * 0.1;

    divs.forEach(div => div.addEventListener("mouseenter", function(e) {
        // div.classList.add("div_color");
        const rgbCurrent = div.style.background;
        if (!rgbCurrent) {
            div.style.background = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;  
        } else {
            const rgbValue = convertRGBToArray(rgbCurrent);
            if (rgbValue[0] > 0 || rgbValue[1] > 0 || rgbValue[2] > 0) {
                const r = Math.floor(rgbValue[0] - reduceR) < 0 ? 0 : Math.floor(rgbValue[0] - reduceR);
                const g = Math.floor(rgbValue[1] - reduceG) < 0 ? 0 : Math.floor(rgbValue[1] - reduceG);
                const b = Math.floor(rgbValue[2] - reduceB) < 0 ? 0 : Math.floor(rgbValue[2] - reduceB);
                console.log(`rgb(${r}, ${g}, ${b})`);
                div.style.background = `rgb(${r}, ${g}, ${b})`
            }       
        }
    }))

}

function clearColor() {
    const divs = Array.from(document.querySelectorAll(".square"));
    divs.forEach(div => div.style.background = "rgb(255, 255, 255)")
}

function randomRGB() {
    const r = Math.round(Math.random() * 255)
    const g = Math.round(Math.random() * 255)
    const b = Math.round(Math.random() * 255)
    return [r, g, b]
}

function convertRGBToArray(rgbValue) {
    // rgb(220, 220, 220)
    const rgb = rgbValue.substring(rgbValue.indexOf('(') + 1, rgbValue.indexOf(')'))
    const rgbArray = rgb.split(',');
    return [Number(rgbArray[0]), Number(rgbArray[1]), Number(rgbArray[2])]
}
