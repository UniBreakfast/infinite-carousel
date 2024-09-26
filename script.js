const carousel = document.querySelector('.carousel');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');
const slidesContainer = carousel.querySelector('.slides');
const slideCount = slidesContainer.children.length;

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
      slidesContainer.style.transitionTimingFunction = 'linear';
    } else {
      rotationsLeft = 0;
      slidesContainer.style.transitionTimingFunction = 'ease-out';
    }
    return;
  }

  direction = 'left';
  busy = true;
  i++;

  if (i != slideCount) {
    await rotateTo(i);

  } else {
    slidesContainer.append(slidesContainer.firstElementChild);

    await jumpTo(i - 2);
    await rotateTo(i - 1);
  
    slidesContainer.prepend(slidesContainer.lastElementChild);
  
    await jumpTo(i = 0);
  }

  busy = false;

  if (rotationsLeft) {
    rotationsLeft--;

    if (rotationsLeft == 0) {
      slidesContainer.style.transitionTimingFunction = 'ease-out';
    }

    await rotateLeft();
    
  } else {
    slidesContainer.style.transitionTimingFunction = null;
  }
}

async function rotateRight() {
  if (busy) {
    if (direction == 'right') {
      rotationsLeft++;
      slidesContainer.style.transitionTimingFunction = 'linear';
    } else {
      rotationsLeft = 0;
      slidesContainer.style.transitionTimingFunction = 'ease-out';
    }
    return;
  }

  direction = 'right';
  busy = true;
  i--;

  if (i != -1) {
    await rotateTo(i);

  } else {
    slidesContainer.prepend(slidesContainer.lastElementChild);

    await jumpTo(1);
    await rotateTo(0);
  
    slidesContainer.append(slidesContainer.firstElementChild);
  
    await jumpTo(i = slideCount - 1);
  }

  busy = false;

  if (rotationsLeft) {
    rotationsLeft--;

    if (rotationsLeft == 0) {
      slidesContainer.style.transitionTimingFunction = 'ease-out';
    }
    
    await rotateRight();

  } else {
    slidesContainer.style.transitionTimingFunction = null;
  }
}

async function rotateTo(i) {
  carousel.style.setProperty('--index', i);

  await endTransition(slidesContainer);
}

async function jumpTo(i) {
  slidesContainer.style.transitionDuration = '0s';
  carousel.style.setProperty('--index', i);

  await skipFrame();
  await skipFrame();

  slidesContainer.style.transitionDuration = null;
}

function skipFrame() {
  return new Promise(requestAnimationFrame);
}

function endTransition(element) {
  return new Promise(resolve => element.ontransitionend = resolve);
}
