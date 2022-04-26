import request from '@/assets/utils/request'

// 专题数据list
export function DbDataList(params) {
    return request[0]({
        url: '/DbData',
        method: 'get',
        params
    })
}

// 专题数据search
export function DbDataSearch(params) {
    return request[0]({
        url: '/DbData/find',
        method: 'get',
        params
    })
}

// 专题数据edit
export function DbDataEdit(data) {
    return request[0]({
        url: '/DbData',
        method: 'put',
        data
    })
}

// 专题数据add
export function DbDataAdd(data) {
    return request[0]({
        url: '/DbData',
        method: 'post',
        data
    })
}

// 专题数据detail
export function DbDataDetail(id) {
    return request[0]({
        url: '/DbData/' + id,
        method: 'get'
    })
}


// 专题数据delete
export function DbDataDelete(id) {
    return request[0]({
        url: '/DbData/'+ id,
        method: 'delete'
    })
}

// 全文检索
export function DbDataLike(data, size, current) {
    return request[0]({
        url: '/DbData/query?size=' + size + '&current=' + current,
        method: 'post',
        data
    })
}

export function DbDataLikeNew(data, size, current, searchPhrase) {
    return request[1]({
        url: '/getNewData?rowCount=' + size + '&current=' + current + '&searchPhrase=' + searchPhrase,
        method: 'post',
        data
    })
}
