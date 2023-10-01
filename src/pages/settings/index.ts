import HandleBars from "handlebars";
import {settings} from "./tmpl/settings.tmpl.ts";
import {Logo} from "../../components/logo";
import {Link} from "../../components/link";
import {Button} from "../../components/button";
import {Input, InputProps} from "../../components/input";

const signUpFieldList =
    [
        {
            placeholder: "first name",
            type: 'text'
        },
        {
            placeholder: 'second name',
            type: 'text'
        },
        {
            placeholder: 'login',
            type: 'text'
        },
        {
            placeholder: 'email',
            type: 'email'
        },
        {
            placeholder: 'phone',
            type: 'phone'
        },
        {
            placeholder: 'password(min.6 charact.)',
            type: 'password'
        },
    
    ] as InputProps
export const SettingsPage = () => {
    return HandleBars.compile(settings)({
        logo: Logo(),
        authPageLink: Link({to: '/auth', content: 'or Sign In'}),
        button: Button({text: 'Save'}),
        input: Input(signUpFieldList),
    })
}