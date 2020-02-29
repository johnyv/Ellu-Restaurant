export default class ActionControll {
    //每个角色都有一个唯一的roleId
    private _roleId: Number = 1;
    //是否移动
    public isMove: Boolean;
    //x移动系数
    private _rx: Number = 0;
    //y移动系数
    private _ry: Number = 0;
    public constructor(roleId: Number) {
        this._roleId = roleId;
    }

    public get roleId(): Number {
        return this._roleId;
    }

    public get rx(): Number {
        return this._rx;
    }

    public set rx(value: Number) {
        this._rx = value;
    }

    public get ry(): Number {
        return this._ry;
    }

    public set ry(value: Number) {
        this._ry = value;
    }
}