const Subject = require("../models/subject.model");
const Task = require("../models/task.model");
const connectToDatabase = require("../db/db");
const AWS = require("aws-sdk");
const axios = require("axios");

module.exports.createTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const requestBody = JSON.parse(event.body);

  try {
    const newTask = await Task.create({
      title: requestBody.title,
      description: requestBody.description,
      resources: requestBody.resources,
      deadline: requestBody.deadline,
      isdone: requestBody.isDone,
      student: requestBody.student,
      subject: requestBody.subject,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        newTask,
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

module.exports.getTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;

  try {
    let taskData = await Task.findOne({
      _id: parameters.Id,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        taskData,
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

module.exports.getSubjectTasks = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;

  try {
    let subjectTasks = await Task.findOne({
      subject: parameters.Id,
    });
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        subjectTasks,
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

module.exports.deleteTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  const parameters = event.pathParameters;
  //const requestBody = JSON.parse(event.body);

  try {
    const taskToDelete = await Task.findOne({
      _id: parameters.Id,
    });
    if (!taskToDelete) {
      return {
        statuscode: 404,
        message: "Task doesn't exist",
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
      taskToDelete.remove();
    }
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify(taskToDelete),
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

module.exports.updateTask = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  await connectToDatabase();

  try {
    let updatedTask = await Task.findByIdAndUpdate(
      event.pathParameters.Id,
      JSON.parse(event.body),
      {
        edited: true,
      }
    );
    if (!updatedTask) {
      return {
        statuscode: 404,
        message: "Task doesn't exist",
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
      body: JSON.stringify(updatedTask),
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
