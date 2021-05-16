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

module.exports.getSubject = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;

  try {
    let subjectData = await Class.find({
      id: parameters.id,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        subjectData,
      }),
    };
  } catch (error) {
    return {
      statusode: error.statusCode,
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
      statusode: error.statusCode,
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

module.exports.deleteSubject = async (event, context, callback) => {
  event.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;
  const requestBody = JSON.parse(event.body);

  try {
    let subjectToDelete = Subject.findOne({
      id: parameters.Id,
      teacher: requestBody.teacher,
    });
    if (!subjectToDelete) {
      return {
        statuscode: 404,
        message: "Class doesn't exist",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          status: error.statusCode,
          message: error.message,
        }),
      };
    } else {
      subjectToDelete.remove();
    }
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(subjectToDelete),
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
