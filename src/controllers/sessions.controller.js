import sessionsServices from "../dao/mongo/services/sessions.services.js"
import { createHash, generateToken, isValidPassword } from "../utils.js"

export const login = async (req, res) => {
    const { email, password } = req.body
    return await sessionsServices.login(email, password, res)

}

export const loginGitHub = async (req, res) => {
    const user = req.user
    return await sessionsServices.loginGitHub(user, res)

}

export const signup = async (req, res) => {
    const { firstName, lastName, age, email, password } = req.body
    return await sessionsServices.signup(firstName, lastName, age, email, password, res)
}

export const forgot = async (req, res) => {
    const { email, newPassword } = req.body
    return await sessionsServices.forgot(email, newPassword, res)

}

export const logout = async (req, res) => {
    return await sessionsServices.logout(res)
}
