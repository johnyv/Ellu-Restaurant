import BaseManager from "./BaseManager";
import CommandChannel from "../controller/CommandChannel";
import InputManager from "./InputManager";
import HitManager from "./HitManager";
import GameEvent from "../GameEvent";
import ConstName from "../ConstName";
import LoadManager from "./LoadManager";
import GameGlobal from "../GameGlobal";
import InstallationItemVo from "../vo/InstallationItemVo";

	/**
	 * ...
	 * @author jwd
	 */
	export default class GameManager extends BaseManager 
	{

		private  _inputManager:InputManager;
		private  _hitManager:HitManager;
		public constructor(channel:CommandChannel) {
			super(channel);
			this._inputManager = new InputManager(channel);
			this._hitManager = new HitManager(channel);
		}
		
		public init():void {
			GameEvent.ins.on(ConstName.FIRST_LOAD_COMPLETE,this,this.initGame);
		}
		
		private  roleId:number = 2;
		private initGame():void {
			// this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_ADD_HERO,["female",0,new Laya.Point(400,100)]);
			//临时写段生成enmey的逻辑，之后处理
			for(let i = 0;i<10;i++){
				this.createEnemy();
			}
			// Laya.timer.loop(600,this,this.createEnemy);
			this.channel.postCommand(ConstName.LAYER_CONTROLLER,ConstName.LAYER_CREATE_SCENE,['s_1']);
			// this._inputManager.setInputStyle();
			this.channel.postCommand(ConstName.UI_CONTROLLER,ConstName.UI_SHOW_VIEW_BY_NAME,[ConstName.MAIN_VIEW]);
			// this._hitManager.init();
			// Laya.SoundManager.playMusic(LoadManager.getUrl("bgm.mp3",GameGlobal.MUSIC));
		}

		private  enemyNameArr: string[] = ["m_1","m_2","m_3","m_4"];
		private createEnemy():void {
			var random:number = Math.random()*100;
			if(random> 20){
				this.roleId++;
				var randomName:string = this.enemyNameArr[parseInt(Math.random()*this.enemyNameArr.length + "")];
				this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_ADD_ENEMY,[randomName,this.roleId,new Laya.Point(-560 + Math.random()*2240,Math.random()*(Laya.stage.height-100))]);
			}
		}

		public testCommandChannel(){
			alert("命令管线调试成功，可以开工了");
		}

		public addInstallation(data:InstallationItemVo):void{
			let roleLayer:Laya.Sprite = this.channel.postCommand(ConstName.LAYER_CONTROLLER,ConstName.LAYER_GET_SCENE_LAYER_BY_NAME,ConstName.ROLE_LAYER);
			let installationImage:Laya.Image = new Laya.Image();
			installationImage.skin = LoadManager.getIconUrl(data.type,data.id);
			installationImage.pos(data.posArr[0],data.posArr[1]);
			installationImage.width = data.sizeArr[0];
			installationImage.height = data.sizeArr[1];
			roleLayer.addChild(installationImage);
			this.channel.postCommand(ConstName.UI_CONTROLLER,ConstName.UI_REMOVE_VIEW_BY_NAME,ConstName.INSTALLATION_INFO);
			this.channel.postCommand(ConstName.UI_CONTROLLER,ConstName.UI_REMOVE_VIEW_BY_NAME,ConstName.MENU_VIEW);
		}

	}