import mongoose from 'mongoose';
import searchSchema from "./search-schema.js";

const searchModel = mongoose.model('SearchModel', searchSchema);

export default searchModel;