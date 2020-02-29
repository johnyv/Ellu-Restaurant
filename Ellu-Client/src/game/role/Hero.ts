import Role from "./Role";
import CommandChannel from "../controller/CommandChannel";
import ConstName from "../ConstName";

/**
 * ...
 * @author jwd
 */
export default class Hero extends Role {
    private _faBaoArr: any = [];
    //记录角色位置列表
    private _posArr: any = [];
    public constructor(roleName: string, roleId: number) {
        super(roleName, roleId);
        // for(var i:number =0;i<this.roleSettingVo.fbArr.length;i++){
        //     var faBao:FaBao = new FaBao();
        //     faBao.setFaBaoSkin(roleSettingVo.fbArr[i]);
        //     _faBaoArr.push(faBao);
        // }
    }

    public addStage(pos): void {
        var channel:CommandChannel = CommandChannel.instance;
        this.gameAni.x = Math.ceil(pos.x);
        this.gameAni.y = Math.ceil(pos.y);
        var roleLayer:Laya.Sprite = channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME,ConstName.ROLE_LAYER) as Laya.Sprite;
        roleLayer.addChild(this.gameAni);
        // for each(var faBao:FaBao in this._faBaoArr){
        //     roleLayer.addChild(faBao);
        //     var faBaoX:number = pos.x + parsenumber(faBao.fbConfigVo.startPosX);
        //     var faBaoY:number;
        //     var startPosY:string = faBao.fbConfigVo.startPosY;
        //     if(startPosY.indexOf("-") ==startPosY.length -1){
        //         //相对角色头顶偏移距离定位置
        //         faBaoY = pos.y - roleSettingVo.roleHeight + parsenumber(startPosY.substr(0,startPosY.length -1));
        //     }else if(parseFloat(startPosY) <1){
        //         //按照角色身高定位置
        //         faBaoY = pos.y - roleSettingVo.roleHeight * parsenumber(startPosY.substr(0,startPosY.length -1));
        //     }else {
        //         //按照角色位置偏移
        //         faBaoY = pos.y + parsenumber(startPosY);
        //     }
        //     var faBaoPos :Ponumber = new Ponumber(faBaoX,faBaoY);
        //     faBao.addFaBao(faBaoPos);
        // }
        // var bulletLayer:Sprite = channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.GET_ROLE_LAYER,[ConstName.BULLET_LAYER]) as Sprite;
        // bulletLayer.addChild(this.bulletGroup);
    }

    public update(): void {
        // var rect:Rectangle = this._gameAni.getGraphicBounds();
        // this._gameAni.graphics.drawRect(rect.x,rect.y,rect.width,rect.height,"#000000");
        // if(this._roleControll.isMove) {
        //     // if(!lastTime)lastTime = (new Date()).getTime();
        //     // deltTime = ((new Date()).getTime() - lastTime);
        //     // var posX:number = this._gameAni.x + ((this._roleControll.rx*speed + sceneSpeed) * deltTime)/20 ;
        //     var posX:number = this._gameAni.x + this._roleControll.rx*speed ;
        //     var posY:number = this._gameAni.y + this._roleControll.ry*speed;
        //     var moveBounds:Array = this._gameAni.moveBoundsArr;
        //     if(posX > moveBounds[2]  && posX  < moveBounds[3])
        //         this._gameAni.x = posX;
        //     if(posY  > moveBounds[0] && posY  < moveBounds[1])
        //         this._gameAni.y = posY;
        //     // lastTime = (new Date()).getTime();
        //     if(_posArr.length < 150)
        //     {
        //         _posArr.unshift(new Ponumber(this._gameAni.x,this._gameAni.y));
        //     }else {
        //         _posArr.pop();
        //         _posArr.unshift(new Ponumber(this._gameAni.x,this._gameAni.y));
        //     }
        //     for each(var faBao:FaBao in this._faBaoArr){
        //     var pos:Ponumber = _posArr[faBao.fbConfigVo.posNo];
        //         if(pos){
        //             faBao.pos(pos.x,pos.y);
        //         }
        //         faBao.update();
        //     }
        // }
        // if(hasBullet){
        //     deltTime++;
        //     if(deltTime == bulletConfigVo.deltTime){
        //         this.deltTime = 0;
        //         transformPonumber.x = localPonumber.x;
        //         transformPonumber.y = localPonumber.y;
        //         this._gameAni.localToGlobal(transformPonumber);
        //         this.bulletGroup.addBullet(transformPonumber);
        //         SoundManager.playSound(LoadManager.getUrl(bulletConfigVo.bulletSnd,GameGlobal.SOUND));
        //     }
        // }

        // this.isMove = this._roleControll.isMove;
    }

    protected set isMove(value: boolean) {
        //     if(_isDie) return;
        //     if(_isMove != value) {
        //         _isMove = value;
        //         if(value) {
        //             setAnimation("attack");
        //         }else {
        //             setAnimation("attack");
        //         }
        //     }
        // }

    }

}