import BaseVo from "./BaseVo";

export default class InstallationItemVo extends BaseVo {
    //设施名称
    public installationItemName: string;
    //设施列表
    public id: number;
    //描述
    public descript:string;
    //宽和高
    public sizeArr:Array<number>;
    //设施属性列表
    public propertyList:Array<string>;
    //以下属性动态设置，减少json文件体积
    //设施类别
    public type:string;
    //设施位置坐标
    public posArr:Array<number>;
    public constructor() {
        super();
    }

    public init(obj:any): void {
        var propNo: number = 0;
        this.installationItemName = obj[propNo++];
        this.id = obj[propNo++];
        this.descript = obj[propNo++];
        this.sizeArr = obj[propNo++];
        this.propertyList = obj[propNo++];
    }
} 