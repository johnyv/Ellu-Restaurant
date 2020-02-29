import BaseManager from "./BaseManager";
import GameEvent from "../GameEvent";
import ConstName from "../ConstName";
import BaseControl from "../gameModule/BaseControl";
import MainView from "../views/MainView";
import MenuView from "../views/menu/MenuView";
import BaseView from "../views/BaseView";
import JsonConfig from "../JsonConfig";
import ViewConfigVo from "../vo/ViewConfigVo";
import LoadManager from "./LoadManager";
import GameGlobal from "../GameGlobal";

/**
 * ...
 * @author jwd
 */
export default class UIManager extends BaseManager {
	//类映射
	private _viewClassHash: Object;
	//界面实例
	private _viewInsHash: Object;
	
	public constructor(channel) {
		super(channel);
		this._viewInsHash = new Object();
		GameEvent.ins.on(ConstName.SHOW_VIEW, this, this.showView);
	}

	//注册各种界面
	public init(): void {
	}

	//获取界面,如果没有界面实例则创建
	public getView(viewName:string,viewData:any): BaseView {
		let view = this._viewInsHash[viewName] || this.createView(viewName,viewData);
		return view;
	}

	/** 生成界面*/
	public createView(viewName: string,viewData:any): void {
		let viewVo: ViewConfigVo = JsonConfig.viewConfigVoJson[viewName];
		// Laya.View.load("views/" + viewVo.resourceUrl,Laya.Handler.create(this, this.loadViewJson,[viewName]));
		Laya.Scene.open("views/" + viewVo.resourceUrl, true, Laya.Handler.create(this, this.loadViewJson,[viewName,viewData]));
	}

	/**解析界面配置文件，如果有的话 */
	private loadViewJson(viewName:string,viewData:any,view: BaseView):void{
		if (view) {
			view.viewData = viewData;
			let viewVo: ViewConfigVo = JsonConfig.viewConfigVoJson[viewName];
			if(viewVo.jsonName)
				Laya.loader.load(LoadManager.getUrl(viewVo.jsonName,GameGlobal.JSON),new Laya.Handler(this,this.addView,[viewName,view]));  
			else
				this.addView(viewName,view);
		}
	}

	/**加载完成后初次显示界面 */
	private addView(viewName:string,view: BaseView): void {
		if (view) {
			this._viewInsHash[viewName] = view;
			view.viewName = viewName;
			let viewVo: ViewConfigVo = JsonConfig.viewConfigVoJson[viewName]; 
			if(viewVo.jsonName)
				JsonConfig.ins.setVo(viewName,LoadManager.getRes(viewVo.jsonName,GameGlobal.JSON));
			var uiLayer: Laya.Sprite = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_UI_LAYER_BY_NAME, ConstName.MAIN_UI_LAYER) as Laya.Sprite;
			view.showSelf(viewVo.closeOther,viewVo.isModel,uiLayer);
			view.init();
		}
	}

	//显示界面
	public showView(params: any): void {
		var viewName: string = params[0];
		let viewData:any = params[1];
		//判断是否开启当前模块 ,预留
		var view: BaseView = this.getView(viewName,viewData);
		if (view) {
			view.viewData = viewData;
			let viewVo: ViewConfigVo = JsonConfig.viewConfigVoJson[viewName];
			var uiLayer: Laya.Sprite = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_UI_LAYER_BY_NAME, ConstName.MAIN_UI_LAYER) as Laya.Sprite;
			view.showSelf(viewVo.closeOther,viewVo.isModel,uiLayer);
			view.init();
		}
	}

	public removeViewByName(viewName:string):void {
		let view:BaseView = this._viewInsHash[viewName];
		if(view){
			view.removeSelf();
		}
	}

	public destroyViewByName(viewName:string):void {
		delete this._viewInsHash[viewName];
	}

	public destroy(): void {
		for (var controlName in this._viewInsHash) {
			let view = this._viewInsHash[controlName];
			view.destroy(true);
			delete this._viewInsHash[controlName];
		}
		this._viewInsHash = null;
	}
}