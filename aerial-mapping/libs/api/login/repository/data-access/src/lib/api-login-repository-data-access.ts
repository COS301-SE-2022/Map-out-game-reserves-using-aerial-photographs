import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

  public async createUser(firstname: string, lastname: string, email: string, hashedPassword: string, salt: string, role: string, approved: boolean) {
    //validation
    await this.prisma.user.create({
      data: {
        user_name: firstname,
        user_surname: lastname,
        user_email: email,
        user_password: hashedPassword,
        user_password_salt: salt,
        user_role: role,
        user_approved: approved
      }
    });
    return "Created User!";
  }
}
