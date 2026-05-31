import { Feedback } from "../models/feedback.model.js";

export const FeedbackRepository = {
  findAll: () => {
    return Feedback.find({}, {}, { sort: { createdAt: -1 } }).exec();
  },
  findById: (id) => {
    return Feedback.findById(id, {}, null).exec();
  },
  create: (data) => {
    return new Feedback(data).save();
  },
  updateById: (id, data) => {
    return Feedback.findByIdAndUpdate(id, data, { new: true }).exec();
  },
  deleteById: (id) => {
    return Feedback.findByIdAndDelete(id, null);
  },
};
