import Vue from 'vue'
import Map from '../view/mapComponents/Map'
import DataManagent from '../view/dataManagent/index'
import StatisticAnalysis from '../view/statisticAnalysis/index'
import AnalysisReport from '../view/analysisReport/index'
import GeneralManagement from '../view/generalManage/index'
import VueRouter from 'vue-router'

// 解决导航冗余后报错的配置
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [{
      path: '/',
      redirect: '/countryIndex'
    },
    // 综合态势
    {
      path: '/Map',
      name: "Map",
      component: Map
    },
    {
      path: '/login',
      name: "login",
      component: resolve => require(['../view/login/index'], resolve),
    },
    {
      path: '/ztDetail',
      name: "ztDetail",
      component: resolve => require(['../view/dataManagent/zhuantiDetailSimple.vue'], resolve),
    },
    {
      path: '/ztDetail2',
      name: "ztDetail2",
      component: resolve => require(['../view/dataManagent/zhuantiDetailSimple2.vue'], resolve),
    },
    // 数据管理
    {
      path: '/DataManagent',
      name: "DataManagent",
      redirect: '/DataManagent/dataSourse',
      component: DataManagent,
      children: [
        // {
        //   path: '/DataManagent/countryIndex',
        //   name: "countryIndex",
        //   component: resolve => require(['../view/dataManagent/countryIndex'], resolve),
        //   meta: {
        //     showBtns: true
        //   }
        // },
        // {
        //   path: '/DataManagent/bigCountry',
        //   name: "bigCountry",
        //   component: resolve => require(['../view/dataManagent/bigCountryIndex'], resolve),
        //   meta: {
        //     showBtns: true
        //   }
        // },
        {
          path: '/DataManagent/tracking',
          name: "tracking",
          component: resolve => require(['../view/dataManagent/trackingIndex'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/DataManagent/dataSourse',
          name: "dataSourse",
          component: resolve => require(['../view/dataManagent/dataSourse'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/DataManagent/dataIntegration',
          name: "dataIntegration",
          component: resolve => require(['../view/dataManagent/dataIntegration'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/DataManagent/dataModel',
          name: "dataModel",
          component: resolve => require(['../view/dataManagent/dataModel'], resolve),
          meta: {
            showBtns: true
          }
        },
        // {
        //   path: '/DataManagent/countryDB',
        //   name: "countryDB",
        //   component: resolve => require(['../view/dataManagent/countryDB'], resolve),
        //   meta: {
        //     showBtns: true
        //   }
        // },
        // 专题列表
        {
          path: '/ProjectList',
          name: "ProjectList",
          component: resolve => require(['../view/dataManagent/trackingIndex'], resolve),
          meta: {
            showBtns: true
          }
        },
      ]
    },
    // 专题管理
    {
      path: '/ProjectManagent',
      name: "ProjectManagent",
      redirect: '/ProjectManagent/proHot',
      component: resolve => require(['../view/projectManagent/index'], resolve),
      children: [
        {
          path: '/ProjectManagent/proHot',
          name: "proHot",
          component: resolve => require(['../view/projectManagent/proHot'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/ProjectManagent/proMaintenance',
          name: "proMaintenance",
          component: resolve => require(['../view/projectManagent/proMaintenance'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/ProjectManagent/textAnalysisModelMaintenance',
          name: "textAnalysisModelMaintenance",
          component: resolve => require(['../view/projectManagent/textAnalysisModelMaintenance'], resolve),
          meta: {
            showBtns: true
          }
        }
      ]
    },
    // 统计分析
    {
      path: '/StatisticAnalysis',
      name: "StatisticAnalysis",
      component: StatisticAnalysis
    },
    // 分析报告
    {
      path: '/AnalysisReport',
      name: "AnalysisReport",
      component: AnalysisReport
    },
    // 分析研判
    {
      path: '/EvaluationModel',
      name: "EvaluationModel",
      redirect: '/EvaluationModel/processChoreographer',
      component: resolve => require(['../view/evaluationModel/index'], resolve),
      children: [{
          path: '/EvaluationModel/processChoreographer',
          name: "processChoreographer",
          component: resolve => require(['../view/evaluationModel/EvaluationModelIndex'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/EvaluationModel/multiStatistics',
          name: "multiStatistics",
          component: resolve => require(['../view/evaluationModel/MultiStatistics'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/EvaluationModel/analysisReport',
          name: "analysisReport",
          component: resolve => require(['../view/evaluationModel/AnalysisReport'], resolve),
          meta: {
            showBtns: true
          }
        },
      ]
    },
    // 系统管理
    {
      path: '/GeneralManagement',
      name: "GeneralManagement",
      redirect: '/GeneralManagement/userManage',
      component: GeneralManagement,
      children: [{
          path: '/GeneralManagement/userManage',
          name: "userManage",
          component: resolve => require(['../view/generalManage/userManage'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/userAddEditDetail',
          name: "userAddEditDetail",
          component: resolve => require(['../view/generalManage/userAddEditDetail'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/rightsManage',
          name: "rightsManage",
          component: resolve => require(['../view/generalManage/rightsManage'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/depManage',
          name: "depManage",
          component: resolve => require(['../view/generalManage/depManage'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/rolesManage',
          name: "rolesManage",
          component: resolve => require(['../view/generalManage/rolesManage'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/roleAddEditDetail',
          name: "roleAddEditDetail",
          component: resolve => require(['../view/generalManage/roleAddEditDetail'], resolve),
          meta: {
            showBtns: true
          }
        },
        {
          path: '/GeneralManagement/dictManage',
          name: "dictManage",
          component: resolve => require(['../view/generalManage/dictManage'], resolve),
          meta: {
            showBtns: true
          }
        },
      ]
    },
    {
      path: '/countryIndex',
      name: "countryIndex",
      component: resolve => require(['../view/dataManagent/countryIndex.vue'], resolve),
    },
    {
      path: '/dynamicTracing',
      name: "dynamicTracing",
      component: resolve => require(['../view/dataManagent/dynamicTracing.vue'], resolve),
    }, {
      path: '/nationalLibrary',
      name: "nationalLibrary",
      component: resolve => require(['../view/dataManagent/nationalLibrary.vue'], resolve),
    }, {
      path: '/research',
      name: "research",
      component: resolve => require(['../view/dataManagent/research.vue'], resolve),
    }, {
      path: '/researchIndex',
      name: "researchIndex",
      component: resolve => require(['../view/dataManagent/researchIndex.vue'], resolve),
    }, {
      path: '/safetyRiskIndex',
      name: "safetyRiskIndex",
      component: resolve => require(['../view/dataManagent/safetyRiskIndex.vue'], resolve),
    },
    // {
    //   path: '/fullTextSearch',
    //   name: "fullTextSearch",
    //   component: resolve => require(['../view/dataManagent/fullTextSearch'], resolve),
    // },
    {
      path: '/fullTextSearch',
      name: "fullTextSearch",
      component: resolve => require(['../view/dataManagent/fullTextSearch'], resolve),
    },
  ]
})
