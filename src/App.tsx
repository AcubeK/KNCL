import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  Home, Users, ClipboardList, HelpCircle, BarChart3, Settings, FlaskConical,
  Search, Download, Plus, Bell, ChevronRight, ChevronDown, X, Clock,
  AlertTriangle, CheckCircle2, XCircle, LogOut, Phone, MapPin, FileText,
  Eye, Pencil, Trash2, Gauge, ShieldCheck, Building2, ListFilter,
  CalendarDays, ArrowUpRight, UserCircle2, Lock, Mail, QrCode, Printer,
  FileCheck2, PenLine, PackageCheck, Split, Paperclip, ScanLine, TrendingUp,
  ClipboardCheck, ArrowRightLeft,  Info,
  RotateCcw,ImagePlus, Layers, SendHorizontal
} from "lucide-react";

import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, PieChart, Pie, Cell
} from "recharts";

/* ============================================================
   FONTS + GLOBAL TOKENS
   Design concept: "Nhãn mẫu / Specimen label" — recurring
   signature is a ticked, monospace specimen tag used for every
   sample/order/quote code, echoing barcode labels physically
   stuck on lab samples. Everything else stays quiet, precise.
   ============================================================ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

    :root{
      --bg:#F5F7F3;
      --surface:#FFFFFF;
      --surface-alt:#EEF1EA;
      --ink:#16211B;
      --ink-soft:#57655D;
      --ink-faint:#8A968D;
      --line:#DCE2D8;
      --primary:#0F6E5C;
      --primary-dark:#0A4F42;
      --primary-soft:#E1F0EA;
      --amber:#B8792A;
      --amber-soft:#F7ECDA;
      --red:#BD432E;
      --red-soft:#F8E4DF;
      --violet:#6957A8;
      --violet-soft:#EAE5F5;
      --blue:#3E6EA6;
      --blue-soft:#E2ECF5;
      --gray-soft:#EAEDE7;
      --radius:10px;
    }
    *{box-sizing:border-box;}
    .lims-root{
      font-family:'Inter',sans-serif;
      color:var(--ink);
      background:var(--bg);
      min-height:100%;
      width:100%;
    }
    .lims-root h1,.lims-root h2,.lims-root h3,.lims-root .disp{
      font-family:'IBM Plex Sans',sans-serif;
    }
    .lims-root .mono{
      font-family:'IBM Plex Mono',monospace;
    }
    .lims-scroll::-webkit-scrollbar{height:6px;width:6px;}
    .lims-scroll::-webkit-scrollbar-thumb{background:var(--line);border-radius:4px;}
    .lims-btn{
      display:inline-flex;align-items:center;gap:6px;
      font-family:'Inter',sans-serif;font-size:13px;font-weight:600;
      padding:8px 14px;border-radius:8px;border:1px solid transparent;
      cursor:pointer;transition:all .15s ease;white-space:nowrap;
    }
    .lims-btn:focus-visible{outline:2px solid var(--primary);outline-offset:2px;}
    .lims-btn-primary{background:var(--primary);color:#fff;}
    .lims-btn-primary:hover{background:var(--primary-dark);}
    .lims-btn-primary:disabled{background:var(--gray-soft);color:var(--ink-faint);cursor:not-allowed;}
    .lims-btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--line);}
    .lims-btn-ghost:hover{background:var(--surface-alt);}
    .lims-btn-danger{background:var(--surface);color:var(--red);border-color:#EBC3B8;}
    .lims-btn-danger:hover{background:var(--red-soft);}
    .lims-btn-icon{padding:8px;border-radius:8px;background:transparent;border:1px solid var(--line);cursor:pointer;color:var(--ink-soft);}
    .lims-btn-icon:hover{background:var(--surface-alt);color:var(--ink);}
    .lims-input{
      font-family:'Inter',sans-serif;font-size:13px;
      border:1px solid var(--line);border-radius:8px;padding:8px 10px;
      background:var(--surface);color:var(--ink);
    }
    .lims-input:focus-visible, .lims-input:focus{outline:2px solid var(--primary);outline-offset:1px;}
    .lims-input.warn{border-color:var(--amber);background:var(--amber-soft);}
    .lims-input.bad{border-color:var(--red);background:var(--red-soft);}
    .tick-rule{
      height:6px;width:100%;
      background-image:repeating-linear-gradient(90deg,var(--line) 0 1px, transparent 1px 8px);
      opacity:.7;
    }
    .specimen-tag{
      display:inline-flex;align-items:center;position:relative;
      font-family:'IBM Plex Mono',monospace;font-size:12px;font-weight:600;
      letter-spacing:.3px;color:var(--primary-dark);
      background:var(--primary-soft);border:1px solid #BFDCD1;
      border-radius:4px;padding:3px 8px 3px 12px;
    }
    .specimen-tag::before{
      content:"";position:absolute;left:4px;top:3px;bottom:3px;width:2px;
      background-image:repeating-linear-gradient(180deg,#0F6E5C 0 2px, transparent 2px 4px);
      opacity:.55;
    }
    table.lims-table{border-collapse:collapse;width:100%;font-size:13px;}
    table.lims-table thead th{
      text-align:left;font-family:'Inter',sans-serif;font-weight:600;font-size:11.5px;
      letter-spacing:.04em;text-transform:uppercase;color:var(--ink-faint);
      padding:10px 12px;border-bottom:1px solid var(--line);white-space:nowrap;
    }
    table.lims-table tbody td{
      padding:11px 12px;border-bottom:1px solid var(--line);vertical-align:middle;
    }
    table.lims-table tbody tr:hover{background:var(--surface-alt);}
    .badge{
      display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;
      padding:4px 9px;border-radius:100px;white-space:nowrap;
    }
    a{color:inherit;}
    input:focus{outline:none;}
  `}</style>
);

/* ============================================================
   MOCK DATA
   ============================================================ */
const CUSTOMERS = [
  { id: "KH-0001", name: "Công ty CP Giấy Bãi Bằng", address: "Phù Ninh, Phú Thọ", mst: "2600123456", contact: "Nguyễn Văn Hùng", chucVu: "Trưởng phòng QA/QC", phone: "0208 3862 114", fax: "0208 3862 115", email: "hung.nv@baibangpaper.vn", freq: "3 tháng / lần", nextVisit: "18/08/2026" },
  { id: "KH-0002", name: "Nhà máy Nhiệt điện Phả Lại", address: "Chí Linh, Hải Dương", mst: "0800234561", contact: "Lê Thị Thu", chucVu: "Phó Giám đốc Kỹ thuật", phone: "0220 3881 227", fax: "0220 3881 228", email: "thu.le@phalaipower.vn", freq: "6 tháng / lần", nextVisit: "02/10/2026" },
  { id: "KH-0003", name: "KCN Tân Đức", address: "Đức Hòa, Long An", mst: "1101345672", contact: "Trần Minh Khoa", chucVu: "Trưởng ban Quản lý", phone: "0272 3768 305", fax: "0272 3768 306", email: "khoa.tm@tanduc-ip.vn", freq: "Hàng tháng", nextVisit: "12/08/2026" },
  { id: "KH-0004", name: "Công ty TNHH Dệt May Hòa Bình", address: "TP. Hòa Bình", mst: "5400456783", contact: "Phạm Thị Lan", chucVu: "Nhân viên Môi trường", phone: "0218 3852 460", fax: "0218 3852 461", email: "lan.pt@hbtex.vn", freq: "Hàng quý", nextVisit: "05/09/2026" },
  { id: "KH-0005", name: "UBND Huyện Sóc Sơn", address: "Sóc Sơn, Hà Nội", mst: "0100567894", contact: "Đỗ Văn Tùng", chucVu: "Chuyên viên Phòng TN&MT", phone: "024 3884 552", fax: "024 3884 553", email: "tung.dv@socson.hanoi.gov.vn", freq: "6 tháng / lần", nextVisit: "20/11/2026" },
  { id: "KH-0006", name: "Công ty CP Nước sạch Sông Đà", address: "Kỳ Sơn, Hòa Bình", mst: "5400678905", contact: "Vũ Thị Hạnh", chucVu: "Trưởng phòng Kỹ thuật", phone: "0226 3852 118", fax: "0226 3852 119", email: "hanh.vt@vinaconexwater.vn", freq: "Hàng tháng", nextVisit: "09/08/2026" },
  { id: "KH-0007", name: "Bệnh viện Đa khoa Tỉnh Bắc Giang", address: "TP. Bắc Giang", mst: "2400789016", contact: "Ngô Văn Sơn", chucVu: "Trưởng khoa Kiểm soát Nhiễm khuẩn", phone: "0204 3854 771", fax: "0204 3854 772", email: "son.nv@bvbacgiang.vn", freq: "Hàng năm", nextVisit: "14/01/2027" },
  { id: "KH-0008", name: "Công ty CP Xi măng Bỉm Sơn", address: "Bỉm Sơn, Thanh Hóa", mst: "2800890127", contact: "Hoàng Thị Nga", chucVu: "Trưởng phòng An toàn - Môi trường", phone: "0237 3824 093", fax: "0237 3824 094", email: "nga.ht@bimsoncement.vn", freq: "Hàng quý", nextVisit: "27/09/2026" },
  { id: "KH-0009", name: "Công ty CP Bao bì Sài Gòn", address: "Q. Tân Bình, TP.HCM", mst: "0301901238", contact: "Nguyễn Thành Đạt", chucVu: "Giám đốc Nhà máy", phone: "028 3812 4455", fax: "028 3812 4456", email: "dat.nt@saigonpack.vn", freq: "Hàng quý", nextVisit: "15/10/2026" },
  { id: "KH-0010", name: "Công ty TNHH Thủy sản Minh Phú", address: "Cà Mau", mst: "2001012349", contact: "Trần Thị Kim Ngân", chucVu: "Trưởng phòng QA", phone: "0290 3833 668", fax: "0290 3833 669", email: "ngan.ttk@minhphu.vn", freq: "Hàng tháng", nextVisit: "22/08/2026" },
  { id: "KH-0011", name: "Trường Liên cấp Newton", address: "Q. Bắc Từ Liêm, Hà Nội", mst: "0106123450", contact: "Bùi Thị Hương", chucVu: "Kế toán trưởng", phone: "024 3785 2200", fax: "-", email: "huong.bt@newton.edu.vn", freq: "Hàng năm", nextVisit: "05/12/2026" },
  { id: "KH-0012", name: "Công ty CP Thép Việt Ý", address: "Hưng Yên", mst: "0900234561", contact: "Lương Văn Đức", chucVu: "Trưởng phòng Môi trường", phone: "0221 3563 890", fax: "0221 3563 891", email: "duc.lv@vietysteel.vn", freq: "Hàng quý", nextVisit: "30/09/2026" },
  { id: "KH-0013", name: "Công ty CP Sữa Mộc Châu", address: "Mộc Châu, Sơn La", mst: "5500345672", contact: "Đinh Thị Thảo", chucVu: "Trưởng phòng QC", phone: "0212 3862 245", fax: "0212 3862 246", email: "thao.dt@mocchaumilk.vn", freq: "Hàng tháng", nextVisit: "14/08/2026" },
  { id: "KH-0014", name: "Công ty CP Cấp nước Thủ Đức", address: "TP. Thủ Đức, TP.HCM", mst: "0303456783", contact: "Phan Văn Hải", chucVu: "Phó phòng Kỹ thuật", phone: "028 3897 1234", fax: "028 3897 1235", email: "hai.pv@thuducwaco.vn", freq: "Hàng tháng", nextVisit: "11/08/2026" },
  { id: "KH-0015", name: "Công ty CP Nhựa Bình Minh", address: "Q. Bình Tân, TP.HCM", mst: "0301567894", contact: "Ngô Thị Mai Anh", chucVu: "Chuyên viên An toàn", phone: "028 3754 8899", fax: "028 3754 8890", email: "maianh.nt@binhminhplastic.vn", freq: "Hàng quý", nextVisit: "19/09/2026" },
  { id: "KH-0016", name: "KCN Nội Bài", address: "Sóc Sơn, Hà Nội", mst: "0100678905", contact: "Vũ Đình Long", chucVu: "Trưởng ban Quản lý Hạ tầng", phone: "024 3593 5566", fax: "024 3593 5567", email: "long.vd@noibai-ip.vn", freq: "Hàng tháng", nextVisit: "08/08/2026" },
  { id: "KH-0017", name: "Công ty CP Dược phẩm Traphaco", address: "Q. Hoàn Kiếm, Hà Nội", mst: "0100789016", contact: "Đặng Thị Quỳnh", chucVu: "Trưởng phòng Đảm bảo Chất lượng", phone: "024 3826 3311", fax: "024 3826 3312", email: "quynh.dt@traphaco.vn", freq: "Hàng quý", nextVisit: "25/09/2026" },
  { id: "KH-0018", name: "Công ty CP Than Núi Béo", address: "Hạ Long, Quảng Ninh", mst: "5700890127", contact: "Nguyễn Xuân Trường", chucVu: "Trưởng phòng An toàn Mỏ", phone: "0203 3835 447", fax: "0203 3835 448", email: "truong.nx@nuibeocoal.vn", freq: "6 tháng / lần", nextVisit: "03/12/2026" },
  { id: "KH-0019", name: "Công ty TNHH Samsung Electronics VN", address: "KCN Yên Phong, Bắc Ninh", mst: "2300901238", contact: "Trần Bảo Ngọc", chucVu: "EHS Manager", phone: "0222 3696 000", fax: "0222 3696 001", email: "ngoc.tb@samsung.com", freq: "Hàng tháng", nextVisit: "10/08/2026" },
  { id: "KH-0020", name: "Công ty CP Vận tải Đường sắt Hà Nội", address: "Q. Đống Đa, Hà Nội", mst: "0100012349", contact: "Phạm Quốc Việt", chucVu: "Trưởng phòng Kỹ thuật", phone: "024 3851 4477", fax: "024 3851 4478", email: "viet.pq@haraco.vn", freq: "Hàng năm", nextVisit: "16/11/2026" },
];

// Hợp đồng theo từng khách hàng — dùng cho bảng lồng Khách hàng > Hợp đồng > Phiếu YCKN
const CONTRACTS = [
  { id: "HD-2601-01", customerId: "KH-0001", name: "Hợp đồng quan trắc môi trường định kỳ 2026", signed: "12/01/2026", value: "180.000.000 đ", freq: "3 tháng / lần" },
  { id: "HD-2603-02", customerId: "KH-0001", name: "Hợp đồng phân tích nước thải phát sinh", signed: "20/03/2026", value: "45.000.000 đ", freq: "Theo yêu cầu" },
  { id: "HD-2602-01", customerId: "KH-0002", name: "Hợp đồng quan trắc khí thải, nước thải nhà máy", signed: "20/02/2026", value: "220.000.000 đ", freq: "6 tháng / lần" },
  { id: "HD-2603-03", customerId: "KH-0003", name: "Hợp đồng quan trắc môi trường KCN Tân Đức", signed: "03/03/2026", value: "310.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2604-01", customerId: "KH-0004", name: "Hợp đồng kiểm nghiệm nước thải dệt nhuộm", signed: "15/04/2026", value: "60.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2601-02", customerId: "KH-0005", name: "Hợp đồng quan trắc đất nông nghiệp", signed: "22/01/2026", value: "95.000.000 đ", freq: "6 tháng / lần" },
  { id: "HD-2605-01", customerId: "KH-0006", name: "Hợp đồng kiểm nghiệm nước sạch định kỳ", signed: "18/05/2026", value: "150.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2606-01", customerId: "KH-0007", name: "Hợp đồng kiểm nghiệm nước thải y tế", signed: "10/06/2026", value: "70.000.000 đ", freq: "Hàng năm" },
  { id: "HD-2607-01", customerId: "KH-0008", name: "Hợp đồng quan trắc bụi, tiếng ồn nhà máy xi măng", signed: "02/07/2026", value: "260.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2603-04", customerId: "KH-0009", name: "Hợp đồng quan trắc môi trường lao động", signed: "11/03/2026", value: "50.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2602-02", customerId: "KH-0010", name: "Hợp đồng kiểm nghiệm nước thải chế biến thủy sản", signed: "25/02/2026", value: "130.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2604-02", customerId: "KH-0011", name: "Hợp đồng kiểm nghiệm nước uống học đường", signed: "02/04/2026", value: "18.000.000 đ", freq: "Hàng năm" },
  { id: "HD-2605-02", customerId: "KH-0012", name: "Hợp đồng quan trắc khí thải lò luyện thép", signed: "14/05/2026", value: "175.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2606-02", customerId: "KH-0013", name: "Hợp đồng kiểm nghiệm chất lượng sữa nguyên liệu", signed: "08/06/2026", value: "88.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2607-02", customerId: "KH-0014", name: "Hợp đồng kiểm nghiệm nước cấp sinh hoạt", signed: "19/07/2026", value: "142.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2601-03", customerId: "KH-0015", name: "Hợp đồng quan trắc môi trường lao động nhà máy nhựa", signed: "27/01/2026", value: "54.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2602-03", customerId: "KH-0016", name: "Hợp đồng quan trắc môi trường hạ tầng KCN", signed: "08/02/2026", value: "260.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2603-05", customerId: "KH-0017", name: "Hợp đồng kiểm nghiệm nước thải dược phẩm", signed: "25/03/2026", value: "112.000.000 đ", freq: "Hàng quý" },
  { id: "HD-2604-03", customerId: "KH-0018", name: "Hợp đồng quan trắc môi trường khai thác than", signed: "03/04/2026", value: "300.000.000 đ", freq: "6 tháng / lần" },
  { id: "HD-2605-03", customerId: "KH-0019", name: "Hợp đồng quan trắc môi trường nhà máy điện tử", signed: "10/05/2026", value: "410.000.000 đ", freq: "Hàng tháng" },
  { id: "HD-2606-03", customerId: "KH-0020", name: "Hợp đồng kiểm nghiệm môi trường depot đường sắt", signed: "16/06/2026", value: "40.000.000 đ", freq: "Hàng năm" },
];
// Gắn Phiếu YCKN (từ TEST_REQUESTS) vào đúng hợp đồng của khách hàng tương ứng
const yckOfCustomer = (customerId) => {
  const custName = CUSTOMERS.find((c) => c.id === customerId)?.name;
  return Object.keys(TEST_REQUESTS).filter((no) => TEST_REQUESTS[no].kh === custName);
};

