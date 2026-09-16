# 📐 Chuyên Đề: Thuật Toán Bố Trí Tọa Độ Tròn (Radial Layout) & Lượng Giác Trong Frontend

> **Dành cho:** Kỹ sư Frontend xây dựng các hệ thống đồ thị tri thức (Knowledge Graph như Obsidian, Roam Research), Mindmap, biểu đồ mạng lưới (Network Topology).
> **Dự án áp dụng:** Seramuse Desktop (`GraphView.tsx`)

---

## 1. Bản Chất Vấn Đề (Problem Statement)

Khi xây dựng đồ thị tri thức bằng SVG hoặc HTML Canvas, ta có một danh sách $N$ ghi chú.

- **Mục tiêu:** Bố trí các nốt này trên màn hình sao cho **đẹp mắt, cân đối, tỏa tròn quanh tâm** và **không bị chồng lấn lên nhau**.
- **Giải pháp:** Sử dụng **Radial Layout** (Bố trí hình học lượng giác tỏa tròn).

---

## 2. Điểm Khác Biệt Giữa "Toán Học Trên Giấy" và "Màn Hình Máy Tính"

Trong toán học phổ thông (Hệ tọa độ Descartes):

- Trục $Y$ hướng **lên trên**.
- Gốc tọa độ $(0, 0)$ nằm ở **chính giữa**.

Trong đồ họa máy tính (Màn hình máy tính / Web / SVG):

- Trục $Y$ hướng **xuống dưới** ($Y=0$ nằm ở mép trên cùng màn hình).
- Gốc tọa độ $(0, 0)$ nằm ở **góc trên cùng bên trái**!

```
(0,0) ────── X tăng dần ──────►
  │
  │
  Y tăng dần
  │
  ▼
```

👉 **Hệ quả:** Để đặt đồ thị vào giữa màn hình, ta phải cộng thêm tọa độ tâm $(\text{centerX}, \text{centerY})$ vào kết quả lượng giác.

---

## 3. Đơn Vị Đo Góc: Radian vs Degree (Độ)

- Trong đời sống, ta quen dùng **Độ ($^\circ$)**: Một vòng tròn $= 360^\circ$.
- Nhưng trong tất cả ngôn ngữ lập trình (JavaScript, TypeScript, C++, Python...), các hàm lượng giác như `Math.cos()`, `Math.sin()` **chỉ nhận đơn vị là Radian**.

### Bảng Quy Đổi Nhanh:

|  Độ ($^\circ$)  | Radian (Số học) | Cú pháp JavaScript | Ý nghĩa                   |
| :-------------: | :-------------: | :----------------: | :------------------------ |
| **$360^\circ$** |     $2\pi$      |   `2 * Math.PI`    | Trọn vẹn 1 vòng tròn      |
| **$180^\circ$** |      $\pi$      |     `Math.PI`      | Nửa vòng tròn             |
| **$90^\circ$**  |    $\pi / 2$    |   `Math.PI / 2`    | Góc vuông (1/4 vòng tròn) |

---

## 4. Công Thức Tính Toán Tọa Độ 5 Bước (The 5-Step Formula)

Giả sử màn hình có chiều rộng `width` và chiều cao `height`, ta có mảng $N$ ghi chú:

### Bước 1: Tìm tọa độ tâm màn hình

$$\text{centerX} = \frac{\text{width}}{2}, \quad \text{centerY} = \frac{\text{height}}{2}$$

### Bước 2: Xác định bán kính vòng tròn ($\text{radius}$)

Để các nốt không bị văng ra sát mép màn hình, ta lấy khoảng **65%** khoảng cách từ tâm ra cạnh gần nhất:
$$\text{radius} = \min(\text{centerX}, \text{centerY}) \times 0.65$$

### Bước 3 & 4: Chuyên Sâu Cách Tính Góc Quay `angle`

Công thức chuẩn trong code:

```ts
const angle = (index / total) * 2 * Math.PI
```

