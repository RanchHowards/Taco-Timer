const pan = document.getElementById("frying-pan");
const panRadius = 300;
const panRadiusX = pan.offsetLeft + pan.clientWidth / 2;
const panRadiusY = pan.offsetTop + pan.clientHeight / 2;
const undo = document.querySelector('button');
let size = 200;
const first = 3;
const second = 10;
const third = 3;
const inputs = document.querySelectorAll('input');
const stylesheet = document.styleSheets[0];
let coordinates = {};


const tacoClass = document.querySelector('.taco')
undo.addEventListener('click', removeTaco);

inputs.forEach(input => input.addEventListener('change', handleChange));
inputs.forEach(input => input.addEventListener('mouseMove', handleChange));

function handleChange(event) {

    if (this.type === 'range') {
        size = this.value;
        stylesheet.cssRules[0].style.setProperty('--taco-size', this.value + 'px');
        let updateTacos = document.querySelectorAll('.taco');

        updateTacos.forEach(val => {
            let loc = {}
            loc.clientX = val.dataset.clientx;
            loc.clientY = val.dataset.clienty;
            tacoCoordinates(loc);



            val.style.setProperty("Left", coordinates.left);
            val.style.setProperty("Top", coordinates.top);
        })

    }
    else if (this.name === 'first') {
        stylesheet.cssRules[0].style.setProperty('--firstFlip', this.value + 's');
    }
    else if (this.name === 'second') {
        stylesheet.cssRules[0].style.setProperty('--secondFlip', this.value + 's');
    }
    else stylesheet.cssRules[0].style.setProperty('--thirdFlip', this.value + 's');

}
// pan.addEventListener('click', function (event) { addTaco(event) }); //not sure why keeps adding tacos on top
$('#frying-pan').click(function (event) {
    addTaco(event);

})
$('#frying-pan').on('click', '.taco', function (event) {
    event.stopPropagation();
    let taco = $(this);
    taco.text("")
        .removeClass('done')
    if (taco.data('turn') === 0) {
        taco.removeClass('cooking trans');
        taco.css('background-color');
        taco.addClass('trans2 cooking2')
            .data("turn", 1);
        taco[0].addEventListener('transitionend', () => {
            taco.addClass('done2')
                .text("FLIP")
        })

    }
    else if (taco.data("turn") === 1) {
        taco.removeClass('cooking2 trans2');
        taco.css('background-color');
        taco.addClass('trans3 cooking3')
            .data("turn", 2)
        taco[0].addEventListener('transitionend', () => {
            taco.addClass('done3')
                .text("DONE")
        })
    }
    else $(this).remove();

})
function removeTaco() {
    var badTaco = document.querySelectorAll('.taco:last-child');
    badTaco[0].remove()
}

function addTaco(loc) {
    tacoCoordinates(loc);
    let taco = $("<div>")
        .addClass('taco trans')
        .appendTo("#frying-pan")
        .css(coordinates)
        .data("turn", 0)
        .attr({ "data-clientX": loc.clientX, "data-clientY": loc.clientY })

    taco.css('background-color');
    taco.addClass('cooking');

    taco[0].addEventListener('transitionend', () => {
        taco.addClass('done')
            .text("flip")
    });
}


function tacoCoordinates(loc) {
    let x = loc.clientX - panRadiusX;
    let y = -loc.clientY + panRadiusY; //had to flip because Y is measured from top screen down
    let angle = (x < 0) ? Math.atan(y / x) + Math.PI : Math.atan(y / x);

    let xLimit = Math.cos(angle) * (panRadius - size / 2) + panRadiusX - size / 2;
    let yLimit = -  Math.sin(angle) * (panRadius - size / 2) + panRadiusY - size / 2;
    // console.table({
    //     'clientX': loc.clientX,
    //     'clientY': loc.clientY,
    //     'pageX': loc.pageX,
    //     'pageY': loc.pageY,
    //     'x': x,
    //     'y': y,
    //     'xLimit': xLimit,
    //     'yLimit': yLimit,
    //     'angle': angle
    // })
    if (x ** 2 + y ** 2 > (panRadius - size / 2) ** 2) {
        return coordinates = {
            "left": xLimit + 'px',
            "top": yLimit + 'px'
        };

    }
    else {
        return coordinates = {
            "left": loc.clientX - size / 2 + 'px',
            "top": loc.clientY - size / 2 + 'px'
        }

    }
}