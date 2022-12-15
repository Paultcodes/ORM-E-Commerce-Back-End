const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    });
    return res.json(categoryData);
  } catch (err) {
    res.status(500);
  }

  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const categoryId = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    });
    return res.json(categoryId);
  } catch (err) {
    res.status(500);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    return res.json(createCategory);
  } catch (err) {
    res.status(500);
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(updateCategory);
  } catch (err) {
    res.status(500);
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deleteCategory);
  } catch (err) {
    res.status(500);
  }

  // delete a category by its `id` value
});

module.exports = router;
