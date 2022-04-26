<template>
  <div class="EModel">
    <div class="evaluationModel">
      <ruleTree class="left-side-box" @treeId="treeId"></ruleTree>
      <div class="right-side-box">
        <div id="myCanvas">
          <my-canvas ref="centerhb"></my-canvas>
          <div class="message">操作信息</div>
        </div>
      </div>
      <div class="tree-content">
          <model-tree @drop="drop"></model-tree>
        </div>
    </div>
  </div>
</template>

<script>
import modelTree from "./components/modelTree";
import myCanvas from "./components/myCanvas";
import ruleTree from "./components/ruleTree";
export default {
  components: {
    myCanvas,
    modelTree,
    ruleTree,
  },
  name: "evaluationModel",
  data() {
    return {
      isCanvasAlive: false,
      nr: false,
    };
  },
  methods: {
    treeId(id) {
      var datas;
      var viewer = this.$refs.centerhb.viewer;
      let count = 0;
      let ids = [];
      var tool;
      this.nr = !this.nr;
      if (this.nr) {
        datas = {
          tableRole: {
            id: 43,
            rolename: "规则陈NEW",
            des: "111",
            entrancenote: "",
            uuserid: "",
            rolegroup: "规则分组1",
            status: "未发布",
            remark: "",
            remark2: "",
            coordinate:
              '{"mains":["456df5bc-6fe9-4805-87f0-b4c8886ad7b0","d2016f48-9f45-4430-941b-9e60b156d317","e0f97222-6b79-4543-a600-5a480a35cbf5","b536c2b3-4455-4973-beb7-956a8f00407b","45948001-c280-42c7-bda9-59826f9d7488"],"matrixes":{"456df5bc-6fe9-4805-87f0-b4c8886ad7b0":"matrix(1,0,0,1,771,285)","d2016f48-9f45-4430-941b-9e60b156d317":"matrix(1,0,0,1,1166,281)","e0f97222-6b79-4543-a600-5a480a35cbf5":"matrix(1,0,0,1,354,76)","b536c2b3-4455-4973-beb7-956a8f00407b":"matrix(1,0,0,1,352,290)","45948001-c280-42c7-bda9-59826f9d7488":"matrix(1,0,0,1,344,514)"},"lines":["M 578 126 C 662.5 126 662.5 335 747 335","M 576 340 C 661.5 340 661.5 335 747 335","M 995 335 C 1068.5 335 1068.5 331 1142 331","M 568 564 C 657.5 564 657.5 335 747 335"],"relations":["e0f97222-6b79-4543-a600-5a480a35cbf5|4c558b46-e2d2-4936-bfdb-af234e99e900|456df5bc-6fe9-4805-87f0-b4c8886ad7b0|2eb5cd21-09ff-4918-aa12-74956bd38cd3","b536c2b3-4455-4973-beb7-956a8f00407b|7b37116f-842e-4faa-8655-60f8dceb6dca|456df5bc-6fe9-4805-87f0-b4c8886ad7b0|2eb5cd21-09ff-4918-aa12-74956bd38cd3","456df5bc-6fe9-4805-87f0-b4c8886ad7b0|0278a051-2814-4c76-8132-5080d7c8c4fc|d2016f48-9f45-4430-941b-9e60b156d317|cad1ef7d-9794-4540-8395-76fae72d9f83","45948001-c280-42c7-bda9-59826f9d7488|1ae45224-8e3d-4681-a1a1-36087495943e|456df5bc-6fe9-4805-87f0-b4c8886ad7b0|2eb5cd21-09ff-4918-aa12-74956bd38cd3"],"svgMatrix":"matrix(1,0,0,1,-6,-11)"}',
            remark3: "",
          },
          operatorInterfaceDataModels: [
            {
              id: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
              tableInterfaceparametersList: [
                {
                  id: "0278a051-2814-4c76-8132-5080d7c8c4fc",
                  interfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                  parameterssources: "156",
                  parametersname: "HEIGHT",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
                  interfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                  parameterssources: "155",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "主成分分析",
              algorithmID: 52,
              roleID: 43,
            },
            {
              id: "45948001-c280-42c7-bda9-59826f9d7488",
              tableInterfaceparametersList: [
                {
                  id: "1ae45224-8e3d-4681-a1a1-36087495943e",
                  interfaceid: "45948001-c280-42c7-bda9-59826f9d7488",
                  parameterssources: "164",
                  parametersname: "ZJ",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "a0c233f7-5881-4e7f-b463-db1166e41741",
                  interfaceid: "45948001-c280-42c7-bda9-59826f9d7488",
                  parameterssources: "163",
                  parametersname: "JL",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "方差分析",
              algorithmID: 56,
              roleID: 43,
            },
            {
              id: "b536c2b3-4455-4973-beb7-956a8f00407b",
              tableInterfaceparametersList: [
                {
                  id: "7b37116f-842e-4faa-8655-60f8dceb6dca",
                  interfaceid: "b536c2b3-4455-4973-beb7-956a8f00407b",
                  parameterssources: "162",
                  parametersname: "WD",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "8f6e911f-9772-48c3-8fb1-27f653d397a3",
                  interfaceid: "b536c2b3-4455-4973-beb7-956a8f00407b",
                  parameterssources: "161",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "因子分析",
              algorithmID: 55,
              roleID: 43,
            },
            {
              id: "d2016f48-9f45-4430-941b-9e60b156d317",
              tableInterfaceparametersList: [
                {
                  id: "cad1ef7d-9794-4540-8395-76fae72d9f83",
                  interfaceid: "d2016f48-9f45-4430-941b-9e60b156d317",
                  parameterssources: "157",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
                {
                  id: "fe25a46b-710e-4330-90ab-95354741a2ce",
                  interfaceid: "d2016f48-9f45-4430-941b-9e60b156d317",
                  parameterssources: "158",
                  parametersname: "KD",
                  inorout: 1,
                  remark: "",
                },
              ],
              interfaceName: "最大频谱分析",
              algorithmID: 53,
              roleID: 43,
            },
            {
              id: "e0f97222-6b79-4543-a600-5a480a35cbf5",
              tableInterfaceparametersList: [
                {
                  id: "4c558b46-e2d2-4936-bfdb-af234e99e900",
                  interfaceid: "e0f97222-6b79-4543-a600-5a480a35cbf5",
                  parameterssources: "160",
                  parametersname: "SD",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "75da43d7-844c-4b49-9889-e9c6b91aa0a4",
                  interfaceid: "e0f97222-6b79-4543-a600-5a480a35cbf5",
                  parameterssources: "159",
                  parametersname: "RADIUS",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "层次分析",
              algorithmID: 54,
              roleID: 43,
            },
          ],
          interfaceRoleDataModels: [
            {
              id: 179,
              roleid: 43,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 179,
                roleid: 43,
                interfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                parametersid: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
                preinterfaceid: "e0f97222-6b79-4543-a600-5a480a35cbf5",
                preparametersid: "4c558b46-e2d2-4936-bfdb-af234e99e900",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "e0f97222-6b79-4543-a600-5a480a35cbf5",
              preParametersID: "4c558b46-e2d2-4936-bfdb-af234e99e900",
              preActionRelation: "",
              interfaceID: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
              parametersID: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
            },
            {
              id: 180,
              roleid: 43,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 180,
                roleid: 43,
                interfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                parametersid: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
                preinterfaceid: "b536c2b3-4455-4973-beb7-956a8f00407b",
                preparametersid: "7b37116f-842e-4faa-8655-60f8dceb6dca",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "b536c2b3-4455-4973-beb7-956a8f00407b",
              preParametersID: "7b37116f-842e-4faa-8655-60f8dceb6dca",
              preActionRelation: "",
              interfaceID: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
              parametersID: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
            },
            {
              id: 181,
              roleid: 43,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 181,
                roleid: 43,
                interfaceid: "d2016f48-9f45-4430-941b-9e60b156d317",
                parametersid: "cad1ef7d-9794-4540-8395-76fae72d9f83",
                preinterfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                preparametersid: "0278a051-2814-4c76-8132-5080d7c8c4fc",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
              preParametersID: "0278a051-2814-4c76-8132-5080d7c8c4fc",
              preActionRelation: "",
              interfaceID: "d2016f48-9f45-4430-941b-9e60b156d317",
              parametersID: "cad1ef7d-9794-4540-8395-76fae72d9f83",
            },
            {
              id: 182,
              roleid: 43,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 182,
                roleid: 43,
                interfaceid: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
                parametersid: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
                preinterfaceid: "45948001-c280-42c7-bda9-59826f9d7488",
                preparametersid: "1ae45224-8e3d-4681-a1a1-36087495943e",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "45948001-c280-42c7-bda9-59826f9d7488",
              preParametersID: "1ae45224-8e3d-4681-a1a1-36087495943e",
              preActionRelation: "",
              interfaceID: "456df5bc-6fe9-4805-87f0-b4c8886ad7b0",
              parametersID: "2eb5cd21-09ff-4918-aa12-74956bd38cd3",
            },
          ],
        };
        tool = new viewTool(datas);
        let mainIds = tool.nodes.map((node) => {
          return node.id;
        });
        mainIds.forEach((id) => {
          if (ids.indexOf(id) < 0) {
            ids.push(id);
          }
        });
        var details = [
          {
            tableAlgorithm: {
              id: 52,
              algorithmname: "主成分分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "123",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 155,
                parametername: "长度",
                algorithmid: 52,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 156,
                parametername: "高度",
                algorithmid: 52,
                varname: "HEIGHT",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 56,
              algorithmname: "方差分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 163,
                parametername: "距离",
                algorithmid: 56,
                varname: "JL",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 164,
                parametername: "直径",
                algorithmid: 56,
                varname: "ZJ",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 55,
              algorithmname: "因子分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 161,
                parametername: "长度",
                algorithmid: 55,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 162,
                parametername: "温度",
                algorithmid: 55,
                varname: "WD",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 53,
              algorithmname: "最大频谱分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 157,
                parametername: "长度",
                algorithmid: 53,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 158,
                parametername: "宽度",
                algorithmid: 53,
                varname: "KD",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 54,
              algorithmname: "层次分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 159,
                parametername: "半径",
                algorithmid: 54,
                varname: "RADIUS",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 160,
                parametername: "速度",
                algorithmid: 54,
                varname: "SD",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
        ];
      } else {
        datas = {
          tableRole: {
            id: 44,
            rolename: "陈规则攻击防御",
            des: "",
            entrancenote: "",
            uuserid: "",
            rolegroup: "规则分组1",
            status: "未发布",
            remark: "",
            remark2: "",
            coordinate:
              '{"mains":["e9e00a44-4e89-422f-a96a-3951a374e3dc","aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83","9ee2fc07-8caa-428c-9484-9af3f2822fd2","4079d59e-006c-44c3-88a4-186bc8ce8fdc","ef3330b1-e61f-40b1-baf3-5b2a30e2b77c","1bf974ef-4bb6-406c-89c4-bde523ee44b6"],"matrixes":{"e9e00a44-4e89-422f-a96a-3951a374e3dc":"matrix(1,0,0,1,159,124)","aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83":"matrix(1,0,0,1,162,271)","9ee2fc07-8caa-428c-9484-9af3f2822fd2":"matrix(1,0,0,1,158,409)","4079d59e-006c-44c3-88a4-186bc8ce8fdc":"matrix(1,0,0,1,862,131)","ef3330b1-e61f-40b1-baf3-5b2a30e2b77c":"matrix(1,0,0,1,862,372)","1bf974ef-4bb6-406c-89c4-bde523ee44b6":"matrix(1,0,0,1,545,255)"},"lines":["M 383 174 C 452 174 452 305 521 305","M 386 321 C 453.5 321 453.5 305 521 305","M 382 459 C 451.5 459 451.5 305 521 305","M 769 305 C 803.5 305 803.5 181 838 181","M 769 305 C 803.5 305 803.5 422 838 422"],"relations":["e9e00a44-4e89-422f-a96a-3951a374e3dc|0c5cf897-83f0-4ff7-9a5b-debcbafd0333|1bf974ef-4bb6-406c-89c4-bde523ee44b6|87f43dab-e291-4b78-8163-aa31685de561","aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83|481ce7fa-ecad-4a41-99e2-527f4a512f9e|1bf974ef-4bb6-406c-89c4-bde523ee44b6|87f43dab-e291-4b78-8163-aa31685de561","9ee2fc07-8caa-428c-9484-9af3f2822fd2|6a8ca98f-1afc-4be6-ab23-2c0c8a75b702|1bf974ef-4bb6-406c-89c4-bde523ee44b6|87f43dab-e291-4b78-8163-aa31685de561","1bf974ef-4bb6-406c-89c4-bde523ee44b6|bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2|4079d59e-006c-44c3-88a4-186bc8ce8fdc|89e982c8-8332-421b-813a-963772d50e16","1bf974ef-4bb6-406c-89c4-bde523ee44b6|bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2|ef3330b1-e61f-40b1-baf3-5b2a30e2b77c|32dc7cc3-d1c0-4d9e-9c83-4e07b14ca018"],"svgMatrix":"matrix(1,0,0,1,0,0)"}',
            remark3: "",
          },
          operatorInterfaceDataModels: [
            {
              id: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              tableInterfaceparametersList: [
                {
                  id: "87f43dab-e291-4b78-8163-aa31685de561",
                  interfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                  parameterssources: "155",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
                {
                  id: "bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2",
                  interfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                  parameterssources: "156",
                  parametersname: "HEIGHT",
                  inorout: 1,
                  remark: "",
                },
              ],
              interfaceName: "主成分分析",
              algorithmID: 52,
              roleID: 44,
            },
            {
              id: "4079d59e-006c-44c3-88a4-186bc8ce8fdc",
              tableInterfaceparametersList: [
                {
                  id: "89e982c8-8332-421b-813a-963772d50e16",
                  interfaceid: "4079d59e-006c-44c3-88a4-186bc8ce8fdc",
                  parameterssources: "165",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
                {
                  id: "8b99c588-f4bc-4ab2-81b2-e0901c478492",
                  interfaceid: "4079d59e-006c-44c3-88a4-186bc8ce8fdc",
                  parameterssources: "166",
                  parametersname: "HEIGHT",
                  inorout: 1,
                  remark: "",
                },
              ],
              interfaceName: "点估计",
              algorithmID: 57,
              roleID: 44,
            },
            {
              id: "9ee2fc07-8caa-428c-9484-9af3f2822fd2",
              tableInterfaceparametersList: [
                {
                  id: "6a8ca98f-1afc-4be6-ab23-2c0c8a75b702",
                  interfaceid: "9ee2fc07-8caa-428c-9484-9af3f2822fd2",
                  parameterssources: "164",
                  parametersname: "ZJ",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "c86e75ba-e11d-4dce-9b79-10198990b5b9",
                  interfaceid: "9ee2fc07-8caa-428c-9484-9af3f2822fd2",
                  parameterssources: "163",
                  parametersname: "JL",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "方差分析",
              algorithmID: 56,
              roleID: 44,
            },
            {
              id: "aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83",
              tableInterfaceparametersList: [
                {
                  id: "02f8b5e0-7d8b-4c2d-ac1f-693ad8012040",
                  interfaceid: "aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83",
                  parameterssources: "161",
                  parametersname: "CD",
                  inorout: 0,
                  remark: "",
                },
                {
                  id: "481ce7fa-ecad-4a41-99e2-527f4a512f9e",
                  interfaceid: "aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83",
                  parameterssources: "162",
                  parametersname: "WD",
                  inorout: 1,
                  remark: "",
                },
              ],
              interfaceName: "因子分析",
              algorithmID: 55,
              roleID: 44,
            },
            {
              id: "e9e00a44-4e89-422f-a96a-3951a374e3dc",
              tableInterfaceparametersList: [
                {
                  id: "0c5cf897-83f0-4ff7-9a5b-debcbafd0333",
                  interfaceid: "e9e00a44-4e89-422f-a96a-3951a374e3dc",
                  parameterssources: "160",
                  parametersname: "SD",
                  inorout: 1,
                  remark: "",
                },
                {
                  id: "0faae863-0838-4d52-b56c-1d9a50ead037",
                  interfaceid: "e9e00a44-4e89-422f-a96a-3951a374e3dc",
                  parameterssources: "159",
                  parametersname: "RADIUS",
                  inorout: 0,
                  remark: "",
                },
              ],
              interfaceName: "层次分析",
              algorithmID: 54,
              roleID: 44,
            },
            {
              id: "ef3330b1-e61f-40b1-baf3-5b2a30e2b77c",
              tableInterfaceparametersList: [
                {
                  id: "32dc7cc3-d1c0-4d9e-9c83-4e07b14ca018",
                  interfaceid: "ef3330b1-e61f-40b1-baf3-5b2a30e2b77c",
                  parameterssources: "167",
                  parametersname: "C",
                  inorout: 0,
                  remark: "",
                },
                {
                  id: "724736e2-8b23-454c-aef1-f40aad0af879",
                  interfaceid: "ef3330b1-e61f-40b1-baf3-5b2a30e2b77c",
                  parameterssources: "168",
                  parametersname: "RADIUS",
                  inorout: 1,
                  remark: "",
                },
              ],
              interfaceName: "一元拟合法",
              algorithmID: 58,
              roleID: 44,
            },
          ],
          interfaceRoleDataModels: [
            {
              id: 183,
              roleid: 44,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 183,
                roleid: 44,
                interfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                parametersid: "87f43dab-e291-4b78-8163-aa31685de561",
                preinterfaceid: "e9e00a44-4e89-422f-a96a-3951a374e3dc",
                preparametersid: "0c5cf897-83f0-4ff7-9a5b-debcbafd0333",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "e9e00a44-4e89-422f-a96a-3951a374e3dc",
              preParametersID: "0c5cf897-83f0-4ff7-9a5b-debcbafd0333",
              preActionRelation: "",
              interfaceID: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              parametersID: "87f43dab-e291-4b78-8163-aa31685de561",
            },
            {
              id: 184,
              roleid: 44,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 184,
                roleid: 44,
                interfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                parametersid: "87f43dab-e291-4b78-8163-aa31685de561",
                preinterfaceid: "aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83",
                preparametersid: "481ce7fa-ecad-4a41-99e2-527f4a512f9e",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "aa7ddb4d-7c98-4fa4-8a5d-06dcbdde8a83",
              preParametersID: "481ce7fa-ecad-4a41-99e2-527f4a512f9e",
              preActionRelation: "",
              interfaceID: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              parametersID: "87f43dab-e291-4b78-8163-aa31685de561",
            },
            {
              id: 185,
              roleid: 44,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 185,
                roleid: 44,
                interfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                parametersid: "87f43dab-e291-4b78-8163-aa31685de561",
                preinterfaceid: "9ee2fc07-8caa-428c-9484-9af3f2822fd2",
                preparametersid: "6a8ca98f-1afc-4be6-ab23-2c0c8a75b702",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "9ee2fc07-8caa-428c-9484-9af3f2822fd2",
              preParametersID: "6a8ca98f-1afc-4be6-ab23-2c0c8a75b702",
              preActionRelation: "",
              interfaceID: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              parametersID: "87f43dab-e291-4b78-8163-aa31685de561",
            },
            {
              id: 186,
              roleid: 44,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 186,
                roleid: 44,
                interfaceid: "4079d59e-006c-44c3-88a4-186bc8ce8fdc",
                parametersid: "89e982c8-8332-421b-813a-963772d50e16",
                preinterfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                preparametersid: "bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              preParametersID: "bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2",
              preActionRelation: "",
              interfaceID: "4079d59e-006c-44c3-88a4-186bc8ce8fdc",
              parametersID: "89e982c8-8332-421b-813a-963772d50e16",
            },
            {
              id: 187,
              roleid: 44,
              algorithmconditions: [],
              des: "",
              remark: "",
              actionRelation: "",
              table_InterfaceRole: {
                id: 187,
                roleid: 44,
                interfaceid: "ef3330b1-e61f-40b1-baf3-5b2a30e2b77c",
                parametersid: "32dc7cc3-d1c0-4d9e-9c83-4e07b14ca018",
                preinterfaceid: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
                preparametersid: "bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2",
                des: "",
                remark: "",
                actionrelation: "",
                preactionrelation: "",
              },
              preInterfaceID: "1bf974ef-4bb6-406c-89c4-bde523ee44b6",
              preParametersID: "bcd2f9c2-ea82-47b6-97a3-8dc02911f4e2",
              preActionRelation: "",
              interfaceID: "ef3330b1-e61f-40b1-baf3-5b2a30e2b77c",
              parametersID: "32dc7cc3-d1c0-4d9e-9c83-4e07b14ca018",
            },
          ],
        };
        tool = new viewTool(datas);
        let mainIds = tool.nodes.map((node) => {
          return node.id;
        });
        mainIds.forEach((id) => {
          if (ids.indexOf(id) < 0) {
            ids.push(id);
          }
        });
        var details = [
          {
            tableAlgorithm: {
              id: 52,
              algorithmname: "主成分分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "123",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 155,
                parametername: "长度",
                algorithmid: 52,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 156,
                parametername: "高度",
                algorithmid: 52,
                varname: "HEIGHT",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 57,
              algorithmname: "点估计",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "11",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 165,
                parametername: "长度",
                algorithmid: 57,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 166,
                parametername: "高度",
                algorithmid: 57,
                varname: "HEIGHT",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 56,
              algorithmname: "方差分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 163,
                parametername: "距离",
                algorithmid: 56,
                varname: "JL",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 164,
                parametername: "直径",
                algorithmid: 56,
                varname: "ZJ",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 55,
              algorithmname: "因子分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 161,
                parametername: "长度",
                algorithmid: 55,
                varname: "CD",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 162,
                parametername: "温度",
                algorithmid: 55,
                varname: "WD",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 54,
              algorithmname: "层次分析",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 159,
                parametername: "半径",
                algorithmid: 54,
                varname: "RADIUS",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 160,
                parametername: "速度",
                algorithmid: 54,
                varname: "SD",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
          {
            tableAlgorithm: {
              id: 58,
              algorithmname: "一元拟合法",
              algorithmauthor: "",
              ispublic: 0,
              algorithmtype: 1,
              algorithmfun: "",
              des: "",
              userid: null,
              algorithmgroup: "算法分组1",
              remark: "",
              status: "未发布",
              remark3: "",
              remark4: null,
              remark2: "",
            },
            tableFuncs: [
              {
                id: 167,
                parametername: "温度",
                algorithmid: 58,
                varname: "C",
                vartype: "1",
                valvalue: "int",
                inorout: 0,
                remark: "",
              },
              {
                id: 168,
                parametername: "半径",
                algorithmid: 58,
                varname: "RADIUS",
                vartype: "1",
                valvalue: "int",
                inorout: 1,
                remark: "",
              },
            ],
            tableModuleuserrelation: null,
          },
        ];
      }

      for (var i = 0; i < ids.length; i++) {
        let detail = details[i];
        count++;
        let ID = detail.tableAlgorithm.id;
        tool.mains.forEach((main) => {
          let id = parseFloat(main.id.slice(0, main.id.indexOf("_")));
          if (id == ID) {
            main.detail = detail;
          }
        });
        if (count == ids.length) {
          tool.recover(viewer, id);
        }
      }
    },
    drop(data) {
      var detail;
      detail = {
        tableAlgorithm: {
          id: 56,
          algorithmname: "方差分析",
          algorithmauthor: "",
          ispublic: 0,
          algorithmtype: 1,
          algorithmfun: "",
          des: "",
          userid: null,
          algorithmgroup: "算法分组1",
          remark: "",
          status: "未发布",
          remark3: "",
          remark4: null,
          remark2: "",
        },
        tableFuncs: [
          {
            id: 163,
            parametername: "距离",
            algorithmid: 56,
            varname: "JL",
            vartype: "1",
            valvalue: "int",
            inorout: 0,
            remark: "",
          },
          {
            id: 164,
            parametername: "直径",
            algorithmid: 56,
            varname: "ZJ",
            vartype: "1",
            valvalue: "int",
            inorout: 1,
            remark: "",
          },
        ],
        tableModuleuserrelation: null,
      };
      detail.tableAlgorithm.algorithmname = data.name;
      let outports = [];
      let inports = [];
      detail.length = detail.tableFuncs;
      detail.tableFuncs.forEach((item) => {
        if (item.inorout == 1) {
          let uuid = Math.random();
          outports.push(item.id + "_" + uuid);
        } else {
          let uuid = Math.random();
          inports.push(item.id + "_" + uuid);
        }
      });
      let svgMatrix =
        this.$refs.centerhb.viewer.svgMatrix || "matrix(1,0,0,1,0,0)";
      let coordinate = this.createCoordinatByMatrix(svgMatrix);
      let x =
        (data.x - 300 - this.$refs.centerhb.$el.offsetLeft - coordinate.x) /
        coordinate.scale;
      let y =
        (data.y - 60 - this.$refs.centerhb.$el.offsetTop - coordinate.y) /
        coordinate.scale;
      let matrix = "matrix(1,0,0,1," + x + "," + y + ")";
      this.$refs.centerhb.cvs.viewer.addMain(
        {
          id: data.id + "_" + Math.random(),
          outports: outports,
          inports: inports,
          detail: detail,
        },
        matrix
      );
    },
    createCoordinatByMatrix(matrix) {
      matrix = matrix.replace(/\s/g, "");
      var exec = /matrix\((.+)\)/.exec(matrix);
      exec = exec ? exec[1] : "1,0,0,1,0,0";
      var arr = exec.split(",");
      return {
        x: parseFloat(arr[4]),
        y: parseFloat(arr[5]),
        scale: parseFloat(arr[0]),
      };
    },
  },
  created() {},
  mounted() {
    this.$refs.centerhb.build();
  },
};
</script>

<style lang="scss" scoped>
.EModel {
  height: 100%;
  width: 100%;
  display: flex;
  // padding: 15px 0;
  overflow: hidden;
  .evaluationModel {
    width: 100%;
    height: 100%;
    display: flex;
    #myCanvas {
      // width: 79%;
      width: 100%;
      height: 100%;
      float: left;
      // margin-right: 1%;
      .message {
        padding: 1%;
        margin-top: 1%;
        width: 100%;
        height: 18%;
        float: left;
        color: #000;
        // box-shadow: 0 0 10px 1px black inset;
        border: 1px solid #ccc;
      }
    }
    .tree-content {
        width:20%;
        height: 100%;
        overflow-y: auto;
        float: right;
        // padding: 10px 0;
        padding: 10px;
        margin-left: 10px;
        background: #fff;
    }
    .left-side-box{
      // padding: 20px;
      padding: 15px !important;
      background: #fff !important;
      margin-right: 10px;
    }
    .right-side-box{
      padding: 10px;
      padding-right: 0;
    }
  }
}
</style>
