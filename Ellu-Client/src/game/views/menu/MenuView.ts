import BaseView from "../BaseView";
import JsonConfig from "../../JsonConfig";
import MenuVo from "../../vo/MenuVo";
import CommandChannel from "../../controller/CommandChannel";
import ConstName from "../../ConstName";
import InstallationListItem from "./InstallationListItem";

export default class MenuView extends BaseView{
    public menuTab:Laya.Tab;
    public list:Laya.List;
    public createView(view:Object):void{
        super.createView(view);
        this.list.renderHandler = new Laya.Handler(this,this.renderList);
        this.list.vScrollBarSkin = "";
        this.list.elasticEnabled = true;
    }

    public init():void{
        //设置列表渲染项
        let menuVo:MenuVo = JsonConfig.ins.getVo(this._viewName) as MenuVo;
        this.list.array = menuVo.menuList;
        this.list.width = this.list.getCell(0).width * this.list.repeatX;
    }

    public set viewName(value:string){
        this._viewName = value;
    }

    private renderList(cellItem:InstallationListItem,index:number):void{
        cellItem.renderView();
    }

    public destroy(destroyChild: boolean){
        CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER,ConstName.UI_DESTROY_VIEW_BY_NAME,this._viewName);
        super.destroy(destroyChild);
        this.list = null;
        this.menuTab = null;
    }
}