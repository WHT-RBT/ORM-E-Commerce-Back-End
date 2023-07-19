const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories, be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {model: Product}
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }  
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value, be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category was found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    // If the category is successfully created
    res.status(200).json({ message: 'Category created successfully', categoryData });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a category by its `id` value
    try {
      const categoryData = await Category.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!categoryData[0]) {
        // If no category was found with the provided id
        res.status(404).json({ message: 'No category was found with that id!' });
        return;
      }
  
      // If the category is successfully updated
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
    try {
      const categoryData = await Category.destroy({
        where: { id: req.params.id },
      });
  
      if (!categoryData) {
        // If no category is found with the provided id
        res.status(404).json({ message: 'Category not found' });
        return;
      }
  
      // If the category is successfully deleted
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
