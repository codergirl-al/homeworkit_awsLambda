const Subject = require("../models/subject.model");
const Task = require("../models/task.model");
const Class = require("../models/class.model");
const connectToDatabase = require("../db/db");
const AWS = require("aws-sdk");
const axios = require("axios");

module.exports.createSubject = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const requestBody = JSON.parse(event.body);

  try {
    const newSubject = await Subject.create({
      title: requestBody.title,
      teacher: requestBody.teacher,
      class: requestBody.class,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        newSubject,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        status: error.statusCode,
        message: error.message,
      }),
    };
  }
};

module.exports.getClassSubjects = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;
  let paramaters = event.queryStringParameters;

  try {
    let classSubjects = await Subject.find({
      class: parameters.id,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        classSubjects,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        status: error.statusCode,
        message: error.message,
      }),
    };
  }
};
