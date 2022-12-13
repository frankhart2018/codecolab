import searchModel from "./search-model.js";

export const updateSearch = (qid, content) => searchModel.updateOne({_id: qid}, {$set: content})

export const findSearchByIdLink = (q_id, q_link) => {
    return searchModel.findOne({
        question_id: q_id,
        question_link: q_link
    });
};

export const findSearchById = (q_id) => {
    return searchModel.findOne({
        question_id: q_id
    });
};

export const createSearch = (q_id, q_link) => {
    return searchModel.create({
        question_id: q_id,
        question_link: q_link
    });
}