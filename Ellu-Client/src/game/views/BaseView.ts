import JsonConfig from "../JsonConfig";
import ViewConfigVo from "../vo/ViewConfigVo";

export default class BaseView extends Laya.Dialog{

    protected _viewName:string;
    public viewData:any;
    public isModel:boolean;
    public constructor(){
        super();
    }

    public createView(view:Object):void{
        super.createView(view);
    }

    public set viewName(value:string){
        this._viewName = value;
    }
    
    public showSelf(closeOther: boolean,isModel:boolean,uiLayer:Laya.Sprite):void{
        this.isModel = isModel;
        if(isModel){
            //以模式窗口弹出界面
            this.popup(closeOther);
        }
        else if(this.parent != uiLayer){
            uiLayer.addChild(this);
        }
    }

    public removeSelf():Laya.Node{
        if(this.isModel)
            Laya.Dialog.manager.maskLayer.removeSelf();
        return super.removeSelf();
    }

    public init():void{

    }
    // public remove():void{
    //     if(this.parent){
    //         this.parent.removeChild(this);
    //     }
    // }

    // public close():void{
    //     super.close();
    //     Laya.Dialog.manager.maskLayer.removeSelf();
    //     let viewVo:ViewConfigVo = JsonConfig.viewConfigVoJson[this._viewName];
    //     if(viewVo.closeAndDestroy)
    //         this.destroy(true);
    // }

    public destroy(destroyChild: boolean):void{
        super.destroy(destroyChild)
    }
}