#### 🔍 Mổ xẻ 3 thành phần của công thức:

1. **`index`**: Số thứ tự của nốt hiện tại (chạy từ `0, 1, 2, ...` đến `total - 1`).
2. **`total`**: Tổng số lượng nốt cần vẽ lên màn hình.
3. **`index / total` (Phân số tỷ lệ)**:
   - Đây là phần quan trọng nhất! Nó biểu thị nốt này đang chiếm **bao nhiêu phần trăm của một vòng tròn**.
   - Ví dụ có 4 nốt (`total = 4`):
     - Nốt 0: $0 / 4 = 0$ (vạch xuất phát $0\%$).
     - Nốt 1: $1 / 4 = 0.25$ ($25\%$ vòng tròn).
     - Nốt 2: $2 / 4 = 0.5$ ($50\%$ vòng tròn - nửa vòng).
     - Nốt 3: $3 / 4 = 0.75$ ($75\%$ vòng tròn).
4. **`2 * Math.PI` (Một vòng tròn trọn vẹn)**:
   - Trong máy tính, một vòng tròn $360^\circ$ tương đương với $2\pi$ radians.
   - Lấy **tỷ lệ phần trăm** (`index / total`) nhân với **độ lớn cả vòng** (`2 * Math.PI`) sẽ ra **góc quay chính xác** của nốt đó!

---

#### 🍕 Bảng Tra Cứu Trực Quan (Ví dụ với `total = 4` nốt):

| Nốt thứ `index` | Tỷ lệ `index / total` |       Phép tính Radian        | Đổi sang Độ ($^\circ$) | Vị trí trên mặt đồng hồ      |
| :-------------: | :-------------------: | :---------------------------: | :--------------------: | :--------------------------- |
|    **Nốt 0**    |      $0 / 4 = 0$      |      $0 \times 2\pi = 0$      |     **$0^\circ$**      | Hướng **3 giờ** (bên phải)   |
|    **Nốt 1**    |    $1 / 4 = 0.25$     | $0.25 \times 2\pi = \pi / 2$  |     **$90^\circ$**     | Hướng **6 giờ** (bên dưới)   |
|    **Nốt 2**    |     $2 / 4 = 0.5$     |    $0.5 \times 2\pi = \pi$    |    **$180^\circ$**     | Hướng **9 giờ** (bên trái)   |
|    **Nốt 3**    |    $3 / 4 = 0.75$     | $0.75 \times 2\pi = 3\pi / 2$ |    **$270^\circ$**     | Hướng **12 giờ** (trên đỉnh) |

---

#### 💡 Mẹo Nâng Cao Về Góc Bắt Đầu (Starting Offset):

- Mặc định, công thức `(index / total) * 2 * Math.PI` sẽ đặt nốt đầu tiên (`index = 0`) ở hướng **3 giờ** (góc $0^\circ$ chuẩn lượng giác).
- Nếu bạn muốn nốt đầu tiên xuất hiện ở hướng **12 giờ trên đỉnh** (giống kim đồng hồ bắt đầu từ số 12), bạn chỉ cần **trừ đi 90 độ** (tức trừ $\frac{\pi}{2}$):
  ```ts
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  ```

---

### Bước 5: Giải mã công thức tọa độ `x, y` (Tam Giác Vuông Lượng Giác & Quy Ước Quốc Tế)

```
                  (x, y) [Vị trí Note cần vẽ trên màn hình]
                    ▲
                   /│
                  / │
     radius (huyền)/  │ Δy (Cạnh đối diện góc α = radius * sin)
                /   │
             α /    │
   (centerX, centerY) ──┴──► Δx (Cạnh kề góc α = radius * cos)
      [Tâm màn hình]   H (Hình chiếu)
```

#### 1. Bản chất hình học: Chiếu điểm lên 2 trục tọa độ

Xét tam giác vuông tạo bởi **Tâm $O$**, **Điểm nốt $M(x, y)$**, và **Hình chiếu $H$ trên trục ngang**:

