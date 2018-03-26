import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getHotKey() {
    const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg"

    const data = Object.assign({},commonParams, {
        platform:'h5',
        needNewCode:1
    })

    return jsonp(url, data ,options)
}

export function search(query,page,zhida){
    const url= 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
    const data = Object.assign({},commonParams, {
        inCharset:'utf-8',
        outCharset:'utf-8',
        ie:'utf-8',
        notice:0,
        format:jsonp,
        w:query,
        p:page,
        perpage:20,
        n:20,
        catZhida:zhida ? 1 : 0,
        zhidaqu:1,
        t:0,
        flag:1,
        sem:1,
        aggr:0,
        remoteplace:'txt.mqq.all',
        uin:0,
        needNewCode:1,
        platform:'h5'
    })
    return jsonp(url, data ,options)
}
