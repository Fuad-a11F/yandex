import './styles/index.scss';

// Pages
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import { Profile } from './pages/profile';
import { Signin } from './pages/Signin';
import { ErrorPage } from './pages/ErrorPage/index.js';
import { ProfileInfoEdit } from './pages/profile-info-edit/index.js';
import { ProfilePasswordEdit } from './pages/profile-password-edit/index.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#root');

  if (!root) return;

  const definitionRoute = () => {
    const route = window.location.pathname;

    switch (route) {
      case '/':
        // root.innerHTML = Main({ content: 'main' });
        break;
      case '/login':
        root.innerHTML = Login({ content: 'login' });
        break;
      case '/sign-in':
        root.innerHTML = Signin({ content: 'sign-in' });
        break;
      case '/profile':
        root.innerHTML = Profile({ content: 'profile' });
        break;
      case '/profile-info-edit':
        root.innerHTML = ProfileInfoEdit({ content: 'profile-info-edit' });
        break;
      case '/profile-password-edit':
        root.innerHTML = ProfilePasswordEdit({ content: 'profile-password-edit' });
        break;
      default:
        root.innerHTML = ErrorPage({ code: '505', text: 'Мы уже фиксим' });
        break;
    }

    // handlerRoute()
  };

  // const handlerRoute = () => {
  //     const allLink = document.querySelectorAll('a');
  //
  //     allLink.forEach(link => {
  //         link.addEventListener('click', (e) => {
  //             e.preventDefault()
  //             const path = e.currentTarget.getAttribute('data-page');
  //             history.pushState({ page: path }, "", path);
  //
  //             definitionRoute()
  //         })
  //     })
  // }

  definitionRoute();
});
