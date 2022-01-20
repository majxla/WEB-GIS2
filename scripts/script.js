
// lb1
// require([
//     "esri/Map",
//     "esri/views/SceneView"
// ], (Map, SceneView) => {
//     const map1 = new Map({
//         basemap: "gray-vector"
//     });

//     const view = new SceneView({
//         map: map1,
//         container: "mapDiv",
//         center: [-100.4593, 36.9014],
//         zoom: 3
//     });
// });


// lb2
require([
    'esri/Map',
    "esri/views/SceneView",
    'esri/views/MapView',
    'dijit/form/Button',
    'esri/layers/FeatureLayer',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/widgets/Legend'
], (Map, SceneView, MapView, Button, FeatureLayer, Graphic, GraphicsLayer, BasemapGallery, Expand, Legend) => {

    const map1 = new Map({
        basemap: "topo-vector"
    });

    const view = new SceneView({
        map: map1,
        container: "mapDiv",
        zoom: 3,
        center: [-96.06326, 33.759]
    });

    const zoomIn = new Button({
        onclick: () => {
            view.zoom = view.zoom + 1;
        }
    }, "zoomIn");

    const zoomOut = new Button({
        onclick: () => {
            view.zoom = view.zoom - 1;
        }
    }, "zoomOut");

    // warstwy

    const g1 = new GraphicsLayer();

    const f1 = new FeatureLayer({
        url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Hurricanes/MapServer/0'
    });

    map1.add(f1);
    map1.add(g1);

    //Grafiki
    const geom = {
        type: "polyline",
        paths: [[-96.06326, 33.759], [-97.06298, 32.755]]
    };

    const sym = {
        type: "simple-line",
        color: "blue",
        width: 2,
        style: "dash"
    };

    const attr = {
        country: "Polska",
        code: "POL"
    };

    const popTm1 = {
        title: "Obiekt WebGIS",
        content: "Zaznaczony obiekt pochodzi z kraju: {country}"
    };
    
    const graph = new Graphic({
        geometry: geom,
        symbol: sym,
        attributes: attr,
        popupTemplate: popTm1
    });

    //map1.graphics.add(graph); - lepiej nie
    g1.add(graph);

    // Wdigets
    
    const bmWg = new BasemapGallery({
        view: view
    });

    const expandWg = new Expand({
        view: view,
        content: bmWg
    });

    view.ui.add(expandWg, {
        position: "top-right"
    });

    const legend = new Legend({
        view: view,
    });
    view.ui.add(legend, {position: "bottom-right"});

    // query
    // let query = f1.createQuery();
    // query.where = "EVENTID = 'Alberto'";
    // query.outFields = ['*'];
    // query.returnGeometry = true;

    // f1.queryFeatures(query)
    // .then(response =>{
    //     console.log(response);
    //     getResults(response.features);
    // })
    // .catch(err => {
    //     console.log(err);
    // })

    // const getResults = (features) => {
    //     const symbol = {
    //         type: 'simple-marker',
    //         size: 6,
    //         color: "red",
    //         style: "square"
    //     };

    //     features.map(elem => {
    //         elem.symbol = symbol;
    //     });

    //     g1.addMany(features);


    // };

    const simple = {
        type: "simple",
        symbol: {
            type: "point-3d",
            symbolLayers: [
                {
                    type: "object",
                    resource: {
                        primitive: "cylinder"
                    },
                    width: 5000
                }
            ]
        },
        label: "Hurricane",
        visualVariables: [
            {
                type: "color",
                field: "PRESSURE",
                stops: [
                    {
                        value: 940,
                        color: "blue"
                    },
                    {
                        value: 990,
                        color: "green"
                    },
                    {
                        value: 1020,
                        color: "red"
                    }
                ]
            },
            {
                type: "size",
                field: "WINDSPEED",
                stops: [
                    {
                        value: "20",
                        size: 5000
                    },
                    {
                        value: "120",
                        size: 150000
                    }
                ]
            }
        ]
    };

    f1.renderer = simple;
});
