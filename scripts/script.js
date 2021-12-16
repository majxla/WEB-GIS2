require([
    "esri/Map",
    "esri/views/SceneView"
], (Map, SceneView) => {
    const map1 = new Map({
        basemap: "gray-vector"
    });

    const view = new SceneView({
        map: map1,
        container: "mapDiv",
        center: [-100.4593, 36.9014],
        zoom: 3
    });
});