import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";
import GameGlobal from "../GameGlobal";
import BaseBulletGroup from "../role/BaseBulletGroup";

export default class BulletManager extends BaseManager {
    //一个角色拥有一个bulletGroup
    private bulletGroupHash: Object;
    public constructor(channel: CommandChannel) {
        super(channel);
        this.bulletGroupHash = new Object();
    }

    public init(): void {
        Laya.timer.loop(GameGlobal.GAME_FRATE, this, this.update);
    }

    /**为角色创建子弹组，一个角色默认只有一个子弹组  */
    public createBulletGroup(params: any): any {
        // var roleId:Number = params[0];
        // if(!bulletGroupHash[roleId]){
        //     bulletGroupHash[roleId] = new BaseBulletGroup();
        // } else {
        //     throw new Error("一个角色只能拥有一个子弹组");
        // }
        // return bulletGroupHash[roleId];
    }

    public update(): void {
        // for each(var bulletGroup:BaseBulletGroup in bulletGroupHash){
        //     bulletGroup.update();
        // }
    }

    /**销毁 */
    public destroy(): void {
        // for each(var bulletGroup:BaseBulletGroup in bulletGroupHash){
        //     bulletGroup.destroy();
        // }
        // bulletGroupHash = null;
    }
}