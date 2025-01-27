const shortid = require('shortid');
const URL = require("../model/url");

async function HandleGenerateNewShortURL(req, res){
    const body = req.body;
    
    if(!body.url) return res.status(400).json({error: "URL is required!"});

    const shortID = shortid();
    
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    // return res.status(200).json({
    //     shortId: shortID,
    //     redirectURL: body.url,
    //     visitHistory: [],
    // });

    return res.render("home", {
        id: shortID,
    });
}

async function handleURLAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    HandleGenerateNewShortURL,
    handleURLAnalytics,
}