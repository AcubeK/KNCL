import React, { useState, useMemo } from "react";
import {
  Home, Users, ClipboardList, HelpCircle, BarChart3, Settings, FlaskConical,
  Search, Download, Plus, Bell, ChevronRight, ChevronDown, X, Clock,
  AlertTriangle, CheckCircle2, XCircle, LogOut, Phone, MapPin, FileText,
  Eye, Pencil, Trash2, Gauge, Wrench, ShieldCheck, Building2, ListFilter,
  CalendarDays, ArrowUpRight, UserCircle2, Lock, Mail
} from "lucide-react";
import {
  ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend
} from "recharts";

/* ============================================================
   FONTS + GLOBAL TOKENS
   Design concept: "Nhãn mẫu / Specimen label" — the recurring
   signature is a ticked, monospace specimen tag used for every
   sample/order code, echoing the barcode labels physically
   stuck on lab samples. Everything else stays quiet and precise.
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
    .lims-btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--line);}
    .lims-btn-ghost:hover{background:var(--surface-alt);}
    .lims-btn-icon{padding:8px;border-radius:8px;background:transparent;border:1px solid var(--line);cursor:pointer;color:var(--ink-soft);}
    .lims-btn-icon:hover{background:var(--surface-alt);color:var(--ink);}
    .lims-input{
      font-family:'Inter',sans-serif;font-size:13px;
      border:1px solid var(--line);border-radius:8px;padding:8px 10px;
      background:var(--surface);color:var(--ink);
    }
    .lims-input:focus-visible, .lims-input:focus{outline:2px solid var(--primary);outline-offset:1px;}
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
  { no: "DH-2608-010", name: "Quan trắc môi trường lao động", type: "Quan trắc", sampleCode: "SAM-202608-010", ngayQT: "11/08/2026", ngayTra: "18/08/2026", kh: "KCN Tân Đức", donVi: "Ban Quản lý KCN Long An", status: "Báo giá" },
];

const WORKFLOW_STEPS = ["Báo giá", "Tiếp nhận mẫu", "Phân công", "Thử nghiệm", "Duyệt kết quả", "Trả CoA"];
const STATUS_MAP: Record<string, number> = {
  "Báo giá": 0,
  "Tiếp nhận": 1,
  "Đang phân tích": 3,
  "Trả kết quả": 5,
  "Hoàn tất": 5,
  "Hủy": -1,
};

const orderStepIndex = (status: string): number => STATUS_MAP[status] ?? 0;

const REQUESTS = [
  { code: "YC-0231", kh: "Công ty CP Bao bì Sài Gòn", loai: "Quan trắc môi trường định kỳ", ngay: "05/08/2026", status: "Mới" },
  { code: "YC-0230", kh: "Công ty TNHH Thủy sản Minh Phú", loai: "Phân tích nước thải", ngay: "04/08/2026", status: "Đang xử lý" },
  { code: "YC-0229", kh: "KCN Tân Đức", loai: "Kiểm nghiệm mẫu đất", ngay: "03/08/2026", status: "Đã chuyển báo giá" },
  { code: "YC-0228", kh: "Trường học Liên cấp Newton", loai: "Kiểm nghiệm nước uống", ngay: "02/08/2026", status: "Mới" },
  { code: "YC-0227", kh: "Công ty CP Thép Việt Ý", loai: "Quan trắc khí thải", ngay: "01/08/2026", status: "Đang xử lý" },
];

const INDICATORS = [
  { code: "CT-001", name: "pH", method: "TCVN 6492:2011", unit: "-", lod: "-" },
  { code: "CT-002", name: "COD", method: "SMEWW 5220C", unit: "mg/L", lod: "4" },
  { code: "CT-003", name: "BOD5", method: "TCVN 6001-1:2008", unit: "mg/L", lod: "2" },
  { code: "CT-004", name: "Tổng Nitơ", method: "TCVN 6638:2000", unit: "mg/L", lod: "0.5" },
  { code: "CT-005", name: "Kim loại nặng (Pb)", method: "SMEWW 3111B", unit: "mg/L", lod: "0.01" },
  { code: "CT-006", name: "Coliform tổng số", method: "TCVN 6187-2:1996", unit: "MPN/100mL", lod: "3" },
];

const BATCHES = [
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", tech: "Nguyễn Thị Mai", status: "TESTING" },
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "BOD5", method: "TCVN 6001-1:2008", lodloq: "2 mg/L", tech: "Trần Văn Long", status: "PENDING_APPROVAL" },
  { sample: "SAM-202608-001", order: "DH-2608-001", indicator: "pH", method: "TCVN 6492:2011", lodloq: "-", tech: "Lê Hoàng Nam", status: "APPROVED_COMPLETED" },
  { sample: "SAM-202608-003", order: "DH-2608-003", indicator: "Tổng Nitơ", method: "TCVN 6638:2000", lodloq: "0.5 mg/L", tech: "Phạm Thu Hường", status: "APPROVED_COMPLETED" },
  { sample: "SAM-202608-006", order: "DH-2608-006", indicator: "Kim loại nặng (Pb)", method: "SMEWW 3111B", lodloq: "0.01 mg/L", tech: "Nguyễn Thị Mai", status: "REJECTED" },
  { sample: "SAM-202608-006", order: "DH-2608-006", indicator: "Coliform tổng số", method: "TCVN 6187-2:1996", lodloq: "3 MPN/100mL", tech: "Trần Văn Long", status: "ASSIGNED" },
  { sample: "SAM-202608-008", order: "DH-2608-008", indicator: "COD", method: "SMEWW 5220C", lodloq: "4 mg/L", tech: "Lê Hoàng Nam", status: "ASSIGNED" },
];
const BATCH_STATUS = {
  ASSIGNED: { label: "Đã phân công", bg: "var(--blue-soft)", fg: "var(--blue)" },
  TESTING: { label: "Đang thử nghiệm", bg: "var(--amber-soft)", fg: "var(--amber)" },
  PENDING_APPROVAL: { label: "Chờ duyệt", bg: "var(--violet-soft)", fg: "var(--violet)" },
  REJECTED: { label: "Yêu cầu làm lại", bg: "var(--red-soft)", fg: "var(--red)" },
  APPROVED_COMPLETED: { label: "Đã duyệt", bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
};
const TECHNICIANS = ["Nguyễn Thị Mai", "Trần Văn Long", "Lê Hoàng Nam", "Phạm Thu Hường"];

const ANNOUNCEMENTS = [
  { title: "Cập nhật quy trình mã hóa mẫu từ 01/08/2026", body: "Toàn bộ mẫu tiếp nhận từ tháng 8 áp dụng định dạng mã SAM-YYYYMM-###.", date: "01/08/2026" },
  { title: "Lịch hiệu chuẩn thiết bị Quý III/2026", body: "Phòng thiết bị sẽ hiệu chuẩn máy AAS và máy đo COD trong tuần từ 10/08.", date: "30/07/2026" },
  { title: "Nghỉ lễ và lịch trực phòng thí nghiệm", body: "Thông báo lịch trực và tiếp nhận mẫu trong kỳ nghỉ sắp tới.", date: "28/07/2026" },
];

const PERSONAL_TASKS = [
  { text: "Bạn được phân công công việc phân tích COD — mẫu SAM-202608-001", target: "meThuNghiem" },
  { text: "Kết quả chỉ tiêu Pb — mẫu SAM-202608-006 bị từ chối, yêu cầu làm lại", target: "meThuNghiem" },
  { text: "Đơn hàng DH-2608-005 đang chờ bạn duyệt báo giá", target: "donHang" },
  { text: "Nhắc hẹn trả kết quả đơn hàng DH-2608-003 vào 08/08/2026", target: "donHang" },
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
   HEADER / NAV
   ============================================================ */
