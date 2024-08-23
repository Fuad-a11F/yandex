import Block from "../../../core/block.ts";
import { Button, ProfileRow } from "../../../components";

class UserInfo extends Block {
  constructor(props) {
    super({ ...props, events: { submit: props.formSubmit } });
  }

  init() {
    console.log(this.props.isChangeData);

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

    const buttonSave = new Button({ text: "Save" });

    this.children = {
      ...this.children,
      profileRowOldPassword,
      profileRowNewPassword,
      profileRowNewRePassword,
      profileRowEmail,
      profileRowLogin,
      profileRowName,
      buttonSave,
      profileRowLastName,
      profileRowDisplayName,
      profileRowPhone,
    };
  }

  render() {
    return `
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
          
          {{#ifLogicOr isChangeData isChangePassword}}
              <div class="profile__button_save">
                  {{{ buttonSave }}}
              </div>
         {{/ifLogicOr}}
      </{{#ifLogicOr isChangeData isChangePassword}}form{{else}}div{{/ifLogicOr}}>
    `;
  }
}

export default UserInfo;
