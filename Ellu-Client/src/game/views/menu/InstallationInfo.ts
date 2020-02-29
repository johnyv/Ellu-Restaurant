import BaseView from "../BaseView";
import InstallationItemVo from "../../vo/InstallationItemVo";
import InstallationItem from "./InstallationItem";
import MenuVo from "../../vo/MenuVo";
import JsonConfig from "../../JsonConfig";
import ConstName from "../../ConstName";
import CommandChannel from "../../controller/CommandChannel";
import LoadManager from "../../manager/LoadManager";

export default class InstallationInfo extends BaseView{
    public icon:Laya.Image;
    public title_txt:Laya.Label;
    public des_txt:Laya.Label;
    public item_txt_1:Laya.Label;
    public item_txt_2:Laya.Label;
    public item_txt_3:Laya.Label;
    public use_btn:Laya.Sprite;

    public createView(viewObj:Object):void{
        super.createView(viewObj);
        this.use_btn.on(Laya.Event.CLICK,this,this.use);
        // Laya.stage.on(Laya.Event.CLICK,this,(e:Laya.Event)=>{
        //     alert(e.target.name);
        // });
    }

    public use():void {
        if(this.viewData){
            CommandChannel.instance.postCommand(ConstName.GAME_CONTROLLER,ConstName.GAME_ADD_INSTALLATION,this.viewData);
        }
    }

    public showSelf(closeOther: boolean,isModel:boolean,uiLayer:Laya.Sprite):void{
        super.showSelf(closeOther,isModel,uiLayer);
        let viewData:InstallationItemVo = this.viewData as InstallationItemVo;
        if(viewData){
            this.icon.skin = LoadManager.getIconUrl(viewData.type,viewData.id);
            this.title_txt.text = viewData.installationItemName;
            this.des_txt.text = viewData.descript;
            let menuVo:MenuVo = JsonConfig.ins.getVo(ConstName.MENU_VIEW) as MenuVo;
            let propertyList:Array<string> = viewData.propertyList;
            for(let i:number = 1,len:number = propertyList.length;i<=len;i++){
                var propertyArr:Array<string> = propertyList[i-1].split("_");
                this["item_txt_" + i].text = menuVo.propertype[propertyArr[0]] + "   +" + propertyArr[1];
            }
        }
    }

    public close():void{
        super.close();
        Laya.Dialog.manager.maskLayer.removeSelf();
    }
}