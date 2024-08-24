import Block from "../../core/block.ts";
import { Button, UploadAvatar } from "../../components";
import { UserInfo } from "./index.ts";
import {
  getUserInfoDataValidateFields,
  getUserInfoPasswordValidateFields,
} from "../../shared/validation/inputsForValidate.ts";
import validationFunction from "../../shared/validation/validationFunction.ts";
import { ProfileInterface } from "../../interface/profile/profileInterface.ts";

class Profile extends Block {
  init() {
    const changeDataHandler = this.changeDataHandler.bind(this);
    const changePasswordHandler = this.changePasswordHandler.bind(this);
    const formSubmit = this.formSubmit.bind(this);

    const uploadAvatar = new UploadAvatar({});

    const userInfo = new UserInfo({
      ...this.props,
      formSubmit,
    });

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
    [
      "profileRowEmail",
      "profileRowLogin",
      "profileRowName",
      "profileRowLastName",
      "profileRowDisplayName",
      "profileRowPhone",
    ].forEach((item) => {
      const child = this.children.userInfo.children[item];
      if (child) {
        child.setProps({ isEditting: true });
      }
    });
  }

  changePasswordHandler() {
    this.setProps({ isChangePassword: true });
    this.children.userInfo?.setProps({ isChangePassword: true });

    const passwordFields = [
      "profileRowOldPassword",
      "profileRowNewPassword",
      "profileRowNewRePassword",
    ];
    passwordFields.forEach((item) => {
      const child = this.children.userInfo?.children[item];
      if (child) {
        child.setProps({ isEditting: true });
      }
    });
  }

  formSubmit(data: Partial<ProfileInterface>) {
    const error = { isError: false };
    if (this.props.isChangePassword) {
      validationFunction(
        getUserInfoPasswordValidateFields(data),
        this.children.userInfo?.children || {},
        error,
        "children.input",
      );
    } else if (this.props.isChangeData) {
      validationFunction(
        getUserInfoDataValidateFields(data),
        this.children.userInfo?.children || {},
        error,
        "children.input",
      );
    }

    if (error.isError) return;

    this.setProps({ isChangePassword: false, isChangeData: false });
    this.children.userInfo?.setProps({
      isChangeData: false,
      isChangePassword: false,
    });

    const allFields = [
      "profileRowEmail",
      "profileRowLogin",
      "profileRowName",
      "profileRowLastName",
      "profileRowDisplayName",
      "profileRowPhone",
      "profileRowOldPassword",
      "profileRowNewPassword",
      "profileRowNewRePassword",
    ];
    allFields.forEach((item) => {
      const child = this.children.userInfo?.children[item];
      if (child) {
        child.setProps({ isEditting: false });
      }
    });

    console.log(data);
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
