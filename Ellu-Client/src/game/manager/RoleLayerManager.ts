import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";

/**
 * ...
 * @author jwd
 */
export default class RoleLayerManager extends BaseManager {
	//角色层,公开减少获取层次
	public roleLayer: Laya.Sprite;
	//子弹层
	public bulletLayer: Laya.Sprite;
	//特效层
	public effectLayer: Laya.Sprite;
	public constructor(channel: CommandChannel) {
		super(channel);
		this.roleLayer = new Laya.Sprite();
		this.bulletLayer = new Laya.Sprite();
		this.effectLayer = new Laya.Sprite();
	}

	public setRoleLayerIndex(index: number): void {
		Laya.stage.addChild(this.roleLayer);
		this.roleLayer.zOrder = index;
	}

	public setBulletLayerIndex(index: number): void {
		Laya.stage.addChild(this.bulletLayer);
		this.bulletLayer.zOrder = index;
	}

	public setEffectLayerIndex(index: number): void {
		Laya.stage.addChild(this.effectLayer);
		this.effectLayer.zOrder = index;
	}
}