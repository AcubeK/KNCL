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
  { id: "KH-0001", name: "Công ty CP Giấy Bãi Bằng", phone: "0208 3862 114", contact: "Nguyễn Văn Hùng", address: "Phù Ninh, Phú Thọ", contracts: 3, freq: "3 tháng / lần", nextVisit: "18/08/2026" },
  { id: "KH-0002", name: "Nhà máy Nhiệt điện Phả Lại", phone: "0220 3881 227", contact: "Lê Thị Thu", address: "Chí Linh, Hải Dương", contracts: 2, freq: "6 tháng / lần", nextVisit: "02/10/2026" },
  { id: "KH-0003", name: "KCN Tân Đức", phone: "0272 3768 305", contact: "Trần Minh Khoa", address: "Đức Hòa, Long An", contracts: 5, freq: "Hàng tháng", nextVisit: "12/08/2026" },
  { id: "KH-0004", name: "Công ty TNHH Dệt May Hòa Bình", phone: "0218 3852 460", contact: "Phạm Thị Lan", address: "TP. Hòa Bình", contracts: 1, freq: "Hàng quý", nextVisit: "05/09/2026" },
  { id: "KH-0005", name: "UBND Huyện Sóc Sơn", phone: "024 3884 552", contact: "Đỗ Văn Tùng", address: "Sóc Sơn, Hà Nội", contracts: 4, freq: "6 tháng / lần", nextVisit: "20/11/2026" },
  { id: "KH-0006", name: "Công ty CP Nước sạch Sông Đà", phone: "0226 3852 118", contact: "Vũ Thị Hạnh", address: "Kỳ Sơn, Hòa Bình", contracts: 2, freq: "Hàng tháng", nextVisit: "09/08/2026" },
  { id: "KH-0007", name: "Bệnh viện Đa khoa Tỉnh Bắc Giang", phone: "0204 3854 771", contact: "Ngô Văn Sơn", address: "TP. Bắc Giang", contracts: 1, freq: "Hàng năm", nextVisit: "14/01/2027" },
  { id: "KH-0008", name: "Công ty CP Xi măng Bỉm Sơn", phone: "0237 3824 093", contact: "Hoàng Thị Nga", address: "Bỉm Sơn, Thanh Hóa", contracts: 3, freq: "Hàng quý", nextVisit: "27/09/2026" },
];

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

// Dữ liệu Danh mục A (Chỉ tiêu) - Bổ sung field `assignee` & `isSubcontract`
const INDICATORS = [
  {
    code: "IND-01",
    name: "pH trong nước",
    method: "TCVN 6492:2011",
    unit: "-",
    lod: "1-14",
    limit: "5.5 - 9.0",
    price: 150000,
    assignee: "Nguyễn Thị Mai",
    isSubcontract: false,
  },
  {
    code: "IND-02",
    name: "COD (Nhu cầu Oxi Hóa học)",
    method: "SMEWW 5220C:2017",
    unit: "mg/L",
    lod: "2.0 mg/L",
    limit: "≤ 150 mg/L",
    price: 350000,
    assignee: "Trần Văn Long",
    isSubcontract: false,
  },
  {
    code: "IND-03",
    name: "Dư lượng Kháng sinh (Chlortetracycline)",
    method: "HPLC/MS/MS",
    unit: "µg/kg",
    lod: "0.1 µg/kg",
    limit: "KPH",
    price: 1200000,
    assignee: "Trung tâm Kiểm nghiệm Eurofins",
    isSubcontract: true, // Thầu phụ làm
  },
  {
    code: "IND-04",
    name: "Kim loại nặng - Thủy ngân (Hg)",
    method: "US EPA 7473",
    unit: "mg/kg",
    lod: "0.005 mg/kg",
    limit: "≤ 0.05 mg/kg",
    price: 850000,
    assignee: "Trung tâm TƯV 3 (QUATEST 3)",
    isSubcontract: true, // Thầu phụ làm
  },
  {
    code: "IND-05",
    name: "Tổng Coliforms",
    method: "TCVN 6187-1:2019",
    unit: "CFU/100ml",
    lod: "1 CFU/100ml",
    limit: "0 CFU/100ml",
    price: 250000,
    assignee: "Lê Hoàng Nam",
    isSubcontract: false,
  },
];

