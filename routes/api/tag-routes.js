const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
// This route retrieves all tags along with their associated products
router.get('/', async (req, res) => {
  try {
    // Fetch all tags with their associated products through the ProductTag join table
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    // Respond with the tags data and a 200 status code
    res.status(200).json(tags);
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

// GET a single tag by ID
// This route retrieves a specific tag by its ID along with its associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch the tag by ID with its associated products through the ProductTag join table
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    // If the tag is not found, respond with a 404 status code and a message
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }

    // Respond with the tag data and a 200 status code
    res.status(200).json(tag);
  } catch (err) {
    // Respond with a 500 status code in ca
