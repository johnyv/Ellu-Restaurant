import BaseManager from "./BaseManager";
import ActionControll from "../role/ActionControll";
import CommandChannel from "../controller/CommandChannel";

	/**
	 * ...
	 * @author jwd
	 */
	export default class InputManager extends BaseManager
	{
		private _roleControll:ActionControll;

		public constructor(channel:CommandChannel) {
			super(channel);
		}

		/**根据平台设置对应的控制方式,
		 * pc按键控制，
		 * 移动，虚拟按键
		 */
		public setInputStyle():void
		{
			// var hero:Role = this.channel.postCommand(ConstName.ROLE_CONTROLLER,ConstName.ROLE_GET_ROLE_BY_ID,["female",0]) as Role;
			// this._roleControll = hero.roleControll;
			// if(Browser.onAndroid || !Browser.onPC) {
			// 	//如果是移动平台，则显示移动控制ui
			// 	this.channel.postCommand(ConstName.UI_CONTROLLER,ConstName.SHOW_VIEW_BY_NAME,[ConstName.MOVE_VIEW]);
			// }
			// else if (Browser.onPC)
			// {
			// 	Laya.stage.on(Event.KEY_DOWN, this, this.heroControll);
			// 	Laya.stage.on(Event.KEY_UP, this, this.heroControll);
			// 	Stat.show(0,0);
			// }
		}
		
		private heroControll(evt:any):void
		{
			if (evt.keyCode == Laya.Keyboard.D || evt.keyCode == Laya.Keyboard.A)
			{
				if (evt.type == Laya.Event.KEY_DOWN)
				{
					this._roleControll.isMove = true;
					this._roleControll.rx = evt.keyCode == Laya.Keyboard.D ? 1 : -1;
				}
				else
				{
					this._roleControll.isMove = false;
					this._roleControll.rx = 0;
				}
			}
			if (evt.keyCode == Laya.Keyboard.W || evt.keyCode == Laya.Keyboard.S)
			{
				if (evt.type == Laya.Event.KEY_DOWN)
				{
					this._roleControll.isMove = true;
					this._roleControll.ry = evt.keyCode == Laya.Keyboard.S ? 1 : -1;
				}
				else
				{
					this._roleControll.isMove = false;
					this._roleControll.ry = 0;
				}
			}
		}
	
	}