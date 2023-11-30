/*
issue - model:
    id - int
    title - string
    description - string
    status - string
    assigned to - string
    created_at - date/string
*/

// AWS SDK V3 - NEXT.JS DEPRECATE V2
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { uid } from "uid"; // https://www.npmjs.com/package/uid

const dbClient = new DynamoDBClient({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

const docClient = DynamoDBDocumentClient.from(dbClient);

// method to write issue to dynamodb database
const issue_writeDB = async(request_msg) => {

    console.log("inside ISSUE WRITEDB");

    // get items
    const {title, description, status, assignee} = await request_msg.json();

    // get current time
    const cur_time_utc = new Date();

    // build issue
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // generate uid for partition key
            'issue_id': uid(5),
            'title': title,
            'description': description,
            'status': status,
            'assignee': assignee,
            'timestamp': cur_time_utc.toISOString(),
            'updated_timestamp': 'N/A'
        }
    };

    // write bug report to db; NO - return promise
    return docClient.send(new PutCommand(params));
};

export default issue_writeDB;