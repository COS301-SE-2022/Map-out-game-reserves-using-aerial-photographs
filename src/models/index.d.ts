import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type GameParkMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImageCollectionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FlightDetailsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ImagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PendingInvitesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class User {
  readonly id: string;
  readonly userID: string;
  readonly user_email?: string | null;
  readonly user_password?: string | null;
  readonly user_password_salt?: string | null;
  readonly user_name?: string | null;
  readonly user_role?: string | null;
  readonly user_approved?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class GamePark {
  readonly id: string;
  readonly parkID: string;
  readonly park_name?: string | null;
  readonly park_location?: string | null;
  readonly park_address?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<GamePark, GameParkMetaData>);
  static copyOf(source: GamePark, mutator: (draft: MutableModel<GamePark, GameParkMetaData>) => MutableModel<GamePark, GameParkMetaData> | void): GamePark;
}

export declare class Message {
  readonly id: string;
  readonly messageID: string;
  readonly message_status?: string | null;
  readonly message_description?: string | null;
  readonly ImageCollection?: ImageCollection | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly messageImageCollectionId?: string | null;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ImageCollection {
  readonly id: string;
  readonly collectionID: string;
  readonly parkID?: string | null;
  readonly GamePark?: GamePark | null;
  readonly upload_date_time?: string | null;
  readonly completed?: boolean | null;
  readonly flightID?: string | null;
  readonly FlightDetails?: FlightDetails | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ImageCollection, ImageCollectionMetaData>);
  static copyOf(source: ImageCollection, mutator: (draft: MutableModel<ImageCollection, ImageCollectionMetaData>) => MutableModel<ImageCollection, ImageCollectionMetaData> | void): ImageCollection;
}

export declare class FlightDetails {
  readonly id: string;
  readonly flightID: string;
  readonly flight_height?: number | null;
  readonly flight_type?: string | null;
  readonly pilotID?: string | null;
  readonly Pilot?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<FlightDetails, FlightDetailsMetaData>);
  static copyOf(source: FlightDetails, mutator: (draft: MutableModel<FlightDetails, FlightDetailsMetaData>) => MutableModel<FlightDetails, FlightDetailsMetaData> | void): FlightDetails;
}

export declare class Images {
  readonly id: string;
  readonly imageID: string;
  readonly collectionID?: string | null;
  readonly name?: string | null;
  readonly bucket_name?: string | null;
  readonly file_name?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Images, ImagesMetaData>);
  static copyOf(source: Images, mutator: (draft: MutableModel<Images, ImagesMetaData>) => MutableModel<Images, ImagesMetaData> | void): Images;
}

export declare class PendingInvites {
  readonly id: string;
  readonly inviteID: string;
  readonly email: string;
  readonly role: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PendingInvites, PendingInvitesMetaData>);
  static copyOf(source: PendingInvites, mutator: (draft: MutableModel<PendingInvites, PendingInvitesMetaData>) => MutableModel<PendingInvites, PendingInvitesMetaData> | void): PendingInvites;
}