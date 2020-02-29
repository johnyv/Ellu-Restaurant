import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";

/**
 * ...
 * @author jwd
 */
export default class UILayerManager extends BaseManager {
	//所有ui层容器
	public uiLayer: Laya.Sprite;
	//模块ui显示层
	public mainUILayer: Laya.Sprite;
	//弹出层ui
	public alertUILayer: Laya.Sprite;
	//文字提示层
	public tipUILayer: Laya.Sprite;

	public constructor(channel: CommandChannel) {
		super(channel);
		this.uiLayer = new Laya.Sprite();
		this.mainUILayer = new Laya.Sprite();
		this.alertUILayer = new Laya.Sprite();
		this.tipUILayer = new Laya.Sprite();
		Laya.stage.addChild(this.uiLayer);
	}

	public setMainUILayerIndex(index: number): void {
		this.uiLayer.addChild(this.mainUILayer);
		this.mainUILayer.zOrder = index;
	}

	public setAlertUILayerIndex(index: number): void {
		this.uiLayer.addChild(this.alertUILayer);
		this.alertUILayer.zOrder = index;
	}

	public setTipUILayerIndex(index: number): void {
		this.uiLayer.addChild(this.tipUILayer);
		this.tipUILayer.zOrder = index;
	}
}