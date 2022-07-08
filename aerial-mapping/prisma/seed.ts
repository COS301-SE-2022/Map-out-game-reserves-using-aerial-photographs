import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//insert into db
async function main() {
  // USERS

  //email: correct@email.com
  //password: 123456

  await prisma.user.create({
    data: {
      userID: 1,
      user_email: 'correct@email.com',
      user_password: '$2b$10$xQnDMeFz9oQENCk.DqIiuOdiTjMqOeuCpFfzlo4Sk4q0.jSzOg40i',
      user_password_salt: '$2b$10$xQnDMeFz9oQENCk.DqIiuO',
      user_name: 'Dylan Pietersen',
      user_role: 'user'
    }
  });

  //email: admin@email.com
  //password: 123456

  await prisma.user.create({
    data: {
      userID: 2,
      user_email: 'admin@email.com',
      user_password: '$2b$10$xQnDMeFz9oQENCk.DqIiuOdiTjMqOeuCpFfzlo4Sk4q0.jSzOg40i',
      user_password_salt: '$2b$10$xQnDMeFz9oQENCk.DqIiuO',
      user_name: 'Steven Schormann',
      user_role: 'admin'
    }
  });

  // FLIGHT DETAILS

  await prisma.flight_Details.create({      //#1
    data: {
      flightID: 1,
      flight_height: 100,
      flight_type: 'Drone',
      pilotID: 1,
    }
  });

  await prisma.flight_Details.create({      //#2
    data: {
      flightID: 2,
      flight_height: 250,
      flight_type: 'Plane',
      pilotID: 1,
    }
  });

  // GAME PARKS

  await prisma.game_Park.create({          //#1
    data: {
      parkID: 1,
      park_name: 'Rietvlei',
      park_location: 'South Africa',
      park_address: '123 street',
    }
  });

  await prisma.game_Park.create({          //#2
    data: {
      parkID: 2,
      park_name: 'Kruger National Park',
      park_location: 'South Africa',
      park_address: '456 street',
    }
  });

  // IMAGE COLLECTIONS

  await prisma.image_Collection.create({          //#1
    data: {
      collectionID: 1,
      parkID: 1,
      name: 'Collection one',
      upload_date_time: '2022-06-09T09:03:42.340Z',
      completed: false,
      flightID: 1
    }
  });

  await prisma.image_Collection.create({          //#2
    data: {
      collectionID: 2,
      parkID: 2,
      name: 'Collection two',
      upload_date_time: '2022-05-10T10:13:42.340Z',
      completed: false,
      flightID: 1
    }
  });

  // IMAGES

  await prisma.images.create({        //#1
    data: {
      collectionID: 1,
      bucket_name: 'dylpickles-image-bucket',
      file_name: 'drone.png',
    }
  });

  await prisma.images.create({        //#2
    data: {
      collectionID: 1,
      bucket_name: 'dylpickles-image-bucket',
      file_name: 'drone.png',
    }
  });

  await prisma.images.create({        //#3
    data: {
      collectionID: 2,
      bucket_name: 'dylpickles-image-bucket',
      file_name: 'drone.png',
    }
  });

}










main().catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
