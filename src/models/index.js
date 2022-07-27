// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, GamePark, Message, ImageCollection, FlightDetails, Images, Map, PendingInvites, Connection } = initSchema(schema);

export {
  User,
  GamePark,
  Message,
  ImageCollection,
  FlightDetails,
  Images,
  Map,
  PendingInvites,
  Connection
};