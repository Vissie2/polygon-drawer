import "./style.css";

import { Loader } from "google-maps";
import { polygon } from "./data";

const loader = new Loader("");

const google = await loader.load();

const map = new google.maps.Map(document.getElementById("map")!, {
  center: { lat: 52.0907, lng: 5.1214 },
  zoom: 7,
});

const paths = polygon.map(({ lat, lng }) => ({ lat, lng }));

const mapPolygon = new google.maps.Polygon({
  paths,
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  editable: true,
  draggable: true,
});

mapPolygon.setMap(map);

mapPolygon.addListener("click", (event) => {
  console.log("Polygon click", {
    lat: event.latLng.lat(),
    lng: event.latLng.lng(),
  });
});

function getPolygonPath() {
  const polygonMVCArr = mapPolygon.getPath();
  const paths: { lat: number; lng: number }[] = [];

  polygonMVCArr.forEach((point: any) => {
    paths.push({ lat: point.lat(), lng: point.lng() });
  });

  console.log(paths);
}

document.querySelector("#generate")?.addEventListener("click", getPolygonPath);
