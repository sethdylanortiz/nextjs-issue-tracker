/*
issue - model:
    id - int
    title - string
    description - string
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
const issue_write = async(request_msg) => {

    // get current time
    const cur_time_utc = new Date();

    // build issue
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            // generate uid for partition key
            'issue_id': uid(5),
            'title': request_msg.title,
            'description': request_msg.description,
            'assignee': request_msg.assignee,
            'timestamp': cur_time_utc.toISOString()
        }
    };

    // write bug report to db; NO - return promise
    return docClient.send(new PutCommand(params));
};

export default issue_write;