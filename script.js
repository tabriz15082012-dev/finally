const map = L.map('map').setView([42.87, 74.60], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// 🚌 иконка (ОДНА!)
const busIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
    iconSize: [35, 35],
    iconAnchor: [17, 17]
});

// 🛣 маршруты
const routes = {
    51: [
        [42.87, 74.60],
        [42.875, 74.605],
        [42.88, 74.61]
    ],
    215: [
        [42.86, 74.62],
        [42.865, 74.625],
        [42.87, 74.63]
    ],
    9: [
        [42.89, 74.58],
        [42.885, 74.585],
        [42.88, 74.59]
    ],
    226: [
        [42.875, 74.6],
        [42.88, 74.605],
        [42.885, 74.61]
    ]
};

// 🚌 создаём автобусы
const buses = {};

for (let num in routes) {
    buses[num] = {
        route: routes[num],
        index: 0,
        marker: L.marker(routes[num][0], {icon: busIcon})
            .addTo(map)
            .bindPopup("Автобус №" + num)
    };
}

// 🔄 движение (простое, стабильное)
setInterval(() => {
    for (let num in buses) {
        let b = buses[num];

        // текущая точка
        let pos = b.marker.getLatLng();

        // следующая точка маршрута
        let target = b.route[b.index];

        // шаг движения
        let step = 0.0005;

        let lat = pos.lat + (target[0] - pos.lat) * 0.1;
        let lng = pos.lng + (target[1] - pos.lng) * 0.1;

        b.marker.setLatLng([lat, lng]);

        // если почти дошёл — следующая точка
        if (Math.abs(lat - target[0]) < 0.0003 &&
            Math.abs(lng - target[1]) < 0.0003) {
            b.index++;
            if (b.index >= b.route.length) b.index = 0;
        }
    }
}, 300);
const btn = document.getElementById("busBtn");
const windowBox = document.getElementById("busWindow");

btn.onclick = () => {
    if (windowBox.style.display === "block") {
        windowBox.style.display = "none";
    } else {
        windowBox.style.display = "block";
    }
};

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}