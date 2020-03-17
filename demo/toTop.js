console.log('Long text site script ran');

const toTopButton = document.getElementById('toTop');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    toTopButton.style.display = 'flex';
  } else {
    toTopButton.style.display = 'none';
  }
}
