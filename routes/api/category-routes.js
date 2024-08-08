const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
// This route retrieves all categories and includes associated products in the response
router.get('/', async (req, res) => {
  try {
    // Fetch all categories with their associated products
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    // Respond with the categories data and a 200 status code
    res.status(200).json(categories);
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

// GET a single category by ID
// This route retrieves a specific category by its ID and includes associated products
router.get('/:id', async (req, res) => {
  try {
    // Fetch the category by ID with its associated products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If the category is not found, respond with a 404 status code and a message
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Respond with the category data and a 200 status code
    res.status(200).json(category);
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

// POST a new category
// This route creates a new category with the data provided in the request body
router.post('/', async (req, res) => {
  try {
    // Create a new category using the data from the request body
    const newCategory = await Category.create(req.body);
    // Respond with the newly created category and a 201 status code
    res.status(201).json(newCategory);
  } catch (err) {
    // Respond with a 400 status code in case of an error with the request
    res.status(400).json(err);
  }
});

// PUT (update) a category by ID
// This route updates a specific category by its ID with the data provided in the request body
router.put('/:id', async (req, res) => {
  try {
    // Update the category with the data from the request body
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id },
    });

    // If the category was updated successfully, fetch and respond with the updated category
    if (updated) {
      const updatedCategory = await Category.findByPk(req.params.id);
      res.status(200).json(updatedCategory);
    } else {
      // If no category was found to update, respond with a 404 status code and a message
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    // Respond with a 400 status code in case of an error with the request
    res.status(400).json(err);
  }
});

// DELETE a category by ID
// This route deletes a specific category by its ID
router.delete('/:id', async (req, res) => {
  try {
    // Delete the category by ID
    const deleted = await Category.destroy({
      where: { id: req.params.id },
    });

    // If the category was deleted successfully, respond with a message and a 200 status code
    if (deleted) {
      res.status(200).json({ message: 'Category deleted' });
    } else {
      // If no category was found to delete, respond with a 404 status code and a message
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

module.exports = router;
