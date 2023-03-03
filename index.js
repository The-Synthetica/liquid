const element= document.getElementById('element');
const cursor= document.getElementById('circleCursor');
const cursor2= document.getElementById('circleCursor2');
const body= document.querySelector('body');

const circles= document.getElementsByClassName('circle');
const circlesTouched= document.getElementsByClassName('circleTouched');

const base= document.getElementById('base');

const root= document.documentElement.style;

let cOutLeft= 0;
let cOutTop=  0;

setInterval(() => {
    create();
}, 200);

function create(){

    const newDiv= document.createElement('div');

    newDiv.classList.add('circle');

    const offsetLeft= randomInterval(0, 100);
    const randomScale= randomInterval(0.3, 0.5);
    const animationTime= randomInterval(5, 7);

    newDiv.style.scale= randomScale + '';
    newDiv.style.left= offsetLeft + '%';
    newDiv.style.animation= 'move1 ' + animationTime + 's' + ' linear forwards';
    
    element.appendChild(newDiv);

    setTimeout(() => {
        element.removeChild(newDiv);
    }, animationTime * 2000)
}


function randomInterval(min, max) {
    return (Math.random() * (max - min + 1) + min)
}

window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.pageX - 20 + 'px';
    cursor.style.top = e.pageY - 20 + 'px';

    cursor2.style.left = e.pageX - 20 + 'px';
    cursor2.style.top = e.pageY - 20 + 'px';

    cOutLeft= e.pageX - 50;
    cOutTop=  e.pageY - 50;

    root.setProperty('--offsetLeft', cOutLeft + 'px');
    root.setProperty('--offsetTop', cOutTop + 'px');
    
    const circleCursor={radius: cursor.offsetHeight/2, x:cOutLeft + cursor.offsetHeight/2, y:cOutTop + cursor.offsetHeight/2};
    const circle={radius: base.offsetHeight/2, x:base.offsetLeft + base.offsetHeight/2, y:base.offsetTop + base.offsetHeight/2};

    let dx= circleCursor.x - circle.x;
    let dy= circleCursor.y - circle.y;
    let distance= Math.sqrt(dx * dx + dy * dy);

    if(distance < (circleCursor.radius + circle.radius)){
        console.log('base collide');
    }

}, false);

setInterval(() => {

    if(window.matchMedia("(pointer: fine)").matches){
        // Si no es tactil
        
        root.setProperty('--offsetLeft', cOutLeft + 'px');
        root.setProperty('--offsetTop', cOutTop + 'px');
    
        for(let i=0; i<circles.length; i++){

            const circleCursor={radius: cursor.offsetHeight/4, x:cOutLeft + cursor.offsetHeight/4, y:cOutTop + cursor.offsetHeight/4};
            const circle={radius: circles[i].offsetHeight/2, x:circles[i].offsetLeft + circles[i].offsetHeight/2, y:circles[i].offsetTop + circles[i].offsetHeight/2};

            let dx= circleCursor.x - circle.x;
            let dy= circleCursor.y - circle.y;
            let distance= Math.sqrt(dx * dx + dy * dy);

            if(distance < (circleCursor.radius + circle.radius)){
                // circles[i].style.animationPlayState = 'paused';
                // circles[i].style.scale= '1.5';

                // circlesTouched.push(i);

                circles[i].classList.add('circleTouched');
                circles[i].classList.remove('circle')

                // circles[i].style.left= cOutLeft + 'px';
                // circles[i].style.top= cOutTop + 'px';
                // circles[i].style.transition= 'scale 2s linear, left 1s cubic-bezier(.02,1.31,.79,1.55), top 1s cubic-bezier(.02,1.31,.79,1.55)';
                // circles[i].style.animation='follow 2.5s cubic-bezier(.02,1.31,.79,1.55) forwards';
            }
        
        }
        
        for(let i=0; i<circlesTouched.length; i++){

            circlesTouched[i].style.transition= 'scale 2s linear, left 0.1s cubic-bezier(.02,1.31,.79,1.55), top 0.1s cubic-bezier(.02,1.31,.79,1.55)';

            circlesTouched[i].style.scale= '1.25';

            setTimeout(() => {
                circlesTouched[i].style.scale= '0';
            }, 2000);

            // circlesTouched[i].style.left= cOutLeft + 'px';
            // circlesTouched[i].style.top= cOutTop + 'px';
            
            circlesTouched[i].style.setProperty('--left', circlesTouched.offsetLeft + 'px');
            circlesTouched[i].style.setProperty('--top', circlesTouched[i].offsetTop + 'px');

            circlesTouched[i].style.setProperty('--left', cOutLeft + 'px');
            circlesTouched[i].style.setProperty('--top', cOutTop + 'px');

            root.setProperty('--offsetLeft', cOutLeft + 'px');
            root.setProperty('--offsetTop', cOutTop + 'px');

            circlesTouched[i].style.animation='follow 2s cubic-bezier(.02,1.31,.79,1.55) forwards';
        }
    }

}, 50);
