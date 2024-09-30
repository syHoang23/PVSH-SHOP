const express = require('express');
const router = express.Router();
const { InserCart, Cart_Info, Delete } = require('./cart_Queries');
router.post('/adds', async (req, res) => {
    const { Id,  user_id,productname ,quantity, price, img, subtotal } = req.body;
    
    try {
      const result = await InserCart( Id,  user_id, productname ,quantity, price, img, subtotal);
      res.status(201).json(result);
    } catch (error) {
     
        res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm' });
      
    }
  });
  router.post('/cart-info', async (req, res)=> {
    const {user_id} = req.body;
    
    try {
      const cart = await Cart_Info(user_id);
      res.json(cart);
     
    } catch (error) {
        console.error('Lỗi truy vấn Cart:', error);
        res.status(500).json({ error: 'Lỗi truy vấn cart' });
    }
    
  }); 

  router.post('/delete-item', async (req, res) => {
    const { User_Id, Id } = req.body;
    try {
        const result = await Delete(User_Id, Id);
        res.status(200).json(result); // Đổi mã trạng thái thành 200
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    }
});

  module.exports = router;