import * as searchDao from './search-dao.js'

const updateSearch = async (req, res) => {
    console.log("updating search", req.params.qid)
    const searchIdToUpdate = req.params.qid;
    const updates = req.body;
    const status = await searchDao.updateSearch(searchIdToUpdate, updates);
    res.json(status)
}

const createSearch = async (req, res) => {
    const query = req.body;
    const search = await searchDao.findSearchByIdLink(query.question_id, query.link);

    if (!search) {
        const newSearch = await searchDao.createSearch(query.question_id, query.link);
        return res.status(201).json({ status: 201, message: "Search created successfully", newSearch });
    }
    else {
        return res.status(201).json({ status: 201, message: "Search exists" });
    }
}

export default (app) => {
    app.put('/api/details/:qid', updateSearch)
    app.post('/api/create-search', createSearch)
}