const blockRouter = require('express').Router();
const { protect, verify } = require('../Controller/authController');
const blockController = require('../Controller/blockController');

blockRouter.use(protect, verify('super-user'));

blockRouter.route('/blocksInDistrict').get(blockController.blocksInDistrict);
blockRouter
  .route('/:id')
  .patch(blockController.updateBlock)
  .delete(blockController.deleteBlock)
  .get(blockController.getBlock);
blockRouter
  .route('/')
  .post(blockController.addBlock)
  .get(blockController.getAllBlocks);

module.exports = blockRouter;
