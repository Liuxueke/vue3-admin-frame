import axios,{ AxiosInstance,AxiosRequestConfig,AxiosResponse } from 'axios'

interface ResultData<T>{
    code:number;
    msg:string;
    data?:T
}
class Request{
    instance:AxiosInstance //axios 实例
    //基础配置，url和超时时间
    baseConfig: AxiosRequestConfig={
        baseURL:configUrl.apiUrl,
        timeout:60000,
        headers:{
            "Content-Type":"application/json;charset=UTF-8",
            "Access-Control-Allow-Origin-Type":"*",
        },
    }
    constructor(config:AxiosRequestConfig){
        this.instance=axios.create(Object.assign(this.baseConfig,config));
        //请求拦截
        this.instance.interceptors.request.use(
            (res:AxiosRequestConfig)=>{
                return (async()=>{
                    const Token=await manager.getRole(); //获取token
                    if(Token){
                        res.headers.common.Authorization=`${Token.token_type} ${Token.access_token}`
                    }else{
                        manager.signIn()
                    }
                    return res
                })()
            },
            (err:any)=> {
                console.log(err)
                return Promise.reject(err)
            },
        )
        //返回拦截
        this.instance.interceptors.response.use(
            (res:AxiosResponse)=>{
                return res.data
            },
            (err:any)=>{
                return Promise.reject(err)
            }
        )
    }
    //常用方法
    get<T=any>(url:string,params?:object):Promise<ResultData<T>>{
        return this.instance.get(`${url}`,{params});
    }
}

export default new Request()
