const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
// This route retrieves all products along with their associated category and tags
router.get('/', async (req, res) => {
  try {
    // Fetch all products with their associated categories and tags
    const products = await Product.findAll({
      include: [
        { model: Category },        // Include associated Category model
        { model: Tag, through: ProductTag },  // Include associated Tag model through ProductTag join table
      ],
    });
    // Respond with the products data and a 200 status code
    res.status(200).json(products);
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

// GET a single product by ID
// This route retrieves a specific product by its ID along with its associated category and tags
router.get('/:id', async (req, res) => {
  try {
    // Fetch the product by ID with its associated category and tags
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category },        // Include associated Category model
        { model: Tag, through: ProductTag },  // Include associated Tag model through ProductTag join table
      ],
    });

    // If the product is not found, respond with a 404 status code and a message
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the product data and a 200 status code
    res.status(200).json(product);
  } catch (err) {
    // Respond with a 500 status code in case of an error
    res.status(500).json(err);
  }
});

// POST a new product
// This route creates a new product with the data provided in the request body
router.post('/', async (req, res) => {
  try {
    // Create a new product using the data from the request body
    const product = await Product.create(req.body);

    // If tag IDs are provided, create associations between the product and tags
    if (req.body.tagIds && req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Respond with the newly created product and a 201 status code
    res.status(201).json(product);
  } catch (err) {
    console.log(err); // Log the error for debugging
    // Respond with a 400 status code in case of an error with the request
    res.status(400).json(err);
  }
});

// PUT (update) a product by ID
// This route updates a specific product by its ID with the data provided in the request body
router.put('/:id', async (req, res) => {
  try {
    // Update the product with the data from the request body
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    // If the product was updated successfully
    if (updated) {
      // If tag IDs are provided, update the associations between the product and tags
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTags = await ProductTag.findAll({
          where: { product_id: req.params.id },
        });

        // Get the IDs of the existing tags for the product
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        
        // Determine which new tags need to be added
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => ({
            product_id: req.params.id,
            tag_id,
          }));

        // Determine which existing tags need to be removed
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);

        // Perform removal and addition of tags
        await Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
        
