const express = require('express');
const {DeleteAction, AddAction, queryUser, AdminDashboard, AddProduct, EditProduct, Delete,getUserRole, EditAction } = require('./adminQueries');
const router = express.Router();
const jwt = require('jsonwebtoken');
async function checkAdminRole(req, res, next) {
  try {
      const authHeader = req.headers['authorization'];
      const userId = authHeader && authHeader.split(' ')[1]; // Tách 'Bearer' và token
      // console.log(userId);
      const role = await getUserRole(userId);
      console.log(role);
      if (role !== 'admin') {
          return res.status(403).json({ error: 'Truy cập bị từ chối: Không có quyền admin' });
      }
      next();
  } catch (error) {
      res.status(500).json({ error: 'Lỗi xác thực vai trò người dùng' });
  }
}
router.get('/users', async (req, res) => {
  try {
      const users = await queryUser();
      res.json(users);
  } catch (error) {
      console.error('Lỗi truy vấn user:', error);
      res.status(500).json({ error: 'Lỗi truy vấn user' });
  }
});
router.get('/', async (req, res) => {
    try {
        const admin = await AdminDashboard();
        res.json(admin);
    } catch (error) {
        console.error('Lỗi truy vấn', error);
        res.status(500).json({ error: 'Lỗi truy vấn ' });
    }
});
router.post('/product', checkAdminRole, async (req, res) => {
    const {MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan } = req.body;
    
    try {
      const result = await AddProduct(TenSach,MoTa,AnhBia,NXB,GiaBan);
      const username = req.headers['username'];
      // console.log(username);
      await AddAction(username,TenSach);
      res.status(201).json(result);
      // res.status(201).json(result2);
    } catch (error) {
      res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm sản phẩm.' });
    }
  });
router.put('/product/:MaSach',checkAdminRole, async (req, res) => {
    const { MaSach } = req.params;
    const { TenSach,MoTa,AnhBia,NXB,GiaBan } = req.body;

    try {
        const result = await EditProduct(MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan);
        const username = req.headers['username'];
      // console.log(username);
      await EditAction(username,TenSach);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật sản phẩm.' });
    }
});
router.post('/delete-item', checkAdminRole, async(req, res) => {
  const {MaSach} = req.body;
  try{
    const result = await Delete(MaSach);
    const username = req.headers['username'];
    console.log(username);
    await DeleteAction(username,MaSach);
    res.status(201).json(result);
    console.log({result })
  } catch (error) {
    res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa sản phẩm.' });
    console.log(error)
  }
});
module.exports = router;