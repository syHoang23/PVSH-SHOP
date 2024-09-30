const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { checkLogin, getUserInfoByUsername, registerUser } = require('./userQueries');
const secretKey = process.env.APP_SECRET;

router.post('/login', async (req, res) => {
    const { username, password } = req.body; // Lấy thông tin đăng nhập từ phần thân của yêu cầu
    try {
        const isValidUser = await checkLogin(username, password);
        const payload = {username};
        // const token = jwt.sign(payload, secretKey, {expiresIn: '2h' });
        // res.json({token});
        // Trả về kết quả dưới dạng JSON
        console.log({isValidUser})
        res.json( isValidUser );
    } catch (error) {
        console.error('Lỗi truy vấn USER:', error);
        res.status(500).json({ error: 'Lỗi truy vấn USER' });
    }
});

// Router để lấy thông tin người dùng từ username
router.post('/user-info', async (req, res) => {
    const { userid } = req.body;
    try {
        const userInfo = await getUserInfoByUsername(userid);
        res.json(userInfo);
        console.log(userInfo);
    } catch (error) {
        console.error('Lỗi truy vấn thông tin người dùng:', error);
        res.status(500).json({ error: 'Lỗi truy vấn thông tin người dùng' });
    }
});
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const result = await registerUser(username, password);
      res.status(201).json(result);
    } catch (error) {
      if (error.message === 'Tên người dùng đã tồn tại.') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Đã xảy ra lỗi khi đăng ký tài khoản.' });
      }
    }
  });
  


module.exports = router;

