import { NextResponse } from "next/server";

// database methods
import issue_writeDB from "../../lib/dynamodb";

export async function POST(request) {

    // const {msg_title, msg_description, msg_status, msg_assignee} = await request.json();

    try{
        // call to add issue into database
        await issue_writeDB(request);

        return NextResponse.json({
            responseMsg: ["route.js - success sending message to db"],
            success: true
        });
    } catch(error){
        return NextResponse.json({
            responseMsg: ["route.js - error cannot send message to db"],
            success: false
        });
    }
}