const Subject = require("../models/subject.model");
const Task = require("../models/task.model");
const Class = require("../models/class.model");
const connectToDatabase = require("../db/db");
const AWS = require("aws-sdk");
const axios = require("axios");
const { connect } = require("mongodb");

module.exports.createClass = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const requestBody = JSON.parse(event.body);

  try {
    const newClass = await Class.create({
      name: requestBody.name,
      teacher: requestBody.teacher,
      school: requestBody.school,
      students: requestBody.students,
      subjects: requestBody.subjects,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        newClass,
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

module.exports.getClass = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;

  try {
    const classData = await Class.findOne({
      _id: parameters.Id,
    });
    console.log("bucooooo");
    console.log(classData);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        classData,
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

module.exports.getSchoolClasses = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;

  try {
    let schoolClasses = await Class.find({
      school: parameters.Id,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        schoolClasses,
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

module.exports.deleteClass = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();
  const parameters = event.pathParameters;
  const requestBody = JSON.parse(event.body);

  try {
    const classToDelete = await Class.findOne({
      _id: parameters.Id,
      school: requestBody.school,
    });
    if (!classToDelete) {
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
      classToDelete.remove();
    }
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(classToDelete),
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

module.exports.updateClass = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  // const parameters = event.pathParameters;
  // const requestBody = JSON.parse(event.body);

  try {
    let updatedClass = await Class.findByIdAndUpdate(
      event.pathParameters.Id,
      JSON.parse(event.body),
      {
        edited: true,
      }
    );
    if (!updatedClass) {
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
    }
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(updatedClass),
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
