import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { User } from "@aerial-mapping/api/login/api/shared/interfaces/data-access";
import * as jwt from 'jsonwebtoken';
import bcrypt = require('bcrypt');

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) { }

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

  public async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        user_email: email
      }
    })

    if(user){
      return bcrypt.compare(password, user.user_password).then((res) => {
        if(res){
          return {
            access_token: jwt.sign({ name: email, sub: email }, 'secret-key', { expiresIn: '3600s' })
          }
        }
        return { access_token: null };
      });
    }
    return { access_token: null };
  }
}
