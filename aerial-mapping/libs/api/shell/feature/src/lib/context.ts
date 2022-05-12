import { PrismaClient } from '@prisma/client'
import { Injectable } from '@nestjs/common'

export interface IContext {
  prisma: PrismaClient
}

@Injectable()
export class Context implements IContext {
  prisma = new PrismaClient()
}
