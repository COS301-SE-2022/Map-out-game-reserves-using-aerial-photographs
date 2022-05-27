import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { User } from "@aerial-mapping/api/login/api/shared/interfaces/data-access";
import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) { }

  public async createUser(firstname: string, lastname: string, email: string, password: string, role: string, approved: boolean) {
    let error: Error = null;

    bcrypt.genSalt(10, (err, salt) => {
      if(err){
        error = err;
      }
      bcrypt.hash(password, salt, async(_rr, hash) => {
        if(err){
          error = err;
        }
        await this.prisma.user.create({
          data: {
            user_name: firstname,
            user_surname: lastname,
            user_email: email,
            user_password: hash,
            user_password_salt: salt,
            user_role: role,
            user_approved: approved
          }
        });
      });
    });

    if(error == null){
      return "Created User!";
    }
    return error
  }

  public async getAllUsers(): Promise<User[]|null> {
    return this.prisma.user.findMany({
      select: {
        userID: true,
        user_email: true,
        user_name: true,
        user_surname: true,
        user_role: true,
        user_approved: true,
        user_password: true,
        user_password_salt: true
      }
    });
  }

  public async validateUser(email: string, pass: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email
      }
    });

    if (user && user.user_password === pass) {
      const { user_password, ...result } = user;
      return result;
    }
    return null;
  }

  public async validate(email: string, pass: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email
      }
    })

    if(user){
      if(await bcrypt.compare(pass, user.user_password)){
        return user;
      }
    }
    return null;
  }

  public async login(email: string, password: string) {
    if(await this.validate(email, password) != null) {
      return {
        access_token: jwt.sign({ name: email, sub: email }, 'secret-key', { expiresIn: '3600s' })
      }
    }
    return {
      access_token: null
    }
  }
}
