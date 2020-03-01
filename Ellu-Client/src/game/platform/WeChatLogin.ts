export default class WeChatLogin {
    private static _instance: WeChatLogin;

    constructor() {
    }

    public static get instance(): WeChatLogin {
        !WeChatLogin._instance && (WeChatLogin._instance = new WeChatLogin());
        return WeChatLogin._instance;
    }

    public login() {
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