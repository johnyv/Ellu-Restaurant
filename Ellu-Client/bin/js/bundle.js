(function () {
	'use strict';

	class SceneSprite extends Laya.Scene {
	    constructor() {
	        super();
	        this.mouseEnabled = true;
	        this.autoDestroyAtClosed = true;
	        this.frontList = [];
	        this.middleList = [];
	        this.rearList = [];
	    }
	    createView(view) {
	        super.createView(view);
	    }
	    destroy(destroyChild) {
	        super.destroy(destroyChild);
	    }
	}

	class BaseView extends Laya.Dialog {
	    constructor() {
	        super();
	    }
	    createView(view) {
	        super.createView(view);
	    }
	    set viewName(value) {
	        this._viewName = value;
	    }
	    showSelf(closeOther, isModel, uiLayer) {
	        this.isModel = isModel;
	        if (isModel) {
	            this.popup(closeOther);
	        }
	        else if (this.parent != uiLayer) {
	            uiLayer.addChild(this);
	        }
	    }
	    removeSelf() {
	        if (this.isModel)
	            Laya.Dialog.manager.maskLayer.removeSelf();
	        return super.removeSelf();
	    }
	    init() {
	    }
	    destroy(destroyChild) {
	        super.destroy(destroyChild);
	    }
	}

	class GameEvent extends Laya.EventDispatcher {
	    constructor() {
	        super();
	    }
	    static get ins() {
	        !GameEvent._ins && (GameEvent._ins = new GameEvent());
	        return GameEvent._ins;
	    }
	}

	class ConstName {
	}
	ConstName.GAME_CONTROLLER = 1001;
	ConstName.GAME_CREATE_HERO = 1002;
	ConstName.GAME_TEST_COMMANDCHANNEL = 1003;
	ConstName.GAME_ADD_INSTALLATION = 1004;
	ConstName.LOAD_CONTROLLER = 2001;
	ConstName.LOAD_ADD_TO_LOAD_LIST = 2002;
	ConstName.LOAD_START_LOAD = 2003;
	ConstName.ROLE_CONTROLLER = 3001;
	ConstName.ROLE_GET_ROLE_BY_ID = 3002;
	ConstName.ROLE_ADD_HERO = 3003;
	ConstName.ROLE_SCENE_SPEED = 3004;
	ConstName.ROLE_GET_HERO_LIST = 3005;
	ConstName.ROLE_GET_ENEMY_LIST = 3006;
	ConstName.ROLE_ADD_ENEMY = 3007;
	ConstName.UI_CONTROLLER = 4001;
	ConstName.UI_SHOW_VIEW_BY_NAME = 4002;
	ConstName.UI_REMOVE_VIEW_BY_NAME = 4003;
	ConstName.UI_DESTROY_VIEW_BY_NAME = 4004;
	ConstName.MAIN_VIEW = "MAIN_VIEW";
	ConstName.MENU_VIEW = "MENU_VIEW";
	ConstName.INSTALLATION_INFO = "INSTALLATION_INFO";
	ConstName.LAYER_CONTROLLER = 6001;
	ConstName.LAYER_CREATE_SCENE = 6002;
	ConstName.LAYER_GET_SCENE_LAYER = 6003;
	ConstName.LAYER_GET_UI_LAYER = 6004;
	ConstName.LAYER_GET_UI_LAYER_BY_NAME = 6005;
	ConstName.LAYER_GET_SCENE_LAYER_BY_NAME = 6006;
	ConstName.BATTLE_CONTROLLER = 7001;
	ConstName.BATTLE_CREATE_BULLET_GROUP = 7002;
	ConstName.ATTACK = "attack";
	ConstName.MOVE = "move";
	ConstName.WORLD_LAYER = "WORLD_LAYER";
	ConstName.UI_LAYER = "UI_LAYER";
	ConstName.MAIN_UI_LAYER = "MAIN_UI_LAYER";
	ConstName.ALERT_UI_LAYER = "ALERT_UI_LAYER";
	ConstName.TIP_UI_LAYER = "TIP_UI_LAYER";
	ConstName.ROLE_LAYER = "ROLE_LAYER";
	ConstName.BULLET_LAYER = "BULLET_LAYER";
	ConstName.EFFECT_LAYER = "EFFECT_LAYER";
	ConstName.FIRST_LOAD_COMPLETE = "first_load_complete";
	ConstName.KEY_DOWN = "key_down";
	ConstName.KEY_UP = "key_up";
	ConstName.SHOW_VIEW = "OPEN_VIEW";
	ConstName.CLOSE_VIEW = "CLOSE_VIEW";

	class BaseVo {
	    constructor() {
	    }
	    init(obj, jsonObj = null) {
	    }
	}

	class ViewConfigVo extends BaseVo {
	    constructor() {
	        super();
	    }
	    init(obj, jsonObj) {
	        var propNo = 0;
	        this.viewName = obj[propNo++];
	        this.resourceUrl = obj[propNo++];
	        this.closeOther = obj[propNo++];
	        this.isModel = obj[propNo++];
	        this.closeAndDestroy = obj[propNo++];
	        this.jsonName = obj[propNo++];
	        jsonObj[this.viewName] = this;
	    }
	}

	class InstallationItemVo extends BaseVo {
	    constructor() {
	        super();
	    }
	    init(obj) {
	        var propNo = 0;
	        this.installationItemName = obj[propNo++];
	        this.id = obj[propNo++];
	        this.descript = obj[propNo++];
	        this.sizeArr = obj[propNo++];
	        this.propertyList = obj[propNo++];
	    }
	}

	class InstallationListItemVo extends BaseVo {
	    constructor() {
	        super();
	    }
	    init(obj) {
	        var propNo = 0;
	        this.installationName = obj[propNo++];
	        this.type = obj[propNo++];
	        this.posArr = obj[propNo++];
	        this.installationItemList = this.decode(obj[propNo++]);
	    }
	    decode(itemList) {
	        let installationItemList = [];
	        for (let len = itemList.length, i = 0; i < len; i++) {
	            let installationItemVo = new InstallationItemVo();
	            installationItemVo.type = this.type;
	            installationItemVo.posArr = this.posArr;
	            installationItemVo.init(itemList[i]);
	            installationItemList.push(installationItemVo);
	        }
	        return installationItemList;
	    }
	}

	class MenuVo extends BaseVo {
	    constructor() {
	        super();
	    }
	    init(jsonObj) {
	        this.menuList = this.decodeList(jsonObj.menuList);
	        this.menuInfo = jsonObj.menuInfo;
	        this.propertype = jsonObj.propertype;
	    }
	    decodeList(itemList) {
	        let InstallationVoList = [];
	        for (let len = itemList.length, i = 0; i < len; i++) {
	            let installationVo = new InstallationListItemVo();
	            installationVo.init(itemList[i]);
	            InstallationVoList.push(installationVo);
	        }
	        return InstallationVoList;
	    }
	}

	class JsonConfig {
	    constructor() {
	        this.jsonToVoHash = {};
	        this.uiVoHash = {};
	        this.regJsonToVo();
	    }
	    static get ins() {
	        !JsonConfig._ins && (JsonConfig._ins = new JsonConfig());
	        return JsonConfig._ins;
	    }
	    regJsonToVo() {
	        this.jsonToVoHash[ConstName.MENU_VIEW] = MenuVo;
	    }
	    initJson() {
	        var configJson = window["configJson"];
	        JsonConfig.viewConfigVoJson = this.createJsonById(configJson["viewConfig"], ViewConfigVo);
	        GameEvent.ins.event(ConstName.FIRST_LOAD_COMPLETE);
	    }
	    setVo(viewName, jsonObj) {
	        let viewVo = new this.jsonToVoHash[viewName]();
	        viewVo.init(jsonObj);
	        this.uiVoHash[viewName] = viewVo;
	    }
	    getVo(viewName) {
	        return this.uiVoHash[viewName];
	    }
	    createJsonById(jsonObjArray, clzVo) {
	        var obj = new Object();
	        for (var jsonObjStr in jsonObjArray) {
	            (new clzVo()).init(jsonObjArray[jsonObjStr], obj);
	        }
	        return obj;
	    }
	}

	class Controller {
	    constructor(channel) {
	        this.commandList = new Object();
	        this.managerList = [];
	        this.channel = channel;
	    }
	    init() {
	        for (var baseManagerName in this.managerList) {
	            this.managerList[baseManagerName].init();
	        }
	    }
	    addCommand(commandName, caller, func) {
	        if (!this.commandList.hasOwnProperty(commandName)) {
	            this.commandList[commandName] = [caller, func];
	        }
	    }
	    executeCommand(commandName, params) {
	        return this.commandList[commandName] != null ? this.commandList[commandName][1].call(this.commandList[commandName][0], params) : null;
	    }
	}

	class BaseManager {
	    constructor(channel = null) {
	        this.channel = channel;
	    }
	    init() {
	    }
	    destroy() {
	    }
	}

	class InputManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	    }
	    setInputStyle() {
	    }
	    heroControll(evt) {
	        if (evt.keyCode == Laya.Keyboard.D || evt.keyCode == Laya.Keyboard.A) {
	            if (evt.type == Laya.Event.KEY_DOWN) {
	                this._roleControll.isMove = true;
	                this._roleControll.rx = evt.keyCode == Laya.Keyboard.D ? 1 : -1;
	            }
	            else {
	                this._roleControll.isMove = false;
	                this._roleControll.rx = 0;
	            }
	        }
	        if (evt.keyCode == Laya.Keyboard.W || evt.keyCode == Laya.Keyboard.S) {
	            if (evt.type == Laya.Event.KEY_DOWN) {
	                this._roleControll.isMove = true;
	                this._roleControll.ry = evt.keyCode == Laya.Keyboard.S ? 1 : -1;
	            }
	            else {
	                this._roleControll.isMove = false;
	                this._roleControll.ry = 0;
	            }
	        }
	    }
	}

	class HitManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	    }
	    init() {
	    }
	    update() {
	    }
	}

	class GameGlobal {
	}
	GameGlobal.GAME_FRATE = 30;
	GameGlobal.ROLE = 0;
	GameGlobal.MUSIC = 1;
	GameGlobal.SOUND = 2;
	GameGlobal.BULLET = 3;
	GameGlobal.UI = 4;
	GameGlobal.SCENE = 5;
	GameGlobal.FABAO = 6;
	GameGlobal.JSON = 7;
	GameGlobal.RESOURCE_BASE_PATH = "./resource/";
	GameGlobal.RESOURCE_ROLE_PATH = "./resource/role/";
	GameGlobal.RESOURCE_SOUND_PATH = "./resource/sound/";
	GameGlobal.RESOURCE_UI_PATH = "./resource/ui/";
	GameGlobal.RESOURCE_SCENE_PATH = "./resource/scene/";
	GameGlobal.RESOURCE_JSON_PATH = "./resource/json/";

	class LoadManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	    }
	    static getUrl(url, type = -1) {
	        if (type == GameGlobal.ROLE)
	            return GameGlobal.RESOURCE_ROLE_PATH + url;
	        else if (type == GameGlobal.SOUND) {
	            if (Laya.Browser.onAndroid || Laya.Browser.onIOS) {
	                return GameGlobal.RESOURCE_SOUND_PATH + url + ".wav";
	            }
	            else {
	                return GameGlobal.RESOURCE_SOUND_PATH + url + ".mp3";
	            }
	        }
	        else if (type == GameGlobal.UI)
	            return GameGlobal.RESOURCE_UI_PATH + url;
	        else if (type == GameGlobal.SCENE)
	            return GameGlobal.RESOURCE_SCENE_PATH + url;
	        else if (type == GameGlobal.JSON)
	            return GameGlobal.RESOURCE_JSON_PATH + url;
	        return GameGlobal.RESOURCE_BASE_PATH + url;
	    }
	    static getIconUrl(type, id) {
	        return "views/icon/" + type + "_" + id + ".png";
	    }
	    static getRes(url, type = -1) {
	        var resUrl = LoadManager.getUrl(url, type);
	        return Laya.loader.getRes(resUrl);
	    }
	}

	class GameManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this.roleId = 2;
	        this.enemyNameArr = ["m_1", "m_2", "m_3", "m_4"];
	        this._inputManager = new InputManager(channel);
	        this._hitManager = new HitManager(channel);
	    }
	    init() {
	        GameEvent.ins.on(ConstName.FIRST_LOAD_COMPLETE, this, this.initGame);
	    }
	    initGame() {
	        for (let i = 0; i < 10; i++) {
	            this.createEnemy();
	        }
	        this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_CREATE_SCENE, ['s_1']);
	        this.channel.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_SHOW_VIEW_BY_NAME, [ConstName.MAIN_VIEW]);
	    }
	    createEnemy() {
	        var random = Math.random() * 100;
	        if (random > 20) {
	            this.roleId++;
	            var randomName = this.enemyNameArr[parseInt(Math.random() * this.enemyNameArr.length + "")];
	            this.channel.postCommand(ConstName.ROLE_CONTROLLER, ConstName.ROLE_ADD_ENEMY, [randomName, this.roleId, new Laya.Point(-560 + Math.random() * 2240, Math.random() * (Laya.stage.height - 100))]);
	        }
	    }
	    testCommandChannel() {
	        alert("命令管线调试成功，可以开工了");
	    }
	    addInstallation(data) {
	        let roleLayer = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME, ConstName.ROLE_LAYER);
	        let installationImage = new Laya.Image();
	        installationImage.skin = LoadManager.getIconUrl(data.type, data.id);
	        installationImage.pos(data.posArr[0], data.posArr[1]);
	        installationImage.width = data.sizeArr[0];
	        installationImage.height = data.sizeArr[1];
	        roleLayer.addChild(installationImage);
	        this.channel.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_REMOVE_VIEW_BY_NAME, ConstName.INSTALLATION_INFO);
	        this.channel.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_REMOVE_VIEW_BY_NAME, ConstName.MENU_VIEW);
	    }
	}

	class GameController extends Controller {
	    constructor(channel) {
	        super(channel);
	        this._gameManager = new GameManager(this.channel);
	        this.managerList.push(this._gameManager);
	        this.addCommand(ConstName.GAME_TEST_COMMANDCHANNEL, this._gameManager, this._gameManager.testCommandChannel);
	        this.addCommand(ConstName.GAME_ADD_INSTALLATION, this._gameManager, this._gameManager.addInstallation);
	    }
	}

	class UIManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this._viewInsHash = new Object();
	        GameEvent.ins.on(ConstName.SHOW_VIEW, this, this.showView);
	    }
	    init() {
	    }
	    getView(viewName, viewData) {
	        let view = this._viewInsHash[viewName] || this.createView(viewName, viewData);
	        return view;
	    }
	    createView(viewName, viewData) {
	        let viewVo = JsonConfig.viewConfigVoJson[viewName];
	        Laya.Scene.open("views/" + viewVo.resourceUrl, true, Laya.Handler.create(this, this.loadViewJson, [viewName, viewData]));
	    }
	    loadViewJson(viewName, viewData, view) {
	        if (view) {
	            view.viewData = viewData;
	            let viewVo = JsonConfig.viewConfigVoJson[viewName];
	            if (viewVo.jsonName)
	                Laya.loader.load(LoadManager.getUrl(viewVo.jsonName, GameGlobal.JSON), new Laya.Handler(this, this.addView, [viewName, view]));
	            else
	                this.addView(viewName, view);
	        }
	    }
	    addView(viewName, view) {
	        if (view) {
	            this._viewInsHash[viewName] = view;
	            view.viewName = viewName;
	            let viewVo = JsonConfig.viewConfigVoJson[viewName];
	            if (viewVo.jsonName)
	                JsonConfig.ins.setVo(viewName, LoadManager.getRes(viewVo.jsonName, GameGlobal.JSON));
	            var uiLayer = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_UI_LAYER_BY_NAME, ConstName.MAIN_UI_LAYER);
	            view.showSelf(viewVo.closeOther, viewVo.isModel, uiLayer);
	            view.init();
	        }
	    }
	    showView(params) {
	        var viewName = params[0];
	        let viewData = params[1];
	        var view = this.getView(viewName, viewData);
	        if (view) {
	            view.viewData = viewData;
	            let viewVo = JsonConfig.viewConfigVoJson[viewName];
	            var uiLayer = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_UI_LAYER_BY_NAME, ConstName.MAIN_UI_LAYER);
	            view.showSelf(viewVo.closeOther, viewVo.isModel, uiLayer);
	            view.init();
	        }
	    }
	    removeViewByName(viewName) {
	        let view = this._viewInsHash[viewName];
	        if (view) {
	            view.removeSelf();
	        }
	    }
	    destroyViewByName(viewName) {
	        delete this._viewInsHash[viewName];
	    }
	    destroy() {
	        for (var controlName in this._viewInsHash) {
	            let view = this._viewInsHash[controlName];
	            view.destroy(true);
	            delete this._viewInsHash[controlName];
	        }
	        this._viewInsHash = null;
	    }
	}

	class UIController extends Controller {
	    constructor(channel) {
	        super(channel);
	        this._uiManager = new UIManager(channel);
	        this.managerList.push(this._uiManager);
	        this.addCommand(ConstName.UI_SHOW_VIEW_BY_NAME, this._uiManager, this._uiManager.showView);
	        this.addCommand(ConstName.UI_REMOVE_VIEW_BY_NAME, this._uiManager, this._uiManager.removeViewByName);
	        this.addCommand(ConstName.UI_DESTROY_VIEW_BY_NAME, this._uiManager, this._uiManager.destroyViewByName);
	    }
	}

	class LoadController extends Controller {
	    constructor(channel) {
	        super(channel);
	        this._firstLoadList = [];
	        this.addCommand(ConstName.LOAD_ADD_TO_LOAD_LIST, this, this.addToLoadList);
	        this.addCommand(ConstName.LOAD_START_LOAD, this, this.startLoad);
	        this.startLoad();
	    }
	    startLoad() {
	        this._firstLoadList.push({ url: LoadManager.getUrl("configJson.json", GameGlobal.JSON), type: Laya.Loader.JSON });
	        Laya.loader.load(this._firstLoadList, new Laya.Handler(this, this.loadComplete));
	    }
	    addToLoadList(data) {
	        if (data.length > 0) {
	            for (var dataStr in data) {
	                this._firstLoadList.push(data[dataStr]);
	            }
	        }
	        else
	            this._firstLoadList.push(data);
	    }
	    loadComplete() {
	        window["configJson"] = LoadManager.getRes("configJson.json", GameGlobal.JSON);
	        JsonConfig.ins.initJson();
	    }
	}

	class SceneLayerManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this.rearSpeed = 0;
	        this.middleSpeed = 0;
	        this.frontSpeed = 0;
	        this.sceneLayer = new Laya.Sprite();
	        this.frontLayer = new Laya.Sprite();
	        this.middleLayer = new Laya.Sprite();
	        this.rearLayer = new Laya.Sprite();
	        this.roleLayer = new Laya.Sprite();
	        this.bulletLayer = new Laya.Sprite();
	        this.effectLayer = new Laya.Sprite();
	        Laya.stage.addChild(this.sceneLayer);
	    }
	    getWorldLayer() {
	        return this.sceneLayer;
	    }
	    setFrontLayerIndex(index) {
	        this.sceneLayer.addChild(this.frontLayer);
	        this.frontLayer.zOrder = index;
	    }
	    setMiddleLayerIndex(index) {
	        this.sceneLayer.addChild(this.middleLayer);
	        this.middleLayer.zOrder = index;
	    }
	    setRearLayerIndex(index) {
	        this.sceneLayer.addChild(this.rearLayer);
	        this.rearLayer.zOrder = index;
	    }
	    setRoleLayerIndex(index) {
	        this.sceneLayer.addChild(this.roleLayer);
	        this.roleLayer.zOrder = index;
	    }
	    setBulletLayerIndex(index) {
	        this.sceneLayer.addChild(this.bulletLayer);
	        this.bulletLayer.zOrder = index;
	    }
	    setEffectLayerIndex(index) {
	        this.sceneLayer.addChild(this.effectLayer);
	        this.effectLayer.zOrder = index;
	    }
	    createScene(sceneId) {
	        Laya.Scene.open("scene/" + sceneId + ".scene", true, Laya.Handler.create(this, this.addScene));
	    }
	    addScene(scene) {
	        this.sceneSprite = scene;
	        if (this.sceneSprite.rearLayer != null) {
	            this.rearLayer.addChild(scene.rearLayer);
	            this.rearSpeed = this.sceneSprite.rearLayer.speed;
	        }
	        if (this.sceneSprite.roleLayer != null) {
	            this.middleSpeed = this.sceneSprite.roleLayer.speed;
	            this.middleLayer.addChild(scene.roleLayer);
	        }
	        if (this.sceneSprite.frontLayer != null) {
	            this.frontLayer.addChild(scene.frontLayer);
	            this.frontSpeed = this.sceneSprite.frontLayer.speed;
	        }
	        Laya.SoundManager.playMusic("resource/sound/bg_music.mp3");
	    }
	    update() {
	        if (this.sceneSprite) {
	            var layerSpriteName;
	            var layerSprite;
	            if (this.middleSpeed) {
	                for (layerSpriteName in this.sceneSprite.middleList) {
	                    layerSprite = this.sceneSprite.middleList[layerSpriteName];
	                    layerSprite.x -= this.sceneSprite.roleLayer.speed;
	                    if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
	                        layerSprite.x = this.sceneSprite.middleEnd.x + Math.abs(this.sceneSprite.middleEnd.displayWidth) - this.sceneSprite.roleLayer.speed;
	                        this.sceneSprite.middleEnd = layerSprite;
	                    }
	                }
	            }
	            if (this.frontSpeed) {
	                for (layerSpriteName in this.sceneSprite.frontList) {
	                    layerSprite = this.sceneSprite.frontList[layerSpriteName];
	                    layerSprite.x -= this.sceneSprite.frontLayer.speed;
	                    if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
	                        layerSprite.x = this.sceneSprite.frontEnd.x + Math.abs(this.sceneSprite.frontEnd.displayWidth) - this.sceneSprite.frontLayer.speed;
	                        this.sceneSprite.frontEnd = layerSprite;
	                    }
	                }
	            }
	            if (this.rearSpeed) {
	                for (layerSpriteName in this.sceneSprite.rearList) {
	                    layerSprite = this.sceneSprite.rearList[layerSpriteName];
	                    layerSprite.x -= this.sceneSprite.rearLayer.speed;
	                    if (layerSprite.x < -Math.abs(layerSprite.displayWidth)) {
	                        layerSprite.x = this.sceneSprite.rearEnd.x + Math.abs(this.sceneSprite.rearEnd.displayWidth) - this.sceneSprite.rearLayer.speed;
	                        this.sceneSprite.rearEnd = layerSprite;
	                    }
	                }
	            }
	        }
	    }
	    clear() {
	        this.frontLayer.removeChildren();
	        this.middleLayer.removeChildren();
	        this.rearLayer.removeChildren();
	    }
	    destroy() {
	        this.frontLayer.destroy(true);
	        this.frontLayer = null;
	        this.middleLayer.destroy(true);
	        this.middleLayer = null;
	        this.rearLayer.destroy(true);
	        this.rearLayer = null;
	    }
	}

	class UILayerManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this.uiLayer = new Laya.Sprite();
	        this.mainUILayer = new Laya.Sprite();
	        this.alertUILayer = new Laya.Sprite();
	        this.tipUILayer = new Laya.Sprite();
	        Laya.stage.addChild(this.uiLayer);
	    }
	    setMainUILayerIndex(index) {
	        this.uiLayer.addChild(this.mainUILayer);
	        this.mainUILayer.zOrder = index;
	    }
	    setAlertUILayerIndex(index) {
	        this.uiLayer.addChild(this.alertUILayer);
	        this.alertUILayer.zOrder = index;
	    }
	    setTipUILayerIndex(index) {
	        this.uiLayer.addChild(this.tipUILayer);
	        this.tipUILayer.zOrder = index;
	    }
	}

	class LayerManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this._sceneManager = new SceneLayerManager(channel);
	        this._uiLayerManager = new UILayerManager(channel);
	    }
	    init() {
	        this._sceneManager.setRearLayerIndex(0);
	        this._sceneManager.setMiddleLayerIndex(1);
	        this._sceneManager.setRoleLayerIndex(2);
	        this._sceneManager.setBulletLayerIndex(3);
	        this._sceneManager.setEffectLayerIndex(4);
	        this._sceneManager.setFrontLayerIndex(7);
	        this._uiLayerManager.setMainUILayerIndex(8);
	        this._uiLayerManager.setAlertUILayerIndex(9);
	        this._uiLayerManager.setTipUILayerIndex(10);
	    }
	    getUILayer() {
	        return this._uiLayerManager.uiLayer;
	    }
	    getSceneLayer() {
	        return this._sceneManager.sceneLayer;
	    }
	    getSceneLayerByName(roleLayerType) {
	        switch (roleLayerType) {
	            case ConstName.ROLE_LAYER:
	                return this._sceneManager.roleLayer;
	                break;
	            case ConstName.BULLET_LAYER:
	                return this._sceneManager.bulletLayer;
	                break;
	            case ConstName.EFFECT_LAYER:
	                return this._sceneManager.effectLayer;
	                break;
	        }
	        return new Laya.Sprite();
	    }
	    getUILayerByName(uiLayerType) {
	        switch (uiLayerType) {
	            case ConstName.MAIN_UI_LAYER:
	                return this._uiLayerManager.mainUILayer;
	                break;
	            case ConstName.ALERT_UI_LAYER:
	                return this._uiLayerManager.alertUILayer;
	                break;
	            case ConstName.TIP_UI_LAYER:
	                return this._uiLayerManager.tipUILayer;
	                break;
	        }
	        return new Laya.Sprite();
	    }
	    createScene(params) {
	        var sceneId = params[0];
	        this._sceneManager.createScene(sceneId);
	    }
	}

	class LayerController extends Controller {
	    constructor(channel) {
	        super(channel);
	        this._layerManager = new LayerManager(channel);
	        this.managerList.push(this._layerManager);
	        this.addCommand(ConstName.LAYER_CREATE_SCENE, this._layerManager, this._layerManager.createScene);
	        this.addCommand(ConstName.LAYER_GET_SCENE_LAYER, this._layerManager, this._layerManager.getSceneLayer);
	        this.addCommand(ConstName.LAYER_GET_SCENE_LAYER_BY_NAME, this._layerManager, this._layerManager.getSceneLayerByName);
	        this.addCommand(ConstName.LAYER_GET_UI_LAYER, this._layerManager, this._layerManager.getUILayer);
	        this.addCommand(ConstName.LAYER_GET_UI_LAYER_BY_NAME, this._layerManager, this._layerManager.getUILayerByName);
	    }
	}

	class BaseAnimation extends Laya.Animation {
	    constructor() {
	        super();
	    }
	    aniUrls(aniName, length) {
	        var urls = [];
	        for (var i = 0; i < length; i++) {
	            urls.push(this._prefix + aniName + "_" + i + ".png");
	        }
	        return urls;
	    }
	}

	class GameAnimation extends BaseAnimation {
	    constructor() {
	        super(...arguments);
	        this._actionNameList = [];
	        this._actionFrame = new Object();
	        this._isLoaded = false;
	        this.moveBoundsArr = [0, 0, 0, 0];
	    }
	    loadAtlas(url, loaded = null, cacheName = "") {
	        this._loadUrl = LoadManager.getUrl(url, GameGlobal.ROLE);
	        return super.loadAtlas(this._loadUrl, Laya.Handler.create(this, this.onLoaded));
	    }
	    startLoad() {
	        Laya.loader.load(this._loadUrl, Laya.Handler.create(this, this.onLoaded));
	    }
	    onLoaded() {
	        this._isLoaded = true;
	        var _e = Laya.loader.getRes(this._loadUrl);
	        this._prefix = _e.meta.prefix;
	        var frames = _e.frames;
	        for (var fullName in frames) {
	            var actionName = fullName.split("_")[0];
	            if (this._actionNameList.indexOf(actionName) < 0) {
	                this._actionNameList.push(actionName);
	                this._actionFrame[actionName] = 1;
	            }
	            else
	                this._actionFrame[actionName]++;
	        }
	        this.playAction("move");
	    }
	    hasAction(actionName) {
	        return this._actionNameList.indexOf(actionName) > -1;
	    }
	    playAction(actionName, start = 0, loop = true, name = GameAnimation.MODUL) {
	        if (!this._isLoaded || this._actionNameList.indexOf(actionName) == -1)
	            return;
	        if (this._currentActionName == actionName)
	            return;
	        this._currentActionName = actionName;
	        Laya.Animation.createFrames(this.aniUrls(actionName, this._actionFrame[actionName]), GameAnimation.MODUL);
	        this.play(start, loop, actionName);
	        if (!this.graphics._one) {
	            debugger;
	        }
	        this.pivot(this.graphics._one.width / 2, 0);
	        var moveBoundsRect = this.getGraphicBounds();
	        this.moveBoundsArr[1] = Laya.stage.height - moveBoundsRect.height;
	        this.moveBoundsArr[3] = Laya.stage.width - moveBoundsRect.width / 2;
	    }
	    recycle() {
	    }
	}
	GameAnimation.MODUL = "modul";

	class ActionControll {
	    constructor(roleId) {
	        this._roleId = 1;
	        this._rx = 0;
	        this._ry = 0;
	        this._roleId = roleId;
	    }
	    get roleId() {
	        return this._roleId;
	    }
	    get rx() {
	        return this._rx;
	    }
	    set rx(value) {
	        this._rx = value;
	    }
	    get ry() {
	        return this._ry;
	    }
	    set ry(value) {
	        this._ry = value;
	    }
	}

	class Role {
	    constructor(roleName, roleId) {
	        this.speed = 8;
	        this.sceneSpeed = 0;
	        this._roleId = -1;
	        this.transformPoint = new Laya.Point();
	        this.localPoint = new Laya.Point();
	        this.hasBullet = false;
	        this._hurt = 6;
	        this._isMove = false;
	        this.deltTime = 0;
	        this.lastTime = 0;
	        this._roleName = roleName;
	        this._roleId = roleId;
	        this._gameAni = new GameAnimation();
	        this._roleControll = new ActionControll(roleId);
	    }
	    init() {
	        this._gameAni.play();
	    }
	    addStage(pos) {
	    }
	    setSkin(skin) {
	        this._gameAni.loadAtlas(skin);
	    }
	    setAnimation(actionName) {
	        this._gameAni.playAction(actionName);
	    }
	    setBulletSkin() {
	    }
	    get roleId() {
	        return this._roleId;
	    }
	    get roleName() {
	        return this._roleName;
	    }
	    get gameAni() {
	        return this._gameAni;
	    }
	    get roleControll() {
	        return this._roleControll;
	    }
	    get bulletGroup() {
	        return this._bulletGroup;
	    }
	    set bulletGroup(value) {
	        this._bulletGroup = value;
	    }
	    get isDie() {
	        return this._isDie;
	    }
	    set isDie(value) {
	        if (this._isDie == value)
	            return;
	        if (value) {
	            this.setAnimation("die");
	        }
	    }
	    set isHurt(value) {
	        if (this._isHurt == value)
	            return;
	        if (value) {
	            if (this._gameAni.hasAction("hurt")) {
	                this.setAnimation("hurt");
	            }
	            Laya.SoundManager.playSound(LoadManager.getUrl("beHited_snd", GameGlobal.SOUND));
	        }
	    }
	    hurtComplete() {
	        this._isHurt = false;
	        this._gameAni.playAction("move");
	    }
	    dieComplete() {
	    }
	    set isRecycle(value) {
	        this._isRecycle = value;
	    }
	    get isRecycle() {
	        return this._isRecycle;
	    }
	    update() {
	    }
	    recycle() {
	        this._gameAni.recycle();
	    }
	    beHurted() {
	    }
	}

	class Hero extends Role {
	    constructor(roleName, roleId) {
	        super(roleName, roleId);
	        this._faBaoArr = [];
	        this._posArr = [];
	    }
	    addStage(pos) {
	        var channel = CommandChannel.instance;
	        this.gameAni.x = Math.ceil(pos.x);
	        this.gameAni.y = Math.ceil(pos.y);
	        var roleLayer = channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME, ConstName.ROLE_LAYER);
	        roleLayer.addChild(this.gameAni);
	    }
	    update() {
	    }
	    set isMove(value) {
	    }
	}

	class Enemy extends Role {
	    constructor(roleName, roleId) {
	        super(roleName, roleId);
	    }
	    init() {
	        super.init();
	        this.isRecycle = false;
	        this.isDie = false;
	        this._roleControll.isMove = true;
	        this._roleControll.rx = -1;
	        this._hurt = 6;
	    }
	    update() {
	    }
	    set isMove(value) {
	    }
	    dieComplete() {
	        super.dieComplete();
	        this.isRecycle = true;
	    }
	    beHurted() {
	        this._hurt--;
	        if (this._hurt <= 0) {
	            this.isDie = true;
	            return;
	        }
	        this.isHurt = true;
	    }
	}

	class RoleManager extends BaseManager {
	    constructor(channel) {
	        super(channel);
	        this._heroList = new Array();
	        this._enemyList = new Array();
	        this._roleControllHash = new Object();
	        this._roleCacheList = new Array();
	        this.recycleList = new Array();
	    }
	    init() {
	        Laya.timer.loop(30, this, this.update);
	    }
	    getHero(params) {
	        var roleName = params[0];
	        var roleId = params[1];
	        let hero;
	        for (let heroID in this._heroList) {
	            hero = this._heroList[heroID];
	            if (hero.roleId == roleId)
	                return hero;
	        }
	        hero = new Hero(roleName, roleId);
	        hero.setSkin("female.atlas");
	        hero.setAnimation("move");
	        this._heroList.push(hero);
	        return hero;
	    }
	    getHeroList() {
	        return this._heroList;
	    }
	    addHero(params) {
	        var roleName = params[0];
	        var roleId = params[1];
	        var pos = params[2];
	        var hero = this.getHero([roleName, roleId]);
	        if (hero) {
	            hero.setSkin(roleName + ".atlas");
	            hero.setAnimation("move");
	            hero.addStage(pos);
	        }
	    }
	    getEnemy(params) {
	        var roleName = params[0];
	        var roleId = params[1];
	        let enemy;
	        for (let i = 0, len = this._roleCacheList.length; i < len; i--) {
	            enemy = this._roleCacheList[i];
	            console.log("从回收池中创建敌人");
	            this._roleCacheList.splice(i, 1);
	            return enemy;
	        }
	        enemy = new Enemy(roleName, roleId);
	        enemy.setSkin("monster/" + roleName + ".atlas");
	        return enemy;
	    }
	    addEnemy(params) {
	        if (this._enemyList.length > 8)
	            return;
	        var roleName = params[0];
	        var roleId = params[1];
	        var pos = params[2];
	        var enemy = this.getEnemy([roleName, roleId]);
	        if (enemy) {
	            enemy.init();
	            enemy.setAnimation("move");
	            enemy.gameAni.x = Math.ceil(pos.x);
	            enemy.gameAni.y = Math.ceil(pos.y);
	            var roleLayer = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME, ConstName.ROLE_LAYER);
	            roleLayer.addChild(enemy.gameAni);
	            var effectLayer = this.channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER_BY_NAME, ConstName.EFFECT_LAYER);
	            effectLayer.addChild(enemy.bulletGroup);
	            this._enemyList.push(enemy);
	        }
	    }
	    getEnemyList() {
	        return this._enemyList;
	    }
	    setSceneSpeed(params) {
	    }
	    update() {
	    }
	    recycleBulletFunc(enemy) {
	    }
	}

	class RoleController extends Controller {
	    constructor(channel) {
	        super(channel);
	        this._roleManager = new RoleManager(this.channel);
	        this.managerList.push(this._roleManager);
	        this.addCommand(ConstName.ROLE_GET_ROLE_BY_ID, this._roleManager, this._roleManager.getHero);
	        this.addCommand(ConstName.ROLE_ADD_HERO, this._roleManager, this._roleManager.addHero);
	        this.addCommand(ConstName.ROLE_ADD_ENEMY, this._roleManager, this._roleManager.addEnemy);
	        this.addCommand(ConstName.ROLE_SCENE_SPEED, this._roleManager, this._roleManager.setSceneSpeed);
	        this.addCommand(ConstName.ROLE_GET_HERO_LIST, this._roleManager, this._roleManager.getHeroList);
	        this.addCommand(ConstName.ROLE_GET_ENEMY_LIST, this._roleManager, this._roleManager.getEnemyList);
	    }
	}

	class BattleController extends Controller {
	    constructor(channel) {
	        super(channel);
	    }
	}

	class DataProxy {
	    constructor(channel) {
	        this.funcListObj = new Object();
	        this.channel = channel;
	    }
	    init() {
	    }
	    addDataFunc(dataName, func, thisObj) {
	        if (!this.funcListObj.hasOwnProperty(dataName)) {
	            this.funcListObj[dataName] = [];
	        }
	        this.funcListObj[dataName].push(new Array(func, thisObj));
	    }
	    executeCommand(commandName, params) {
	        var funcArr = this.funcListObj[commandName];
	        for (var funcName in funcArr) {
	            var funcListArr = funcArr[funcName];
	            for (var i = 0; i < funcListArr.length; i++) {
	                var func = funcListArr[0];
	                var thisObj = funcListArr[1];
	                func && func.call(thisObj, params);
	            }
	        }
	    }
	}

	class InstallationProxy extends DataProxy {
	    constructor(channel) {
	        super(channel);
	    }
	}

	class CommandChannel {
	    constructor() {
	        this._controllerList = new Object();
	        this._dataProxyList = new Object();
	        this.registerController(ConstName.GAME_CONTROLLER, new GameController(this));
	        this.registerController(ConstName.UI_CONTROLLER, new UIController(this));
	        this.registerController(ConstName.LOAD_CONTROLLER, new LoadController(this));
	        this.registerController(ConstName.LAYER_CONTROLLER, new LayerController(this));
	        this.registerController(ConstName.ROLE_CONTROLLER, new RoleController(this));
	        this.registerController(ConstName.BATTLE_CONTROLLER, new BattleController(this));
	        this.registerDataProxy(ConstName.PROXY_INSTALLATION, new InstallationProxy(this));
	        this.init();
	    }
	    init() {
	        for (var controllerName in this._controllerList) {
	            this._controllerList[controllerName].init();
	        }
	        for (var dataProxyName in this._dataProxyList) {
	            this._dataProxyList[dataProxyName].init();
	        }
	    }
	    static get instance() {
	        !CommandChannel._instance && (CommandChannel._instance = new CommandChannel());
	        return CommandChannel._instance;
	    }
	    registerController(controllerName, controller) {
	        if (!this._controllerList.hasOwnProperty(controllerName)) {
	            this._controllerList[controllerName] = controller;
	        }
	    }
	    getController(controllerName) {
	        if (this._controllerList[controllerName]) {
	            return this._controllerList[controllerName];
	        }
	        return null;
	    }
	    postCommand(controllerName, commandName, params = null) {
	        var getController = this.getController(controllerName);
	        return getController != null ? getController.executeCommand(commandName, params) : null;
	    }
	    registerDataProxy(dataProxyName, dataProxy) {
	        if (!this._dataProxyList.hasOwnProperty(dataProxyName)) {
	            this._dataProxyList[dataProxyName] = dataProxy;
	        }
	    }
	    addFuncToDataProxy(dataProxyName, dataName, func, thisObj) {
	        var dataProxy = this.getDataProxy(dataProxyName);
	        dataProxy && dataProxy.addDataFunc(dataName, func, thisObj);
	    }
	    getDataProxy(dataProxyName) {
	        if (this._dataProxyList[dataProxyName]) {
	            return this._dataProxyList[dataProxyName];
	        }
	        return null;
	    }
	    broadCastData(dataProxyName, dataName, params = null) {
	        var dataProxy = this.getDataProxy(dataProxyName);
	        return dataProxy != null ? dataProxy.executeCommand(dataName, params) : null;
	    }
	}

	class InstallationInfo extends BaseView {
	    createView(viewObj) {
	        super.createView(viewObj);
	        this.use_btn.on(Laya.Event.CLICK, this, this.use);
	    }
	    use() {
	        if (this.viewData) {
	            CommandChannel.instance.postCommand(ConstName.GAME_CONTROLLER, ConstName.GAME_ADD_INSTALLATION, this.viewData);
	        }
	    }
	    showSelf(closeOther, isModel, uiLayer) {
	        super.showSelf(closeOther, isModel, uiLayer);
	        let viewData = this.viewData;
	        if (viewData) {
	            this.icon.skin = LoadManager.getIconUrl(viewData.type, viewData.id);
	            this.title_txt.text = viewData.installationItemName;
	            this.des_txt.text = viewData.descript;
	            let menuVo = JsonConfig.ins.getVo(ConstName.MENU_VIEW);
	            let propertyList = viewData.propertyList;
	            for (let i = 1, len = propertyList.length; i <= len; i++) {
	                var propertyArr = propertyList[i - 1].split("_");
	                this["item_txt_" + i].text = menuVo.propertype[propertyArr[0]] + "   +" + propertyArr[1];
	            }
	        }
	    }
	    close() {
	        super.close();
	        Laya.Dialog.manager.maskLayer.removeSelf();
	    }
	}

	class MainView extends BaseView {
	    constructor() {
	        super();
	        this._channel = CommandChannel.instance;
	    }
	    createView(view) {
	        super.createView(view);
	        this.menu_btn.on(Laya.Event.CLICK, this, this.showMenuView);
	        this.left_btn.on(Laya.Event.CLICK, this, this.moveScene, [1, 0]);
	        this.right_btn.on(Laya.Event.CLICK, this, this.moveScene, [-1, 0]);
	        this.down_btn.on(Laya.Event.CLICK, this, this.moveScene, [0, -1]);
	        this.up_btn.on(Laya.Event.CLICK, this, this.moveScene, [0, 1]);
	        this.moveSceneComplete();
	    }
	    showMenuView() {
	        CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_SHOW_VIEW_BY_NAME, [ConstName.MENU_VIEW]);
	    }
	    moveScene(toX, toY, evt) {
	        this.left_btn.mouseEnabled = false;
	        this.right_btn.mouseEnabled = false;
	        this.up_btn.mouseEnabled = false;
	        this.down_btn.mouseEnabled = false;
	        let sceneLayer = this._channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER);
	        let toDirX = sceneLayer.x;
	        let toDirY = sceneLayer.y;
	        if (toX > 0) {
	            if (sceneLayer.x < 2 * Laya.stage.width) {
	                toDirX = sceneLayer.x + Laya.stage.width;
	            }
	        }
	        else if (toX < 0) {
	            if (sceneLayer.x > -1 * Laya.stage.width) {
	                toDirX = sceneLayer.x - Laya.stage.width;
	            }
	        }
	        if (toY < 0) {
	            if (sceneLayer.y > -1 * Laya.stage.height) {
	                toDirY = sceneLayer.y - Laya.stage.height;
	            }
	        }
	        else if (toY > 0) {
	            if (sceneLayer.y < 0 * Laya.stage.height) {
	                toDirY = sceneLayer.y + Laya.stage.height;
	            }
	        }
	        Laya.Tween.to(sceneLayer, { x: toDirX, y: toDirY }, 200, null, Laya.Handler.create(this, this.moveSceneComplete));
	    }
	    moveSceneComplete() {
	        let sceneLayer = this._channel.postCommand(ConstName.LAYER_CONTROLLER, ConstName.LAYER_GET_SCENE_LAYER);
	        if (sceneLayer.y == 0) {
	            this.left_btn.visible = true;
	            this.right_btn.visible = true;
	            this.left_btn.mouseEnabled = true;
	            this.right_btn.mouseEnabled = true;
	            if (sceneLayer.x >= 2 * Laya.stage.width) {
	                this.left_btn.visible = false;
	            }
	            if (sceneLayer.x <= -1 * Laya.stage.width) {
	                this.right_btn.visible = false;
	            }
	        }
	        else {
	            this.left_btn.visible = false;
	            this.right_btn.visible = false;
	        }
	        if (sceneLayer.x == 0) {
	            this.up_btn.visible = true;
	            this.down_btn.visible = true;
	            this.up_btn.mouseEnabled = true;
	            this.down_btn.mouseEnabled = true;
	            if (sceneLayer.y <= -1 * Laya.stage.height) {
	                this.down_btn.visible = false;
	            }
	            if (sceneLayer.y >= 0 * Laya.stage.height) {
	                this.up_btn.visible = false;
	            }
	        }
	        else {
	            this.up_btn.visible = false;
	            this.down_btn.visible = false;
	        }
	    }
	    destroy(destroyChild) {
	        super.destroy(destroyChild);
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

	class MenuView extends BaseView {
	    createView(view) {
	        super.createView(view);
	        this.list.renderHandler = new Laya.Handler(this, this.renderList);
	        this.list.vScrollBarSkin = "";
	        this.list.elasticEnabled = true;
	    }
	    init() {
	        let menuVo = JsonConfig.ins.getVo(this._viewName);
	        this.list.array = menuVo.menuList;
	        this.list.width = this.list.getCell(0).width * this.list.repeatX;
	    }
	    set viewName(value) {
	        this._viewName = value;
	    }
	    renderList(cellItem, index) {
	        cellItem.renderView();
	    }
	    destroy(destroyChild) {
	        CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_DESTROY_VIEW_BY_NAME, this._viewName);
	        super.destroy(destroyChild);
	        this.list = null;
	        this.menuTab = null;
	    }
	}

	class InstallationListItem extends Laya.Box {
	    renderList(cellItem, index) {
	        cellItem.renderView();
	    }
	    renderView() {
	        let dataSource = this.dataSource;
	        this.title_txt = this.getChildByName("title_txt");
	        this.installationList = this.getChildByName("installationList");
	        this.installationList.renderHandler = new Laya.Handler(this, this.renderList);
	        this.installationList.repeatY = Math.ceil(dataSource.installationItemList.length / this.installationList.repeatX);
	        this.height = (this.height) * this.installationList.repeatY;
	        this.title_txt.text = dataSource.installationName;
	        this.installationList.array = dataSource.installationItemList;
	    }
	    destroy(destroyChild) {
	        super.destroy(destroyChild);
	        this.title_txt = null;
	        this.installationList = null;
	    }
	}

	class InstallationItem extends Laya.Box {
	    renderView() {
	        this.owned = this.getChildByName("owned");
	        this.owned.visible = false;
	        this.icon = this.getChildByName("icon");
	        let data = this.dataSource;
	        this.icon.skin = LoadManager.getIconUrl(data.type, data.id);
	        this.on(Laya.Event.CLICK, this, this.showInfo);
	    }
	    showInfo() {
	        let data = this.dataSource;
	        if (data != null) {
	            CommandChannel.instance.postCommand(ConstName.UI_CONTROLLER, ConstName.UI_SHOW_VIEW_BY_NAME, [ConstName.INSTALLATION_INFO, data]);
	        }
	    }
	    destroy(destroyChild) {
	        super.destroy(destroyChild);
	        this.off(Laya.Event.CLICK, this, this.showInfo);
	        this.owned = null;
	        this.icon = null;
	    }
	}

	class GameConfig {
	    constructor() {
	    }
	    static init() {
	        var reg = Laya.ClassUtils.regClass;
	        reg("game/SceneSprite.ts", SceneSprite);
	        reg("game/views/menu/InstallationInfo.ts", InstallationInfo);
	        reg("game/views/MainView.ts", MainView);
	        reg("game/views/menu/MenuView.ts", MenuView);
	        reg("game/views/menu/InstallationListItem.ts", InstallationListItem);
	        reg("game/views/menu/InstallationItem.ts", InstallationItem);
	    }
	}
	GameConfig.width = 960;
	GameConfig.height = 1280;
	GameConfig.scaleMode = "showall";
	GameConfig.screenMode = "vertical";
	GameConfig.alignV = "middle";
	GameConfig.alignH = "center";
	GameConfig.startScene = "scene/s_1.scene";
	GameConfig.sceneRoot = "";
	GameConfig.debug = false;
	GameConfig.stat = false;
	GameConfig.physicsDebug = false;
	GameConfig.exportSceneToJson = true;
	GameConfig.init();

	class Comp_scene_layer extends Laya.Box {
	    constructor() {
	        super();
	        this.speed = 0;
	    }
	}

	class WeChatLogin {
	    constructor() {
	    }
	    static get instance() {
	        !WeChatLogin._instance && (WeChatLogin._instance = new WeChatLogin());
	        return WeChatLogin._instance;
	    }
	    login() {
	        wx.login({
	            pkgName: "testPackage",
	            success(res) {
	                console.log(res);
	                wx.request({
	                    url: 'https://login.xueyan.online/cgi-bin/auth',
	                    data: res.code,
	                    method: 'POST',
	                    header: { 'content-type': 'application/json' },
	                    dataType: 'json',
	                    responseType: 'text',
	                    success(res) {
	                        console.log(res);
	                    },
	                    fail() { },
	                    complete() { }
	                });
	            },
	            fail() { },
	            complete() { }
	        });
	    }
	}

	class Main {
	    constructor() {
	        if (window["Laya3D"])
	            Laya3D.init(GameConfig.width, GameConfig.height);
	        else
	            Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
	        Laya["Physics"] && Laya["Physics"].enable();
	        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
	        Laya.stage.scaleMode = GameConfig.scaleMode;
	        Laya.stage.screenMode = GameConfig.screenMode;
	        Laya.stage.bgColor = "0x44444";
	        Laya.stage.alignH = "center";
	        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
	        if (Laya.Browser.onPC)
	            Laya.stage.screenMode = Laya.Stage.SCREEN_HORIZONTAL;
	        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
	        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
	            Laya.enableDebugPanel();
	        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
	            Laya["PhysicsDebugDraw"].enable();
	        if (GameConfig.stat)
	            Laya.Stat.show();
	        Laya.alertGlobalError = true;
	        Laya.ClassUtils.regClass("component.Comp_scene_layer", Comp_scene_layer);
	        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	        CommandChannel.instance.init();
	        if (Laya.Browser.onMiniGame) {
	            console.log("微信登录");
	            WeChatLogin.instance.login();
	        }
	    }
	    onVersionLoaded() {
	        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	    }
	    onConfigLoaded() {
	    }
	}
	new Main();

}());
