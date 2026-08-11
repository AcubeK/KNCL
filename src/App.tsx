import React, { useState, useMemo } from "react";
import {
  Home, Users, ClipboardList, HelpCircle, BarChart3, Settings, FlaskConical,
  Search, Download, Plus, Bell, ChevronRight, ChevronDown, X, Clock,
  AlertTriangle, CheckCircle2, XCircle, LogOut, Phone, MapPin, FileText,
  Eye, Pencil, Trash2, Gauge, Wrench, ShieldCheck, Building2, ListFilter,
  CalendarDays, ArrowUpRight, UserCircle2, Lock, Mail, QrCode, Printer,
  FileCheck2, PenLine, PackageCheck, Split, Paperclip, ScanLine, TrendingUp,
  ClipboardCheck, ArrowRightLeft
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

const SAMPLE_TYPES = ["Nước mặt", "Nước ngầm", "Nước sạch", "Nước thải", "Không khí xung quanh", "Khí thải", "Đất"];

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
    price: 1200000,
    assignee: "Trung tâm Kiểm nghiệm Eurofins",
    isSubcontract: true,
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
  { sample: "SAM-202608-001", kyHieu: "260805.01/01", order: "DH-2608-001", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 1", thietBi: "Máy đo COD - COD-01", status: "TESTING", result: "", note: "" },
  { sample: "SAM-202608-001", kyHieu: "260805.01/01", order: "DH-2608-001", indicator: "BOD5", method: "TCVN 6001-1:2008", lodloq: "2 mg/L", unit: "mg/L", limit: "≤ 50", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 2", thietBi: "Tủ ấm BOD - BOD-02", status: "PENDING_APPROVAL", result: "38", note: "Đạt" },
  { sample: "SAM-202608-001", kyHieu: "260805.01/02", order: "DH-2608-001", indicator: "pH", method: "TCVN 6492:2011", lodloq: "-", unit: "-", limit: "5.5 - 9", qcvn: "QCVN 40:2011/BTNMT", tech: "Acc KNV 2", thietBi: "Máy đo pH cầm tay", status: "APPROVED_COMPLETED", result: "7.2", note: "" },
  { sample: "SAM-202608-003", kyHieu: "260801.01/01", order: "DH-2608-003", indicator: "Tổng Nitơ", method: "TCVN 6638:2000", lodloq: "0.5 mg/L", unit: "mg/L", limit: "≤ 40", qcvn: "QCVN 19:2009/BTNMT", tech: "Acc Trưởng phòng", thietBi: "Máy phân tích N - N-01", status: "APPROVED_COMPLETED", result: "22", note: "" },
  { sample: "SAM-202608-006", kyHieu: "260730.01/01", order: "DH-2608-006", indicator: "Kim loại nặng (Pb)", method: "SMEWW 3111B", lodloq: "0.01 mg/L", unit: "mg/L", limit: "≤ 0.5", qcvn: "QCVN 05:2023/BTNMT", tech: "Acc KNV 1", thietBi: "Máy AAS", status: "REJECTED", result: "0.61", note: "Vượt ngưỡng, đề nghị làm lại" },
  { sample: "SAM-202608-006", kyHieu: "260730.01/02", order: "DH-2608-006", indicator: "Coliform tổng số", method: "TCVN 6187-2:1996", lodloq: "3 MPN/100mL", unit: "MPN/100mL", limit: "≤ 5000", qcvn: "QCVN 08:2023/BTNMT", tech: "Acc KNV 2", thietBi: "Tủ ủ vi sinh", status: "ASSIGNED", result: "", note: "" },
  { sample: "SAM-202608-008", kyHieu: "260810.01/01", order: "DH-2608-008", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", qcvn: "QCVN 08:2023/BTNMT", tech: "Acc KNV 3", thietBi: "Máy đo COD - COD-01", status: "ASSIGNED", result: "", note: "" },
];
const BATCH_STATUS = {
  ASSIGNED: { label: "Đã phân công", bg: "var(--blue-soft)", fg: "var(--blue)" },
  TESTING: { label: "Đang thử nghiệm", bg: "var(--amber-soft)", fg: "var(--amber)" },
  PENDING_APPROVAL: { label: "Chờ duyệt", bg: "var(--violet-soft)", fg: "var(--violet)" },
  REJECTED: { label: "Yêu cầu làm lại", bg: "var(--red-soft)", fg: "var(--red)" },
  APPROVED_COMPLETED: { label: "Đã duyệt", bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
};
const TECHNICIANS = ["Acc KNV 1", "Acc KNV 2", "Acc KNV 3", "Acc Trưởng phòng"];
const ROLES = [
  { key: "A", label: "Kiểm nghiệm viên", name: "Acc KNV 1", icon: FlaskConical },
  { key: "B", label: "Quản lý / Kinh doanh", name: "Acc Admin", icon: Users },
  { key: "C", label: "Lãnh đạo / Duyệt", name: "Acc Trưởng phòng", icon: ShieldCheck },
];
const EQUIPMENT_LIST = ["Máy đo COD - COD-01", "Tủ ấm BOD - BOD-02", "Máy đo pH cầm tay", "Máy phân tích N - N-01", "Máy AAS", "Tủ ủ vi sinh"];

const QUOTES = [
  { code: "BG-0088", kh: "Công ty CP Giấy Bãi Bằng", ngay: "28/07/2026", freq: "3 tháng / lần", items: [
    { code: "IND-01", sampleType: "Nước thải", qty: 2 },
    { code: "IND-02", sampleType: "Nước thải", qty: 2 },
  ], status: "Đã chuyển đơn hàng" },
  { code: "BG-0089", kh: "Bệnh viện Đa khoa Tỉnh Bắc Giang", ngay: "02/08/2026", freq: "Hàng năm", items: [
    { code: "IND-01", sampleType: "Nước sạch", qty: 1 },
    { code: "IND-05", sampleType: "Nước sạch", qty: 1 },
  ], status: "Đã gửi khách hàng" },
  { code: "BG-0090", kh: "KCN Tân Đức", ngay: "04/08/2026", freq: "Hàng tháng", items: [
    { code: "IND-02", sampleType: "Nước thải", qty: 1 },
    { code: "IND-04", sampleType: "Nước thải", qty: 1 },
  ], status: "Nháp" },
];

// Yêu cầu thử nghiệm — sinh ra sau khi báo giá được chuyển thành đơn hàng
// Mỗi đơn hàng có nhiều "Mục" (nhóm theo loại mẫu), mỗi Mục có nhiều mẫu
const TEST_REQUESTS = {
  "DH-2608-001": {
    kh: "Công ty CP Giấy Bãi Bằng",
    groups: [
      {
        title: "Mục I: Nước thải",
        type: "Nước thải",
        samples: [
          { stt: 1, ten: "Nước thải đầu ra hố ga số 1", luong: "2 lít", tinhTrang: "Đạt yêu cầu", chiTieu: ["pH trong nước", "COD (Nhu cầu Oxi Hóa học)"] },
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
const EQUIPMENT_OVERDUE = [
  { name: "Máy quang phổ hấp thụ nguyên tử (AAS)", due: "02/08/2026", days: 4 },
  { name: "Tủ ấm BOD", due: "05/08/2026", days: 1 },
];
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
    <button className="lims-btn-icon" onClick={onView} title="Xem"><Eye size={14} /></button>
    <button className="lims-btn-icon" onClick={onEdit} title="Sửa"><Pencil size={14} /></button>
    <button className="lims-btn-icon" onClick={onDelete} title="Xóa"><Trash2 size={14} /></button>
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
              Hệ thống quản lý phòng thí nghiệm — từ báo giá, tiếp nhận mẫu, phân công thử nghiệm đến duyệt & xuất phiếu kết quả.
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
          <div style={{ display: "flex", gap: 8, margin: "6px 0 22px" }}>
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
    key: "kinhDoanh", label: "2. Kinh doanh & Đơn hàng", icon: ClipboardList,
    children: [
      { key: "khachHang", label: "Danh sách Khách hàng" },
      { key: "baoGia", label: "Báo giá → Đơn hàng" },
      { key: "hopDong", label: "Hợp đồng & Tần suất" },
    ],
  },
  {
    key: "tiepNhan", label: "3. Tiếp nhận & Phân công", icon: PackageCheck,
    children: [
      { key: "maHoaMau", label: "Tiếp nhận và Tạo phiếu" },
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
    key: "duyet", label: "5. Duyệt & Báo cáo kết quả", icon: FileCheck2,
    children: [
      { key: "duyetPhieu", label: "Duyệt phiếu kết quả" },
      { key: "ketQuaThuNghiem", label: "Kết quả thử nghiệm" },
    ],
  },
  {
    key: "baoCao", label: "6. Báo cáo & Thống kê", icon: BarChart3,
    children: [
      { key: "tkKinhDoanh", label: "Thống kê Kinh doanh & Khách hàng" },
      { key: "tkNangSuat", label: "Thống kê Năng suất & Tiến độ Lab" },
      { key: "tkKyThuat", label: "Thống kê Kỹ thuật" },
    ],
  },
  {
    key: "heThong", label: "7. Cấu hình & Hệ thống", icon: Settings,
    children: [
      { key: "danhMucA", label: "Danh mục chỉ tiêu" },
      { key: "nhaThauPhu", label: "Nhà thầu phụ" },
      { key: "thietBi", label: "Thiết bị & Hiệu chuẩn" },
      { key: "nguoiDung", label: "Người dùng & Phòng ban" },
    ],
  },
];
const findGroupByChild = (childKey) => NAV_GROUPS.find((g) => g.children.some((c) => c.key === childKey));


/* ============================================================
   HEADER / TWO-TIER NAV
   ============================================================ */
const Header = ({ page, setPage, onLogout, role }) => {
  const visibleGroups = NAV_GROUPS
    .filter((g) => role !== "A" || ["tongQuan", "kinhDoanh", "banKNV", "heThong"].includes(g.key))
    .map((g) => ({
      ...g,
      children: role === "A" && g.key === "heThong"
        ? g.children.filter((c) => ["danhMucA", "nhaThauPhu"].includes(c.key))
        : g.children,
    }));
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
            const active = activeGroup.key === g.key;
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
          </div>
          <button className="lims-btn-icon" style={{ borderColor: "transparent", color: "#CFE6DE" }} onClick={onLogout} title="Đăng xuất"><LogOut size={16} /></button>
        </div>
      </div>
      {activeGroup.children.length > 1 && (
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

              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)", display: "block", marginBottom: 6 }}>
                  Nhân sự Tham gia
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {TECHNICIANS.map((tech, idx) => {
                    const isSelected = selectedTechs.includes(tech);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => toggleTech(tech)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: 16,
                          border: isSelected ? "1.5px solid var(--primary)" : "1px solid var(--line)",
                          background: isSelected ? "var(--primary-soft, #E6F4F1)" : "var(--surface)",
                          color: isSelected ? "var(--primary-dark)" : "var(--ink-soft)",
                          fontSize: 12,
                          fontWeight: isSelected ? 600 : 400,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          transition: "all 0.15s ease"
                        }}
                      >
                        {isSelected ? "✓" : "+"} {tech}
                      </button>
                    );
                  })}
                </div>
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "Đơn hàng đang xử lý", value: ORDERS.filter((o) => !["Hoàn tất", "Hủy"].includes(o.status)).length, color: "var(--primary-dark)", bg: "var(--primary-soft)" },
          { label: "Mẻ chờ duyệt", value: BATCHES.filter((b) => b.status === "PENDING_APPROVAL").length, color: "var(--violet)", bg: "var(--violet-soft)" },
          { label: "Quá hạn (đơn + thiết bị)", value: OVERDUE_ORDERS.length + EQUIPMENT_OVERDUE.length, color: "var(--red)", bg: "var(--red-soft)" },
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
            {EQUIPMENT_OVERDUE.map((e) => (
              <div key={e.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
                <Wrench size={13} color="var(--red)" />
                <span>{e.name} — quá hạn hiệu chuẩn {e.days} ngày</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </PageShell>
  </>
);

/* ============================================================
   2. KINH DOANH & ĐƠN HÀNG — Khách hàng
   ============================================================ */
// Gắn Phiếu YCKN vào đúng 1 hợp đồng cụ thể (demo — 3 hợp đồng có phiếu thực tế)
const CONTRACT_YCKN = {
  "HD-2601-01": ["DH-2608-001"],
  "HD-2602-01": ["DH-2608-003"],
  "HD-2607-01": ["DH-2608-006"],
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

const KhachHangPage = ({ role }) => {
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [search, setSearch] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [freqFilter, setFreqFilter] = useState("");
  const [expandedCustomer, setExpandedCustomer] = useState(null);
  const [expandedContract, setExpandedContract] = useState(null);
  const [formModal, setFormModal] = useState(null); // { mode: "add"|"edit", data }
  const [viewing, setViewing] = useState(null);

  const filtered = useMemo(() => customers.filter((c) =>
    (c.name + c.id + c.contact + c.mst).toLowerCase().includes(search.toLowerCase()) &&
    (!freqFilter || c.freq === freqFilter)
  ), [customers, search, freqFilter]);

  const contractsFor = (customerId) => CONTRACTS.filter((k) => k.customerId === customerId);

  const saveCustomer = (form) => {
    if (formModal.mode === "edit") {
      setCustomers((cs) => cs.map((c) => c.id === formModal.data.id ? { ...c, ...form } : c));
    } else {
      const nextId = `KH-${String(customers.length + 1).padStart(4, "0")}`;
      setCustomers((cs) => [...cs, { id: nextId, ...form }]);
    }
    setFormModal(null);
  };
  const deleteCustomer = (id) => setCustomers((cs) => cs.filter((c) => c.id !== id));

  return (
    <>
      <PageHeader title="Danh sách Khách hàng" subtitle="Hồ sơ khách hàng, hợp đồng và Phiếu YCKN đi kèm" />
      <PageShell>
        <SectionCard title="Danh sách khách hàng" icon={Users} style={{ padding: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
              <Search size={14} color="var(--ink-faint)" style={{ position: "absolute", left: 10, top: 9 }} />
              <input className="lims-input" style={{ width: "100%", paddingLeft: 30 }} placeholder="Tìm theo tên, mã KH, MST, người liên hệ..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <button className="lims-btn lims-btn-ghost" onClick={() => setShowAdvanced((s) => !s)}>
              <ListFilter size={14} /> {showAdvanced ? "Ẩn bộ lọc" : "Bộ lọc nâng cao"}
            </button>
            <div style={{ flex: 1 }} />
            <button className="lims-btn lims-btn-ghost"><Download size={14} /> Xuất Excel</button>
            
            {(role === "B" || role === "A") && (
              <button className="lims-btn lims-btn-primary" onClick={() => setFormModal({ mode: "add" })}>
                <Plus size={14} /> Thêm khách hàng
              </button>
            )}
          </div>
          {showAdvanced && (
            <div style={{ display: "flex", gap: 10, padding: "0 16px 14px", flexWrap: "wrap" }}>
              <select className="lims-input" value={freqFilter} onChange={(e) => setFreqFilter(e.target.value)}>
                <option value="">Tất cả tần suất</option>
                {[...new Set(customers.map((c) => c.freq))].map((f) => <option key={f}>{f}</option>)}
              </select>
              <span style={{ fontSize: 12, color: "var(--ink-faint)", alignSelf: "center" }}>Nhấp vào 1 dòng khách hàng để xem Hợp đồng, nhấp vào Hợp đồng để xem Phiếu YCKN.</span>
            </div>
          )}
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th></th><th>STT</th><th>Mã KH</th><th>Tên khách hàng</th><th>Người đại diện</th><th>SĐT</th><th>Địa điểm</th><th>Hợp đồng</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const custContracts = contractsFor(c.id);
                  const isOpen = expandedCustomer === c.id;
                  return (
                    <React.Fragment key={c.id}>
                      <tr style={{ cursor: "pointer" }} onClick={() => { setExpandedCustomer(isOpen ? null : c.id); setExpandedContract(null); }}>
                        <td>{isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                        <td>{i + 1}</td>
                        <td><SpecimenTag>{c.id}</SpecimenTag></td>
                        <td style={{ fontWeight: 600 }}>{c.name}</td>
                        <td>{c.contact}</td>
                        <td className="mono" style={{ color: "var(--ink-soft)" }}><Phone size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.phone}</td>
                        <td style={{ color: "var(--ink-soft)" }}><MapPin size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.address}</td>
                        <td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>{custContracts.length} hợp đồng</span></td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <RowActions
                            onView={() => setViewing(c)}
                            onEdit={role !== "C" ? () => setFormModal({ mode: "edit", data: c }) : undefined}
                            onDelete={role === "B" ? () => deleteCustomer(c.id) : undefined}
                          />
                        </td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td colSpan={9} style={{ background: "var(--surface-alt)", padding: 0 }}>
                            <div style={{ padding: "10px 16px 10px 40px" }}>
                              {custContracts.length === 0 && <div style={{ fontSize: 12, color: "var(--ink-faint)", padding: 8 }}>Khách hàng chưa có hợp đồng nào.</div>}
                              {custContracts.map((k) => {
                                const yckn = CONTRACT_YCKN[k.id] || [];
                                const contractOpen = expandedContract === k.id;
                                return (
                                  <div key={k.id} style={{ marginBottom: 8 }}>
                                    <div
                                      onClick={() => setExpandedContract(contractOpen ? null : k.id)}
                                      style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "8px 10px", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}
                                    >
                                      {contractOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                      <SpecimenTag>{k.id}</SpecimenTag>
                                      <span style={{ fontSize: 12.5, fontWeight: 600 }}>{k.name}</span>
                                      <span style={{ fontSize: 11.5, color: "var(--ink-faint)", marginLeft: "auto" }}>Ký {k.signed} · {k.freq} · {k.value}</span>
                                    </div>
                                    {contractOpen && (
                                      <div style={{ padding: "8px 8px 4px 24px" }}>
                                        {yckn.length === 0 && <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>Chưa có Phiếu YCKN nào cho hợp đồng này.</div>}
                                        {yckn.map((no) => (
                                          <div key={no} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "5px 0" }}>
                                            <FileText size={12} color="var(--primary)" />
                                            <SpecimenTag>{YCKN_CODE[no]}</SpecimenTag>
                                            <span style={{ color: "var(--ink-soft)" }}>{ORDERS.find((o) => o.no === no)?.name} — {no}</span>
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

      {formModal && (
        <CustomerFormModal
          initial={formModal.mode === "edit" ? formModal.data : null}
          onClose={() => setFormModal(null)}
          onSave={saveCustomer}
        />
      )}
      {viewing && <CustomerDetailModal c={viewing} onClose={() => setViewing(null)} />}
    </>
  );
};

/* ============================================================
   2. KINH DOANH & ĐƠN HÀNG — Báo giá → Đơn hàng
   ============================================================ */
const QUOTER_NAME = "Acc Admin";

const quoteItemsWithData = (items) => items.map((it) => ({ ...it, ind: INDICATORS.find((i) => i.code === it.code) }));
const quoteTotal = (items) => quoteItemsWithData(items).reduce((sum, it) => sum + (it.ind ? it.ind.price * it.qty : 0), 0);

/* Printable "PHIẾU BÁO GIÁ" template — shown when exporting a quote to Excel */
const QuotePrintModal = ({ quote, onClose }) => {
  const [nguoiBaoGia, setNguoiBaoGia] = useState(QUOTER_NAME);
  const items = quoteItemsWithData(quote.items);
  const total = quoteTotal(quote.items);

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
                    <td className="mono">{it.ind ? it.ind.price.toLocaleString("vi-VN") + " đ" : "—"}</td>
                    <td className="mono">{it.ind ? (it.ind.price * it.qty).toLocaleString("vi-VN") + " đ" : "—"}</td>
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

const BaoGiaPage = ({ role, setPage }) => {
  const [quotes, setQuotes] = useState(QUOTES);
  const [customer, setCustomer] = useState(CUSTOMERS[0]?.name || "");
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
  const totalPrice = selectedIndicators.reduce((sum, r) => {
    const ind = INDICATORS.find((i) => i.code === r.indicatorCode);
    return sum + (ind ? ind.price * r.qty : 0);
  }, 0);

  // Tạo báo giá mới từ selectedIndicators
  const createQuote = () => {
    if (!selectedIndicators.length) return;
    const code = `BG-${String(91 + quotes.length - 3).padStart(4, "0")}`;
    
    setQuotes((q) => [
      {
        code,
        kh: customer,
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
    setPage("maHoaMau");
  };

  const filteredQuotes = quotes.filter(
    (q) =>
      (q.code + q.kh).toLowerCase().includes(listSearch.toLowerCase()) &&
      (!statusFilter || q.status === statusFilter)
  );

  return (
    <>
      <PageHeader
        title="Báo giá → Đơn hàng"
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
                onChange={(c) => setCustomer(c.name)}
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
              disabled={role !== "B" || selectedIndicators.length === 0}
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
                    onClick={() => q.status === "Đã chuyển đơn hàng" && setPage("maHoaMau")}
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
                        {q.status !== "Đã chuyển đơn hàng" && role === "B" && (
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
   2. KINH DOANH & ĐƠN HÀNG — Hợp đồng & Tần suất
   ============================================================ */
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

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Tiếp nhận & Mã hóa mẫu
   ============================================================ */
const MaHoaMauPage = () => {
  const [received, setReceived] = useState(() => new Set(Object.keys(TEST_REQUESTS).filter((no) => ORDERS.find((o) => o.no === no)?.status !== "Báo giá")));
  const [expanded, setExpanded] = useState(null);
  const orderNos = Object.keys(TEST_REQUESTS);
  const pending = orderNos.filter((no) => !received.has(no));
  const done = orderNos.filter((no) => received.has(no));

  const createPhieu = (no) => setReceived((prev) => new Set(prev).add(no));

  return (
    <>
      <PageHeader title="Tiếp nhận và Tạo phiếu" subtitle="Tạo Phiếu Yêu cầu Kiểm nghiệm (YCKN) và chia mẫu con từ danh mục chỉ tiêu đã chốt ở Báo giá" />
      <PageShell>
        <SectionCard title="Đơn hàng chờ tiếp nhận" icon={ScanLine} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Đơn hàng</th><th>Tên</th><th>Khách hàng</th><th>Số chỉ tiêu đã chốt</th><th></th></tr></thead>
              <tbody>
                {pending.length === 0 && <tr><td colSpan={5} style={{ color: "var(--ink-faint)", padding: 16 }}>Không có đơn hàng chờ tiếp nhận.</td></tr>}
                {pending.map((no) => {
                  const o = ORDERS.find((x) => x.no === no);
                  const flat = flattenOrderSamples(no);
                  return (
                    <tr key={no}>
                      <td className="mono">{no}</td>
                      <td style={{ fontWeight: 600 }}>{o?.name}</td>
                      <td>{TEST_REQUESTS[no].kh}</td>
                      <td className="mono">{flat.length} mẫu con</td>
                      <td><button className="lims-btn lims-btn-primary" style={{ padding: "5px 10px" }} onClick={() => createPhieu(no)}><FileText size={13} /> Tạo phiếu</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Hợp đồng đã tiếp nhận" icon={PackageCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th></th><th>Mã Phiếu YCKN</th><th>Đơn hàng</th><th>Khách hàng</th><th>Số mẫu con</th></tr></thead>
              <tbody>
                {done.length === 0 && <tr><td colSpan={5} style={{ color: "var(--ink-faint)", padding: 16 }}>Chưa có hợp đồng nào được tạo phiếu.</td></tr>}
                {done.map((no) => {
                  const o = ORDERS.find((x) => x.no === no);
                  const flat = flattenOrderSamples(no);
                  const isOpen = expanded === no;
                  return (
                    <React.Fragment key={no}>
                      <tr style={{ cursor: "pointer" }} onClick={() => setExpanded(isOpen ? null : no)}>
                        <td>{isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                        <td><SpecimenTag>{YCKN_CODE[no]}</SpecimenTag></td>
                        <td className="mono" style={{ color: "var(--ink-soft)" }}>{no}</td>
                        <td style={{ fontWeight: 600 }}>{TEST_REQUESTS[no].kh}</td>
                        <td className="mono">{flat.length}</td>
                      </tr>
                      {isOpen && (
                        <tr>
                          <td colSpan={5} style={{ background: "var(--surface-alt)", padding: 0 }}>
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
    </>
  );
};

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Yêu cầu thử nghiệm
   ============================================================ */
const sampleCodeFor = (orderNo, stt) => `${YCKN_CODE[orderNo] || orderNo}/${String(stt).padStart(2, "0")}`;

const TestRequestPrintModal = ({ orderNo, request, onClose }) => {
  const flat = flattenOrderSamples(orderNo);
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
            <div className="disp" style={{ fontSize: 18, fontWeight: 700, letterSpacing: ".04em" }}>PHIẾU YÊU CẦU KIỂM NGHIỆM</div>
            <SpecimenTag>{YCKN_CODE[orderNo] || orderNo}</SpecimenTag>
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

// Gán số thứ tự toàn cục (dùng để sinh mã mẫu con) cho từng mẫu trong 1 Phiếu YCKN,
// vì các Mục (I, II...) đánh STT riêng nhưng mã mẫu con phải là 1 chuỗi liên tục trong phiếu.
const flattenOrderSamples = (orderNo) => {
  const req = TEST_REQUESTS[orderNo];
  if (!req) return [];
  let seq = 0;
  const out = [];
  req.groups.forEach((g) => {
    g.samples.forEach((s) => {
      seq += 1;
      out.push({ ...s, groupTitle: g.title, groupType: g.type, seq, maSoMau: sampleCodeFor(orderNo, seq) });
    });
  });
  return out;
};

const YeuCauThuNghiemPage = () => {
  const orderNos = Object.keys(TEST_REQUESTS);
  const [orderNo, setOrderNo] = useState(orderNos[0]);
  const [notes, setNotes] = useState({});
  const [printing, setPrinting] = useState(false);
  const request = TEST_REQUESTS[orderNo];
  const order = ORDERS.find((o) => o.no === orderNo);

  const setNote = (key, val) => setNotes((n) => ({ ...n, [key]: val }));

  return (
    <>
      <PageHeader title="Yêu cầu thử nghiệm" subtitle="Phiếu Yêu cầu Kiểm nghiệm (YCKN) — sinh ra sau khi báo giá được chuyển thành đơn hàng" />
      <PageShell>
        <SectionCard title="Chọn đơn hàng" icon={ClipboardList}
          action={<button className="lims-btn lims-btn-primary" onClick={() => setPrinting(true)}><Printer size={14} /> Xuất Phiếu</button>}
        >
          <select className="lims-input" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}>
            {orderNos.map((no) => <option key={no} value={no}>{YCKN_CODE[no]} — {no} — {TEST_REQUESTS[no].kh}</option>)}
          </select>
          {order && <span style={{ marginLeft: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>{order.name}</span>}
        </SectionCard>

        {Object.entries(flattenOrderSamples(orderNo).reduce((acc, s) => {
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
      {printing && <TestRequestPrintModal orderNo={orderNo} request={request} onClose={() => setPrinting(false)} />}
    </>
  );
};

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Giao việc
   ============================================================ */
// Toàn bộ danh sách người có thể được giao việc (KNV nội bộ + nhà thầu phụ)
const ALL_ASSIGNEES = [...TECHNICIANS, ...SUBCONTRACTORS.map((s) => s.name)];

const PhanCongPage = ({ role }) => {
  const orderNos = Object.keys(TEST_REQUESTS);
  const [orderNo, setOrderNo] = useState(orderNos[0]);
  const flat = useMemo(() => flattenOrderSamples(orderNo), [orderNo]);
  const [assignees, setAssignees] = useState({});
  const [notes, setNotes] = useState({});
  const order = ORDERS.find((o) => o.no === orderNo);
  const nguoiGiaoViec = ROLES.find((r) => r.key === "B").name; // Người giao việc = User B (Quản lý/Kinh doanh)

  const defaultAssignee = (s) => findIndicatorByName(s.chiTieu[0])?.assignee || TECHNICIANS[0];
  const assigneeFor = (s) => assignees[s.maSoMau] || defaultAssignee(s);
  const setAssignee = (maSoMau, person) => setAssignees((a) => ({ ...a, [maSoMau]: person }));
  const setNote = (maSoMau, val) => setNotes((n) => ({ ...n, [maSoMau]: val }));

  return (
    <>
      <PageHeader title="Giao việc" subtitle="Giao từng mẫu con cho kiểm nghiệm viên — mặc định lấy theo Danh mục Chỉ tiêu, có thể đổi người" />
      <PageShell>
        <SectionCard title="Chọn hợp đồng / Phiếu YCKN" icon={ClipboardList}>
          <select className="lims-input" value={orderNo} onChange={(e) => setOrderNo(e.target.value)}>
            {orderNos.map((no) => <option key={no} value={no}>{YCKN_CODE[no]} — {no} — {TEST_REQUESTS[no].kh}</option>)}
          </select>
          {order && <span style={{ marginLeft: 12, fontSize: 12.5, color: "var(--ink-soft)" }}>{order.name}</span>}
          <span style={{ marginLeft: 12, fontSize: 12, color: "var(--ink-faint)" }}>Người giao việc: <strong style={{ color: "var(--ink)" }}>{nguoiGiaoViec}</strong></span>
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
                      <td><SpecimenTag>{YCKN_CODE[orderNo]}</SpecimenTag></td>
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
                        <select className="lims-input" style={{ fontSize: 12, padding: "4px 8px" }} value={current} onChange={(e) => setAssignee(s.maSoMau, e.target.value)}>
                          {ALL_ASSIGNEES.map((p) => <option key={p}>{p}</option>)}
                        </select>
                        <div style={{ fontSize: 10.5, color: "var(--ink-faint)", marginTop: 3 }}>
                          {isDefault ? "Mặc định theo Danh mục Chỉ tiêu" : "Đã chuyển người khác"}
                          {ind0?.isSubcontract && " · Nhà thầu phụ"}
                        </div>
                      </td>
                      <td><input className="lims-input" style={{ width: 140, fontSize: 12 }} placeholder="Ghi chú" value={notes[s.maSoMau] || ""} onChange={(e) => setNote(s.maSoMau, e.target.value)} /></td>
                      <td style={{ fontSize: 12, color: "var(--ink-soft)" }}>{nguoiGiaoViec}</td>
                    </tr>
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

const MeThuNghiemPage = () => {
  const groupedByPhieu = Object.keys(YCKN_CODE).map((orderNo) => ({
    orderNo,
    phieu: YCKN_CODE[orderNo],
    kh: TEST_REQUESTS[orderNo]?.kh,
    items: BATCHES.filter((b) => b.order === orderNo),
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
                  style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: isOpen ? "var(--surface-alt)" : "var(--surface)" }}
                >
                  {isOpen ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                  <SpecimenTag>{g.phieu}</SpecimenTag>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{g.kh}</span>
                  <span className="mono" style={{ fontSize: 11.5, color: "var(--ink-faint)" }}>{g.orderNo}</span>
                  <span className="badge" style={{ background: "var(--surface-alt)", color: "var(--ink-soft)", marginLeft: "auto" }}>{g.items.length} chỉ tiêu</span>
                </div>
                {isOpen && (
                  <div className="lims-scroll" style={{ overflowX: "auto", borderTop: "1px solid var(--line)" }}>
                    <table className="lims-table">
                      <thead>
                        <tr>
                          <th>Mã mẫu con</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>Kiểm Nghiệm viên</th><th>Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody>
                        {g.items.map((b, i) => {
                          const st = BATCH_STATUS[b.status];
                          return (
                            <tr key={i}>
                              <td><SpecimenTag>{b.kyHieu || b.sample}</SpecimenTag></td>
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
                {BATCHES.map((b, i) => {
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

const NhapKetQuaPage = ({ role }) => {
  const myName = ROLES.find((r) => r.key === "A").name;
  const editable = BATCHES.filter((b) => ["ASSIGNED", "TESTING", "REJECTED"].includes(b.status) && (role !== "A" || b.tech === myName));
  const [rows, setRows] = useState(editable.map((b) => ({ ...b })));
  const submitForApproval = () => {
  setRows((r) => r.map((row) => row.result ? { ...row, status: "PENDING_APPROVAL" } : row));
};

  const update = (i, field, value) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, [field]: value } : row));

  return (
    <>
      <PageHeader title="Nhập kết quả thử nghiệm" subtitle={role === "A" ? `Chỉ hiển thị công việc được giao cho ${myName}` : "Bulk Entry dạng Excel — cảnh báo tự động nếu vượt ngưỡng hoặc dưới LOD"} />
      <PageShell>
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
                {rows.map((b, i) => {
                  const ev = evaluateResult(b);
                  return (
                    <tr key={i}>
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
                          onChange={(e) => update(i, "result", e.target.value)}
                          placeholder="—"
                        />
                        {ev === "bad" && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--red)", marginTop: 3 }}><AlertTriangle size={11} /> Vượt ngưỡng {b.limit}</div>}
                        {ev === "warn" && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--amber)", marginTop: 3 }}><AlertTriangle size={11} /> Dưới LOD</div>}
                      </td>
                      <td><input className="lims-input" style={{ width: 140 }} value={b.note} onChange={(e) => update(i, "note", e.target.value)} placeholder="Ghi chú" /></td>
                      <td><button className="lims-btn-icon" title="Đính kèm file"><Paperclip size={14} /></button></td>
                    </tr>
                  );
                })}
                {rows.length === 0 && <tr><td colSpan={8} style={{ padding: 16, color: "var(--ink-faint)" }}>Không có chỉ tiêu nào đang chờ nhập kết quả.</td></tr>}
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
   5. DUYỆT & BÁO CÁO KẾT QUẢ — Duyệt phiếu kết quả
   ============================================================ */
const DuyetPhieuPage = ({ role }) => {
  const [rows, setRows] = useState(BATCHES.filter((b) => b.status === "PENDING_APPROVAL").map((b) => ({ ...b })));
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");
  const canApprove = role === "C";

  const approve = (i) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, status: "APPROVED_COMPLETED" } : row));
  const openReject = (i) => { setRejecting(i); setReason(""); };
  const confirmReject = () => {
    if (!reason.trim()) return;
    setRows((r) => r.map((row, idx) => idx === rejecting ? { ...row, status: "REJECTED", note: reason } : row));
    setRejecting(null);
  };

  return (
    <>
      <PageHeader title="Duyệt phiếu kết quả" subtitle={canApprove ? "So sánh kết quả KNV với QCVN trước khi ký số" : "Chỉ vai trò Lãnh đạo mới có quyền Duyệt / Từ chối — bạn đang xem ở chế độ chỉ đọc"} />
      <PageShell>
        <SectionCard title="Hàng chờ duyệt" icon={ClipboardCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Mẫu</th><th>Chỉ tiêu</th><th>Kết quả KNV</th><th>QCVN</th><th>Đánh giá</th><th>KNV thực hiện</th><th>Trạng thái</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((b, i) => {
                  const ev = evaluateResult(b);
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
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
                        {b.status === "PENDING_APPROVAL" && canApprove && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="lims-btn lims-btn-primary" style={{ padding: "5px 9px" }} onClick={() => approve(i)}><PenLine size={13} /> Duyệt & Ký số</button>
                            <button className="lims-btn lims-btn-danger" style={{ padding: "5px 9px" }} onClick={() => openReject(i)}><XCircle size={13} /> Từ chối</button>
                          </div>
                        )}
                        {b.status === "PENDING_APPROVAL" && !canApprove && <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>Chờ Lãnh đạo duyệt</span>}
                        {b.status === "APPROVED_COMPLETED" && <span style={{ fontSize: 12, color: "var(--primary-dark)", fontWeight: 600 }}>Đã sinh CoA</span>}
                        {b.status === "REJECTED" && <span style={{ fontSize: 12, color: "var(--red)" }}>Đã đẩy về KNV</span>}
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && <tr><td colSpan={8} style={{ padding: 16, color: "var(--ink-faint)" }}>Không còn phiếu nào chờ duyệt.</td></tr>}
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
const KetQuaThuNghiemPage = () => {
  const samples = [...new Set(BATCHES.map((b) => b.kyHieu))];
  const [maSoMau, setMaSoMau] = useState(samples[0]);
  const rows = BATCHES.filter((b) => b.kyHieu === maSoMau);
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
        </SectionCard>

        <SectionCard title={`Kết quả — mẫu ${maSoMau}`} icon={FlaskConical} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>STT</th><th>Chỉ tiêu</th><th>Phương pháp phân tích</th><th>Kết quả</th><th>Đơn vị</th><th>QCVN</th></tr></thead>
              <tbody>
                {rows.map((b, i) => (
                  <tr key={i}>
                    <td className="mono">{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                    <td className="mono" style={{ fontWeight: 700 }}>{b.result || "—"}</td>
                    <td className="mono">{b.unit}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{b.qcvn || b.limit}</td>
                  </tr>
                ))}
                {rows.length === 0 && <tr><td colSpan={6} style={{ padding: 16, color: "var(--ink-faint)" }}>Chưa có kết quả cho mẫu này.</td></tr>}
              </tbody>
            </table>
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
    <PageHeader title="Thống kê Kinh doanh & Khách hàng" subtitle="Doanh thu và tỷ trọng theo khách hàng" />
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

const TkKyThuatPage = () => (
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
                const total = BATCHES.filter((b) => b.indicator === ind.name).length;
                const rejected = BATCHES.filter((b) => b.indicator === ind.name && b.status === "REJECTED").length;
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

const ThietBiPage = () => (
  <>
    <PageHeader title="Thiết bị & Hiệu chuẩn" subtitle="Theo dõi lịch hiệu chuẩn và bảo trì thiết bị phòng Lab" />
    <PageShell>
      <SectionCard title="Danh sách thiết bị" icon={Wrench} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Thiết bị</th><th>Hạn hiệu chuẩn</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {EQUIPMENT_OVERDUE.map((e) => (
                <tr key={e.name}>
                  <td style={{ fontWeight: 600 }}>{e.name}</td>
                  <td className="mono">{e.due}</td>
                  <td><span className="badge" style={{ background: "var(--red-soft)", color: "var(--red)" }}>Quá hạn {e.days} ngày</span></td>
                </tr>
              ))}
              {EQUIPMENT_LIST.slice(2).map((name) => (
                <tr key={name}>
                  <td style={{ fontWeight: 600 }}>{name}</td>
                  <td className="mono">20/09/2026</td>
                  <td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>Còn hạn</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  </>
);

const NguoiDungPage = () => (
  <>
    <PageHeader title="Người dùng & Phòng ban" subtitle="Tài khoản nhân viên, vai trò truy cập và cơ cấu chi nhánh" />
    <PageShell>
      <SectionCard title="Tài khoản nhân viên" icon={ShieldCheck} style={{ padding: 0 }}>
        <div className="lims-scroll" style={{ overflowX: "auto" }}>
          <table className="lims-table">
            <thead><tr><th>Nhân viên</th><th>Vai trò</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {[
                ["Acc Admin", "Quản trị hệ thống"],
                ["Acc KNV 1", "Kiểm Nghiệm viên"],
                ["Acc KNV 2", "Kiểm Nghiệm viên"],
                ["Acc KNV 3", "Kiểm Nghiệm viên"],
                ["Acc Trưởng phòng", "Trưởng phòng Lab"],
              ].map(([n, r]) => (
                <tr key={n}><td style={{ fontWeight: 600 }}>{n}</td><td>{r}</td><td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>Đang hoạt động</span></td></tr>
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
  </>
);

/* ============================================================
   APP ROOT
   ============================================================ */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("banLamViec");
  const [role, setRole] = useState("B");

  if (!loggedIn) return <LoginScreen onLogin={(r) => { setRole(r); setLoggedIn(true); }} />;

  const ALLOWED_PAGES_A = new Set([
    "banLamViec", "tongQuanLab",
    "khachHang", "baoGia", "hopDong",
    "nhapKQ",
    "danhMucA", "nhaThauPhu",
  ]);
  const effectivePage = role === "A" && !ALLOWED_PAGES_A.has(page) ? "banLamViec" : page;

  const pages = {
    banLamViec: <BanLamViecPage setPage={setPage} />,
    tongQuanLab: <TongQuanLabPage />,
    khachHang: <KhachHangPage role={role} />,
    baoGia: <BaoGiaPage role={role} setPage={setPage} />,
    hopDong: <HopDongPage />,
    maHoaMau: <MaHoaMauPage />,
    yeuCauTN: <YeuCauThuNghiemPage />,
    phanCong: <PhanCongPage role={role} />,
    meThuNghiem: <MeThuNghiemPage />,
    nhapKQ: <NhapKetQuaPage role={role} />,
    duyetPhieu: <DuyetPhieuPage role={role} />,
    ketQuaThuNghiem: <KetQuaThuNghiemPage />,
    tkKinhDoanh: <TkKinhDoanhPage />,
    tkNangSuat: <TkNangSuatPage />,
    tkKyThuat: <TkKyThuatPage />,
    danhMucA: <DanhMucAPage />,
    nhaThauPhu: <NhaThauPhuPage />,
    thietBi: <ThietBiPage />,
    nguoiDung: <NguoiDungPage />,
  };

  return (
    <div className="lims-root" style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Header page={effectivePage} setPage={setPage} onLogout={() => setLoggedIn(false)} role={role} />
      {pages[effectivePage]}
    </div>
  );
}