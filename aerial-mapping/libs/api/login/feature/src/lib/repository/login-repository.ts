import { Injectable } from "@nestjs/common";
import { PrismaService } from "@aerial-mapping/api/shared/services/prisma/data-access";
import { User, Video_Collection } from "@prisma/client";

@Injectable()
export class LoginRepository {
  constructor(private prisma: PrismaService) {}

}