const BATCHES = [
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", tech: "Nguyễn Thị Mai", thietBi: "Máy đo COD - COD-01", status: "TESTING", result: "", note: "" },
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "BOD5", method: "TCVN 6001-1:2008", lodloq: "2 mg/L", unit: "mg/L", limit: "≤ 50", tech: "Trần Văn Long", thietBi: "Tủ ấm BOD - BOD-02", status: "PENDING_APPROVAL", result: "38", note: "Đạt" },
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "pH", method: "TCVN 6492:2011", lodloq: "-", unit: "-", limit: "5.5 - 9", tech: "Lê Hoàng Nam", thietBi: "Máy đo pH cầm tay", status: "APPROVED_COMPLETED", result: "7.2", note: "" },
  { sample: "SAM-202608-003", order: "DH-2608-003", indicator: "Tổng Nitơ", method: "TCVN 6638:2000", lodloq: "0.5 mg/L", unit: "mg/L", limit: "≤ 40", tech: "Phạm Thu Hường", thietBi: "Máy phân tích N - N-01", status: "APPROVED_COMPLETED", result: "22", note: "" },
  { sample: "SAM-202608-006", order: "DH-2608-006", indicator: "Kim loại nặng (Pb)", method: "SMEWW 3111B", lodloq: "0.01 mg/L", unit: "mg/L", limit: "≤ 0.5", tech: "Nguyễn Thị Mai", thietBi: "Máy AAS", status: "REJECTED", result: "0.61", note: "Vượt ngưỡng, đề nghị làm lại" },
  { sample: "SAM-202608-006", order: "DH-2608-006", indicator: "Coliform tổng số", method: "TCVN 6187-2:1996", lodloq: "3 MPN/100mL", unit: "MPN/100mL", limit: "≤ 5000", tech: "Trần Văn Long", thietBi: "Tủ ủ vi sinh", status: "ASSIGNED", result: "", note: "" },
  { sample: "SAM-202608-008", order: "DH-2608-008", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", unit: "mg/L", limit: "≤ 150", tech: "Lê Hoàng Nam", thietBi: "Máy đo COD - COD-01", status: "ASSIGNED", result: "", note: "" },
];
const BATCH_STATUS = {
  ASSIGNED: { label: "Đã phân công", bg: "var(--blue-soft)", fg: "var(--blue)" },
  TESTING: { label: "Đang thử nghiệm", bg: "var(--amber-soft)", fg: "var(--amber)" },
  PENDING_APPROVAL: { label: "Chờ duyệt", bg: "var(--violet-soft)", fg: "var(--violet)" },
  REJECTED: { label: "Yêu cầu làm lại", bg: "var(--red-soft)", fg: "var(--red)" },
  APPROVED_COMPLETED: { label: "Đã duyệt", bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
};
const TECHNICIANS = ["Nguyễn Thị Mai", "Trần Văn Long", "Lê Hoàng Nam", "Phạm Thu Hường"];
const EQUIPMENT_LIST = ["Máy đo COD - COD-01", "Tủ ấm BOD - BOD-02", "Máy đo pH cầm tay", "Máy phân tích N - N-01", "Máy AAS", "Tủ ủ vi sinh"];

const QUOTES = [
  { code: "BG-0088", kh: "Công ty CP Giấy Bãi Bằng", ngay: "28/07/2026", items: [
    { code: "CT-001", sampleType: "Nước thải", qty: 2 },
    { code: "CT-002", sampleType: "Nước thải", qty: 2 },
    { code: "CT-003", sampleType: "Nước thải", qty: 2 },
  ], status: "Đã chuyển đơn hàng" },
  { code: "BG-0089", kh: "Bệnh viện Đa khoa Tỉnh Bắc Giang", ngay: "02/08/2026", items: [
    { code: "CT-001", sampleType: "Nước sạch", qty: 1 },
    { code: "CT-006", sampleType: "Nước sạch", qty: 1 },
  ], status: "Đã gửi khách hàng" },
  { code: "BG-0090", kh: "KCN Tân Đức", ngay: "04/08/2026", items: [
    { code: "CT-002", sampleType: "Nước thải", qty: 1 },
    { code: "CT-004", sampleType: "Nước thải", qty: 1 },
  ], status: "Nháp" },
];

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
  { day: "Thứ 2, 03/08", items: ["08:00 Nhận mẫu KH KCN Tân Đức", "13:30 Họp giao ban phòng Lab"] },
  { day: "Thứ 3, 04/08", items: ["09:00 Hiệu chuẩn máy COD", "15:00 Trả kết quả DH-2608-004"] },
  { day: "Thứ 4, 05/08", items: ["08:30 Khảo sát hiện trường Bãi Bằng", "14:00 Đào tạo nội bộ ISO 17025"] },
  { day: "Thứ 5, 06/08", items: ["10:00 Duyệt CoA đơn DH-2608-006"] },
  { day: "Thứ 6, 07/08", items: ["09:00 Nhận mẫu Bệnh viện Bắc Giang", "16:00 Tổng kết tuần"] },
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

const RowActions = ({ onView }) => (
  <div style={{ display: "flex", gap: 6 }}>
    <button className="lims-btn-icon" onClick={onView} title="Xem"><Eye size={14} /></button>
    <button className="lims-btn-icon" title="Sửa"><Pencil size={14} /></button>
    <button className="lims-btn-icon" title="Xóa"><Trash2 size={14} /></button>
  </div>
);

/* ============================================================
   LOGIN
   ============================================================ */
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
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

          <button className="lims-btn lims-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px 0" }} onClick={onLogin}>
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
      { key: "maHoaMau", label: "Tiếp nhận & Mã hóa mẫu" },
      { key: "phanCong", label: "Phân công công việc" },
      { key: "meThuNghiem", label: "Quản lý Mẻ thử nghiệm" },
    ],
  },
  {
    key: "banKTV", label: "4. Bàn làm việc KTV", icon: FlaskConical,
    children: [
      { key: "nhapKQ", label: "Nhập kết quả thử nghiệm" },
    ],
  },
  {
    key: "duyet", label: "5. Duyệt & Báo cáo kết quả", icon: FileCheck2,
    children: [
      { key: "duyetPhieu", label: "Duyệt phiếu kết quả" },
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
      { key: "danhMucA", label: "Danh mục A" },
      { key: "nhathauphu", label: "Nhà thầu phụ"},
      { key: "thietBi", label: "Thiết bị & Hiệu chuẩn" },
      { key: "nguoiDung", label: "Người dùng & Phòng ban" },
    ],
  },
];
const findGroupByChild = (childKey) => NAV_GROUPS.find((g) => g.children.some((c) => c.key === childKey));

