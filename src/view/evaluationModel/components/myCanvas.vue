<template>
    <div class="myCanvas">
        <svg 
            width='100%' 
            height='100%'
            v-if='viewer'
            @mousewheel.stop='mousewheel'
            @pullstart='movestartSvg'
            @tap='clickView'
            @contextmenu.prevent.stop
            @pull='moveSvg'>
                <defs>
                    <linearGradient
                        v-for='num in viewer.lines.length' 
                        :key='num'
                        :id="'gradient'+num">
                        <stop offset="0" :stop-color="calculteLinearGradientStart(num)" />
                        <stop offset="100%" :stop-color="calculteLinearGradientEnd(num)" />
                    </linearGradient>
                </defs>
                <g :style='{transform:viewer.svgMatrix}'>
                    <g 
                        class='group_main' 
                        :style="{transform:viewer.matrixes[index]}" 
                        @dblclick.stop
                        v-for="(main,index) in viewer.mains" 
                        :key='index'>
                                <rect 
                                    x='0' 
                                    y='0' 
                                    rx='6'
                                    ry='6'
                                    :width='calculateMainWidth(main)' 
                                    :height='calculateMainHeight(main)'
                                    :stroke=" currentMain == main ? '#13b2f9':'#13c2fe'" 
                                    fill='#0d72e8' />
                                <foreignObject 
                                    x='0' 
                                    y='0'
                                    stroke='red'
                                    :width='calculateMainWidth(main)' 
                                    :height='calculateMainHeight(main)'>
                                    <body xmlns="http://www.w3.org/1999/xhtml" style='background-color:transparent;'>
                                        <div class='foreignContainer' style='height: 100%;border-radius: 6px;overflow: hidden;position:relative;padding:5px 10px;color:#95bbef;margin:0px;font-size:14px; box-sizing:border-box;user-select:none;'>
                                                <div class='item-group' style='height:60px;width:100%;margin:0 auto;text-align:center'>
                                                    <span class='item-group_value' style='display:block;user-select:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:30px;padding:0px;font-size:14px; box-sizing:border-box;user-select:none;'>{{main.detail.tableAlgorithm.algorithmname}}</span>
                                                </div>
                                        </div>
                                    </body>
                                </foreignObject>
                                <rect 
                                    x='0' 
                                    y='0' 
                                    rx='6'
                                    ry='6'
                                    :width='calculateMainWidth(main)' 
                                    :height='calculateMainHeight(main)'
                                    @pullstart.stop='movestartMain($event,main,index)'
                                    @pull.stop = 'moveMain($event,main,index)'
                                    @pullend.stop = 'moveupMain($event,main,index)'
                                    @dblclick.stop='chooseMain($event,main,index)'
                                    @tap.stop='highlightMain(main,index)'
                                    @contextmenu.prevent='contextmenu($event,main)'
                                    stroke="transparent" 
                                    fill='transparent' />
                            <g 
                                
                                v-for='(inport,ind) in main.inports' 
                                :key="'inport_'+ind">
                                    <rect 
                                        :x='calculateInportPosionX(main,index,inport,ind)' 
                                        :y='calculateInportPosionY(main,index,inport,ind)' 
                                        :width='portWidth' 
                                        :height='portHeight' 
                                        :fill='calculatePortFillColor(main,index,inport)' />
                                        <text
                                        @mouseenter='mouseoverPort(main,index,inport,ind,calculateInportPosionX(main,index,inport,ind) + portWidth/2,calculateInportPosionY(main,index,inport,ind) + portHeight/2 + 3)'
                                        @mouseout='currentPort = null'
                                        fill="#fff"
                                        style='text-anchor:middle;font-size:10px;cursor:default;'
                                        :x='calculateInportPosionX(main,index,inport,ind) + portWidth/2' 
                                        :y='calculateInportPosionY(main,index,inport,ind) + portHeight/2 + 3'>
                                        <tspan style='user-select:none;'>输入</tspan>
                                    </text>
                            </g>
                            <g 
                                v-for='(outport,ind) in main.outports' 
                                @pullstart.stop='movestartOutport($event,main,index,outport,ind)'
                                @pull.stop='moveOutport($event,main,index,outport,ind)'
                                @pullend.stop='moveupOutport($event,main,index,outport,ind)'
                                :key="'outport__'+ind">
                                    <rect 
                                        :x='calculateOutportPosionX(main,index,outport,ind)' 
                                        :y='calculateOutportPosionY(main,index,outport,ind)' 
                                        :width='portWidth' 
                                        :height='portHeight' 
                                        :fill='calculatePortFillColor(main,index,outport)'></rect>
                                    <text
                                            @mouseenter='mouseoverPort(main,index,outport,ind,calculateOutportPosionX(main,index,outport,ind) + portWidth/2,calculateOutportPosionY(main,index,outport,ind) + portHeight/2 + 3)'
                                            @mouseout='currentPort = null'
                                            fill="#fff"
                                            style='text-anchor:middle;font-size:10px;cursor:default;'
                                            :x='calculateOutportPosionX(main,index,outport,ind) + portWidth/2' 
                                            :y='calculateOutportPosionY(main,index,outport,ind) + portHeight/2 + 3'>
                                        <tspan style='user-select:none;'>输出</tspan>
                                    </text>
                            </g>  
                    </g>
                    <g class='item_line' :key="index" v-for='(line,index) in viewer.lines' @dblclick.stop>
                            <path 
                                :d='line' 
                                fill='transparent' 
                                :stroke-width="currentLine == line ? 5 : 3"
                                stroke='#ccc' 
                                @dblclick='showLineDetail(line,index)'
                                @contextmenu.prevent.stop='lineContextMenu($event,index)'
                                @tap.stop ='highlightLine(line,index)' />
                            <circle :cx='calculateCircleX(line)' :cy='calculateCircleY(line)' r='3' stroke='transparent' fill='purple' />
                    </g>
                    <g v-if='currentPort' @dblclick.stop>
                        <text :x='currentPort.x' :y='currentPort.y' style='text-anchor:middle;fill:#fff;font-size:13px;'>
                            <tspan  style='user-select:none;'>{{currentPort.parametername}}</tspan>
                            <tspan  style='user-select:none;'>{{currentPort.varname}}</tspan>
                            <tspan  style='user-select:none;'>{{getTypeName(currentPort.vartype)}}</tspan>
                            <tspan  style='user-select:none;'>{{currentPort.varvalue}}</tspan>
                        </text>
                    </g>
                </g>
        </svg>
    </div>
