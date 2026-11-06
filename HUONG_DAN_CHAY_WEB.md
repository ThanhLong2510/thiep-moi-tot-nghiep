# HƯỚNG DẪN CHẠY VÀ TÙY BIẾN WEB THIỆP MỜI TỐT NGHIỆP

Tài liệu này hướng dẫn chi tiết từng bước cách chạy, chỉnh sửa thông tin, cấu hình backend và đưa trang **Thiệp Mời Tốt Nghiệp Điện Tử** (Graduation Invitation Card) lên internet.

---

## 📂 1. Cấu Trúc Dự Án

```text
THIEP MOI TOT NGHIEP/
├── index.html                   # File chuyển hướng chính vào giao diện thiệp
├── HUONG_DAN_CHAY_WEB.md        # File hướng dẫn (bạn đang đọc)
└── graduation-rsvp/             # Thư mục chứa mã nguồn thiệp & backend
    ├── README.md
    ├── frontend/                # Giao diện thiệp (HTML, CSS, JS)
    │   ├── index.html           # Trang thiệp mời chính
    │   ├── admin.html           # Trang quản trị dành cho chủ thiệp (xem danh sách, quét QR, tải ảnh lời chúc)
    │   ├── README.md
    │   └── assets/
    │       ├── css/             # File style CSS (style.css, admin.css)
    │       ├── js/              # Các kịch bản JS (config.js, rsvp.js, matrix.js, countdown.js, main.js, admin.js)
    │       ├── images/          # Hình ảnh (image.png - ảnh tốt nghiệp, og-image.jpg - ảnh xem trước khi share)
    │       └── audio/           # Nhạc nền (nhacnen.mp4)
    └── backend/                 # Mã nguồn Backend kết nối Google Sheet
        ├── Code.gs              # Mã Google Apps Script xử lý RSVP, lưu lời chúc, tạo mã QR, lưu vé Drive
        └── README.md            # Hướng dẫn cài đặt backend chi tiết
```

---

## 🚀 2. Cách Chạy Web Lên Trình Duyệt

Dự án sử dụng công nghệ **HTML/CSS/Vanilla JS thuần** (không cần Node.js build hay npm install phức tạp). Có 3 cách chạy bên dưới:

### Cách 1: Mở trực tiếp bằng trình duyệt (Nhanh nhất)
1. Mở thư mục dự án trên máy tính.
2. Nhấp đúp chuột vào file `index.html` (ở thư mục gốc) hoặc `graduation-rsvp/frontend/index.html`.
3. Trình duyệt (Chrome, Edge, Firefox, Safari) sẽ mở ra giao diện thiệp mời ngay lập tức.

---

### Cách 2: Chạy bằng Python Local Server (Khuyên dùng)
Dùng Server nội bộ giúp tính năng nhạc nền tự động, camera quét QR ở trang Admin và xuất ảnh vé chạy mượt mà nhất.

1. Mở terminal / PowerShell tại thư mục dự án `d:\THIEP MOI TOT NGHIEP`.
2. Chạy lệnh sau:
   ```bash
   python -m http.server 8000
   ```
3. Truy cập địa chỉ sau trên trình duyệt:
   ```text
   http://localhost:8000
   ```

---

### Cách 3: Chạy bằng Extension Live Server trên VS Code
1. Mở thư mục dự án trong **Visual Studio Code**.
2. Cài đặt extension **Live Server** (của Ritwick Dey).
3. Click chuột phải vào file `index.html` -> Chọn **Open with Live Server** (hoặc bấm tổ hợp phím `Alt + L, Alt + O`).

---

## ✏️ 3. Hướng Dẫn Chỉnh Sửa & Tùy Biến Thông Tin

Để biến thiệp mời này thành thiệp tốt nghiệp của riêng bạn, hãy chỉnh sửa các file sau:

### 3.1. Đổi Thông Tin Lễ Tốt Nghiệp
Mở file `graduation-rsvp/frontend/index.html`:

- **Tên Trường / Khoa / Ngành**: Tìm các dòng từ `132` đến `146` để sửa tên Khoa, Trường, Tiêu đề Lễ tốt nghiệp.
- **Ngày & Giờ tổ chức**: Tìm từ dòng `158` đến `179` để đổi Ngày (ví dụ: `8 Tháng 11, 2026`), Giờ đón khách (ví dụ: `10:30 AM`).
- **Địa điểm & Link Google Maps**: 
  - Đổi tên địa điểm tại dòng `189-190`.
  - Thay đường link Google Maps của bạn tại dòng `192` (`href="https://maps.google.com/..."`).

---

