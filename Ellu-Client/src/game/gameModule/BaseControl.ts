import UIManager from "../manager/UIManager";

	/**
	 * 所有界面控制类的基类，通用操作
	 * 打开界面，初始化界面，销毁等
	 * @author jwd
	 */
	export default class BaseControl 
	{
		protected _uiManager:UIManager;
		public constructor(uiManager:UIManager) 
		{
			this._uiManager = uiManager;
		}
		
		public showView(parentLayer:Laya.Sprite):void {
			
		}
	}