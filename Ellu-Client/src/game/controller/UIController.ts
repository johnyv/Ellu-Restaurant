import Controller from "./Controller";
import CommandChannel from "./CommandChannel";
import UIManager from "../manager/UIManager";
import ConstName from "../ConstName";

export default class UIController extends Controller{
    private _uiManager:UIManager;
    public constructor(channel:CommandChannel){
        super(channel);
        this._uiManager = new UIManager(channel);
        this.managerList.push(this._uiManager);
        this.addCommand(ConstName.UI_SHOW_VIEW_BY_NAME,this._uiManager,this._uiManager.showView);
        this.addCommand(ConstName.UI_REMOVE_VIEW_BY_NAME,this._uiManager,this._uiManager.removeViewByName);
        this.addCommand(ConstName.UI_DESTROY_VIEW_BY_NAME,this._uiManager,this._uiManager.destroyViewByName);
    }
}