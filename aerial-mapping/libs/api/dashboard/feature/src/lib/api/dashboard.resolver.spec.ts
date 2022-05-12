//import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
//import { PrismaMock } from '@aerial-mapping/api/shared/services/prisma/data-access';
//import { PrismaService } from '@aerial-mapping/api/shared/services/prisma/data-access';
import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRepository } from '../repository/dashboard-repository';
import { DashboardResolver } from './dashboard.resolver';

//Run 'yarn nx test api-dashboard'
describe('DashboardResolver', () => {
  let resolver: DashboardResolver;

  beforeEach(async () => {
    const module: TestingModule =
     await Test.createTestingModule({
      imports: [],
      providers: [DashboardResolver, DashboardRepository],
    }).compile();

    resolver = module.get<DashboardResolver>(DashboardResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

});

