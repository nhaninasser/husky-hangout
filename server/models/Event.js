const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema(
  {
    eventName: {
     type: String,
    },
    eventDate: {
      type: String,
    },
    eventName: {
      type: String,
    },
    eventText: {
      type: String,
      required: "You need to add an event!",
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    attending: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: true,
    },
  },
  {
    comments: {
      type: String,
      require: true,
      maxlength: 500,
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
