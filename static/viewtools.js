(function (i) {
    var uid = 0;
    var a = function () { };
    var b = {
        tips: [],
        viewers: [],  //整个画布存放的多个画布
        viewer: null,    //当前编辑的画布
        rebuild() {
            this.viewer = new c();  //实例化画布
            this.viewers.push(this.viewer);
        }
    };
    a.prototype = b;
    var c = function () {
        this.uid = uid++;
        this.init();
    };
    var d = {
        init() {
            this.title = '';     //视图名称（规则名称)
            this.mains = [];   //算子对象集合
            this.lines = [];   //关联线集合
            this.remarks = [];  //关联线的备注集合
            this.relations = [];    //关系集合
            this.matrixes = [];     //算子矩阵集合
            this.records = [];      //画布历史操作记录
            this.actions = [];      //关联线对应动作集合
            this.id = '';           //该画布对应的算法ID
            this.tableRole = {}; //该画布的规则信息
            this.status = false;  //该画布修改状态
            this.svgMatrix = 'matrix(1,0,0,1,0,0)';  //画布平移缩放矩阵
        },
        addMain: function (main, matrix) {
            this.mains.push(main);
            this.matrixes.push(matrix);
            this.record();
        },
        addLine(matrix) {
            this.lines.push(matrix);
        },
        record: function () {     //保存记录;
            var clone = {
                mains: dc(this.mains),
                lines: dc(this.lines),
                remarks: dc(this.remarks),
                relations: dc(this.relations),
                matrixes: dc(this.matrixes),
                svgMatrix: this.svgMatrix,
                actions: dc(this.actions)
            };
            this.records.push(clone);
            this.status = true;
        },
        back: function () {    //回退
            if (!this.records.length) {
                b.tips.push(103);
                return;
            };
            this.records.pop();
            if (!this.records.length) {
                this.update();
                return;
            };
            this.update(this.records[this.records.length - 1]);
            b.tips.push(102);
        },
        empty() {
            this.mains = [];
            this.lines = [];
            this.remarks = [];
            this.relations = [];
            this.matrixes = [];
            this.actions = [];
            this.svgMatrix = 'matrix(1,0,0,1,0,0)';
            this.record();
        },
        dispose() {
            this.empty();
            this.records = [];
        },
        removeLine: function (index) {
            this.lines.splice(index, 1);
            this.relations.splice(index, 1);
            this.actions.splice(index, 1);
            b.tips.push(102);
            this.record();
        },
        removeMain: function (index) {
            let main = this.mains[index];
            this.mains.splice(index, 1);
            this.matrixes.splice(index, 1);
            for (let i = 0; i < this.relations.length; i++) {
                var relation = this.relations[i];
                var arr = relation.split('|');
                if (arr[0] == main.id || arr[2] == main.id) {
                    this.relations.splice(i, 1);
                    this.lines.splice(i, 1);
                    this.actions.splice(i, 1);
                    i -= 1;
                };
            };
            this.record();
        },
        removeRelation: function (line) {
            for (let i = 0; i < this.lines.length; i++) {
                if (this.lines[i] == line) {
                    this.lines.splice(i, 1);
                    this.relations.splice(i, 1);
                    this.actions.splice(i, 1);
                    break;
                }
            };
            this.record();
        },
        updateMainFuncs(main, funcs) {
            let coreMain;
            let index;
            for (var i = 0; i < this.mains.length; i++) {
                if (this.mains[i].id == main.id) {
                    coreMain = this.mains[i];
                    break;
                };
            };
            if (!coreMain) return;
            var inports = funcs.filter((func) => {
                return !func.inorout
            });
            var outports = funcs.filter((func) => {
                return func.inorout
            });

            coreMain.outports = outports.map((port) => {
                return port.id;
            });
            coreMain.inports = inports.map((port) => {
                return port.id;
            });
            coreMain.detail.tableFuncs = funcs;
            this.record();
        },
        update(record) {
            if (!record) {
                this.init();
                return;
            };
            this.title = record.title;
            this.mains = dc(record.mains);
            this.lines = dc(record.lines);
            this.remarks = dc(record.remarks);
            this.relations = dc(record.relations);
            this.matrixes = dc(record.matrixes);
            this.svgMatrix = record.svgMatrix;
            this.actions = dc(record.actions);
            this.tableRole = record.tableRole
        }
    };
    c.prototype = d;
    var e = {           //（暂无意义）
        101: '添加主体成功',
        102: '撤销成功',
        103: '不可撤销'
    };
    var dc = function (o, r) {
        r = r || [];
        var c = Array.isArray(o) ? [] : {};
        if (o && typeof o == 'object') {
            for (var k in o) {
                if (o.hasOwnProperty(k) && (r.indexOf(k) < 0 || r != k)) {
                    if (o[k] && typeof o[k] == 'object') {
                        c[k] = dc(o[k]);
                    } else {
                        c[k] = o[k];
                    }
                }
            }
        };
        return c;
    }
    i.RxSvg = a;   //封装画布
})(window);
function viewTool(data) {
    this.roleId = -1;
    this.id = -1;
    this.title = '';
    this.ports = [];
    this.nodes = [];
    this.actions = [];
    this.mains = [];
    this.lines = [];
    this.relations = [];
    this.matrixes = [];
    this.coordinate = {};
    this.svgMatrix = '';
    this.nodeId = [];
    this.tableRole = {};
    this.initData(data);
};

