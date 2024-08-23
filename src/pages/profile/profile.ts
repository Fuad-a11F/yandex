import Block from "../../core/block.ts";
import { Button, ProfileRow, UploadAvatar } from "../../components";
import UserInfo from "./components/userInfo.ts";
import login from "../login/login.ts";

class Profile extends Block {
  init() {
    const changeDataHandler = this.changeDataHandler.bind(this);
    const changePasswordHandler = this.changePasswordHandler.bind(this);
    const formSubmit = this.formSubmit.bind(this);

    const uploadAvatar = new UploadAvatar({});
    const userInfo = new UserInfo({ ...this.props, formSubmit });

    const buttonChangeData = new Button({
      text: "Change data",
      isLink: true,
      onClick: changeDataHandler,
    });
    const buttonChangePassword = new Button({
      text: "Change password",
      isLink: true,
      onClick: changePasswordHandler,
    });
    const buttonLogout = new Button({
      text: "Logout",
      isLink: true,
      isDanger: true,
    });

    this.children = {
      ...this.children,
      uploadAvatar,
      userInfo,
      buttonChangeData,
      buttonChangePassword,
      buttonLogout,
    };
  }

  changeDataHandler() {
    this.setProps({ isChangeData: true });
    this.children.userInfo.setProps({ isChangeData: true });

    console.log(this.children);

    this.children.userInfo.children.profileRowEmail.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowLogin.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowName.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowLastName.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowDisplayName.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowPhone.setProps({
      isEditting: true,
    });
  }

  changePasswordHandler() {
    this.setProps({ isChangePassword: true });
    this.children.userInfo.setProps({ isChangePassword: true });

    this.children.userInfo.children.profileRowOldPassword.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowNewPassword.setProps({
      isEditting: true,
    });
    this.children.userInfo.children.profileRowNewRePassword.setProps({
      isEditting: true,
    });
  }

  formSubmit() {
    this.children.userInfo.setProps({ isChangeData: false });
    this.children.userInfo.setProps({ isChangePassword: false });

    this.children.profileRowEmail.setProps({ isEditting: false });
    this.children.profileRowLogin.setProps({ isEditting: false });
    this.children.profileRowName.setProps({ isEditting: false });
    this.children.profileRowLastName.setProps({ isEditting: false });
    this.children.profileRowDisplayName.setProps({ isEditting: false });
    this.children.profileRowPhone.setProps({ isEditting: false });
    this.children.profileRowOldPassword.setProps({ isEditting: false });
    this.children.profileRowNewPassword.setProps({ isEditting: false });
    this.children.profileRowNewRePassword.setProps({ isEditting: false });
  }

  render() {
    return `
          <div class="profile">
              <aside class="profile__back">
                  <img src="./icons/buttonArrow.svg" alt="back">
              </aside>
          
              <main class="profile__information">
                  <div class="profile__avatar">
                      {{{ uploadAvatar }}}
                  </div>
          
                  <div class="profile__name">
                      Иван
                  </div>
          
                   {{{ userInfo }}}
         
                  {{#ifLogicOr isChangeData isChangePassword}}
                  {{else}}
                    <div class="profile__buttons">
                        {{{ buttonChangeData }}}
                  
                        <hr>
                  
                        {{{ buttonChangePassword }}}
                  
                        <hr>
                  
                        {{{ buttonLogout }}}
                    </div>
                  {{/ifLogicOr}}
              </main>
          </div>
      `;
  }
}

export default Profile;
