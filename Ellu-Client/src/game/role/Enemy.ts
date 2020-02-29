import Role from "./Role";

/**
 * ...
 * @author jwd
 */
export default class Enemy extends Role {
	public constructor(roleName: string, roleId: number) {
		super(roleName, roleId);
	}

	public init(): void {
		super.init();
		this.isRecycle = false;
		this.isDie = false;
		this._roleControll.isMove = true;
		this._roleControll.rx = -1;
		this._hurt = 6;
	}

	public update(): void {
		// if(this._roleControll.isMove) {
		//     // if(!lastTime)lastTime = (new Date()).getTime();
		//     // deltTime = ((new Date()).getTime() - lastTime);
		//     // var posX:number = this._gameAni.x + ((this._roleControll.rx*speed + sceneSpeed) * deltTime)/20 ;
		//     var posX:number = this._gameAni.x + this._roleControll.rx*speed ;
		//     var posY:number = this._gameAni.y + this._roleControll.ry*speed;
		//     var moveBounds:Array = this._gameAni.moveBoundsArr;
		//     this._gameAni.x = posX;
		//     this._gameAni.y = posY;
		// 	if(posX < -50) {
		// 		this.isRecycle = true;
		// 	}
		//     // lastTime = (new Date()).getTime();
		// 	if(this.hasBullet){
		// 		deltTime++;
		// 		if(deltTime ==  bulletConfigVo.deltTime){
		// 			this.deltTime = 0;
		// 			transformPoint.x = localPoint.x;
		// 			transformPoint.y = localPoint.y;
		// 			this._gameAni.localToGlobal(transformPoint);
		// 			this.bulletGroup.addBullet(transformPoint);
		// 		}
		// 	}
		// }
		// this.isMove = this._roleControll.isMove;
	}

	protected set isMove(value: boolean) {
		// if(_isDie||_isHurt) return;
		// if(_isMove != value) {
		//     _isMove = value;
		//     if(value) {
		//         setAnimation("move");
		//     }else {
		//         setAnimation("move");
		//     }
		// }
	}

	public dieComplete(): void {
		super.dieComplete();
		this.isRecycle = true;
	}

	public beHurted(): void {
		this._hurt--;
		if (this._hurt <= 0) {
			this.isDie = true;
			return;
		}
		this.isHurt = true;
	}
}