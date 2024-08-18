let currentPage = 1;

function toggleClass(e, toggleClassName) {
  if (e.className.includes(toggleClassName)) {
    e.className = e.className.replace(" " + toggleClassName, "");
  } else {
    e.className += " " + toggleClassName;
  }
}

function movePage(e, page) {
  if (page == currentPage) {
    currentPage += 2;
    toggleClass(e, "left-side");
    toggleClass(e.nextElementSibling, "left-side");
  } else if (page == currentPage - 1) {
    currentPage -= 2;
    toggleClass(e, "left-side");
    toggleClass(e.previousElementSibling, "left-side");
  }
}

function handleTouch(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const pageElement = document.elementFromPoint(touch.clientX, touch.clientY);

  if (pageElement) {
    const page = Array.from(pageElement.parentNode.children).indexOf(pageElement) + 1;
    movePage(pageElement, page);
  }
}

document.querySelectorAll('.page').forEach(pageElement => {
  pageElement.addEventListener('click', (e) => movePage(e.currentTarget, Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget) + 1));
  pageElement.addEventListener('touchstart', handleTouch, { passive: false });
});
