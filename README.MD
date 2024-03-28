[逆向过程在这里](https://blog.zhx47.top/posts/25.html)

代码中获取邮箱验证码是使用了[crazeMail](https://github.com/zhx47/crazeMail)配套的，可能需要大家重新写一下了。（当年脑子不好使不知道有线程的开源程序，现在就先这样用了）

程序入口在 `main.js`。需要更改 `pikpak.js` 中的 `getVerificationCode()`，更改为自己的服务地址或者重写与自己垃圾邮件配套的程序。

哦，对了，代码中没有对限流做处理，大批量的注册刷取邀请还需要自己处理。

还有还有，`main.js` 中的邮箱主域名需要改成大家自己的。