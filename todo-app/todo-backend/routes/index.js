const express = require('express');
const router = express.Router();
const configs = require('../util/config')
const { getAsync, setAsync } = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    // ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  try {
    const value = await getAsync('added_todos') | 0;    
    res.json({ added_todos: value });
  } catch (exception) {
    console.log(exception);
  }
});

module.exports = router;
