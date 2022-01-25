// pages/api/register.js
import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ListTablesCommand,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';

const REGION = 'us-east-1';

export default function handler(req, res) {
  console.log(process.env.AWS_ACCESS_KEY_ID_MA);
  const ddbClient = new DynamoDBClient({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_MA,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_MA,
    region: REGION,
  });
  const createCommand = async (p) => {
    try {
      const data = await ddbClient.send(new PutItemCommand(p));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCommand = async (p) => {
    try {
      const data = await ddbClient.send(new DeleteItemCommand(p));
    } catch (err) {
      console.log(err);
    }
  };

  const readCommand = async (p) => {
    try {
      const data = await ddbClient.send(new GetItemCommand(p));
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCommand = async (p) => {
    try {
      const data = await ddbClient.send(new UpdateItemCommand(p));
    } catch (err) {
      console.log(err);
    }
  };
  let params = null;
  switch (req.body.action) {
    case 'createUser':
      params = {
        TableName: 'users',
        Item: {
          userid: { S: req.body.userid },
          email: { S: req.body.email },
          name: { S: req.body.name },
          role: { S: req.body.role },
        },
      };
      createCommand(params);
      res.status(200).json({ result: 'success' });
      break;
    case 'createDocument':
      params = {
        TableName: 'documents',
        Item: {
          title: { S: req.body.title },
          author: { S: req.body.author },
          topic: { S: req.body.topic },
          body: { S: req.body.body },
        },
      };
      createCommand(params);
      res.status(200).json({ result: 'success' });
      break;
    case 'deleteDocument':
      params = {
        TableName: 'documents',
        Key: {
          title: { S: req.body.title },
          author: { S: req.body.author },
        },
      };
      deleteCommand(params);
      break;
    case 'readDocument':
      params = {
        TableName: 'documents',
        Key: {
          title: { S: req.body.title },
          author: { S: req.body.author },
        },
      };
      readCommand(params);
      break;
    case 'updateDocument':
      params = {
        TableName: 'documents',
        Key: {
          title: { S: req.body.title },
          author: { S: req.body.author },
        },
        UpdateExpression: 'set body = :body',
        ExpressionAttributeValues: {
          ':body': { S: req.body.body },
        },
        ReturnValues: 'ALL_NEW',
      };
      updateCommand(params);
      res.status(200).json({ result: 'success' });
      break;
    default:
      res.status(200).json({ result: 'nothing happened' });
      break;
  }
}
