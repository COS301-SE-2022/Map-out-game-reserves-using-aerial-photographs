import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import bcrypt = require('bcrypt');

@Injectable()
export class RegisterRepository {
  constructor(private prisma: PrismaService) { }

  public async invite(email: string) {
    //send email to email param with registration link

    //add invite to database
    await this.prisma.pending_Invites.create({
      data: {
        invite_email: email
      }
    });

    return "Created Invite!";
  }

  public async createUser(firstname: string, lastname: string, email: string, password: string, role: string, approved: boolean) {
    let error: Error|null = null;

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
    return error;
  }

}
