import CollabModel from "./collab-model.js";
import "dotenv/config";
import { connect } from "mongoose";

export async function connectToDB() {
    let mongoDBUri =
        process.env.ENV === "PROD"
            ? process.env.DB_CLOUD_URI
            : process.env.DB_LOCAL_URI;

    await connect(mongoDBUri);
}

export async function createRoom(matchUuid, questionId, userIds) {
    return new CollabModel({ matchUuid, questionId, users }).save();
}

export async function getAllRooms(){
    return CollabModel.find()
}

export async function findRoomsByMatchUuid(matchUuid){
    return CollabModel.find({ matchUuid });
}

export async function findRoomsByQuestionId(questionId){
    // use text-based compound index search via the $text query
    return CollabModel.find({ questionId });
}

export async function findRoomsByUserId(userId){
    return CollabModel.find({ 
        userIds: { $in: [ userId ]} 
    });
}

export async function updateRoomById(id, matchUuid, questionId, userIds) {
    return CollabModel.findByIdAndUpdate(
        id,
        {
            $set: {
                matchUuid,
                questionId,
                userIds,
            },
        },
        { new: true },  // return the updated question
    );
}

export async function deleteRoomById(id) {
    return CollabModel.findByIdAndDelete(id);
}