import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";
import Hero from "../role/Hero";
import Enemy from "../role/Enemy";
import ConstName from "../ConstName";

export default class RoleManager extends BaseManager
{
	private  _heroList:Array<Hero> = new Array<Hero>();s
	private  _enemyList:Array<Enemy> = new Array<Enemy>();
	private  _roleControllHash:Object = new Object();
	//敌人缓冲池，避免重复创建
	private  _roleCacheList:Array<Enemy> = new Array<Enemy>();
	public constructor(channel:CommandChannel)
	{
		super(channel);
	}
	
	public init():void{
		Laya.timer.loop(30, this, this.update);
	}

	/** 根据角色id获取角色，无论在什么
	 * 阶段都能获取到角色对象，除了角色的
	 * 显示资源（采用异步加载填充），数据都会存在，
	 * */
	public getHero(params:any):any
	{
		var roleName:string = params[0];
		var roleId:number = params[1];
		let hero:Hero;
		for(let heroID in this._heroList)
		{
			hero = this._heroList[heroID];
			if (hero.roleId == roleId)
				return hero;
		}
		hero = new Hero(roleName,roleId);
		// hero.bulletGroup = this.channel.postCommand(ConstName.BATTLE_CONTROLLER,ConstName.BATTLE_CREATE_BULLET_GROUP,[roleId]) as BaseBulletGroup;
		// hero.setBulletSkin();
		hero.setSkin("female.atlas");
		hero.setAnimation("move");
		this._heroList.push(hero);
		return hero;
	}
	
	public getHeroList():Array<Hero> {
		return this._heroList;
	}

	public addHero(params:any):void
	{
		var roleName:string = params[0];
		var roleId:number = params[1];
		var pos:Laya.Point = params[2];
		var hero:Hero = this.getHero([roleName,roleId]);
		if (hero)
		{
			hero.setSkin(roleName+".atlas");
			hero.setAnimation("move");
			hero.addStage(pos);
		}
	}
	

	/** 根据角色id获取敌人，如果缓冲池中有
	 * 该类型的敌人，那就取出，如果没有，则
	 * 创建
	 * */
	public getEnemy(params:any):any
	{
		var roleName:string = params[0];
		var roleId:number = params[1];
		let enemy:Enemy;
		for(let i=0,len = this._roleCacheList.length ;i<len;i--){
			enemy = this._roleCacheList[i];
			console.log("从回收池中创建敌人");
			this._roleCacheList.splice(i,1);
			return enemy;
		}
		enemy = new Enemy(roleName,roleId);
		enemy.setSkin("monster/"+roleName+".atlas");
		// if(enemy.hasBullet){
		// 	enemy.bulletGroup = this.channel.postCommand(ConstName.BATTLE_CONTROLLER,ConstName.BATTLE_CREATE_BULLET_GROUP,[roleId]) as BaseBulletGroup;
		// 	enemy.setBulletSkin();
		// }
		return enemy;
	}

	public addEnemy(params:any):void
	{
		if(this._enemyList.length>8)
			return;
		var roleName:string = params[0];
		var roleId:number = params[1];
		var pos:Laya.Point = params[2];
		var enemy:Enemy = this.getEnemy([roleName,roleId]);
		if (enemy)
		{
			enemy.init();
			enemy.setAnimation("move");
			enemy.gameAni.x = Math.ceil(pos.x);
			enemy.gameAni.y = Math.ceil(pos.y);
			var roleLayer:Laya.Sprite = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME,ConstName.ROLE_LAYER) as Laya.Sprite;
			roleLayer.addChild(enemy.gameAni);
			var effectLayer:Laya.Sprite = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME,ConstName.EFFECT_LAYER) as Laya.Sprite;
			effectLayer.addChild(enemy.bulletGroup);
			this._enemyList.push(enemy);
		}
	}

	public getEnemyList():Array<Enemy> {
		return this._enemyList;
	}

	public setSceneSpeed(params:any):void {
		// var sceneSpeed:Number = params[0];
		// for each (var hero:Hero in _heroList)
		// {
		// 	hero.sceneSpeed = sceneSpeed;
		// }
	}

	/**避免重复创建 */
	private recycleList:Array<Enemy> = new Array<Enemy>();
	private update():void
	{
		// for each (var hero:Hero in _heroList)
		// {
		// 	hero.update();
		// }
		// for each (var enemy:Enemy in _enemyList)
		// {
		// 	enemy.update();
		// 	if(enemy.isRecycle){
		// 		recycleList.push(enemy);
		// 	}
		// }
		// if(recycleList.length>0) {
		// 	for each(var recycle:Enemy in recycleList) {
		// 		recycleBulletFunc(recycle);
		// 	}
		// 	recycleList.splice(0,recycleList.length);
		// }
	}

	/**回收敌人机制 */
	public recycleBulletFunc(enemy:Enemy):void {
		// enemy.recycle();
		// var enemyIndex:Number = _enemyList.indexOf(enemy);
		// _enemyList.splice(enemyIndex,1);
		// _roleCacheList.push(enemy);
	}
}