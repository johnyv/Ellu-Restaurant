import BaseVo from "./BaseVo";

export default class BulletPosVo extends BaseVo {
    public roleName: string;
    public posXArr: any;
    public posYArr: any;
    public bulletTypeArr: any;
    public constructor() {
        super();
    }

    public init(obj, jsonObj: object): void {
        var propNo: number = 0;
        // roleName = obj[propNo++];
        // posXArr = (obj[propNo++]+"").split(",");
        // posYArr = (obj[propNo++]+"").split(",");
        // bulletTypeArr = (obj[propNo++]+"").split(",");
        // jsonObj[roleName] = this;
    }
} 