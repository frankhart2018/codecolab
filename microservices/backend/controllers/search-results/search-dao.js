import searchModel from "./search-model.js";

export const updateSearch = (qid, content) => searchModel.updateOne({_id: qid}, {$set: content})