/* ============================================================
   HEADER / TWO-TIER NAV
   ============================================================ */
const Header = ({ page, setPage, onLogout }) => {
  const activeGroup = findGroupByChild(page) || NAV_GROUPS[0];
  return (
    <div style={{ background: "var(--primary-dark)", position: "sticky", top: 0, zIndex: 40 }}>
      <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", padding: "0 20px", height: 56 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", marginRight: 28, flexShrink: 0 }}>
          <FlaskConical size={19} />
          <span className="disp" style={{ fontWeight: 700, fontSize: 15 }}>LabTrack</span>
        </div>
        <nav style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }} className="lims-scroll">
          {NAV_GROUPS.map((g) => {
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
            <UserCircle2 size={20} /> Trần An
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
        <SectionCard title="Tải trọng theo kỹ thuật viên" icon={FlaskConical}>
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
const KhachHangPage = () => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => CUSTOMERS.filter((c) =>
    (c.name + c.id + c.contact).toLowerCase().includes(search.toLowerCase())
  ), [search]);

  return (
    <>
      <PageHeader title="Danh sách Khách hàng" subtitle="Hồ sơ khách hàng và tần suất quan trắc" />
      <PageShell>
        <SectionCard title="Danh sách khách hàng" icon={Users} style={{ padding: 0 }}>
          <Toolbar search={search} setSearch={setSearch} placeholder="Tìm theo tên, mã KH, người liên hệ..." onAdd={() => {}} addLabel="Thêm khách hàng" />
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>STT</th><th>Mã KH</th><th>Tên khách hàng</th><th>Liên hệ</th><th>SĐT</th><th>Địa điểm</th><th>Hợp đồng</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={c.id}>
                    <td>{i + 1}</td>
                    <td><SpecimenTag>{c.id}</SpecimenTag></td>
                    <td style={{ fontWeight: 600 }}>{c.name}</td>
                    <td>{c.contact}</td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}><Phone size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.phone}</td>
                    <td style={{ color: "var(--ink-soft)" }}><MapPin size={11} style={{ marginRight: 4, verticalAlign: -1 }} />{c.address}</td>
                    <td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>{c.contracts} hợp đồng</span></td>
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
};

