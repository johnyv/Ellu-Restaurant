import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";
import SceneSprite from "../SceneSprite";

/**
 * ...
 * @author jwd
 */
export default class SceneLayerManager extends BaseManager {
	/**世界总容器 */
	public sceneLayer: Laya.Sprite;
	public frontLayer: Laya.Sprite;
	public middleLayer: Laya.Sprite;
	public rearLayer: Laya.Sprite;
	public sceneSprite: SceneSprite;
	public rearSpeed: Number = 0;
	public middleSpeed: Number = 0;
	public frontSpeed: Number = 0;
	//角色层,公开减少获取层次
	public roleLayer: Laya.Sprite;
	//子弹层
	public bulletLayer: Laya.Sprite;
	//特效层
	public effectLayer: Laya.Sprite;

	public constructor(channel: CommandChannel) {
		super(channel);
		this.sceneLayer = new Laya.Sprite();
		this.frontLayer = new Laya.Sprite();
		this.middleLayer = new Laya.Sprite();
		this.rearLayer = new Laya.Sprite();
		this.roleLayer = new Laya.Sprite();
		this.bulletLayer = new Laya.Sprite();
		this.effectLayer = new Laya.Sprite();
		Laya.stage.addChild(this.sceneLayer);
	}

	public getWorldLayer():Laya.Sprite{
		return this.sceneLayer;
	}

	public setFrontLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.frontLayer);
		this.frontLayer.zOrder = index;
	}

	public setMiddleLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.middleLayer);
		this.middleLayer.zOrder = index;
	}

	public setRearLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.rearLayer);
		this.rearLayer.zOrder = index;
	}


	public setRoleLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.roleLayer);
		this.roleLayer.zOrder = index;
	}

	public setBulletLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.bulletLayer);
		this.bulletLayer.zOrder = index;
	}

	public setEffectLayerIndex(index: number): void {
		this.sceneLayer.addChild(this.effectLayer);
		this.effectLayer.zOrder = index;
	}

	/** 生成场景*/
	public createScene(sceneId: string): void {
		Laya.Scene.open("scene/" + sceneId + ".scene", true, Laya.Handler.create(this, this.addScene));
	}

	/**对场景显示对象进行分层处理 */
	private addScene(scene: SceneSprite): void {
		this.sceneSprite = scene;
		if (this.sceneSprite.rearLayer != null) {
			this.rearLayer.addChild(scene.rearLayer);
			this.rearSpeed = this.sceneSprite.rearLayer.speed;
		}
		if (this.sceneSprite.roleLayer != null) {
			this.middleSpeed = this.sceneSprite.roleLayer.speed;
			this.middleLayer.addChild(scene.roleLayer);
		}
		if (this.sceneSprite.frontLayer != null) {
			this.frontLayer.addChild(scene.frontLayer);
			this.frontSpeed = this.sceneSprite.frontLayer.speed;
		}
		Laya.SoundManager.playMusic("resource/sound/bg_music.mp3");
		// this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_SCENE_SPEED,[-_middleSpeed]);
		// Laya.timer.loop(30,this,this.update);
	}

	/**更新场景移动 */
	private update(): void {
		if (this.sceneSprite) {
			var layerSpriteName: string;
			var layerSprite: Laya.Sprite;
			//逐渐优化中，先写死
			//中景层
			if (this.middleSpeed) {
				for (layerSpriteName in this.sceneSprite.middleList) {
					layerSprite = this.sceneSprite.middleList[layerSpriteName];
					layerSprite.x -= this.sceneSprite.roleLayer.speed;
					//6666真坑，displayWidth 尽然可以为负数（当scaleX 为-数的时候）
					if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
						layerSprite.x = this.sceneSprite.middleEnd.x + Math.abs(this.sceneSprite.middleEnd.displayWidth) - this.sceneSprite.roleLayer.speed;
						this.sceneSprite.middleEnd = layerSprite;
					}
				}
			}
			//前景层
			if (this.frontSpeed) {
				for (layerSpriteName in this.sceneSprite.frontList) {
					layerSprite = this.sceneSprite.frontList[layerSpriteName];
					layerSprite.x -= this.sceneSprite.frontLayer.speed;
					//6666真坑，displayWidth 尽然可以为负数（当scaleX 为-数的时候）
					if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
						layerSprite.x = this.sceneSprite.frontEnd.x + Math.abs(this.sceneSprite.frontEnd.displayWidth) - this.sceneSprite.frontLayer.speed;
						this.sceneSprite.frontEnd = layerSprite;
					}
				}
			}
			//远景层
			if (this.rearSpeed) {
				for (layerSpriteName in this.sceneSprite.rearList) {
					layerSprite = this.sceneSprite.rearList[layerSpriteName];
					layerSprite.x -= this.sceneSprite.rearLayer.speed;
					//6666真坑，displayWidth 尽然可以为负数（当scaleX 为-数的时候）
					if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
						layerSprite.x = this.sceneSprite.rearEnd.x + Math.abs(this.sceneSprite.rearEnd.displayWidth) - this.sceneSprite.rearLayer.speed;
						this.sceneSprite.rearEnd = layerSprite;
					}
				}
			}
		}
	}

	/**释放场景资源*/
	public clear(): void {
		this.frontLayer.removeChildren();
		this.middleLayer.removeChildren();
		this.rearLayer.removeChildren();
	}

	public destroy(): void {
		this.frontLayer.destroy(true);
		this.frontLayer = null;
		this.middleLayer.destroy(true);
		this.middleLayer = null;
		this.rearLayer.destroy(true);
		this.rearLayer = null;
	}

}