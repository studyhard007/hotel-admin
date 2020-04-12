import { observable, action } from "mobx";
import { message } from "antd";

class LoginStore {
  @observable phone: string = "0";
  @observable password: string = "0";
  @observable issuccess: boolean = false;
  @observable issuper: boolean = false;
  @action signIn = (phone: string, password: string) => {
    // 将账号密码写进缓存中全局使用
    const localStorage = window.localStorage;
    try {
      fetch(`http://localhost:3000/api/v1/customer/${phone}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.data === null) {
            message.warn("账号不存在");
            this.phone = phone;
            this.password = password;
            this.issuper = false;
          } else if (data.data.password === password) {
            if (phone === "13000000000") {
              this.issuper = true;
            }else {
              this.issuper = false;
            }
            this.phone = phone;
            this.password = password;
            this.issuccess = true;
            localStorage.setItem("phone", phone);
            if(this.issuper === true) {
              localStorage.setItem('issuper', 'true');
            }else {
              localStorage.setItem('issuper', 'false')
            }
            message.success("登录成功");
          } else {
            this.phone = phone;
            this.password = password;
            this.issuccess = false;
            message.success("密码错误");
          }
        });
    } catch (err) {
      message.error(err);
    }
  };
}

export default LoginStore;
