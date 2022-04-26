<template>
    <div class="MapContainer">
        <div class="message">
            <span @click="clickMessage(item)" :style="{color:item.color}" v-for="item in spans" :key="item.name">{{item.name}}</span>
        </div>
        <mapTable ref="mapTableRef" @row="row"></mapTable>
        <countryInfo ref="countryRef"></countryInfo>
        <div id="mapEle"></div>
    </div>
</template>

<script>
import CesiumEx from "../assets/Map/Map";
import mapTable from "../view/mapTable";
import countryInfo from "../view/countryInfo";
 import * as Cesium from "cesium/Cesium"
 import Popup from  "../assets/Map/Popup"
export default {
    components:{
        mapTable,
        countryInfo
    },
    name: 'Map',
    data () {
        return {
            map:undefined,
            rdsjrenders:[],
            rdsjs:[
                {
                    id:'rdsj1',
                    geometry:{x:139.2217, y:35.9415},
                    html:{
                        image:'static/image/rbsx.png',
                        text:'2020年9月14日，菅义伟当选执政党日本自民党总裁。'
                    }
                },
                {
                    id:'rdsj2',
                    geometry:{x:78.7916, y:20.5082},
                    html:{
                        image:'static/image/ydzt.png',
                        text:'2015年，拉姆·纳特·科温德就任比哈尔邦邦长。'
                    }
                },
                {
                    id:'rdsj3',
                    geometry:{x:88.1973, y:61.1830},
                    html:{
                        image:'static/image/olszj.png',
                        text:'据俄新社报道，当地时间19日，一架L-410飞机在俄罗斯克麦罗沃州硬着陆，事故发生时机上共有20人，其中7人死亡，13人受伤。'
                    }
                },
                {
                    id:'rdsj4',
                    geometry:{x:23.8241, y:50.7030},
                    html:{
                        image:'static/image/wklsj.png',
                        text:'6月16日，美国总统拜登和俄罗斯总统普京在瑞士日内瓦的拉格朗热别墅举行会晤。'
                    }
                }
            ],
            spans:[
                {name:"国家安全态势",color:"#c5c5c5"},
                {name:"全球热点事件",color:"#c5c5c5"}
            ]
        }
    },
    methods:{
        init(){
            const _this = this;
            setTimeout(()=>{
                 this.$nextTick(()=>{
                    _this.map = new CesiumEx("mapEle",{});
                    _this.viewer = _this.map.viewer;
                    _this.rdsjs.forEach(item=>{
                        _this.rdsjrenders.push(new Popup(_this.map.viewer,item));
                    });

                    _this.viewer.screenSpaceEventHandler.setInputAction(function leftClick(movement) {
                        var pickedFeature = _this.viewer.scene.pick(movement.position);
                        if(Cesium.defined(pickedFeature)) {
                            //silhouetteGreen.selected = [pickedFeature];
                            if(Cesium.defined(pickedFeature.id) && Cesium.defined(pickedFeature.id.properties['GMI_CNTRY']))
                            {
                                let cnyName = '';
                                tb_data_country.forEach(item=>{
                                    if(item.GMI == pickedFeature.id.properties['GMI_CNTRY'])
                                    {
                                        cnyName = item.name;
                                    }    
                                });
                                _this.$refs.countryRef.countryName = cnyName;
                                _this.$refs.countryRef.countryShow = true;
                            }
                        }
                    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
                 })
            },200)
        },
        row(s){
            this.$refs.countryRef.countryGMI = s.GMI;
            this.$refs.countryRef.countryName = s.name;
            this.$refs.countryRef.countryShow = true;        
        },
        clickMessage(item){
            this.spans.map(t=>{
                t.color = "#c5c5c5"
            })
            item.color = "#409eff";
            if(item.name == "国家安全态势"){
                this.$refs.mapTableRef.mapTableShow = true; 
                this.rdsjrenders.forEach(item=>{
                    item.setVisible(false);
                });    
                this.map.setCountryAreasVisible(true);
            }
            else if(item.name == "全球热点事件"){
                this.$refs.mapTableRef.mapTableShow = false;     
                this.rdsjrenders.forEach(item=>{
                    item.setVisible(true);
                })
            }
        }
    },
    created(){
        
    },
    mounted (){
        this.init();
    }
}
</script>

<style scoped>
.echart{
    position: absolute;
    top: 30px;
    right: 320px;
}
.message{
    width: 100%;
    height: 40px;
    background: #013742;
    z-index: 9;
}
.message span{
    cursor: pointer;
    line-height: 40px;
    margin: 0 15px;
}
</style>
