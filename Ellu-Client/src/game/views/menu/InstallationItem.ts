import InstallationItemVo from "../../vo/InstallationItemVo";
import CommandChannel from "../../controller/CommandChannel";
import ConstName from "../../ConstName";
import LoadManager from "../../manager/LoadManager";

export default class InstallationItem extends Laya.Box{
    public owned:Laya.Sprite;
    public icon:Laya.Image;

    public renderView():void{
        this.owned = this.getChildByName("owned") as Laya.Sprite;
        this.owned.visible = false;
        this.icon = this.getChildByName("icon") as Laya.Image;
        let data:InstallationItemVo = this.dataSource;
        this.icon.skin = LoadManager.getIconUrl(data.type,data.id);
        this.on(Laya.Event.CLICK,this,this.showInfo);
    }

    private showInfo():void{
        let data:InstallationItem = this.dataSource;
        if(data!=null){
            CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER,ConstName.UI_SHOW_VIEW_BY_NAME,[ConstName.INSTALLATION_INFO,data]);
        }
    }

    public destroy(destroyChild: boolean){
        super.destroy(destroyChild);
        this.off(Laya.Event.CLICK,this,this.showInfo);
        this.owned = null;
        this.icon = null;
    }
}