</template>

<script>

export default {
    components:{
       
    },
    name: 'myCanvas',
    data () {
        return {
            cvs: new RxSvg(),    //画布实例
            viewer: {
                lines:[],
                mains:[]
            },      //画布视图
            vary: null,    //万能变量
            state: false,  //是否绘制状态
            success: false,  //绘制关联线成功与否   
            interDistance: 7,  //参数之间的Y宙间距
            portWidth: 24,    //参数宽度
            portHeight: 16,   //参数高度
            width: 200,       //算子宽度
            minHeight: 100,   //算子最小高度
            minZoom: 0.4,     //缩放最小倍数
            maxZoom: 2,       //缩放最大倍数
            currentPort: null,
            currentMain: null,   //当前选中算子
            currentLine: null    //当前选中线条
        }
    },
    methods: {
        build() {
            this.cvs.rebuild();
            this.viewer = this.cvs.viewer;
        },
        back() {
            this.viewer.back();
        },
        calculateMainWidth(main) {
            return this.width;
        },
        calculateMainHeight(main) {
            var h = 19;
            var outportsLength = main.outports.length;
            var inportsLength = main.inports.length;
            var maxLength = outportsLength + inportsLength;
            var h = maxLength * h + (maxLength + 1) * this.interDistance;
            return h > this.minHeight ? h : this.minHeight;
        },
        calculatePositionX(main, index) {
            return -20;
        },
        calculatePositionY(main, index) {
            return 20 + index * 30;
        },
        calculateInportPosionX(main, index, inport, ind) {
            return -this.portWidth;
        },
        calculateInportPosionY(main, index, inport, ind) {
            var height = this.calculateMainHeight(main);
            var len = main.inports.length;
            let dis = (height - len * this.portHeight) / (len + 1);
            return (ind + 1) * dis + ind * this.portHeight;
        },
        calculateOutportPosionX(main, index, outport, ind) {
            return this.calculateMainWidth(main);
        },
        calculateOutportPosionY(main, index, outport, ind) {
            var height = this.calculateMainHeight(main);
            var len = main.outports.length;
            let dis = (height - len * this.portHeight) / (len + 1);
            return (ind + 1) * dis + ind * this.portHeight;
        },
        createLineBezier(pos1, pos2) {
            var arr = ['M', pos1.x, pos1.y, 'C', (pos1.x + pos2.x) / 2, pos1.y, (pos1.x + pos2.x) / 2, pos2.y, pos2.x, pos2.y];
            return arr.join(' ');
        },
        createCoordinatByMatrix(matrix) {
            matrix = matrix.replace(/\s/g, '');
            var exec = /matrix\((.+)\)/.exec(matrix);
            exec = exec ? exec[1] : '1,0,0,1,0,0';
            var arr = exec.split(',');
            return {
                x: parseFloat(arr[4]),
                y: parseFloat(arr[5]),
                scale: parseFloat(arr[0])
            }
        },
        createMatrixByCoordinate(position) {
            return 'matrix(' + position.scale + ',0,0,' + position.scale + ',' + position.x + ',' + position.y + ')';
        },
        movestartSvg() {
            this.vary = this.createCoordinatByMatrix(this.viewer.svgMatrix);
        },
        contextmenu(event, main) {
            this.$emit('main-contextmenu', event, main)
        },
        dblclick(event) {
            this.$emit('slice-screen');
        },
        lineContextMenu(event, index) {
            var action = this.viewer.actions[index];
            let relation = this.viewer.relations[index];
            let arr = relation.split('|');
            let firstMainId = arr[0];
            let secondMainId = arr[2];
            let firstPortId = arr[1];
            let secondPortId = arr[3];
            let firstMain, secondMain;
            for (let i = 0; i < this.viewer.mains.length; i++) {
                if (firstMainId == this.viewer.mains[i].id) {
                    firstMain = this.viewer.mains[i];
                };
                if (secondMainId == this.viewer.mains[i].id) {
                    secondMain = this.viewer.mains[i];
                };
            };
            let detail = {
                mains: [firstMain, secondMain],
                ports: [firstPortId, secondPortId],
                index: index,
                action: action
            };
            this.$emit('line-contextmenu', event, detail);
        },
        moveSvg(event) {
            if (this.state || !this.viewer.mains.length) return;
            let disX = event.detail.center.x - tob.gestures.session.firstTouch.center.x;
            let disY = event.detail.center.y - tob.gestures.session.firstTouch.center.y;
            let position = {
                x: this.vary.x + disX,
                y: this.vary.y + disY,
                scale: this.vary.scale
            };
            this.viewer.svgMatrix = this.createMatrixByCoordinate(position);
            this.viewer.record;
            this.$forceUpdate()
        },
        movestartMain(event, main, index) {
            var matrix = this.viewer.matrixes[index];
            this.vary = this.createCoordinatByMatrix(matrix);
            this.relativeRelation = this.getRelativePortsByMain(main);
        },
        moveMain(event, main, index) {
            let scale = (this.createCoordinatByMatrix(this.viewer.svgMatrix)).scale;
            let disX = event.detail.center.x - tob.gestures.session.firstTouch.center.x;
            let disY = event.detail.center.y - tob.gestures.session.firstTouch.center.y;
            let position = {
                x: this.vary.x + disX / scale,
                y: this.vary.y + disY / scale,
                scale: 1
            };
            this.$set(this.viewer.matrixes, index, this.createMatrixByCoordinate(position));
            //线条跟随移动
            setTimeout(() => {
                let relativeInports = this.relativeRelation[0];
                let relativeOutports = this.relativeRelation[1];
                for (var i = 0; i < relativeInports.length; i++) {
                    var relativeInport = relativeInports[i];
                    var index = relativeInport.index;
                    var bezierArr = relativeInport.bezier.split(' ');
                    bezierArr[4] = (parseFloat(bezierArr[1]) + parseFloat(bezierArr[8]) + disX) / 2;
                    bezierArr[6] = bezierArr[4];
                    bezierArr[7] = parseFloat(bezierArr[9]) + disY / scale;
                    bezierArr[8] = parseFloat(bezierArr[8]) + disX / scale;
                    bezierArr[9] = bezierArr[7];
                    this.$set(this.viewer.lines, index, bezierArr.join(' '));
                };
                for (var i = 0; i < relativeOutports.length; i++) {
                    var relativeOutport = relativeOutports[i];
                    var index = relativeOutport.index;
                    var bezierArr = relativeOutport.bezier.split(' ');
                    bezierArr[1] = parseFloat(bezierArr[1]) + disX / scale;
                    bezierArr[2] = parseFloat(bezierArr[2]) + disY / scale;
                    bezierArr[4] = (parseFloat(bezierArr[1]) + parseFloat(bezierArr[8])) / 2;
                    bezierArr[5] = bezierArr[2];
                    bezierArr[6] = bezierArr[4];
                    this.$set(this.viewer.lines, index, bezierArr.join(' '));
                };
            })
        },
        moveupMain(event, main, index) {
            // this.viewer.record();
        },
        mouseoverPort(main, index, port, ind, x, y) {
            return
            let detail = main.detail;
            let id = port.slice(0, port.indexOf('_'));
            let func;
            for (var i = 0; i < detail.tableFuncs.length; i++) {
                if (detail.tableFuncs[i].id.toString() == id) {
                    func = detail.tableFuncs[i];
                    break
                }
            };
            let mainPosition = this.createCoordinatByMatrix(this.viewer.matrixes[index]);
            this.currentPort = {
                varname: func.varname,
                vartype: func.vartype,
                parametername: func.parametername,
                varvalue: func.valvalue
            };
            this.currentPort.x = mainPosition.x + x;
            this.currentPort.y = mainPosition.y + y - 14;
        },
        movestartOutport(event, main, index, outport, ind) {
            this.state = true;
            this.firstId = main.id;
            let mainPosition = this.createCoordinatByMatrix(this.viewer.matrixes[index]);
            let x = this.calculateOutportPosionX(main, index, outport, ind) + this.portWidth;
            let y = this.calculateOutportPosionY(main, index, outport, ind) + this.portHeight / 2
            this.vary = {
                x: mainPosition.x + x,
                y: mainPosition.y + y
            };
            let detail = main.detail;
            let id = outport.slice(0, outport.indexOf('_'));
            this.firstId = main.id + '|' + outport;
            this.viewer.lines.push(this.createLineBezier(this.vary, this.vary));
        },
        moveOutport(event, main, index, outport, ind) {
            let scale = this.createCoordinatByMatrix(this.viewer.svgMatrix).scale;
            let disX = event.detail.center.x - tob.gestures.session.firstTouch.center.x;
            let disY = event.detail.center.y - tob.gestures.session.firstTouch.center.y;
            let position = {
                x: this.vary.x + disX / scale,
                y: this.vary.y + disY / scale
            };
            this.$set(this.viewer.lines, this.viewer.lines.length - 1, this.createLineBezier(this.vary, position));
        },
        moveupOutport(event, main, index, outport, ind) {
            this.state = false;
            var lines = this.viewer.lines;
            var line = lines[lines.length - 1];
            var arr = line.split(' ');
            var pos = {
                x: parseFloat(arr[8]),
                y: parseFloat(arr[9])
            };
            var mains = this.viewer.mains;
            var matrixes = this.viewer.matrixes;
            var relations = this.viewer.relations;
            var relation;
            var position;
            var f = this.firstId.split('|');
            let fromCsId = outport.slice(0, outport.indexOf('_'))
            let toCsId;
            for (var i = 0; i < mains.length; i++) {
                if (relation) break;
                var main = mains[i];
                var inports = main.inports;
                var mainPostion = this.createCoordinatByMatrix(matrixes[i]);
                for (var j = 0; j < inports.length; j++) {
                    var inport = inports[j];
                    var x = mainPostion.x + this.calculateInportPosionX(main, i, inport, j)
                    var y = mainPostion.y + this.calculateInportPosionY(main, i, inport, j);
                    var collision = this.collisionInports(pos, x, y, this.portWidth, this.portHeight);
                    if (collision) {
                        relation = this.firstId + '|' + main.id + '|' + inport;
                        toCsId = inport.slice(0, inport.indexOf('_'))
                        position = {
                            x: x + 0,
                            y: y + this.portHeight / 2
                        }
                        break;
                    };
                };
            };
            if (!relation) {
                this.viewer.lines.pop();
                console.log('取消绘制');
                return;
            }
            if (relations.indexOf(relation) > -1) {
                this.viewer.lines.pop();
                console.log('已存在关联关系');
                return;
            };
            //1.检测是否自我输入输出
            var relationArr = relation.split('|');
            if (relationArr[0] == relationArr[2]) {
                this.viewer.lines.pop();
                console.log('不能自我输入输出');
                return;
            };
            //检测是否闭环链接
            // let coupleString = this.viewer.relations.length ? this.viewer.relations.join(',') + ',' + relation : relation;
            // console.log(coupleString)
            // let couple  = coupleString.split(',');
            // let nodes = [];
            // let rel = [];
            // couple.forEach((cp)=>{
            //      let arr = cp.split('|');
            //      let node01 = arr[0].slice(arr[0].indexOf('_')+1);
            //      let node02 = arr[2].slice(arr[2].indexOf('_')+1);
            //      let from = arr[1].slice(arr[1].indexOf('_')+1);
            //      let to = arr[3].slice(arr[3].indexOf('_')+1);
            //      nodes.push({
            //          id:node01
            //      });
            //      nodes.push({
            //         id:node02
            //     });
            //     rel.push({
            //         from:from,
            //         to:to
            //     })
            // });
            // let validateTree = new ValidateTree({
            //     nodes:nodes,
            //     edges:rel
            // });
            // if(validateTree.closed){
            //     this.viewer.lines.pop();
            //     console.log('不能闭环');
            //     return;
            // }
            //检测类型是否匹配关联

            let types = ['2', 'int', 'long', 'short', 'float', 'double', 'number'];
            let typeFrom, typeTo;
            // main.detail.tableFuncs.map(s=>{
            //     if(s.id == fromCsId){
            //         if(s.vartype == 1){
            //             typeFrom =s.valvalue
            //         }
            //         if(s.vartype == 2){
            //             typeFrom = "常量"
            //         }
            //         if(s.vartype == 3){
            //             typeFrom = "模型"
            //         }
            //     }
            // })
            var fromtableFuncs;
            mains.map(s => {
                if (s.id == relationArr[0]) {
                    fromtableFuncs = s.detail.tableFuncs
                }
            })
            fromtableFuncs.map(s => {
                if (s.id == fromCsId) {
                    if (s.vartype == 1) {
                        typeFrom = s.valvalue
                    }
                    if (s.vartype == 2) {
                        typeFrom = "常量"
                    }
                    if (s.vartype == 3) {
                        typeFrom = "模型"
                    }
                }
            })
            main.detail.tableFuncs.map(s => {
                if (s.id == toCsId) {
                    if (s.vartype == 1) {
                        typeTo = s.valvalue
                    }
                    if (s.vartype == 2) {
                        typeTo = "常量"
                    }
                    if (s.vartype == 3) {
                        typeTo = "模型"
                    }
                }
            })
            console.log(typeFrom, typeTo);
            var typeAll = ["常量", "int", "long", "short", "float", "double", "number"]
            if (typeFrom == typeTo) {

            } else if (typeAll.includes(typeFrom) && typeAll.includes(typeTo)) {

            } else {
                this.viewer.lines.pop();
                toastr.info(`类型不匹配!`)
                return;
            }

            arr[4] = (position.x + parseFloat(arr[1])) / 2;
            arr[6] = arr[4];
            arr[7] = position.y;
            arr[8] = position.x;
            arr[9] = position.y;
            var str = arr.join(' ');
            this.viewer.lines.pop();
            this.viewer.lines.push(str);
            this.viewer.relations.push(relation);
            //添加连线动作:
            var dataBaseIn = {
                "interfaceRoleDataModels":
                {
                    "algorithmconditions": [],
                    "des": "",
                    "id": 0,
                    "interfaceID": relationArr[2],
                    "parametersID": relationArr[3],
                    "preInterfaceID": relationArr[0],
                    "preParametersID": relationArr[1],
                    "remark": "",
                    "roleid": 0,
                    "actionRelation": "",
                    fromSzId: relationArr[2]
                }
            }
            var dataBaseOut = {
                "interfaceRoleDataModels":
                {
                    "algorithmconditions": [],
                    "des": "",
                    "id": 0,
                    "interfaceID": relationArr[2],
                    "parametersID": relationArr[3],
                    "preInterfaceID": relationArr[0],
                    "preParametersID": relationArr[1],
                    "remark": "",
                    "roleid": 0,
                    "preActionRelation": "",
                    toSzId: relationArr[0]
                }
            };
            var action = {
                id: dataBaseOut.interfaceRoleDataModels.toSzId + '|' + relationArr[1] + "AND" + dataBaseIn.interfaceRoleDataModels.fromSzId + '|' + relationArr[3],
                dataIn: dataBaseIn,
                dataOut: dataBaseOut
            };
            this.viewer.actions.push(action);
            this.viewer.record();
        },
        collisionInports(pos, x, y, w, h) {
            if (pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h) {
                return true;
            };
            return false;
        },
        check(relation) {
            //1.是否自我输入输出
            var relations = this.viewer.relations;
            //....
        },
        getRelativePortsByMain(main) {
            var inports = main.inports;
            var outports = main.outports;
            var relations = this.viewer.relations;
            var lines = this.viewer.lines;
            var relativeInports = [];
            var relativeOutports = [];
            for (var i = 0; i < inports.length; i++) {
                var rel = main.id + '|' + inports[i];
                for (var j = 0; j < relations.length; j++) {
                    var relation = relations[j];
                    var arr = relation.split('|');
                    var _rel = arr[2] + '|' + arr[3];
                    if (rel == _rel) {
                        relativeInports.push({
                            index: j,
                            bezier: lines[j]
                        });
                    }
                };
            };
            for (var i = 0; i < outports.length; i++) {
                var rel = main.id + '|' + outports[i];
                for (var j = 0; j < relations.length; j++) {
                    var relation = relations[j];
                    var arr = relation.split('|');
                    var _rel = arr[0] + '|' + arr[1];
                    if (rel == _rel) {
                        relativeOutports.push({
                            index: j,
                            bezier: lines[j]
                        });
                    }
                };
            };
            return [relativeInports, relativeOutports]
        },
        calculateCircleX(line) {
            let arr = line.split(' ');
            return parseFloat(arr[8]);
        },
        calculateCircleY(line) {
            let arr = line.split(' ');
            return parseFloat(arr[9]);
        },
        chooseMain($event, main, index) {
            this.currentMain = main;
            this.currentLine = null;
            this.$emit('choose-main', main)
        },
        highlightMain(main, index) {
            this.currentMain = main;
            this.currentLine = null;
            this.$emit('highlight-main', main, index)
        },
        highlightLine(line, index) {
            this.currentLine = line;
            this.currentMain = null;
            this.$emit('highlight-line', line, index)
        },
        showLineDetail(line, index) {
            // let action = deepClone(this.viewer.actions[index]);
            // let relation = this.viewer.relations[index];
            // let relationArr = relation.split('|');
            // let from = {
            //     interfaceId: parseInt(relationArr[0].slice(0, relationArr[0].indexOf('_'))),
            //     interfaceUuid: relationArr[0].slice(relationArr[0].indexOf('_') + 1),
            //     paramId: parseInt(relationArr[1].slice(0, relationArr[1].indexOf('_'))),
            //     paramUuid: relationArr[1].slice(relationArr[1].indexOf('_') + 1),
            // };
            // let to = {
            //     interfaceId: parseInt(relationArr[2].slice(0, relationArr[0].indexOf('_'))),
            //     uuid: relationArr[2].slice(relationArr[0].indexOf('_') + 1),
            //     paramId: parseInt(relationArr[3].slice(0, relationArr[3].indexOf('_'))),
            //     paramUuid: relationArr[3].slice(relationArr[3].indexOf('_') + 1),
            // };
            // for (var i = 0; i < this.viewer.mains.length; i++) {
            //     let mainId = parseInt(this.viewer.mains[i].id.slice(0, this.viewer.mains[i].id.indexOf('_')));
            //     if (mainId == from.interfaceId) {
            //         from.detail = deepClone(this.viewer.mains[i].detail);
            //     };
            //     if (mainId == to.interfaceId) {
            //         to.detail = deepClone(this.viewer.mains[i].detail);
            //     };
            // };
            // let detail = {
            //     from: from,
            //     to: to
            // }
            var action = this.viewer.actions[index];
            let relation = this.viewer.relations[index];
            let arr = relation.split('|');
            let firstMainId = arr[0];
            let secondMainId = arr[2];
            let firstPortId = arr[1];
            let secondPortId = arr[3];
            let firstMain, secondMain;
            for (let i = 0; i < this.viewer.mains.length; i++) {
                if (firstMainId == this.viewer.mains[i].id) {
                    firstMain = this.viewer.mains[i];
                };
                if (secondMainId == this.viewer.mains[i].id) {
                    secondMain = this.viewer.mains[i];
                };
            };
            let detail = {
                mains: [firstMain, secondMain],
                ports: [firstPortId, secondPortId],
                index: index,
                action: action
            };
            // this.$emit('line-contextmenu', event, detail);
            this.$emit('line-detail', action, detail);
        },
        clickView() {
            this.currentMain = null;
            this.currentLine = null;
        },
        updateMainParams(main, outports) {
            let currentMain, mainIndex;
            let num = 0;
            for (let i = 0; i < this.viewer.mains.length; i++) {
                if (this.viewer.mains[i].id == main.id) {
                    currentMain = this.viewer.mains[i];
                    mainIndex = i;
                    break;
                };
            };
            let orginOutports = currentMain.outports;
            let funcs = currentMain.detail.tableFuncs;
            funcs.forEach((func) => {
                if (func.inorout == 1) {
                    num++;
                };
            });
            let nowOutports = outports.map((outport) => {
                return outport.id;
            });
            nowOutports = (orginOutports.slice(0, num)).concat(nowOutports);
            let preOutports = currentMain.outports;
            currentMain.outports = nowOutports;
            preOutports.forEach((preOutport) => {
                if (nowOutports.indexOf(preOutport) < 0) {
                    let outport = preOutport;
                    for (let i = 0; i < this.viewer.relations.length; i++) {
                        let relation = this.viewer.relations[i]
                        let relationArr = relation.split('|');
                        if (relationArr[1] == outport) {
                            this.viewer.relations.splice(i, 1);
                            this.viewer.lines.splice(i, 1);
                            this.viewer.actions.splice(i, 1);
                            i -= 1;
                        };
                    };
                };
            });
            let mainCoordinate = this.createCoordinatByMatrix(this.viewer.matrixes[mainIndex]);
            let relativeRelation = this.getRelativePortsByMain(currentMain);
            let relativeOutports = relativeRelation[1];
            let outportIds = currentMain.outports;
            let inportIds = currentMain.inports;
            for (var i = 0; i < outportIds.length; i++) {
                var outport = outportIds[i];
                for (var j = 0; j < this.viewer.relations.length; j++) {
                    var relation = this.viewer.relations[j];
                    var arr = relation.split('|');
                    if (arr[0] == currentMain.id && arr[1] == outportIds[i]) {
                        var index = j;
                        var line = this.viewer.lines[index];
                        var x = this.calculateOutportPosionX(currentMain) + this.portWidth / 2;
                        var y = this.calculateOutportPosionY(currentMain, null, null, i) + this.portHeight / 2 + mainCoordinate.y;
                        var bezierArr = line.split(' ');
                        bezierArr[2] = bezierArr[5] = y;
                        this.$set(this.viewer.lines, index, bezierArr.join(' '));
                    }
                }
            };
            for (var i = 0; i < inportIds.length; i++) {
                var inport = inportIds[i];
                for (var j = 0; j < this.viewer.relations.length; j++) {
                    var relation = this.viewer.relations[j];
                    var arr = relation.split('|');
                    if (arr[2] == currentMain.id && arr[3] == inport) {
                        var index = j;
                        var line = this.viewer.lines[index];
                        var x = this.calculateInportPosionX(currentMain) + this.portWidth / 2;
                        var y = this.calculateInportPosionY(currentMain, null, null, i) + this.portHeight / 2 + mainCoordinate.y;
                        var bezierArr = line.split(' ');
                        bezierArr[7] = bezierArr[9] = y;
                        this.$set(this.viewer.lines, index, bezierArr.join(' '));
                    }
                }
            };

        },
        adjustMainLine(main, outportsArr) {
            let mainIndex = -1;
            // this.viewer.mains[0] = main;
            this.viewer.mains.forEach((m, index) => {
                if (m.id == main.id) {
                    mainIndex = index;
                };
            });
            main = this.viewer.mains[mainIndex];
            let num = 0;
            main.detail.tableFuncs.forEach((func) => {
                if (func.inorout == 1) {
                    num++;
                }
            })
            // this.viewer.mains[mainIndex].outports = this.viewer.mains[mainIndex].outports.slice(0,num)
            outportsArr.forEach((outport) => {
                this.viewer.mains[mainIndex].outports.push(outport);
            })
            let mainCoordinate = this.createCoordinatByMatrix(this.viewer.matrixes[mainIndex]);
            let relativeRelation = this.getRelativePortsByMain(main);
            let relativeOutports = relativeRelation[1];
            let outportIds = main.outports;
            let inportIds = main.inports;
            for (var i = 0; i < outportIds.length; i++) {
                var outport = outportIds[i];
                for (var j = 0; j < this.viewer.relations.length; j++) {
                    var relation = this.viewer.relations[j];
                    var arr = relation.split('|');
                    if (arr[0] == main.id && arr[1] == outportIds[i]) {
                        var index = j;
                        var line = this.viewer.lines[index];
                        var x = this.calculateOutportPosionX(main) + this.portWidth / 2;
                        var y = this.calculateOutportPosionY(main, null, null, i) + this.portHeight / 2 + mainCoordinate.y;
                        var bezierArr = line.split(' ');
                        bezierArr[2] = bezierArr[5] = y;
                        this.$set(this.viewer.lines, index, bezierArr.join(' '));
                    }
                }
            };
            for (var i = 0; i < inportIds.length; i++) {
                var inport = inportIds[i];
                for (var j = 0; j < this.viewer.relations.length; j++) {
                    var relation = this.viewer.relations[j];
                    var arr = relation.split('|');
                    if (arr[2] == main.id && arr[3] == inport) {
                        var index = j;
                        var line = this.viewer.lines[index];
                        var x = this.calculateInportPosionX(main) + this.portWidth / 2;
                        var y = this.calculateInportPosionY(main, null, null, i) + this.portHeight / 2 + mainCoordinate.y;
                        var bezierArr = line.split(' ');
                        bezierArr[7] = bezierArr[9] = y;
                        this.$set(this.viewer.lines, index, bezierArr.join(' '));
                    }
                }
            };
        },
        deleteMainOrLine() {
            if (!this.currentMain && !this.currentLine) {

            } else if (this.currentMain) {
                this.viewer.removeMain(this.currentMain);
                this.currentMain = null;
            } else if (this.currentLine) {
                this.viewer.removeRelation(this.currentLine);
                this.currentLine = null;
            }
        },
        getInportItems(funcs) {
            return funcs.filter((func) => {
                return !func.inorout
            })
        },
        getOutportItems(funcs) {
            return funcs.filter((func) => {
                return func.inorout
            })
        },
        calculteLinearGradientStart(num) {
            return 'blue'
        },
        calculteLinearGradientEnd(num) {
            return 'pink'
        },
        calculatePathColor(line, index) {
            console.log(this.viewer.relations[index])
            try {
                let relation = this.viewer.relations[index];
                let relationArr = relation.split('|');
                let mainId = relationArr[0];
                let portId = relationArr[1].slice(0, relationArr[1].indexOf('_'));
                let main;
                for (var i = 0; i < this.viewer.mains.length; i++) {
                    if (this.viewer.mains[i].id == mainId) {
                        main = this.viewer.mains[i];
                        break;
                    };
                };
                let detail = main.detail;
                let vartype, valvalue;
                detail.tableFuncs.forEach((func) => {
                    if (func.id.toString() == portId) {
                        vartype = func.vartype;
                        valvalue = func.valvalue;
                    }
                });
                return this.getColor(vartype, valvalue);
            } catch (e) {
                return 'blue'
            }
            //return 'url(#gradient'+(index+1)+')'
        },
        calculatePortFillColor(main, index, port) {
            let detail = main.detail;
            let portID = port.slice(0, port.indexOf('_'));
            let vartype, valvalue;
            for (var i = 0; i < detail.tableFuncs.length; i++) {
                let id = detail.tableFuncs[i].id.toString();
                if (id == portID) {
                    vartype = detail.tableFuncs[i].vartype;
                    valvalue = detail.tableFuncs[i].valvalue;
                }
            };

            return this.getColor(vartype, valvalue);
        },
        getTypeName(vartype) {
            let name;
            switch (vartype) {
                case '1':      //基本类型
                    name = '基本类型';
                    break;
                case '2':      //基本类型
                    name = '常量';
                    break;
                case '3':      //模型
                    name = '模型';
                    break;
            };
            return name ? name : vartype;
        },
        getColor(vartype, valvalue) {
            let color;
            if (vartype == '1') {
                vartype = valvalue;
            };
            switch (vartype) {
                case '2':      //基本类型
                    color = '#0eff23';
                    break;
                case '3':      //模型
                    color = '#ff00e7';
                    break;
                case 'int':      //基本类型
                    color = '#ff8d00';
                    break;
                case 'long':      //基本类型
                    color = '#a4ff59';
                    break;
                case 'byte':      //基本类型
                    color = '#ff7749';
                    break;
                case 'short':      //基本类型
                    color = '#fb61ff';
                    break;
                case 'float':      //基本类型
                    color = '#0000ff';
                    break;
                case 'double':      //基本类型
                    color = '#008000';
                    break;
                case 'boolean':      //基本类型
                    color = '#00ffff';
                    break;
                case 'number':      //基本类型
                    color = '#ffa500';
                    break;
                case 'char':      //基本类型
                    color = '#7cc6ff';
                    break;
                case 'date':      //基本类型
                    color = '#ff4286';
                    break;
                case 'string':      //基本类型
                    color = '#00c1ff';
                    break;
                case 'blob':      //基本类型
                    color = '#6a46ff';
                    break;
                case 'array':      //基本类型
                    color = '#ffe964';
                    break;
            };
            return color;
        },
        mousewheel(event) {
            let info = this.createCoordinatByMatrix(this.viewer.svgMatrix);
            var step = .05;
            var scale = info.scale;
            if (event.deltaY < 0) {
                scale = scale >= this.maxZoom ? this.maxZoom : scale + step;
            } else {
                scale = scale <= this.minZoom ? this.minZoom : scale - step;
            };
            this.viewer.svgMatrix = 'matrix(' + scale + ',0,0,' + scale + ',' + info.x + ',' + info.y + ')'
            this.$forceUpdate()
        },
        initEvent() {
            var step = .05;
            this.$bus.$on('rebuild', () => {
                this.build();
            })
        }
    },
    created(){
        
    },
    mounted (){
  
    }
}
// (function (i) {
//     var uid = 0;
//     var a = function () { };
//     var b = {
//         tips: [],
//         viewers: [],  //整个画布存放的多个画布
//         viewer: null,    //当前编辑的画布
//         rebuild() {
//             this.viewer = new c();  //实例化画布
//             this.viewers.push(this.viewer);
//         }
//     };
//     a.prototype = b;
//     var c = function () {
//         this.uid = uid++;
//         this.init();
//     };
//     var d = {
//         init() {
//             this.title = '';     //视图名称（规则名称)
//             this.mains = [];   //算子对象集合
//             this.lines = [];   //关联线集合
//             this.remarks = [];  //关联线的备注集合
//             this.relations = [];    //关系集合
//             this.matrixes = [];     //算子矩阵集合
//             this.records = [];      //画布历史操作记录
//             this.actions = [];      //关联线对应动作集合
//             this.id = '';           //该画布对应的算法ID
//             this.tableRole = {}; //该画布的规则信息
//             this.status = false;  //该画布修改状态
//             this.svgMatrix = 'matrix(1,0,0,1,0,0)';  //画布平移缩放矩阵
//         },
//         addMain: function (main, matrix) {
//             this.mains.push(main);
//             this.matrixes.push(matrix);
//             this.record();
//         },
//         addLine(matrix) {
//             this.lines.push(matrix);
//         },
//         record: function () {     //保存记录;
//             var clone = {
//                 mains: dc(this.mains),
//                 lines: dc(this.lines),
//                 remarks: dc(this.remarks),
//                 relations: dc(this.relations),
//                 matrixes: dc(this.matrixes),
//                 svgMatrix: this.svgMatrix,
//                 actions: dc(this.actions)
//             };
//             this.records.push(clone);
//             this.status = true;
//         },
//         back: function () {    //回退
//             if (!this.records.length) {
//                 b.tips.push(103);
//                 return;
//             };
//             this.records.pop();
//             if (!this.records.length) {
//                 this.update();
//                 return;
//             };
//             this.update(this.records[this.records.length - 1]);
//             b.tips.push(102);
//         },
//         empty() {
//             this.mains = [];
//             this.lines = [];
//             this.remarks = [];
//             this.relations = [];
//             this.matrixes = [];
//             this.actions = [];
//             this.svgMatrix = 'matrix(1,0,0,1,0,0)';
//             this.record();
//         },
//         dispose() {
//             this.empty();
//             this.records = [];
//         },
//         removeLine: function (index) {
//             this.lines.splice(index, 1);
//             this.relations.splice(index, 1);
//             this.actions.splice(index, 1);
//             b.tips.push(102);
//             this.record();
//         },
//         removeMain: function (index) {
//             let main = this.mains[index];
//             this.mains.splice(index, 1);
//             this.matrixes.splice(index, 1);
//             for (let i = 0; i < this.relations.length; i++) {
//                 var relation = this.relations[i];
//                 var arr = relation.split('|');
//                 if (arr[0] == main.id || arr[2] == main.id) {
//                     this.relations.splice(i, 1);
//                     this.lines.splice(i, 1);
//                     this.actions.splice(i, 1);
//                     i -= 1;
//                 };
//             };
//             this.record();
//         },
//         removeRelation: function (line) {
//             for (let i = 0; i < this.lines.length; i++) {
//                 if (this.lines[i] == line) {
//                     this.lines.splice(i, 1);
//                     this.relations.splice(i, 1);
//                     this.actions.splice(i, 1);
//                     break;
//                 }
//             };
//             this.record();
//         },
//         updateMainFuncs(main, funcs) {
//             let coreMain;
//             let index;
//             for (var i = 0; i < this.mains.length; i++) {
//                 if (this.mains[i].id == main.id) {
//                     coreMain = this.mains[i];
//                     break;
//                 };
//             };
//             if (!coreMain) return;
//             var inports = funcs.filter((func) => {
//                 return !func.inorout
//             });
//             var outports = funcs.filter((func) => {
//                 return func.inorout
//             });

