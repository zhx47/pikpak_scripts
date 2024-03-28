const {CookieJar, Cookie} = require("tough-cookie");
const {wrapper} = require("axios-cookiejar-support");
const axios = require("axios");
const {getCaptchaSign, generateDeviceId, genSign, getUserAgent, sleep} = require("./tools");
const randomstring = require("randomstring");

class PikPak {
    constructor(email, password, deviceid, invite_code) {
        this.customAdapter = this.customAdapter.bind(this);

        // 初始化一个需要处理Cookie的axios处理验证程序
        const jar = new CookieJar();
        this.jar = jar;
        this.client = wrapper(axios.create({jar}));
        // 再初始化一个普通的axios处理普通的注册逻辑请求
        this.api = axios.create({adapter: this.customAdapter});

        // 一些 PikPak 的常量
        this.app_client_id = 'YNxT9w7GMdWvEOKa'
        this.web_client_id = 'YUMx5nI8ZU8Ap8pm'
        this.client_version = '1.42.8'
        this.client_version_code = '10182'
        this.client_secret = 'dbw2OtmVEeuUvIptb1Coyg'
        this.package_name = 'com.pikcloud.pikpak'

        // 初始化
        this.captcha_token = ''
        this.deviceid = deviceid || generateDeviceId()
        this.userAgent = getUserAgent(this.package_name, this.client_version, this.app_client_id, this.deviceid)
        this.email = email
        this.name = this.email.split('@')[0]
        this.password = password || randomstring.generate({
            length: 10,
            charset: 'alphanumeric'
        })
        this.invite_code = invite_code || '48834297'

        this.access_token = ''
        this.refresh_token = ''
        this.user_id = ''
        this.user_code = ''
        this.verification_code = ''
        this.verification_token = ''
        this.verification_id = ''
    }

    /**
     * 自定义适配器，尝试自动进行验证
     * @param config
     * @returns {Promise<*|AxiosResponse<any>>}
     */
    async customAdapter(config) {
        const validateAndRetry = async (config, retries = 1) => {
            try {
                return await axios(this.disposeConfig(config));
            } catch (e) {
                // 检查响应码并处理
                if (e.response.data.error && retries <= 3) {
                    // 图形验证码
                    console.log(`发现captcha_token失效，第${retries}次尝试刷新`);
                    await this.captchaInit(`${config.method.toUpperCase()}:${new URL(config.url).pathname}`);
                    return validateAndRetry(config, retries + 1)
                } else if (e.response.data.error) {
                    throw new Error(`尝试验证失败，${JSON.stringify(e)}`)
                }
            }
        }
        return validateAndRetry(config)
    }

    disposeConfig(config) {
        const {adapter, ...newConfig} = config
        if (newConfig.data) {
            let data = JSON.parse(newConfig.data);
            if (data.captcha_token !== undefined) {
                data.captcha_token = this.captcha_token
            }
            newConfig.data = JSON.stringify(data)
        }
        if (newConfig.headers && newConfig.headers['x-captcha-token'] !== undefined) {
            newConfig.headers['x-captcha-token'] = this.captcha_token
        }
        return newConfig
    }

    async captchaInit(action) {
        console.log('开始刷新captcha_token...')
        const timestamp = Date.now();
        const captchaSign = getCaptchaSign(this.package_name, this.app_client_id, this.client_version, this.deviceid, timestamp);

        const url = `https://user.mypikpak.com/v1/shield/captcha/init`;
        const body = {
            "action": action,
            "captcha_token": this.captcha_token,
            "client_id": this.app_client_id,
            "device_id": this.deviceid,
            "meta": {
                "captcha_sign": captchaSign,
                "user_id": "",
                "package_name": this.package_name,
                "client_version": this.client_version,
                "email": this.email,
                "timestamp": `${timestamp}`
            },
            "redirect_uri": "xlaccsdk01://xbase.cloud/callback?state=harbor"
        }
        const headers = {
            'user-agent': this.userAgent.appUserAgent,
            'x-device-id': this.deviceid,
        }

        const {data} = await this.client.post(url, body, {
            params: {
                client_id: this.app_client_id
            },
            headers
        })
        this.captcha_token = data.captcha_token
        if (data.url) {
            console.log('需要进行图形验证码验证...')
            await this.pzzlGen()
        } else {
            console.log(`获取到验证码Token：${data.captcha_token}`)
            this.captcha_token = data.captcha_token
        }
    }

