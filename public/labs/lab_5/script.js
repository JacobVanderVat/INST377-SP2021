function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  const mymap = L.map("mapid").setView([38.9887, -76.9378], 13);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiamFuZ292YXQiLCJhIjoiY2ttNm8wMWxiMDNsOTJvcDljb2xqdHZjNiJ9.W-XN7pTRzAR4JOz3iMXTbA",
    }
  ).addTo(mymap);
  return mymap;
}

async function dataHandler(mapObjectFromFunction) {
  const form = document.querySelector("#search-form");
  const search = document.querySelector("#search");
  const targetList = document.querySelector(".target-list");

  const request = await fetch("/api");
  const data = await request.json;

  form.addEventListener("submit", async (event) => {
    event.preventDefault;
    const filtered = data.filter(
      (record) => record.zip.includes(search.value) && record.geocoded_column_1
    );
    console.log("Submit Fired");
    console.log(search.value);
    console.table(fitlered);
    filtered.forEach((item) => {
      const coords = item.geocoded_column_1.coordinates;
      const marker = L.marker([coords[1], coords[0]]).addTo(
        mapObjectFromFunction
      );

      const appendItem = document.createElement("li");
      appendItem.classList.add("block");
      appendItem.classList.add("list-item");
      appendItem.innerHTML = `<div class="list-header is-size-5>${item.name}</div><address class="is-size-6>${item.address_line_1}</address>"`;
      targetList.append(appendItem);
    });
  });
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;
