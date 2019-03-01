function reset_map() {
  d3.select('#map').html('')
  // Création de la carte
  map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([0, 0]),
      zoom: 10
    })
  });
}

function build_map(data) {
  map.setLayerGroup(new ol.layer.Group());
  map.addLayer(new ol.layer.Tile({
    source: new ol.source.OSM()
  }));
  // Style du point
  var styleCircle = new ol.style.Style({
    image: new ol.style.Circle({
      radius: 5,
      fill: new ol.style.Fill({
        color: '#333333'
      }),
      stroke: new ol.style.Stroke({
        color: '#333333',
        width: 1
      })
    }),
    fill: new ol.style.Fill({
      color: '#333333'
    }),
    stroke: new ol.style.Stroke({
      color: '#333333',
      width: 1
    })
  });
  for (var i = 0; i < data.length - 1; i++) {
    var vectorSource = new ol.source.Vector({
      projection: 'EPSG:4326'
    });
    var pos1 = ol.proj.fromLonLat([data[i].long, data[i].lat]);
    var pos2 = ol.proj.fromLonLat([data[i + 1].long, data[i + 1].lat]);
    // Dessin d'un cercle
    var circle = new ol.geom.Circle(pos1, 5);
    var circleFeature = new ol.Feature(circle);
    vectorSource.addFeature(circleFeature);
    // Dessin d'une ligne
    var line = new ol.geom.LineString([pos1, pos2]);
    var lineFeature = new ol.Feature(line);
    vectorSource.addFeature(lineFeature);
    // Change la couleur en fonction de l'activité
    var styleColor = d3.color(color(data[i].activity[0]['type']));
    styleColor.opacity = 0.7
    styleColor = styleColor.toString()
    var styleLine = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: styleColor,
        width: 3
      }),
      fill: new ol.style.Fill({
        color: styleColor
      })
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: styleLine
    });
    map.addLayer(vectorLayer);
  }
  // fit the map to the data
  var extent = ol.extent.createEmpty();
  map.getLayers().forEach(function(layer) {
    if (layer.type == "VECTOR") {
      ol.extent.extend(extent, layer.getSource().getExtent());
    }
  })
  map.getView().fit(extent, map.getSize());
}