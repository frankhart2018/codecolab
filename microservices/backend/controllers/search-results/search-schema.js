import mongoose from "mongoose";
const schema = mongoose.Schema(
    {
        question_id: String,
        upvotes: {type: Number, default: 0},
        upvoted: {type: Boolean, default: false},
        downvotes: {type: Number, default: 0},
        downvoted: {type: Boolean, default: false},
    },
    { collection: "search-results" }
);
export default schema;