- Cạnh $OM$ là **cạnh huyền** (bằng bán kính `radius`).
- Đoạn nằm bẹp ngang $\Delta x$ là **CẠNH KỀ** với góc $\alpha$:
  $$\cos(\alpha) = \frac{\text{Cạnh kề}}{\text{Cạnh huyền}} = \frac{\Delta x}{\text{radius}} \implies \mathbf{\Delta x = \text{radius} \times \cos(\alpha)}$$
- Đoạn dựng đứng $\Delta y$ là **CẠNH ĐỐI** diện nhìn thẳng vào góc $\alpha$:
  $$\sin(\alpha) = \frac{\text{Cạnh đối}}{\text{Cạnh huyền}} = \frac{\Delta y}{\text{radius}} \implies \mathbf{\Delta y = \text{radius} \times \sin(\alpha)}$$

#### 2. Vì sao góc $\alpha$ lại xuất phát từ trục $X$ mà không phải trục $Y$?

- **Trực giác đời thường:** Chúng ta quen nhìn mặt đồng hồ (số 12 ở đỉnh) hoặc la bàn (hướng Bắc $0^\circ$ ở trên cùng), nên bản năng luôn nghĩ góc phải bắt đầu từ trục $Y$ hướng lên.
- **Quy ước Toán học & Máy tính:**
  - Lịch sử toán học bắt đầu từ **trục số 1 chiều nằm ngang** (trục số thực $Ox$). Khi dựng thêm trục $Oy$ tạo hệ tọa độ 2D, vạch xuất phát tự nhiên nhất là số $1$ trên trục ngang (tọa độ $(1, 0)$).
  - Các nhà toán học đã thống nhất một **QUY ƯỚC QUỐC TẾ (Convention)**: Tia xuất phát $0^\circ$ (hoặc $0$ radian) luôn nằm ở **trục hoành dương $Ox$ (hướng 3 giờ)**.
  - Bằng chứng trong code: Bạn gọi `Math.cos(0)` trả về `1` ($x=1$), và `Math.sin(0)` trả về `0` ($y=0$). Điểm $(1, 0)$ nằm ngay trên trục $X$!
- **Kết luận vàng:** Góc đo bắt đầu từ trục nào thì trục đó là **cạnh kề ($\cos$)**, trục còn lại là **cạnh đối ($\sin$)**. Vì góc toán học xuất phát từ $Ox$, nên **$x$ luôn đi với $\cos$, $y$ luôn đi với $\sin$**.

#### 3. Tại sao trong code hay có đoạn `- Math.PI / 2`?

- Vì máy tính mặc định đặt góc $0$ ở **hướng 3 giờ (trục $X$)**, nhưng mắt người lại thích nốt đầu tiên xuất hiện ở **hướng 12 giờ trên đỉnh (trục $Y$)**.
- Do đó, lập trình viên chỉ cần **trừ đi 90 độ ($\frac{\pi}{2}$)** để kéo giật lùi vị trí xuất phát từ hướng 3 giờ ngược về hướng 12 giờ:
  ```ts
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  ```

#### 4. Tại sao phải cộng thêm `centerX` và `centerY`?

- Màn hình máy tính có gốc $(0, 0)$ ở **góc trên cùng bên trái**, chứ không phải ở tâm!
- $\Delta x$ và $\Delta y$ chỉ là khoảng cách lệch _tính từ tâm_.
- Phải **cộng thêm tọa độ Tâm** (`centerX`, `centerY`) thì nốt mới được dời ra **chính giữa màn hình**. Nếu không cộng, toàn bộ đồ thị sẽ bị dính chùm ở góc trên bên trái!

---

## 5. Sơ Đồ Vòng Tròn Hoàn Chỉnh

