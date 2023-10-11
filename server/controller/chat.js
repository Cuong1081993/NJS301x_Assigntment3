import ChatRoom from "../models/ChatRoom.js";
import jwt from "jsonwebtoken";
import { createError } from "../middlewares/error.js";

export const newRoom = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      const token = authHeader && authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          return next(createError(403, "Token is not valid"));
        }
        return (req.user = user);
      });
    }
    const newRoom = new ChatRoom({
      userId: req.user._id,
    });
    const room = await newRoom.save();
    res.status(200).json(room._id);
  } catch (error) {
    next(error);
  }
};

export const getMessageByRoomId = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const room = await ChatRoom.findById(roomId).populate("userId");
    if (!room) return next(createError(404, "Room not found!"));
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

export const addMessage = async (req, res, next) => {
  try {
    if (req.body.message === "/end") {
      await ChatRoom.findByIdAndUpdate(req.body.roomid, {
        $set: {
          isEnd: true,
        },
      });
      return res.status(200).json("End chat success !");
    }
    await ChatRoom.findByIdAndUpdate(req.body.roomId, {
      $push: {
        message: {
          message: req.body.message,
          isAdmin: req.body.isAdmin,
        },
      },
    });
    res.status(200).json("Save message success !");
  } catch (error) {
    next(error);
  }
};

export const getAllRoomIsOpen = async (req, res, next) => {
  try {
    const roomOpen = await ChatRoom.find({ isEnd: false }).populate("userId");
    res.status(200).json(roomOpen);
  } catch (error) {}
};
