import Block from "../../core/block.ts";
import { Button, ProfileRow, UploadAvatar } from "../../components";

class Profile extends Block {
  init() {
    const changeDataHandler = this.changeDataHandler.bind(this);
    const changePasswordHandler = this.changePasswordHandler.bind(this);
    const saveHandler = this.saveHandler.bind(this);

    const uploadAvatar = new UploadAvatar({});

    const profileRowOldPassword = new ProfileRow({
      label: "Old password",
      value: "test2001",
      isPassword: true,
      name: "oldPassword",
    });

    const profileRowNewPassword = new ProfileRow({
      label: "New password",
      value: "text2001New",
      isPassword: true,
      name: "newPassword",
    });

    const profileRowNewRePassword = new ProfileRow({
      label: "Repeat new password",
      value: "text2001New",
      isPassword: true,
      name: "rePassword",
    });

    const profileRowEmail = new ProfileRow({
      label: "Email",
      value: "pochta@yandex.ru",
      name: "email",
    });

    const profileRowLogin = new ProfileRow({
      label: "Login",
      value: "ivanivanov",
      name: "login",
    });

    const profileRowName = new ProfileRow({
      label: "Name",
      value: "Иван",
      name: "first_name",
    });

    const profileRowLastName = new ProfileRow({
      label: "Last name",
      value: "Иванов",
      name: "second_name",
    });

    const profileRowDisplayName = new ProfileRow({
      label: "Name in chat",
      value: "Иван",
      name: "display_name",
    });

    const profileRowPhone = new ProfileRow({
      label: "Phone",
      value: "+7 (909) 967 30 30",
      name: "phone",
    });

    const buttonSave = new Button({ text: "Save", onClick: saveHandler });
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
      profileRowOldPassword,
      profileRowNewPassword,
      profileRowNewRePassword,
      profileRowEmail,
      profileRowLogin,
      profileRowName,
      profileRowLastName,
      profileRowDisplayName,
      profileRowPhone,
      buttonSave,
      buttonChangeData,
      buttonChangePassword,
      buttonLogout,
    };
  }

  changeDataHandler() {
    this.setProps({ isChangeData: true });

    this.children.profileRowEmail.setProps({ isEditting: true });
    this.children.profileRowLogin.setProps({ isEditting: true });
    this.children.profileRowName.setProps({ isEditting: true });
    this.children.profileRowLastName.setProps({ isEditting: true });
    this.children.profileRowDisplayName.setProps({ isEditting: true });
    this.children.profileRowPhone.setProps({ isEditting: true });
  }

  changePasswordHandler() {
    this.setProps({ isChangePassword: true });

    this.children.profileRowOldPassword.setProps({ isEditting: true });
    this.children.profileRowNewPassword.setProps({ isEditting: true });
    this.children.profileRowNewRePassword.setProps({ isEditting: true });
  }

  saveHandler() {
    this.setProps({ isChangeData: false });
    this.setProps({ isChangePassword: false });

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
          
                  <{{#ifLogicOr isChangeData isChangePassword}}form{{else}}div{{/ifLogicOr}}>
                      {{#if isChangePassword}}
                          <div>
                              {{{ profileRowOldPassword }}}
                              <hr>
                              {{{ profileRowNewPassword }}}
                              <hr>
                              {{{ profileRowNewRePassword }}}
                          </div>
                      {{else}}
                          <div>
                              {{{ profileRowEmail }}}
                              <hr>
                              {{{ profileRowLogin }}}
                              <hr>
                              {{{ profileRowName }}}
                              <hr>
                              {{{ profileRowLastName }}}
                              <hr>
                              {{{ profileRowDisplayName }}}
                              <hr>
                              {{{ profileRowPhone }}}
                          </div>
                      {{/if}}
                  </{{#ifLogicOr isChangeData isChangePassword}}form{{else}}div{{/ifLogicOr}}>
             
                 {{#ifLogicOr isChangeData isChangePassword}}
                      <div class="profile__button_save">
                          {{{ buttonSave }}}
                      </div>
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
