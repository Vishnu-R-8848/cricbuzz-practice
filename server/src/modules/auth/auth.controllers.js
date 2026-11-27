import AuthService from "./auth.services.js";
import env from "../../config/env.js";
import { app_config } from "../../constant/app.constants.js";

export default class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  GoogleCallback = async (req, res, next) => {
    try {
      const { accessToken, refreshToken } =
        await this.authService.CreateUser(req.user);

      res.cookie("refreshToken", refreshToken, app_config.cookie.refreshToken);
      res.cookie("accessToken", accessToken, app_config.cookie.accessToken);

      return res.redirect(env.REDIRECT_URL);
    } catch (error) {
      next(error);
    }
  };
}
