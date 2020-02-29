import InstallationListItemVo from "../../vo/InstallationListItemVo";
import InstallationItem from "./InstallationItem";
import BaseView from "../BaseView";

export default class InstallationListItem extends Laya.Box{
    public title_txt:Laya.Label;
    public installationList:Laya.List;

    private renderList(cellItem:InstallationItem,index:number):void{
        cellItem.renderView();
    }

    public renderView():void{
        let dataSource:InstallationListItemVo = this.dataSource;
        this.title_txt = this.getChildByName("title_txt") as Laya.Label;
        this.installationList = this.getChildByName("installationList") as Laya.List;
        this.installationList.renderHandler = new Laya.Handler(this,this.renderList);
        this.installationList.repeatY = Math.ceil(dataSource.installationItemList.length / this.installationList.repeatX)
        this.height = (this.height) * this.installationList.repeatY;
        this.title_txt.text = dataSource.installationName;
        this.installationList.array = dataSource.installationItemList;
    }

    public destroy(destroyChild: boolean){
        super.destroy(destroyChild);
        this.title_txt = null;
        this.installationList = null;
    }
}