import request from '@/utils/request.ts';
import qs from 'qs'

export function getMenu(){
    return request.get("/api/menu")
}

export function getList(params){
    return request.get(
        "/api/list",
        {
            params,
            paramsSerializer:params=>{
                return qs.stringify(params,{arrayFormat:'repeat'})
            }
        }
    )
}
