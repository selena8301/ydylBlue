import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
const _ = require('lodash');
import Vue from 'vue'
import './Map.css'

export default class CesiumEx{
    /**
     * 构造函数
     **/
    constructor(divId,{}){
        //创建视口
      
        this.viewer = new Cesium.Viewer(divId,{
            timeline:false,
            animation:false,
            geocoder: false,
            homeButton: false,
            baseLayerPicker: false,
            fullscreenButton: false,
            navigationHelpButton: false,
            selectionIndicator: false,
            infoBox: false,
            shadows:false,
            sceneMode : Cesium.SceneMode.SCENE3D,  
            imageryProvider: new Cesium.SingleTileImageryProvider({
                url : '/static/image/Map/Globe2D.jpg',
            }),
//             imageryProvider:new Cesium.UrlTemplateImageryProvider({             
//                 url:'http://www.google.cn/maps/vt?lyrs=s@800&x={x}&y={y}&z={z}',  
//                 tilingScheme:new Cesium.WebMercatorTilingScheme(),              
//                 minimumLevel:1,            
//                 maximumLevel:99,
//                 gamma : 0.66  
//             }),    
            navigation:false,
            sceneModePicker:true,
            contextOptions:{
                webgl:{
                    alpha: true,
                    depth:true,
                    stencil:true,
                    antialias:true,
                    premultipliedAlpha:true,
                    preserveDrawingBuffer:true,
                    failIfMajorPerformanceCaveat:true
                }
            }
        });
        this.countryAreas = [];
        this.viewer._cesiumWidget._creditContainer.style.display = "none";
        this.loadCountryName();
        this.loadCountry();
        this.Goto(98.4572,30.1643, 21000060.85);
        // const _this = this;
        // _this.viewer.screenSpaceEventHandler.setInputAction(function leftClick(movement) {
		// 	var pickedFeature = _this.viewer.scene.pick(movement.position);
		// 	if(Cesium.defined(pickedFeature)) {
		// 		//silhouetteGreen.selected = [pickedFeature];
        //         if(Cesium.defined(pickedFeature.id) && Cesium.defined(pickedFeature.id.properties['GMI_CNTRY']))
        //         {
        //             console.log(pickedFeature.id.properties['GMI_CNTRY']);
        //         }
		// 	}
		// }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


       
    }

    /**
     * 加载国家名
     */
    loadCountryName()
    {
        const _this = this;
        let res = Cesium.GeoJsonDataSource.load("static/geojsons/country_name.geojson");
        res.then(function(ds){
            let country = _this.viewer.dataSources.add(ds);
            country.then(function(ssss){
               ssss.entities.values.forEach(element => {
                        element.billboard = undefined;
                       // console.log(element);
                        element.label = new Cesium.LabelGraphics({
                            text:element.properties.Name,font:'8px sans-serif',
                            horizontalOrigin:Cesium.HorizontalOrigin.LEFT,
                            verticalOrigin:Cesium.VerticalOrigin.BOTTOM,
                            pixelOffset:new Cesium.Cartesian2(6, -4),
                            fillColor:Cesium.Color.CHOCOLATE,
                            distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 9000000),
                            eyeOffset: new Cesium.Cartesian3(0, 0, -10)
                        });

                        element.point = new Cesium.PointGraphics({
                        color: Cesium.Color.RED,
                        pixelSize: 5,
                        distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0.0, 9000000)
                    });
               });
            });
        });
    }

    setCountryAreasVisible(bVisible)
    {
        this.countryAreas.forEach(item=>{
            item.show = bVisible;
        });
    }
    /***
     * 加载国家安全数据
     */
    loadCountry()
    {
        const _this = this;
        if(_this.countryStyles == undefined)
        {
            _this.countryStyles = {};
        }
        let res = Cesium.GeoJsonDataSource.load("static/geojsons/rb_country.geojson");
        res.then(function(ds){
            let country = _this.viewer.dataSources.add(ds);
            country.then(function(ssss){
                ssss.entities.values.forEach(element => {
                //console.log('-----------',element.properties._GMI_CNTRY._value);
                let style = _this.countryStyles[element.properties.GMI_CNTRY];
                if(!style)
                {
                    style = {
                        color:Cesium.Color.fromRandom({alpha: 0.5,}),
                        extrudedHeight:Math.random() * 10000
                    };
                    _this.countryStyles[element.properties.GMI_CNTRY] = style;
                }
                element.polygon.material = style.color;
                element.polygon.extrudedHeight = style.extrudedHeight;
                element.polygon.outline = false;
                element.show = true;
                _this.countryAreas.push(element);
            });
            });
        });
    }

    /**
     * 定位
     **/
    Goto(lon,lat,alt) {
        this.viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(lon, lat, alt)
        });
    }
     /**
     * 经纬度网格线
     */
    Grid( state ){

        let imageProvider = this.viewer.imageryLayers;

        if(state){

            let gridTile = new Cesium.GridImageryProvider({
                cells: 4,
                color: Cesium.Color.fromAlpha(Cesium.Color.RED, 0.9) ,
                glowColor: Cesium.Color.TRANSPARENT,
                backgroundColor: Cesium.Color.TRANSPARENT,
            })

            gridTile.requestImage = function(x, y, level){

                var intervalX = 180.0 / Math.pow(2, level),
                    intervalY = 180.0 / Math.pow(2, level);
                
                var lon = ((x) * intervalX-180).toFixed(2),
                    lat = (90 - intervalY * y).toFixed(2),
                    fontsize = 20;

                var labelLon = '';
                var labelLat = '';
                
                if (lon > 0) {
                    if (lat > 0) {
                        labelLon = (lon == 0 || lon == 180) ? lon : 'E' + lon;
                        labelLat = (lat == 0 || lat == 90) ? lat : 'N' + lat;
                    } else {
                        labelLon = (lon == 0 || lon == 180) ? lon : 'E' + lon;
                        labelLat = (lat == 0 || lat == 90) ? -lat : 'S' + -lat;
                    }
                } else {
                    if (lat > 0) {
                        labelLon = (-lon == 0 || -lon == 180) ? -lon : 'W' + -lon;
                        labelLat = (lat == 0 || lat == 90) ? lat : 'N' + lat;
                    } else {
                        labelLon = (-lon == 0 || -lon == 180) ? -lon : 'W' + -lon;
                        labelLat = (lat == 0 || lat == 90) ? -lat : 'S' + -lat;
                    }
                }

                if(level > 10){
                    fontsize = 12
                }

                var canvas = document.createElement('canvas');
                    canvas.width = 256;
                    canvas.height = 256;
                    var context = canvas.getContext('2d');
                    context.strokeRect(0, 0, 256, 256);
                    var label = `${labelLon} / ${labelLat}`;
                    context.font = `bold ${fontsize}px Arial`;
                    context.textAlign = 'left';
                    context.fillText(label, 0, 20);
                    return canvas;
            }

            imageProvider.addImageryProvider(gridTile)
        }else{
            let _gridLayer = imageProvider.get(imageProvider.length-1)
            imageProvider.remove(_gridLayer)
        }
    }
}