    /**
     * 获取图形验证码
     * @returns {Promise<{traceid: *, p: number, a: number, c: number, f: number, pid: *, deviceid: *, n: number}>}
     */
    async pzzlGen() {
        console.log('开始获取验证码...')
        console.log('补填Cookie...')
        const cookies = [
            new Cookie({
                key: 'PPA_CI',
                value: generateDeviceId(),
                domain: 'user.mypikpak.com',
                path: '/',
            }),
            new Cookie({
                key: 'captcha_token',
                value: this.captcha_token,
                domain: 'user.mypikpak.com',
                path: '/',
            }),
            new Cookie({
                key: 'mainHost',
                value: 'user.mypikpak.com',
                domain: 'user.mypikpak.com',
                path: '/',
            })
        ];
        cookies.forEach(cookie => {
            this.jar.setCookie(cookie, 'https://user.mypikpak.com', (err, cookie) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Cookie 添加成功:', cookie);
                }
            });
        });

        const url = "https://user.mypikpak.com/pzzl/gen";
        const params = {
            "deviceid": this.deviceid, "traceid": ""
        };
        const headers = {
            'user-agent': this.userAgent.webUserAgent,
            'x-requested-with': this.package_name,
        }

        const {data} = await this.client.get(url, {params, headers});
        const body = genSign(data, this.deviceid)
        console.log(`获取到验证参数：${JSON.stringify(body)}`)
        await this.pzzlVerify(body)
        await this.creditReport({
            deviceid: body.deviceid,
            captcha_token: this.captcha_token,
            type: 'pzzlSlider',
            result: '0',
            data: body.pid,
            traceid: body.traceid
        })
    }

    /**
     * 图形验证码验证是否正确
     * @param params
     * @param webUserAgent
     * @returns {Promise<{result: string, traceid: (string|*), data: *, captcha_token: *, type: string, deviceid: *}>}
     */
    async pzzlVerify(params) {
        console.log('开始验证码验证...')
        const url = "https://user.mypikpak.com/pzzl/verify";
        const headers = {
            'user-agent': this.userAgent.webUserAgent,
            'x-requested-with': this.package_name,
        }

        const {data} = await this.client.get(url, {params, headers});
        if ('accept' !== data.result) {
            throw new Error('验证失败，可能已经失效了~')
        }
        console.log('验证成功')
    }

    /**
     * 图形验证
     * @param params
     * @param webUserAgent
     * @returns {Promise<string|*>}
     */
    async creditReport(params) {
        console.log('开始汇报验证码，刷新captcha_token...')
        const url = "https://user.mypikpak.com/credit/v1/report";
        const headers = {
            'user-agent': this.userAgent.webUserAgent,
            'x-requested-with': this.package_name,
        }

        const {data} = await this.client.get(url, {params, headers});
        if (200 !== data.code) {
            throw new Error('验证失败，可能已经失效了~')
        }
        console.log(`获取到新的captcha_token: ${data.captcha_token}`)
        this.captcha_token = data.captcha_token
    }

    /**
     *
     * @param captcha_token
     * @param email
     * @param device_id
     * @param appUserAgent
     * @returns {Promise<*>}
     */
    async authVerification() {
        console.log('开始获取身份验证ID...')

        const url = `https://user.mypikpak.com/v1/auth/verification`;
        const body = {
            "captcha_token": this.captcha_token,
            "email": this.email,
            "locale": "zh-CN",
            "target": "ANY",
            "client_id": this.app_client_id
        }
        const headers = {
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
        }

        const {data} = await this.api.post(url, body, {
            params: {
                client_id: this.app_client_id
            },
            headers
        })
        console.log(`获取到身份验证ID：${data.verification_id}`)
        this.verification_id = data.verification_id;
    }

    async authVerificationVerify() {
        console.log('开始进行身份验证...')

        const url = `https://user.mypikpak.com/v1/auth/verification/verify`;
        const body = {
            "client_id": this.app_client_id,
            "verification_id": this.verification_id,
            "verification_code": this.verification_code
        }
        const headers = {
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
        }

        const {data} = await this.api.post(url, body, {
            params: {
                client_id: this.app_client_id
            },
            headers
        })
        console.log(`获取到身份验证Token：${data.verification_token}`)
        this.verification_token = data.verification_token;
    }

    async authSignup() {
        console.log('开始注册...')

        const url = `https://user.mypikpak.com/v1/auth/signup`;
        const body = {
            "captcha_token": this.captcha_token,
            "client_id": this.app_client_id,
            "client_secret": this.client_secret,
            "email": this.email,
            "name": this.name,
            "password": this.password,
            "verification_token": this.verification_token
        }
        const headers = {
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
        }

        const {data} = await this.api.post(url, body, {
            params: {
                client_id: this.app_client_id
            },
            headers
        })
        console.log(`注册成功`)
        this.access_token = data.access_token
        this.refresh_token = data.refresh_token
        this.user_id = data.sub
    }

    async userMe() {
        console.log('尝试获取用户信息...')

        const url = 'https://user.mypikpak.com/v1/user/me';
        const headers = {
            'authorization': `Bearer ${this.access_token}`,
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
        }

        const {data} = await this.api.get(url, {headers})
        console.log(`获取到用户信息: ${JSON.stringify(data)}`)
        if (this.user_id !== data.sub) {
            throw new Error('获取到用户名好像不一致，是不是错了')
        }
    }

    async activityInvite() {
        console.log('填写邀请码前一步...')

        const url = 'https://api-drive.mypikpak.com/vip/v1/activity/invite';
        const body = {
            "data": {
                "sdk_int": "33",
                "uuid": this.deviceid,
                "userType": "1",
                "userid": this.user_id,
                "userSub": "",
                "product_flavor_name": "cha",
                "language_system": "zh-CN",
                "language_app": "zh-CN",
                "build_version_release": "13",
                "phoneModel": this.userAgent.phoneModel.toUpperCase(),
                "build_manufacturer": this.userAgent.build_manufacturer.toUpperCase(),
                "build_sdk_int": "33",
                "channel": "official",
                "versionCode": this.client_version_code,
                "versionName": this.client_version,
                "installFrom": "other",
                "country": "cn"
            },
            "apk_extra": {
                "channel": "official"
            }
        }
        const headers = {
            'authorization': `Bearer ${this.access_token}`,
            'product_flavor_name': 'cha',
            'x-client-version-code': this.client_version_code,
            'x-device-id': this.deviceid,
            'x-captcha-token': this.captcha_token,
            'user-agent': this.userAgent.appUserAgent,
            'country': 'CN',
            'x-peer-id': this.deviceid,
            'x-user-region': '2,3',
            'x-system-language': 'zh-CN',
            'x-alt-capability': '3',
        }

        await this.api.post(url, body, {headers})
    }

    async activityInviteCode() {
        console.log('获取用户邀请码...')

        const url = 'https://api-drive.mypikpak.com/vip/v1/activity/inviteCode';
        const headers = {
            'x-client-version-code': this.client_version_code,
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
            'x-system-language': 'zh-CN',
            'x-alt-capability': '3',
            'authorization': `Bearer ${this.access_token}`,
            'x-detection-time': 'dl-a10b-0871:2612,dl-a10b-0867:2668,dl-a10b-0866:2734,dl-a10b-0883:2733,dl-a10b-0863:2754,dl-a10b-0865:2775,dl-a10b-0874:2774,dl-a10b-0870:2815,dl-a10b-0862:2832,dl-a10b-0873:2835,dl-a10b-0878:2839,dl-a10b-0869:2888,dl-a10b-0858:3059,dl-a10b-0879:3086,dl-a10b-0882:3198,dl-a10b-0872:3330,dl-a10b-0860:3460,dl-a10b-0884:3529,dl-a10b-0875:3583,dl-a10b-0880:3729,dl-a10b-0861:4388,dl-a10b-0859:4443,dl-a10b-0623:4508,dl-a10b-0621:4554,dl-a10b-0881:4560,dl-a10b-0877:4673,dl-a10b-0886:5086,dl-a10b-0625:5100,dl-a10b-0864:5569,dl-a10b-0876:5652,dl-a10b-0624:5658,dl-a10b-0887:6138,dl-a10b-0868:6177,dl-a10b-0885:6499,dl-a10b-0622:8542',
            'product_flavor_name': 'cha',
            'x-captcha-token': this.captcha_token,
            'country': 'CN',
            'x-peer-id': this.deviceid,
            'x-user-region': '2,3'
        }

        const {data} = await this.api.get(url, {headers})
        console.log(`获取到用户邀请码: ${JSON.stringify(data.code)}`)
        this.user_code = data.code
    }

    async activationCode() {
        console.log(`开始填写邀请 ${this.invite_code}...`)

        const url = 'https://api-drive.mypikpak.com/vip/v1/order/activation-code';
        const body = {
            "activation_code": this.invite_code,
            "page": "invite"
        }
        const headers = {
            'x-client-version-code': this.client_version_code,
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
            'x-system-language': 'zh-CN',
            'x-alt-capability': '3',
            'authorization': `Bearer ${this.access_token}`,
            'x-detection-time': 'dl-a10b-0871:2612,dl-a10b-0867:2668,dl-a10b-0866:2734,dl-a10b-0883:2733,dl-a10b-0863:2754,dl-a10b-0865:2775,dl-a10b-0874:2774,dl-a10b-0870:2815,dl-a10b-0862:2832,dl-a10b-0873:2835,dl-a10b-0878:2839,dl-a10b-0869:2888,dl-a10b-0858:3059,dl-a10b-0879:3086,dl-a10b-0882:3198,dl-a10b-0872:3330,dl-a10b-0860:3460,dl-a10b-0884:3529,dl-a10b-0875:3583,dl-a10b-0880:3729,dl-a10b-0861:4388,dl-a10b-0859:4443,dl-a10b-0623:4508,dl-a10b-0621:4554,dl-a10b-0881:4560,dl-a10b-0877:4673,dl-a10b-0886:5086,dl-a10b-0625:5100,dl-a10b-0864:5569,dl-a10b-0876:5652,dl-a10b-0624:5658,dl-a10b-0887:6138,dl-a10b-0868:6177,dl-a10b-0885:6499,dl-a10b-0622:8542',
            'product_flavor_name': 'cha',
            'x-captcha-token': this.captcha_token,
            'country': 'CN',
            'x-peer-id': this.deviceid,
            'x-user-region': '2,3'
        }

        const {data} = await this.api.post(url, body, {headers})
        console.log(`结果: ${JSON.stringify(data)}`)
    }

    async getVerificationCode() {
        console.log('开始获取验证码...')
        for (let i = 0; i < 10; i++) {
            const {data} = await axios.get(`http://127.0.0.1:10025/crazeMail/email/${this.email}`)

            if (data.body.records.length > 0) {
                let raw = data.body.records[0].raw;
                const regex = /<h2>(\d+)<\/h2>/;
                const matches = raw.match(regex);

                if (matches && matches[1]) {
                    console.log("提取到的验证码是:", matches[1]);
                    this.verification_code = matches[1];
                    return
                } else {
                    console.log("暂时没有找到验证码~");
                    await sleep(3000);
                }
            }
        }
        throw new Error('未获取到验证码~')
    }

    async signin() {
        console.log(`开始登录...`)

        const url = 'https://user.mypikpak.com/v1/auth/signin';
        const body = {
            "captcha_token": "",
            "client_id": this.app_client_id,
            "client_secret": this.client_secret,
            "password": this.password,
            "username": this.email
        }
        const headers = {
            'x-device-id': this.deviceid,
            'user-agent': this.userAgent.appUserAgent,
        }

        const {data} = await this.api.post(url, body, {
            params: {
                client_id: this.app_client_id
            },
            headers
        })

        if (data.access_token) {
            console.log('登录成功')
            this.access_token = data.access_token
            this.refresh_token = data.refresh_token
            this.user_id = data.sub
        } else {
            throw new Error('登录失败...')
        }
    }

    printUserInfo() {
        console.log(`本次注册用户信息如下: 用户ID: ${this.user_id}, 用户昵称: ${this.name}, 用户邮箱: ${this.email}, 用户密码: ${this.password}, 用户设备ID: ${this.deviceid}, 用户邀请码: ${this.user_code}`)
    }
}

module.exports = {
    PikPak
}