const NAV_ITEMS = [
  { key: "trangChu", label: "Trang chủ", icon: Home },
  { key: "khachHang", label: "Khách hàng", icon: Users },
  { key: "donHang", label: "Đơn hàng", icon: ClipboardList },
  { key: "yeuCau", label: "Yêu cầu", icon: HelpCircle },
  { key: "thongKe", label: "Thống kê", icon: BarChart3 },
  { key: "quanLy", label: "Quản lý", icon: Settings },
  { key: "meThuNghiem", label: "Mẻ thử nghiệm", icon: FlaskConical },
];

const Header = ({ page, setPage, onLogout }) => (
  <div style={{ background: "var(--primary-dark)" }}>
    <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", padding: "0 20px", height: 56 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", marginRight: 28 }}>
        <FlaskConical size={19} />
        <span className="disp" style={{ fontWeight: 700, fontSize: 15 }}>LabTrack</span>
      </div>
      <nav style={{ display: "flex", gap: 2, flex: 1, overflowX: "auto" }} className="lims-scroll">
        {NAV_ITEMS.map((item) => {
          const active = page === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", marginTop: 8,
                borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer",
                fontFamily: "'Inter',sans-serif", fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap",
                background: active ? "var(--bg)" : "transparent",
                color: active ? "var(--primary-dark)" : "#CFE6DE",
              }}
            >
              <item.icon size={14} /> {item.label.toUpperCase()}
            </button>
          );
        })}
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 16 }}>
        <button className="lims-btn-icon" style={{ borderColor: "transparent", color: "#CFE6DE" }} title="Thông báo"><Bell size={16} /></button>
        <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 12.5, fontWeight: 600 }}>
          <UserCircle2 size={20} /> Trần An
        </div>
        <button className="lims-btn-icon" style={{ borderColor: "transparent", color: "#CFE6DE" }} onClick={onLogout} title="Đăng xuất"><LogOut size={16} /></button>
      </div>
    </div>
  </div>
);

