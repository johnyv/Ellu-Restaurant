import BaseView from "./BaseView";
import ConstName from "../ConstName";
import CommandChannel from "../controller/CommandChannel";

export default class MainView extends BaseView {
    public menu_btn: Laya.Button;

    /**切换场景箭头 */
    public left_btn: Laya.Button;
    public right_btn: Laya.Sprite;
    public down_btn: Laya.Sprite;
    public up_btn: Laya.Sprite;
    private _channel: CommandChannel;

    public constructor() {
        super();
        this._channel = CommandChannel.instance;
    }
    public createView(view: Object): void {
        super.createView(view);
        this.menu_btn.on(Laya.Event.CLICK, this, this.showMenuView);
        this.left_btn.on(Laya.Event.CLICK, this, this.moveScene, [1, 0]);
        this.right_btn.on(Laya.Event.CLICK, this, this.moveScene, [-1, 0]);
        this.down_btn.on(Laya.Event.CLICK, this, this.moveScene, [0, -1]);
        this.up_btn.on(Laya.Event.CLICK, this, this.moveScene, [0, 1]);
        this.moveSceneComplete();
    }

    private showMenuView(): void {
        CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_SHOW_VIEW_BY_NAME, [ConstName.MENU_VIEW]);
    }

    public moveScene(toX: number, toY: number, evt: Laya.Event): void {
        this.left_btn.mouseEnabled = false;
        this.right_btn.mouseEnabled = false;
        this.up_btn.mouseEnabled = false;
        this.down_btn.mouseEnabled = false;
        let sceneLayer: Laya.Sprite = this._channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER);
        let toDirX: number = sceneLayer.x;
        let toDirY: number = sceneLayer.y;
        /**具体场景数据需要表格配置，先写死 */
        if (toX > 0) {
            if (sceneLayer.x < 2/**左边的场景数量 */ * Laya.stage.width) {
                toDirX = sceneLayer.x + Laya.stage.width;
            }
        } else if (toX < 0) {
            if (sceneLayer.x > -1/**右边的场景数量 */ * Laya.stage.width) {
                toDirX = sceneLayer.x - Laya.stage.width;
            }
        }
        if (toY < 0) {
            if (sceneLayer.y > -1/**下边的场景数量 */ * Laya.stage.height) {
                toDirY = sceneLayer.y - Laya.stage.height;
            }
        } else if (toY > 0) {
            if (sceneLayer.y < 0/**上边的场景数量 */ * Laya.stage.height) {
                toDirY = sceneLayer.y + Laya.stage.height;
            }
        }
        Laya.Tween.to(sceneLayer, { x: toDirX, y: toDirY }, 200,null,Laya.Handler.create(this,this.moveSceneComplete));
    }

    //场景移动完毕后，根据场景id（其实就是坐标）来设置箭头的可见性
    public moveSceneComplete():void{
        let sceneLayer: Laya.Sprite = this._channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER);
        //左右箭头
        if(sceneLayer.y == 0){
            this.left_btn.visible = true;
            this.right_btn.visible = true;
            this.left_btn.mouseEnabled = true;
            this.right_btn.mouseEnabled = true;
            if (sceneLayer.x >= 2/**左边的场景数量 */ * Laya.stage.width) {
                this.left_btn.visible = false;
            }
            if (sceneLayer.x <= -1/**右边的场景数量 */ * Laya.stage.width) {
                this.right_btn.visible = false;
            }
        }else{
            this.left_btn.visible = false;
            this.right_btn.visible = false;
        }
        //上下箭头
        if(sceneLayer.x == 0){
            this.up_btn.visible = true;
            this.down_btn.visible = true;
            this.up_btn.mouseEnabled = true;
            this.down_btn.mouseEnabled = true;
            if (sceneLayer.y <= -1/**下边的场景数量 */ * Laya.stage.height) {
                this.down_btn.visible = false;
            }
            if (sceneLayer.y >= 0/**上边的场景数量 */ * Laya.stage.height) {
                this.up_btn.visible = false;
            }
        }else{
            this.up_btn.visible = false;
            this.down_btn.visible = false;
        }
    }

    public destroy(destroyChild: boolean): void {
        super.destroy(destroyChild)
        this.left_btn.off(Laya.Event.CLICK, this, this.moveScene);
        this.right_btn.off(Laya.Event.CLICK, this, this.moveScene);
        this.down_btn.off(Laya.Event.CLICK, this, this.moveScene);
        this.up_btn.off(Laya.Event.CLICK, this, this.moveScene);
        this.left_btn = null;
        this.right_btn = null;
        this.down_btn = null;
        this.up_btn = null;
    }
}