import BaseAnimation from "./BaseAnimation";
import LoadManager from "../manager/LoadManager";
import GameGlobal from "../GameGlobal";

export default class GameAnimation extends BaseAnimation{
    private  _loadUrl: string;
    private  _actionNameList: string[] = [];
    private  _actionFrame:Object = new Object();
    public static MODUL:string = "modul";
    private  _currentActionName:string;
    private  _isLoaded:Boolean = false;
    //角色移动边界，上，下，左，右
    public  moveBoundsArr:number[] = [0,0,0,0];

    public loadAtlas(url:string, loaded:Laya.Handler = null, cacheName:string = ""):Laya.Animation {
        this._loadUrl = LoadManager.getUrl(url,GameGlobal.ROLE);
        return super.loadAtlas(this._loadUrl,Laya.Handler.create(this, this.onLoaded));
    }
    private startLoad():void {
        Laya.loader.load(this._loadUrl, Laya.Handler.create(this, this.onLoaded));
    }

    private onLoaded():void
    {
        this._isLoaded = true;
        var _e:any= Laya.loader.getRes(this._loadUrl);
        this._prefix = _e.meta.prefix;
        var frames: Object = _e.frames;
        //生成动作列表
        for(var fullName in frames) {
            var actionName:string = fullName.split("_")[0];
            if(this._actionNameList.indexOf(actionName)<0) {
                this._actionNameList.push(actionName);
                this._actionFrame[actionName] = 1;
            }else
                this._actionFrame[actionName]++;
        }
        this.playAction("move");
    }

    public hasAction(actionName):boolean {
        return this._actionNameList.indexOf(actionName)>-1;
    }

    public playAction(actionName:string ,start:number = 0,loop:boolean = true,name:string= GameAnimation.MODUL):void {
        if (!this._isLoaded || this._actionNameList.indexOf(actionName)==-1) return;
        if(this._currentActionName == actionName) return;
        this._currentActionName = actionName;
        Laya.Animation.createFrames(this.aniUrls(actionName,this._actionFrame[actionName]),GameAnimation.MODUL);
        this.play(start, loop, actionName);
        if(!this.graphics._one){
            debugger;
        }
        this.pivot(this.graphics._one.width/2,0);
        var moveBoundsRect:Laya.Rectangle = this.getGraphicBounds();
        this.moveBoundsArr[1] = Laya.stage.height - moveBoundsRect.height;
        this.moveBoundsArr[3] = Laya.stage.width - moveBoundsRect.width/2;
        // debugger;
    }

    public recycle():void {
        // this.stop();
        // this.parent && (this.parent.removeChild(this));
    }
}