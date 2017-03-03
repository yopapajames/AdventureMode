function startAdventure() {
  let distanceMin = document.getElementById('distance-min').value
  let distanceMax = document.getElementById('distance-max').value
  window.location = 'nav/nav.html?distanceMin=' + distanceMin + '&distanceMax=' + distanceMax
}

function cancel() {
  window.location = 'home.html'
}