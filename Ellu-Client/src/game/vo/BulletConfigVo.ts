import BaseVo from "./BaseVo";

export default class BulletConfigVo extends BaseVo {
    public bulletName: string;
    public effect_explode: string;
    public effect_start: string;
    /**子弹类型 */
    public bulletType: number;
    /**子弹发射间隔时间 */
    public deltTime: number;
    /**子弹发射速度 */
    public speed: number;
    /**子弹存在时间 */
    public lifeTime: number;
    /**子弹发射音效 */
    public bulletSnd: string;
    /**子弹动画播放速度 */
    public interval: number;
    public constructor() {
        super();
    }

    public init(obj, jsonObj: Object): void {
        var propNo: number = 0;
        // bulletName = obj[propNo++];
        // effect_explode = obj[propNo++];
        // effect_start = obj[propNo++];
        // bulletType = obj[propNo++];
        // deltTime = obj[propNo++];
        // speed = obj[propNo++];
        // lifeTime = obj[propNo++];
        // bulletSnd = obj[propNo++];
        // interval = obj[propNo++] || 50;
        // jsonObj[bulletName] = this;
    }
}