//             coreMain.outports = outports.map((port) => {
//                 return port.id;
//             });
//             coreMain.inports = inports.map((port) => {
//                 return port.id;
//             });
//             coreMain.detail.tableFuncs = funcs;
//             this.record();
//         },
//         update(record) {
//             if (!record) {
//                 this.init();
//                 return;
//             };
//             this.title = record.title;
//             this.mains = dc(record.mains);
//             this.lines = dc(record.lines);
//             this.remarks = dc(record.remarks);
//             this.relations = dc(record.relations);
//             this.matrixes = dc(record.matrixes);
//             this.svgMatrix = record.svgMatrix;
//             this.actions = dc(record.actions);
//             this.tableRole = record.tableRole
//         }
//     };
//     c.prototype = d;
//     var e = {           //（暂无意义）
//         101: '添加主体成功',
//         102: '撤销成功',
//         103: '不可撤销'
//     };
//     var dc = function (o, r) {
//         r = r || [];
//         var c = Array.isArray(o) ? [] : {};
//         if (o && typeof o == 'object') {
//             for (var k in o) {
//                 if (o.hasOwnProperty(k) && (r.indexOf(k) < 0 || r != k)) {
//                     if (o[k] && typeof o[k] == 'object') {
//                         c[k] = dc(o[k]);
//                     } else {
//                         c[k] = o[k];
//                     }
//                 }
//             }
//         };
//         return c;
//     }
//     i.RxSvg = a;   //封装画布
// })(window);
</script>

<style scoped>
.myCanvas{
    width: 100%; 
    height: 80%;
    /* box-shadow: 0 0 10px 1px #191919 inset; */
}
#myCanvas>div:last-child{
    color:#fff
}
</style>