const PageHeader = ({ title, subtitle }) => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "22px 20px 4px" }}>
    <h1 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{title}</h1>
    {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--ink-soft)" }}>{subtitle}</p>}
  </div>
);

const PageShell = ({ children }) => (
  <div style={{ maxWidth: 1280, margin: "0 auto", padding: "16px 20px 60px", display: "flex", flexDirection: "column", gap: 16 }}>
    {children}
  </div>
);

/* ============================================================
   TRANG CHỦ
   ============================================================ */
const TrangChuPage = ({ setPage }) => {
  const [tab, setTab] = useState("banTin");
  return (
    <>
      <PageHeader title="Trang chủ" subtitle="Tổng quan hoạt động phòng thí nghiệm" />
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

              <SectionCard title="Công việc của đơn vị" icon={Building2}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 14 }}>
                  <div style={{ background: "var(--red-soft)", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--red)" }}>{OVERDUE_ORDERS.length + EQUIPMENT_OVERDUE.length}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Quá hạn (đơn + thiết bị)</div>
                  </div>
                  <div style={{ background: "var(--violet-soft)", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--violet)" }}>{UPCOMING_RETURN.length}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Chuẩn bị trả kết quả</div>
                  </div>
                  <div style={{ background: "var(--primary-soft)", borderRadius: 8, padding: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--primary-dark)" }}>{TODAY_TASKS.length}</div>
                    <div style={{ fontSize: 11.5, color: "var(--ink-soft)" }}>Công việc hôm nay</div>
                  </div>
                </div>
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
   KHÁCH HÀNG
   ============================================================ */
const KhachHangPage = () => {
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => CUSTOMERS.filter((c) =>
    (c.name + c.id + c.contact).toLowerCase().includes(search.toLowerCase())
  ), [search]);

  return (
    <>
      <PageHeader title="Khách hàng" subtitle="Danh sách và tần suất quan trắc khách hàng" />
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

        <SectionCard title="Tần suất quan trắc" icon={CalendarDays}>
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
      </PageShell>
    </>
  );
};

/* ============================================================
   ĐƠN HÀNG
   ============================================================ */
const OrderDetail = ({ order, onClose }) => {
  const step = orderStepIndex(order.status);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,30,25,.45)", display: "flex", justifyContent: "flex-end", zIndex: 50 }} onClick={onClose}>
      <div className="lims-root" style={{ width: 420, maxWidth: "92vw", background: "var(--surface)", height: "100%", boxShadow: "-12px 0 30px rgba(0,0,0,.15)", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: 20, borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <SpecimenTag>{order.sampleCode}</SpecimenTag>
            <h3 style={{ margin: "10px 0 2px", fontSize: 16 }}>{order.name}</h3>
            <p style={{ margin: 0, fontSize: 12, color: "var(--ink-faint)" }}>{order.no}</p>
          </div>
          <button className="lims-btn-icon" onClick={onClose}><X size={15} /></button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12.5, marginBottom: 20 }}>
            <div><div style={{ color: "var(--ink-faint)" }}>Khách hàng</div><div style={{ fontWeight: 600 }}>{order.kh}</div></div>
            <div><div style={{ color: "var(--ink-faint)" }}>Đơn vị yêu cầu</div><div style={{ fontWeight: 600 }}>{order.donVi}</div></div>
            <div><div style={{ color: "var(--ink-faint)" }}>Ngày quan trắc</div><div className="mono">{order.ngayQT}</div></div>
            <div><div style={{ color: "var(--ink-faint)" }}>Hẹn trả kết quả</div><div className="mono">{order.ngayTra}</div></div>
          </div>

          <div style={{ marginBottom: 8, fontSize: 12.5, fontWeight: 600, color: "var(--ink-soft)" }}>Tiến trình xử lý</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {WORKFLOW_STEPS.map((s, i) => {
              const done = order.status !== "Hủy" && i <= step;
              return (
                <div key={s} style={{ display: "flex", gap: 10 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 99, flexShrink: 0,
                      background: done ? "var(--primary)" : "var(--surface-alt)",
                      border: done ? "none" : "1px solid var(--line)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done && <CheckCircle2 size={12} color="#fff" />}
                    </div>
                    {i < WORKFLOW_STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 20, background: done ? "var(--primary)" : "var(--line)" }} />}
                  </div>
                  <div style={{ paddingBottom: 16, fontSize: 12.5, color: done ? "var(--ink)" : "var(--ink-faint)", fontWeight: done ? 600 : 400 }}>{s}</div>
                </div>
              );
            })}
          </div>
          {order.status === "Hủy" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--red-soft)", color: "var(--red)", padding: 10, borderRadius: 8, fontSize: 12.5 }}>
              <XCircle size={14} /> Đơn hàng đã bị hủy
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DonHangPage = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => ORDERS.filter((o) =>
    (o.name + o.no + o.kh).toLowerCase().includes(search.toLowerCase()) && (!filter || o.status === filter)
  ), [search, filter]);

  return (
    <>
      <PageHeader title="Đơn hàng" subtitle="Quản lý đơn quan trắc và mẫu gửi" />
      <PageShell>
        <SectionCard title="Danh sách đơn hàng" icon={ClipboardList} style={{ padding: 0 }}>
          <Toolbar search={search} setSearch={setSearch} placeholder="Tìm theo mã đơn, tên, khách hàng..."
            filterLabel="Tất cả trạng thái" filterOptions={ORDER_STATUS} filter={filter} setFilter={setFilter}
            onAdd={() => {}} addLabel="Thêm đơn hàng" />
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead>
                <tr>
                  <th>No</th><th>Tên đơn hàng</th><th>Loại</th><th>Ngày QT</th><th>Ngày trả KQ</th>
                  <th>Khách hàng</th><th>Đơn vị yêu cầu</th><th>Trạng thái</th><th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.no}>
                    <td><SpecimenTag>{o.no}</SpecimenTag></td>
                    <td style={{ fontWeight: 600, maxWidth: 220 }}>{o.name}</td>
                    <td>{o.type}</td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}>{o.ngayQT}</td>
                    <td className="mono" style={{ color: "var(--ink-soft)" }}>{o.ngayTra}</td>
                    <td>{o.kh}</td>
                    <td style={{ color: "var(--ink-soft)" }}>{o.donVi}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td><RowActions onView={() => setSelected(o)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </PageShell>
      {selected && <OrderDetail order={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

/* ============================================================
   YÊU CẦU
   ============================================================ */
const REQ_STATUS_STYLE = {
  "Mới": { bg: "var(--blue-soft)", fg: "var(--blue)" },
  "Đang xử lý": { bg: "var(--amber-soft)", fg: "var(--amber)" },
  "Đã chuyển báo giá": { bg: "var(--primary-soft)", fg: "var(--primary-dark)" },
};
const YeuCauPage = () => {
  const [search, setSearch] = useState("");
  const filtered = REQUESTS.filter((r) => (r.kh + r.code).toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <PageHeader title="Yêu cầu" subtitle="Yêu cầu tiếp nhận từ khách hàng, chờ chuyển thành báo giá" />
      <PageShell>
        <SectionCard title="Danh sách yêu cầu" icon={HelpCircle} style={{ padding: 0 }}>
          <Toolbar search={search} setSearch={setSearch} placeholder="Tìm theo mã yêu cầu, khách hàng..." />
          <div className="lims-scroll" style={{ overflowX: "auto" }}>
            <table className="lims-table">
              <thead><tr><th>Mã YC</th><th>Khách hàng</th><th>Loại yêu cầu</th><th>Ngày nhận</th><th>Trạng thái</th><th></th></tr></thead>
              <tbody>
                {filtered.map((r) => {
                  const s = REQ_STATUS_STYLE[r.status];
                  return (
                    <tr key={r.code}>
                      <td><SpecimenTag>{r.code}</SpecimenTag></td>
                      <td style={{ fontWeight: 600 }}>{r.kh}</td>
                      <td>{r.loai}</td>
                      <td className="mono" style={{ color: "var(--ink-soft)" }}>{r.ngay}</td>
                      <td><span className="badge" style={{ background: s.bg, color: s.fg }}>{r.status}</span></td>
                      <td>
                        {r.status !== "Đã chuyển báo giá"
                          ? <button className="lims-btn lims-btn-ghost" style={{ padding: "5px 10px" }}>Tạo báo giá</button>
                          : <span style={{ fontSize: 12, color: "var(--ink-faint)" }}>—</span>}
                      </td>
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
   THỐNG KÊ
   ============================================================ */
const ThongKePage = () => (
  <>
    <PageHeader title="Thống kê" subtitle="Thống kê theo ngày quan trắc" />
    <PageShell>
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
          <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Đơn vị yêu cầu quan trắc</label>
            <select className="lims-input" style={{ width: "100%", marginTop: 4 }}><option>Tất cả</option></select>
          </div>
          <div><label style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 600 }}>Loại mẫu + Chỉ tiêu</label>
            <select className="lims-input" style={{ width: "100%", marginTop: 4 }}><option>Tất cả</option>{INDICATORS.map((i) => <option key={i.code}>{i.name}</option>)}</select>
          </div>
        </div>
        <div style={{ marginTop: 14 }}><button className="lims-btn lims-btn-primary">Xem thống kê</button></div>
      </SectionCard>

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

/* ============================================================
   QUẢN LÝ
   ============================================================ */
const QUAN_LY_SECTIONS = [
  { key: "user", label: "Người dùng & Phân quyền", icon: ShieldCheck, desc: "Quản lý tài khoản nhân viên và vai trò truy cập" },
  { key: "indicator", label: "Danh mục chỉ tiêu (Danh mục A)", icon: FlaskConical, desc: "Chỉ tiêu thử nghiệm, phương pháp, đơn giá, LOD/LOQ" },
  { key: "equipment", label: "Thiết bị & Hiệu chuẩn", icon: Wrench, desc: "Theo dõi lịch hiệu chuẩn, bảo trì thiết bị phòng Lab" },
  { key: "branch", label: "Chi nhánh / Phòng ban", icon: Building2, desc: "Cơ cấu tổ chức các chi nhánh và phòng ban" },
];
const QuanLyPage = () => {
  const [active, setActive] = useState("indicator");
  return (
    <>
      <PageHeader title="Quản lý" subtitle="Cấu hình danh mục và hệ thống" />
      <PageShell>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {QUAN_LY_SECTIONS.map((s) => (
              <button key={s.key} onClick={() => setActive(s.key)} style={{
                display: "flex", alignItems: "flex-start", gap: 10, textAlign: "left", padding: 12,
                borderRadius: 8, border: "1px solid " + (active === s.key ? "var(--primary)" : "var(--line)"),
                background: active === s.key ? "var(--primary-soft)" : "var(--surface)", cursor: "pointer",
              }}>
                <s.icon size={16} color={active === s.key ? "var(--primary-dark)" : "var(--ink-faint)"} style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: active === s.key ? "var(--primary-dark)" : "var(--ink)" }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-faint)", marginTop: 2 }}>{s.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <SectionCard title={QUAN_LY_SECTIONS.find((s) => s.key === active).label} icon={QUAN_LY_SECTIONS.find((s) => s.key === active).icon} style={{ padding: 0 }}>
            {active === "indicator" && (
              <div className="lims-scroll" style={{ overflowX: "auto" }}>
                <table className="lims-table">
                  <thead><tr><th>Mã chỉ tiêu</th><th>Tên chỉ tiêu</th><th>Phương pháp thử</th><th>Đơn vị</th><th>LOD/LOQ</th><th></th></tr></thead>
                  <tbody>
                    {INDICATORS.map((i) => (
                      <tr key={i.code}>
                        <td><SpecimenTag>{i.code}</SpecimenTag></td>
                        <td style={{ fontWeight: 600 }}>{i.name}</td>
                        <td style={{ color: "var(--ink-soft)" }}>{i.method}</td>
                        <td className="mono">{i.unit}</td>
                        <td className="mono">{i.lod}</td>
                        <td><RowActions /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {active === "equipment" && (
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
                    <tr>
                      <td style={{ fontWeight: 600 }}>Máy đo pH cầm tay</td>
                      <td className="mono">20/09/2026</td>
                      <td><span className="badge" style={{ background: "var(--primary-soft)", color: "var(--primary-dark)" }}>Còn hạn</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            {active === "user" && (
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
            )}
            {active === "branch" && (
              <div style={{ padding: 16, fontSize: 13, color: "var(--ink-soft)" }}>
                Chi nhánh Hà Nội (Trụ sở chính) · Chi nhánh Hòa Bình · Chi nhánh Long An
              </div>
            )}
          </SectionCard>
        </div>
      </PageShell>
    </>
  );
};

/* ============================================================
   MẺ THỬ NGHIỆM
   ============================================================ */
const MeThuNghiemPage = () => {
  const grouped = TECHNICIANS.map((t) => ({ tech: t, items: BATCHES.filter((b) => b.tech === t) }));
  return (
    <>
      <PageHeader title="Mẻ thử nghiệm" subtitle="Phân chia công việc cho từng kỹ thuật viên" />
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
                      <td>
                        <select className="lims-input" defaultValue={b.tech} style={{ fontSize: 12, padding: "4px 8px" }}>
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
   APP ROOT
   ============================================================ */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("trangChu");

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const pages = {
    trangChu: <TrangChuPage setPage={setPage} />,
    khachHang: <KhachHangPage />,
    donHang: <DonHangPage />,
    yeuCau: <YeuCauPage />,
    thongKe: <ThongKePage />,
    quanLy: <QuanLyPage />,
    meThuNghiem: <MeThuNghiemPage />,
  };

  return (
    <div className="lims-root" style={{ minHeight: "100vh" }}>
      <GlobalStyle />
      <Header page={page} setPage={setPage} onLogout={() => setLoggedIn(false)} />
      {pages[page]}
    </div>
  );
}