```
                       (Hướng 12h: angle = -π/2)
                                [Note 0]
                                   ▲
                                   │
             [Note 3] ◄──────── (centerX, centerY) ────────► [Note 1]
         (Hướng 9h)                │                     (Hướng 3h: angle = 0)
                                   ▼
                                [Note 2]
                       (Hướng 6h: angle = π/2)
```

---

## 6. Đoạn Code Thực Tế Trong Dự Án (`GraphView.tsx`)

```tsx
interface GraphNode {
  id: string
  title: string
  x: number
  y: number
  radius: number
}

// Tính toán tọa độ tròn (Radial Layout) cho từng Node
const graphNodes: GraphNode[] = useMemo(() => {
  const total = Object.keys(notes).length
  if (total === 0) return []

  // 1. Tọa độ tâm màn hình
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  // 2. Bán kính an toàn: 65% khoảng cách từ tâm ra mép
  const radius = Math.min(centerX, centerY) * 0.65

  return Object.keys(notes).map((noteId, index) => {
    const note = notes[noteId]

    // 3. Góc lượng giác (Chia đều chiếc bánh pizza 360 độ / 2*PI radians)
    // Lưu ý: Có thể trừ thêm (Math.PI / 2) nếu muốn nốt đầu tiên nằm ở hướng 12h
    const angle = (index / total) * 2 * Math.PI

    // 4. Tính tọa độ pixel x và y dựa trên tam giác lượng giác
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return {
      id: note.id,
      // Xử lý phòng vệ: tránh trường hợp note chưa kịp đặt tiêu đề
      title: note.title.trim() || 'Untitled Note',
      x,
      y,
      // Nốt đang mở soạn thảo sẽ to hơn để tạo điểm nhấn thị giác
      radius: note.id === activeNoteId ? 18 : 14
    }
  })
}, [notes, activeNoteId, dimensions])
```

---

## 7. Kỹ Thuật Nâng Cao (Khi số lượng Note quá lớn: $N > 15$)

Nếu có từ 20 đến 50 ghi chú, nếu cùng xếp trên 1 vòng tròn thì các nốt sẽ bị dính sát vào nhau.

- **Kỹ thuật Multi-Ring (2 Vòng tròn so le):**
  - Nốt chẵn ($i \% 2 === 0$): Nằm ở vòng tròn ngoài ($\text{radius} = R$).
  - Nốt lẻ ($i \% 2 === 1$): Nằm ở vòng tròn trong ($\text{radius} = R \times 0.78$).
- **Kết quả:** Đồ thị nhìn tự nhiên, sinh động như một mạng tinh vân (Galaxy), không bao giờ bị đè chữ lên nhau!

---

## 8. Góc Phỏng Vấn (Interview Storytelling)

Khi người phỏng vấn hỏi:

> _"Tại sao bạn không dùng thư viện D3.js hay Three.js để vẽ đồ thị cho nhanh?"_

**Câu trả lời đạt chuẩn Senior:**

> *"D3.js hay Three.js là những thư viện rất mạnh nhưng có dung lượng Bundle Size lớn (hàng trăm KB) và học đường cong phức tạp. Với bài toán Knowledge Graph trên ứng dụng Desktop như Seramuse, em nhận thấy việc tự áp dụng **thuật toán lượng giác Radial Layout trên thẻ `<svg>` thuần** mang lại 3 lợi thế vượt trội:
>
> 1. **Zero-Dependency:** Ứng dụng nhẹ, khởi động tức thì, không làm phình dung lượng app.
> 2. **Kiểm soát tuyệt đối:** Dễ dàng gắn sự kiện React (`onClick`, `onMouseEnter`) trực tiếp lên từng thẻ `<circle>` và `<line>` mà không cần cầu nối (bridge) phức tạp giữa React Virtual DOM và D3 DOM.
> 3. **Hiệu năng cao:** Kết hợp với `useMemo`, chỉ tính toán lại tọa độ khi kích thước màn hình hoặc số lượng note thay đổi, giữ vững 60 FPS khi hover tương tác."*