const ORDER_STATUS = ["Báo giá", "Tiếp nhận", "Đang phân tích", "Trả kết quả", "Hoàn tất", "Hủy"];
const statusStyle = {
  "Báo giá": { bg: "var(--gray-soft)", fg: "#5B6659" },
  "Tiếp nhận": { bg: "var(--blue-soft)", fg: "var(--blue)" },
  "Đang phân tích": { bg: "var(--amber-soft)", fg: "var(--amber)" },
  "Trả kết quả": { bg: "var(--violet-soft)", fg: "var(--violet)" },
  "Hoàn tất": { bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
  "Hủy": { bg: "var(--red-soft)", fg: "var(--red)" },
};

const ORDERS = [
  { no: "DH-2608-001", name: "Quan trắc môi trường định kỳ Q3", type: "Quan trắc", sampleCode: "SAM-202608-001", ngayQT: "05/08/2026", ngayTra: "12/08/2026", kh: "Công ty CP Giấy Bãi Bằng", donVi: "Chi cục BVMT Phú Thọ", status: "Đang phân tích" },
  { no: "DH-2608-002", name: "Phân tích nước thải công nghiệp", type: "Mẫu gửi", sampleCode: "SAM-202608-002", ngayQT: "06/08/2026", ngayTra: "13/08/2026", kh: "KCN Tân Đức", donVi: "Ban Quản lý KCN Long An", status: "Tiếp nhận" },
  { no: "DH-2608-003", name: "Quan trắc khí thải lò hơi", type: "Quan trắc", sampleCode: "SAM-202608-003", ngayQT: "01/08/2026", ngayTra: "08/08/2026", kh: "Nhà máy Nhiệt điện Phả Lại", donVi: "Sở TN&MT Hải Dương", status: "Trả kết quả" },
  { no: "DH-2608-004", name: "Kiểm nghiệm nước sinh hoạt", type: "Mẫu gửi", sampleCode: "SAM-202608-004", ngayQT: "28/07/2026", ngayTra: "04/08/2026", kh: "Công ty CP Nước sạch Sông Đà", donVi: "Trung tâm Y tế Dự phòng", status: "Hoàn tất" },
  { no: "DH-2608-005", name: "Quan trắc nước thải bệnh viện", type: "Quan trắc", sampleCode: "SAM-202608-005", ngayQT: "07/08/2026", ngayTra: "14/08/2026", kh: "Bệnh viện Đa khoa Tỉnh Bắc Giang", donVi: "Sở Y tế Bắc Giang", status: "Báo giá" },
  { no: "DH-2608-006", name: "Đánh giá bụi, tiếng ồn khu vực sản xuất", type: "Quan trắc", sampleCode: "SAM-202608-006", ngayQT: "30/07/2026", ngayTra: "06/08/2026", kh: "Công ty CP Xi măng Bỉm Sơn", donVi: "Sở TN&MT Thanh Hóa", status: "Đang phân tích" },
  { no: "DH-2608-007", name: "Phân tích mẫu đất nông nghiệp", type: "Mẫu gửi", sampleCode: "SAM-202608-007", ngayQT: "22/07/2026", ngayTra: "29/07/2026", kh: "UBND Huyện Sóc Sơn", donVi: "Phòng TN&MT Sóc Sơn", status: "Hủy" },
  { no: "DH-2608-008", name: "Quan trắc nước mặt sông Đà", type: "Quan trắc", sampleCode: "SAM-202608-008", ngayQT: "10/08/2026", ngayTra: "17/08/2026", kh: "Công ty CP Nước sạch Sông Đà", donVi: "Sở TN&MT Hòa Bình", status: "Tiếp nhận" },
  { no: "DH-2608-009", name: "Kiểm nghiệm vải, thuốc nhuộm", type: "Mẫu gửi", sampleCode: "SAM-202608-009", ngayQT: "03/08/2026", ngayTra: "10/08/2026", kh: "Công ty TNHH Dệt May Hòa Bình", donVi: "Nội bộ doanh nghiệp", status: "Trả kết quả" },
  { no: "DH-2608-010", name: "Quan trắc môi trường lao động", type: "Quan trắc", sampleCode: "", ngayQT: "11/08/2026", ngayTra: "18/08/2026", kh: "KCN Tân Đức", donVi: "Ban Quản lý KCN Long An", status: "Báo giá" },
];

const WORKFLOW_STEPS = ["Báo giá", "Tiếp nhận mẫu", "Phân công", "Thử nghiệm", "Duyệt kết quả", "Trả CoA"];
const orderStepIndex = (status) => ({
  "Báo giá": 0, "Tiếp nhận": 1, "Đang phân tích": 3, "Trả kết quả": 5, "Hoàn tất": 5, "Hủy": -1,
}[status] ?? 0);

const REQUESTS = [
  { code: "YC-0231", kh: "Công ty CP Bao bì Sài Gòn", loai: "Quan trắc môi trường định kỳ", ngay: "05/08/2026", status: "Mới" },
  { code: "YC-0230", kh: "Công ty TNHH Thủy sản Minh Phú", loai: "Phân tích nước thải", ngay: "04/08/2026", status: "Đang xử lý" },
  { code: "YC-0229", kh: "KCN Tân Đức", loai: "Kiểm nghiệm mẫu đất", ngay: "03/08/2026", status: "Đã chuyển báo giá" },
  { code: "YC-0228", kh: "Trường học Liên cấp Newton", loai: "Kiểm nghiệm nước uống", ngay: "02/08/2026", status: "Mới" },
  { code: "YC-0227", kh: "Công ty CP Thép Việt Ý", loai: "Quan trắc khí thải", ngay: "01/08/2026", status: "Đang xử lý" },
];

const SAMPLE_TYPE_DEFS = [
  { code: "NM", name: "Nước mặt" },
  { code: "NN", name: "Nước ngầm" },
  { code: "NS", name: "Nước sạch" },
  { code: "NT", name: "Nước thải" },
  { code: "KK", name: "Không khí xung quanh" },
  { code: "KT", name: "Khí thải" },
  { code: "DAT", name: "Đất" },
];
const SAMPLE_TYPES = SAMPLE_TYPE_DEFS.map(t => t.name);

// Dữ liệu danh sách Nhà thầu phụ
const SUBCONTRACTORS = [
  { id: "SUB01", name: "Trung tâm Kiểm nghiệm Eurofins", contact: "024-3838-xxxx", address: "KCN Thạch Thất, Hà Nội", status: "Đang hợp tác" },
  { id: "SUB02", name: "Viện Kiểm nghiệm Thuốc Trung ương", contact: "024-3933-xxxx", address: "48 Hai Bà Trưng, Hà Nội", status: "Đang hợp tác" },
  { id: "SUB03", name: "Trung tâm TƯV 3 (QUATEST 3)", contact: "028-3829-xxxx", address: "49 Trương Định, Q.3, TP.HCM", status: "Đang hợp tác" },
  { id: "SUB04", name: "Công ty Kiểm định Vinacontrol", contact: "024-3852-xxxx", address: "54 Trần Nhân Tông, Hà Nội", status: "Tạm dừng" },
];

// Dữ liệu Danh mục Chỉ tiêu - Bổ sung field `assignee` & `isSubcontract`
const INDICATORS = [
  {
    code: "IND-01",
    name: "pH trong nước",
    method: "TCVN 6492:2011",
    unit: "-",
    lod: "1-14",
    limit: "5.5 - 9.0",
    qcvn: "QCVN 08:2023/BTNMT",
    price: 150000,
    assignee: "Acc KNV 1",
    isSubcontract: false,
    sampleTypes: ["Nước mặt", "Nước ngầm", "Nước sạch", "Nước thải"],
  },
  {
    code: "IND-02",
    name: "COD (Nhu cầu Oxi Hóa học)",
    method: "SMEWW 5220C:2017",
    unit: "mg/L",
    lod: "2.0 mg/L",
    limit: "≤ 150 mg/L",
    qcvn: "QCVN 40:2011/BTNMT",
    price: 350000,
    assignee: "Acc KNV 2",
    isSubcontract: false,
    sampleTypes: ["Nước mặt", "Nước ngầm", "Nước thải"],
  },
  {
    code: "IND-03",
    name: "Dư lượng Kháng sinh (Chlortetracycline)",
    method: "HPLC/MS/MS",
    unit: "µg/kg",
    lod: "0.1 µg/kg",
    limit: "KPH",
    qcvn: "QCVN 01-189:2019/BNNPTNT",
    price: 1200000, // giá bán cho khách hàng
    assignee: "Trung tâm Kiểm nghiệm Eurofins",
    isSubcontract: true,
    subPrices: { "Trung tâm Kiểm nghiệm Eurofins": 950000 }, // MỚI — giá vốn trả cho nhà thầu phụ
    sampleTypes: ["Nước thải", "Đất"],
  },
  {
    code: "IND-04",
    name: "Kim loại nặng - Thủy ngân (Hg)",
    method: "US EPA 7473",
    unit: "mg/kg",
    lod: "0.005 mg/kg",
    limit: "≤ 0.05 mg/kg",
    qcvn: "QCVN 03-MT:2015/BTNMT",
    price: 850000,
    assignee: "Trung tâm TƯV 3 (QUATEST 3)",
    isSubcontract: true,
    sampleTypes: ["Nước mặt", "Nước ngầm", "Nước thải", "Đất"],
  },
  {
    code: "IND-05",
    name: "Tổng Coliforms",
    method: "TCVN 6187-1:2019",
    unit: "CFU/100ml",
    lod: "1 CFU/100ml",
    limit: "0 CFU/100ml",
    qcvn: "QCVN 01-1:2018/BYT",
    price: 250000,
    assignee: "Acc KNV 3",
    isSubcontract: false,
    sampleTypes: ["Nước sạch", "Nước mặt", "Nước ngầm"],
  },
  {
    code: "IND-06",
    name: "Bụi tổng (TSP)",
    method: "TCVN 5067:1995",
    unit: "mg/m³",
    lod: "0.05 mg/m³",
    limit: "≤ 0.3 mg/m³",
    qcvn: "QCVN 05:2023/BTNMT",
    price: 280000,
    assignee: "Acc Trưởng phòng",
    isSubcontract: false,
    sampleTypes: ["Không khí xung quanh", "Khí thải"],
  },
];

const CUSTOMER_PARAMETER_PRICES = {
  "KH-0001": { "IND-01": 130000, "IND-02": 300000 }, // Giấy Bãi Bằng có giá ưu đãi
  "KH-0019": { "IND-04": 950000 }, // Samsung — hợp đồng khung giá riêng cho kim loại nặng
};

const getIndicatorPrice = (indicatorCode, customerId) => {
  const ind = INDICATORS.find((i) => i.code === indicatorCode);
  if (!ind) return 0;
  const override = CUSTOMER_PARAMETER_PRICES[customerId]?.[indicatorCode];
  return override ?? ind.price;
};

// Mã ký hiệu viết tắt theo loại mẫu — dùng để sinh "Ký hiệu mẫu" (VD: NT-01, KK-01)
const SAMPLE_TYPE_ABBR = {
  "Nước mặt": "NM", "Nước ngầm": "NN", "Nước sạch": "NS", "Nước thải": "NT",
  "Không khí xung quanh": "KK", "Khí thải": "KT", "Đất": "DAT",
};
const findIndicatorByName = (name) => INDICATORS.find((i) => i.name === name || i.name.startsWith(name));

// Mã Phiếu YCKN theo từng đơn hàng — format YYMMDD.XX (ngày lập phiếu . số thứ tự trong ngày)
const YCKN_CODE = {
  "DH-2608-001": "260805.01",
  "DH-2608-003": "260801.01",
  "DH-2608-006": "260730.01",
};

const BATCHES = [
  { sample: "SAM-202608-001", kyHieu: "260805.01/01", order: "DH-2608-001", assignmentNo: "GV-260805.01", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 1", thietBi: "Máy đo COD - COD-01", status: "TESTING", result: "", note: "" },
  { sample: "SAM-202608-001", kyHieu: "260805.01/01", order: "DH-2608-001", assignmentNo: "GV-260805.01", indicator: "BOD5", method: "TCVN 6001-1:2008", lodloq: "2 mg/L", unit: "mg/L", limit: "≤ 50", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 2", thietBi: "Tủ ấm BOD - BOD-02", status: "PENDING_APPROVAL", result: "38", note: "Đạt" },
  { sample: "SAM-202608-001", kyHieu: "260805.01/02", order: "DH-2608-001", assignmentNo: "GV-260805.01", indicator: "pH", method: "TCVN 6492:2011", lodloq: "-", unit: "-", limit: "5.5 - 9", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 2", thietBi: "Máy đo pH cầm tay", status: "APPROVED_COMPLETED", result: "7.2", note: "" },
  { sample: "SAM-202608-003", kyHieu: "260801.01/01", order: "DH-2608-003", assignmentNo: "GV-260801.01", indicator: "Tổng Nitơ", method: "TCVN 6638:2000", lodloq: "0.5 mg/L", unit: "mg/L", limit: "≤ 40", qcvn: "QCVN 19:2009/BTNMT", tech: "Acc Trưởng phòng", thietBi: "Máy phân tích N - N-01", status: "APPROVED_COMPLETED", result: "22", note: "" },
  { sample: "SAM-202608-006", kyHieu: "260730.01/01", order: "DH-2608-006", assignmentNo: "GV-260730.01", indicator: "Kim loại nặng (Pb)", method: "SMEWW 3111B", lodloq: "0.01 mg/L", unit: "mg/L", limit: "≤ 0.5", qcvn: "QCVN 05:2023/BTNMT", tech: "Acc KNV 1", thietBi: "Máy AAS", status: "REJECTED", result: "0.61", note: "Vượt ngưỡng, đề nghị làm lại" },
  { sample: "SAM-202608-006", kyHieu: "260730.01/02", order: "DH-2608-006", assignmentNo: "GV-260730.01", indicator: "Coliform tổng số", method: "TCVN 6187-2:1996", lodloq: "3 MPN/100mL", unit: "MPN/100mL", limit: "≤ 5000", qcvn: "QCVN 08:2023/BTNMT", tech: "Acc KNV 2", thietBi: "Tủ ủ vi sinh", status: "PENDING_APPROVAL", result: "1800", note: "Đạt" },
  { sample: "SAM-202608-008", kyHieu: "260810.01/01", order: "DH-2608-008", assignmentNo: "GV-260810.01", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", qcvn: "QCVN 08:2023/BTNMT", tech: "Acc KNV 3", thietBi: "Máy đo COD - COD-01", status: "ASSIGNED", result: "", note: "" },
];
const BATCH_STATUS = {
  ASSIGNED: { label: "Đã phân công", bg: "var(--blue-soft)", fg: "var(--blue)" },
  TESTING: { label: "Đang thử nghiệm", bg: "var(--amber-soft)", fg: "var(--amber)" },
  PENDING_APPROVAL: { label: "KNV đã nộp — chờ tổng hợp", bg: "var(--violet-soft)", fg: "var(--violet)" },
  PENDING_HEAD_APPROVAL: { label: "Đã tổng hợp — chờ Trưởng phòng duyệt", bg: "var(--blue-soft)", fg: "var(--blue)" },
  REJECTED: { label: "Yêu cầu làm lại", bg: "var(--red-soft)", fg: "var(--red)" },
  APPROVED_COMPLETED: { label: "Đã duyệt", bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
};

// Header của Phiếu giao việc — dùng chung cho toàn bộ chỉ tiêu thuộc 1 Phiếu YCKN
const WORK_ASSIGNMENTS = {
  "DH-2608-001": {
    assignmentNo: "GV-260805.01",
    deliveryDate: "05/08/2026",
    delivererType: "INTERNAL",
    delivererName: "Acc Quản lý",
    delivererContact: "",
    notes: "Mẫu bảo quản lạnh, ưu tiên phân tích COD trước.",
  },
  "DH-2608-003": {
    assignmentNo: "GV-260801.01",
    deliveryDate: "01/08/2026",
    delivererType: "EXTERNAL",
    delivererName: "Anh Tuấn - Lái xe Nhiệt điện Phả Lại",
    delivererContact: "0912 345 678",
    notes: "",
  },
  "DH-2608-006": {
    assignmentNo: "GV-260730.01",
    deliveryDate: "30/07/2026",
    delivererType: "INTERNAL",
    delivererName: "Acc KNV 1",
    delivererContact: "",
    notes: "",
  },
    "DH-2608-008": {
    assignmentNo: "GV-260810.01",
    deliveryDate: "10/08/2026",
    delivererType: "EXTERNAL",
    delivererName: "Chị Hạnh - Nhân viên KT Sông Đà",
    delivererContact: "0987 654 321",
    notes: "",
  },

  
};

// Hàm tra cứu — đặt sau khối WORK_ASSIGNMENTS
const getAssignmentByOrder = (orderNo) => WORK_ASSIGNMENTS[orderNo] || null;

const delivererLabel = (a) =>
  !a ? "—" : a.delivererType === "INTERNAL"
    ? a.delivererName
    : `${a.delivererName}${a.delivererContact ? ` (${a.delivererContact})` : ""} · Ngoài hệ thống`;
// Thứ tự luồng xử lý kết quả — dùng để vẽ tiến trình trực quan
const RESULT_FLOW = ["ASSIGNED", "TESTING", "PENDING_APPROVAL", "PENDING_HEAD_APPROVAL", "APPROVED_COMPLETED"];
const RESULT_FLOW_LABELS = ["Phân công", "Thử nghiệm", "KNV nộp KQ", "Quản lý tổng hợp", "Trưởng phòng duyệt"];
const TECHNICIANS = ["Acc KNV 1", "Acc KNV 2", "Acc KNV 3", "Acc Trưởng phòng"];
const ROLES = [
  { key: "A", label: "Kiểm nghiệm viên", name: "Acc KNV 1", icon: FlaskConical },
  { key: "B", label: "Quản lý", name: "Acc Quản lý", icon: Users },
  { key: "C", label: "Trưởng phòng / Duyệt", name: "Acc Trưởng phòng", icon: ShieldCheck },
];

const QUOTES = [
  { code: "BG-0088", kh: "Công ty CP Giấy Bãi Bằng", customerId: "KH-0001", ngay: "28/07/2026", freq: "3 tháng / lần", items: [
    { code: "IND-01", sampleType: "Nước thải", qty: 2 },
    { code: "IND-02", sampleType: "Nước thải", qty: 2 },
  ], status: "Đã chuyển đơn hàng" },
  { code: "BG-0089", kh: "Bệnh viện Đa khoa Tỉnh Bắc Giang", customerId: "KH-0007", ngay: "02/08/2026", freq: "Hàng năm", items: [
    { code: "IND-01", sampleType: "Nước sạch", qty: 1 },
    { code: "IND-05", sampleType: "Nước sạch", qty: 1 },
  ], status: "Đã gửi khách hàng" },
  { code: "BG-0090", kh: "KCN Tân Đức", customerId: "KH-0003", ngay: "04/08/2026", freq: "Hàng tháng", items: [
    { code: "IND-02", sampleType: "Nước thải", qty: 1 },
    { code: "IND-04", sampleType: "Nước thải", qty: 1 },
  ], status: "Nháp" },
];

// Yêu cầu thử nghiệm — sinh ra sau khi báo giá được chuyển thành đơn hàng
// Mỗi đơn hàng có nhiều "Mục" (nhóm theo loại mẫu), mỗi Mục có nhiều mẫu
const TEST_REQUESTS = {
  "DH-2608-001": {
  kh: "Công ty CP Giấy Bãi Bằng",
  diaDiemLayMau: "Nhà máy Giấy Bãi Bằng, Phù Ninh, Phú Thọ", // MỚI
  groups: [
    {
      title: "Mục I: Nước thải",
      type: "Nước thải",
      samples: [
        { stt: 1, ten: "Nước thải đầu ra hố ga số 1", viTriLayMau: "Hố ga số 1, khu xử lý nước thải", ngayHenTra: "12/08/2026", luong: "2 lít", tinhTrang: "Đạt yêu cầu", chiTieu: ["pH trong nước", "COD (Nhu cầu Oxi Hóa học)"] },
        { stt: 2, ten: "Nước thải đầu ra hố ga số 2", luong: "2 lít", tinhTrang: "Đạt yêu cầu", chiTieu: ["COD (Nhu cầu Oxi Hóa học)"] },
        ],
      },
      {
        title: "Mục II: Không khí xung quanh",
        type: "Không khí xung quanh",
        samples: [
          { stt: 1, ten: "Khu vực cổng bảo vệ", luong: "-", tinhTrang: "Đạt yêu cầu", chiTieu: ["Bụi tổng (TSP)"] },
        ],
      },
    ],
  },
  "DH-2608-003": {
    kh: "Nhà máy Nhiệt điện Phả Lại",
    groups: [
      {
        title: "Mục I: Khí thải",
        type: "Khí thải",
        samples: [
          { stt: 1, ten: "Khí thải ống khói lò hơi số 1", luong: "-", tinhTrang: "Đạt yêu cầu", chiTieu: ["Bụi tổng (TSP)"] },
          { stt: 2, ten: "Khí thải ống khói lò hơi số 2", luong: "-", tinhTrang: "Đạt yêu cầu", chiTieu: ["Bụi tổng (TSP)"] },
        ],
      },
    ],
  },
  "DH-2608-006": {
    kh: "Công ty CP Xi măng Bỉm Sơn",
    groups: [
      {
        title: "Mục I: Không khí xung quanh",
        type: "Không khí xung quanh",
        samples: [
          { stt: 1, ten: "Khu vực nhà nghiền clinker", luong: "-", tinhTrang: "Đạt yêu cầu", chiTieu: ["Bụi tổng (TSP)"] },
          { stt: 2, ten: "Khu vực cổng ra vào", luong: "-", tinhTrang: "Đạt yêu cầu", chiTieu: ["Bụi tổng (TSP)"] },
        ],
      },
    ],
  },
};

const ANNOUNCEMENTS = [
  { title: "Cập nhật quy trình mã hóa mẫu từ 01/08/2026", body: "Toàn bộ mẫu tiếp nhận từ tháng 8 áp dụng định dạng mã SAM-YYYYMM-###.", date: "01/08/2026" },
  { title: "Lịch hiệu chuẩn thiết bị Quý III/2026", body: "Phòng thiết bị sẽ hiệu chuẩn máy AAS và máy đo COD trong tuần từ 10/08.", date: "30/07/2026" },
  { title: "Nghỉ lễ và lịch trực phòng thí nghiệm", body: "Thông báo lịch trực và tiếp nhận mẫu trong kỳ nghỉ sắp tới.", date: "28/07/2026" },
];

const PERSONAL_TASKS = [
  { text: "Bạn được phân công công việc phân tích COD — mẫu SAM-202608-001", target: "nhapKQ" },
  { text: "Kết quả chỉ tiêu Pb — mẫu SAM-202608-006 bị từ chối, yêu cầu làm lại", target: "nhapKQ" },
  { text: "Đơn hàng DH-2608-005 đang chờ bạn duyệt báo giá", target: "duyetPhieu" },
  { text: "Nhắc hẹn trả kết quả đơn hàng DH-2608-003 vào 08/08/2026", target: "banLamViec" },
];

const OVERDUE_ORDERS = ORDERS.filter((o) => ["Tiếp nhận", "Đang phân tích"].includes(o.status)).slice(0, 3);

const UPCOMING_RETURN = ORDERS.filter((o) => o.status === "Trả kết quả" || o.status === "Đang phân tích").slice(0, 4);
const TODAY_TASKS = [
  "Nhận mẫu từ KCN Tân Đức — 08:30",
  "Duyệt kết quả đơn DH-2608-004 — 10:00",
  "Hiệu chuẩn máy đo pH — 14:00",
  "Gửi CoA cho Công ty CP Nước sạch Sông Đà — 16:00",
];

const SCHEDULE = [
  { day: "Thứ 2, 03/08", items: ["08:00: Acc KNV 1: Nhận mẫu KH KCN Tân Đức", "13:30 Họp giao ban phòng Lab"] },
  { day: "Thứ 3, 04/08", items: ["09:00: Acc KNV 2: Hiệu chuẩn máy COD", "15:00 Trả kết quả DH-2608-004"] },
  { day: "Thứ 4, 05/08", items: ["08:30 Khảo sát hiện trường Bãi Bằng", "14:00 Đào tạo nội bộ ISO 17025"] },
  { day: "Thứ 5, 06/08", items: ["10:00 Duyệt CoA đơn DH-2608-006"] },
  { day: "Thứ 6, 07/08", items: ["09:00: Acc Trường phòng, Acc KNV 3: Nhận mẫu Bệnh viện Bắc Giang", "16:00 Tổng kết tuần"] },
];

const CHART_DATA = [
  { month: "T3", plan: 42, actual: 39 },
  { month: "T4", plan: 45, actual: 47 },
  { month: "T5", plan: 50, actual: 44 },
  { month: "T6", plan: 48, actual: 49 },
  { month: "T7", plan: 55, actual: 52 },
  { month: "T8", plan: 40, actual: 21 },
];

const REVENUE_BY_CUSTOMER = [
  { name: "Giấy Bãi Bằng", value: 84 }, { name: "Nhiệt điện Phả Lại", value: 61 },
  { name: "KCN Tân Đức", value: 97 }, { name: "Nước sạch Sông Đà", value: 45 },
  { name: "Khác", value: 38 },
];
const PIE_COLORS = ["#0F6E5C", "#3E6EA6", "#B8792A", "#6957A8", "#8A968D"];

const TECH_PRODUCTIVITY = TECHNICIANS.map((t) => ({
  name: t.split(" ").slice(-1)[0],
  giao: BATCHES.filter((b) => b.tech === t).length + 6,
  hoanThanh: BATCHES.filter((b) => b.tech === t && b.status === "APPROVED_COMPLETED").length + 5,
}));
// Số mẫu theo nền mẫu (loại mẫu) theo từng tháng — dữ liệu demo
const SAMPLES_BY_MATRIX_MONTH = [
  { month: "T3", "Nước mặt": 8, "Nước ngầm": 4, "Nước sạch": 10, "Nước thải": 14, "Không khí xung quanh": 3, "Khí thải": 2, "Đất": 1 },
  { month: "T4", "Nước mặt": 6, "Nước ngầm": 5, "Nước sạch": 12, "Nước thải": 16, "Không khí xung quanh": 4, "Khí thải": 2, "Đất": 2 },
  { month: "T5", "Nước mặt": 9, "Nước ngầm": 3, "Nước sạch": 11, "Nước thải": 15, "Không khí xung quanh": 5, "Khí thải": 3, "Đất": 1 },
  { month: "T6", "Nước mặt": 7, "Nước ngầm": 6, "Nước sạch": 13, "Nước thải": 17, "Không khí xung quanh": 4, "Khí thải": 2, "Đất": 2 },
  { month: "T7", "Nước mặt": 10, "Nước ngầm": 4, "Nước sạch": 14, "Nước thải": 19, "Không khí xung quanh": 6, "Khí thải": 3, "Đất": 3 },
  { month: "T8", "Nước mặt": 5, "Nước ngầm": 2, "Nước sạch": 8, "Nước thải": 11, "Không khí xung quanh": 3, "Khí thải": 1, "Đất": 1 },
];
const SAMPLE_TEST_STATUS = ["Chưa kiểm nghiệm", "Đang kiểm nghiệm", "Đã kiểm nghiệm", "Cần xem xét lại"];
const testStatusStyle = {
  "Chưa kiểm nghiệm": { bg: "var(--gray-soft)", fg: "#5B6659" },
  "Đang kiểm nghiệm": { bg: "var(--amber-soft)", fg: "var(--amber)" },
  "Đã kiểm nghiệm": { bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
  "Cần xem xét lại": { bg: "var(--red-soft)", fg: "var(--red)" },
};

/* ============================================================
   PHÂN QUYỀN — nguồn dữ liệu duy nhất cho mọi kiểm tra truy cập
   A = Kiểm nghiệm viên · B = Quản lý (mọi thứ trừ khâu Duyệt cuối)
   C = Trưởng phòng (toàn quyền, kể cả Duyệt)
   ============================================================ */
const PAGE_ROLES = {
  banLamViec: ["A", "B", "C"],
  tongQuanLab: ["A", "B", "C"],
  khachHang: ["A", "B", "C"],
  baoGia: ["B", "C"],              // đổi: bỏ "A"
  hopDong: ["B", "C"],             // đổi: bỏ "A"
  TaoPhieuYCKN: ["B", "C"],
  yeuCauTN: ["B", "C"],
  phanCong: ["B", "C"],
  meThuNghiem: ["B", "C"],
  nhapKQ: ["A", "B", "C"],
  tongHopPhieu: ["B", "C"],
  duyetPhieu: ["C"],
  ketQuaThuNghiem: ["B", "C"],     // đổi: bỏ "A"
  tkKinhDoanh: ["B", "C"],
  tkNangSuat: ["B", "C"],
  tkKyThuat: ["B", "C"],
  tkNenMau: ["B", "C"],
  danhMucA: ["A", "B", "C"],
  nhaThauPhu: ["B", "C"],          // đổi: bỏ "A"
  loaiMau: ["B", "C"],             // mới — xem mục 2
  nguoiDung: ["B", "C"],
};
const canAccess = (page, role) => PAGE_ROLES[page]?.includes(role);
const firstAllowedPage = (role) => Object.keys(PAGE_ROLES).find((p) => canAccess(p, role)) || "banLamViec";
// Trưởng phòng chỉ được TÁC ĐỘNG (thêm/sửa/xóa) ở 2 trang này — các trang khác chỉ xem
const EDITABLE_PAGES_FOR_C = ["duyetPhieu", "nguoiDung"];
const canEditData = (role, page) => role === "B" || (role === "C" && EDITABLE_PAGES_FOR_C.includes(page));

/* ============================================================
   SMALL COMPONENTS
   ============================================================ */
const StatusBadge = ({ status }) => {
  const s = statusStyle[status] || statusStyle["Báo giá"];
  return <span className="badge" style={{ background: s.bg, color: s.fg }}>{status}</span>;
};

const SpecimenTag = ({ children }) => <span className="specimen-tag">{children}</span>;

const SectionCard = ({ title, icon: Icon, action, children, style }) => (
  <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden", ...style }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && <Icon size={16} color="var(--primary)" />}
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{title}</h3>
      </div>
      {action}
    </div>
    <div style={{ padding: 16 }}>{children}</div>
  </div>
);

const Toolbar = ({ search, setSearch, placeholder, filterLabel, filterOptions, filter, setFilter, onAdd, addLabel }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
    <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
      <Search size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 9 }} />
      <input className="lims-input" style={{ width: "100%", paddingLeft: 30 }} placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
    {filterOptions && (
      <select className="lims-input" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="">{filterLabel}</option>
        {filterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    )}
    <div style={{ flex: 1 }} />
    <button className="lims-btn lims-btn-ghost"><Download size={14} /> Xuất Excel</button>
    {onAdd && <button className="lims-btn lims-btn-primary" onClick={onAdd}><Plus size={14} /> {addLabel}</button>}
  </div>
);

const RowActions = ({ onView, onEdit, onDelete }) => (
  <div style={{ display: "flex", gap: 6 }}>
    {onView && <button className="lims-btn-icon" onClick={onView} title="Xem"><Eye size={14} /></button>}
    {onEdit && <button className="lims-btn-icon" onClick={onEdit} title="Sửa"><Pencil size={14} /></button>}
    {onDelete && <button className="lims-btn-icon" onClick={onDelete} title="Xóa"><Trash2 size={14} /></button>}
  </div>
);

const Modal = ({ title, onClose, children, width = 460 }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(15,30,25,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 20 }} onClick={onClose}>
    <div className="lims-root" style={{ width, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: "var(--surface)", borderRadius: 12, boxShadow: "0 30px 60px rgba(0,0,0,.25)" }} onClick={(e) => e.stopPropagation()}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{title}</h3>
        <button className="lims-btn-icon" onClick={onClose}><X size={14} /></button>
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  </div>
);

/* Thanh tiến trình luồng xử lý kết quả — hiển thị dùng chung ở nhiều trang
   để người dùng luôn thấy rõ đang ở bước nào trong: Thử nghiệm → KNV nộp →
   Quản lý tổng hợp → Trưởng phòng duyệt */
const ResultFlowTrack = ({ currentStatus }) => {
  const idx = RESULT_FLOW.indexOf(currentStatus);
  const isRejected = currentStatus === "REJECTED";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      {RESULT_FLOW_LABELS.map((label, i) => {
        const active = !isRejected && i <= idx;
        const isCurrent = !isRejected && i === idx;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 7, height: 7, borderRadius: 99,
                background: isRejected ? "var(--red)" : active ? "var(--primary)" : "var(--line)",
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 11, fontWeight: isCurrent ? 700 : 500, color: isRejected ? "var(--red)" : active ? "var(--ink)" : "var(--ink-faint)", whiteSpace: "nowrap" }}>
                {label}
              </span>
            </div>
            {i < RESULT_FLOW_LABELS.length - 1 && <div style={{ width: 14, height: 1, background: "var(--line)" }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/* ============================================================
   LOGIN
   ============================================================ */
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [selectedRole, setSelectedRole] = useState("B");
  

  return (
    <div className="lims-root" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg, #0F6E5C 0%, #123B33 100%)", padding: 20 }}>
      <GlobalStyle />
      <div style={{ display: "flex", width: "100%", maxWidth: 860, background: "var(--surface)", borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 60px rgba(10,40,33,.35)" }}>
        <div style={{ flex: "1 1 320px", background: "var(--primary-dark)", color: "#fff", padding: 36, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 460 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <FlaskConical size={22} />
              <span className="disp" style={{ fontWeight: 700, fontSize: 17, letterSpacing: ".02em" }}>LabTrack</span>
            </div>
            <p style={{ marginTop: 26, fontSize: 13, lineHeight: 1.7, color: "#CFE6DE" }}>
              Hệ thống quản lý phòng thí nghiệm — từ báo giá, tiếp nhận mẫu, phân công thử nghiệm, tổng hợp đến duyệt & xuất phiếu kết quả.
            </p>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "#8FC1B0", letterSpacing: ".05em" }}>
            <div className="tick-rule" style={{ marginBottom: 10, filter: "invert(1)", opacity: .25 }} />
            SAM-202608-001 · pH · COD · BOD5 · TỔNG N
          </div>
        </div>

        <div style={{ flex: "1 1 380px", padding: 40 }}>
          <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>Đăng nhập</h2>
          <p style={{ margin: "0 0 26px", fontSize: 13, color: "var(--ink-soft)" }}>Truy cập hệ thống nội bộ phòng thí nghiệm</p>

          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Tài khoản</label>
          <div style={{ position: "relative", margin: "6px 0 16px" }}>
            <Mail size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 12 }} />
            <input className="lims-input" style={{ width: "100%", paddingLeft: 30 }} placeholder="ten.nhanvien@labtrack.vn" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Mật khẩu</label>
          <div style={{ position: "relative", margin: "6px 0 22px" }}>
            <Lock size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 12 }} />
            <input className="lims-input" type="password" style={{ width: "100%", paddingLeft: 30 }} placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} />
          </div>

          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Vai trò demo (RBAC)</label>
          <div style={{ display: "flex", gap: 8, margin: "6px 0 8px" }}>
            {ROLES.map((r) => (
              <button key={r.key} onClick={() => setSelectedRole(r.key)} style={{
                flex: 1, padding: "8px 6px", borderRadius: 8, cursor: "pointer",
                border: selectedRole === r.key ? "2px solid var(--primary)" : "1px solid var(--line)",
                background: selectedRole === r.key ? "var(--primary-soft)" : "var(--surface)",
                fontSize: 11.5, fontWeight: 600, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}>
                <r.icon size={16} color="var(--primary-dark)" /> {r.label}
              </button>
            ))}
          </div>
          <p style={{ margin: "0 0 18px", fontSize: 11, color: "var(--ink-faint)" }}>
            {selectedRole === "A" && "Xem & nhập kết quả cho công việc được giao."}
            {selectedRole === "B" && "Toàn quyền vận hành — trừ khâu Duyệt cuối cùng."}
            {selectedRole === "C" && "Toàn quyền, bao gồm Duyệt & ký số phiếu kết quả."}
          </p>

          <button className="lims-btn lims-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px 0" }} onClick={() => onLogin(selectedRole)}>
            Đăng nhập <ChevronRight size={14} />
          </button>
          
          <p style={{ marginTop: 16, fontSize: 11.5, color: "var(--ink-faint)", textAlign: "center" }}>Bản demo trình chiếu — nhấn Đăng nhập để tiếp tục</p>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   NAV STRUCTURE — 7 nhóm chức năng theo sơ đồ
   ============================================================ */
const NAV_GROUPS = [
  {
    key: "tongQuan", label: "1. Tổng quan", icon: Home,
    children: [
      { key: "banLamViec", label: "Bàn làm việc cá nhân" },
      { key: "tongQuanLab", label: "Tổng quan Phòng Lab" },
    ],
  },
  {
    key: "kinhDoanh", label: "2. Đơn hàng", icon: ClipboardList, 
    children: [
      { key: "khachHang", label: "Danh sách Khách hàng" },
      { key: "baoGia", label: "Báo giá" },
      { key: "TaoPhieuYCKN", label: "Tạo phiếu"},
    ],
  },
  {
    key: "tiepNhan", label: "3. Tiếp nhận & Phân công", icon: PackageCheck,
    children: [
      { key: "yeuCauTN", label: "Yêu cầu thử nghiệm" },
      { key: "phanCong", label: "Giao việc" },
      { key: "meThuNghiem", label: "Quản lý Mẻ thử nghiệm" },
    ],
  },
  {
    key: "banKNV", label: "4. Bàn làm việc KNV", icon: FlaskConical,
    children: [
      { key: "nhapKQ", label: "Nhập kết quả thử nghiệm" },
    ],
  },
  {
    key: "duyet", label: "5. Tổng hợp, Duyệt & Báo cáo", icon: FileCheck2,
    children: [
      { key: "tongHopPhieu", label: "Tổng hợp & Gửi duyệt" },
      { key: "duyetPhieu", label: "Duyệt phiếu kết quả" },
      { key: "ketQuaThuNghiem", label: "Kết quả thử nghiệm" },
    ],
  },
  {
    key: "baoCao", label: "6. Báo cáo & Thống kê", icon: BarChart3,
    children: [
      { key: "tkKinhDoanh", label: "Thống kê Đơn hàng & Khách hàng" },
      { key: "tkNangSuat", label: "Thống kê Năng suất & Tiến độ Lab" },
      { key: "tkKyThuat", label: "Thống kê Kỹ thuật" },
      { key: "hopDong", label: "Hợp đồng & Tần suất" },
      { key: "tkNenMau", label: "Thống kê theo Nền mẫu" },
    ],
  },
  {
    key: "heThong", label: "7. Cấu hình & Hệ thống", icon: Settings,
    children: [
      { key: "danhMucA", label: "Danh mục chỉ tiêu" },
      { key: "loaiMau", label: "Loại mẫu" },
      { key: "nhaThauPhu", label: "Nhà thầu phụ" },
      { key: "nguoiDung", label: "Người dùng & Phòng ban" },
    ],
  },
];
const findGroupByChild = (childKey) => NAV_GROUPS.find((g) => g.children.some((c) => c.key === childKey));

/* Lọc nav theo phân quyền — mỗi mục / nhóm chỉ hiện nếu vai trò hiện tại có quyền,
   dùng chung một PAGE_ROLES nên không còn rẽ nhánh rải rác theo role như trước */
const visibleNavForRole = (role) =>
  NAV_GROUPS
    .map((g) => ({ ...g, children: g.children.filter((c) => canAccess(c.key, role)) }))
    .filter((g) => g.children.length > 0);


/* ============================================================
   HEADER / TWO-TIER NAV
   ============================================================ */
const Header = ({ page, setPage, onLogout, role }) => {
  const visibleGroups = visibleNavForRole(role);
  const activeGroup = findGroupByChild(page) || visibleGroups[0];
  const currentRole = ROLES.find((r) => r.key === role);
  return (
    <div style={{ background: "var(--primary-dark)", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", padding: "0 20px", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", marginRight: 28, flexShrink: 0 }}>
          <FlaskConical size={19} />
          <span className="disp" style={{ fontWeight: 700, fontSize: 15 }}>LabTrack</span>
        </div>
        <nav style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }} className="lims-scroll">
          {visibleGroups.map((g) => {
            const active = activeGroup?.key === g.key;
            return (
              <button
                key={g.key}
                onClick={() => setPage(g.children[0].key)}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", marginTop: 8,
                  borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer",
                  fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
                  background: active ? "var(--bg)" : "transparent",
                  color: active ? "var(--primary-dark)" : "#CFE6DE",
                }}
              >
                <g.icon size={14} /> {g.label.toUpperCase()}
              </button>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 16, flexShrink: 0 }}>
          <button className="lims-btn-icon" style={{ borderColor: "transparent", color: "#CFE6DE" }} title="Thông báo"><Bell size={16} /></button>
          <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12.5, fontWeight: 600 }}>
            <UserCircle2 size={20} /> {currentRole.name}
            <span style={{ fontSize: 10.5, fontWeight: 500, color: "#9FCBBE", border: "1px solid #2A6357", borderRadius: 99, padding: "1px 7px" }}>{currentRole.label}</span>
          </div>
          <button className="lims-btn-icon" style={{ borderColor: "transparent", color: "#CFE6DE" }} onClick={onLogout} title="Đăng xuất"><LogOut size={16} /></button>
        </div>
      </div>
      {activeGroup && activeGroup.children.length > 1 && (
        <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", gap: 4, padding: "0 20px", overflowX: "auto" }} className="lims-scroll">
            {activeGroup.children.map((c) => (
              <button key={c.key} onClick={() => setPage(c.key)} style={{
                padding: "10px 12px", border: "none", background: "none", cursor: "pointer",
                fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 12.5, whiteSpace: "nowrap",
                color: page === c.key ? "var(--primary-dark)" : "var(--ink-faint)",
                borderBottom: page === c.key ? "2px solid var(--primary)" : "2px solid transparent",
              }}>{c.label}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const PageHeader = ({ title, subtitle }) => (
  <div style={{ maxWidth: 1320, margin: "0 auto", padding: "22px 20px 4px" }}>
    <h1 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{title}</h1>
    {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-soft)" }}>{subtitle}</p>}
  </div>
);

const PageShell = ({ children }) => (
  <div style={{ maxWidth: 1320, margin: "0 auto", padding: "16px 20px 60px", display: "flex", flexDirection: "column", gap: 16 }}>
    {children}
  </div>
);

/* ============================================================
   1. TỔNG QUAN — Bàn làm việc cá nhân
   ============================================================ */
const BanLamViecPage = ({ setPage }) => {
  const [tab, setTab] = useState("banTin");
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [isOpen, setIsOpen] = useState(false);

// Hàm lọc danh sách theo từ khóa
const filteredTechs = TECHNICIANS.filter((tech) =>
  tech.toLowerCase().includes(searchTerm.toLowerCase())
);
  const toggleTech = (tech) => {
    setSelectedTechs((prev) =>
    prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
  );
};
  return (
  <>
    <PageHeader title="Bàn làm việc cá nhân" subtitle="Tổng quan công việc và bản tin nội bộ" />
    <PageShell>
      
      <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--line)" }}>
        {[{ k: "banTin", l: "Bản tin" }, { k: "lich", l: "Lịch công tác" }].map((t) => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
            fontFamily: "'IBM Plex Sans',sans-serif", fontWeight: 600, fontSize: 13.5,
            color: tab === t.k ? "var(--primary-dark)" : "var(--ink-faint)",
            borderBottom: tab === t.k ? "2px solid var(--primary)" : "2px solid transparent",
          }}>{t.l}</button>
        ))}
      </div>

      {tab === "banTin" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard title="Bảng tin nội bộ" icon={FileText}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {ANNOUNCEMENTS.map((a, i) => (
                  <div key={i} style={{ paddingBottom: 12, borderBottom: i < ANNOUNCEMENTS.length - 1 ? "1px solid var(--line)" : "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontWeight: 600, fontSize: 13.5 }}>{a.title}</span>
                      <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", whiteSpace: "nowrap" }}>{a.date}</span>
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "var(--ink-soft)" }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Công việc hôm nay" icon={Clock}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TODAY_TASKS.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12.5, alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color="var(--ink-faint)" style={{ marginTop: 1, flexShrink: 0 }} />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard title="Công việc cá nhân" icon={Bell}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {PERSONAL_TASKS.map((t, i) => (
                  <button key={i} onClick={() => setPage(t.target)} style={{
                    display: "flex", alignItems: "flex-start", gap: 8, textAlign: "left",
                    padding: "9px 8px", border: "none", background: "none", cursor: "pointer",
                    borderRadius: 8, fontSize: 12.5, color: "var(--ink)",
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-alt)"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: "var(--primary)", marginTop: 5, flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{t.text}</span>
                    <ChevronRight size={13} color="var(--ink-faint)" style={{ marginTop: 2 }} />
                  </button>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Chuẩn bị trả kết quả" icon={ArrowUpRight}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {UPCOMING_RETURN.map((o) => (
                  <div key={o.no} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
                    <SpecimenTag>{o.no}</SpecimenTag>
                    <span className="mono" style={{ color: "var(--ink-soft)" }}>{o.ngayTra}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              className="lims-btn lims-btn-primary" 
              onClick={() => setShowAddScheduleModal(true)}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
            >
              <Plus size={14} /> Thêm lịch công tác
            </button>
          </div>

          <SectionCard title="Lịch công tác tuần này" icon={CalendarDays}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SCHEDULE.map((d, i) => (
                <div key={d.day} style={{ display: "flex", gap: 16, padding: "12px 0", borderBottom: i < SCHEDULE.length - 1 ? "1px solid var(--line)" : "none" }}>
                  <div style={{ width: 110, flexShrink: 0, fontWeight: 600, fontSize: 12.5, color: "var(--primary-dark)" }}>{d.day}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                    {d.items.map((it, j) => (
                      <div key={j} style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{it}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Form Modal Thêm Lịch Công Tác (Demo Frontend) */}
      {showAddScheduleModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "var(--surface)", borderRadius: 12, width: "100%", maxWidth: 480,
            padding: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", gap: 16
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Thêm lịch công tác mới</h3>
              <button 
                onClick={() => setShowAddScheduleModal(false)}
                style={{ border: "none", background: "none", cursor: "pointer", color: "var(--ink-faint)" }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Thứ / Ngày</label>
                <select className="lims-input" style={{ width: "100%", padding: "8px 10px" }}>
                  <option>Thứ Hai (10/08)</option>
                  <option>Thứ Ba (11/08)</option>
                  <option>Thứ Tư (12/08)</option>
                  <option>Thứ Năm (13/08)</option>
                  <option>Thứ Sáu (14/08)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Thời gian</label>
                <input className="lims-input" type="time" defaultValue="08:30" style={{ width: "100%", padding: "8px 10px" }} />
              </div>

              <div style={{ position: "relative" }}>
  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 6 }}>
    Nhân sự Tham gia
  </label>

  {/* Backdrop ẩn dropdown khi click ra ngoài */}
  {isOpen && (
    <div
      onClick={() => setIsOpen(false)}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }}
    />
  )}

  {/* Ô Nhập liệu Tìm kiếm */}
  <div style={{ position: "relative", zIndex: 10 }}>
    <input
      type="text"
      placeholder="Tìm và chọn nhân sự..."
      value={searchTerm}
      onFocus={() => setIsOpen(true)}
      onChange={(e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
      }}
      style={{
        width: "100%",
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid var(--line)",
        fontSize: 13,
        outline: "none",
        boxSizing: "border-box",
        background: "var(--surface, #fff)"
      }}
    />

    {/* Dropdown Menu xổ xuống */}
    {isOpen && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          marginTop: 4,
          maxHeight: 200,
          overflowY: "auto",
          background: "var(--surface, #ffffff)",
          border: "1px solid var(--line)",
          borderRadius: 8,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 11
        }}
      >
        {filteredTechs.length > 0 ? (
          filteredTechs.map((tech, idx) => {
            const isSelected = selectedTechs.includes(tech);
            return (
              <div
                key={idx}
                onClick={() => toggleTech(tech)}
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: isSelected ? "var(--primary-soft, #E6F4F1)" : "transparent",
                  color: isSelected ? "var(--primary-dark)" : "var(--ink-soft)",
                  fontWeight: isSelected ? 600 : 400,
                  transition: "background 0.15s ease"
                }}
              >
                <span>{tech}</span>
                <span>{isSelected ? "✓" : "+"}</span>
              </div>
            );
          })
        ) : (
          <div style={{ padding: "10px 12px", fontSize: 12, color: "var(--ink-soft)", textAlign: "center" }}>
            Không tìm thấy nhân sự
          </div>
        )}
      </div>
    )}
  </div>

  {/* Danh sách nhân sự ĐÃ CHỌN dạng Chip bên dưới */}
  {selectedTechs.length > 0 && (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 11, color: "var(--ink-soft)", marginBottom: 6 }}>
        Đã chọn ({selectedTechs.length}):
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {selectedTechs.map((tech, idx) => (
          <span
            key={idx}
            style={{
              padding: "4px 10px",
              borderRadius: 16,
              background: "var(--primary-soft, #E6F4F1)",
              color: "var(--primary-dark)",
              border: "1px solid var(--primary)",
              fontSize: 12,
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 6
            }}
          >
            {tech}
            <span
              onClick={() => toggleTech(tech)}
              style={{ cursor: "pointer", fontWeight: "bold", fontSize: 13, lineHeight: 1 }}
            >
              ×
            </span>
          </span>
        ))}
      </div>
    </div>
  )}
</div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Nội dung công tác</label>
                <textarea 
                  className="lims-input" 
                  rows={3} 
                  placeholder="Nhập chi tiết nội dung công việc, địa điểm..." 
                  style={{ width: "100%", padding: "8px 10px", resize: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
              <button 
                onClick={() => setShowAddScheduleModal(false)}
                style={{
                  padding: "8px 16px", borderRadius: 6, border: "1px solid var(--line)",
                  background: "var(--surface)", cursor: "pointer", fontSize: 12.5, fontWeight: 600
                }}
              >
                Hủy
              </button>
              <button 
                className="lims-btn lims-btn-primary"
                onClick={() => setShowAddScheduleModal(false)}
                style={{ padding: "8px 16px", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}
              >
                Lưu lịch
              </button>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  </>
);
};

/* ============================================================
   1. TỔNG QUAN — Tổng quan Phòng Lab (Quản lý)
   ============================================================ */
const TongQuanLabPage = () => (
  <>
    <PageHeader title="Tổng quan Phòng Lab" subtitle="Góc nhìn quản lý — tải trọng công việc và điểm nghẽn hiện tại" />
    <PageShell>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
        {[
          { label: "Đơn hàng đang xử lý", value: ORDERS.filter((o) => !["Hoàn tất", "Hủy"].includes(o.status)).length, color: "var(--primary-dark)", bg: "var(--primary-soft)" },
          { label: "Chờ Quản lý tổng hợp", value: BATCHES.filter((b) => b.status === "PENDING_APPROVAL").length, color: "var(--violet)", bg: "var(--violet-soft)" },
          { label: "Chờ Trưởng phòng duyệt", value: BATCHES.filter((b) => b.status === "PENDING_HEAD_APPROVAL").length, color: "var(--blue)", bg: "var(--blue-soft)" },
          { label: "Yêu cầu làm lại", value: BATCHES.filter((b) => b.status === "REJECTED").length, color: "var(--amber)", bg: "var(--amber-soft)" },
        ].map((k) => (
          <div key={k.label} style={{ background: k.bg, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: k.color }}>{k.value}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>{k.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <SectionCard title="Tải trọng theo Kiểm Nghiệm viên" icon={FlaskConical}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TECHNICIANS.map((t) => {
              const count = BATCHES.filter((b) => b.tech === t && !["APPROVED_COMPLETED"].includes(b.status)).length;
              return (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 140, fontSize: 12.5, fontWeight: 600 }}>{t}</div>
                  <div style={{ flex: 1, height: 8, background: "var(--surface-alt)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${Math.min(count * 25, 100)}%`, height: "100%", background: "var(--primary)" }} />
                  </div>
                  <span className="mono" style={{ fontSize: 11.5, width: 60, textAlign: "right", color: "var(--ink-soft)" }}>{count} việc</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
        <SectionCard title="Cảnh báo cần xử lý" icon={AlertTriangle}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {OVERDUE_ORDERS.map((o) => (
              <div key={o.no} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                <AlertTriangle size={13} color="var(--red)" />
                <SpecimenTag>{o.no}</SpecimenTag>
                <span style={{ color: "var(--ink-soft)" }}>chậm trả kết quả — {o.kh}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  </>
);

/* ============================================================
   2. ĐƠN HÀNG — Khách hàng
   ============================================================ */
// Gắn Phiếu YCKN vào đúng 1 hợp đồng cụ thể (demo — 3 hợp đồng có phiếu thực tế)
const CONTRACT_YCKN = {
  "HD-2601-01": ["DH-2608-001"],
  "HD-2602-01": ["DH-2608-003"],
  "HD-2607-01": ["DH-2608-006"],
};

// ------------------------------------------------------------
// HIERARCHY HELPERS — dán ngay sau `const CONTRACT_YCKN = {...}`
// ------------------------------------------------------------
 
// Dựng cây Khách hàng -> Hợp đồng -> Phiếu YCKN -> Phiếu con (Mục)
// Chỉ tính các hợp đồng/YCKN đã thật sự có dữ liệu (TEST_REQUESTS)
// để tránh hiện option rỗng trong dropdown.
const useFilterHierarchy = () =>
  useMemo(() => {
    return CUSTOMERS.map((cust) => {
      const contracts = CONTRACTS.filter((k) => k.customerId === cust.id)
        .map((k) => {
          const orderNos = (CONTRACT_YCKN[k.id] || []).filter((no) => TEST_REQUESTS[no]);
          const yckns = orderNos.map((no) => {
            const req = TEST_REQUESTS[no];
            const childSlips = req.groups.map((g, i) => ({
              code: `${YCKN_CODE[no]}-${i + 1}`,
              label: g.title || g.type,
              type: g.type,
            }));
            return {
              orderNo: no,
              code: YCKN_CODE[no],
              name: ORDERS.find((o) => o.no === no)?.name || no,
              childSlips,
            };
          });
          return { ...k, yckns };
        })
        .filter((k) => k.yckns.length > 0);
      return { ...cust, contracts };
    }).filter((c) => c.contracts.length > 0);
  }, []);
 
// Xác định 1 batch (dòng chỉ tiêu) thuộc Phiếu con nào, dựa vào việc
// mẫu con của nó (kyHieu) nằm trong Mục nào của TEST_REQUESTS.
const getBatchChildSlip = (batch) => {
  const req = TEST_REQUESTS[batch.order];
  if (!req) return null;
  const flat = flattenOrderSamples(batch.order);
  const sampleRow = flat.find((s) => s.maSoMau === batch.kyHieu);
  if (!sampleRow) return null;
  const groupIndex = req.groups.findIndex((g) => (g.title || g.type) === sampleRow.groupTitle);
  if (groupIndex === -1) return null;
  return `${YCKN_CODE[batch.order]}-${groupIndex + 1}`;
};
 
// Predicate dùng để lọc mảng batches theo lựa chọn hiện tại của
// CascadeFilter. Rỗng ("") ở bất kỳ cấp nào = không lọc cấp đó.
const batchMatchesSelection = (batch, sel) => {
  if (!sel) return true;
 
  if (sel.orderNo) {
    if (batch.order !== sel.orderNo) return false;
  } else if (sel.contractId) {
    const orderNos = CONTRACT_YCKN[sel.contractId] || [];
    if (!orderNos.includes(batch.order)) return false;
  } else if (sel.customerId) {
    const custName = CUSTOMERS.find((c) => c.id === sel.customerId)?.name;
    if (TEST_REQUESTS[batch.order]?.kh !== custName) return false;
  }
 
  if (sel.childSlipCode && getBatchChildSlip(batch) !== sel.childSlipCode) return false;
 
  return true;
};
 
const EMPTY_FILTER = { customerId: "", contractId: "", orderNo: "", childSlipCode: "" };
 

// ------------------------------------------------------------
// COMPONENT — CascadeFilter (dùng chung cho 3 trang)
// ------------------------------------------------------------
const CascadeFilter = ({ value, onChange }) => {
  const hierarchy = useFilterHierarchy();
  const selectedCustomer = hierarchy.find((c) => c.id === value.customerId);
  const selectedContract = selectedCustomer?.contracts.find((k) => k.id === value.contractId);
  const selectedYckn = selectedContract?.yckns.find((y) => y.orderNo === value.orderNo);
 
  const set = (patch) => onChange({ ...value, ...patch });
  const hasFilter = value.customerId || value.contractId || value.orderNo || value.childSlipCode;
 
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
      <select
        className="lims-input"
        style={{ minWidth: 200 }}
        value={value.customerId}
        onChange={(e) => set({ customerId: e.target.value, contractId: "", orderNo: "", childSlipCode: "" })}
      >
        <option value="">Tất cả khách hàng</option>
        {hierarchy.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
 
      <select
        className="lims-input"
        style={{ minWidth: 200 }}
        value={value.contractId}
        disabled={!value.customerId}
        onChange={(e) => set({ contractId: e.target.value, orderNo: "", childSlipCode: "" })}
      >
        <option value="">Tất cả hợp đồng</option>
        {(selectedCustomer?.contracts || []).map((k) => (
          <option key={k.id} value={k.id}>{k.id} — {k.name}</option>
        ))}
      </select>
 
      <select
        className="lims-input"
        style={{ minWidth: 220 }}
        value={value.orderNo}
        disabled={!value.contractId}
        onChange={(e) => set({ orderNo: e.target.value, childSlipCode: "" })}
      >
        <option value="">Tất cả Phiếu YCKN</option>
        {(selectedContract?.yckns || []).map((y) => (
          <option key={y.orderNo} value={y.orderNo}>{y.code} — {y.name}</option>
        ))}
      </select>
 
      <select
        className="lims-input"
        style={{ minWidth: 200 }}
        value={value.childSlipCode}
        disabled={!value.orderNo}
        onChange={(e) => set({ childSlipCode: e.target.value })}
      >
        <option value="">Tất cả phiếu con</option>
        {(selectedYckn?.childSlips || []).map((s) => (
          <option key={s.code} value={s.code}>{s.code} — {s.label}</option>
        ))}
      </select>
 
      {hasFilter && (
        <button className="lims-btn lims-btn-ghost" onClick={() => onChange(EMPTY_FILTER)}>
          <RotateCcw size={13} /> Xóa lọc
        </button>
      )}
    </div>
  );
};
 

const emptyCustomerForm = { name: "", address: "", mst: "", contact: "", chucVu: "", phone: "", fax: "", email: "", freq: "Hàng quý" };

const CustomerFormModal = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState(initial || emptyCustomerForm);
  const set = (field, val) => setForm((f) => ({ ...f, [field]: val }));
  const isEdit = !!initial;
  return (
    <Modal title={isEdit ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"} onClose={onClose} width={560}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tên công ty / Đơn vị gửi mẫu</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Địa chỉ</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.address} onChange={(e) => set("address", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Mã số thuế</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.mst} onChange={(e) => set("mst", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tần suất quan trắc</label>
          <select className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.freq} onChange={(e) => set("freq", e.target.value)}>
            {["Hàng tháng", "Hàng quý", "3 tháng / lần", "6 tháng / lần", "Hàng năm", "Theo yêu cầu"].map((f) => <option key={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Người đại diện</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.contact} onChange={(e) => set("contact", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Chức vụ</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.chucVu} onChange={(e) => set("chucVu", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Điện thoại</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Fax</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.fax} onChange={(e) => set("fax", e.target.value)} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Email</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button className="lims-btn lims-btn-ghost" onClick={onClose}>Hủy</button>
        <button className="lims-btn lims-btn-primary" disabled={!form.name.trim()} onClick={() => onSave(form)}>{isEdit ? "Lưu thay đổi" : "Thêm khách hàng"}</button>
      </div>
    </Modal>
  );
};

const CustomerDetailModal = ({ c, onClose }) => (
  <Modal title="Thông tin khách hàng" onClose={onClose} width={520}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <SpecimenTag>{c.id}</SpecimenTag>
      <h3 style={{ margin: 0, fontSize: 16 }}>{c.name}</h3>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12.5 }}>
      <div style={{ gridColumn: "1 / -1" }}><div style={{ color: "var(--ink-faint)" }}>Địa chỉ</div><div style={{ fontWeight: 600 }}>{c.address}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Mã số thuế</div><div className="mono" style={{ fontWeight: 600 }}>{c.mst}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Tần suất quan trắc</div><div style={{ fontWeight: 600 }}>{c.freq}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Người đại diện</div><div style={{ fontWeight: 600 }}>{c.contact}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Chức vụ</div><div style={{ fontWeight: 600 }}>{c.chucVu}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Điện thoại</div><div className="mono">{c.phone}</div></div>
      <div><div style={{ color: "var(--ink-faint)" }}>Fax</div><div className="mono">{c.fax}</div></div>
      <div style={{ gridColumn: "1 / -1" }}><div style={{ color: "var(--ink-faint)" }}>Email</div><div className="mono">{c.email}</div></div>
    </div>
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
      <button className="lims-btn lims-btn-ghost" onClick={onClose}>Đóng</button>
    </div>
  </Modal>
);

const KhachHangPage = ({ role, canEdit }) => {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [search, setSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Bộ lọc nâng cao
  const [locationFilter, setLocationFilter] = useState("");
  const [freqFilter, setFreqFilter] = useState("");
  const [codeFilter, setCodeFilter] = useState("");

  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [expandedContract, setExpandedContract] = useState(null);
  const [formModal, setFormModal] = useState(null);
  const [viewing, setViewing] = useState(null);

  // Map dữ liệu để tra cứu O(1)
  const ordersMap = useMemo(() => new Map(ORDERS.map((o) => [o.no, o.name])), []);
  const contractsByCustId = useMemo(() => {
    const map = new Map();
    CONTRACTS.forEach((k) => map.get(k.customerId)?.push(k) || map.set(k.customerId, [k]));
    return map;
  }, []);

  // Danh sách Tỉnh/Thành & Tần suất
  const locationOptions = useMemo(() => {
    const provinces = customers.map((c) => c.address?.split(",").pop()?.trim()).filter(Boolean);
    return [...new Set(provinces)];
  }, [customers]);

  const freqOptions = useMemo(() => [...new Set(CONTRACTS.map((k) => k.freq).filter(Boolean))], []);

  const handleResetFilter = useCallback(() => {
    setSearch("");
    setLocationFilter("");
    setFreqFilter("");
    setCodeFilter("");
  }, []);

  // Logic lọc dữ liệu tối ưu
  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    const loc = locationFilter.toLowerCase().trim();
    const code = codeFilter.toLowerCase().trim();

    return customers.filter((c) => {
      const matchSearch = !s || [c.name, c.id, c.contact, c.phone, c.address, c.mst].some((v) => v?.toLowerCase().includes(s));
      if (!matchSearch) return false;

      const matchLoc = !loc || c.address?.toLowerCase().includes(loc);
      if (!matchLoc) return false;

      if (!freqFilter && !code) return true;

      const custContracts = contractsByCustId.get(c.id) || [];
      return custContracts.some((k) => {
        if (freqFilter && k.freq !== freqFilter) return false;
        if (!code) return true;

        const ycknList = CONTRACT_YCKN[k.id] || [];
        return (
          k.id?.toLowerCase().includes(code) ||
          k.name?.toLowerCase().includes(code) ||
          ycknList.some((no) =>
            [YCKN_CODE[no], no, ordersMap.get(no)].some((v) => v?.toLowerCase().includes(code))
          )
        );
      });
    });
  }, [customers, search, locationFilter, freqFilter, codeFilter, contractsByCustId, ordersMap]);

  const saveCustomer = useCallback((form) => {
    setCustomers((cs) =>
      formModal?.mode === "edit"
        ? cs.map((c) => (c.id === formModal.data.id ? { ...c, ...form } : c))
        : [...cs, { id: `KH-${String(cs.length + 1).padStart(4, "0")}`, ...form }]
    );
    setFormModal(null);
  }, [formModal]);

  const deleteCustomer = useCallback((id) => setCustomers((cs) => cs.filter((c) => c.id !== id)), []);

  return (
    <>
      <PageHeader title="Danh sách Khách hàng" subtitle="Hồ sơ khách hàng, hợp đồng và Phiếu YCKN đi kèm" />
      <PageShell>
        <SectionCard title="Danh sách khách hàng" icon={Users} style={{ padding: 0 }}>
          {/* Toolbar chính */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
              <Search size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 9 }} />
              <input
                className="lims-input"
                style={{ width: "100%", paddingLeft: 30 }}
                placeholder="Tìm tên, mã KH, MST, người liên hệ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="lims-btn lims-btn-ghost" onClick={() => setShowAdvanced((s) => !s)}>
              <ListFilter size={14} /> {showAdvanced ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
            </button>
            <div style={{ flex: 1 }} />
            <button className="lims-btn lims-btn-ghost"><Download size={14} /> Xuất Excel</button>
            {canEdit && (
            <button className="lims-btn lims-btn-primary" onClick={() => setFormModal({ mode: "add" })}>
                <Plus size={14} /> Thêm khách hàng
              </button>
            )}
          </div>

          {/* Bộ lọc nâng cao (Đã bỏ input search lặp) */}
          {showAdvanced && (
            <div style={{ background: "var(--surface-alt, #F8FAFC)", padding: 16, borderRadius: 8, border: "1px solid var(--line)", margin: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>ĐỊA ĐIỂM / TỈNH THÀNH</label>
                  <select className="lims-input" style={{ width: "100%", height: 36, fontSize: 13 }} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
                    <option value="">Tất cả địa điểm</option>
                    {locationOptions.map((loc) => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>TẦN SUẤT HỢP ĐỒNG</label>
                  <select className="lims-input" style={{ width: "100%", height: 36, fontSize: 13 }} value={freqFilter} onChange={(e) => setFreqFilter(e.target.value)}>
                    <option value="">Tất cả tần suất</option>
                    {freqOptions.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>MÃ HỢP ĐỒNG / YCKN</label>
                  <input className="lims-input" style={{ width: "100%", height: 36, fontSize: 13 }} placeholder="Mã HD-..., Mã YCKN..." value={codeFilter} onChange={(e) => setCodeFilter(e.target.value)} />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed var(--line)", paddingTop: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink-soft)" }}>
                  <Info size={14} color="var(--primary)" />
                  <span>Bấm vào <strong>Khách hàng</strong> để xem Hợp đồng • Bấm <strong>Hợp đồng</strong> xem YCKN</span>
                </div>
                <button className="lims-btn lims-btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }} onClick={handleResetFilter}>
                  <RotateCcw size={12} /> Xóa bộ lọc
                </button>
              </div>
            </div>
          )}

          {/* Bảng Dữ Liệu */}
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th style={{ width: 30 }}></th>
                  <th style={{ width: 50 }}>STT</th>
                  <th style={{ width: 100 }}>Mã KH</th>
                  <th>Tên khách hàng</th>
                  <th>Người đại diện</th>
                  <th>SĐT</th>
                  <th>Địa điểm</th>
                  <th style={{ textAlign: "center" }}>Hợp đồng</th>
                  <th style={{ width: 90, textAlign: "right" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const custContracts = contractsByCustId.get(c.id) || [];
                  const isOpen = expandedCustomer === c.id;
                  return (
                    <React.Fragment key={c.id}>
                      <tr style={{ cursor: "pointer", background: isOpen ? "var(--surface-alt)" : "transparent" }} onClick={() => { setExpandedCustomer(isOpen ? null : c.id); setExpandedContract(null); }}>
                        <td>{isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                        <td>{i + 1}</td>
                        <td><SpecimenTag>{c.id}</SpecimenTag></td>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>{c.contact}</td>
                        <td className="mono" style={{ color: "var(--ink-soft)" }}><Phone size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.phone}</td>
                        <td style={{ color: "var(--ink-soft)" }}><MapPin size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.address}</td>
                        <td style={{ textAlign: "center" }}><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>{custContracts.length} hợp đồng</span></td>
                        <td onClick={(e) => e.stopPropagation()} style={{ textAlign: "right" }}>
<RowActions onView={() => setViewing(c)} onEdit={canEdit ? () => setFormModal({ mode: "edit", data: c }) : undefined} onDelete={canEdit ? () => deleteCustomer(c.id) : undefined} />                        </td>
                      </tr>

                      {isOpen && (
                        <tr>
                          <td colSpan={9} style={{ background: "var(--surface-alt)", padding: 0 }}>
                            <div style={{ padding: "10px 16px 10px 40px" }}>
                              {!custContracts.length && <div style={{ fontSize: 12, color: "var(--ink-faint)", padding: 8 }}>Khách hàng chưa có hợp đồng nào.</div>}
                              {custContracts.map((k) => {
                                const yckn = CONTRACT_YCKN[k.id] || [];
                                const contractOpen = expandedContract === k.id;
                                return (
                                  <div key={k.id} style={{ marginBottom: 8 }}>
                                    <div onClick={() => setExpandedContract(contractOpen ? null : k.id)} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 12px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
                                      {contractOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                      <SpecimenTag>{k.id}</SpecimenTag>
                                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{k.name}</span>
                                      <span style={{ fontSize: 11.5, color: "var(--ink-faint)", marginLeft: "auto" }}>Ký {k.signed} · {k.freq} · {k.value}</span>
                                    </div>
                                    {contractOpen && (
                                      <div style={{ padding: "8px 8px 4px 28px" }}>
                                        {!yckn.length && <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>Chưa có Phiếu YCKN nào cho hợp đồng này.</div>}
                                        {yckn.map((no) => (
                                          <div key={no} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "5px 0" }}>
                                            <FileText size={12} color="var(--primary)" />
                                            <SpecimenTag>{YCKN_CODE[no]}</SpecimenTag>
                                            <span style={{ color: "var(--ink-soft)" }}>{ordersMap.get(no)} — {no}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {formModal && <CustomerFormModal initial={formModal.mode === "edit" ? formModal.data : null} onClose={() => setFormModal(null)} onSave={saveCustomer} />}
      {viewing && <CustomerDetailModal c={viewing} onClose={() => setViewing(null)} />}
    </>
  );

};
  /* ============================================================
   2. ĐƠN HÀNG — Báo giá
   ============================================================ */
const QUOTER_NAME = "Acc Quản lý";

const quoteItemsWithData = (items, customerId) =>
  items.map((it) => ({
    ...it,
    ind: INDICATORS.find((i) => i.code === it.code),
    unitPrice: getIndicatorPrice(it.code, customerId),
  }));
const quoteTotal = (items, customerId) =>
  quoteItemsWithData(items, customerId).reduce((sum, it) => sum + it.unitPrice * it.qty, 0);

/* Printable "PHIẾU BÁO GIÁ" template — shown when exporting a quote to Excel */
const QuotePrintModal = ({ quote, onClose }) => {
  const [nguoiBaoGia, setNguoiBaoGia] = useState(QUOTER_NAME);
  const items = quoteItemsWithData(quote.items, quote.customerId);
  const total = quoteTotal(quote.items, quote.customerId);


  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,30,25,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 20 }} onClick={onClose}>
      <div className="lims-root" style={{ width: 640, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: "var(--surface)", borderRadius: 12, boxShadow: "0 30px 60px rgba(0,0,0,.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={16} color="var(--primary)" />
            <span style={{ fontWeight: 600, fontSize: 13.5 }}>Xuất Excel — Phiếu báo giá</span>
          </div>
          <button className="lims-btn-icon" onClick={onClose}><X size={14} /></button>
        </div>

        <div style={{ padding: "28px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 22 }}>
            <div className="disp" style={{ fontSize: 18, fontWeight: 700, letterSpacing: ".04em" }}>PHIẾU BÁO GIÁ</div>
            <SpecimenTag>{quote.code}</SpecimenTag>
          </div>

          <p style={{ fontSize: 13, margin: "0 0 18px" }}>
            Kính gửi: <strong>Quý công ty {quote.kh}</strong>
          </p>

          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>STT</th><th>Loại mẫu</th><th>Đơn vị tính</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th></tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i}>
                    <td className="mono">{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{it.ind ? `${it.ind.name} — ${it.sampleType}` : it.sampleType}</td>
                    <td className="mono">{it.ind ? it.ind.unit : "—"}</td>
                    <td className="mono">{it.qty}</td>
                    <td className="mono">{it.ind ? it.unitPrice.toLocaleString("vi-VN") + " đ" : "—"}</td>
                    <td className="mono">{it.ind ? (it.unitPrice * it.qty).toLocaleString("vi-VN") + " đ" : "—"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} style={{ textAlign: "right", fontWeight: 700, borderBottom: "none" }}>Tổng</td>
                  <td className="mono" style={{ fontWeight: 700, borderBottom: "none" }}>{total.toLocaleString("vi-VN")} đ</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 26 }}>
            <div style={{ textAlign: "center", minWidth: 200 }}>
              <div style={{ fontSize: 12, color: "var(--ink-soft)" }}>Người báo giá</div>
              <input className="lims-input" style={{ marginTop: 6, textAlign: "center", fontWeight: 600 }} value={nguoiBaoGia} onChange={(e) => setNguoiBaoGia(e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 20px", borderTop: "1px solid var(--line)" }}>
          <button className="lims-btn lims-btn-ghost" onClick={onClose}>Đóng</button>
          <button className="lims-btn lims-btn-primary"><Download size={14} /> Tải file Excel</button>
        </div>
      </div>
    </div>
  );
};

// Mô phỏng Async/Searchable Select: gõ để lọc, chọn 1 item từ danh sách gợi ý
const SearchableSelect = ({ value, onChange, options, getLabel, placeholder, width = 280 }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = query
    ? options.filter((o) => getLabel(o).toLowerCase().includes(query.toLowerCase()))
    : options;
  return (
    <div style={{ position: "relative", width }}>
      <div style={{ position: "relative" }}>
        <Search size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 9 }} />
        <input
          className="lims-input"
          style={{ width: "100%", paddingLeft: 30 }}
          placeholder={placeholder}
          value={open ? query : value}
          onFocus={() => { setOpen(true); setQuery(""); }}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 5 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: 38, left: 0, right: 0, maxHeight: 220, overflowY: "auto", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, boxShadow: "0 8px 20px rgba(0,0,0,.1)", zIndex: 6 }}>
            {filtered.length === 0 && <div style={{ padding: 10, fontSize: 12, color: "var(--ink-faint)" }}>Không tìm thấy kết quả</div>}
            {filtered.map((o, i) => (
              <button key={i} onClick={() => { onChange(o); setOpen(false); }} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", border: "none", background: "none", cursor: "pointer", fontSize: 12.5 }}
                onMouseEnter={(e) => e.currentTarget.style.background = "var(--surface-alt)"} onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
                {getLabel(o)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const BaoGiaPage = ({ role, setPage, canEdit }) => {
  const [quotes, setQuotes] = useState(QUOTES);
  const [customerId, setCustomerId] = useState(CUSTOMERS[0]?.id || "");
  const customer = CUSTOMERS.find((c) => c.id === customerId)?.name || "";
  const [freq, setFreq] = useState("Hàng quý (4 lần/năm)");
  
  // State quản lý danh sách chỉ tiêu chọn dạng checklist
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [indicatorSearch, setIndicatorSearch] = useState("");
  const [openSampleTypes, setOpenSampleTypes] = useState({});

  // State quản lý danh sách báo giá
  const [exportQuote, setExportQuote] = useState(null);
  const [listSearch, setListSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");


  // 1. Thao tác Toggle 1 chỉ tiêu
  const toggleIndicator = (sampleType, indicatorCode) => {
    setSelectedIndicators((prev) => {
      const exists = prev.some(
        (item) => item.sampleType === sampleType && item.indicatorCode === indicatorCode
      );
      if (exists) {
        return prev.filter(
          (item) => !(item.sampleType === sampleType && item.indicatorCode === indicatorCode)
        );
      } else {
        return [...prev, { sampleType, indicatorCode, qty: 1 }];
      }
    });
  };

  // 2. Chọn / Bỏ chọn toàn bộ trong 1 nhóm
  const toggleSelectAllInType = (sampleType, indicatorsInType) => {
    const allSelected = indicatorsInType.every((ind) =>
      selectedIndicators.some((item) => item.sampleType === sampleType && item.indicatorCode === ind.code)
    );

    if (allSelected) {
      setSelectedIndicators((prev) =>
        prev.filter(
          (item) => !(item.sampleType === sampleType && indicatorsInType.some((ind) => ind.code === item.indicatorCode))
        )
      );
    } else {
      const newItems = indicatorsInType
        .filter(
          (ind) => !selectedIndicators.some((item) => item.sampleType === sampleType && item.indicatorCode === ind.code)
        )
        .map((ind) => ({ sampleType, indicatorCode: ind.code, qty: 1 }));

      setSelectedIndicators((prev) => [...prev, ...newItems]);
    }
  };

  // 3. Đóng / Mở tất cả các nhóm
  const toggleAllSections = (isOpen) => {
    const newStates = {};
    SAMPLE_TYPES.forEach((type) => {
      newStates[type] = isOpen;
    });
    setOpenSampleTypes(newStates);
  };

  // 4. Cập nhật số lượng chỉ tiêu
  const updateQty = (sampleType, indicatorCode, newQty) => {
    setSelectedIndicators((prev) =>
      prev.map((item) => {
        if (item.sampleType === sampleType && item.indicatorCode === indicatorCode) {
          return { ...item, qty: Math.max(1, parseInt(newQty) || 1) };
        }
        return item;
      })
    );
  };

  // Tính tổng tiền từ selectedIndicators
  const totalPrice = selectedIndicators.reduce(
  (sum, r) => sum + getIndicatorPrice(r.indicatorCode, customerId) * r.qty,
  0
  );

  // Tạo báo giá mới từ selectedIndicators
  const createQuote = () => {
    if (!selectedIndicators.length) return;
    const code = `BG-${String(91 + quotes.length - 3).padStart(4, "0")}`;
    
    setQuotes((q) => [
      {
        code,
        kh: customer,
        customerId, // MỚI — dùng để tra giá riêng theo khách hàng
        ngay: new Date().toLocaleDateString("vi-VN"),
        freq,
        items: selectedIndicators.map((r) => ({
          code: r.indicatorCode,
          sampleType: r.sampleType,
          qty: r.qty,
        })),
        status: "Nháp",
      },
      ...q,
    ]);

    setSelectedIndicators([]);
  };

  const convertToOrder = (code) => {
    setQuotes((q) => q.map((x) => (x.code === code ? { ...x, status: "Đã chuyển đơn hàng" } : x)));
    setPage("TaoPhieuYCKN");
  };

  const filteredQuotes = quotes.filter(
    (q) =>
      (q.code + q.kh).toLowerCase().includes(listSearch.toLowerCase()) &&
      (!statusFilter || q.status === statusFilter)
  );

  return (
    <>
      <PageHeader
        title="Báo giá"
        subtitle="Lập báo giá nhanh: Lọc chỉ tiêu, chọn checklist và xuất đơn hàng"
      />
      <PageShell>
        <SectionCard title="Lập báo giá mới" icon={FileText}>
          {/* Thông tin chung */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-end", marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>
                Khách hàng
              </label>
              <SearchableSelect
                value={customer}
                onChange={(c) => setCustomerId(c.id)}
                options={CUSTOMERS}
                getLabel={(c) => `${c.name} — ${c.id}`}
                placeholder="Gõ để tìm khách hàng..."
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>
                Tần suất
              </label>
              <select className="lims-input" value={freq} onChange={(e) => setFreq(e.target.value)}>
                {[
                  "Hàng tháng (12 lần/năm)",
                  "Hàng quý (4 lần/năm)",
                  "3 tháng / lần (4 lần/năm)",
                  "6 tháng / lần (2 lần/năm)",
                  "Hàng năm (1 lần/năm)",
                  "Theo yêu cầu",
                ].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Thanh tìm kiếm & Bộ công cụ */}
          <div
            style={{
              background: "var(--surface-alt, #F8FAFC)",
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid var(--line)",
              marginBottom: 16,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ position: "relative", flex: "1 1 300px", maxWidth: 450 }}>
                <Search size={15} color="var(--ink-faint)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                <input
                  className="lims-input"
                  style={{ width: "100%", paddingLeft: 36, paddingRight: indicatorSearch ? 32 : 12, height: 38, fontSize: 13 }}
                  placeholder="Gõ từ khóa để tìm chỉ tiêu (tên, mã, phương pháp)..."
                  value={indicatorSearch}
                  onChange={(e) => setIndicatorSearch(e.target.value)}
                />
                {indicatorSearch && (
                  <button
                    onClick={() => setIndicatorSearch("")}
                    style={{
                      position: "absolute",
                      right: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "var(--ink-faint)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  className="lims-btn lims-btn-ghost"
                  style={{ padding: "6px 12px", fontSize: 12 }}
                  onClick={() => toggleAllSections(true)}
                >
                  Mở tất cả
                </button>
                <button
                  type="button"
                  className="lims-btn lims-btn-ghost"
                  style={{ padding: "6px 12px", fontSize: 12 }}
                  onClick={() => toggleAllSections(false)}
                >
                  Thu gọn tất cả
                </button>
              </div>
            </div>

            {indicatorSearch && (
              <div style={{ fontSize: 12, color: "var(--primary-dark)", fontWeight: 500 }}>
                Đang lọc chỉ tiêu theo từ khóa: <strong>"{indicatorSearch}"</strong>
              </div>
            )}
          </div>

          {/* Checklist loại mẫu */}
          <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-dark)" }}>
              1. Chọn Loại mẫu & Chỉ tiêu:
            </label>

            {SAMPLE_TYPES.map((type) => {
              const searchKeyword = indicatorSearch.trim().toLowerCase();
              const indicatorsInType = INDICATORS.filter((i) => {
                const matchType = i.sampleTypes.includes(type);
                if (!searchKeyword) return matchType;
                return (
                  matchType &&
                  (i.name.toLowerCase().includes(searchKeyword) ||
                    i.code.toLowerCase().includes(searchKeyword) ||
                    i.method.toLowerCase().includes(searchKeyword))
                );
              });

              if (searchKeyword && indicatorsInType.length === 0) return null;

              const isExpanded = searchKeyword ? true : (openSampleTypes[type] ?? true);

              const allSelectedInType =
                indicatorsInType.length > 0 &&
                indicatorsInType.every((ind) =>
                  selectedIndicators.some((item) => item.sampleType === type && item.indicatorCode === ind.code)
                );

              return (
                <div
                  key={type}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 8,
                    background: "var(--surface)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justify: "space-between",
                      padding: "10px 14px",
                      background: "var(--surface-alt, #F8FAFC)",
                      userSelect: "none",
                    }}
                  >
                    <div
                      onClick={() => setOpenSampleTypes((prev) => ({ ...prev, [type]: !isExpanded }))}
                      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flex: 1 }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          padding: "2px 8px",
                          borderRadius: 4,
                          background: "var(--primary-soft)",
                          color: "var(--primary-dark)",
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {SAMPLE_TYPE_ABBR[type] || type}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: 13.5 }}>{type}</span>
                      <span style={{ fontSize: 12, color: "var(--ink-faint)", fontWeight: 400 }}>
                        ({indicatorsInType.length} chỉ tiêu)
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectAllInType(type, indicatorsInType);
                        }}
                        style={{
                          border: "none",
                          background: "none",
                          color: "var(--primary)",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: "2px 6px",
                        }}
                      >
                        {allSelectedInType ? "Bỏ chọn nhóm" : "Chọn tất cả nhóm"}
                      </button>

                      <div
                        onClick={() => setOpenSampleTypes((prev) => ({ ...prev, [type]: !isExpanded }))}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", color: "var(--ink-faint)" }}
                      >
                        {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      style={{
                        padding: "12px 14px",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: 10,
                        borderTop: "1px solid var(--line)",
                        maxHeight: 320,
                        overflowY: "auto",
                      }}
                      className="lims-scroll"
                    >
                      {indicatorsInType.map((ind) => {
                        const isChecked = selectedIndicators.some(
                          (item) => item.sampleType === type && item.indicatorCode === ind.code
                        );

                        return (
                          <label
                            key={ind.code}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 8,
                              padding: "8px 10px",
                              borderRadius: 6,
                              border: isChecked ? "1.5px solid var(--primary)" : "1px solid var(--line)",
                              background: isChecked ? "var(--primary-soft, #E6F4F1)" : "var(--surface)",
                              cursor: "pointer",
                              fontSize: 12.5,
                              transition: "all 0.15s ease",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleIndicator(type, ind.code)}
                              style={{ marginTop: 2, cursor: "pointer" }}
                            />
                            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                              <span style={{ fontWeight: isChecked ? 600 : 500, color: "var(--ink)" }}>
                                {ind.name}
                              </span>
                              <div style={{ display: "flex", gap: 6, fontSize: 11, color: "var(--ink-faint)", flexWrap: "wrap" }}>
                                <span className="mono" style={{ color: "var(--primary-dark)" }}>{ind.code}</span>
                                <span>•</span>
                                <span>{ind.method}</span>
                              </div>
                              <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>
                                {ind.price.toLocaleString("vi-VN")} đ
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bảng danh sách đã chọn */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-dark)" }}>
                2. Danh sách chỉ tiêu đã chọn ({selectedIndicators.length}):
              </label>
              {selectedIndicators.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedIndicators([])}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#E53E3E",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Xóa tất cả đã chọn
                </button>
              )}
            </div>

            {selectedIndicators.length === 0 ? (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "var(--ink-faint)",
                  border: "1px dashed var(--line)",
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                Chưa chọn chỉ tiêu nào. Tìm kiếm hoặc chọn ở danh sách bên trên.
              </div>
            ) : (
              <div className="lims-scroll" style={{ overflowX: "auto" }}>
                <table className="lims-table">
                  <thead>
                    <tr>
                      <th>Loại mẫu</th>
                      <th>Mã & Tên chỉ tiêu</th>
                      <th>Phương pháp</th>
                      <th>Đơn vị</th>
                      <th>LOD</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th>Thành tiền</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedIndicators.map((r) => {
                      const ind = INDICATORS.find((i) => i.code === r.indicatorCode);
                      if (!ind) return null;

                      return (
                        <tr key={`${r.sampleType}-${r.indicatorCode}`}>
                          <td>
                            <span
                              style={{
                                padding: "3px 8px",
                                borderRadius: 4,
                                background: "var(--surface-alt)",
                                border: "1px solid var(--line)",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {r.sampleType}
                            </span>
                          </td>
                          <td style={{ fontWeight: 600 }}>
                            <div>{ind.name}</div>
                            <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)", fontWeight: 400 }}>
                              {ind.code}
                            </span>
                          </td>
                          <td style={{ color: "var(--ink-soft)" }}>{ind.method}</td>
                          <td className="mono">{ind.unit}</td>
                          <td className="mono">{ind.lod}</td>
                          <td>
                            <input
                              type="number"
                              min={1}
                              className="lims-input"
                              style={{ width: 65 }}
                              value={r.qty}
                              onChange={(e) => updateQty(r.sampleType, r.indicatorCode, e.target.value)}
                            />
                          </td>
                          <td className="mono">{ind.price.toLocaleString("vi-VN")} đ</td>
                          <td className="mono" style={{ fontWeight: 600 }}>
                            {(ind.price * r.qty).toLocaleString("vi-VN")} đ
                          </td>
                          <td>
                            <button
                              className="lims-btn-icon"
                              onClick={() => toggleIndicator(r.sampleType, r.indicatorCode)}
                              title="Xóa chỉ tiêu này"
                            >
                              <X size={14} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Tổng tiền & Thao tác */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>
              Tổng thành tiền:{" "}
              <span className="mono" style={{ color: "var(--primary-dark)", fontSize: 16 }}>
                {totalPrice.toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button className="lims-btn lims-btn-ghost">
              <Printer size={14} /> In báo giá PDF
            </button>
            <button
              className="lims-btn lims-btn-primary"
              disabled={!canEdit || selectedIndicators.length === 0}
              onClick={createQuote}
            >
              <Plus size={14} /> Lưu báo giá
            </button>
          </div>
        </SectionCard>

        {/* Danh sách báo giá đã lập */}
        <SectionCard title="Danh sách báo giá" icon={ClipboardList} style={{ padding: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
              <Search size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 9 }} />
              <input
                className="lims-input"
                style={{ width: "100%", paddingLeft: 30 }}
                placeholder="Tìm theo mã báo giá, khách hàng..."
                value={listSearch}
                onChange={(e) => setListSearch(e.target.value)}
              />
            </div>
            <button className="lims-btn lims-btn-ghost" onClick={() => setShowAdvanced((s) => !s)}>
              <ListFilter size={14} /> {showAdvanced ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
            </button>
            <div style={{ flex: 1 }} />
            <button className="lims-btn lims-btn-ghost">
              <Download size={14} /> Xuất Excel
            </button>
          </div>
          {showAdvanced && (
            <div style={{ display: "flex", gap: 10, padding: "0 16px 14px" }}>
              <select className="lims-input" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">Tất cả trạng thái</option>
                <option>Nháp</option>
                <option>Đã gửi khách hàng</option>
                <option>Đã chuyển đơn hàng</option>
              </select>
            </div>
          )}
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>Mã báo giá</th>
                  <th>Khách hàng</th>
                  <th>Ngày lập</th>
                  <th>Tần suất</th>
                  <th>Số chỉ tiêu</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => (
                  <tr
                    key={q.code}
                    style={{ cursor: q.status === "Đã chuyển đơn hàng" ? "pointer" : "default" }}
                    onClick={() => q.status === "Đã chuyển đơn hàng" && setPage("TaoPhieuYCKN")}
                  >
                    <td><SpecimenTag>{q.code}</SpecimenTag></td>
                    <td style={{ fontWeight: 600 }}>{q.kh}</td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}>{q.ngay}</td>
                    <td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{q.freq}</td>
                    <td>{q.items.length}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background:
                            q.status === "Đã chuyển đơn hàng"
                              ? "var(--primary-soft)"
                              : q.status === "Đã gửi khách hàng"
                              ? "var(--blue-soft)"
                              : "var(--gray-soft)",
                          color:
                            q.status === "Đã chuyển đơn hàng"
                              ? "var(--primary-dark)"
                              : q.status === "Đã gửi khách hàng"
                              ? "var(--blue)"
                              : "#5B6659",
                        }}
                      >
                        {q.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          className="lims-btn lims-btn-ghost"
                          style={{ padding: "5px 10px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExportQuote(q);
                          }}
                        >
                          <Download size={13} /> Xuất Excel
                        </button>
                        {q.status !== "Đã chuyển đơn hàng" && canEdit && (
                          <button
                            className="lims-btn lims-btn-primary"
                            style={{ padding: "5px 10px" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              convertToOrder(q.code);
                            }}
                          >
                            <ArrowRightLeft size={13} /> Chuyển đơn hàng
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {exportQuote && <QuotePrintModal quote={exportQuote} onClose={() => setExportQuote(null)} />}
    </>
  );
};
/* ============================================================
   2. TIẾP NHẬN & PHÂN CÔNG — Tạo phiếu
   ============================================================ */

const pad2 = (n) => String(n).padStart(2, "0");

const todayYYMMDD = () => {
  const d = new Date();
  return `${String(d.getFullYear()).slice(2)}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}`;
};

// Sinh mã Phiếu YCKN dạng YYMMDD.XX
const genYcknCode = (ycknCodes) => {
  const ymd = todayYYMMDD();
  const nums = Object.values(ycknCodes)
    .filter((c) => c.startsWith(`${ymd}.`))
    .map((c) => parseInt(c.split(".")[1], 10) || 0);
  return `${ymd}.${pad2((nums.length ? Math.max(...nums) : 0) + 1)}`;
};

const genOrderNo = (ordersList) => {
  const ym = `${String(new Date().getFullYear()).slice(2)}${pad2(new Date().getMonth() + 1)}`;
  const nums = ordersList
    .filter((o) => o.no.startsWith(`DH-${ym}-`))
    .map((o) => parseInt(o.no.split("-")[2], 10) || 0);
  return `DH-${ym}-${pad2((nums.length ? Math.max(...nums) : 0) + 1)}`;
};

const genSampleCode = (ordersList) => {
  const ym = `${new Date().getFullYear()}${pad2(new Date().getMonth() + 1)}`;
  const nums = ordersList
    .map((o) => o.sampleCode)
    .filter((c) => c?.startsWith(`SAM-${ym}-`))
    .map((c) => parseInt(c.split("-")[2], 10) || 0);
  return `SAM-${ym}-${pad2((nums.length ? Math.max(...nums) : 0) + 1)}`;
};

const flattenOrderSamples = (orderNo, testRequests = TEST_REQUESTS, ycknCodes = YCKN_CODE) => {
  const req = testRequests?.[orderNo];
  if (!req) return [];

  let seq = 0;
  return req.groups.flatMap((g) =>
    g.samples.map((s) => {
      seq += 1;
      return {
        ...s,
        groupTitle: g.title || g.type,
        groupType: g.type,
        loaiMau: g.type,
        seq,
        maSoMau: s.maSoMau || sampleCodeFor(orderNo, seq, ycknCodes),
        tinhTrang: s.tinhTrang || "Chưa kiểm nghiệm",
        ghiChu: s.ghiChu || "",
        images: s.images || [],
      };
    })
  );
};
let sampleRowIdCounter = 1;
const nextSampleRowId = () => `row-${sampleRowIdCounter++}`;

const SampleImageUpload = ({ images, onChange }) => {
  const inputRef = useRef(null);

  const handleFiles = (files) => {
    const accepted = Array.from(files).filter((f) => ["image/png", "image/jpeg"].includes(f.type));
    const rejected = files.length - accepted.length;
    if (rejected > 0) alert(`${rejected} tệp bị bỏ qua — chỉ chấp nhận .png hoặc .jpeg`);
    
    const newImgs = accepted.map((f) => ({ name: f.name, url: URL.createObjectURL(f) }));
    onChange([...images, ...newImgs]);
  };

  const handleRemove = (i) => {
    URL.revokeObjectURL(images[i].url);
    onChange(images.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        style={{ display: "none" }}
        onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
      />
      <button
        type="button"
        className="lims-btn lims-btn-ghost"
        style={{ padding: "4px 10px", fontSize: 12 }}
        onClick={() => inputRef.current?.click()}
      >
        <ImagePlus size={13} /> Ảnh mẫu vật ({images.length})
      </button>
      {images.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
          {images.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              <img
                src={img.url}
                alt={img.name}
                style={{ width: 34, height: 34, objectFit: "cover", borderRadius: 4, border: "1px solid var(--line)" }}
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                style={{
                  position: "absolute", top: -6, right: -6, width: 16, height: 16, borderRadius: "50%",
                  background: "#E53E3E", color: "#fff", border: "none", fontSize: 10, cursor: "pointer", lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const CreatePhieuYCKNModal = ({ onClose, onCreate }) => {
  const [customer, setCustomer] = useState(CUSTOMERS[0]?.name || "");
  const [orderName, setOrderName] = useState("");
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [indicatorSearch, setIndicatorSearch] = useState("");
  const [openSampleTypes, setOpenSampleTypes] = useState({});
  const [sampleRowsByType, setSampleRowsByType] = useState({});
  const [step, setStep] = useState(1);
  const [diaDiemLayMau, setDiaDiemLayMau] = useState("");
  const [meta, setMeta] = useState({
    isEnglish: false,
    stdComment: "",
    totalFee: "",
    advancePaid: "",
    otherRequest: "",
    requiresRetention: false,
    subcontractAgreed: false,
    requesterName: "",
    sentDate: "",
    receiverName: "",
    receivedDate: "",
  });
const setMetaField = (field, val) => setMeta((m) => ({ ...m, [field]: val }));
const balanceDue = (parseFloat(meta.totalFee) || 0) - (parseFloat(meta.advancePaid) || 0);
  

  // Map cho tra cứu chỉ tiêu O(1)
  const indicatorMap = useMemo(() => new Map(INDICATORS.map((i) => [i.code, i])), []);

  const toggleIndicator = (sampleType, indicatorCode) => {
    setSelectedIndicators((prev) => {
      const exists = prev.some((i) => i.sampleType === sampleType && i.indicatorCode === indicatorCode);
      if (exists) {
        setSampleRowsByType((rows) => ({
          ...rows,
          [sampleType]: (rows[sampleType] || []).map((r) => ({
            ...r,
            chiTieu: r.chiTieu.filter((c) => c !== indicatorCode),
          })),
        }));
        return prev.filter((i) => !(i.sampleType === sampleType && i.indicatorCode === indicatorCode));
      }
      return [...prev, { sampleType, indicatorCode }];
    });
  };

  const toggleSelectAllInType = (sampleType, indicatorsInType) => {
    const allSelected = indicatorsInType.every((ind) =>
      selectedIndicators.some((i) => i.sampleType === sampleType && i.indicatorCode === ind.code)
    );
    if (allSelected) {
      indicatorsInType.forEach((ind) => toggleIndicator(sampleType, ind.code));
    } else {
      const toAdd = indicatorsInType
        .filter((ind) => !selectedIndicators.some((i) => i.sampleType === sampleType && i.indicatorCode === ind.code))
        .map((ind) => ({ sampleType, indicatorCode: ind.code }));
      setSelectedIndicators((prev) => [...prev, ...toAdd]);
    }
  };

  const groupedSelected = useMemo(() => 
    SAMPLE_TYPES.map((type) => ({
      type,
      codes: selectedIndicators.filter((i) => i.sampleType === type).map((i) => i.indicatorCode),
    })).filter((g) => g.codes.length > 0),
  [selectedIndicators]);

  const goToStep2 = () => {
    setSampleRowsByType((prev) => {
      const next = { ...prev };
      groupedSelected.forEach((g) => {
        if (!next[g.type]?.length) {
          next[g.type] = [{
            id: nextSampleRowId(),
            ten: `Mẫu ${g.type.toLowerCase()} 1`,
            luong: "",
            tinhTrang: "Chưa kiểm nghiệm",
            chiTieu: [...g.codes],
            ghiChu: "",
            images: [],
          }];
        }
      });
      return next;
    });
    setStep(2);
  };

  const addSampleRow = (type) => {
    setSampleRowsByType((prev) => {
      const rows = prev[type] || [];
      const group = groupedSelected.find((g) => g.type === type);
      return {
        ...prev,
        [type]: [
          ...rows,
          {
            id: nextSampleRowId(),
            ten: `Mẫu ${type.toLowerCase()} ${rows.length + 1}`,
            luong: "",
            tinhTrang: "Chưa kiểm nghiệm",
            chiTieu: group ? [...group.codes] : [],
            ghiChu: "",
            images: [],
          },
        ],
      };
    });
  };

  const removeSampleRow = (type, id) => {
    setSampleRowsByType((prev) => ({
      ...prev,
      [type]: (prev[type] || []).filter((r) => r.id !== id),
    }));
  };

  const updateSampleRow = (type, id, patch) => {
    setSampleRowsByType((prev) => ({
      ...prev,
      [type]: (prev[type] || []).map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  };

  const toggleRowIndicator = (type, id, code) => {
    setSampleRowsByType((prev) => ({
      ...prev,
      [type]: (prev[type] || []).map((r) => {
        if (r.id !== id) return r;
        const has = r.chiTieu.includes(code);
        return { ...r, chiTieu: has ? r.chiTieu.filter((c) => c !== code) : [...r.chiTieu, code] };
      }),
    }));
  };

  const totalValidSamples = useMemo(() => 
    groupedSelected.reduce((sum, g) => {
      const rows = sampleRowsByType[g.type] || [];
      return sum + rows.filter((r) => r.ten.trim() && r.chiTieu.length > 0).length;
    }, 0),
  [groupedSelected, sampleRowsByType]);

  const handleSubmit = () => {
    if (totalValidSamples === 0) return;
    const groups = groupedSelected
      .map((g) => {
        const rows = (sampleRowsByType[g.type] || []).filter((r) => r.ten.trim() && r.chiTieu.length > 0);
        if (!rows.length) return null;
        return {
          title: g.type,
          type: g.type,
          samples: rows.map((r, idx) => ({
            stt: idx + 1,
            ten: r.ten.trim(),
            viTriLayMau: (r.viTriLayMau || "").trim(),
            ngayHenTra: r.ngayHenTra || "",
            luong: r.luong.trim() || "-",
            tinhTrang: r.tinhTrang,
            chiTieu: r.chiTieu.map((code) => indicatorMap.get(code)?.name).filter(Boolean),
            ghiChu: (r.ghiChu || "").trim(),
            images: r.images || [],
          })),
        };
      })
      .filter(Boolean);

    onCreate({
      kh: customer,
      orderName: orderName.trim() || `Kiểm nghiệm theo yêu cầu — ${customer}`,
      diaDiemLayMau,
      meta,
      groups,
    });
  };

  const searchKeyword = indicatorSearch.trim().toLowerCase();

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(15,23,20,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "var(--surface)", borderRadius: 12, width: "min(920px, 94vw)",
          maxHeight: "88vh", overflowY: "auto", padding: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
        className="lims-scroll"
      >
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px 0" }}>
          {canEdit && (
            <button className="lims-btn lims-btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={14} /> Tạo phiếu YCKN trực tiếp
            </button>
          )}
        </div>

        {step === 1 && (
          <>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 18 }}>
              <div style={{ flex: "1 1 260px" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>
                  Khách hàng
                </label>
                <SearchableSelect
                  value={customer}
                  onChange={(c) => setCustomer(c.name)}
                  options={CUSTOMERS}
                  getLabel={(c) => `${c.name} — ${c.id}`}
                  placeholder="Gõ để tìm khách hàng..."
                />
              </div>
              <div style={{ flex: "1 1 260px" }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>
                  Tên yêu cầu (tùy chọn)
                </label>
                <input
                  className="lims-input"
                  style={{ width: "100%" }}
                  placeholder="VD: Kiểm nghiệm nước thải theo yêu cầu khách hàng"
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </div>
            </div>

            <div style={{ flex: "1 1 260px" }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>
                Địa điểm lấy mẫu
              </label>
              <input className="lims-input" style={{ width: "100%" }}
                placeholder="VD: Nhà máy X, Khu công nghiệp Y..."
                value={diaDiemLayMau} onChange={(e) => setDiaDiemLayMau(e.target.value)} />
            </div>

            <div style={{ position: "relative", marginBottom: 14 }}>
              <Search size={15} color="var(--ink-faint)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input
                className="lims-input"
                style={{ width: "100%", paddingLeft: 36, height: 38, fontSize: 13 }}
                placeholder="Gõ từ khóa để tìm chỉ tiêu (tên, mã, phương pháp)..."
                value={indicatorSearch}
                onChange={(e) => setIndicatorSearch(e.target.value)}
              />
            </div>

            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-dark)", display: "block", marginBottom: 10 }}>
              Chọn Loại mẫu & Chỉ tiêu:
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {SAMPLE_TYPES.map((type) => {
                const indicatorsInType = INDICATORS.filter((i) => {
                  const matchType = i.sampleTypes.includes(type);
                  if (!searchKeyword) return matchType;
                  return matchType && (
                    i.name.toLowerCase().includes(searchKeyword) ||
                    i.code.toLowerCase().includes(searchKeyword) ||
                    i.method.toLowerCase().includes(searchKeyword)
                  );
                });
                if (searchKeyword && !indicatorsInType.length) return null;

                const isExpanded = searchKeyword ? true : (openSampleTypes[type] ?? false);
                const allSelectedInType = indicatorsInType.length > 0 && indicatorsInType.every((ind) =>
                  selectedIndicators.some((i) => i.sampleType === type && i.indicatorCode === ind.code)
                );
                const selectedCountInType = selectedIndicators.filter((i) => i.sampleType === type).length;

                return (
                  <div key={type} style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
                    <div
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 14px", background: "var(--surface-alt, #F8FAFC)", userSelect: "none",
                      }}
                    >
                      <div
                        onClick={() => setOpenSampleTypes((p) => ({ ...p, [type]: !isExpanded }))}
                        style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", flex: 1 }}
                      >
                        <span style={{
                          padding: "2px 8px", borderRadius: 4, background: "var(--primary-soft)",
                          color: "var(--primary-dark)", fontSize: 11, fontWeight: 700,
                        }}>
                          {SAMPLE_TYPE_ABBR[type] || type}
                        </span>
                        <span style={{ fontWeight: 600, fontSize: 13.5 }}>{type}</span>
                        {selectedCountInType > 0 && (
                          <span style={{ fontSize: 11.5, color: "var(--primary-dark)", fontWeight: 600 }}>
                            Đã chọn {selectedCountInType}
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); toggleSelectAllInType(type, indicatorsInType); }}
                          style={{ border: "none", background: "none", color: "var(--primary)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                        >
                          {allSelectedInType ? "Bỏ chọn nhóm" : "Chọn tất cả nhóm"}
                        </button>
                        <div onClick={() => setOpenSampleTypes((p) => ({ ...p, [type]: !isExpanded }))} style={{ cursor: "pointer", color: "var(--ink-faint)" }}>
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div style={{
                        padding: "12px 14px", display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10,
                        borderTop: "1px solid var(--line)",
                      }}>
                        {indicatorsInType.map((ind) => {
                          const isChecked = selectedIndicators.some((i) => i.sampleType === type && i.indicatorCode === ind.code);
                          return (
                            <label key={ind.code} style={{
                              display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 10px", borderRadius: 6,
                              border: isChecked ? "1.5px solid var(--primary)" : "1px solid var(--line)",
                              background: isChecked ? "var(--primary-soft, #E6F4F1)" : "var(--surface)",
                              cursor: "pointer", fontSize: 12.5,
                            }}>
                              <input type="checkbox" checked={isChecked} onChange={() => toggleIndicator(type, ind.code)} style={{ marginTop: 2 }} />
                              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <span style={{ fontWeight: isChecked ? 600 : 500 }}>{ind.name}</span>
                                <div style={{ display: "flex", gap: 6, fontSize: 11, color: "var(--ink-faint)", flexWrap: "wrap" }}>
                                  <span className="mono" style={{ color: "var(--primary-dark)" }}>{ind.code}</span>
                                  <span>•</span>
                                  <span>{ind.method}</span>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 14, marginBottom: 20, display: "flex", flexDirection: "column", gap: 12 }}>
  <span style={{ fontWeight: 700, fontSize: 13 }}>Thông tin bổ sung khi xuất phiếu</span>
  <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
      <input type="checkbox" checked={meta.isEnglish} onChange={(e) => setMetaField("isEnglish", e.target.checked)} />
      Phiếu kết quả bằng Tiếng Anh (bỏ chọn = Tiếng Việt)
    </label>
    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
      <input type="checkbox" checked={meta.requiresRetention} onChange={(e) => setMetaField("requiresRetention", e.target.checked)} />
      Lưu mẫu theo quy định
    </label>
    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
      <input type="checkbox" checked={meta.subcontractAgreed} onChange={(e) => setMetaField("subcontractAgreed", e.target.checked)} />
      KH đồng ý dùng nhà thầu phụ
    </label>
  </div>

  <div>
    <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Nhận xét kết quả theo tiêu chuẩn</label>
    <input className="lims-input" style={{ width: "100%" }} value={meta.stdComment} onChange={(e) => setMetaField("stdComment", e.target.value)} />
  </div>

  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <div style={{ flex: "1 1 140px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Tổng chi phí</label>
      <input className="lims-input" style={{ width: "100%" }} value={meta.totalFee} onChange={(e) => setMetaField("totalFee", e.target.value)} />
    </div>
    <div style={{ flex: "1 1 140px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Đã ứng trước</label>
      <input className="lims-input" style={{ width: "100%" }} value={meta.advancePaid} onChange={(e) => setMetaField("advancePaid", e.target.value)} />
    </div>
    <div style={{ flex: "1 1 140px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Còn lại</label>
      <input className="lims-input" style={{ width: "100%" }} value={balanceDue.toLocaleString("vi-VN")} disabled />
    </div>
  </div>

  <div>
    <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Yêu cầu khác</label>
    <input className="lims-input" style={{ width: "100%" }} value={meta.otherRequest} onChange={(e) => setMetaField("otherRequest", e.target.value)} />
  </div>

  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
    <div style={{ flex: "1 1 200px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Người yêu cầu/gửi mẫu</label>
      <input className="lims-input" style={{ width: "100%" }} value={meta.requesterName} onChange={(e) => setMetaField("requesterName", e.target.value)} />
    </div>
    <div style={{ flex: "1 1 140px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Ngày gửi mẫu</label>
      <input className="lims-input" style={{ width: "100%" }} placeholder="dd/mm/yyyy" value={meta.sentDate} onChange={(e) => setMetaField("sentDate", e.target.value)} />
    </div>
    <div style={{ flex: "1 1 200px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Người tiếp nhận</label>
      <input className="lims-input" style={{ width: "100%" }} value={meta.receiverName} onChange={(e) => setMetaField("receiverName", e.target.value)} />
    </div>
    <div style={{ flex: "1 1 140px" }}>
      <label style={{ fontSize: 11.5, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Ngày tiếp nhận</label>
      <input className="lims-input" style={{ width: "100%" }} placeholder="dd/mm/yyyy" value={meta.receivedDate} onChange={(e) => setMetaField("receivedDate", e.target.value)} />
    </div>
  </div>
</div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button className="lims-btn lims-btn-ghost" onClick={onClose}>Hủy</button>
              <button
                className="lims-btn lims-btn-primary"
                disabled={selectedIndicators.length === 0}
                onClick={goToStep2}
              >
                Tiếp tục — Khai báo mẫu con
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-dark)", display: "block", marginBottom: 10 }}>
              Khai báo mẫu con theo từng Mục (loại mẫu):
            </label>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
              {groupedSelected.map((g, gi) => {
                const rows = sampleRowsByType[g.type] || [];
                return (
                  <div key={g.type} style={{ border: "1px solid var(--line)", borderRadius: 8, overflow: "hidden" }}>
                    <div style={{
                      padding: "10px 14px", background: "var(--surface-alt, #F8FAFC)",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <span style={{ fontWeight: 700, fontSize: 13 }}>
                        Mục {["I", "II", "III", "IV", "V", "VI", "VII"][gi] || gi + 1}: {g.type}
                      </span>
                      <button
                        type="button"
                        className="lims-btn lims-btn-ghost"
                        style={{ padding: "4px 10px", fontSize: 12 }}
                        onClick={() => addSampleRow(g.type)}
                      >
                        <Plus size={13} /> Thêm mẫu
                      </button>
                    </div>

                    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                      {rows.map((r) => (
                        <div key={r.id} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 12 }}>
                          {/* Hàng 1: Tên, Lượng mẫu, Tình trạng */}
                          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
                            <div style={{ flex: "1 1 220px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Tên mẫu</label>
                              <input
                                className="lims-input" style={{ width: "100%" }}
                                value={r.ten}
                                onChange={(e) => updateSampleRow(g.type, r.id, { ten: e.target.value })}
                              />
                            </div>
                            <div style={{ flex: "0 1 140px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Lượng mẫu</label>
                              <input
                                className="lims-input" style={{ width: "100%" }}
                                placeholder="VD: 2 lít"
                                value={r.luong}
                                onChange={(e) => updateSampleRow(g.type, r.id, { luong: e.target.value })}
                              />
                            </div>
                            <div style={{ flex: "0 1 180px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Tình trạng mẫu</label>
                              <select
                                className="lims-input" style={{ width: "100%" }}
                                value={r.tinhTrang}
                                onChange={(e) => updateSampleRow(g.type, r.id, { tinhTrang: e.target.value })}
                              >
                                {SAMPLE_TEST_STATUS.map((t) => <option key={t}>{t}</option>)}
                              </select>
                            </div>
                            <div style={{ flex: "1 1 180px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Vị trí lấy mẫu</label>
                              <input className="lims-input" style={{ width: "100%" }}
                                value={r.viTriLayMau || ""} onChange={(e) => updateSampleRow(g.type, r.id, { viTriLayMau: e.target.value })} />
                            </div>
                            <div style={{ flex: "0 1 150px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>Ngày hẹn trả</label>
                              <input className="lims-input" type="text" placeholder="dd/mm/yyyy" style={{ width: "100%" }}
                                value={r.ngayHenTra || ""} onChange={(e) => updateSampleRow(g.type, r.id, { ngayHenTra: e.target.value })} />
                            </div>
                            {rows.length > 1 && (
                              <div style={{ display: "flex", alignItems: "flex-end" }}>
                                <button className="lims-btn-icon" onClick={() => removeSampleRow(g.type, r.id)} title="Xóa mẫu này">
                                  <X size={14} />
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Hàng 2: Ghi chú & Upload ảnh */}
                          <div style={{ display: "flex", gap: 14, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
                            <div style={{ flex: "1 1 220px" }}>
                              <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 3 }}>
                                Ghi chú
                              </label>
                              <input
                                className="lims-input" style={{ width: "100%" }}
                                placeholder="Ghi chú thêm (nếu có)..."
                                value={r.ghiChu || ""}
                                onChange={(e) => updateSampleRow(g.type, r.id, { ghiChu: e.target.value })}
                              />
                            </div>
                            <SampleImageUpload
                              images={r.images || []}
                              onChange={(imgs) => updateSampleRow(g.type, r.id, { images: imgs })}
                            />
                          </div>

                          {/* Hàng 3: Chỉ tiêu áp dụng */}
                          <label style={{ fontSize: 11, color: "var(--ink-faint)", display: "block", marginBottom: 5 }}>
                            Chỉ tiêu thử áp dụng cho mẫu này
                          </label>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {g.codes.map((code) => {
                              const ind = indicatorMap.get(code);
                              const checked = r.chiTieu.includes(code);
                              return (
                                <label key={code} style={{
                                  display: "flex", alignItems: "center", gap: 5, padding: "4px 8px",
                                  borderRadius: 999, border: checked ? "1.5px solid var(--primary)" : "1px solid var(--line)",
                                  background: checked ? "var(--primary-soft, #E6F4F1)" : "var(--surface)",
                                  fontSize: 11.5, cursor: "pointer",
                                }}>
                                  <input type="checkbox" checked={checked} onChange={() => toggleRowIndicator(g.type, r.id, code)} style={{ margin: 0 }} />
                                  {ind?.name}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <button className="lims-btn lims-btn-ghost" onClick={() => setStep(1)}>← Quay lại chọn chỉ tiêu</button>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="lims-btn lims-btn-ghost" onClick={onClose}>Hủy</button>
                <button className="lims-btn lims-btn-primary" disabled={totalValidSamples === 0} onClick={handleSubmit}>
                  <FileText size={14} /> Tạo phiếu YCKN ({totalValidSamples} mẫu)
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   TRANG CHÍNH — TaoPhieuYCKNPage
   ============================================================ */
const TaoPhieuYCKNPage = ({
  role, setPage, canEdit,
  manualOrders, setManualOrders,
  manualRequests, setManualRequests,
  manualYckn, setManualYckn,
  manualAssignments, setManualAssignments,
  allOrders, allTestRequests, allYcknCode,
}) => {
  const [received, setReceived] = useState(
    () => new Set(Object.keys(TEST_REQUESTS).filter((no) => ORDERS.find((o) => o.no === no)?.status !== "Báo giá"))
  );
  const [expanded, setExpanded] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const orderNos = Object.keys(allTestRequests);
  const pending = orderNos.filter((no) => !received.has(no));
  const done = orderNos.filter((no) => received.has(no));

  const createPhieu = (no) => setReceived((prev) => new Set(prev).add(no));

  const flatten = (no) => flattenOrderSamples(no, allTestRequests, allYcknCode);

const handleCreateDirect = ({ kh, orderName, diaDiemLayMau, meta, groups }) => {
  const no = genOrderNo(allOrders);
  const yckn = genYcknCode(allYcknCode);

  setManualOrders((prev) => [
    ...prev,
    {
      no, name: orderName, type: "Mẫu gửi", sampleCode: "",
      ngayQT: new Date().toLocaleDateString("vi-VN"), ngayTra: "",
      kh, donVi: "Tạo trực tiếp (không qua báo giá)", status: "Tiếp nhận",
    },
  ]);
  setManualRequests((prev) => ({ ...prev, [no]: { kh, diaDiemLayMau, meta, groups } }));

  setManualYckn((prev) => ({ ...prev, [no]: yckn }));
  setManualAssignments((prev) => ({
    ...prev,
    [no]: {
      assignmentNo: `GV-${yckn}`,
      deliveryDate: new Date().toLocaleDateString("vi-VN"),
      delivererType: "INTERNAL",
      delivererName: ROLES.find((r) => r.key === "B").name,
      delivererContact: "",
      notes: "Phiếu tạo trực tiếp — chưa qua báo giá.",
    },
  }));
  setReceived((prev) => new Set(prev).add(no));
  setShowCreateModal(false);
  setExpanded(no);
};

  return (
    <>
      <PageHeader
        title="Tiếp nhận và Tạo phiếu"
        subtitle="Tạo Phiếu Yêu cầu Kiểm nghiệm (YCKN) từ báo giá đã chốt, hoặc tạo phiếu trực tiếp không qua báo giá"
      />
      <PageShell>
        <SectionCard title="Đơn hàng chờ tiếp nhận" icon={ScanLine} style={{ padding: 0 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px 0" }}>
            <button className="lims-btn lims-btn-primary" onClick={() => setShowCreateModal(true)}>
              <Plus size={14} /> Tạo phiếu YCKN trực tiếp
            </button>
          </div>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Đơn hàng</th><th>Tên</th><th>Khách hàng</th><th>Số chỉ tiêu đã chốt</th><th></th></tr></thead>
              <tbody>
                {pending.length === 0 && <tr><td colSpan={5} style={{ color: "var(--ink-faint)", padding: 16 }}>Không có đơn hàng chờ tiếp nhận.</td></tr>}
                {pending.map((no) => {
                  const o = allOrders.find((x) => x.no === no);
                  const flat = flatten(no);
                  return (
                    <tr key={no}>
                      <td className="mono">{no}</td>
                      <td style={{ fontWeight: 600 }}>{o?.name}</td>
                      <td>{allTestRequests[no].kh}</td>
                      <td className="mono">{flat.length} mẫu con</td>
<td>
  {canEdit && (
    <button className="lims-btn lims-btn-primary" style={{ padding: "5px 10px" }} onClick={() => createPhieu(no)}><FileText size={13} /> Tạo phiếu</button>
  )}
</td>                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Hợp đồng đã tiếp nhận" icon={PackageCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th></th><th>Mã Phiếu YCKN</th><th>Đơn hàng</th><th>Khách hàng</th><th>Số mẫu con</th><th>Nguồn</th></tr></thead>
              <tbody>
                {done.length === 0 && <tr><td colSpan={6} style={{ color: "var(--ink-faint)", padding: 16 }}>Chưa có hợp đồng nào được tạo phiếu.</td></tr>}
                {done.map((no) => {
                  const o = allOrders.find((x) => x.no === no);
                  const flat = flatten(no);
                  const isOpen = expanded === no;
                  const isManual = Boolean(manualRequests[no]);
                  return (
                    <React.Fragment key={no}>
                      <tr style={{ cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : no)}>
                        <td>{isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                        <td><SpecimenTag>{allYcknCode[no]}</SpecimenTag></td>
                        <td className="mono" style={{ color: "var(--ink-soft)" }}>{no}</td>
                        <td style={{ fontWeight: 600 }}>{allTestRequests[no].kh}</td>
                        <td className="mono">{flat.length}</td>
                        <td>
                          {isManual ? (
                            <span className="badge" style={{ background: "var(--blue-soft)", color: "var(--blue)" }}>Trực tiếp</span>
                          ) : (
                            <span className="badge" style={{ background: "var(--gray-soft)", color: "#5B6659" }}>Từ báo giá</span>
                          )}
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td colSpan={6} style={{ background: "var(--surface-alt)", padding: 0 }}>
                            <table className="lims-table" style={{ margin: "4px 0" }}>
                              <thead><tr><th>Mã mẫu con</th><th>Tên mẫu</th><th>Lượng mẫu</th><th>Tình trạng</th><th>Chỉ tiêu thử</th></tr></thead>
                              <tbody>
                                {flat.map((s) => (
                                  <tr key={s.maSoMau}>
                                    <td><SpecimenTag>{s.maSoMau}</SpecimenTag></td>
                                    <td style={{ fontWeight: 600 }}>{s.ten}</td>
                                    <td className="mono">{s.luong}</td>
                                    <td>{s.tinhTrang}</td>
                                    <td>{s.chiTieu.join(", ")}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {showCreateModal && (
        <CreatePhieuYCKNModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateDirect} />
      )}
    </>
  );
};


/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Yêu cầu thử nghiệm
   ============================================================ */
const sampleCodeFor = (orderNo, stt, ycknCodes = YCKN_CODE) => `${ycknCodes[orderNo] || orderNo}/${String(stt).padStart(2, "0")}`;
const genFinalReportCode = (orderNo, ycknCodes = YCKN_CODE) => `${ycknCodes[orderNo] || orderNo}/QC`;
const TestRequestPrintModal = ({ orderNo, request, onClose, allTestRequests, allYcknCode }) => {
  const flat = flattenOrderSamples(orderNo, allTestRequests, allYcknCode);
  const byGroup = {};
  flat.forEach((s) => { (byGroup[s.groupTitle] = byGroup[s.groupTitle] || []).push(s); });

  return (
    
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,30,25,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 55, padding: 20 }} onClick={onClose}>
      <div className="lims-root" style={{ width: 760, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: "var(--surface)", borderRadius: 12, boxShadow: "0 30px 60px rgba(0,0,0,.25)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={16} color="var(--primary)" />
            <span style={{ fontWeight: 600, fontSize: 13.5 }}>Xuất Phiếu — Yêu cầu Kiểm nghiệm (YCKN)</span>
          </div>
          <button className="lims-btn-icon" onClick={onClose}><X size={14} /></button>
        </div>
        <div style={{ padding: "28px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12.5, marginBottom: 18, padding: 12, background: "var(--surface-alt)", borderRadius: 8 }}>
  <div>Ngôn ngữ phiếu: <strong>{request.meta?.isEnglish ? "Tiếng Anh" : "Tiếng Việt"}</strong></div>
  <div>Lưu mẫu theo quy định: <strong>{request.meta?.requiresRetention ? "Có" : "Không"}</strong></div>
  <div>Đồng ý nhà thầu phụ: <strong>{request.meta?.subcontractAgreed ? "Có" : "Không"}</strong></div>
  <div>Địa điểm lấy mẫu: <strong>{request.diaDiemLayMau || "—"}</strong></div>
  <div>Tổng chi phí: <strong>{request.meta?.totalFee || "—"}</strong></div>
  <div>Đã ứng trước: <strong>{request.meta?.advancePaid || "—"}</strong></div>
  <div>Người gửi mẫu: <strong>{request.meta?.requesterName || "—"}</strong> ({request.meta?.sentDate || "—"})</div>
  <div>Người tiếp nhận: <strong>{request.meta?.receiverName || "—"}</strong> ({request.meta?.receivedDate || "—"})</div>
</div>

            <div className="disp" style={{ fontSize: 18, fontWeight: 700, letterSpacing: ".04em" }}>PHIẾU YÊU CẦU KIỂM NGHIỆM</div>
            {allYcknCode[orderNo] || orderNo}
          </div>
          <p style={{ fontSize: 13, margin: "0 0 18px" }}>Khách hàng: <strong>{request.kh}</strong> · Đơn hàng: <span className="mono">{orderNo}</span></p>
          {Object.entries(byGroup).map(([title, samples], gi) => (
            <div key={gi} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary-dark)", marginBottom: 8 }}>{title}</div>
              <div className="lims-scroll" style={{ overflowX: "auto" }}>
                <table className="lims-table">
                  <thead><tr><th>STT</th><th>Tên mẫu</th><th>Lượng mẫu</th><th>Tình trạng</th><th>Mã số mẫu</th><th>Chỉ tiêu thử</th><th>Phương pháp</th><th>Ghi chú</th></tr></thead>
                  <tbody>
                    {samples.map((s) => (
                      <tr key={s.seq}>
                        <td className="mono">{s.stt}</td>
                        <td style={{ fontWeight: 600 }}>{s.ten}</td>
                        <td className="mono">{s.luong}</td>
                        <td>{s.tinhTrang}</td>
                        <td><SpecimenTag>{s.maSoMau}</SpecimenTag></td>
                        <td>{s.chiTieu.join(", ")}</td>
                        <td style={{ color: "var(--ink-soft)" }}>{s.chiTieu.map((c) => findIndicatorByName(c)?.method).filter(Boolean).join("; ")}</td>
                        <td>—</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: "14px 20px", borderTop: "1px solid var(--line)" }}>
          <button className="lims-btn lims-btn-ghost" onClick={onClose}>Đóng</button>
          <button className="lims-btn lims-btn-primary"><Download size={14} /> Tải file</button>
        </div>
      </div>
    </div>
  );
};


const YeuCauThuNghiemPage = ({ allOrders, allTestRequests, allYcknCode }) => {
  const orderNos = Object.keys(allTestRequests);
  const [orderNo, setOrderNo] = useState(orderNos[0]);

  const [notes, setNotes] = useState({});
  const [printing, setPrinting] = useState(false);
  const request = allTestRequests[orderNo];
  const order = allOrders.find((o) => o.no === orderNo);

  const setNote = (key, val) => setNotes((n) => ({ ...n, [key]: val }));

  return (
    <>
      <PageHeader title="Yêu cầu thử nghiệm" subtitle="Phiếu Yêu cầu Kiểm nghiệm (YCKN) — sinh ra sau khi báo giá được chuyển thành đơn hàng" />
      <PageShell>
        <SectionCard title="Chọn đơn hàng" icon={ClipboardList}
          action={<button className="lims-btn lims-btn-primary" onClick={() => setPrinting(true)}><Printer size={14} /> Xuất Phiếu</button>}
        >
          <select className="lims-input" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}>
  {orderNos.map((no) => <option key={no} value={no}>{allYcknCode[no]} — {no} — {allTestRequests[no].kh}</option>)}
</select>
          {order && <span style={{ marginLeft: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>{order.name}</span>}
        </SectionCard>

        {Object.entries(flattenOrderSamples(orderNo, allTestRequests, allYcknCode).reduce((acc, s) => {
          (acc[s.groupTitle] = acc[s.groupTitle] || []).push(s);
          return acc;
        }, {})).map(([title, samples], gi) => (
          <SectionCard key={gi} title={title} icon={PackageCheck} style={{ padding: 0 }}>
            <div className="lims-scroll" style={{ overflowX: "auto" }}>
              <table className="lims-table">
                <thead>
                  <tr><th>STT</th><th>Tên mẫu</th><th>Lượng mẫu</th><th>Tình trạng</th><th>Mã số mẫu</th><th>Chỉ tiêu thử</th><th>Phương pháp</th><th>Ghi chú</th></tr>
                </thead>
                <tbody>
                  {samples.map((s) => {
                    const key = `${orderNo}-${s.maSoMau}`;
                    return (
                      <tr key={s.seq}>
                        <td className="mono">{s.stt}</td>
                        <td style={{ fontWeight: 600 }}>{s.ten}</td>
                        <td className="mono">{s.luong}</td>
                        <td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>{s.tinhTrang}</span></td>
                        <td><SpecimenTag>{s.maSoMau}</SpecimenTag></td>
                        <td>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                            {s.chiTieu.map((c) => <span key={c} className="badge" style={{ background: "var(--blue-soft)", color: "var(--blue)" }}>{c}</span>)}
                          </div>
                        </td>
                        <td style={{ color: "var(--ink-soft)", fontSize: 12 }}>{s.chiTieu.map((c) => findIndicatorByName(c)?.method).filter(Boolean).join("; ")}</td>
                        <td><input className="lims-input" style={{ width: 140 }} placeholder="Ghi chú" value={notes[key] || ""} onChange={(e) => setNote(key, e.target.value)} /></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>
        ))}
      </PageShell>
{printing && <TestRequestPrintModal orderNo={orderNo} request={request} allTestRequests={allTestRequests} allYcknCode={allYcknCode} onClose={() => setPrinting(false)} />}    </>
  );
};

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Giao việc
   ============================================================ */
// Toàn bộ danh sách người có thể được giao việc (KNV nội bộ + nhà thầu phụ)
const ALL_ASSIGNEES = [...TECHNICIANS, ...SUBCONTRACTORS.map((s) => s.name)];

const PhanCongPage = ({ role, canEdit, allOrders, allTestRequests, allYcknCode, allWorkAssignments }) => {
  const orderNos = Object.keys(allTestRequests);
  const [orderNo, setOrderNo] = useState(orderNos[0]);
  const flat = useMemo(() => flattenOrderSamples(orderNo, allTestRequests, allYcknCode), [orderNo, allTestRequests, allYcknCode]);
  const [assignees, setAssignees] = useState({});
  const [notes, setNotes] = useState({});
  const order = allOrders.find((o) => o.no === orderNo);
  const nguoiLapPhieu = ROLES.find((r) => r.key === "B").name; // người lập phiếu giao việc trong hệ thống
  const [header, setHeader] = useState(
  allWorkAssignments[orderNo] || { assignmentNo: `GV-${allYcknCode[orderNo] || orderNo}`, deliveryDate: "", delivererType: "INTERNAL", delivererName: TECHNICIANS[0], delivererContact: "", notes: "" }
);
React.useEffect(() => {
  setHeader(allWorkAssignments[orderNo] || { assignmentNo: `GV-${allYcknCode[orderNo] || orderNo}`, deliveryDate: "", delivererType: "INTERNAL", delivererName: TECHNICIANS[0], delivererContact: "", notes: "" });
}, [orderNo, allYcknCode]);

const setHeaderField = (field, val) => setHeader((h) => ({ ...h, [field]: val }));
  const defaultAssignee = (s) => findIndicatorByName(s.chiTieu[0])?.assignee || TECHNICIANS[0];
  const assigneeFor = (s) => assignees[s.maSoMau] || defaultAssignee(s);
  const [assignDates, setAssignDates] = useState({});

  const setAssignee = (maSoMau, person) => {
    setAssignees((a) => ({ ...a, [maSoMau]: person }));
    setAssignDates((d) => ({ ...d, [maSoMau]: new Date().toLocaleDateString("vi-VN") }));
  };
  const setNote = (maSoMau, val) => setNotes((n) => ({ ...n, [maSoMau]: val }));

  return (
    <>
      <PageHeader title="Giao việc" subtitle="Giao từng mẫu con cho kiểm nghiệm viên — mặc định lấy theo Danh mục Chỉ tiêu, có thể đổi người" />
      <PageShell>
<SectionCard title="Chọn hợp đồng / Phiếu YCKN" icon={ClipboardList}>
  <select className="lims-input" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}>
    {orderNos.map((no) => <option key={no} value={no}>{allYcknCode[no]} — {no} — {allTestRequests[no].kh}</option>)}
  </select>
  {order && <span style={{ marginLeft: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>{order.name}</span>}
  <span style={{ marginLeft: 12, fontSize: 12, color: "var(--ink-faint)" }}>Người lập phiếu: <strong style={{ color: "var(--ink)" }}>{nguoiLapPhieu}</strong></span>
</SectionCard>

<SectionCard title="Thông tin chung Phiếu giao việc" icon={PackageCheck}>
  <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "flex-end" }}>
    <div>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Số phiếu giao việc</label>
      <input className="lims-input" style={{ width: 160 }} value={header.assignmentNo} onChange={(e) => setHeaderField("assignmentNo", e.target.value)} />
    </div>
    <div>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Ngày giao mẫu phân tích</label>
      <input className="lims-input" style={{ width: 150 }} placeholder="dd/mm/yyyy" value={header.deliveryDate} onChange={(e) => setHeaderField("deliveryDate", e.target.value)} />
    </div>
    <div>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Người giao mẫu</label>
      <select className="lims-input" style={{ width: 170 }} value={header.delivererType} onChange={(e) => setHeaderField("delivererType", e.target.value)}>
        <option value="INTERNAL">Người dùng nội bộ</option>
        <option value="EXTERNAL">Đối tác ngoài hệ thống</option>
      </select>
    </div>
    {header.delivererType === "INTERNAL" ? (
      <div>
        <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Chọn người</label>
        <select className="lims-input" style={{ width: 170 }} value={header.delivererName} onChange={(e) => setHeaderField("delivererName", e.target.value)}>
          {[...TECHNICIANS, "Acc Quản lý", "Acc Trưởng phòng"].map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>
    ) : (
      <>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Tên người/đơn vị giao</label>
          <input className="lims-input" style={{ width: 200 }} placeholder="VD: Anh Tuấn - Lái xe KH" value={header.delivererName} onChange={(e) => setHeaderField("delivererName", e.target.value)} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Liên hệ</label>
          <input className="lims-input" style={{ width: 150 }} placeholder="SĐT" value={header.delivererContact} onChange={(e) => setHeaderField("delivererContact", e.target.value)} />
        </div>
      </>
    )}
    <div style={{ flex: "1 1 220px" }}>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 4 }}>Ghi chú chung</label>
      <input className="lims-input" style={{ width: "100%" }} value={header.notes} onChange={(e) => setHeaderField("notes", e.target.value)} />
    </div>
  </div>
</SectionCard>

        <SectionCard title="Danh sách mẫu con cần giao việc" icon={Split} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>Số phiếu</th><th>Tên mẫu</th><th>Lượng mẫu / Tình trạng</th><th>Mã số mẫu</th>
                  <th>Chỉ tiêu thử</th><th>Người kiểm nghiệm</th><th>Ghi chú</th><th>Người giao việc</th>
                </tr>
              </thead>
              <tbody>
                {flat.map((s) => {
                  const ind0 = findIndicatorByName(s.chiTieu[0]);
                  const current = assigneeFor(s);
                  const isDefault = current === defaultAssignee(s);
                  return (
                    <tr key={s.maSoMau}>
                      <td><SpecimenTag>{allYcknCode[orderNo]}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{s.ten}</td>
                      <td>
                        <div className="mono">{s.luong}</div>
                        <span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)", marginTop: 3 }}>{s.tinhTrang}</span>
                      </td>
                      <td><SpecimenTag>{s.maSoMau}</SpecimenTag></td>
                      <td>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                          {s.chiTieu.map((c) => <span key={c} className="badge" style={{ background: "var(--blue-soft)", color: "var(--blue)" }}>{c}</span>)}
                        </div>
                      </td>
                      <td>
                        <select
                          className="lims-input"
                          style={{ fontSize: 12, padding: "4px 8px" }}
                          value={current}
                          disabled={!canEdit}
                          onChange={(e) => setAssignee(s.maSoMau, e.target.value)}
                        >
                          {ALL_ASSIGNEES.map((p) => <option key={p}>{p}</option>)}
                        </select>
                        <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 3 }}>
                          {isDefault ? "Mặc định theo Danh mục Chỉ tiêu" : "Đã chuyển người khác"}
                          {ind0?.isSubcontract && " · Nhà thầu phụ"}
                        </div>
                      </td>
                      <td><input className="lims-input" style={{ width: 140, fontSize: 12 }} placeholder="Ghi chú" value={notes[s.maSoMau] || ""} onChange={(e) => setNote(s.maSoMau, e.target.value)} /></td>
<td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{nguoiLapPhieu}</td>                    </tr>
                  );
                })}
                {flat.length === 0 && <tr><td colSpan={8} style={{ padding: 16, color: "var(--ink-faint)" }}>Hợp đồng này chưa có yêu cầu thử nghiệm.</td></tr>}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Quản lý Mẻ thử nghiệm
   ============================================================ */
const ALL_COLUMNS = [
  { key: "sample", label: "Mã mẫu con" },
  { key: "order", label: "Đơn hàng" },
  { key: "indicator", label: "Chỉ tiêu" },
  { key: "method", label: "Phương pháp" },
  { key: "lod", label: "LOD" },
  { key: "tech", label: "Kiểm Nghiệm viên" },
  { key: "status", label: "Trạng thái" },
];

const ColumnToggle = ({ visible, setVisible }) => {
  const [open, setOpen] = useState(false);
  const toggle = (key) => setVisible((v) => ({ ...v, [key]: !v[key] }));
  return (
    <div style={{ position: "relative" }}>
      <button className="lims-btn lims-btn-ghost" onClick={() => setOpen((o) => !o)}><Eye size={14} /> Cột hiển thị</button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 5 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: 38, right: 0, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, boxShadow: "0 8px 20px rgba(0,0,0,.1)", zIndex: 6, padding: 8, minWidth: 180 }}>
            {ALL_COLUMNS.map((c) => (
              <label key={c.key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 6px", fontSize: 12.5, cursor: "pointer" }}>
                <input type="checkbox" checked={visible[c.key]} onChange={() => toggle(c.key)} />
                {c.label}
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MeThuNghiemPage = ({ batches, allYcknCode, allTestRequests, allWorkAssignments }) => {
  const groupedByPhieu = Object.keys(allTestRequests).map((orderNo) => ({
    orderNo,
    phieu: allYcknCode[orderNo],
    kh: allTestRequests[orderNo]?.kh,
    items: batches.filter((b) => b.order === orderNo),
  }));
  const [expanded, setExpanded] = useState(groupedByPhieu[0]?.orderNo || null);
  const [colVisible, setColVisible] = useState(Object.fromEntries(ALL_COLUMNS.map((c) => [c.key, true])));

  return (
    <>
      <PageHeader title="Quản lý Mẻ thử nghiệm" subtitle="Gom nhóm theo Số phiếu YCKN — mỗi phiếu có thể chứa nhiều mẫu con và nhiều chỉ tiêu" />
      <PageShell>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {groupedByPhieu.map((g) => {
            const isOpen = expanded === g.orderNo;
            return (
              <div key={g.orderNo} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
                <div
  onClick={() => setExpanded(isOpen ? null : g.orderNo)}
  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: isOpen ? "var(--surface-alt)" : "var(--surface)", flexWrap: "wrap" }}
>
  {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
  <SpecimenTag>{g.phieu}</SpecimenTag>
  <span style={{ fontSize: 13, fontWeight: 600 }}>{g.kh}</span>
  <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{g.orderNo}</span>
  {(() => {
    const a = allWorkAssignments[g.orderNo];
    return a ? (
      <span style={{ fontSize: 11.5, color: "var(--ink-soft)", display: "flex", alignItems: "center", gap: 5 }}>
        <PackageCheck size={12} color="var(--primary)" /> {a.assignmentNo} · Giao {a.deliveryDate} · {delivererLabel(a)}
      </span>
    ) : null;
  })()}
  <span className="badge" style={{ background: "var(--surface-alt)", color: "var(--ink-soft)", marginLeft: "auto" }}>{g.items.length} chỉ tiêu</span>
</div>
                {isOpen && (
                  <div className="lims-scroll" style={{ overflowX: "auto", borderTop: "1px solid var(--line)" }}>
                    <table className="lims-table">
                      <thead>
                        <tr>
                          <th>Mã mẫu con</th><th>Số PGV</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>Kiểm Nghiệm viên</th><th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.items.map((b, i) => {
                          const st = BATCH_STATUS[b.status];
                          return (
                            <tr key={i}>
                              <td><SpecimenTag>{b.kyHieu || b.sample}</SpecimenTag></td>
                              <td className="mono" style={{ color: "var(--ink-faint)", fontSize: 11.5 }}>{b.assignmentNo || "—"}</td>
                              <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                              <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                              <td>{b.tech}</td>
                              <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <SectionCard
          title="Toàn bộ mẻ thử nghiệm"
          icon={FlaskConical}
          style={{ padding: 0 }}
          action={<ColumnToggle visible={colVisible} setVisible={setColVisible} />}
        >
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  {colVisible.sample && <th>Mã mẫu con</th>}
                  {colVisible.order && <th>Đơn hàng</th>}
                  {colVisible.indicator && <th>Chỉ tiêu</th>}
                  {colVisible.method && <th>Phương pháp</th>}
                  {colVisible.lod && <th>LOD</th>}
                  {colVisible.tech && <th>Kiểm Nghiệm viên</th>}
                  {colVisible.status && <th>Trạng thái</th>}
                </tr>
              </thead>
              <tbody>
                {batches.map((b, i) => {
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
                      {colVisible.sample && <td><SpecimenTag>{b.kyHieu || b.sample}</SpecimenTag></td>}
                      {colVisible.order && <td className="mono" style={{ color: "var(--ink-soft)" }}>{b.order}</td>}
                      {colVisible.indicator && <td style={{ fontWeight: 600 }}>{b.indicator}</td>}
                      {colVisible.method && <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>}
                      {colVisible.lod && <td className="mono">{b.lodloq}</td>}
                      {colVisible.tech && <td>{b.tech}</td>}
                      {colVisible.status && <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   4. BÀN LÀM VIỆC KNV — Nhập kết quả thử nghiệm
   ============================================================ */
const evaluateResult = (b) => {
  if (!b.result) return null;
  const val = parseFloat(b.result);
  if (isNaN(val)) return null;
  const lod = parseFloat(b.lodloq);
  if (!isNaN(lod) && val < lod) return "warn";
  const limitMatch = b.limit && b.limit.match(/≤\s*([\d.]+)/);
  if (limitMatch && val > parseFloat(limitMatch[1])) return "bad";
  return "ok";
};

const NhapKetQuaPage = ({ role, batches, setBatches }) => {
  const myName = ROLES.find((r) => r.key === "A").name;
  const [filter, setFilter] = useState(EMPTY_FILTER);
 
  const editableStatuses = ["ASSIGNED", "TESTING", "REJECTED"];
  const rowIndexes = batches
    .map((b, i) => ({ b, i }))
    .filter(
      ({ b }) =>
        editableStatuses.includes(b.status) &&
        (role !== "A" || b.tech === myName) &&
        batchMatchesSelection(b, filter)
    )
    .map(({ i }) => i);
 
  const update = (globalIdx, field, value) =>
    setBatches((all) => all.map((row, idx) => (idx === globalIdx ? { ...row, [field]: value } : row)));
 
  const submitForApproval = () => {
    setBatches((all) =>
      all.map((row, idx) =>
        rowIndexes.includes(idx) && row.result ? { ...row, status: "PENDING_APPROVAL" } : row
      )
    );
  };
 
  return (
    <>
      <PageHeader
        title="Nhập kết quả thử nghiệm"
        subtitle={role === "A" ? `Chỉ hiển thị công việc được giao cho ${myName}` : "Bulk Entry dạng Excel — cảnh báo tự động nếu vượt ngưỡng hoặc dưới LOD"}
      />
      <PageShell>
        <SectionCard title="Lọc theo Khách hàng → Hợp đồng → Phiếu YCKN → Phiếu con" icon={ListFilter}>
          <CascadeFilter value={filter} onChange={setFilter} />
        </SectionCard>
 
        <SectionCard title="Nhập liệu hàng loạt" icon={FlaskConical} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>Mẫu</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>Đơn vị</th><th>LOD</th>
                  <th>Kết quả</th><th>Ghi chú</th><th>File</th>
                </tr>
              </thead>
              <tbody>
                {rowIndexes.map((idx) => {
                  const b = batches[idx];
                  const ev = evaluateResult(b);
                  return (
                    <tr key={idx}>
                      <td><SpecimenTag>{b.sample}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                      <td className="mono">{b.unit}</td>
                      <td className="mono">{b.lodloq}</td>
                      <td>
                        <input
                          className={"lims-input " + (ev === "warn" ? "warn" : ev === "bad" ? "bad" : "")}
                          style={{ width: 90 }}
                          value={b.result}
                          onChange={(e) => update(idx, "result", e.target.value)}
                          placeholder="—"
                        />
                        {ev === "bad" && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--red)", marginTop: 3 }}><AlertTriangle size={11} /> Vượt ngưỡng {b.limit}</div>}
                        {ev === "warn" && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--amber)", marginTop: 3 }}><AlertTriangle size={11} /> Dưới LOD</div>}
                      </td>
                      <td><input className="lims-input" style={{ width: 140 }} value={b.note} onChange={(e) => update(idx, "note", e.target.value)} placeholder="Ghi chú" /></td>
                      <td><button className="lims-btn-icon" title="Đính kèm file"><Paperclip size={14} /></button></td>
                    </tr>
                  );
                })}
                {rowIndexes.length === 0 && (
                  <tr><td colSpan={8} style={{ padding: 16, color: "var(--ink-faint)" }}>
                    Không có chỉ tiêu nào khớp bộ lọc hiện tại.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, padding: 14, borderTop: "1px solid var(--line)" }}>
            <button className="lims-btn lims-btn-ghost">Lưu tạm</button>
            <button className="lims-btn lims-btn-primary" onClick={submitForApproval}><FileCheck2 size={14} /> Gửi duyệt</button>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   5. TỔNG HỢP — Quản lý (role B) tổng hợp toàn bộ chỉ tiêu của
   một Phiếu YCKN sau khi KNV đã nộp kết quả, được rà soát/chỉnh
   sửa lần cuối rồi mới chuyển cho Trưởng phòng duyệt.
   ============================================================ */
const TongHopPhieuPage = ({ batches, setBatches }) => {
  const [filter, setFilter] = useState(EMPTY_FILTER);
 
  const groupedByPhieu = useMemo(() => {
    const byOrder = new Map();
    batches.forEach((b, idx) => {
      if (!batchMatchesSelection(b, filter)) return;
      if (!byOrder.has(b.order)) byOrder.set(b.order, []);
      byOrder.get(b.order).push(idx);
    });
    return [...byOrder.entries()]
      .map(([orderNo, idxs]) => ({ orderNo, idxs }))
      // Chỉ hiện những phiếu không còn chỉ tiêu nào đang ở KNV (ASSIGNED/TESTING)
      .filter(({ idxs }) => idxs.some((i) => batches[i].status === "PENDING_APPROVAL") &&
        !idxs.some((i) => ["ASSIGNED", "TESTING"].includes(batches[i].status)));
  }, [batches, filter]);
 
  const [expanded, setExpanded] = useState(groupedByPhieu[0]?.orderNo || null);
 
  const update = (idx, field, value) =>
    setBatches((all) => all.map((row, i) => (i === idx ? { ...row, [field]: value } : row)));
 
  const confirmAggregate = (idxs) => {
    setBatches((all) =>
      all.map((row, i) =>
        idxs.includes(i) && row.status === "PENDING_APPROVAL" ? { ...row, status: "PENDING_HEAD_APPROVAL" } : row
      )
    );
  };
 
  return (
    <>
      <PageHeader
        title="Tổng hợp & Gửi duyệt"
        subtitle="Khi mọi chỉ tiêu của một Phiếu YCKN đã có kết quả, rà soát toàn bộ tại đây trước khi chuyển cho Trưởng phòng ký duyệt"
      />
      <PageShell>
        <SectionCard title="Lọc theo Khách hàng → Hợp đồng → Phiếu YCKN → Phiếu con" icon={ListFilter}>
          <CascadeFilter value={filter} onChange={setFilter} />
        </SectionCard>
 
        {groupedByPhieu.length === 0 && (
          <SectionCard title="Chưa có phiếu nào sẵn sàng tổng hợp" icon={Layers}>
            <p style={{ margin: 0, fontSize: 13, color: "var(--ink-faint)" }}>
              Không có Phiếu YCKN nào vừa khớp bộ lọc vừa đã được Kiểm nghiệm viên nộp đủ kết quả.
            </p>
          </SectionCard>
        )}
 
        {groupedByPhieu.map(({ orderNo, idxs }) => {
          const isOpen = expanded === orderNo;
          const kh = TEST_REQUESTS[orderNo]?.kh || batches[idxs[0]]?.order;
          const rows = idxs.map((i) => ({ i, b: batches[i] }));
          const badCount = rows.filter(({ b }) => evaluateResult(b) === "bad").length;
 
          return (
            <div key={orderNo} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius)", overflow: "hidden" }}>
              <div
                onClick={() => setExpanded(isOpen ? null : orderNo)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: isOpen ? "var(--surface-alt)" : "var(--surface)" }}
              >
                {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                <SpecimenTag>{YCKN_CODE[orderNo] || orderNo}</SpecimenTag>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{kh}</span>
                <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{orderNo}</span>
                <span className="badge" style={{ background: "var(--violet-soft)", color: "var(--violet)", marginLeft: "auto" }}>{rows.length} chỉ tiêu đã nộp</span>
                {badCount > 0 && <span className="badge" style={{ background: "var(--red-soft)", color: "var(--red)" }}><AlertTriangle size={11} /> {badCount} vượt ngưỡng</span>}
              </div>
 
              {isOpen && (
                <>
                  <div className="lims-scroll" style={{ overflowX: "auto", borderTop: "1px solid var(--line)" }}>
                    <table className="lims-table">
                      <thead>
                        <tr><th>Mã mẫu con</th><th>Chỉ tiêu</th><th>KNV thực hiện</th><th>Kết quả</th><th>QCVN</th><th>Đánh giá</th><th>Ghi chú</th></tr>
                      </thead>
                      <tbody>
                        {rows.map(({ i, b }) => {
                          const ev = evaluateResult(b);
                          return (
                            <tr key={i}>
                              <td><SpecimenTag>{b.kyHieu || b.sample}</SpecimenTag></td>
                              <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                              <td>{b.tech}</td>
                              <td>
                                <input
                                  className={"lims-input " + (ev === "bad" ? "bad" : ev === "warn" ? "warn" : "")}
                                  style={{ width: 90 }}
                                  value={b.result}
                                  onChange={(e) => update(i, "result", e.target.value)}
                                />
                              </td>
                              <td className="mono" style={{ color: "var(--ink-soft)" }}>{b.qcvn || b.limit}</td>
                              <td>
                                {ev === "bad"
                                  ? <span className="badge" style={{ background: "var(--red-soft)", color: "var(--red)" }}><XCircle size={12} /> Vượt ngưỡng</span>
                                  : <span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}><CheckCircle2 size={12} /> Đạt</span>}
                              </td>
                              <td><input className="lims-input" style={{ width: 140 }} value={b.note} onChange={(e) => update(i, "note", e.target.value)} placeholder="Ghi chú kiểm tra lại" /></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", padding: 14, borderTop: "1px solid var(--line)" }}>
                    <button className="lims-btn lims-btn-primary" onClick={() => confirmAggregate(idxs)}>
                      <SendHorizontal size={14} /> Xác nhận tổng hợp & Chuyển Trưởng phòng duyệt
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </PageShell>
    </>
  );
};

/* ============================================================
   5. DUYỆT & BÁO CÁO KẾT QUẢ — Duyệt phiếu kết quả
   Chỉ nhận phiếu đã được Quản lý tổng hợp (PENDING_HEAD_APPROVAL)
   ============================================================ */
const DuyetPhieuPage = ({ role, batches, setBatches }) => {
  const rowIndexes = batches.map((b, i) => i).filter((i) => batches[i].status === "PENDING_HEAD_APPROVAL");
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const canApprove = role === "C";

  const approve = (idx) => setBatches((all) => all.map((row, i) => (i === idx ? { ...row, status: "APPROVED_COMPLETED" } : row)));
  const openReject = (idx) => { setRejecting(idx); setReason(""); };
  const confirmReject = () => {
    if (!reason.trim()) return;
    setBatches((all) => all.map((row, i) => (i === rejecting ? { ...row, status: "REJECTED", note: reason } : row)));
    setRejecting(null);
  };

  return (
    <>
      <PageHeader title="Duyệt phiếu kết quả" subtitle={canApprove ? "Chỉ hiển thị các chỉ tiêu đã được Quản lý tổng hợp — so sánh với QCVN trước khi ký số" : "Chỉ vai trò Trưởng phòng mới có quyền Duyệt / Từ chối — bạn đang xem ở chế độ chỉ đọc"} />
      <PageShell>
        <SectionCard title="Hàng chờ duyệt" icon={ClipboardCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Mẫu</th><th>Chỉ tiêu</th><th>Kết quả KNV</th><th>QCVN</th><th>Đánh giá</th><th>KNV thực hiện</th><th>Trạng thái</th><th></th></tr>
              </thead>
              <tbody>
                {rowIndexes.map((idx) => {
                  const b = batches[idx];
                  const ev = evaluateResult(b);
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={idx}>
                      <td><SpecimenTag>{b.kyHieu || b.sample}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td className="mono">{b.result} {b.unit !== "-" ? b.unit : ""}</td>
                      <td className="mono" style={{ color: "var(--ink-soft)" }}>{b.qcvn || b.limit}</td>
                      <td>
                        {ev === "bad"
                          ? <span className="badge" style={{ background: "var(--red-soft)", color: "var(--red)" }}><XCircle size={12} /> Vượt ngưỡng</span>
                          : <span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}><CheckCircle2 size={12} /> Đạt</span>}
                      </td>
                      <td>{b.tech}</td>
                      <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                      <td>
                        {canApprove && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="lims-btn lims-btn-primary" style={{ padding: "5px 9px" }} onClick={() => approve(idx)}><PenLine size={13} /> Duyệt & Ký số</button>
                            <button className="lims-btn lims-btn-danger" style={{ padding: "5px 9px" }} onClick={() => openReject(idx)}><XCircle size={13} /> Từ chối</button>
                          </div>
                        )}
                        {!canApprove && <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>Chờ Trưởng phòng duyệt</span>}
                      </td>
                    </tr>
                  );
                })}
                {rowIndexes.length === 0 && <tr><td colSpan={8} style={{ padding: 16, color: "var(--ink-faint)" }}>Không còn phiếu nào chờ duyệt. Các chỉ tiêu mới nộp cần Quản lý tổng hợp trước.</td></tr>}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {rejecting !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(15,30,25,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }} onClick={() => setRejecting(null)}>
          <div className="lims-root" style={{ width: 420, background: "var(--surface)", borderRadius: 12, padding: 20 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>Từ chối kết quả</h3>
              <button className="lims-btn-icon" onClick={() => setRejecting(null)}><X size={14} /></button>
            </div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Lý do từ chối (bắt buộc)</label>
            <textarea className="lims-input" style={{ width: "100%", marginTop: 6, minHeight: 80, resize: "vertical" }} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Nhập lý do từ chối kết quả..." />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
              <button className="lims-btn lims-btn-ghost" onClick={() => setRejecting(null)}>Hủy</button>
              <button className="lims-btn lims-btn-danger" disabled={!reason.trim()} onClick={confirmReject}>Xác nhận từ chối</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ============================================================
   5. DUYỆT & BÁO CÁO KẾT QUẢ — Kết quả thử nghiệm
   ============================================================ */
const KetQuaThuNghiemPage = ({ batches }) => {
  const samples = [...new Set(batches.map((b) => b.kyHieu))];
  const [maSoMau, setMaSoMau] = useState(samples[0]);
  const rows = batches.filter((b) => b.kyHieu === maSoMau);
  const order = ORDERS.find((o) => o.no === rows[0]?.order);

  return (
    <>
      <PageHeader title="Kết quả thử nghiệm" subtitle="Bảng tổng hợp kết quả theo mẫu con, đối chiếu QCVN — dùng để soát trước khi phát hành CoA" />
      <PageShell>
        <SectionCard title="Chọn mẫu con" icon={ClipboardCheck}>
          <select className="lims-input" value={maSoMau} onChange={(e) => setMaSoMau(e.target.value)}>
            {samples.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {order && <span style={{ marginLeft: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>{order.name} — {order.kh}</span>}
          {(() => {
            const a = getAssignmentByOrder(rows[0]?.order);
            return a ? (
              <div style={{ marginTop: 10, fontSize: 12, color: "var(--ink-soft)", display: "flex", flexWrap: "wrap", gap: 14 }}>
                <span><strong style={{ color: "var(--ink)" }}>Số phiếu giao việc:</strong> {a.assignmentNo}</span>
                <span><strong style={{ color: "var(--ink)" }}>Ngày giao mẫu:</strong> {a.deliveryDate}</span>
                <span><strong style={{ color: "var(--ink)" }}>Người giao mẫu:</strong> {delivererLabel(a)}</span>
              </div>
            ) : null;
          })()}
        </SectionCard>

        <SectionCard title={`Kết quả — mẫu ${maSoMau}`} icon={FlaskConical} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>STT</th><th>Chỉ tiêu</th><th>Phương pháp phân tích</th><th>Kết quả</th><th>Đơn vị</th><th>QCVN</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {rows.map((b, i) => {
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
                      <td className="mono">{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                      <td className="mono" style={{ fontWeight: 700 }}>{b.result || "—"}</td>
                      <td className="mono">{b.unit}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{b.qcvn || b.limit}</td>
                      <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                    </tr>
                  );
                })}
                {rows.length === 0 && <tr><td colSpan={7} style={{ padding: 16, color: "var(--ink-faint)" }}>Chưa có kết quả cho mẫu này.</td></tr>}
              </tbody>
              </table>
              {rows.length > 0 && rows.every((b) => b.status === "APPROVED_COMPLETED") && (
                <div style={{ marginTop: 10, fontSize: 12.5, padding: "0 16px 12px" }}>
                  <strong style={{ color: "var(--ink)" }}>Mã phiếu kết quả (CoA):</strong>{" "}
                  <SpecimenTag>{genFinalReportCode(rows[0].order)}</SpecimenTag>
                </div>
              )}
              </div>
</SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   6. BÁO CÁO & THỐNG KÊ
   ============================================================ */
const StatFilters = () => (
  <SectionCard title="Bộ lọc thống kê" icon={ListFilter}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 10 }}>
      <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Từ ngày</label><input type="date" className="lims-input" style={{ width: "100%", marginTop: 4 }} defaultValue="2026-07-01" /></div>
      <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Đến ngày</label><input type="date" className="lims-input" style={{ width: "100%", marginTop: 4 }} defaultValue="2026-08-06" /></div>
      <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Phòng ban / Chi nhánh</label>
        <select className="lims-input" style={{ width: "100%", marginTop: 4 }}><option>Tất cả</option><option>Chi nhánh Hà Nội</option><option>Chi nhánh Hòa Bình</option></select>
      </div>
      <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Khách hàng</label>
        <select className="lims-input" style={{ width: "100%", marginTop: 4 }}><option>Tất cả</option>{CUSTOMERS.map((c) => <option key={c.id}>{c.name}</option>)}</select>
      </div>
    </div>
    <div style={{ marginTop: 14 }}><button className="lims-btn lims-btn-primary">Xem thống kê</button></div>
  </SectionCard>
);

const TkKinhDoanhPage = () => (
  <>
    <PageHeader title="Thống kê Đơn hàng & Khách hàng" subtitle="Doanh thu và tỷ trọng theo khách hàng" />
    <PageShell>
      <StatFilters />
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 16 }}>
        <SectionCard title="Số mẫu thực tế / Kế hoạch theo tháng" icon={Gauge}>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <ComposedChart data={CHART_DATA}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#57655D" }} axisLine={{ stroke: "#DCE2D8" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#57655D" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DCE2D8" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="plan" name="Kế hoạch" fill="#CBD8CE" radius={[4, 4, 0, 0]} barSize={26} />
                <Line dataKey="actual" name="Thực tế" stroke="#0F6E5C" strokeWidth={2.5} dot={{ r: 3 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Doanh thu theo khách hàng (triệu đ)" icon={TrendingUp}>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={REVENUE_BY_CUSTOMER} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {REVENUE_BY_CUSTOMER.map((entry, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DCE2D8" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Bảng thống kê chi tiết" icon={FileText} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Tháng</th><th>Khách hàng</th><th>Loại mẫu</th><th>Số mẫu kế hoạch</th><th>Số mẫu thực tế</th><th>Đánh giá</th></tr></thead>
            <tbody>
              {CHART_DATA.map((r) => {
                const ratio = r.actual / r.plan;
                const eval_ = ratio >= 0.95 ? "Đạt" : ratio >= 0.8 ? "Chấp nhận được" : "Chưa đạt";
                const color = ratio >= 0.95 ? "var(--primary-dark)" : ratio >= 0.8 ? "var(--amber)" : "var(--red)";
                return (
                  <tr key={r.month}>
                    <td className="mono">{r.month}/2026</td>
                    <td style={{ color: "var(--ink-soft)" }}>Tổng hợp toàn hệ thống</td>
                    <td>Quan trắc + Mẫu gửi</td>
                    <td className="mono">{r.plan}</td>
                    <td className="mono">{r.actual}</td>
                    <td><span className="badge" style={{ background: "var(--surface-alt)", color }}>{eval_}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);

const TkNangSuatPage = () => (
  <>
    <PageHeader title="Thống kê Năng suất & Tiến độ Lab" subtitle="Số việc giao và hoàn thành theo Kiểm Nghiệm viên" />
    <PageShell>
      <StatFilters />
      <SectionCard title="Năng suất theo Kiểm Nghiệm viên" icon={Gauge}>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <ComposedChart data={TECH_PRODUCTIVITY}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#57655D" }} axisLine={{ stroke: "#DCE2D8" }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#57655D" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DCE2D8" }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="giao" name="Được giao" fill="#CBD8CE" radius={[4, 4, 0, 0]} barSize={30} />
              <Bar dataKey="hoanThanh" name="Hoàn thành" fill="#0F6E5C" radius={[4, 4, 0, 0]} barSize={30} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
      <SectionCard title="Tiến độ theo đơn hàng" icon={ClipboardList} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Đơn hàng</th><th>Khách hàng</th><th>Ngày hẹn trả</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {ORDERS.map((o) => (
                <tr key={o.no}>
                  <td className="mono">{o.no}</td>
                  <td>{o.kh}</td>
                  <td className="mono">{o.ngayTra}</td>
                  <td><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);

const TkKyThuatPage = ({ batches }) => (
  <>
    <PageHeader title="Thống kê Kỹ thuật" subtitle="Mẫu, chỉ tiêu, kết quả theo phương pháp thử" />
    <PageShell>
      <StatFilters />
      <SectionCard title="Số lượt thử theo chỉ tiêu" icon={FlaskConical} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Chỉ tiêu</th><th>Phương pháp</th><th>Số lượt thử</th><th>Số bị từ chối</th><th>Tỷ lệ đạt</th></tr></thead>
            <tbody>
              {INDICATORS.map((ind) => {
                const total = batches.filter((b) => b.indicator === ind.name).length;
                const rejected = batches.filter((b) => b.indicator === ind.name && b.status === "REJECTED").length;
                const rate = total ? Math.round(((total - rejected) / total) * 100) : 100;
                return (
                  <tr key={ind.code}>
                    <td style={{ fontWeight: 600 }}>{ind.name}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{ind.method}</td>
                    <td className="mono">{total}</td>
                    <td className="mono">{rejected}</td>
                    <td><span className="badge" style={{ background: rate >= 90 ? "var(--primary-soft)" : "var(--amber-soft)", color: rate >= 90 ? "var(--primary-dark)" : "var(--amber)" }}>{rate}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);
const HopDongPage = () => (
  <>
    <PageHeader title="Hợp đồng & Tần suất quan trắc" subtitle="Theo dõi chu kỳ quan trắc định kỳ theo từng khách hàng" />
    <PageShell>
      <SectionCard title="Tần suất quan trắc theo khách hàng" icon={CalendarDays}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CUSTOMERS.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 220, fontSize: 12.5, fontWeight: 600, flexShrink: 0 }}>{c.name}</div>
              <div style={{ flex: 1, height: 6, background: "var(--surface-alt)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "35%", background: "var(--primary)", borderRadius: 4 }} />
              </div>
              <span className="badge" style={{ background: "var(--blue-soft)", color: "var(--blue)", flexShrink: 0 }}>{c.freq}</span>
              <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-faint)", width: 90, flexShrink: 0, textAlign: "right" }}>{c.nextVisit}</span>
            </div>
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Hợp đồng theo khách hàng" icon={FileText} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Khách hàng</th><th>Số hợp đồng đang hiệu lực</th><th>Tần suất</th><th>Lịch quan trắc tiếp theo</th></tr></thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{CONTRACTS.filter((k) => k.customerId === c.id).length}</td>
                  <td>{c.freq}</td>
                  <td className="mono">{c.nextVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);
const TkNenMauPage = ({ batches }) => {
  const matrixColors = { "Nước mặt": "#3E6EA6", "Nước ngầm": "#0F6E5C", "Nước sạch": "#6957A8", "Nước thải": "#BD432E", "Không khí xung quanh": "#B8792A", "Khí thải": "#8A968D", "Đất": "#57655D" };

  // Tổng hợp số lượng chỉ tiêu được phân tích / số lượng mẫu (theo toàn bộ batches hiện có)
  const uniqueSamples = new Set(batches.map((b) => b.kyHieu || b.sample));
  const totalSamples = uniqueSamples.size;
  const totalIndicators = batches.length;
  const ratio = totalSamples ? (totalIndicators / totalSamples).toFixed(2) : "0";

  return (
    <>
      <PageHeader title="Thống kê theo Nền mẫu" subtitle="Số mẫu theo từng nền mẫu theo tháng và tỷ lệ chỉ tiêu/mẫu" />
      <PageShell>
        <StatFilters />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          <div style={{ background: "var(--primary-soft)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "var(--primary-dark)" }}>{totalSamples}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>Tổng số mẫu</div>
          </div>
          <div style={{ background: "var(--blue-soft)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "var(--blue)" }}>{totalIndicators}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>Tổng số chỉ tiêu đã phân tích</div>
          </div>
          <div style={{ background: "var(--amber-soft)", borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: "var(--amber)" }}>{ratio}</div>
            <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 4 }}>Chỉ tiêu / mẫu (trung bình)</div>
          </div>
        </div>

        <SectionCard title="Số mẫu theo nền mẫu — theo tháng" icon={Layers}>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <ComposedChart data={SAMPLES_BY_MATRIX_MONTH}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#57655D" }} axisLine={{ stroke: "#DCE2D8" }} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#57655D" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #DCE2D8" }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {Object.keys(matrixColors).map((k) => (
                  <Bar key={k} dataKey={k} stackId="a" fill={matrixColors[k]} />
                ))}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Bảng chi tiết theo tháng" icon={FileText} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Tháng</th>{Object.keys(matrixColors).map((k) => <th key={k}>{k}</th>)}<th>Tổng</th></tr>
              </thead>
              <tbody>
                {SAMPLES_BY_MATRIX_MONTH.map((r) => {
                  const total = Object.keys(matrixColors).reduce((s, k) => s + (r[k] || 0), 0);
                  return (
                    <tr key={r.month}>
                      <td className="mono">{r.month}/2026</td>
                      {Object.keys(matrixColors).map((k) => <td key={k} className="mono">{r[k] || 0}</td>)}
                      <td className="mono" style={{ fontWeight: 700 }}>{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};
/* ============================================================
   7. CẤU HÌNH & HỆ THỐNG
   ============================================================ */
const DanhMucAPage = () => (
  <>
    <PageHeader title="Danh mục Chỉ tiêu" subtitle="Sản phẩm, chỉ tiêu, phương pháp, LOD, đơn giá & phân công mặc định" />
    <PageShell>
      <SectionCard title="Danh mục chỉ tiêu" icon={FlaskConical} style={{ padding: 0 }}>
        <Toolbar search="" setSearch={() => {}} placeholder="Tìm chỉ tiêu..." onAdd={() => {}} addLabel="Thêm chỉ tiêu" />
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead>
              <tr>
                <th>Mã chỉ tiêu</th>
                <th>Tên chỉ tiêu</th>
                <th>Phương pháp thử</th>
                <th>Đơn vị</th>
                <th>LOD</th>
                <th>Ngưỡng</th>
                <th>Thực hiện bởi</th>
                <th>Đơn giá</th>
                <th>Giá nhà thầu phụ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {INDICATORS.map((i) => (
                <tr key={i.code}>
                  <td><SpecimenTag>{i.code}</SpecimenTag></td>
                  <td style={{ fontWeight: 600 }}>{i.name}</td>
                  <td style={{ color: "var(--ink-soft)" }}>{i.method}</td>
                  <td className="mono">{i.unit}</td>
                  <td className="mono">{i.lod}</td>
                  <td className="mono">{i.limit}</td>
                  <td>
                    {i.isSubcontract ? (
                      <span className="badge" style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #ffedd5" }}>
                        🏢 {i.assignee}
                      </span>
                    ) : (
                      <span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>
                        👤 {i.assignee}
                      </span>
                    )}
                  </td>
                  <td className="mono">{i.price.toLocaleString("vi-VN")} đ</td>
                    <td className="mono" style={{ color: "var(--amber)" }}>
                      {i.isSubcontract && i.subPrices?.[i.assignee]
                        ? `${i.subPrices[i.assignee].toLocaleString("vi-VN")} đ`
                        : "—"}
                    </td>
                  <td><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);

const LoaiMauPage = ({ canEdit }) => {
  const [types, setTypes] = useState(SAMPLE_TYPE_DEFS);
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', data}

  const save = (form) => {
    setTypes((ts) => modal.mode === "edit"
      ? ts.map((t) => (t.code === modal.data.code ? form : t))
      : [...ts, form]);
    setModal(null);
  };
  const remove = (code) => setTypes((ts) => ts.filter((t) => t.code !== code));

  return (
    <>
      <PageHeader title="Quản lý Loại mẫu" subtitle="Danh mục nền mẫu dùng chung cho Báo giá, Phiếu YCKN, Danh mục chỉ tiêu" />
      <PageShell>
        <SectionCard title="Danh sách loại mẫu" icon={FlaskConical} style={{ padding: 0 }}>
          <Toolbar search="" setSearch={() => {}} placeholder="Tìm loại mẫu..."
            onAdd={canEdit ? () => setModal({ mode: "add" }) : undefined} addLabel="Thêm loại mẫu" />
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Mã viết tắt</th><th>Tên loại mẫu</th><th></th></tr></thead>
              <tbody>
                {types.map((t) => (
                  <tr key={t.code}>
                    <td><SpecimenTag>{t.code}</SpecimenTag></td>
                    <td style={{ fontWeight: 600 }}>{t.name}</td>
                    <td>
                      {canEdit && (
                        <RowActions
                          onEdit={() => setModal({ mode: "edit", data: t })}
                          onDelete={() => remove(t.code)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>

      {modal && (
        <Modal title={modal.mode === "edit" ? "Sửa loại mẫu" : "Thêm loại mẫu"} onClose={() => setModal(null)} width={360}>
          <LoaiMauForm initial={modal.data} onSave={save} onCancel={() => setModal(null)} />
        </Modal>
      )}
    </>
  );
};

const LoaiMauForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(initial || { code: "", name: "" });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div>
        <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Mã viết tắt (VD: NT, KK)</label>
        <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} />
      </div>
      <div>
        <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tên loại mẫu</label>
        <input className="lims-input" style={{ width: "100%", marginTop: 4 }} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8 }}>
        <button className="lims-btn lims-btn-ghost" onClick={onCancel}>Hủy</button>
        <button className="lims-btn lims-btn-primary" disabled={!form.code || !form.name} onClick={() => onSave(form)}>Lưu</button>
      </div>
    </div>
  );
};

const NhaThauPhuPage = () => (
  <>
    <PageHeader title="Nhà thầu phụ" subtitle="Quản lý thông tin các đơn vị kiểm nghiệm liên kết & đẩy mẫu ngoài" />
    <PageShell>
      <SectionCard title="Danh sách đối tác kiểm nghiệm" icon={Building2} style={{ padding: 0 }}>
        <Toolbar search="" setSearch={() => {}} placeholder="Tìm nhà thầu..." onAdd={() => {}} addLabel="Thêm nhà thầu" />
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead>
              <tr>
                <th>Mã NTP</th>
                <th>Tên đơn vị nhà thầu</th>
                <th>Số điện thoại / Liên hệ</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {SUBCONTRACTORS.map((sub) => (
                <tr key={sub.id}>
                  <td><SpecimenTag>{sub.id}</SpecimenTag></td>
                  <td style={{ fontWeight: 600 }}>{sub.name}</td>
                  <td className="mono">{sub.contact}</td>
                  <td style={{ color: "var(--ink-soft)" }}>{sub.address}</td>
                  <td>
                    <span
                      className="badge"
                      style={{
                        background: sub.status === "Đang hợp tác" ? "var(--primary-soft)" : "var(--red-soft)",
                        color: sub.status === "Đang hợp tác" ? "var(--primary-dark)" : "var(--red)",
                      }}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);


const emptyUserForm = { name: "", role: "A", status: "Đang hoạt động" };

const UserFormModal = ({ initial, onClose, onSave }) => {
  const [form, setForm] = useState(initial || emptyUserForm);
  const isEdit = !!initial;
  return (
    <Modal title={isEdit ? "Chỉnh sửa tài khoản" : "Thêm tài khoản mới"} onClose={onClose} width={420}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tên nhân viên</label>
          <input className="lims-input" style={{ width: "100%", marginTop: 4 }}
            value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Vai trò</label>
          <select className="lims-input" style={{ width: "100%", marginTop: 4 }}
            value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            {ROLES.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-soft)" }}>Trạng thái</label>
          <select className="lims-input" style={{ width: "100%", marginTop: 4 }}
            value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
            <option>Đang hoạt động</option>
            <option>Tạm khóa</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 18 }}>
        <button className="lims-btn lims-btn-ghost" onClick={onClose}>Hủy</button>
        <button className="lims-btn lims-btn-primary" disabled={!form.name.trim()} onClick={() => onSave(form)}>
          {isEdit ? "Lưu thay đổi" : "Thêm tài khoản"}
        </button>
      </div>
    </Modal>
  );
};

const NguoiDungPage = ({ role }) => {
  const canEdit = role === "C";
  const [users, setUsers] = useState([
    { name: "Acc Quản lý", role: "B", status: "Đang hoạt động" },
    { name: "Acc KNV 1", role: "A", status: "Đang hoạt động" },
    { name: "Acc KNV 2", role: "A", status: "Đang hoạt động" },
    { name: "Acc KNV 3", role: "A", status: "Đang hoạt động" },
    { name: "Acc Trưởng phòng", role: "C", status: "Đang hoạt động" },
  ]);
  const [modal, setModal] = useState(null); // {mode:'add'|'edit', data}

  const roleLabel = (key) => ROLES.find((r) => r.key === key)?.label || key;

  const saveUser = (form) => {
    setUsers((us) =>
      modal?.mode === "edit"
        ? us.map((u) => (u.name === modal.data.name ? form : u))
        : [...us, form]
    );
    setModal(null);
  };
  const removeUser = (name) => setUsers((us) => us.filter((u) => u.name !== name));

  return (
    <>
      <PageHeader title="Người dùng & Phòng ban" subtitle="Tài khoản nhân viên, vai trò truy cập và cơ cấu chi nhánh" />
      <PageShell>
        <SectionCard title="Tài khoản nhân viên" icon={ShieldCheck} style={{ padding: 0 }}
          action={canEdit && (
            <button className="lims-btn lims-btn-primary" onClick={() => setModal({ mode: "add" })}>
              <Plus size={14} /> Thêm tài khoản
            </button>
          )}
        >
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Nhân viên</th><th>Vai trò</th><th>Trạng thái</th>{canEdit && <th style={{ width: 90, textAlign: "right" }}>Thao tác</th>}</tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.name}>
                    <td style={{ fontWeight: 600 }}>{u.name}</td>
                    <td>{roleLabel(u.role)}</td>
                    <td>
                      <span className="badge" style={{
                        background: u.status === "Đang hoạt động" ? "var(--primary-soft)" : "var(--red-soft)",
                        color: u.status === "Đang hoạt động" ? "var(--primary-dark)" : "var(--red)",
                      }}>
                        {u.status}
                      </span>
                    </td>
                    {canEdit && (
                      <td style={{ textAlign: "right" }}>
                        <RowActions
                          onEdit={() => setModal({ mode: "edit", data: u })}
                          onDelete={() => removeUser(u.name)}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
        <SectionCard title="Chi nhánh / Phòng ban" icon={Building2}>
          <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>
            Chi nhánh Hà Nội (Trụ sở chính) · Chi nhánh Hòa Bình · Chi nhánh Long An
          </div>
        </SectionCard>
      </PageShell>

      {modal && (
        <UserFormModal
          initial={modal.mode === "edit" ? modal.data : null}
          onClose={() => setModal(null)}
          onSave={saveUser}
        />
      )}
    </>
  );
};

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("banLamViec");
  const [role, setRole] = useState("B");
  const [batches, setBatches] = useState(BATCHES);
  const [manualOrders, setManualOrders] = useState([]);
  const [manualRequests, setManualRequests] = useState({});
  const [manualYckn, setManualYckn] = useState({});
  const [manualAssignments, setManualAssignments] = useState({});

  const allOrders = [...ORDERS, ...manualOrders];
  const allTestRequests = { ...TEST_REQUESTS, ...manualRequests };
  const allYcknCode = { ...YCKN_CODE, ...manualYckn };
  const allWorkAssignments = { ...WORK_ASSIGNMENTS, ...manualAssignments };

  if (!loggedIn) return <LoginScreen onLogin={(r) => { setRole(r); setLoggedIn(true); }} />;

  const effectivePage = canAccess(page, role) ? page : firstAllowedPage(role);

  const pages = {
    banLamViec: <BanLamViecPage setPage={setPage} />,
    tongQuanLab: <TongQuanLabPage />,
    khachHang: <KhachHangPage role={role} canEdit={canEditData(role, "khachHang")} />,
baoGia: <BaoGiaPage role={role} setPage={setPage} canEdit={canEditData(role, "baoGia")} />,
    hopDong: <HopDongPage />,
    TaoPhieuYCKN: (
  <TaoPhieuYCKNPage
    role={role} setPage={setPage} canEdit={canEditData(role, "TaoPhieuYCKN")}
        manualOrders={manualOrders} setManualOrders={setManualOrders}
        manualRequests={manualRequests} setManualRequests={setManualRequests}
        manualYckn={manualYckn} setManualYckn={setManualYckn}
        manualAssignments={manualAssignments} setManualAssignments={setManualAssignments}
        allOrders={allOrders} allTestRequests={allTestRequests} allYcknCode={allYcknCode}
      />
    ),
    yeuCauTN: <YeuCauThuNghiemPage allOrders={allOrders} allTestRequests={allTestRequests} allYcknCode={allYcknCode} />,
    phanCong: <PhanCongPage role={role} canEdit={canEditData(role, "phanCong")}  allOrders={allOrders} allTestRequests={allTestRequests} allYcknCode={allYcknCode} allWorkAssignments={allWorkAssignments} />,
meThuNghiem: <MeThuNghiemPage batches={batches} allYcknCode={allYcknCode} allTestRequests={allTestRequests} allWorkAssignments={allWorkAssignments} />,    nhapKQ: <NhapKetQuaPage role={role} batches={batches} setBatches={setBatches} />,
    tongHopPhieu: <TongHopPhieuPage batches={batches} setBatches={setBatches} />,
    duyetPhieu: <DuyetPhieuPage role={role} batches={batches} setBatches={setBatches} />,
    ketQuaThuNghiem: <KetQuaThuNghiemPage batches={batches} allWorkAssignments={allWorkAssignments} />,
    tkKinhDoanh: <TkKinhDoanhPage />,
    tkNangSuat: <TkNangSuatPage />,
    tkKyThuat: <TkKyThuatPage batches={batches} />,
    tkNenMau: <TkNenMauPage batches={batches} />,
    danhMucA: <DanhMucAPage />,
    loaiMau: <LoaiMauPage canEdit={canEditData(role, "loaiMau")} />,
    nhaThauPhu: <NhaThauPhuPage />,
    nguoiDung: <NguoiDungPage role={role} />,
  };

  return (
    <div className="lims-root" style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Header page={effectivePage} setPage={setPage} onLogout={() => setLoggedIn(false)} role={role} />
      {pages[effectivePage]}
    </div>
  );
}