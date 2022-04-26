const _ = require('lodash');
import * as Cesium from 'cesium/Cesium'

export default class Popup
{
    constructor(viewer,info)
    {
        var _this = this;
        _this.isVisible = false;
        _this.viewer = viewer;//弹窗创建的viewer
        _this.geometry = info.geometry;//弹窗挂载的位置
        _this.id ="popup_" +info.id++ ;
        _this.ctn = $("<div style = 'position:absolute;' class='bx-popup-ctn' id =  '"+_this.id+"'>");
        $(_this.viewer.container).append( _this.ctn);
        _this.ctn.append(_this.createHtml(info.html));//嵌入的HTML代码
        _this.render(_this.geometry);
        _this.eventListener = _this.viewer.clock.onTick.addEventListener(function(clock) {
            _this.render(_this.geometry);
        })
        
    } 

    render(geometry)
    {
        var _this = this;
        if(!_this.isVisible)
        {
            _this.ctn.css("display","none");
            return;
        }
        let cartesian3 = Cesium.Cartesian3.fromDegrees(geometry.x,geometry.y);
        let position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene, cartesian3);
        var isVisible = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, _this.viewer.camera.position).isPointVisible(cartesian3);
        //var position = Cesium.SceneTransforms.wgs84ToWindowCoordinates(_this.viewer.scene,geometry);
        //var isVisible = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, viewer.camera.position).isPointVisible(targetPosition);\
        if(isVisible)
        {
            _this.ctn.css("display","flex");
            _this.ctn.css("left",position.x- _this.ctn.get(0).offsetWidth/2);
            _this.ctn.css("top",position.y- _this.ctn.get(0).offsetHeight - 10);
        }
        else
        {
            _this.ctn.css("display","none");
        }
    }

    createHtml(html){
        //console.log(html);
        return `<div style="display:flex;padding: 5px;width:200">
            <img src=${html.image} width="80px" height="100px"/>
            <div class="text"
            style="width:120px;height:100%;word-wrap: break-word;font-size:12px;color:#00eef9" 
            >${html.text}</div>
        </div>`;
    }

    setVisible(bVisible)
    {
        this.isVisible = bVisible;
    }

    close()
    {
        var _this = this;
        _this.ctn.remove();
        _this.viewer.clock.onTick.removeEventListener( _this.eventListener );
    }
}