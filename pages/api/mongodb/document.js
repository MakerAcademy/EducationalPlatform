import { useState } from 'react';
import clientPromise from '../../../lib/mongodb';
import ObjectId from 'mongodb';

async function getMongoDBConnection() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  return db;
}

export default async function handler(req, res) {
  const db = await getMongoDBConnection();
  switch (req.method) {
    case 'GET':
      return getDocuments(req, res, db);
    case 'POST':
      return addDocument(req, res, db);
    case 'PUT':
      return updateDocument(req, res, db);
    case 'DELETE':
      return deleteDocument(req, res, db);
  }
}

async function getDocuments(req, res, db) {
  try {
    let posts = await db.collection('documents').find({}).toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function addDocument(req, res, db) {
  try {
    await db.collection('documents').insertOne(JSON.parse(req.body));
    return res.json({
      message: 'Document Successfully Submitted',
      success: true,
    });
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function updateDocument(req, res, db) {
  try {
    db.collections('documents').updateOne(
      {
        title: req.body.title,
        author: req.body.author,
      },
      {
        $set: {
          topic: req.body.topic,
          body: req.body.body,
        },
      }
    );

    return res.json({
      message: 'Post body updated successfully',
      success: true,
    });
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}

async function deleteDocument(req, res, db) {
  try {
    await db.collection('documents').deleteOne({
      title: req.body.title,
      author: req.body.author,
    });

    return res.json({
      message: 'Post successfully deleted',
      success: true,
    });
  } catch (err) {
    return res.json({
      message: new Error(err).message,
      success: false,
    });
  }
}
