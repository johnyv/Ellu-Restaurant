export default class GameEvent extends Laya.EventDispatcher {
    //全局事件单例
    private static _ins: GameEvent;
    public constructor() {
        super();
    }

    public static get ins(): GameEvent {
        !GameEvent._ins && (GameEvent._ins = new GameEvent());
        return GameEvent._ins;
    }
} 