import * as searchDao from './search-dao.js'

const updateSearch = async (req, res) => {
    console.log("updating search", req.params.qid)
    const searchIdToUpdate = req.params.qid;
    const updates = req.body;
    const status = await searchDao.updateSearch(searchIdToUpdate, updates);
    res.json(status)
}

export default (app) => {
    app.put('/api/details/:qid', updateSearch)
}