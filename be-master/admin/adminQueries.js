const oracledb = require('oracledb');
const dbConfig = require('../dbConfig');
async function queryUser() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Lỗi khi đóng kết nối:', error);
            }
        }
    }
}
async function AdminDashboard() {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const customersResult = await connection.execute('SELECT COUNT(*) AS total_customers FROM users');
        const productsResult = await connection.execute('SELECT COUNT(*) AS total_products FROM products');
        const recentActivitiesResult = await connection.execute('SELECT user_name, action, created_at FROM audit_log ORDER BY ID DESC');
        const recentActivities = recentActivitiesResult.rows.map(row => ({
            create_at: row[2],
            userName: row[0],
            action: row[1]
        }));
        return {           
                totalCustomers: customersResult.rows[0][0],
                totalProducts: productsResult.rows[0][0],
                recentAction: recentActivities         
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Lỗi khi đóng kết nối:', error);
            }
        }
    }
}
async function AddProduct(TenSach,MoTa,AnhBia,NXB,GiaBan) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO products (TenSach,MoTa,AnhBia,NXB,GiaBan) VALUES (:TenSach,:MoTa,:AnhBia,:NXB,:GiaBan)', 
        {TenSach,MoTa,AnhBia,NXB,GiaBan });
      await connection.commit();
    
      // Giải phóng kết nối
      await connection.close();
    
      return { message: 'Sản phẩm đã được thêm thành công.' };
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      throw error;
    }
}
async function DeleteAction(username,MaSach) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO audit_log (user_name,action) VALUES (:username,\' đã xoá sách có mã \'||:MaSach)', 
        {username,MaSach});
      await connection.commit();
    
      // Giải phóng kết nối
      await connection.close();
    
      return { message: 'Lịch sử được thêm thành công.' };
    } catch (error) {
      console.error('Lỗi khi thêm lịch sử:', error);
      throw error;
    }
}
async function AddAction(username,TenSach) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO audit_log (user_name,action) VALUES (:username,\' đã thêm sách \'||:TenSach)', 
        {username,TenSach});
      await connection.commit();
    
      // Giải phóng kết nối
      await connection.close();
    
      return { message: 'Lịch sử được thêm thành công.' };
    } catch (error) {
      console.error('Lỗi khi thêm lịch sử:', error);
      throw error;
    }
}
async function EditAction(username,TenSach) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute('INSERT INTO audit_log (user_name,action) VALUES (:username,\' đã chỉnh sửa sách \'||:TenSach)', 
        {username,TenSach});
      await connection.commit();
    
      // Giải phóng kết nối
      await connection.close();
    
      return { message: 'Lịch sử được thêm thành công.' };
    } catch (error) {
      console.error('Lỗi khi thêm lịch sử:', error);
      throw error;
    }
}
async function EditProduct(MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        await connection.execute(
            `UPDATE products
            SET TenSach = :TenSach,
                MoTa = :MoTa,
                AnhBia = :AnhBia, 
                NXB = :NXB,  
                GiaBan = :GiaBan
            WHERE MaSach = :MaSach`, 
            { MaSach,TenSach,MoTa,AnhBia,NXB,GiaBan}
        );
        await connection.commit();

        // Giải phóng kết nối
        await connection.close();

        return { message: 'Sản phẩm đã được cập nhật thành công.' };
    } catch (error) {
        console.error('Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    }
}
async function Delete(MaSach) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);

        // Thực hiện truy vấn xóa sản phẩm dựa trên cartId
        const result = await connection.execute('DELETE FROM products WHERE MaSach = :MaSach', [MaSach]);
        await connection.commit(); // Commit transaction
        await connection.close(); // Đóng kết nối
        return { message: 'Xóa sản phẩm thành công.' };

        // Kiểm tra số lượng hàng bị ảnh hưởng
      
    } catch (error) {
        console.log('Lỗi khi xóa sản phẩm:', error);
        // Có thể thêm xử lý lỗi khác tại đây, ví dụ: ghi log, báo lỗi, vv.
        return { message: 'Đã xảy ra lỗi khi xóa sản phẩm.' };
    }
}
// Chức năng kiểm tra role người dùng
async function getUserRole(userId) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(
            'SELECT role FROM users WHERE user_id = :userId',
            { userId } // Sử dụng object với property tương ứng với tên tham số
        );

        if (result.rows.length > 0) {
            return result.rows[0][0]; // Trả về role (cột đầu tiên của dòng đầu tiên)
        } else {
            throw new Error('Người dùng không tồn tại');
        }
    } catch (error) {
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Lỗi khi đóng kết nối:', error);
            }
        }
    }
}
module.exports = {queryUser,AdminDashboard, AddProduct, EditProduct, Delete, getUserRole, AddAction, DeleteAction, EditAction};