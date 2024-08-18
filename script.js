let currentPage = 1;

function toggleClass(element, toggleClassName) {
  if (element.classList.contains(toggleClassName)) {
    element.classList.remove(toggleClassName);
  } else {
    element.classList.add(toggleClassName);
  }
}

function movePage(element, page) {
  if (page === currentPage) {
    currentPage += 2;
    toggleClass(element, "left-side");
    toggleClass(element.nextElementSibling, "left-side");
  } else if (page === currentPage - 1) {
    currentPage -= 2;
    toggleClass(element, "left-side");
    toggleClass(element.previousElementSibling, "left-side");
  }
}

function handleTouchStart(e) {
  const touch = e.touches[0];
  const pageElement = document.elementFromPoint(touch.clientX, touch.clientY);

  if (pageElement && pageElement.classList.contains('page')) {
    const pageIndex = Array.from(pageElement.parentNode.children).indexOf(pageElement) + 1;
    movePage(pageElement, pageIndex);
  }
}

document.querySelectorAll('.page').forEach(pageElement => {
  pageElement.addEventListener('click', (e) => {
    const pageIndex = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget) + 1;
    movePage(e.currentTarget, pageIndex);
  });
  
  pageElement.addEventListener('touchstart', handleTouchStart, { passive: true });
});
