import UserRepo from "../../repository/user.repository.js";
import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import { app_config } from "../../constant/app.constants.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async CreateUser(user) {
    const email = user.emails?.[0]?.value || user._json?.email;
    const picture = user.photos?.[0]?.value || user._json?.picture;
    const name = user.displayName || user._json?.name;

    let result = await this.userRepo.findByEmail(email);

    if (!result) {
      result = await this.userRepo.create({
        email,
        picture,
        name,
      });
    }

    const data = {
      _id: result._id,
      email: result.email,
      picture: result.picture,
      name: result.name,
    };

    const refreshToken = jwt.sign(
      data,
      env.REFRESH_TOKEN_SECRET,
      app_config.jwt.refreshToken,
    );

    const accessToken = jwt.sign(
      data,
      env.ACCESS_TOKEN_SECRET,
      app_config.jwt.accessToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
