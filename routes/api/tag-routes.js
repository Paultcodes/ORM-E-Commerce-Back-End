const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    });
    return res.json(allTags);
  } catch (err) {
    res.status(500);
  }

  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const findOne = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    });
    return res.json(findOne);
  } catch (err) {
    res.status(500);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    return res.json(createTag);
  } catch (err) {
    res.status(500);
  }

  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(updateTag);
  } catch (err) {
    res.status(500);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.json(deleteTag);
  } catch (err) {
    res.status(500);
  }
  // delete on tag by its `id` value
});

module.exports = router;
