const router = require('express').Router();

console.log('Example route accessed');

router.get('/example', (req, res) => {
  res.json({ message: 'Example route working!' });
});

module.exports = router;
