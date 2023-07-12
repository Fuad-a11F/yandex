import { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import { User } from '../api/AuthAPI'
import store from '../utils/Store'
import router from '../utils/Router'
import MessagesController from './MessagesController'

class AuthController {
  private readonly api: AuthAPI

  constructor() {
    this.api = new AuthAPI()
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data)
      const user = await this.fetchUser()
      return {
        success: true,
        user,
        error: null,
      }
    } catch (error: any) {
      return {
        success: false,
        user: null,
        error,
      }
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data)
      const user = await this.fetchUser()
      return {
        success: true,
        user,
        error: null,
      }
    } catch (error: any) {
      return {
        success: false,
        user: null,
        error,
      }
    }
  }

  async fetchUser() {
    const user = await this.api.read()
    store.set('user', user)
    return user
  }

  async editUser(data: Omit<User, 'id' | 'avatar'>) {
    const user = await this.api.edit(data)
    store.set('user', user)
    return user
  }

  async logout() {
    try {
      MessagesController.closeAll()

      await this.api.logout()

      router.go('/')
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

const controller = new AuthController()

// @ts-ignore
window.authController = controller

export default controller
