import Controller from "./Controller";
import CommandChannel from "./CommandChannel";
import GameManager from "../manager/GameManager";
import ConstName from "../ConstName";

export default class GameController extends Controller{
    private  _gameManager:GameManager;
    public  constructor(channel:CommandChannel){
        super(channel);
        this._gameManager = new GameManager(this.channel);
        this.managerList.push(this._gameManager);
        this.addCommand(ConstName.GAME_TEST_COMMANDCHANNEL,this._gameManager,this._gameManager.testCommandChannel);
        this.addCommand(ConstName.GAME_ADD_INSTALLATION,this._gameManager,this._gameManager.addInstallation);
    }
}