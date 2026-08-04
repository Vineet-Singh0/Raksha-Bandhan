let currentPage = 1;

// Utility to safely toggle a class on an element
function toggleClass(element, className) {
  if (element && element.classList) {
    element.classList.toggle(className);
  }
}

function movePage(element, page) {
  if (page === currentPage) {
    currentPage += 2;
    toggleClass(element, "left-side");
    if (element.nextElementSibling) {
      toggleClass(element.nextElementSibling, "left-side");
    }
  } else if (page === currentPage - 1) {
    currentPage -= 2;
    toggleClass(element, "left-side");
    if (element.previousElementSibling) {
      toggleClass(element.previousElementSibling, "left-side");
    }
  }
}

// Universal handler for both mouse and touch
function handlePageTurn(e) {
  // Ignore clicks on buttons/links inside pages so controls still work
  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.tagName === 'VIDEO') {
    return;
  }

  // Find the parent .page element even if a child (p, img, h1) was clicked
  const pageElement = e.target.closest('.page');
  
  if (pageElement) {
    const pageIndex = Array.from(pageElement.parentNode.children).indexOf(pageElement) + 1;
    movePage(pageElement, pageIndex);
  }
}

// Modern mobile and desktop browsers handle click/tap events cleanly together
document.querySelectorAll('.page').forEach(pageElement => {
  pageElement.addEventListener('click', handlePageTurn);
});
