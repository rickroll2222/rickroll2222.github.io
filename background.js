document.addEventListener('DOMContentLoaded', function() {
  const defaultImage = '/200w.gif';
  
  // List of alternate images
  const alternateImages = [
    '/7d2a9fca264faa93561f72b5fc885fec.gif',
    '/old.gif',
    'https://files.catbox.moe/adef69.webp'
  ];

  const chancePercent = 1; // 1% chance for random alternate

  // 1. Check URL for the "force" parameter
  const urlParams = new URLSearchParams(window.location.search);
  const forceBackground = urlParams.has('background'); // Checks for ?background or ?background=something

  if (forceBackground) {
    // FORCE MODE: Pick a random image from the list and show it immediately
    const randomIndex = Math.floor(Math.random() * alternateImages.length);
    const selectedImage = alternateImages[randomIndex];
    
    document.body.style.backgroundImage = `url('${selectedImage}')`;
    console.log('Force mode active (URL param): Showing ' + selectedImage);
    return; // Stop here, don't run the random chance logic
  }

  // 2. NORMAL MODE: Run the 1% chance logic
  const roll = Math.floor(Math.random() * 100);

  if (roll === 0) {
    const randomIndex = Math.floor(Math.random() * alternateImages.length);
    const selectedImage = alternateImages[randomIndex];
    
    document.body.style.backgroundImage = `url('${selectedImage}')`;
    console.log('Luck mode (1% chance): Showing ' + selectedImage);
        console.log('Roll was: ' + roll);

  } else {
    document.body.style.backgroundImage = `url('${defaultImage}')`;
    console.log('Default image shown.');
    console.log('Roll was: ' + roll);
  }
});