/* ============================================================
   2. KINH DOANH & ĐƠN HÀNG — Báo giá → Đơn hàng
   ============================================================ */
const QUOTER_NAME = "Trần An";

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

const BaoGiaPage = () => {
  const [quotes, setQuotes] = useState(QUOTES);
  const [customer, setCustomer] = useState(CUSTOMERS[0].name);
  const [rows, setRows] = useState([{ id: 1, sampleType: "", indicatorCode: "", qty: 1 }]);
  const [exportQuote, setExportQuote] = useState(null);

  const addRow = () => setRows((r) => [...r, { id: r.length ? r[r.length - 1].id + 1 : 1, sampleType: "", indicatorCode: "", qty: 1 }]);
  const setSampleType = (id, sampleType) => setRows((r) => r.map((row) => row.id === id ? { ...row, sampleType, indicatorCode: "" } : row));
  const setIndicator = (id, code) => setRows((r) => r.map((row) => row.id === id ? { ...row, indicatorCode: code } : row));
  const setQty = (id, qty) => setRows((r) => r.map((row) => row.id === id ? { ...row, qty: Math.max(1, parseInt(qty) || 1) } : row));
  const removeRow = (id) => setRows((r) => r.filter((row) => row.id !== id));

  const total = rows.reduce((sum, r) => {
    const ind = INDICATORS.find((i) => i.code === r.indicatorCode);
    return sum + (ind ? ind.price * r.qty : 0);
  }, 0);

  const createQuote = () => {
    const validRows = rows.filter((r) => r.indicatorCode);
    if (!validRows.length) return;
    const code = `BG-${String(91 + quotes.length - 3).padStart(4, "0")}`;
    setQuotes((q) => [{ code, kh: customer, ngay: "06/08/2026", items: validRows.map((r) => ({ code: r.indicatorCode, sampleType: r.sampleType, qty: r.qty })), status: "Nháp" }, ...q]);
    setRows([{ id: 1, sampleType: "", indicatorCode: "", qty: 1 }]);
  };

  const convertToOrder = (code) => {
    setQuotes((q) => q.map((x) => x.code === code ? { ...x, status: "Đã chuyển đơn hàng" } : x));
  };

  return (
    <>
      <PageHeader title="Báo giá → Đơn hàng" subtitle="Chọn loại mẫu, sau đó lập báo giá theo chỉ tiêu; xuất Excel và chuyển thành đơn hàng" />
      <PageShell>
        <SectionCard title="Lập báo giá mới" icon={FileText}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-soft)" }}>Khách hàng</label>
            <select className="lims-input" value={customer} onChange={(e) => setCustomer(e.target.value)} style={{ minWidth: 260 }}>
              {CUSTOMERS.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Loại mẫu</th><th>Chỉ tiêu (AutoComplete)</th><th>Phương pháp</th><th>Đơn vị</th><th>LOD/LOQ</th><th>Số lượng</th><th>Đơn giá</th><th>Thành tiền</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const options = r.sampleType ? INDICATORS.filter((i) => i.sampleTypes.includes(r.sampleType)) : [];
                  const ind = INDICATORS.find((i) => i.code === r.indicatorCode);
                  return (
                    <tr key={r.id}>
                      <td>
                        <select className="lims-input" value={r.sampleType} onChange={(e) => setSampleType(r.id, e.target.value)} style={{ minWidth: 160 }}>
                          <option value="">— chọn loại mẫu —</option>
                          {SAMPLE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </td>
                      <td>
                        <select className="lims-input" value={r.indicatorCode} onChange={(e) => setIndicator(r.id, e.target.value)} disabled={!r.sampleType} style={{ minWidth: 190 }}>
                          <option value="">{r.sampleType ? "— chọn chỉ tiêu —" : "chọn loại mẫu trước"}</option>
                          {options.map((i) => <option key={i.code} value={i.code}>{i.name}</option>)}
                        </select>
                      </td>
                      <td style={{ color: "var(--ink-soft)" }}>{ind ? ind.method : "—"}</td>
                      <td className="mono">{ind ? ind.unit : "—"}</td>
                      <td className="mono">{ind ? ind.lod : "—"}</td>
                      <td><input type="number" min={1} className="lims-input" style={{ width: 60 }} value={r.qty} onChange={(e) => setQty(r.id, e.target.value)} /></td>
                      <td className="mono">{ind ? ind.price.toLocaleString("vi-VN") + " đ" : "—"}</td>
                      <td className="mono">{ind ? (ind.price * r.qty).toLocaleString("vi-VN") + " đ" : "—"}</td>
                      <td><button className="lims-btn-icon" onClick={() => removeRow(r.id)}><X size={14} /></button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
            <button className="lims-btn lims-btn-ghost" onClick={addRow}><Plus size={14} /> Thêm chỉ tiêu</button>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Tổng: <span className="mono">{total.toLocaleString("vi-VN")} đ</span></div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button className="lims-btn lims-btn-ghost"><Printer size={14} /> In báo giá PDF</button>
            <button className="lims-btn lims-btn-primary" onClick={createQuote}><Plus size={14} /> Lưu báo giá</button>
          </div>
        </SectionCard>

        <SectionCard title="Danh sách báo giá" icon={ClipboardList} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Mã báo giá</th><th>Khách hàng</th><th>Ngày lập</th><th>Số chỉ tiêu</th><th>Trạng thái</th><th></th></tr></thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.code}>
                    <td><SpecimenTag>{q.code}</SpecimenTag></td>
                    <td style={{ fontWeight: 600 }}>{q.kh}</td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}>{q.ngay}</td>
                    <td>{q.items.length}</td>
                    <td>
                      <span className="badge" style={{
                        background: q.status === "Đã chuyển đơn hàng" ? "var(--primary-soft)" : q.status === "Đã gửi khách hàng" ? "var(--blue-soft)" : "var(--gray-soft)",
                        color: q.status === "Đã chuyển đơn hàng" ? "var(--primary-dark)" : q.status === "Đã gửi khách hàng" ? "var(--blue)" : "#5B6659",
                      }}>{q.status}</span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="lims-btn lims-btn-ghost" style={{ padding: "5px 10px" }} onClick={() => setExportQuote(q)}><Download size={13} /> Xuất Excel</button>
                        {q.status !== "Đã chuyển đơn hàng" && (
                          <button className="lims-btn lims-btn-primary" style={{ padding: "5px 10px" }} onClick={() => convertToOrder(q.code)}>
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
                  <td>{c.contracts}</td>
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
  const [orders, setOrders] = useState(ORDERS);
  const genCode = (o) => {
    const seq = String(orders.filter((x) => x.sampleCode).length + 1).padStart(3, "0");
    return `SAM-202608-${seq}`;
  };
  const assignCode = (no) => {
    setOrders((list) => list.map((o) => o.no === no ? { ...o, sampleCode: genCode(o), status: o.status === "Báo giá" ? "Tiếp nhận" : o.status } : o));
  };
  const pending = orders.filter((o) => !o.sampleCode);
  const done = orders.filter((o) => o.sampleCode);

  return (
    <>
      <PageHeader title="Tiếp nhận & Mã hóa mẫu" subtitle="Sinh Sample ID và mã QR/Barcode tự động khi tiếp nhận mẫu" />
      <PageShell>
        <SectionCard title="Đơn hàng chờ tiếp nhận" icon={ScanLine} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Đơn hàng</th><th>Tên</th><th>Khách hàng</th><th>Ngày quan trắc</th><th></th></tr></thead>
              <tbody>
                {pending.length === 0 && <tr><td colSpan={5} style={{ color: "var(--ink-faint)", padding: 16 }}>Không có đơn hàng chờ mã hóa mẫu.</td></tr>}
                {pending.map((o) => (
                  <tr key={o.no}>
                    <td className="mono">{o.no}</td>
                    <td style={{ fontWeight: 600 }}>{o.name}</td>
                    <td>{o.kh}</td>
                    <td className="mono">{o.ngayQT}</td>
                    <td><button className="lims-btn lims-btn-primary" style={{ padding: "5px 10px" }} onClick={() => assignCode(o.no)}><QrCode size={13} /> Sinh mã mẫu</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Mẫu đã mã hóa" icon={PackageCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Mã mẫu</th><th>Đơn hàng</th><th>Khách hàng</th><th>Barcode</th></tr></thead>
              <tbody>
                {done.map((o) => (
                  <tr key={o.no}>
                    <td><SpecimenTag>{o.sampleCode}</SpecimenTag></td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}>{o.no}</td>
                    <td>{o.kh}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <QrCode size={16} color="var(--ink-soft)" />
                        <span className="mono" style={{ fontSize: 11, color: "var(--ink-faint)" }}>{o.sampleCode}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   3. TIẾP NHẬN & PHÂN CÔNG — Phân công công việc
   ============================================================ */
const PhanCongPage = () => {
  const [assignments, setAssignments] = useState(BATCHES);
  const setTech = (idx, tech) => setAssignments((a) => a.map((b, i) => i === idx ? { ...b, tech } : b));
  const setThietBi = (idx, thietBi) => setAssignments((a) => a.map((b, i) => i === idx ? { ...b, thietBi } : b));

  return (
    <>
      <PageHeader title="Phân công công việc" subtitle="Mã mẫu – Chỉ tiêu | Phương pháp – Thiết bị | Kỹ thuật viên đề xuất" />
      <PageShell>
        <SectionCard title="Ma trận phân công" icon={Split} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Mã mẫu</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>Thiết bị</th><th>KTV đề xuất</th><th>Trạng thái</th></tr>
              </thead>
              <tbody>
                {assignments.map((b, i) => {
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
                      <td><SpecimenTag>{b.sample}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                      <td>
                        <select className="lims-input" value={b.thietBi} onChange={(e) => setThietBi(i, e.target.value)} style={{ fontSize: 12, padding: "4px 8px" }}>
                          {EQUIPMENT_LIST.map((e) => <option key={e}>{e}</option>)}
                        </select>
                      </td>
                      <td>
                        <select className="lims-input" value={b.tech} onChange={(e) => setTech(i, e.target.value)} style={{ fontSize: 12, padding: "4px 8px" }}>
                          {TECHNICIANS.map((t) => <option key={t}>{t}</option>)}
                        </select>
                      </td>
                      <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
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
   3. TIẾP NHẬN & PHÂN CÔNG — Quản lý Mẻ thử nghiệm
   ============================================================ */
const MeThuNghiemPage = () => {
  const grouped = TECHNICIANS.map((t) => ({ tech: t, items: BATCHES.filter((b) => b.tech === t) }));
  return (
    <>
      <PageHeader title="Quản lý Mẻ thử nghiệm" subtitle="Gộp 5–10 mẫu cùng chỉ tiêu, cùng KTV, cùng ca thử nghiệm" />
      <PageShell>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
          {grouped.map((g) => (
            <div key={g.tech} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <UserCircle2 size={18} color="var(--primary)" />
                <span style={{ fontWeight: 600, fontSize: 13 }}>{g.tech}</span>
                <span className="badge" style={{ background: "var(--surface-alt)", color: "var(--ink-soft)", marginLeft: "auto" }}>{g.items.length} chỉ tiêu</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {g.items.length === 0 && <div style={{ fontSize: 12, color: "var(--ink-faint)" }}>Chưa có việc được giao</div>}
                {g.items.map((b, i) => {
                  const st = BATCH_STATUS[b.status];
                  return (
                    <div key={i} style={{ fontSize: 12, border: "1px solid var(--line)", borderRadius: 6, padding: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <SpecimenTag>{b.sample}</SpecimenTag>
                        <span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span>
                      </div>
                      <div style={{ fontWeight: 600 }}>{b.indicator}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <SectionCard title="Toàn bộ mẻ thử nghiệm" icon={FlaskConical} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Mã mẫu</th><th>Đơn hàng</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>LOD/LOQ</th><th>Kỹ thuật viên</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {BATCHES.map((b, i) => {
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
                      <td><SpecimenTag>{b.sample}</SpecimenTag></td>
                      <td className="mono" style={{ color: "var(--ink-soft)" }}>{b.order}</td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td style={{ color: "var(--ink-soft)" }}>{b.method}</td>
                      <td className="mono">{b.lodloq}</td>
                      <td>{b.tech}</td>
                      <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
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
   4. BÀN LÀM VIỆC KTV — Nhập kết quả thử nghiệm
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

const NhapKetQuaPage = () => {
  const editable = BATCHES.filter((b) => ["ASSIGNED", "TESTING", "REJECTED"].includes(b.status));
  const [rows, setRows] = useState(editable.map((b) => ({ ...b })));

  const update = (i, field, value) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, [field]: value } : row));

  return (
    <>
      <PageHeader title="Nhập kết quả thử nghiệm" subtitle="Bulk Entry dạng Excel — cảnh báo tự động nếu vượt ngưỡng hoặc dưới LOD/LOQ" />
      <PageShell>
        <SectionCard title="Nhập liệu hàng loạt" icon={FlaskConical} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>Mẫu</th><th>Chỉ tiêu</th><th>Phương pháp</th><th>Đơn vị</th><th>LOD/LOQ</th>
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
                        {ev === "warn" && <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--amber)", marginTop: 3 }}><AlertTriangle size={11} /> Dưới LOD/LOQ</div>}
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
            <button className="lims-btn lims-btn-primary"><FileCheck2 size={14} /> Gửi duyệt</button>
          </div>
        </SectionCard>
      </PageShell>
    </>
  );
};

/* ============================================================
   5. DUYỆT & BÁO CÁO KẾT QUẢ — Duyệt phiếu kết quả
   ============================================================ */
const DuyetPhieuPage = () => {
  const [rows, setRows] = useState(BATCHES.filter((b) => b.status === "PENDING_APPROVAL").map((b) => ({ ...b })));
  const [rejecting, setRejecting] = useState(null);
  const [reason, setReason] = useState("");

  const approve = (i) => setRows((r) => r.map((row, idx) => idx === i ? { ...row, status: "APPROVED_COMPLETED" } : row));
  const openReject = (i) => { setRejecting(i); setReason(""); };
  const confirmReject = () => {
    if (!reason.trim()) return;
    setRows((r) => r.map((row, idx) => idx === rejecting ? { ...row, status: "REJECTED", note: reason } : row));
    setRejecting(null);
  };

  return (
    <>
      <PageHeader title="Duyệt phiếu kết quả" subtitle="So sánh kết quả KTV với tiêu chuẩn/yêu cầu khách hàng trước khi ký số" />
      <PageShell>
        <SectionCard title="Hàng chờ duyệt" icon={ClipboardCheck} style={{ padding: 0 }}>
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr><th>Mẫu</th><th>Chỉ tiêu</th><th>Kết quả KTV</th><th>Tiêu chuẩn / Yêu cầu KH</th><th>Đánh giá</th><th>KTV thực hiện</th><th>Trạng thái</th><th></th></tr>
              </thead>
              <tbody>
                {rows.map((b, i) => {
                  const ev = evaluateResult(b);
                  const st = BATCH_STATUS[b.status];
                  return (
                    <tr key={i}>
                      <td><SpecimenTag>{b.sample}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{b.indicator}</td>
                      <td className="mono">{b.result} {b.unit !== "-" ? b.unit : ""}</td>
                      <td className="mono" style={{ color: "var(--ink-soft)" }}>{b.limit}</td>
                      <td>
                        {ev === "bad"
                          ? <span className="badge" style={{ background: "var(--red-soft)", color: "var(--red)" }}><XCircle size={12} /> Vượt ngưỡng</span>
                          : <span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}><CheckCircle2 size={12} /> Đạt</span>}
                      </td>
                      <td>{b.tech}</td>
                      <td><span className="badge" style={{ background: st.bg, color: st.fg }}>{st.label}</span></td>
                      <td>
                        {b.status === "PENDING_APPROVAL" && (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="lims-btn lims-btn-primary" style={{ padding: "5px 9px" }} onClick={() => approve(i)}><PenLine size={13} /> Duyệt & Ký số</button>
                            <button className="lims-btn lims-btn-danger" style={{ padding: "5px 9px" }} onClick={() => openReject(i)}><XCircle size={13} /> Từ chối</button>
                          </div>
                        )}
                        {b.status === "APPROVED_COMPLETED" && <span style={{ fontSize: 12, color: "var(--primary-dark)", fontWeight: 600 }}>Đã sinh CoA</span>}
                        {b.status === "REJECTED" && <span style={{ fontSize: 12, color: "var(--red)" }}>Đã đẩy về KTV</span>}
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
    <PageHeader title="Thống kê Năng suất & Tiến độ Lab" subtitle="Số việc giao và hoàn thành theo kỹ thuật viên" />
    <PageShell>
      <StatFilters />
      <SectionCard title="Năng suất theo kỹ thuật viên" icon={Gauge}>
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
    <PageHeader title="Danh mục Chỉ tiêu" subtitle="Sản phẩm, chỉ tiêu, phương pháp, LOD/LOQ, đơn giá & phân công mặc định" />
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
                <th>LOD/LOQ</th>
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
                ["Trần An", "Quản trị hệ thống"],
                ["Nguyễn Thị Mai", "Kỹ thuật viên"],
                ["Trần Văn Long", "Kỹ thuật viên"],
                ["Lê Hoàng Nam", "Kỹ thuật viên"],
                ["Phạm Thu Hường", "Trưởng phòng Lab"],
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

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

const pages = {
    banLamViec: <BanLamViecPage setPage={setPage} />,
    tongQuanLab: <TongQuanLabPage />,
    khachHang: <KhachHangPage />,
    baoGia: <BaoGiaPage />,
    hopDong: <HopDongPage />,
    maHoaMau: <MaHoaMauPage />,
    phanCong: <PhanCongPage />,
    meThuNghiem: <MeThuNghiemPage />,
    nhapKQ: <NhapKetQuaPage />,
    duyetPhieu: <DuyetPhieuPage />,
    tkKinhDoanh: <TkKinhDoanhPage />,
    tkNangSuat: <TkNangSuatPage />,
    tkKyThuat: <TkKyThuatPage />,
    danhMucA: <DanhMucAPage />,
    nhaThauPhu: <NhaThauPhuPage />, // 
    thietBi: <ThietBiPage />,
    nguoiDung: <NguoiDungPage />,
  };

  return (
    <div className="lims-root" style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Header page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      {pages[page]}
    </div>
  );
}