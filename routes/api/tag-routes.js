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
    console.log(err);
  }

  // find all tags

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
    console.log(err);
  }
  // find a single tag by its `id`
});

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    return res.json(createTag);
  } catch (err) {
    console.log(err);
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
    console.log(err);
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
    console.log(err);
  }
  // delete on tag by its `id` value
});

module.exports = router;
