import GameAnimation from "./GameAnimation";
import ActionControll from "./ActionControll";
import LoadManager from "../manager/LoadManager";
import GameGlobal from "../GameGlobal";

export default class Role{
    protected  _gameAni:GameAnimation;
    protected  speed :number = 8;
    //场景移动速度，根据此速度修正角色的显示速度
    public  sceneSpeed:number =0;
    protected  _roleControll:ActionControll;
    protected  _roleId:number = -1;
    protected  _roleName:string;
    protected  _bulletGroup:any;
    protected  transformPoint:Laya.Point = new Laya.Point();
    protected  localPoint:Laya.Point = new Laya.Point();
    public  hasBullet:boolean = false;
    protected  _isRecycle:boolean;
    protected  _isDie:boolean;
    protected  _isHurt:boolean;
    protected  _hurt:number = 6;
    // public  bulletConfigVo:BulletConfigVo ;
    protected  roleSettingVo :any;
    public constructor(roleName:string,roleId:number) {
        this._roleName = roleName;
        this._roleId = roleId;
        this._gameAni = new GameAnimation();
        this._roleControll = new ActionControll(roleId);
        // roleSettingVo = JsonConfig.roleSettingJson[roleName];
        // this._gameAni.interval = roleSettingVo.interval;
        // this.speed = roleSettingVo.speed;
        // hasBullet = roleSettingVo.hasBullet;
        // if(hasBullet) {
        //     var bulletPosVo:BulletPosVo = JsonConfig.bulletPosJson[roleName];
        //     localPoint.x = bulletPosVo.posXArr[0];
        //     localPoint.y = bulletPosVo.posYArr[0];
        // }
    }

    public  init():void {
        this._gameAni.play();
    }

    public  addStage(pos):void {

    }

    public  setSkin(skin:string):void {
        this._gameAni.loadAtlas(skin);
    }

    public setAnimation(actionName:string):void {
        this._gameAni.playAction(actionName);
    }

    public setBulletSkin():void {
        // var roleSettingVo:RoleSettingVo = JsonConfig.roleSettingJson[roleName];
        // this.bulletGroup.setBulletSkin(roleSettingVo.bulletName,roleSettingVo.bulletDir);
        // bulletConfigVo = JsonConfig.bulletConfigJson[roleSettingVo.bulletName];
    }

    protected _isMove:boolean = false;
    
    public get roleId():number 
    {
        return this._roleId;
    }
    
    public get roleName():string {
        return this._roleName;
    }

    public get gameAni():GameAnimation 
    {
        return this._gameAni;
    }
    
    public get roleControll():ActionControll 
    {
        return this._roleControll;
    }
    
    public get bulletGroup():any {
        return this._bulletGroup;
    }

    public set bulletGroup(value:any) {
        this._bulletGroup = value;
    }

    public get isDie():boolean {
        return this._isDie;
    }

    public set isDie(value:boolean) {
        if(this._isDie == value) return;
        if(value) {
            this.setAnimation("die");
            // this._gameAni.once(Event.COMPLETE,this,this.dieComplete)
        }
    }

    public set isHurt(value:boolean) {
        if(this._isHurt == value) return;
        if(value) {
            if(this._gameAni.hasAction("hurt")){
                this.setAnimation("hurt");
                // this._gameAni.once(Laya.Event.COMPLETE,this,this.hurtComplete)
            }
            Laya.SoundManager.playSound(LoadManager.getUrl("beHited_snd",GameGlobal.SOUND));
        }
    }

    public hurtComplete():void {
        this._isHurt = false;
        this._gameAni.playAction("move");
    }

    public dieComplete():void {
    }
    
    public set isRecycle(value:boolean){
        this._isRecycle = value;
    }

    public get isRecycle():boolean{
        return this._isRecycle;
    }
    protected deltTime:number = 0;
    protected lastTime:number = 0;
    public update():void {

    }

    public recycle():void {
        this._gameAni.recycle();
    }

    public beHurted():void {

    }
}