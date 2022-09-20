import request from '@/utils/request.ts'

class Point{
    //constructor 构造方法
    /*****
     * 类的默认方法，通过new命令生成对象实例时，自动调用该方法
     * 一个类必须有constructor方法
     * 默认返回实例对象（即this）
     * 类必须使用new调用，否则报错
     */
    constructor(x,y){
        this.x=x
        this.y=y
    }
    //对某个属性设置存值函数和取值函数，拦截该属性的存取行为
    get(){}
    set(){}
    toString(){
        return `(${this.x},${this.y})`
    }
}