viewTool.prototype.getMains = function (nodes) {
    var arr = [];
    this.nodes.map((node) => {
        let main = {
            id: node.id + '_' + node.uuid,
            outports: [],
            inports: [],
            detail: {}
        };
        for (var i = 0; i < this.ports.length; i++) {
            if (this.ports[i].from[0] == node.id && this.ports[i].from[1] == node.uuid) {
                if (this.ports[i].inorout == 1) {
                    main.outports.push(this.ports[i].from[2] + '_' + this.ports[i].id);
                } else {
                    main.inports.push(this.ports[i].from[2] + '_' + this.ports[i].id);
                }
            }
        };
        arr.push(main);
    });
    return arr;
};

viewTool.prototype.getMatrixes = function () {
    var arr = [];
    this.mains.forEach((main) => {
        let uuid = main.id.slice(main.id.indexOf('_') + 1);
        let matrix = this.coordinate.matrixes[uuid];
        arr.push(matrix);
    });
    return arr;
};

viewTool.prototype.getNodes = function (data) {
    let nodes = data.operatorInterfaceDataModels.map((model) => {
        return {
            id: model.algorithmID,
            uuid: model.id
        }
    });
    return nodes;
};

viewTool.prototype.getTitle = function (data) {
    return data.tableRole.rolename;
}
viewTool.prototype.getTableRole = function (data) {
    return data.tableRole
}
viewTool.prototype.getPorts = function (data) {
    let ports = [];
    data.operatorInterfaceDataModels.forEach((model) => {
        let from = model.algorithmID;
        let portsArr = model.tableInterfaceparametersList;
        portsArr.forEach((port) => {
            if (port.inorout == 0) {
                ports.push({
                    from: [from, port.interfaceid, port.parameterssources],
                    id: port.id,
                    inorout: 0
                });
            } else {
                ports.push({
                    from: [from, port.interfaceid, port.parameterssources],
                    id: port.id,
                    inorout: 1
                });
            }
        });
    });
    var arr = ports.map((port) => {
        return parseFloat(port.from[2]);
    });
    arr.sort();
    var arr2 = [];
    arr.forEach((num) => {
        if (arr2.indexOf(num) < 0) {
            arr2.push(num);
        };
    });
    var res = [];
    for (var i = 0; i < arr2.length; i++) {
        ports.forEach((port) => {
            if (arr2[i] == parseFloat(port.from[2])) {
                res.push(port);
            }
        })
    }
    return res;
};

viewTool.prototype.getRelations = function (relations) {
    let nodes = this.nodes;
    let ports = this.ports;
    let arr = [];
    relations.forEach((relation) => {
        let relationArr = relation.split('|');
        let result = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].uuid == relationArr[0]) {
                result[0] = nodes[i].id + '_' + nodes[i].uuid;
            } else if (nodes[i].uuid == relationArr[2]) {
                result[2] = nodes[i].id + '_' + nodes[i].uuid;
            };
        };
        for (var i = 0; i < ports.length; i++) {
            if (ports[i].id == relationArr[1]) {
                result[1] = ports[i].from[2] + '_' + ports[i].id;
            } else if (ports[i].id == relationArr[3]) {
                result[3] = ports[i].from[2] + '_' + ports[i].id;
            }
        };
        arr.push(result.join('|'));
    })
    return arr;
}