### 3.2. Thay Đổi Hình Ảnh Cá Nhân
Vào thư mục `graduation-rsvp/frontend/assets/images/`:

1. **Ảnh đại diện trên thiệp (`image.png`)**: 
   - Thay file ảnh chân dung/chân váy cử nhân của bạn vào đây, đặt tên là `image.png` (khuyên dùng định dạng PNG/JPG hình chữ nhật đứng).
2. **Ảnh hiển thị khi chia sẻ link qua Zalo / Facebook (`og-image.jpg`)**:
   - Thay file ảnh xem trước khi gửi link qua mạng xã hội (tỷ lệ chuẩn 1200x630px).

---

### 3.3. Thay Đổi Nhạc Nền
Vào thư mục `graduation-rsvp/frontend/assets/audio/`:
- Thay file âm thanh của bạn vào file `nhacnen.mp4` (hoặc `.mp3`). File `.mp4` cần chứa audio codec phổ biến như AAC; nếu trình duyệt không phát được, hãy đổi sang `.mp3` và cập nhật đường dẫn trong `main.js`.
- Nếu dùng file nhạc có định dạng khác, mở file `graduation-rsvp/frontend/assets/js/main.js` và cập nhật lại đường dẫn file nhạc tương ứng.

---

### 3.4. Cấu Hình Thời Gian Đếm Ngược & Link Backend
Mở file `graduation-rsvp/frontend/assets/js/config.js`:

```javascript
window.APP_CONFIG = Object.freeze({
  // 1. URL Google Apps Script nhận RSVP (Xem mục 4 để tạo)
  API_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

  // 2. Thời điểm kết thúc sự kiện (Sau giờ này thiệp sẽ đổi sang chế độ "Cảm ơn & Album ảnh")
  EVENT_END: '2026-11-08T13:00:00+07:00',

  // 3. Link Album ảnh Google Drive/Photos (Hiển thị sau khi buổi lễ kết thúc)
  ALBUM_URL: 'https://photos.app.goo.gl/your-album-link'
});
```

---

### 3.5. Giao Diện Sky Blue Tối Giản & Chế Độ Nền Sáng / Tối
- Giao diện được thiết kế theo phong cách **Modern Editorial 2026**:
  - Tông màu chủ đạo: xanh da trời nhẹ (`#edf8ff`, `#d8efff`, `#198dcc`) với nền trắng trong trẻo và điểm nhấn xanh azure.
  - Bố cục thiệp dạng editorial card: ảnh chân dung nổi bật, typography Space Grotesk hiện đại, các khối thông tin thoáng và bo góc mềm.
  - Hiệu ứng nền chuyển động được tiết chế để giữ cảm giác nhẹ nhàng, dễ đọc và phù hợp cả desktop lẫn mobile.
- **Nền Sáng (Light Mode - Mặc định)**: Sắc sảo, thanh lịch, nền trắng ánh xanh băng tinh khôi.
- Thiệp hiện sử dụng cố định nền sáng; không còn nút chuyển nền tối.
- Trên thanh tiêu đề có nút **☀️ NỀN SÁNG / 🌙 NỀN TỐI** để chuyển đổi tức thì.

---

## 📑 4. Cấu Hinh Backend Google Sheet & Apps Script (Lưu Khách Mời & Lời Chúc)

Để thiệp có thể nhận phản hồi tham dự (RSVP), tạo vé có mã QR và lưu lời chúc của khách mời về Google Sheet riêng của bạn, làm theo các bước sau:

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.google.com) và tạo 1 Bảng tính mới (gặt tên ví dụ: `Danh Sach Khach Moi Tot Nghiep`).
2. Ở hàng 1 (Header), tạo các cột theo thứ tự sau:
   - **A**: `ID`
   - **B**: `Full Name`
   - **C**: `Status`
   - **D**: `Responded At`
   - **E**: `Wish`
   - **F**: `Wished At`
   - **G**: `Ticket`
   - **H**: `Checked In`

### Bước 2: Thêm Mã Google Apps Script
1. Trên menu Google Sheet -> Chọn **Mở rộng (Extensions)** -> **Apps Script**.
2. Xóa hết mã mặc định, mở file `graduation-rsvp/backend/Code.gs` trong dự án, copy toàn bộ nội dung và dán vào cửa sổ Apps Script.
3. Nhấn biểu tượng **Lưu (Save)** 💾.

