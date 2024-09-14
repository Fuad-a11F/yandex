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
import {
  UserInfoChildrenInterface,
  UserInfoPropsInterface,
} from "../../../interface/modules/profile/profilePropsInterface.ts";
import { UserDtoInterface } from "../../../interface/api/authApiInterface.ts";

class UserInfo extends Block<
  UserInfoPropsInterface,
  UserInfoChildrenInterface
> {
  constructor(props: UserInfoPropsInterface) {
    super({
      ...props,
      events: {
        submit: (e: SubmitEvent) => {
          e.preventDefault();
          const form = document.querySelector("#userInfo");

          if (form) {
            const formData = new FormData(form as HTMLFormElement);
            const formObject = Object.fromEntries(
              formData.entries(),
            ) as unknown as UserDtoInterface;

            if (props.formSubmit) {
              props.formSubmit(formObject);
            }
          }
        },
      },
    });
  }

  init() {
    const buttonSave = new Button({ text: "Save" });

    const profileRowOldPassword = new ProfileRow({
      label: "Old password",
      value: "",
      input: new Input({
        isProfileRow: true,
        name: "oldPassword",
        id: "oldPassword",
        value: "",
        type: "password",
        onBlur: (value: string) =>
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
      value: "",
      input: new Input({
        isProfileRow: true,
        name: "newPassword",
        id: "newPassword",
        type: "password",
        value: "",
        onBlur: (value: string) => {
          validationFunctionForField(
            passwordValidation,
            value,
            this.children.profileRowNewPassword.children.input,
            "Password is wrong",
          );
          this.setProps({ password: value });
        },
      }),
    });

    this.setProps({ password: "text2001New" });

    const profileRowNewRePassword = new ProfileRow({
      label: "Repeat new password",
      value: "",
      input: new Input({
        isProfileRow: true,
        name: "rePassword",
        id: "rePassword",
        value: "",
        type: "password",
        onBlur: (value: string) => {
          validationFunctionForField(
            passwordValidation,
            value,
            this.children.profileRowNewRePassword.children.input,
            "Password is wrong",
          );
          if (this.props.password !== value) {
            this.children.profileRowNewRePassword.children.input.setProps({
              isError: true,
              errorMessage: "Passwords are different",
            });
          }
        },
      }),
    });

    const profileRowEmail = new ProfileRow({
      label: "Email",
      value: this.props.user?.email,
      input: new Input({
        isProfileRow: true,
        name: "email",
        id: "email",
        value: this.props.user?.email,
        onBlur: (value: string) =>
          validationFunctionForField(
            emailValidation,
            value,
            this.children.profileRowEmail.children.input,
            "Email is wrong",
          ),
      }),
    });

    // console.log(this.props.user);

    const profileRowLogin = new ProfileRow({
      label: "Login",
      value: this.props.user?.login,
      input: new Input({
        isProfileRow: true,
        name: "login",
        id: "login",
        value: this.props.user?.login,
        onBlur: (value: string) =>
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
      value: this.props.user?.first_name,
      input: new Input({
        isProfileRow: true,
        name: "first_name",
        id: "first_name",
        value: this.props.user?.first_name,
        onBlur: (value: string) =>
          validationFunctionForField(
            namesValidation,
            value,
            this.children.profileRowName.children.input,
            "First name is wrong",
          ),
      }),
    });

    const profileRowLastName = new ProfileRow({
      label: "Last name",
      value: this.props.user?.second_name,
      input: new Input({
        isProfileRow: true,
        name: "second_name",
        id: "second_name",
        value: this.props.user?.second_name,
        onBlur: (value: string) =>
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
      value: this.props.user?.display_name,
      input: new Input({
        isProfileRow: true,
        name: "display_name",
        id: "display_name",
        value: this.props.user?.display_name,
        onBlur: (value: string) =>
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
      value: this.props.user?.phone,
      input: new Input({
        isProfileRow: true,
        name: "phone",
        id: "phone",
        value: this.props.user?.phone,
        onBlur: (value: string) =>
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
