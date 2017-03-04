console.log('beginning of index.js')

function splash(param) {
  var time = param;
  setTimeout(function () {
    document.getElementById('splashscreen').style.display = 'none'
    document.getElementById('homescreen').style.display = 'block'
  }, time)
}

function newAdventure() {
  console.log('newAdventure onmousedown')
  document.getElementById('homescreen').style.display = 'none'
  document.getElementById('newadventurescreen').style.display = 'block'
}

function startAdventure() {
  document.getElementById('newadventurescreen').style.display = 'none'
  document.getElementById('navscreen').style.display = 'block'
  initNav()
}

function cancelAdventure() {
  document.getElementById('newadventurescreen').style.display = 'none'
  document.getElementById('homescreen').style.display = 'block'
}

function endNavigation() {
  document.getElementById('navscreen').style.display = 'none'
  document.getElementById('homescreen').style.display = 'block'
  // ffwdme.reset()
}

function initNav() {
  console.log('navigation init')
  var stops = [
    {
      type: 'fuel', 
      coords: {
        lat: 28.004611, 
        lng: -82.598641
      }
    },
    {
      type: 'destination', 
      coords: {
        lat: 28.031738, 
        lng: -82.668238
      }
    }
  ]
  var currentStop = null

  ffwdme.on('geoposition:init', function() {
    console.info("Waiting for initial geoposition...")
  })

  ffwdme.on('geoposition:ready', function() {
    console.info("Received initial geoposition!")
    $('#loader').remove()
    if (stops.length > 0) {
      currentStop = stops.shift()
    } else {
      currentStop = null
    }
    if (currentStop !== null) {
      var route = new ffwdme.routingService({
        dest: currentStop.coords
      }).fetch()
    }
  })

  // start the navigation once the route is calculated
  ffwdme.on('routecalculation:success', function(response) {
    ffwdme.navigation.setRoute(response.route).start()
  })

  // register to navigation events
  ffwdme.on('navigation:onroute', function(e) {
    if (e.navInfo.arrived) {
      switch (currentStop.type) {
        case 'fuel':
          alert('Stop for fuel. Then, press ok to continue.')
          break
        case 'destination':
          alert('You have arrived at your destination.')
          break
        default:
          break
      }
      ffwdme.navigation.reset()
      if (stops.length > 0) {
        currentStop = stops.shift()
      } else {
        currentStop = null
      }
      if (currentStop !== null) {
        var route = new ffwdme.routingService({
          dest: currentStop.coords
        }).fetch()
      }
    }
  })

  // setup ffwdme
  ffwdme.initialize({
    routing: 'GraphHopper',
    graphHopper: {
      apiKey: CREDENTIALS.graphHopper
    }
  })

  var tileURL = "https://api.tiles.mapbox.com/v4/" + CREDENTIALS.mapboxId + "/{z}/{x}/{y}.png?access_token=" + CREDENTIALS.mapboxToken
  var map = new ffwdme.components.Leaflet({ el: $('#map'), tileURL: tileURL, center: { lat: 49.90179, lng: 8.85723 } })

  var audioData = {"file": ffwdme.defaults.audioBaseUrl + 'male/voice',
                    "meta_data": { "INIT": { "start": 0.01, "length": 8.01 }, "C": { "start": 8.01, "length": 8.01 }, "TL_now": { "start": 16.01, "length": 8.01 }, "TL_100": {"start": 24.01,"length": 8.01},"TL_500": {"start": 32.01,"length": 8.01},"TL_1000": {"start": 40.01,"length": 8.01},"TSLL_now": {"start": 48.01,"length": 8.01 },"TSLL_100": {"start": 56.01,"length": 8.01},"TSLL_500": {    "start": 64.01,    "length": 8.01  },  "TSLL_1000": {    "start": 72.01,    "length": 8.01  },  "TSHL_now": {    "start": 80.01,    "length": 8.01  },  "TSHL_100": {    "start": 88.01,    "length": 8.01  },  "TSHL_500": {    "start": 96.01,    "length": 8.01  },  "TSHL_1000": {    "start": 104.01,    "length": 8.01  },  "TR_now": {    "start": 112.01,    "length": 8.01  },  "TR_100": {    "start": 120.01,    "length": 8.01  },  "TR_500": {    "start": 128.01,    "length": 8.01  },  "TR_1000": {    "start": 136.01,    "length": 8.01  },  "TSLR_now": {    "start": 144.01,    "length": 8.01  },  "TSLR_100": {    "start": 152.01,    "length": 8.01  },  "TSLR_500": {    "start": 160.01,    "length": 8.01  },  "TSLR_1000": {    "start": 168.01,    "length": 8.01  },  "TSHR_now": {    "start": 176.01,    "length": 8.01  },  "TSHR_100": {    "start": 184.01,    "length": 8.01  },  "TSHR_500": {    "start": 192.01,    "length": 8.01  },  "TSHR_1000": {    "start": 200.01,    "length": 8.01  },  "TU": {    "start": 208.01,    "length": 8.01  },  "C_100": {    "start": 216.01,    "length": 8.01  },  "C_500": {    "start": 224.01,    "length": 8.01  },  "C_1000": {    "start": 232.01,    "length": 8.01  },  "C_LONG":{    "start": 240.01,    "length": 8.01  },  "FINISH":{    "start": 248.01,    "length": 8.01  },  "EXIT1":{    "start": 256.01,    "length": 8.01  },  "EXIT2":{    "start": 264.01,    "length": 8.01  },  "EXIT3":{    "start": 272.01,    "length": 8.01  },  "EXIT4":{    "start": 280.01,    "length": 8.01  },  "EXIT5":{    "start": 288.01,    "length": 8.01  }}}

  window.widgets = {
    map       : map,
    autozoom  : new ffwdme.components.AutoZoom({ map: map }),
    reroute   : new ffwdme.components.AutoReroute({ parent: '#playground' }),
    speed     : new ffwdme.components.Speed({ parent: '#playground', grid: { x: 1, y: 12 } }),
    destTime  : new ffwdme.components.TimeToDestination({ parent: '#playground', grid: { x: 4, y: 12 } }),
    destDist  : new ffwdme.components.DistanceToDestination({ parent: '#playground', grid: { x: 7, y: 12 } }),
    arrival   : new ffwdme.components.ArrivalTime({ parent: '#playground', grid: { x: 10, y: 12 } }),
    nextTurn  : new ffwdme.components.NextStreet({ parent: '#playground', grid: { x: 4, y: 11 } }),
    distance  : new ffwdme.components.DistanceToNextTurn({ parent: '#playground', grid: { x: 4, y: 10 } }),
    arrow     : new ffwdme.components.Arrow({ parent: '#playground', grid: { x: 0, y: 10 } }),
    audio     : new ffwdme.components.AudioInstructions({ parent: '#playground', grid: { x: 0, y: 6 }, bootstrapAudioData: audioData}),
    mapRotator: new ffwdme.components.MapRotator({ map: map })
  }
}
