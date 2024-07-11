const express = require("express");
const { HandleGenerateNewShortURL, handleURLAnalytics } = require("../controller/url");

const router = express.Router();

router.post('/', HandleGenerateNewShortURL);
router.get('/analytics/:shortId', handleURLAnalytics);


module.exports = router;