viewTool.prototype.getActions = function (data) {
    var ports = this.getPorts(data);
    let actions = [];
    let behaviors = data.interfaceRoleDataModels;
    behaviors.forEach((behavior) => {
        let preparameterId = behavior.preParametersID;
        let parameterId = behavior.parametersID;
        let m, n;
        let obj = {
            id: behavior.id,
            dataIn: {
                interfaceRoleDataModels: {
                    actionRelation: behavior.actionRelation,
                    algorithmconditions: [],
                    des: '',
                    fromSzId: behavior.interfaceID,
                    id: behavior.id,
                    interfaceID: behavior.interfaceID,
                    parametersID: behavior.parametersID,
                    preInterfaceID: behavior.preInterfaceID,
                    preParametersID: behavior.preParametersID,
                    remark: '',
                    roleid: behavior.roleid,
                }

            },
            dataOut: {
                interfaceRoleDataModels: {
                    algorithmconditions: [],
                    des: '',
                    id: behavior.id,
                    interfaceID: behavior.interfaceID,
                    parametersID: behavior.parametersID,
                    preInterfaceID: behavior.preInterfaceID,
                    preParametersID: behavior.preParametersID,
                    preActionRelation: behavior.preActionRelation,
                    remark: '',
                    roleid: behavior.roleid,
                    toSzId: behavior.preInterfaceID
                }
            }
        };
        behavior.algorithmconditions.forEach((rule) => {

            let condition = {
                behavior: rule.behavior,
                expression: rule.expression,
                id: rule.id,
                interfaceparametersid: rule.interfaceparametersid,
                interfaceroleid: rule.interfaceroleid,
                remark: '',
                valuesources: rule.valuesources.toString(),
                xh: ''
            };
            if (rule.interfaceparametersid == preparameterId) {
                obj.dataOut.interfaceRoleDataModels.algorithmconditions.push(condition);
            } else {
                obj.dataIn.interfaceRoleDataModels.algorithmconditions.push(condition);

            }
        });
        actions.push(obj);
    });
    return actions;
};
viewTool.prototype.initData = function (data) {
    this.roleId = this.id = data.id;
    this.coordinate = JSON.parse(data.tableRole.coordinate);
    this.nodeId = this.coordinate.mains;
    this.lines = this.coordinate.lines;
    this.nodes = this.getNodes(data);
    this.actions = this.getActions(data);
    this.ports = this.getPorts(data);
    this.relations = this.getRelations(this.coordinate.relations);
    this.svgMatrix = this.coordinate.svgMatrix;
    this.mains = this.getMains();
    this.matrixes = this.getMatrixes();
    this.title = this.getTitle(data);
    this.tableRole = this.getTableRole(data)
}

viewTool.prototype.recover = function (viewer, id) {
    viewer.id = id;
    viewer.title = this.title;
    viewer.tableRole = this.tableRole;
    var dc = function (o, r) {
        r = r || [];
        var c = Array.isArray(o) ? [] : {};
        if (o && typeof o == 'object') {
            for (var k in o) {
                if (o.hasOwnProperty(k) && (r.indexOf(k) < 0 || r != k)) {
                    if (o[k] && typeof o[k] == 'object') {
                        c[k] = dc(o[k]);
                    } else {
                        c[k] = o[k];
                    }
                }
            }
        };
        return c;
    }
    record = this;
    viewer.title = record.title;
    viewer.mains = dc(record.mains);
    viewer.lines = dc(record.lines);
    viewer.remarks = dc(record.remarks);
    viewer.relations = dc(record.relations);
    viewer.matrixes = dc(record.matrixes);
    viewer.svgMatrix = record.svgMatrix;
    viewer.actions = dc(record.actions);
    viewer.tableRole = record.tableRole
}