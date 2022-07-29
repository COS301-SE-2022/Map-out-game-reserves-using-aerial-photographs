/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateUser: OnCreateUserSubscription;
  onUpdateUser: OnUpdateUserSubscription;
  onDeleteUser: OnDeleteUserSubscription;
  onCreateGamePark: OnCreateGameParkSubscription;
  onUpdateGamePark: OnUpdateGameParkSubscription;
  onDeleteGamePark: OnDeleteGameParkSubscription;
  onCreateImageCollection: OnCreateImageCollectionSubscription;
  onUpdateImageCollection: OnUpdateImageCollectionSubscription;
  onDeleteImageCollection: OnDeleteImageCollectionSubscription;
  onCreateMap: OnCreateMapSubscription;
  onUpdateMap: OnUpdateMapSubscription;
  onDeleteMap: OnDeleteMapSubscription;
  onCreateMessage: OnCreateMessageSubscription;
  onUpdateMessage: OnUpdateMessageSubscription;
  onDeleteMessage: OnDeleteMessageSubscription;
  onCreateImages: OnCreateImagesSubscription;
  onUpdateImages: OnUpdateImagesSubscription;
  onDeleteImages: OnDeleteImagesSubscription;
  onCreateFlightDetails: OnCreateFlightDetailsSubscription;
  onUpdateFlightDetails: OnUpdateFlightDetailsSubscription;
  onDeleteFlightDetails: OnDeleteFlightDetailsSubscription;
  onCreatePendingInvites: OnCreatePendingInvitesSubscription;
  onUpdatePendingInvites: OnUpdatePendingInvitesSubscription;
  onDeletePendingInvites: OnDeletePendingInvitesSubscription;
  onCreateConnection: OnCreateConnectionSubscription;
  onUpdateConnection: OnUpdateConnectionSubscription;
  onDeleteConnection: OnDeleteConnectionSubscription;
};

export type User = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type FlightDetails = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: User | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type Images = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateUserInput = {
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  _version?: number | null;
};

