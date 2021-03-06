export const schema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "userID": {
                    "name": "userID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "user_email": {
                    "name": "user_email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "user_password": {
                    "name": "user_password",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "user_password_salt": {
                    "name": "user_password_salt",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "user_name": {
                    "name": "user_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "user_role": {
                    "name": "user_role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "user_approved": {
                    "name": "user_approved",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "userID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byEmail",
                        "queryField": "userByEmail",
                        "fields": [
                            "user_email"
                        ]
                    }
                }
            ]
        },
        "GamePark": {
            "name": "GamePark",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "parkID": {
                    "name": "parkID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "park_name": {
                    "name": "park_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "park_location": {
                    "name": "park_location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "park_address": {
                    "name": "park_address",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "GameParks",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "parkID"
                        ]
                    }
                }
            ]
        },
        "Message": {
            "name": "Message",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "messageID": {
                    "name": "messageID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "message_status": {
                    "name": "message_status",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "message_description": {
                    "name": "message_description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "collectionID": {
                    "name": "collectionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ImageCollection": {
                    "name": "ImageCollection",
                    "isArray": false,
                    "type": {
                        "model": "ImageCollection"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "collectionID",
                        "targetName": "collectionID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Messages",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "messageID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCollectionId",
                        "queryField": "getMessageByCollectionId",
                        "fields": [
                            "collectionID"
                        ]
                    }
                }
            ]
        },
        "ImageCollection": {
            "name": "ImageCollection",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "collectionID": {
                    "name": "collectionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "taskID": {
                    "name": "taskID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "parkID": {
                    "name": "parkID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "GamePark": {
                    "name": "GamePark",
                    "isArray": false,
                    "type": {
                        "model": "GamePark"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "parkID",
                        "targetName": "parkID"
                    }
                },
                "upload_date_time": {
                    "name": "upload_date_time",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": []
                },
                "completed": {
                    "name": "completed",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "error": {
                    "name": "error",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "pending": {
                    "name": "pending",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "flightID": {
                    "name": "flightID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "FlightDetails": {
                    "name": "FlightDetails",
                    "isArray": false,
                    "type": {
                        "model": "FlightDetails"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "flightID",
                        "targetName": "flightID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "ImageCollections",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "collectionID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTaskId",
                        "queryField": "getImageCollectionByTaskId",
                        "fields": [
                            "taskID"
                        ]
                    }
                }
            ]
        },
        "FlightDetails": {
            "name": "FlightDetails",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "flightID": {
                    "name": "flightID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "flight_height": {
                    "name": "flight_height",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "flight_type": {
                    "name": "flight_type",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "pilotID": {
                    "name": "pilotID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Pilot": {
                    "name": "Pilot",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "userID",
                        "targetName": "pilotID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "FlightDetails",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "flightID"
                        ]
                    }
                }
            ]
        },
        "Images": {
            "name": "Images",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imageID": {
                    "name": "imageID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "collectionID": {
                    "name": "collectionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "bucket_name": {
                    "name": "bucket_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "file_name": {
                    "name": "file_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Images",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "imageID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byCollectionId",
                        "queryField": "imagesByCollectionId",
                        "fields": [
                            "collectionID"
                        ]
                    }
                }
            ]
        },
        "Map": {
            "name": "Map",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "mapID": {
                    "name": "mapID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "bucket_name": {
                    "name": "bucket_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "file_name": {
                    "name": "file_name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "collectionID": {
                    "name": "collectionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Collection": {
                    "name": "Collection",
                    "isArray": false,
                    "type": {
                        "model": "ImageCollection"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "collectionID",
                        "targetName": "collectionID"
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Maps",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "mapID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byFileName",
                        "queryField": "getMapByFileName",
                        "fields": [
                            "file_name"
                        ]
                    }
                }
            ]
        },
        "PendingInvites": {
            "name": "PendingInvites",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "inviteID": {
                    "name": "inviteID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": true,
                    "attributes": []
                },
                "role": {
                    "name": "role",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "PendingInvites",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "inviteID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byEmail",
                        "queryField": "getPendingInvitesByEmail",
                        "fields": [
                            "email"
                        ]
                    }
                }
            ]
        },
        "Connection": {
            "name": "Connection",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "connectionID": {
                    "name": "connectionID",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "topic": {
                    "name": "topic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Connections",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "connectionID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byTopic",
                        "queryField": "getConnectionsByTopic",
                        "fields": [
                            "topic"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "version": "43346db7b7c2ec86319a6c9b2d763412"
};