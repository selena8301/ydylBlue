import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index'
import request from '@/assets/utils/request'
import { cloneDeep } from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeIndex: '0',
        showLoader: false,
        token: null,
        currentZtType: '',
        topicDataTree: [],
        dictDataTree: [],
        classArr: ['未分类'],
        dictData: {}
    },
    getters: {
        activeIndex: state => {
            return state.activeIndex
        },
        showLoader: state => {
            return state.showLoader
        },
        token: state => {
            return state.token
        },
        currentZtType: state => {
            return state.currentZtType
        },
        topicDataTree: state => {
            return state.topicDataTree
        },
        dictDataTree: state => {
            return state.dictDataTree
        },
        classArr: state => {
            return state.classArr
        },
        dictData: state => {
            return state.dictData
        }
    },
    mutations: {
        SET_ACTIVE_INDEX (state, activeIndex) {
            state.activeIndex = activeIndex
        },
        SET_SHOWLOADER (state, showLoader) {
            state.showLoader = showLoader
        },
        SET_TOKEN (state, token) {
            state.token = token
        },
        SET_CURRENTZT_TYPE (state, currentZtType) {
            state.currentZtType = currentZtType
        },
        SET_TOPIC_DATA_TREE (state, tree) {
            state.topicDataTree = tree
        },
        SET_DICT_DATA_TREE (state, tree) {
            state.dictDataTree = tree
        },
        SET_DICT_DATA (state, tree) {
            state.dictData = tree
        },
        GET_ALL_CLASS(state, tree) {
            state.classArr = ['未分类']
            function getAllClass(tree) {
                tree.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        getAllClass(item.children)
                    } else {
                        if (state.classArr.indexOf(item.dictName) === -1 && item.dictName) {
                            state.classArr.push(item.dictName)
                        }
                    }
                })
            }
            getAllClass(tree)
        }
    },
    actions: {
        changeMenu({commit}, activeIndex) {
            if (activeIndex) {
                commit('SET_ACTIVE_INDEX',activeIndex)
                localStorage.setItem('activeIndex', activeIndex)
            }
        },
        getUserInfo({commit}, token) {
            if (token) {
                commit('SET_TOKEN', token)
                localStorage.setItem('token', token)
            }
        },
        changeShowLoader({commit}, showLoader) {
            commit('SET_SHOWLOADER', showLoader)
            localStorage.setItem('showLoader', showLoader)
        },
        // 刷新之后重新获取数据
        refresh({commit}) {
            const activeIndex = localStorage.getItem('activeIndex')
            const token = localStorage.getItem('token')
            const currentZtType = localStorage.getItem('currentZtType')
            const topicDataTree = JSON.parse(localStorage.getItem('topicDataTree'))
            const dictDataTree = JSON.parse(localStorage.getItem('dictDataTree'))
            const dictData = JSON.parse(localStorage.getItem('dictData'))
            commit('SET_SHOWLOADER', false)
            if (activeIndex) {
                commit('SET_ACTIVE_INDEX', activeIndex)
            }
            if (token) {
                commit('SET_TOKEN', token)
            }
            if (currentZtType) {
                commit('SET_CURRENTZT_TYPE', currentZtType)
            }
            if (topicDataTree) {
                commit('SET_TOPIC_DATA_TREE', topicDataTree)
            }
            if (dictDataTree) {
                commit('SET_DICT_DATA_TREE', dictDataTree)
                dictDataTree.forEach(item => {
                    if (item.dictName === '专题分类') {
                        commit('GET_ALL_CLASS', item.children)
                    }
                })
            }
            if (dictData) {
                commit('SET_DICT_DATA', dictData)
            }
        },
        // 退出登录操作
        logout({commit}) {
            commit('SET_TOKEN', null)
            localStorage.clear();
            sessionStorage.clear();
            router.push({ path: '/login' });
        },
        setCurrentZtType({commit}, type) {
            commit('SET_CURRENTZT_TYPE', type)
            localStorage.setItem('currentZtType', type)
        },
        // 获取全局专题分类树
        getDbDictTree({dispatch,commit}) {
            request[0]({
                url: '/DbDict/tree',
                method: 'get'
            }).then(res => {
                let tree = res.data.data
                // router.push("/Map")
                commit('SET_DICT_DATA_TREE', tree)
                localStorage.setItem('dictDataTree', JSON.stringify(tree))

                let country = tree.find(item => { return item.dictName === '国家' })
                let topic = tree.find(item => { return item.dictName === '专题分类' })
                let dictData = {}
                tree.forEach(item => {
                    if (item.dictName === '国家') {
                        country = item.children
                    } else if (item.dictName === '专题分类') {
                        topic = item.children
                    }

                    if (item.dictName === '国家') {
                        dictData[item.dictName] = []
                        dictData['一带一路国家'] = cloneDeep(item.children)
                        item.children.forEach(issue => {
                            dictData[item.dictName] = dictData[item.dictName].concat(issue.children)
                        })
                        dictData['一带一路国家'].forEach(yd => {
                            yd.children.forEach(issue => {
                                delete issue.children
                            })
                        })
                    } else {
                        dictData[item.dictName] = item.children
                    }
                })
                country.forEach(item => {
                    item.children.forEach(issue => {
                        issue.children = topic
                    })
                })
                localStorage.setItem('topicDataTree', JSON.stringify(country))
                commit('SET_TOPIC_DATA_TREE', country)
                commit('SET_DICT_DATA', dictData)
                localStorage.setItem('dictData', JSON.stringify(dictData))
                // 获取全部分类
                commit('GET_ALL_CLASS', tree)
            })
        }
    }
})