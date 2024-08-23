import Block from "../../../core/block.ts";
import { Button, Input, ProfileRow } from "../../../components";
import { validationFunctionForField } from "../../../shared/validation/validationFunction.ts";
import {
  emailValidation,
  loginValidation,
  namesValidation,
  passwordValidation,
  phoneValidation,
} from "../../../shared/validation/validation.ts";

class UserInfo extends Block {
  constructor(props) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const formData = new FormData(document.querySelector("#userInfo"));
          const formObject = Object.fromEntries(formData.entries());

          props.formSubmit(formObject);
        },
      },
    });
  }

  init() {
    const buttonSave = new Button({ text: "Save" });

    const profileRowOldPassword = new ProfileRow({
      label: "Old password",
      value: "test2001",
      input: new Input({
        isProfileRow: true,
        name: "oldPassword",
        id: "oldPassword",
        value: "test2001",
        type: "password",
        onBlur: (value) =>
          validationFunctionForField(
            passwordValidation,
            value,
            this.children.profileRowOldPassword.children.input,
            "Password is wrong",
          ),
      }),
    });

    const profileRowNewPassword = new ProfileRow({
      label: "New password",
      value: "text2001New",
      input: new Input({
        isProfileRow: true,
        name: "newPassword",
        id: "newPassword",
        value: "text2001New",
        type: "password",
        onBlur: (value) =>
          validationFunctionForField(
            passwordValidation,
            value,
            this.children.profileRowNewPassword.children.input,
            "Password is wrong",
          ),
      }),
    });

    const profileRowNewRePassword = new ProfileRow({
      label: "Repeat new password",
      value: "text2001New",
      input: new Input({
        isProfileRow: true,
        name: "rePassword",
        id: "rePassword",
        value: "text2001New",
        type: "password",
      }),
    });

    const profileRowEmail = new ProfileRow({
      label: "Email",
      value: "pochta@yandex.ru",
      input: new Input({
        isProfileRow: true,
        name: "email",
        id: "email",
        value: "pochta@yandex.ru",
        onBlur: (value) =>
          validationFunctionForField(
            emailValidation,
            value,
            this.children.profileRowEmail.children.input,
            "Email is wrong",
          ),
      }),
    });

    const profileRowLogin = new ProfileRow({
      label: "Login",
      value: "ivanivanov",
      input: new Input({
        isProfileRow: true,
        name: "login",
        id: "login",
        value: "ivanivanov",
        onBlur: (value) =>
          validationFunctionForField(
            loginValidation,
            value,
            this.children.profileRowLogin.children.input,
            "Email is wrong",
          ),
      }),
    });

    const profileRowName = new ProfileRow({
      label: "Name",
      value: "Иван",
      input: new Input({
        isProfileRow: true,
        name: "first_name",
        id: "first_name",
        value: "Иван",
        onBlur: (value) =>
          validationFunctionForField(
            namesValidatio,
            value,
            this.children.profileRowName.children.input,
            "First name is wrong",
          ),
      }),
    });

    const profileRowLastName = new ProfileRow({
      label: "Last name",
      value: "Иванов",
      input: new Input({
        isProfileRow: true,
        name: "second_name",
        id: "second_name",
        value: "Иванов",
        onBlur: (value) =>
          validationFunctionForField(
            namesValidation,
            value,
            this.children.profileRowLastName.children.input,
            "Last name is wrong",
          ),
      }),
    });

    const profileRowDisplayName = new ProfileRow({
      label: "Name in chat",
      value: "Иван",
      input: new Input({
        isProfileRow: true,
        name: "display_name",
        id: "display_name",
        value: "Иван",
        onBlur: (value) =>
          validationFunctionForField(
            loginValidation,
            value,
            this.children.profileRowDisplayName.children.input,
            "Display name is wrong",
          ),
      }),
    });

    const profileRowPhone = new ProfileRow({
      label: "Phone",
      value: "+7 (909) 967 30 30",
      input: new Input({
        isProfileRow: true,
        name: "phone",
        id: "phone",
        value: "+7 (909) 967 30 30",
        onBlur: (value) =>
          validationFunctionForField(
            phoneValidation,
            value,
            this.children.profileRowPhone.children.input,
            "Phone is wrong",
          ),
      }),
    });

    this.children = {
      ...this.children,
      buttonSave,
      profileRowDisplayName,
      profileRowPhone,
      profileRowOldPassword,
      profileRowNewPassword,
      profileRowNewRePassword,
      profileRowEmail,
      profileRowLogin,
      profileRowName,
      profileRowLastName,
    };
  }

  render() {
    return `
      <{{#ifLogicOr isChangeData isChangePassword}}form id="userInfo"{{else}}div{{/ifLogicOr}}>
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
                  {{{ inputPassword22 }}}
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
