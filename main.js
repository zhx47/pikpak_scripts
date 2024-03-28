const {PikPak} = require("./pikpak");
const randomstring = require('randomstring')

async function main() {
    const name = randomstring.generate({
        length: 8,
        charset: 'alphabetic'
    });
    const password = randomstring.generate({
        length: 10,
        charset: 'alphanumeric'
    });

    // 注册
    let pikPak = new PikPak(`${name}@temp.com`, password, null, '自己的邀请码');
    pikPak.authVerification()
        .then(() => pikPak.getVerificationCode())
        .then(() => pikPak.authVerificationVerify())
        .then(() => pikPak.authSignup())
        .then(() => pikPak.userMe())
        .then(() => pikPak.activityInvite())
        .then(() => pikPak.activityInviteCode())
        .then(() => pikPak.activationCode())
        .then(() => pikPak.printUserInfo())
        .catch(e => console.log(e))

    // 登录
    // let pikPak = new PikPak('temp@temp.com', 'tempPassword', 'tempuuid');
    // pikPak.signin()
    //     .then(() => pikPak.userMe())
    //     .then(() => pikPak.printUserInfo())
    //     .catch(e => console.log(e))
}

main()