### Bước 3: Đặt Mật Khẩu Admin Console
1. Trong cửa sổ Apps Script -> Chọn icon ⚙️ **Cài đặt dự án (Project Settings)** ở thanh bên trái.
2. Cuộn xuống phần **Thuộc tính kịch bản (Script properties)** -> Nhấn **Thêm thuộc tính kịch bản (Add script property)**.
3. Đặt:
   - **Thuộc tính (Property)**: `ADMIN_PASSWORD`
   - **Giá trị (Value)**: Mật khẩu bạn muốn đặt (ví dụ: `123456` hoặc `mysecretpass`).
4. Nhấn **Lưu thuộc tính kịch bản**.

### Bước 4: Triển khai (Deploy Web App)
1. Nhấn nút **Triển khai (Deploy)** ở góc trên bên phải -> Chọn **Rất nhiều loại triển khai mới (New deployment)**.
2. Chọn loại: **Ứng dụng web (Web app)**.
3. Cấu hình:
   - **Mô tả (Description)**: `Graduation RSVP Backend`
   - **Thực thi dưới dạng (Execute as)**: `Tôi (Me - email của bạn)`
   - **Ai có quyền truy cập (Who has access)**: `Bất kỳ ai (Anyone)`
4. Nhấn **Triển khai (Deploy)** -> Chọn **Cấp quyền truy cập (Authorize access)** -> Chọn tài khoản Google của bạn -> Nhấn **Nâng cao (Advanced)** -> Chọn **Đi tới (chưa an toàn)** -> Nhấn **Cho phép (Allow)**.
5. Copy đường link **URL ứng dụng web** (dạng `https://script.google.com/macros/s/AKfycbx.../exec`).
6. Dán URL này vào mục `API_URL` trong file `graduation-rsvp/frontend/assets/js/config.js`.

---

## 🛡️ 5. Hướng Dẫn Sử Dụng Trang Quản Trị (Admin Console)

Trang quản trị dành riêng cho chủ thiệp giúp xem danh sách khách mời, quét mã QR check-in vào cổng và xuất ảnh lời chúc làm Story.

- **Đường dẫn trang Admin**: `graduation-rsvp/frontend/admin.html`
- **Đăng nhập**: Nhập mật khẩu bạn đã thiết lập ở `ADMIN_PASSWORD` trong Apps Script.

### Các Tính Năng Trong Admin Console:
1. **📊 Tổng quan (Dashboard)**:
   - Thống kê trực quan số lượng người tham dự, từ chối, lời chúc và số khách đã check-in.
   - Danh sách chi tiết tên khách, trạng thái, thời gian phản hồi và nội dung lời chúc.
   - **📥 Nút Xuất File Excel (CSV)**: Tải toàn bộ danh sách khách mời và lời chúc về máy tính chỉ với 1 click, tương thích 100% tiếng Việt có dấu trong Microsoft Excel!
   - **🛡️ Cơ chế sao lưu tự động (Local Backup)**: Ngay cả khi chưa kịp cấu hình Google Sheet hoặc mất mạng, họ tên và lời chúc vẫn được lưu an toàn trong máy!
2. **🎫 Quét Check-in QR**:
   - Sử dụng camera điện thoại/laptop để quét mã QR trên vé điện tử của khách khi họ tới dự lễ.
   - Hệ thống tự động ghi thời gian có mặt vào cột `Checked In` trên Google Sheet.
3. **🖼️ Wish Studio**:
   - Xem toàn bộ lời chúc khách mời gửi đến theo giao diện thẻ ảnh màu xanh sapphire hoàng gia.
   - Xuất ra file ảnh Story (Full HD / 2K) để đăng lên Facebook / Instagram / Zalo.
   - Hỗ trợ tải hàng loạt file ZIP ảnh lời chúc.

---

## 🌐 6. Đưa Thiệp Mời Lên Internet (GitHub Pages / Vercel / Netlify)

Để bạn bè và người thân có thể mở thiệp từ xa qua đường link, bạn có thể đưa mã nguồn này lên các dịch vụ hosting miễn phí:

### Đưa lên GitHub Pages (Khuyên dùng & Miễn phí mãi mãi):
1. Tạo 1 repository mới trên GitHub (ví dụ: `thiệp-moi-tot-nghiep`).
2. Push toàn bộ mã nguồn dự án lên repository đó.
3. Vào phần **Settings** của repository trên GitHub -> Chọn mục **Pages**.
4. Ở mục **Source**, chọn nhánh `main` (hoặc `master`) và thư mục `/ (root)` -> Nhấn **Save**.
5. Đợi 1-2 phút, GitHub Pages sẽ cấp cho bạn một đường link công khai (ví dụ: `https://tenuser.github.io/thiep-moi-tot-nghiep/`).

---

🎉 *Chúc bạn có một Lễ Tốt Nghiệp thật rực rỡ và nhiều niềm vui!*
