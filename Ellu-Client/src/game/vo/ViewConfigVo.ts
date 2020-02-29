import BaseVo from "./BaseVo";

export default class ViewConfigVo extends BaseVo {
    //界面名称
    public viewName: string;
    //资源路径
    public resourceUrl: string;
    //是否关闭其他界面
    public closeOther:boolean;
    //是否模式窗口
    public isModel:boolean;
    /**关闭界面是否销毁 */
    public closeAndDestroy:boolean;
    //界面配置json文件
    public jsonName:string;

    public constructor() {
        super();
    }

    public init(obj, jsonObj: object): void {
        var propNo: number = 0;
        this.viewName = obj[propNo++];
        this.resourceUrl = obj[propNo++];
        this.closeOther = obj[propNo++];
        this.isModel = obj[propNo++];
        this.closeAndDestroy = obj[propNo++];
        this.jsonName = obj[propNo++];
        jsonObj[this.viewName] = this;
    }
} 