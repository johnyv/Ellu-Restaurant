import Controller from "./Controller";
import CommandChannel from "./CommandChannel";
import RoleManager from "../manager/RoleManager";
import ConstName from "../ConstName";

	/**
	 * ...
	 * @author jwd
	 */
	export default class RoleController extends Controller 
	{
		private _roleManager:RoleManager;
		public constructor(channel:CommandChannel) 
		{
			super(channel);
			this._roleManager = new RoleManager(this.channel);
			this.managerList.push(this._roleManager);
			this.addCommand(ConstName.ROLE_GET_ROLE_BY_ID,this._roleManager,this._roleManager.getHero);
			this.addCommand(ConstName.ROLE_ADD_HERO,this._roleManager,this._roleManager.addHero);
			this.addCommand(ConstName.ROLE_ADD_ENEMY,this._roleManager,this._roleManager.addEnemy);
			this.addCommand(ConstName.ROLE_SCENE_SPEED,this._roleManager,this._roleManager.setSceneSpeed);
			this.addCommand(ConstName.ROLE_GET_HERO_LIST,this._roleManager,this._roleManager.getHeroList);
			this.addCommand(ConstName.ROLE_GET_ENEMY_LIST,this._roleManager,this._roleManager.getEnemyList);
		}	
	}