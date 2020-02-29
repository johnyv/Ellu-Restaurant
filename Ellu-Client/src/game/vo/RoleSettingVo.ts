import BaseVo from "./BaseVo";

export default class RoleSettingVo extends BaseVo {
    //角色名称
    public roleName: string;
    //移动速度
    public speed: number;
    //是否发射子弹
    public hasBullet: boolean;
    //初始子弹名称
    public bulletName: string;
    //子弹方向
    public bulletDir: number;
    //动画播放速度,默认50
    public interval: number;
    //角色身高
    public roleHeight: number;
    //初始法宝
    public fbArr: any = [];

    public constructor() {
        super();
    }

    public init(obj, jsonObj: object): void {
        var propNo: number = 0;
        // roleName = obj[propNo++];
        // speed = obj[propNo++];
        // hasBullet = obj[propNo++];
        // bulletName = obj[propNo++];
        // bulletDir = obj[propNo++] || -1;
        // interval = obj[propNo++] || 50;
        // roleHeight = obj[propNo++];
        // var fbName:string = obj[propNo++];
        // if(fbName)
        //     fbArr = fbName.split(",");
        // jsonObj[roleName] = this;
    }
}