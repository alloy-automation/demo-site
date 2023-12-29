var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const { v4: uuidv4 } = require('uuid');

/* GET home page. */
router.get('/', async function(req, res) {
    res.render('index');
});

router.post('/set-api-key', async function(req, res) {
  const { apiKey } = req.body;

  if (!apiKey) {
      return res.status(400).json({ error: "API key is required" });
  }

  req.session.apiKey = apiKey;

  const dynamicAlloy = new Alloy(apiKey);

  try {
      const usersResponse = await dynamicAlloy.getUsers();
      let userId;

      const existingUser = usersResponse.data.find(user => user.username === "demo-app-default@test.com");

      if (existingUser) {
          userId = existingUser.userId;
      } else {
          const newUserResponse = await dynamicAlloy.createUser({
              username: `demo-app-default+${uuidv4()}@test.com`,
              fullName: "Demo User"
          });
          userId = newUserResponse.userId;
      }

      res.json({ userId: userId });
  } catch (error) {
      console.error("Error in /set-api-key route:", error);
      res.status(500).send("An error occurred while setting the API key");
  }
});

router.get('/success', async function(req, res) {
    const userId = req.query.userId;

    if (!userId || !req.session.apiKey) {
        return res.status(400).json({ error: "UserId and API key are required in the session" });
    }

    const dynamicAlloy = new Alloy(req.session.apiKey);

    try {
        await dynamicAlloy.identify(userId);
        var tokenObj = await dynamicAlloy.getUserToken();
        var token = tokenObj.token;
        res.render('integrations', {data: {token: token}});
    } catch (error) {
        console.error("Error in /success route:", error);
        res.status(500).send("An error occurred");
    }
});

module.exports = router;
