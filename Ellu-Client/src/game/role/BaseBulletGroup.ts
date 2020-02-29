import BulletAnimation from "./BulletAnimation";

    export default class BaseBulletGroup extends Laya.Sprite{
        //子弹发射时间间隔
        private  _deltTime:number;
        //子弹发射速度
        private  _speed:number;
        //子弹发射音效
        private  _bulletSnd:string;
        //子弹动画播放速度
        private  _numbererval:number;
        //正在发射的子弹
        private  _bulletList:Array<BulletAnimation>;
        //回收的子弹
        private  _recycleList:Array<BulletAnimation>;
        //子弹皮肤地址
        private  _skinName:string;
        private  _skinUrl:string;
        public  constructor() {
            super();
            this._bulletList = [];
            this._recycleList = [];
        }

        public setBulletSkin(skinName:string,dir:number):void {
            // var bulletConfigVo:BulletConfigVo = JsonConfig.bulletConfigJson[skinName];
            // _deltTime = bulletConfigVo.deltTime;
            // _speed = bulletConfigVo.speed * dir;
            // _bulletSnd = bulletConfigVo.bulletSnd;
            // _numbererval = bulletConfigVo.numbererval;
            // this._skinName = skinName;
            // this._skinUrl = LoadManager.getUrl( skinName + ".atlas",GameGlobal.BULLET);
        }

        /**添加子弹 */
        public addBullet(pos:Laya.Point):void {
            // var bullet:BulletAnimation;
            // if(_recycleList.length > 0){
            //     bullet = _recycleList.pop();
            // }else{
            //     bullet = new BulletAnimation();
            //     bullet.loadAtlas(this._skinUrl,null,this._skinName);
            // }
            // bullet.numbererval = _numbererval;
            // bullet.pivot(1,0.5);
            // this.addChild(bullet);
            // bullet.play();
            // bullet.isRecycle = false;
            // bullet.pos(pos.x,pos.y)
            // _bulletList.push(bullet);
        }

        public get bulletList():Array<BulletAnimation> {
            return this._bulletList;
        }

        private  count:number ;
        private  recycleList:Array<BulletAnimation> = new Array<BulletAnimation>();
        public update():void {
            var posX:number;
            var posY:number;
            // for (var bulletName:string in this._bulletList) {
            //     let bullet:BulletAnimation = this._bulletList[bulletName];
            //     posX = bullet.x + this._speed;
            //     // var getRect:Rectangle = bullet.getGraphicBounds();
            //     if(posX > -200  && posX  < Laya.stage.width)
            //         bullet.x = posX;
            //     else {
            //         //回收再利用
            //         recycleList.push(bullet);
            //     }
            // }
            // if(recycleList.length>0) {
            //     for each(var recycleBullet:BulletAnimation in recycleList) {
            //         recycleBulletFunc(recycleBullet);
            //     }
            //     recycleList.splice(0,recycleList.length);
            // }

        }

        public recycleBulletFunc(bullet:BulletAnimation):void {
            // bullet.parent && (bullet.parent.removeChild(bullet));
            // var bulletIndex:number = _bulletList.indexOf(bullet);
            // _bulletList.splice(bulletIndex,1);
            // bullet.isRecycle = true;
            // bullet.stop();
            // _recycleList.push(bullet);
        }

        /**清空子弹组 */
        public clear():void {
            // for each(var bullet:BulletAnimation in _bulletList) {
            //     bullet.destroy(true);
            // }
            // _bulletList.splice(0,_bulletList.length);
            // for each(var recycleBullet:BulletAnimation in _recycleList) {
            //     recycleBullet.destroy(true);
            // }
            // _recycleList.splice(0,_recycleList.length);
        }

        /**销毁子弹组 */
        public destroy(destroyChild:Boolean = true):void {
            // super.destroy(destroyChild);
            // this.clear();
            // _bulletList = null;       
            // _recycleList = null;    
            // _skinName = null;
            // _skinUrl = null;
        }
    } 