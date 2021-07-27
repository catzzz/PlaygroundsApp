mapboxgl.accessToken = mapToken;
console.log(mapToken);
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: playground.geometry.coordinates, // starting position [lng, lat]
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(playground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${playground.title}</h3><p>${playground.location}</p>`
    )
  )
  .addTo(map);
