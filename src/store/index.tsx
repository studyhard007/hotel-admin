import { observable, action } from "mobx";
import { message } from "antd";

class LoginStore {
  @observable phone: string = "0";
  @observable password: string = "0";
  @observable issuper: boolean = false;
  @observable issuccess: boolean = false;
  @observable issuperadmin: boolean = false;
  @action signIn = (phone: string, password: string) => {
    try {
      fetch(`http://localhost:3000/api/v1/customer/${phone}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.data === null) {
            message.warn("账号不存在");
            return this.issuccess;
          }
          if (data.data.password === password) {
            if (phone === "13000000000") {
              this.issuperadmin = true;
            }
            this.phone = phone;
            this.issuper = data.data.issuper;
            this.issuccess = true;
            message.success("登录成功");
          } else {
            this.issuccess = false;
            message.success("密码错误");
          }
          console.log(this.issuccess);
        });
    } catch (err) {
      message.error(err);
    }
  };
}

export default LoginStore;
