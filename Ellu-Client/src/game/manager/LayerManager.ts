import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";
import SceneLayerManager from "./SceneLayerManager";
import UILayerManager from "./UILayerManager";
import ConstName from "../ConstName";

/**
 * 游戏资源层次管理
 * 场景层，人物层，UI层
 * 每个层管理自己的层次
 * @author jwd
 */
export default class LayerManager extends BaseManager {
	private _sceneManager: SceneLayerManager;
	// private  _roleLayerManager:RoleLayerManager;
	private _uiLayerManager: UILayerManager;

	public constructor(channel: CommandChannel) {
		super(channel);
		this._sceneManager = new SceneLayerManager(channel);
		// this._roleLayerManager = new RoleLayerManager(channel);
		this._uiLayerManager = new UILayerManager(channel);
	}

	public init(): void {
		//最后层背景
		this._sceneManager.setRearLayerIndex(0);
		//中层背景
		this._sceneManager.setMiddleLayerIndex(1);
		//角色层
		this._sceneManager.setRoleLayerIndex(2);
		//子弹层
		this._sceneManager.setBulletLayerIndex(3);
		//特效子弹层
		this._sceneManager.setEffectLayerIndex(4);
		//角色预留层4
		//角色预留层5
		//角色预留层6
		//近层背景
		this._sceneManager.setFrontLayerIndex(7);
		//模块UI层
		this._uiLayerManager.setMainUILayerIndex(8);
		//弹出ui层
		this._uiLayerManager.setAlertUILayerIndex(9);
		//文字提示层
		this._uiLayerManager.setTipUILayerIndex(10);
	}

	public getUILayer():Laya.Sprite{
		return this._uiLayerManager.uiLayer;
	}

	public getSceneLayer():Laya.Sprite{
		return this._sceneManager.sceneLayer;
	}

	public getSceneLayerByName(roleLayerType: string): Laya.Sprite {
		switch (roleLayerType) {
			case ConstName.ROLE_LAYER:
				return this._sceneManager.roleLayer;
				break;
			case ConstName.BULLET_LAYER:
				return this._sceneManager.bulletLayer;
				break;
			case ConstName.EFFECT_LAYER:
				return this._sceneManager.effectLayer;
				break;
		}
		return new Laya.Sprite();
	}

	public getUILayerByName(uiLayerType: string): Laya.Sprite {
		switch (uiLayerType) {
			case ConstName.MAIN_UI_LAYER:
				return this._uiLayerManager.mainUILayer;
				break;
			case ConstName.ALERT_UI_LAYER:
				return this._uiLayerManager.alertUILayer;
				break;
			case ConstName.TIP_UI_LAYER:
				return this._uiLayerManager.tipUILayer;
				break;
		}
		return new Laya.Sprite();
	}

	public createScene(params: any): void {
		var sceneId: string = params[0];
		this._sceneManager.createScene(sceneId);
	}
}