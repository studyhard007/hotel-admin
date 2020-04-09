import { observable, action } from 'mobx';
import { message } from 'antd';

class LoginStore {
  @observable phone: string = '0';
  @observable password: string = '0';
  @observable issuper: boolean = false;
  @observable issuccess: boolean = false;
  // @action userlogin = (phone: string, password: string, issuper: boolean) => {
  //   this.phone = phone;
  //   this.password = password;
  //   this.issuper = issuper;
  // }
  @action signIn  = (phone: string, password: string) => {
    try {
      fetch(`http://localhost:3000/api/v1/customer/${phone}`).then(res => {
        return res.json();
      }).then(data => {
        if(data.data === null) {
          message.warn('账号不存在');
          return;
        }
        if(data.data.password === password) {
          this.issuper = data.data.issuper;
          this.issuccess = true;
        }else {
          this.issuccess = false;
        }
      })
    }catch(err) {
      message.error(err);
    }
  }
}

export default LoginStore;