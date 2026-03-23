# Admin Dashboard - Quản lý Sản phẩm

Hệ thống quản lý sản phẩm hoàn chỉnh với chức năng **Thêm**, **Sửa**, **Xóa** sản phẩm.

## 🚀 Cách Truy Cập

1. **Đăng nhập** tài khoản admin: `/login`
2. **Truy cập dashboard**: `/admin/products`

## ✨ Chức Năng

### 1. **Xem Danh Sách Sản Phẩm**
- Hiển thị bảng sản phẩm với phân trang (20 sản phẩm/trang)
- Hiển thị hình ảnh, tên, danh mục, giá, tồn kho
- Tìm kiếm nhanh theo tên sản phẩm

### 2. **Thêm Sản Phẩm Mới**
- Nút "+ Thêm sản phẩm" ở đầu trang
- Form modal với các trường:
  - Tên sản phẩm (bắt buộc)
  - Mô tả
  - Giá (VND) - bắt buộc
  - Tồn kho - bắt buộc
  - Chất liệu
  - Cân nặng (gram)
  - Danh mục - bắt buộc
  - Hình ảnh (hỗ trợ multiple files)

### 3. **Sửa Sản Phẩm**
- Nhấp icon ✏️ trên dòng sản phẩm
- Modal mở với dữ liệu hiện tại
- Có thể cập nhật hình ảnh hoặc giữ nguyên

### 4. **Xóa Sản Phẩm**
- Nhấp icon 🗑️ trên dòng sản phẩm
- Xác nhận trước khi xóa
- Xóa hình ảnh cùng với sản phẩm

## 📁 Cấu Trúc Dự Án

```
Backend (Laravel)
├── app/Models/
│   ├── Product.php           ← Model sản phẩm
│   ├── Category.php          ← Model danh mục
│   └── ProductImage.php      ← Model hình ảnh
├── app/Http/Controllers/Api/
│   ├── ProductsController.php  ← CRUD sản phẩm
│   └── CategoriesController.php ← Quản lý danh mục
└── routes/
    └── api.php               ← API routes

Frontend (React)
├── src/utils/
│   └── adminHelper.js        ← Helper functions cho API
├── src/pages/Admin/
│   ├── AdminLayout.jsx       ← Layout admin
│   ├── AdminProducts.jsx     ← Trang quản lý sản phẩm
│   └── AdminProducts.css     ← Styling
└── src/components/admin/
    ├── AdminSidebar.jsx      ← Sidebar navigation
    ├── AdminHeader.jsx       ← Header
    └── CSS files             ← Styling
```

## 🔌 API Endpoints

### Sản phẩm
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy danh sách sản phẩm |
| GET | `/api/products/{id}` | Lấy chi tiết sản phẩm |
| POST | `/api/products` | Thêm sản phẩm (yêu cầu auth) |
| POST | `/api/products/{id}/update` | Sửa sản phẩm (yêu cầu auth) |
| DELETE | `/api/products/{id}` | Xóa sản phẩm (yêu cầu auth) |

### Danh Mục
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/categories` | Lấy tất cả danh mục |
| POST | `/api/categories` | Thêm danh mục (yêu cầu auth) |
| PUT | `/api/categories/{id}` | Sửa danh mục (yêu cầu auth) |
| DELETE | `/api/categories/{id}` | Xóa danh mục (yêu cầu auth) |

## 🎨 Giao Diện

### Bảng Sản Phẩm
- Responsive design
- Hiển thị status tồn kho (Bình thường, Thấp, Nguy hiểm, Hết)
- Action buttons để sửa/xóa
- Phân trang động

### Modal Form
- Chia thành các section (Thông tin cơ bản, Giá & Kho, Chi tiết, Hình ảnh)
- Validation form
- Preview hình ảnh
- Dark overlay với animation

## 🔐 Bảo Mật

- Yêu cầu token authentication cho tất cả CRUD operations
- Kiểm tra quyền admin trên frontend
- Backend validation tất cả request
- File upload validation (size, format)

## 📱 Responsive Design

- Desktop: Layout đầy đủ với sidebar và content
- Tablet: Sidebar có thể ẩn/hiện
- Mobile: Sidebar collapsible, table horizontal scroll

## 💾 Lưu Trữ Ảnh

- Ảnh được lưu trong `/public/storage/products/`
- Hỗ trợ formats: JPEG, PNG, GIF
- Max size: 5MB/file
- Xóa ảnh cũ khi cập nhật

---

**Lần cập nhật**: 2026-03-23
**Phiên bản**: 1.0
