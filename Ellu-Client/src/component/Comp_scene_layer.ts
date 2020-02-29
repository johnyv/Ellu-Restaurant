/**场景分层组件，主要用于设置
 * 场景每个层级的以下属性
 * 1.速度
 */
export default class Comp_scene_layer extends Laya.Box {
    //缩放时间100毫秒
    public speed: number = 0;
    public constructor() {
        super();
    }
}