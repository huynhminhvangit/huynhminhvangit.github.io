# Steampunk Deep Sea Shooter — Game Feel Design

- **Ngày:** 2026-08-11
- **Mục tiêu:** Cải thiện cảm giác gameplay (gameplay feel), ưu tiên **phản hồi bắn & sát thương**, chỉ dùng hiệu ứng lập trình (không thêm asset ảnh/âm thanh mới).
- **Phạm vi:** `games/steampunk/script.js` (+ tinh chỉnh nhỏ âm thanh bằng file hiện có).

## Bối cảnh

Game hiện là shooter cuộn ngang: người chơi di chuyển lên/xuống bên trái, bắn sang phải vào kẻ địch từ phải. Đã có: 4 độ khó, đạn hồi phục, mạng (tim), power-up (cá may mắn), cá voi phóng drone, 4 lớp nền parallax, nổ khói/lửa, hạt bánh răng, gamepad + bàn phím, điểm cao, độ khó tăng dần.

Điểm yếu cảm giác hiện tại: sát thương/bắn chưa "nặng đòn" — đạn không có lực, khi trúng kẻ địch không có phản hồi rõ (chỉ rơi hạt bánh răng vô hướng), khi người chơi dính đòn chưa đủ rõ ràng.

## Lựa chọn

Phương án **A — "Game feel" pass toàn diện** với hệ juice tái dùng, giữ cấu trúc class hiện tại, không refactor rộng. Ưu điểm: hiệu quả cảm giác rõ rệt, ít xáo trộn logic hiện có, code gọn nhờ hệ dùng chung.

## Thiết kế

### Phần 1 — Juice Core (hệ cốt tái dùng)

Một đối tượng `Juice` gắn vào `Game`, cung cấp các "đòn bẩy" dùng chung, tất cả đếm bằng `deltaTime`, tự hết hạn và reset:

- `shake(intensity, duration)` — rung canvas (dịch chuyển ngẫu nhiên nhẹ dần theo thời gian). Áp bằng `ctx.translate` quanh toàn bộ draw.
- `hitStop(duration)` — tạm hãm vòng lặp game trong ~40–60ms (freeze mọi thứ) để cú tiêu diệt "nặng đòn".
- `flash(color, alpha, duration)` — phủ một lớp màu lên toàn màn hình (đỏ khi player dính đòn, trắng/vàng khi tiêu diệt mục tiêu lớn).
- `update(deltaTime)` gọi trong `Game.update`; `apply(ctx)` gọi trong `Game.draw` (áp shake + flash).

Hàm dùng chung cho hạt/tiện ích vẽ (hit spark, glow, numbers) được thêm gần các hàm vẽ hiện có.

### Phần 2 — Feedback khi bắn

- **Muzzle flash**: khi `shootTop()`, bắn 1–2 hạt sáng ngắn tại họng súng, có hướng + phân tán nhẹ.
- **Vệt đạn (trail)**: mỗi `Projectile` vẽ thêm đuôi mờ phía sau (vài đoạn alpha giảm), tạo cảm giác "có lực".
- **Rung nhẹ + glow**: mỗi phát bắn thêm `juice.shake` rất nhỏ; đạn có glow sáng.

### Phần 3 — Feedback khi trúng

- **Hit spark**: khi đạn chạm kẻ địch, bắn cụm hạt tia lửa theo hướng va chạm (thay thế/bổ sung hạt bánh răng rơi vô hướng hiện tại).
- **Knockback**: kẻ địch giật lùi nhẹ sang trái khi trúng đạn, hình dung chúng khựng/đẩy.
- **Hit-stop khi tiêu diệt**: khi hạ 1 kẻ địch, `hitStop(45)` + `flash` theo loại (cá voi: trắng sáng mạnh hơn).
- **Damage numbers**: số sát thương/điểm nổi lên, bay lên rồi mờ dần tại vị trí kẻ địch.

### Phần 4 — Feedback khi người chơi bị trúng

- **Damage vignette đỏ**: `flash` đỏ đậm + `shake` mạnh khi dính đòn.
- **Flash bất tử rõ hơn**: giữ alpha nhấp nháy nhưng tăng độ rõ, kèm glow.

### Phần 5 — Âm thanh & cân bằng cảm giác

- Điều chỉnh `volume` tiếng bắn/nổ (bắn nhỏ, nổ to) bằng file hiện có, không thêm asset mới.
- Rà soát hiệu ứng không làm game khó đọc hơn (giữ mức vừa phải, không nhấp nháy quá mức).

## Kiến trúc

- Toàn bộ thay đổi trong `games/steampunk/script.js`.
- Thêm object `juice` vào `Game`; gọi `juice.update` trong `Game.update`, `juice.apply` trong `Game.draw`.
- Sửa giới hạn trong `Player.shootTop/shootBottom`, `Enemy.update`, và phần xử lý va chạm trong `Game.update`.
- Không đổi cấu trúc class Player/Enemy/Projectile hiện có (chỉ thêm trạng thái/hành vi).

## Xử lý lỗi / lưu ý

- `hitStop` không được đóng băng vĩnh viễn — phải có timeout/tự reset.
- `shake`/`flash`/`hitStop` cần hoạt động đúng ở trạng thái `paused`/`menu` (không rò rỉ trạng thái khi reset game/đổi màn).
- Hiệu ứng phải scale ổn theo kích thước canvas khác nhau.
- Không gây rung lắc quá mức gây khó chịu (giữ cường độ vừa phải).

## Tiêu chí chấp nhận

- Bắn ra đạn có muzzle flash nhẹ và vệt đuôi.
- Khi đạn trúng: có hit spark, kẻ địch giật lùi nhẹ, số sát thương nổi.
- Khi hạ kẻ địch: hit-stop ngắn + flash nhẹ; cá voi sáng mạnh hơn.
- Khi người chơi dính đòn: flash đỏ đậm + rung màn hình rõ; flash bất tử dễ thấy hơn.
- Âm thanh bắn/nổ có cường độ hợp lý.
- Game vẫn mượt, không thêm asset mới, không phá trạng thái menu/pause/gameover.
