import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";

export default class HitManager extends BaseManager{
    // private  _heroList:Array<any>;
    // private  _bulletGroupList:Array.<BaseBulletGroup>;
    // private  _enemyList:Array.<Enemy>
    public constructor(channel:CommandChannel){
        super(channel);
        // _bulletGroupList = new Array.<BaseBulletGroup>;
    }

    public init():void{
        // Laya.timer.loop(30,this,this.update);
        // _heroList = this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_GET_HERO_LIST) as Array.<Hero>;
        // _enemyList = this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_GET_ENEMY_LIST) as Array.<Enemy>;
        // for each(var hero:Role in _heroList) {
        //     _bulletGroupList.push(hero.bulletGroup);
        // }
    }

    /**
     *检测碰撞主循环
     *需要特别注意，性能
     *随时进行优化
     */
    private  update():void {
        // var attackRect:Rectangle;
        // var hitRect:Rectangle;

        // for each(var bulletGroup:BaseBulletGroup in _bulletGroupList) {
        //     var bulletList:Array.<BulletAnimation> = bulletGroup.bulletList;
        //     for each(var bullet:BulletAnimation in bulletList) {
        //         attackRect = bullet.getGraphicBounds(true);
        //         attackRect.x = bullet.x;
        //         attackRect.y = bullet.y;
        //         for each(var enemy:Enemy in _enemyList) {
        //             if(!enemy.isDie){
        //                 hitRect = enemy.gameAni.getGraphicBounds(true);
        //                 hitRect.x = enemy.gameAni.x;
        //                 hitRect.y = enemy.gameAni.y;
        //                 if(attackRect.intersection(hitRect)) {
        //                     enemy.beHurted();
        //                 }                        
        //             }
        //         }
        //     }
        // }
    }
} 