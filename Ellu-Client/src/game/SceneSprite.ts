import Comp_scene_layer from "../component/Comp_scene_layer"

/*anyany
 any ...
 any @author jwd
 any*/
export default class SceneSprite extends Laya.Scene
{
	public  frontLayer:Comp_scene_layer;
	public  roleLayer:Comp_scene_layer;
	public  rearLayer:Comp_scene_layer;
	public buttonLayer:Laya.Box;
	public  frontList:any;
	public  middleList:any;
	public  rearList:any;
	/*anyany以下变量用于场景移动循环，<-- xxxHead（头）<-- xxxEnd(尾) <--  any*/
	public  frontEnd:any;
	public  middleEnd:any;
	public  rearEnd:any;

	public constructor() 
	{
		super();
		this.mouseEnabled = true;
		//默认关闭时候全部销毁
		this.autoDestroyAtClosed = true;
		this.frontList = [];
		this.middleList = [];
		this.rearList = [];
	}

	public createView(view:Object):void {
		super.createView(view);


		// Laya.stage.on(Laya.Event.CLICK,this,this.transformScene,[1,0]);
		// var i:number = 0;
		// while(this["front_"+i]) {
		// 	this.frontList.push(this["front_"+i]);
		// 	this.frontEnd = this["front_"+i];
		// 	i++;
		// }
		// i = 0;
		// while(this["middle_"+i]) {
		// 	this.middleList.push(this["middle_"+i]);
		// 	this.middleEnd = this["middle_"+i];
		// 	i++;
		// }
		// i = 0;
		// while(this["rear_"+i]) {
		// 	this.rearList.push(this["rear_"+i]);
		// 	this.rearEnd = this["rear_"+i];
		// 	i++;
		// }
	}

	public destroy(destroyChild:boolean):void{
		super.destroy(destroyChild);
	}
	
}