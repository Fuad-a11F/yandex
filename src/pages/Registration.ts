import Block from "../core/Block";
import Validator from "../core/Validator";
import Store, { StoreEvents } from "../core/Store";

import EntryItem from "../components/EntryItem";
import FormButton from "../components/FormButton";

import authControllers from "../controllers/authControllers";

class Registration extends Block {
    constructor() {

        const itemList = [
            new EntryItem({
                type: "email",
                name: "email",
                title: "Почта",
            }),
            new EntryItem({
                type: "text",
                name: "login",
                title: "Логин",
            }),
            new EntryItem({
                type: "text",
                name: "first_name",
                title: "Имя",
            }),
            new EntryItem({
                type: "text",
                name: "second_name",
                title: "Фамилия",
            }),
            new EntryItem({
                type: "text",
                name: "phone",
                title: "Телефон",
            }),
            new EntryItem({
                type: "password",
                name: "password",
                title: "Пароль",
            }),
        ];

        const formButton = new FormButton({
            text: "Зарегистрироваться",
            events: {
                click: (e: Event) => {
                    e.preventDefault();

                    const data = Validator.validateForm("entry__form");

                    if (data) {
                        authControllers.registration(data);
                    }
                },
            },
        });

        super({ itemList, formButton });

        Store.on(StoreEvents.Updated, () => {
            this.setProps(Store.getState());
        });
    };

    render() {
        return this.compile(`
            <main class="entry">
                <div class="entry__container">
                    <h2 class="entry__title">
                        Регистрация
                    </h2>
                    <form class="entry__form">
                        <ul class="entry__list">
                            {{#each itemList}}
                                {{{this}}}
                            {{/each}}
                        </ul>
                        <div class="entry__choice">
                            {{{formButton}}}
                            <a href="/" class="entry__choice-link">
                                Войти
                            </a>
                        </div>
                    </form>
                </div>
                {{#if server-error}}
                    <div class="server-error">
                        {{{server-error}}}
                    </div>
                {{/if}}
            </main>
        `, { ...this.props });
    };
};

export default Registration;
