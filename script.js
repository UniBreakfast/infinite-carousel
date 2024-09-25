const carousel = document.querySelector('.carousel');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');
const slides = carousel.querySelector('.slides');
const slideCount = slides.children.length;

let i = 0;
let busy = false;
let direction;
let rotationsLeft = 0;

prevBtn.onclick = rotateRight;
nextBtn.onclick = rotateLeft;

async function rotateLeft() {
  if (busy) {
    if (direction == 'left') {
      rotationsLeft++;
      slides.style.transitionTimingFunction = 'linear';
    } else {
      rotationsLeft = 0;
      slides.style.transitionTimingFunction = 'ease-out';
    }
    return;
  }

  direction = 'left';
  busy = true;
  i++;

  if (i != slideCount) {
    await rotateTo(i);

  } else {
    slides.append(slides.firstElementChild);

    await jumpTo(i - 2);
    await rotateTo(i - 1);
  
    slides.prepend(slides.lastElementChild);
  
    await jumpTo(i = 0);
  }

  busy = false;

  if (rotationsLeft) {
    rotationsLeft--;

    if (rotationsLeft == 0) {
      slides.style.transitionTimingFunction = 'ease-out';
    }

    await rotateLeft();
    
  } else {
    slides.style.transitionTimingFunction = 'ease-in-out';
  }
}

async function rotateRight() {
  if (busy) {
    if (direction == 'right') {
      rotationsLeft++;
      slides.style.transitionTimingFunction = 'linear';
    } else {
      rotationsLeft = 0;
      slides.style.transitionTimingFunction = 'ease-out';
    }
    return;
  }

  direction = 'right';
  busy = true;
  i--;

  if (i != -1) {
    await rotateTo(i);

  } else {
    slides.prepend(slides.lastElementChild);

    await jumpTo(1);
    await rotateTo(0);
  
    slides.append(slides.firstElementChild);
  
    await jumpTo(i = slideCount - 1);
  }

  busy = false;

  if (rotationsLeft) {
    rotationsLeft--;

    if (rotationsLeft == 0) {
      slides.style.transitionTimingFunction = 'ease-out';
    }
    
    await rotateRight();

  } else {
    slides.style.transitionTimingFunction = 'ease-in-out';
  }
}

async function rotateTo(i) {
  carousel.style.setProperty('--index', i);

  await endTransition(slides);
}

async function jumpTo(i) {
  slides.style.transitionDuration = '0s';
  carousel.style.setProperty('--index', i);

  await skipFrame();
  await skipFrame();

  slides.style.transitionDuration = null;
}

function skipFrame() {
  return new Promise(requestAnimationFrame);
}

function endTransition(element) {
  return new Promise(resolve => element.ontransitionend = resolve);
}
