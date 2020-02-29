export default class FaBao extends Laya.Sprite{
    //法宝皮肤地址
    // private var _skinName:String;
    // private var _skinUrl:String;
    // public var fbConfigVo:FbConfigVo;
    
    // public function FaBao(){
    //     super();
    // }

    // public function setFaBaoSkin(skinName:String):void {
    //     this._skinName = skinName;
    //     this.fbConfigVo = JsonConfig.fbConfigVoJson[skinName];
    //     if(this.fbConfigVo.isAni)
    //         this._skinUrl = LoadManager.getUrl( skinName + ".atlas",GameGlobal.FABAO);
    //     else
    //         this._skinUrl = LoadManager.getUrl( skinName + ".png",GameGlobal.FABAO);
    // }

    // /**添加子弹 */
    // public function addFaBao(pos:Point):void {
    //     var fabao:*;
    //     if(!this.fbConfigVo.isAni){
    //         fabao = new Image();
    //         fabao.skin = this._skinUrl;
    //     }else{
    //         fabao = new Animation();
    //         fabao.loadAtlas(this._skinUrl,null,this._skinName);
    //         fabao.interval = this.fbConfigVo.interval;
    //         fabao.play();
    //     }
    //     fabao.pivot(1,0.5);
    //     this.addChild(fabao);
    //     this.pos(pos.x,pos.y)
    // }

    // /**更新 */
    // public function update():void {

    // }
}