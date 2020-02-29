import Controller from "./Controller";
import CommandChannel from "./CommandChannel";

export default class BattleController extends Controller{
    // private  _bulletManager:BulletManager;
    public constructor(channel:CommandChannel) {
        super(channel);
        // _bulletManager = new BulletManager(channel);
        // this.managerList.push(_bulletManager);
        // this.addCommand(ConstName.BATTLE_CREATE_BULLET_GROUP,_bulletManager,_bulletManager.createBulletGroup);
    }
}