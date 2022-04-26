import request from '@/assets/utils/request'

// -------------------------------------------------分组---------------------------------------------------

// 分组修改
export function DbPredictModelGroupEdit(data) {
    return request[0]({
        url: '/DbPredictGroup',
        method: 'put',
        data
    })
}

// 分组list
export function DbPredictModelGroupList(params) {
    return request[0]({
        url: '/DbPredictGroup',
        method: 'get',
        params
    })
}

// 分组add
export function DbPredictModelGroupAdd(data) {
    return request[0]({
        url: '/DbPredictGroup',
        method: 'post',
        data
    })
}

// 分组delete
export function DbPredictModelGroupDelete(data) {
    return request[0]({
        url: '/DbPredictGroup/delete',
        method: 'delete',
        data
    })
}

// 分组全部数据
export function DbPredictModelGroupAll() {
    return request[0]({
        url: '/DbPredictGroup/find',
        method: 'get'
    })
}

// ---------------------------------------------------分组end-----------------------------------------------------------

// ---------------------------------------------------模型start-----------------------------------------------------------

// 模型修改
export function DbPredictModelEdit(data) {
    return request[0]({
        url: '/DbPredictModel',
        method: 'put',
        data
    })
}

// 模型list
export function DbPredictModelList(params) {
    return request[0]({
        url: '/DbPredictModel',
        method: 'get',
        params
    })
}

// 模型add
export function DbPredictModelAdd(data) {
    return request[0]({
        url: '/DbPredictModel',
        method: 'post',
        data
    })
}

// 模型delete
export function DbPredictModelDelete(data) {
    return request[0]({
        url: '/DbPredictModel/delete',
        method: 'delete',
        data
    })
}

// ---------------------------------------模型end-----------------------------------------------

// -------------------------------------------------样本---------------------------------------------------

// 样本修改
export function DbPredictModelSampleEdit(data) {
    return request[0]({
        url: '/DbPredictSample',
        method: 'put',
        data
    })
}

// 样本list
export function DbPredictModelSampleList(params) {
    return request[0]({
        url: '/DbPredictSample',
        method: 'get',
        params
    })
}

// 样本add
export function DbPredictModelSampleAdd(data) {
    return request[0]({
        url: '/DbPredictSample',
        method: 'post',
        data
    })
}

// 样本delete
export function DbPredictModelSampleDelete(data) {
    return request[0]({
        url: '/DbPredictSample/delete',
        method: 'delete',
        data
    })
}

// 样本全部数据
export function DbPredictModelSampleAll() {
    return request[0]({
        url: '/DbPredictSample/find',
        method: 'get'
    })
}

// ---------------------------------------------------样本end-----------------------------------------------------------

// ---------------------------------------------------模型关联样本start-----------------------------------------------------------

// 模型关联样本修改
export function DbPredictModelSampleRelationEdit(data) {
    return request[0]({
        url: '/DbPredictModelSampleRelation',
        method: 'put',
        data
    })
}

// 模型关联样本list
export function DbPredictModelSampleRelationList(params) {
    return request[0]({
        url: '/DbPredictModelSampleRelation',
        method: 'get',
        params
    })
}

// 模型关联样本add
export function DbPredictModelSampleRelationAdd(data) {
    return request[0]({
        url: '/DbPredictModelSampleRelation/addAll',
        method: 'post',
        data
    })
}

// 模型关联样本delete
export function DbPredictModelSampleRelationDelete(data) {
    return request[0]({
        url: '/DbPredictModelSampleRelation/delete',
        method: 'delete',
        data
    })
}

// ---------------------------------------模型关联样本end-----------------------------------------------

// -------------------------------------------------识别---------------------------------------------------

// 识别修改
export function DbPredictResultEdit(data) {
    return request[0]({
        url: '/DbPredictResult',
        method: 'put',
        data
    })
}

// 识别list
export function DbPredictResultList(params) {
    return request[0]({
        url: '/DbPredictResult',
        method: 'get',
        params
    })
}

// 识别add
export function DbPredictResultAdd(data) {
    return request[0]({
        url: '/DbPredictResult',
        method: 'post',
        data
    })
}

// 识别delete
export function DbPredictResultDelete(data) {
    return request[0]({
        url: '/DbPredictResult/delete',
        method: 'delete',
        data
    })
}

// 识别全部数据
export function DbPredictResultAll() {
    return request[0]({
        url: '/DbPredictResult/find',
        method: 'get'
    })
}

// ---------------------------------------------------识别end-----------------------------------------------------------

// -------------------------------------------------训练---------------------------------------------------

// 训练修改
export function DbPredictTrainTaskEdit(data) {
    return request[0]({
        url: '/DbPredictTrainTask',
        method: 'put',
        data
    })
}

// 训练list
export function DbPredictTrainTaskList(params) {
    return request[0]({
        url: '/DbPredictTrainTask',
        method: 'get',
        params
    })
}

// 训练add
export function DbPredictTrainTaskAdd(data) {
    return request[0]({
        url: '/DbPredictTrainTask',
        method: 'post',
        data
    })
}

// 训练delete
export function DbPredictTrainTaskDelete(data) {
    return request[0]({
        url: '/DbPredictTrainTask/delete',
        method: 'delete',
        data
    })
}

// 训练全部数据
export function DbPredictTrainTaskAll() {
    return request[0]({
        url: '/DbPredictTrainTask/find',
        method: 'get'
    })
}

// ---------------------------------------------------训练end-----------------------------------------------------------


// -------------------------------------------------识别任务---------------------------------------------------

// 识别任务修改
export function DbPredictDetectTaskEdit(data) {
    return request[0]({
        url: '/DbPredictDetectTask',
        method: 'put',
        data
    })
}

// 识别任务list
export function DbPredictDetectTaskList(params) {
    return request[0]({
        url: '/DbPredictDetectTask',
        method: 'get',
        params
    })
}

// 识别任务add
export function DbPredictDetectTaskAdd(data) {
    return request[0]({
        url: '/DbPredictDetectTask',
        method: 'post',
        data
    })
}

// 识别任务delete
export function DbPredictDetectTaskDelete(data) {
    return request[0]({
        url: '/DbPredictDetectTask/delete',
        method: 'delete',
        data
    })
}

// 识别任务全部数据
export function DbPredictDetectTaskAll() {
    return request[0]({
        url: '/DbPredictDetectTask/find',
        method: 'get'
    })
}

// 识别任务控制
export function DbPredictDetectTaskCtrl(params) {
    return request[0]({
        url: '/DbPredictDetectTask/ctrl',
        method: 'get',
        params
    })
}

// 识别任务上下线
export function DbPredictDetectTaskOnline(params) {
    return request[0]({
        url: '/DbPredictDetectTask/online',
        method: 'get',
        params
    })
}

// ---------------------------------------------------识别任务end-----------------------------------------------------------