export type ModelUserConditionInput = {
  user_email?: ModelStringInput | null;
  user_password?: ModelStringInput | null;
  user_password_salt?: ModelStringInput | null;
  user_name?: ModelStringInput | null;
  user_role?: ModelStringInput | null;
  user_approved?: ModelBooleanInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateUserInput = {
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  _version?: number | null;
};

export type DeleteUserInput = {
  userID: string;
  _version?: number | null;
};

export type CreateGameParkInput = {
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  _version?: number | null;
};

export type ModelGameParkConditionInput = {
  park_name?: ModelStringInput | null;
  park_location?: ModelStringInput | null;
  park_address?: ModelStringInput | null;
  and?: Array<ModelGameParkConditionInput | null> | null;
  or?: Array<ModelGameParkConditionInput | null> | null;
  not?: ModelGameParkConditionInput | null;
};

export type GamePark = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateGameParkInput = {
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  _version?: number | null;
};

export type DeleteGameParkInput = {
  parkID: string;
  _version?: number | null;
};

export type CreateImageCollectionInput = {
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  _version?: number | null;
};

export type ModelImageCollectionConditionInput = {
  taskID?: ModelStringInput | null;
  parkID?: ModelStringInput | null;
  upload_date_time?: ModelStringInput | null;
  completed?: ModelBooleanInput | null;
  error?: ModelBooleanInput | null;
  pending?: ModelBooleanInput | null;
  flightID?: ModelStringInput | null;
  and?: Array<ModelImageCollectionConditionInput | null> | null;
  or?: Array<ModelImageCollectionConditionInput | null> | null;
  not?: ModelImageCollectionConditionInput | null;
};

export type ImageCollection = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: GamePark | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: FlightDetails | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateImageCollectionInput = {
  collectionID: string;
  taskID?: string | null;
  parkID?: string | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  _version?: number | null;
};

export type DeleteImageCollectionInput = {
  collectionID: string;
  _version?: number | null;
};

export type CreateMapInput = {
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  _version?: number | null;
};

export type ModelMapConditionInput = {
  bucket_name?: ModelStringInput | null;
  file_name?: ModelStringInput | null;
  collectionID?: ModelStringInput | null;
  and?: Array<ModelMapConditionInput | null> | null;
  or?: Array<ModelMapConditionInput | null> | null;
  not?: ModelMapConditionInput | null;
};

export type Map = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: ImageCollection | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateMapInput = {
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  _version?: number | null;
};

export type DeleteMapInput = {
  mapID: string;
  _version?: number | null;
};

export type CreateMessageInput = {
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  _version?: number | null;
};

export type ModelMessageConditionInput = {
  message_status?: ModelStringInput | null;
  message_description?: ModelStringInput | null;
  collectionID?: ModelStringInput | null;
  and?: Array<ModelMessageConditionInput | null> | null;
  or?: Array<ModelMessageConditionInput | null> | null;
  not?: ModelMessageConditionInput | null;
};

export type Message = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: ImageCollection | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateMessageInput = {
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  _version?: number | null;
};

export type DeleteMessageInput = {
  messageID: string;
  _version?: number | null;
};

export type CreateImagesInput = {
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  _version?: number | null;
};

export type ModelImagesConditionInput = {
  collectionID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  bucket_name?: ModelStringInput | null;
  file_name?: ModelStringInput | null;
  and?: Array<ModelImagesConditionInput | null> | null;
  or?: Array<ModelImagesConditionInput | null> | null;
  not?: ModelImagesConditionInput | null;
};

export type UpdateImagesInput = {
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  _version?: number | null;
};

export type DeleteImagesInput = {
  imageID: string;
  _version?: number | null;
};

export type CreateFlightDetailsInput = {
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  _version?: number | null;
};

export type ModelFlightDetailsConditionInput = {
  flight_height?: ModelFloatInput | null;
  flight_type?: ModelStringInput | null;
  pilotID?: ModelStringInput | null;
  and?: Array<ModelFlightDetailsConditionInput | null> | null;
  or?: Array<ModelFlightDetailsConditionInput | null> | null;
  not?: ModelFlightDetailsConditionInput | null;
};

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateFlightDetailsInput = {
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  _version?: number | null;
};

export type DeleteFlightDetailsInput = {
  flightID: string;
  _version?: number | null;
};

export type CreatePendingInvitesInput = {
  inviteID: string;
  email: string;
  role: string;
  _version?: number | null;
};

export type ModelPendingInvitesConditionInput = {
  email?: ModelStringInput | null;
  role?: ModelStringInput | null;
  and?: Array<ModelPendingInvitesConditionInput | null> | null;
  or?: Array<ModelPendingInvitesConditionInput | null> | null;
  not?: ModelPendingInvitesConditionInput | null;
};

export type PendingInvites = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdatePendingInvitesInput = {
  inviteID: string;
  email?: string | null;
  role?: string | null;
  _version?: number | null;
};

export type DeletePendingInvitesInput = {
  inviteID: string;
  _version?: number | null;
};

export type CreateConnectionInput = {
  connectionID: string;
  topic: string;
  _version?: number | null;
};

export type ModelConnectionConditionInput = {
  topic?: ModelStringInput | null;
  and?: Array<ModelConnectionConditionInput | null> | null;
  or?: Array<ModelConnectionConditionInput | null> | null;
  not?: ModelConnectionConditionInput | null;
};

export type Connection = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateConnectionInput = {
  connectionID: string;
  topic?: string | null;
  _version?: number | null;
};

export type DeleteConnectionInput = {
  connectionID: string;
  _version?: number | null;
};

export type ModelUserFilterInput = {
  userID?: ModelStringInput | null;
  user_email?: ModelStringInput | null;
  user_password?: ModelStringInput | null;
  user_password_salt?: ModelStringInput | null;
  user_name?: ModelStringInput | null;
  user_role?: ModelStringInput | null;
  user_approved?: ModelBooleanInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type ModelUserConnection = {
  __typename: "ModelUserConnection";
  items: Array<User | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelGameParkFilterInput = {
  parkID?: ModelStringInput | null;
  park_name?: ModelStringInput | null;
  park_location?: ModelStringInput | null;
  park_address?: ModelStringInput | null;
  and?: Array<ModelGameParkFilterInput | null> | null;
  or?: Array<ModelGameParkFilterInput | null> | null;
  not?: ModelGameParkFilterInput | null;
};

export type ModelGameParkConnection = {
  __typename: "ModelGameParkConnection";
  items: Array<GamePark | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelImageCollectionFilterInput = {
  collectionID?: ModelStringInput | null;
  taskID?: ModelStringInput | null;
  parkID?: ModelStringInput | null;
  upload_date_time?: ModelStringInput | null;
  completed?: ModelBooleanInput | null;
  error?: ModelBooleanInput | null;
  pending?: ModelBooleanInput | null;
  flightID?: ModelStringInput | null;
  and?: Array<ModelImageCollectionFilterInput | null> | null;
  or?: Array<ModelImageCollectionFilterInput | null> | null;
  not?: ModelImageCollectionFilterInput | null;
};

export type ModelImageCollectionConnection = {
  __typename: "ModelImageCollectionConnection";
  items: Array<ImageCollection | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMapFilterInput = {
  mapID?: ModelStringInput | null;
  bucket_name?: ModelStringInput | null;
  file_name?: ModelStringInput | null;
  collectionID?: ModelStringInput | null;
  and?: Array<ModelMapFilterInput | null> | null;
  or?: Array<ModelMapFilterInput | null> | null;
  not?: ModelMapFilterInput | null;
};

export type ModelMapConnection = {
  __typename: "ModelMapConnection";
  items: Array<Map | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMessageFilterInput = {
  messageID?: ModelStringInput | null;
  message_status?: ModelStringInput | null;
  message_description?: ModelStringInput | null;
  collectionID?: ModelStringInput | null;
  and?: Array<ModelMessageFilterInput | null> | null;
  or?: Array<ModelMessageFilterInput | null> | null;
  not?: ModelMessageFilterInput | null;
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection";
  items: Array<Message | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelImagesFilterInput = {
  imageID?: ModelStringInput | null;
  collectionID?: ModelStringInput | null;
  name?: ModelStringInput | null;
  bucket_name?: ModelStringInput | null;
  file_name?: ModelStringInput | null;
  and?: Array<ModelImagesFilterInput | null> | null;
  or?: Array<ModelImagesFilterInput | null> | null;
  not?: ModelImagesFilterInput | null;
};

export type ModelImagesConnection = {
  __typename: "ModelImagesConnection";
  items: Array<Images | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelFlightDetailsFilterInput = {
  flightID?: ModelStringInput | null;
  flight_height?: ModelFloatInput | null;
  flight_type?: ModelStringInput | null;
  pilotID?: ModelStringInput | null;
  and?: Array<ModelFlightDetailsFilterInput | null> | null;
  or?: Array<ModelFlightDetailsFilterInput | null> | null;
  not?: ModelFlightDetailsFilterInput | null;
};

export type ModelFlightDetailsConnection = {
  __typename: "ModelFlightDetailsConnection";
  items: Array<FlightDetails | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelPendingInvitesFilterInput = {
  inviteID?: ModelStringInput | null;
  email?: ModelStringInput | null;
  role?: ModelStringInput | null;
  and?: Array<ModelPendingInvitesFilterInput | null> | null;
  or?: Array<ModelPendingInvitesFilterInput | null> | null;
  not?: ModelPendingInvitesFilterInput | null;
};

export type ModelPendingInvitesConnection = {
  __typename: "ModelPendingInvitesConnection";
  items: Array<PendingInvites | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelConnectionFilterInput = {
  connectionID?: ModelStringInput | null;
  topic?: ModelStringInput | null;
  and?: Array<ModelConnectionFilterInput | null> | null;
  or?: Array<ModelConnectionFilterInput | null> | null;
  not?: ModelConnectionFilterInput | null;
};

export type ModelConnectionConnection = {
  __typename: "ModelConnectionConnection";
  items: Array<Connection | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type RegisterUserMutation = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateFlightMutation = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateImageMutation = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateUserMutation = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateUserMutation = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteUserMutation = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateGameParkMutation = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateGameParkMutation = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteGameParkMutation = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateImageCollectionMutation = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateImageCollectionMutation = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteImageCollectionMutation = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateMapMutation = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateMapMutation = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteMapMutation = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateMessageMutation = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateMessageMutation = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteMessageMutation = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateImagesMutation = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateImagesMutation = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteImagesMutation = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateFlightDetailsMutation = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateFlightDetailsMutation = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteFlightDetailsMutation = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreatePendingInvitesMutation = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdatePendingInvitesMutation = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeletePendingInvitesMutation = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type CreateConnectionMutation = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateConnectionMutation = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type DeleteConnectionMutation = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetUsersQuery = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetParksQuery = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetMessagesQuery = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetImagesByCollectionIdQuery = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetImageCollectionsQuery = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetImageQuery = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetCataloguesQuery = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type GetUserQuery = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncUsersQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetGameParkQuery = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListGameParksQuery = {
  __typename: "ModelGameParkConnection";
  items: Array<{
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncGameParksQuery = {
  __typename: "ModelGameParkConnection";
  items: Array<{
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetImageCollectionQuery = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListImageCollectionsQuery = {
  __typename: "ModelImageCollectionConnection";
  items: Array<{
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncImageCollectionsQuery = {
  __typename: "ModelImageCollectionConnection";
  items: Array<{
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetMapQuery = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListMapsQuery = {
  __typename: "ModelMapConnection";
  items: Array<{
    __typename: "Map";
    mapID: string;
    bucket_name?: string | null;
    file_name?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncMapsQuery = {
  __typename: "ModelMapConnection";
  items: Array<{
    __typename: "Map";
    mapID: string;
    bucket_name?: string | null;
    file_name?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetMessageQuery = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListMessagesQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    messageID: string;
    message_status?: string | null;
    message_description?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncMessagesQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    messageID: string;
    message_status?: string | null;
    message_description?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetImagesQuery = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListImagesQuery = {
  __typename: "ModelImagesConnection";
  items: Array<{
    __typename: "Images";
    imageID: string;
    collectionID?: string | null;
    name?: string | null;
    bucket_name?: string | null;
    file_name?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncImagesQuery = {
  __typename: "ModelImagesConnection";
  items: Array<{
    __typename: "Images";
    imageID: string;
    collectionID?: string | null;
    name?: string | null;
    bucket_name?: string | null;
    file_name?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetFlightDetailsQuery = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListFlightDetailsQuery = {
  __typename: "ModelFlightDetailsConnection";
  items: Array<{
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncFlightDetailsQuery = {
  __typename: "ModelFlightDetailsConnection";
  items: Array<{
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetPendingInvitesQuery = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListPendingInvitesQuery = {
  __typename: "ModelPendingInvitesConnection";
  items: Array<{
    __typename: "PendingInvites";
    inviteID: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncPendingInvitesQuery = {
  __typename: "ModelPendingInvitesConnection";
  items: Array<{
    __typename: "PendingInvites";
    inviteID: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetConnectionQuery = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type ListConnectionsQuery = {
  __typename: "ModelConnectionConnection";
  items: Array<{
    __typename: "Connection";
    connectionID: string;
    topic: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type SyncConnectionsQuery = {
  __typename: "ModelConnectionConnection";
  items: Array<{
    __typename: "Connection";
    connectionID: string;
    topic: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type UserByEmailQuery = {
  __typename: "ModelUserConnection";
  items: Array<{
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetImageCollectionByTaskIdQuery = {
  __typename: "ModelImageCollectionConnection";
  items: Array<{
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetMapByFileNameQuery = {
  __typename: "ModelMapConnection";
  items: Array<{
    __typename: "Map";
    mapID: string;
    bucket_name?: string | null;
    file_name?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetMessageByCollectionIdQuery = {
  __typename: "ModelMessageConnection";
  items: Array<{
    __typename: "Message";
    messageID: string;
    message_status?: string | null;
    message_description?: string | null;
    collectionID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ImagesByCollectionIdQuery = {
  __typename: "ModelImagesConnection";
  items: Array<{
    __typename: "Images";
    imageID: string;
    collectionID?: string | null;
    name?: string | null;
    bucket_name?: string | null;
    file_name?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetPendingInvitesByEmailQuery = {
  __typename: "ModelPendingInvitesConnection";
  items: Array<{
    __typename: "PendingInvites";
    inviteID: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type GetConnectionsByTopicQuery = {
  __typename: "ModelConnectionConnection";
  items: Array<{
    __typename: "Connection";
    connectionID: string;
    topic: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type OnCreateUserSubscription = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateUserSubscription = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteUserSubscription = {
  __typename: "User";
  userID: string;
  user_email?: string | null;
  user_password?: string | null;
  user_password_salt?: string | null;
  user_name?: string | null;
  user_role?: string | null;
  user_approved?: boolean | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateGameParkSubscription = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateGameParkSubscription = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteGameParkSubscription = {
  __typename: "GamePark";
  parkID: string;
  park_name?: string | null;
  park_location?: string | null;
  park_address?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateImageCollectionSubscription = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateImageCollectionSubscription = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteImageCollectionSubscription = {
  __typename: "ImageCollection";
  collectionID: string;
  taskID: string;
  parkID?: string | null;
  GamePark?: {
    __typename: "GamePark";
    parkID: string;
    park_name?: string | null;
    park_location?: string | null;
    park_address?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  upload_date_time?: string | null;
  completed?: boolean | null;
  error?: boolean | null;
  pending?: boolean | null;
  flightID?: string | null;
  FlightDetails?: {
    __typename: "FlightDetails";
    flightID: string;
    flight_height?: number | null;
    flight_type?: string | null;
    pilotID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateMapSubscription = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateMapSubscription = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteMapSubscription = {
  __typename: "Map";
  mapID: string;
  bucket_name?: string | null;
  file_name?: string | null;
  collectionID?: string | null;
  Collection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateMessageSubscription = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateMessageSubscription = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteMessageSubscription = {
  __typename: "Message";
  messageID: string;
  message_status?: string | null;
  message_description?: string | null;
  collectionID?: string | null;
  ImageCollection?: {
    __typename: "ImageCollection";
    collectionID: string;
    taskID: string;
    parkID?: string | null;
    upload_date_time?: string | null;
    completed?: boolean | null;
    error?: boolean | null;
    pending?: boolean | null;
    flightID?: string | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateImagesSubscription = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateImagesSubscription = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteImagesSubscription = {
  __typename: "Images";
  imageID: string;
  collectionID?: string | null;
  name?: string | null;
  bucket_name?: string | null;
  file_name?: string | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateFlightDetailsSubscription = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateFlightDetailsSubscription = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteFlightDetailsSubscription = {
  __typename: "FlightDetails";
  flightID: string;
  flight_height?: number | null;
  flight_type?: string | null;
  pilotID?: string | null;
  Pilot?: {
    __typename: "User";
    userID: string;
    user_email?: string | null;
    user_password?: string | null;
    user_password_salt?: string | null;
    user_name?: string | null;
    user_role?: string | null;
    user_approved?: boolean | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreatePendingInvitesSubscription = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdatePendingInvitesSubscription = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeletePendingInvitesSubscription = {
  __typename: "PendingInvites";
  inviteID: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnCreateConnectionSubscription = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnUpdateConnectionSubscription = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type OnDeleteConnectionSubscription = {
  __typename: "Connection";
  connectionID: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async Invite(email?: string): Promise<string | null> {
    const statement = `mutation Invite($email: String) {
        invite(email: $email)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.invite;
  }
  async RegisterUser(
    name?: string,
    email?: string,
    password?: string,
    role?: string,
    approved?: boolean
  ): Promise<RegisterUserMutation> {
    const statement = `mutation RegisterUser($name: String, $email: String, $password: String, $role: String, $approved: Boolean) {
        registerUser(name: $name, email: $email, password: $password, role: $role, approved: $approved) {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    if (role) {
      gqlAPIServiceArguments.role = role;
    }
    if (approved) {
      gqlAPIServiceArguments.approved = approved;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <RegisterUserMutation>response.data.registerUser;
  }
  async Login(email?: string, password?: string): Promise<string | null> {
    const statement = `mutation Login($email: String, $password: String) {
        login(email: $email, password: $password)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (email) {
      gqlAPIServiceArguments.email = email;
    }
    if (password) {
      gqlAPIServiceArguments.password = password;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.login;
  }
  async Logout(): Promise<string | null> {
    const statement = `mutation Logout {
        logout
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <string | null>response.data.logout;
  }
  async CreateFlight(
    pilotID?: string,
    height?: number,
    type?: string
  ): Promise<CreateFlightMutation> {
    const statement = `mutation CreateFlight($pilotID: String, $height: Int, $type: String) {
        createFlight(pilotID: $pilotID, height: $height, type: $type) {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (pilotID) {
      gqlAPIServiceArguments.pilotID = pilotID;
    }
    if (height) {
      gqlAPIServiceArguments.height = height;
    }
    if (type) {
      gqlAPIServiceArguments.type = type;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFlightMutation>response.data.createFlight;
  }
  async CreateImage(
    collectionID?: string,
    bucket_name?: string,
    file_name?: string
  ): Promise<CreateImageMutation> {
    const statement = `mutation CreateImage($collectionID: String, $bucket_name: String, $file_name: String) {
        createImage(collectionID: $collectionID, bucket_name: $bucket_name, file_name: $file_name) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (collectionID) {
      gqlAPIServiceArguments.collectionID = collectionID;
    }
    if (bucket_name) {
      gqlAPIServiceArguments.bucket_name = bucket_name;
    }
    if (file_name) {
      gqlAPIServiceArguments.file_name = file_name;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateImageMutation>response.data.createImage;
  }
  async CreateUser(
    input: CreateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<CreateUserMutation> {
    const statement = `mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
        createUser(input: $input, condition: $condition) {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateUserMutation>response.data.createUser;
  }
  async UpdateUser(
    input: UpdateUserInput,
    condition?: ModelUserConditionInput
  ): Promise<UpdateUserMutation> {
    const statement = `mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
        updateUser(input: $input, condition: $condition) {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateUserMutation>response.data.updateUser;
  }
  async DeleteUser(
    input: DeleteUserInput,
    condition?: ModelUserConditionInput
  ): Promise<DeleteUserMutation> {
    const statement = `mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
        deleteUser(input: $input, condition: $condition) {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteUserMutation>response.data.deleteUser;
  }
  async CreateGamePark(
    input: CreateGameParkInput,
    condition?: ModelGameParkConditionInput
  ): Promise<CreateGameParkMutation> {
    const statement = `mutation CreateGamePark($input: CreateGameParkInput!, $condition: ModelGameParkConditionInput) {
        createGamePark(input: $input, condition: $condition) {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateGameParkMutation>response.data.createGamePark;
  }
  async UpdateGamePark(
    input: UpdateGameParkInput,
    condition?: ModelGameParkConditionInput
  ): Promise<UpdateGameParkMutation> {
    const statement = `mutation UpdateGamePark($input: UpdateGameParkInput!, $condition: ModelGameParkConditionInput) {
        updateGamePark(input: $input, condition: $condition) {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateGameParkMutation>response.data.updateGamePark;
  }
  async DeleteGamePark(
    input: DeleteGameParkInput,
    condition?: ModelGameParkConditionInput
  ): Promise<DeleteGameParkMutation> {
    const statement = `mutation DeleteGamePark($input: DeleteGameParkInput!, $condition: ModelGameParkConditionInput) {
        deleteGamePark(input: $input, condition: $condition) {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteGameParkMutation>response.data.deleteGamePark;
  }
  async CreateImageCollection(
    input: CreateImageCollectionInput,
    condition?: ModelImageCollectionConditionInput
  ): Promise<CreateImageCollectionMutation> {
    const statement = `mutation CreateImageCollection($input: CreateImageCollectionInput!, $condition: ModelImageCollectionConditionInput) {
        createImageCollection(input: $input, condition: $condition) {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateImageCollectionMutation>response.data.createImageCollection;
  }
  async UpdateImageCollection(
    input: UpdateImageCollectionInput,
    condition?: ModelImageCollectionConditionInput
  ): Promise<UpdateImageCollectionMutation> {
    const statement = `mutation UpdateImageCollection($input: UpdateImageCollectionInput!, $condition: ModelImageCollectionConditionInput) {
        updateImageCollection(input: $input, condition: $condition) {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateImageCollectionMutation>response.data.updateImageCollection;
  }
  async DeleteImageCollection(
    input: DeleteImageCollectionInput,
    condition?: ModelImageCollectionConditionInput
  ): Promise<DeleteImageCollectionMutation> {
    const statement = `mutation DeleteImageCollection($input: DeleteImageCollectionInput!, $condition: ModelImageCollectionConditionInput) {
        deleteImageCollection(input: $input, condition: $condition) {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteImageCollectionMutation>response.data.deleteImageCollection;
  }
  async CreateMap(
    input: CreateMapInput,
    condition?: ModelMapConditionInput
  ): Promise<CreateMapMutation> {
    const statement = `mutation CreateMap($input: CreateMapInput!, $condition: ModelMapConditionInput) {
        createMap(input: $input, condition: $condition) {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMapMutation>response.data.createMap;
  }
  async UpdateMap(
    input: UpdateMapInput,
    condition?: ModelMapConditionInput
  ): Promise<UpdateMapMutation> {
    const statement = `mutation UpdateMap($input: UpdateMapInput!, $condition: ModelMapConditionInput) {
        updateMap(input: $input, condition: $condition) {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMapMutation>response.data.updateMap;
  }
  async DeleteMap(
    input: DeleteMapInput,
    condition?: ModelMapConditionInput
  ): Promise<DeleteMapMutation> {
    const statement = `mutation DeleteMap($input: DeleteMapInput!, $condition: ModelMapConditionInput) {
        deleteMap(input: $input, condition: $condition) {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMapMutation>response.data.deleteMap;
  }
  async CreateMessage(
    input: CreateMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<CreateMessageMutation> {
    const statement = `mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
        createMessage(input: $input, condition: $condition) {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMessageMutation>response.data.createMessage;
  }
  async UpdateMessage(
    input: UpdateMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<UpdateMessageMutation> {
    const statement = `mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
        updateMessage(input: $input, condition: $condition) {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMessageMutation>response.data.updateMessage;
  }
  async DeleteMessage(
    input: DeleteMessageInput,
    condition?: ModelMessageConditionInput
  ): Promise<DeleteMessageMutation> {
    const statement = `mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
        deleteMessage(input: $input, condition: $condition) {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMessageMutation>response.data.deleteMessage;
  }
  async CreateImages(
    input: CreateImagesInput,
    condition?: ModelImagesConditionInput
  ): Promise<CreateImagesMutation> {
    const statement = `mutation CreateImages($input: CreateImagesInput!, $condition: ModelImagesConditionInput) {
        createImages(input: $input, condition: $condition) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateImagesMutation>response.data.createImages;
  }
  async UpdateImages(
    input: UpdateImagesInput,
    condition?: ModelImagesConditionInput
  ): Promise<UpdateImagesMutation> {
    const statement = `mutation UpdateImages($input: UpdateImagesInput!, $condition: ModelImagesConditionInput) {
        updateImages(input: $input, condition: $condition) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateImagesMutation>response.data.updateImages;
  }
  async DeleteImages(
    input: DeleteImagesInput,
    condition?: ModelImagesConditionInput
  ): Promise<DeleteImagesMutation> {
    const statement = `mutation DeleteImages($input: DeleteImagesInput!, $condition: ModelImagesConditionInput) {
        deleteImages(input: $input, condition: $condition) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteImagesMutation>response.data.deleteImages;
  }
  async CreateFlightDetails(
    input: CreateFlightDetailsInput,
    condition?: ModelFlightDetailsConditionInput
  ): Promise<CreateFlightDetailsMutation> {
    const statement = `mutation CreateFlightDetails($input: CreateFlightDetailsInput!, $condition: ModelFlightDetailsConditionInput) {
        createFlightDetails(input: $input, condition: $condition) {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateFlightDetailsMutation>response.data.createFlightDetails;
  }
  async UpdateFlightDetails(
    input: UpdateFlightDetailsInput,
    condition?: ModelFlightDetailsConditionInput
  ): Promise<UpdateFlightDetailsMutation> {
    const statement = `mutation UpdateFlightDetails($input: UpdateFlightDetailsInput!, $condition: ModelFlightDetailsConditionInput) {
        updateFlightDetails(input: $input, condition: $condition) {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateFlightDetailsMutation>response.data.updateFlightDetails;
  }
  async DeleteFlightDetails(
    input: DeleteFlightDetailsInput,
    condition?: ModelFlightDetailsConditionInput
  ): Promise<DeleteFlightDetailsMutation> {
    const statement = `mutation DeleteFlightDetails($input: DeleteFlightDetailsInput!, $condition: ModelFlightDetailsConditionInput) {
        deleteFlightDetails(input: $input, condition: $condition) {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteFlightDetailsMutation>response.data.deleteFlightDetails;
  }
  async CreatePendingInvites(
    input: CreatePendingInvitesInput,
    condition?: ModelPendingInvitesConditionInput
  ): Promise<CreatePendingInvitesMutation> {
    const statement = `mutation CreatePendingInvites($input: CreatePendingInvitesInput!, $condition: ModelPendingInvitesConditionInput) {
        createPendingInvites(input: $input, condition: $condition) {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreatePendingInvitesMutation>response.data.createPendingInvites;
  }
  async UpdatePendingInvites(
    input: UpdatePendingInvitesInput,
    condition?: ModelPendingInvitesConditionInput
  ): Promise<UpdatePendingInvitesMutation> {
    const statement = `mutation UpdatePendingInvites($input: UpdatePendingInvitesInput!, $condition: ModelPendingInvitesConditionInput) {
        updatePendingInvites(input: $input, condition: $condition) {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdatePendingInvitesMutation>response.data.updatePendingInvites;
  }
  async DeletePendingInvites(
    input: DeletePendingInvitesInput,
    condition?: ModelPendingInvitesConditionInput
  ): Promise<DeletePendingInvitesMutation> {
    const statement = `mutation DeletePendingInvites($input: DeletePendingInvitesInput!, $condition: ModelPendingInvitesConditionInput) {
        deletePendingInvites(input: $input, condition: $condition) {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeletePendingInvitesMutation>response.data.deletePendingInvites;
  }
  async CreateConnection(
    input: CreateConnectionInput,
    condition?: ModelConnectionConditionInput
  ): Promise<CreateConnectionMutation> {
    const statement = `mutation CreateConnection($input: CreateConnectionInput!, $condition: ModelConnectionConditionInput) {
        createConnection(input: $input, condition: $condition) {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateConnectionMutation>response.data.createConnection;
  }
  async UpdateConnection(
    input: UpdateConnectionInput,
    condition?: ModelConnectionConditionInput
  ): Promise<UpdateConnectionMutation> {
    const statement = `mutation UpdateConnection($input: UpdateConnectionInput!, $condition: ModelConnectionConditionInput) {
        updateConnection(input: $input, condition: $condition) {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateConnectionMutation>response.data.updateConnection;
  }
  async DeleteConnection(
    input: DeleteConnectionInput,
    condition?: ModelConnectionConditionInput
  ): Promise<DeleteConnectionMutation> {
    const statement = `mutation DeleteConnection($input: DeleteConnectionInput!, $condition: ModelConnectionConditionInput) {
        deleteConnection(input: $input, condition: $condition) {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteConnectionMutation>response.data.deleteConnection;
  }
  async Test(): Promise<string | null> {
    const statement = `query Test {
        test
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <string | null>response.data.test;
  }
  async GetUsers(): Promise<Array<GetUsersQuery>> {
    const statement = `query GetUsers {
        getUsers {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetUsersQuery>>response.data.getUsers;
  }
  async GetCurrentUserEmail(): Promise<string | null> {
    const statement = `query GetCurrentUserEmail {
        getCurrentUserEmail
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <string | null>response.data.getCurrentUserEmail;
  }
  async GetParks(): Promise<Array<GetParksQuery>> {
    const statement = `query GetParks {
        getParks {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetParksQuery>>response.data.getParks;
  }
  async GetParkId(name?: string): Promise<string | null> {
    const statement = `query GetParkId($name: String) {
        getParkId(name: $name)
      }`;
    const gqlAPIServiceArguments: any = {};
    if (name) {
      gqlAPIServiceArguments.name = name;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <string | null>response.data.getParkId;
  }
  async PingAuthentication(): Promise<string | null> {
    const statement = `query PingAuthentication {
        pingAuthentication
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <string | null>response.data.pingAuthentication;
  }
  async GetMessages(): Promise<Array<GetMessagesQuery>> {
    const statement = `query GetMessages {
        getMessages {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetMessagesQuery>>response.data.getMessages;
  }
  async GetImagesByCollectionId(
    id?: string
  ): Promise<Array<GetImagesByCollectionIdQuery>> {
    const statement = `query GetImagesByCollectionId($id: String) {
        getImagesByCollectionId(id: $id) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (id) {
      gqlAPIServiceArguments.id = id;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <Array<GetImagesByCollectionIdQuery>>(
      response.data.getImagesByCollectionId
    );
  }
  async GetNumOfVidsPerDate(): Promise<number | null> {
    const statement = `query GetNumOfVidsPerDate {
        getNumOfVidsPerDate
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <number | null>response.data.getNumOfVidsPerDate;
  }
  async GetAuthStatus(): Promise<boolean | null> {
    const statement = `query GetAuthStatus {
        getAuthStatus
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <boolean | null>response.data.getAuthStatus;
  }
  async GetImageCollections(): Promise<Array<GetImageCollectionsQuery>> {
    const statement = `query GetImageCollections {
        getImageCollections {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetImageCollectionsQuery>>response.data.getImageCollections;
  }
  async GetImage(imageID?: string): Promise<GetImageQuery> {
    const statement = `query GetImage($imageID: String) {
        getImage(imageID: $imageID) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (imageID) {
      gqlAPIServiceArguments.imageID = imageID;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImageQuery>response.data.getImage;
  }
  async GetCatalogues(): Promise<Array<GetCataloguesQuery>> {
    const statement = `query GetCatalogues {
        getCatalogues {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const response = (await API.graphql(graphqlOperation(statement))) as any;
    return <Array<GetCataloguesQuery>>response.data.getCatalogues;
  }
  async GetUser(userID: string): Promise<GetUserQuery> {
    const statement = `query GetUser($userID: String!) {
        getUser(userID: $userID) {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      userID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetUserQuery>response.data.getUser;
  }
  async ListUsers(
    userID?: string,
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListUsersQuery> {
    const statement = `query ListUsers($userID: String, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listUsers(userID: $userID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (userID) {
      gqlAPIServiceArguments.userID = userID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListUsersQuery>response.data.listUsers;
  }
  async SyncUsers(
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncUsersQuery> {
    const statement = `query SyncUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncUsers(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncUsersQuery>response.data.syncUsers;
  }
  async GetGamePark(parkID: string): Promise<GetGameParkQuery> {
    const statement = `query GetGamePark($parkID: String!) {
        getGamePark(parkID: $parkID) {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      parkID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetGameParkQuery>response.data.getGamePark;
  }
  async ListGameParks(
    parkID?: string,
    filter?: ModelGameParkFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListGameParksQuery> {
    const statement = `query ListGameParks($parkID: String, $filter: ModelGameParkFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listGameParks(parkID: $parkID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (parkID) {
      gqlAPIServiceArguments.parkID = parkID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListGameParksQuery>response.data.listGameParks;
  }
  async SyncGameParks(
    filter?: ModelGameParkFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncGameParksQuery> {
    const statement = `query SyncGameParks($filter: ModelGameParkFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncGameParks(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncGameParksQuery>response.data.syncGameParks;
  }
  async GetImageCollection(
    collectionID: string
  ): Promise<GetImageCollectionQuery> {
    const statement = `query GetImageCollection($collectionID: String!) {
        getImageCollection(collectionID: $collectionID) {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      collectionID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImageCollectionQuery>response.data.getImageCollection;
  }
  async ListImageCollections(
    collectionID?: string,
    filter?: ModelImageCollectionFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListImageCollectionsQuery> {
    const statement = `query ListImageCollections($collectionID: String, $filter: ModelImageCollectionFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listImageCollections(collectionID: $collectionID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (collectionID) {
      gqlAPIServiceArguments.collectionID = collectionID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListImageCollectionsQuery>response.data.listImageCollections;
  }
  async SyncImageCollections(
    filter?: ModelImageCollectionFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncImageCollectionsQuery> {
    const statement = `query SyncImageCollections($filter: ModelImageCollectionFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncImageCollections(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncImageCollectionsQuery>response.data.syncImageCollections;
  }
  async GetMap(mapID: string): Promise<GetMapQuery> {
    const statement = `query GetMap($mapID: String!) {
        getMap(mapID: $mapID) {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      mapID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMapQuery>response.data.getMap;
  }
  async ListMaps(
    mapID?: string,
    filter?: ModelMapFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListMapsQuery> {
    const statement = `query ListMaps($mapID: String, $filter: ModelMapFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listMaps(mapID: $mapID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            mapID
            bucket_name
            file_name
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (mapID) {
      gqlAPIServiceArguments.mapID = mapID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMapsQuery>response.data.listMaps;
  }
  async SyncMaps(
    filter?: ModelMapFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncMapsQuery> {
    const statement = `query SyncMaps($filter: ModelMapFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncMaps(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            mapID
            bucket_name
            file_name
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncMapsQuery>response.data.syncMaps;
  }
  async GetMessage(messageID: string): Promise<GetMessageQuery> {
    const statement = `query GetMessage($messageID: String!) {
        getMessage(messageID: $messageID) {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      messageID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMessageQuery>response.data.getMessage;
  }
  async ListMessages(
    messageID?: string,
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListMessagesQuery> {
    const statement = `query ListMessages($messageID: String, $filter: ModelMessageFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listMessages(messageID: $messageID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            messageID
            message_status
            message_description
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (messageID) {
      gqlAPIServiceArguments.messageID = messageID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMessagesQuery>response.data.listMessages;
  }
  async SyncMessages(
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncMessagesQuery> {
    const statement = `query SyncMessages($filter: ModelMessageFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncMessages(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            messageID
            message_status
            message_description
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncMessagesQuery>response.data.syncMessages;
  }
  async GetImages(imageID: string): Promise<GetImagesQuery> {
    const statement = `query GetImages($imageID: String!) {
        getImages(imageID: $imageID) {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      imageID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImagesQuery>response.data.getImages;
  }
  async ListImages(
    imageID?: string,
    filter?: ModelImagesFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListImagesQuery> {
    const statement = `query ListImages($imageID: String, $filter: ModelImagesFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listImages(imageID: $imageID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            imageID
            collectionID
            name
            bucket_name
            file_name
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (imageID) {
      gqlAPIServiceArguments.imageID = imageID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListImagesQuery>response.data.listImages;
  }
  async SyncImages(
    filter?: ModelImagesFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncImagesQuery> {
    const statement = `query SyncImages($filter: ModelImagesFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncImages(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            imageID
            collectionID
            name
            bucket_name
            file_name
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncImagesQuery>response.data.syncImages;
  }
  async GetFlightDetails(flightID: string): Promise<GetFlightDetailsQuery> {
    const statement = `query GetFlightDetails($flightID: String!) {
        getFlightDetails(flightID: $flightID) {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      flightID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetFlightDetailsQuery>response.data.getFlightDetails;
  }
  async ListFlightDetails(
    flightID?: string,
    filter?: ModelFlightDetailsFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListFlightDetailsQuery> {
    const statement = `query ListFlightDetails($flightID: String, $filter: ModelFlightDetailsFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listFlightDetails(flightID: $flightID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (flightID) {
      gqlAPIServiceArguments.flightID = flightID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListFlightDetailsQuery>response.data.listFlightDetails;
  }
  async SyncFlightDetails(
    filter?: ModelFlightDetailsFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncFlightDetailsQuery> {
    const statement = `query SyncFlightDetails($filter: ModelFlightDetailsFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncFlightDetails(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncFlightDetailsQuery>response.data.syncFlightDetails;
  }
  async GetPendingInvites(inviteID: string): Promise<GetPendingInvitesQuery> {
    const statement = `query GetPendingInvites($inviteID: String!) {
        getPendingInvites(inviteID: $inviteID) {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      inviteID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPendingInvitesQuery>response.data.getPendingInvites;
  }
  async ListPendingInvites(
    inviteID?: string,
    filter?: ModelPendingInvitesFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListPendingInvitesQuery> {
    const statement = `query ListPendingInvites($inviteID: String, $filter: ModelPendingInvitesFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listPendingInvites(inviteID: $inviteID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            inviteID
            email
            role
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (inviteID) {
      gqlAPIServiceArguments.inviteID = inviteID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListPendingInvitesQuery>response.data.listPendingInvites;
  }
  async SyncPendingInvites(
    filter?: ModelPendingInvitesFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncPendingInvitesQuery> {
    const statement = `query SyncPendingInvites($filter: ModelPendingInvitesFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncPendingInvites(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            inviteID
            email
            role
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncPendingInvitesQuery>response.data.syncPendingInvites;
  }
  async GetConnection(connectionID: string): Promise<GetConnectionQuery> {
    const statement = `query GetConnection($connectionID: String!) {
        getConnection(connectionID: $connectionID) {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      connectionID
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetConnectionQuery>response.data.getConnection;
  }
  async ListConnections(
    connectionID?: string,
    filter?: ModelConnectionFilterInput,
    limit?: number,
    nextToken?: string,
    sortDirection?: ModelSortDirection
  ): Promise<ListConnectionsQuery> {
    const statement = `query ListConnections($connectionID: String, $filter: ModelConnectionFilterInput, $limit: Int, $nextToken: String, $sortDirection: ModelSortDirection) {
        listConnections(connectionID: $connectionID, filter: $filter, limit: $limit, nextToken: $nextToken, sortDirection: $sortDirection) {
          __typename
          items {
            __typename
            connectionID
            topic
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (connectionID) {
      gqlAPIServiceArguments.connectionID = connectionID;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListConnectionsQuery>response.data.listConnections;
  }
  async SyncConnections(
    filter?: ModelConnectionFilterInput,
    limit?: number,
    nextToken?: string,
    lastSync?: number
  ): Promise<SyncConnectionsQuery> {
    const statement = `query SyncConnections($filter: ModelConnectionFilterInput, $limit: Int, $nextToken: String, $lastSync: AWSTimestamp) {
        syncConnections(filter: $filter, limit: $limit, nextToken: $nextToken, lastSync: $lastSync) {
          __typename
          items {
            __typename
            connectionID
            topic
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    if (lastSync) {
      gqlAPIServiceArguments.lastSync = lastSync;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <SyncConnectionsQuery>response.data.syncConnections;
  }
  async UserByEmail(
    user_email: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelUserFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<UserByEmailQuery> {
    const statement = `query UserByEmail($user_email: String!, $sortDirection: ModelSortDirection, $filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        userByEmail(user_email: $user_email, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      user_email
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UserByEmailQuery>response.data.userByEmail;
  }
  async GetImageCollectionByTaskId(
    taskID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImageCollectionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetImageCollectionByTaskIdQuery> {
    const statement = `query GetImageCollectionByTaskId($taskID: String!, $sortDirection: ModelSortDirection, $filter: ModelImageCollectionFilterInput, $limit: Int, $nextToken: String) {
        getImageCollectionByTaskId(taskID: $taskID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      taskID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetImageCollectionByTaskIdQuery>(
      response.data.getImageCollectionByTaskId
    );
  }
  async GetMapByFileName(
    file_name: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelMapFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetMapByFileNameQuery> {
    const statement = `query GetMapByFileName($file_name: String!, $sortDirection: ModelSortDirection, $filter: ModelMapFilterInput, $limit: Int, $nextToken: String) {
        getMapByFileName(file_name: $file_name, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            mapID
            bucket_name
            file_name
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      file_name
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMapByFileNameQuery>response.data.getMapByFileName;
  }
  async GetMessageByCollectionId(
    collectionID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelMessageFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetMessageByCollectionIdQuery> {
    const statement = `query GetMessageByCollectionId($collectionID: String!, $sortDirection: ModelSortDirection, $filter: ModelMessageFilterInput, $limit: Int, $nextToken: String) {
        getMessageByCollectionId(collectionID: $collectionID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            messageID
            message_status
            message_description
            collectionID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      collectionID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMessageByCollectionIdQuery>(
      response.data.getMessageByCollectionId
    );
  }
  async ImagesByCollectionId(
    collectionID: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelImagesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ImagesByCollectionIdQuery> {
    const statement = `query ImagesByCollectionId($collectionID: String!, $sortDirection: ModelSortDirection, $filter: ModelImagesFilterInput, $limit: Int, $nextToken: String) {
        imagesByCollectionId(collectionID: $collectionID, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            imageID
            collectionID
            name
            bucket_name
            file_name
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      collectionID
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ImagesByCollectionIdQuery>response.data.imagesByCollectionId;
  }
  async GetPendingInvitesByEmail(
    email: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelPendingInvitesFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetPendingInvitesByEmailQuery> {
    const statement = `query GetPendingInvitesByEmail($email: AWSEmail!, $sortDirection: ModelSortDirection, $filter: ModelPendingInvitesFilterInput, $limit: Int, $nextToken: String) {
        getPendingInvitesByEmail(email: $email, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            inviteID
            email
            role
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      email
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetPendingInvitesByEmailQuery>(
      response.data.getPendingInvitesByEmail
    );
  }
  async GetConnectionsByTopic(
    topic: string,
    sortDirection?: ModelSortDirection,
    filter?: ModelConnectionFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<GetConnectionsByTopicQuery> {
    const statement = `query GetConnectionsByTopic($topic: String!, $sortDirection: ModelSortDirection, $filter: ModelConnectionFilterInput, $limit: Int, $nextToken: String) {
        getConnectionsByTopic(topic: $topic, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            connectionID
            topic
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          nextToken
          startedAt
        }
      }`;
    const gqlAPIServiceArguments: any = {
      topic
    };
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetConnectionsByTopicQuery>response.data.getConnectionsByTopic;
  }
  OnCreateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateUser {
        onCreateUser {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateUser">>
  >;

  OnUpdateUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateUser {
        onUpdateUser {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateUser">>
  >;

  OnDeleteUserListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteUser {
        onDeleteUser {
          __typename
          userID
          user_email
          user_password
          user_password_salt
          user_name
          user_role
          user_approved
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteUser">>
  >;

  OnCreateGameParkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateGamePark">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateGamePark {
        onCreateGamePark {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateGamePark">>
  >;

  OnUpdateGameParkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateGamePark">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateGamePark {
        onUpdateGamePark {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateGamePark">>
  >;

  OnDeleteGameParkListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteGamePark">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteGamePark {
        onDeleteGamePark {
          __typename
          parkID
          park_name
          park_location
          park_address
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteGamePark">>
  >;

  OnCreateImageCollectionListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateImageCollection">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateImageCollection {
        onCreateImageCollection {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreateImageCollection">
    >
  >;

  OnUpdateImageCollectionListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateImageCollection">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateImageCollection {
        onUpdateImageCollection {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdateImageCollection">
    >
  >;

  OnDeleteImageCollectionListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteImageCollection">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteImageCollection {
        onDeleteImageCollection {
          __typename
          collectionID
          taskID
          parkID
          GamePark {
            __typename
            parkID
            park_name
            park_location
            park_address
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          upload_date_time
          completed
          error
          pending
          flightID
          FlightDetails {
            __typename
            flightID
            flight_height
            flight_type
            pilotID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeleteImageCollection">
    >
  >;

  OnCreateMapListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMap">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateMap {
        onCreateMap {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMap">>
  >;

  OnUpdateMapListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMap">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMap {
        onUpdateMap {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMap">>
  >;

  OnDeleteMapListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMap">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMap {
        onDeleteMap {
          __typename
          mapID
          bucket_name
          file_name
          collectionID
          Collection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMap">>
  >;

  OnCreateMessageListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessage">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateMessage {
        onCreateMessage {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateMessage">>
  >;

  OnUpdateMessageListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessage">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMessage {
        onUpdateMessage {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateMessage">>
  >;

  OnDeleteMessageListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessage">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMessage {
        onDeleteMessage {
          __typename
          messageID
          message_status
          message_description
          collectionID
          ImageCollection {
            __typename
            collectionID
            taskID
            parkID
            upload_date_time
            completed
            error
            pending
            flightID
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteMessage">>
  >;

  OnCreateImagesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImages">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateImages {
        onCreateImages {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateImages">>
  >;

  OnUpdateImagesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImages">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateImages {
        onUpdateImages {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateImages">>
  >;

  OnDeleteImagesListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImages">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteImages {
        onDeleteImages {
          __typename
          imageID
          collectionID
          name
          bucket_name
          file_name
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteImages">>
  >;

  OnCreateFlightDetailsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFlightDetails">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateFlightDetails {
        onCreateFlightDetails {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateFlightDetails">>
  >;

  OnUpdateFlightDetailsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFlightDetails">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateFlightDetails {
        onUpdateFlightDetails {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateFlightDetails">>
  >;

  OnDeleteFlightDetailsListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFlightDetails">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteFlightDetails {
        onDeleteFlightDetails {
          __typename
          flightID
          flight_height
          flight_type
          pilotID
          Pilot {
            __typename
            userID
            user_email
            user_password
            user_password_salt
            user_name
            user_role
            user_approved
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteFlightDetails">>
  >;

  OnCreatePendingInvitesListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreatePendingInvites">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreatePendingInvites {
        onCreatePendingInvites {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onCreatePendingInvites">
    >
  >;

  OnUpdatePendingInvitesListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdatePendingInvites">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdatePendingInvites {
        onUpdatePendingInvites {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onUpdatePendingInvites">
    >
  >;

  OnDeletePendingInvitesListener: Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeletePendingInvites">
    >
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeletePendingInvites {
        onDeletePendingInvites {
          __typename
          inviteID
          email
          role
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<
      Pick<__SubscriptionContainer, "onDeletePendingInvites">
    >
  >;

  OnCreateConnectionListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateConnection">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateConnection {
        onCreateConnection {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateConnection">>
  >;

  OnUpdateConnectionListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateConnection">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateConnection {
        onUpdateConnection {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateConnection">>
  >;

  OnDeleteConnectionListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteConnection">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteConnection {
        onDeleteConnection {
          __typename
          connectionID
          topic
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteConnection">>
  >;
}
