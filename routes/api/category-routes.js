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
    console.log(err)
  }

  // find all categories
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
    console.log(err)
  }
  // find one category by its `id` value

});

router.post('/', async (req, res) => {
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    return res.json(createCategory);
  } catch (err) {
    console.log(err)
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
    console.log(err)
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
    console.log(err);
    res.status(500).json({ message: 'Error!' });
  }

  // delete a category by its `id` value
});

module.exports = router;
