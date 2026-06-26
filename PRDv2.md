# Product Requirements Document (PRD) v2
## Student Success Dashboard

---

## 📋 Document Info

| Field | Value |
|-------|-------|
| **Product** | Student Success Dashboard |
| **Version** | 2.0 |
| **Last Updated** | 07 Juni 2026 |
| **Status** | In Development |

---

## 🎯 Product Overview

### Vision
Menjadi pusat komando utama bagi petugas Student Success (SS) untuk memantau, menganalisis, dan menangani kebutuhan mahasiswa secara proaktif melalui integrasi AI Bot dan WhatsApp.

### Problem Statement
1. Petugas SS kewalahan memantau 1.250+ mahasiswa secara manual
2. Tidak ada sistem terpusat untuk menangani handover dari AI Bot ke manusia
3. Sulit mengidentifikasi mahasiswa berisiko tinggi secara real-time
4. Feedback mahasiswa tersebar dan tidak teranalisis dengan baik

### Target Users
- **Primary**: Petugas Student Success (SS Officer)
- **Secondary**: Kepala Bagian Kemahasiswaan, Dekan

---

## 🏗️ Epic Grouping

### Epic 1: Dashboard & Monitoring
> Monitoring real-time kondisi akademik dan komunikasi mahasiswa

| Feature | Description | Status |
|---------|-------------|--------|
| Executive Dashboard | KPI cards, chart volume chat, distribusi sentimen | ✅ Done |
| Bot Monitoring (SS Ticketing) | Dashboard tiket handover AI → SS | ✅ Done |

### Epic 2: Risk Management
> Identifikasi dan penanganan mahasiswa berisiko

| Feature | Description | Status |
|---------|-------------|--------|
| Risk Center | Filter & tabel mahasiswa berisiko | ✅ Done |
| Upload Data Risiko | Upload CSV/Excel data risiko | ✅ Done |

### Epic 3: Communication & Engagement
> Komunikasi proaktif dengan mahasiswa

| Feature | Description | Status |
|---------|-------------|--------|
| Templates | Kelola template pesan follow-up | ✅ Done |
| Broadcast | Kirim pesan massal dengan segmentasi | ✅ Done |
| Group Manager | Kelola grup mahasiswa untuk segmentasi | ✅ Done |

### Epic 4: Feedback & Analytics
> Analisis feedback dan sentimen mahasiswa

| Feature | Description | Status |
|---------|-------------|--------|
| Feedback Analytics | Upload CSV, AI summary, keyword frequency | ✅ Done |
| Historical Feedback | Riwayat feedback dengan filter periode | ✅ Done |


---

## 📖 User Stories

### Epic 1: Dashboard & Monitoring

#### Feature 1.1: Executive Dashboard

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-1.1.1 | Sebagai petugas SS, saya ingin melihat KPI utama agar bisa memantau kondisi secara sekilas | - Menampilkan 6 KPI cards: Total Mahasiswa, Chat Hari Ini, Resolved by Bot, Handover ke SS, Risiko Tinggi, Alfa Minggu Ini |
| US-1.1.2 | Sebagai petugas SS, saya ingin melihat chart volume chat harian agar bisa mengetahui tren komunikasi | - Chart menampilkan data 7 hari terakhir - Data update real-time |
| US-1.1.3 | Sebagai petugas SS, saya ingin melihat distribusi sentimen agar bisa mengetahui mood mahasiswa | - Chart pie menampilkan Positive, Neutral, Negative - Persentase ditampilkan |

#### Feature 1.2: Bot Monitoring (SS Ticketing Dashboard)

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-1.2.1 | Sebagai petugas SS, saya ingin melihat daftar tiket handover agar bisa menangani mahasiswa yang butuh bantuan manusia | - Daftar tiket di panel kiri - Menampilkan status badge (Open/On Progress/Done) - Info mahasiswa dan ringkasan masalah |
| US-1.2.2 | Sebagai petugas SS, saya ingin memfilter tiket berdasarkan status agar bisa fokus pada tiket yang perlu ditangani | - Filter buttons: Semua, Open, Progress, Done - Count per status update real-time - Filter tetap aktif setelah update status |
| US-1.2.3 | Sebagai petugas SS, saya ingin mengambil tiket yang Open agar mahasiswa tahu sedang ditangani | - Button "Ambil Tiket" muncul saat status Open - Status berubah ke "On Progress" - Chat input aktif setelah ambil tiket |
| US-1.2.4 | Sebagai petugas SS, saya ingin chat langsung dengan mahasiswa agar bisa menyelesaikan masalah mereka | - Chat input muncul saat status On Progress - Pesan SS terkirim dan tersimpan di riwayat - Scroll otomatis ke pesan terbaru |
| US-1.2.5 | Sebagai petugas SS, saya ingin menandai tiket selesai agar mahasiswa bisa kembali chat dengan AI | - Button "Selesai" muncul saat status On Progress - Status berubah ke "Done" - Chat status kembali ke "AI Handling" |
| US-1.2.6 | Sebagai petugas SS, saya ingin mencari tiket berdasarkan nama mahasiswa agar bisa menemukan tiket dengan cepat | - Search input di panel kiri - Filter real-time berdasarkan nama dan ringkasan |
| US-1.2.7 | Sebagai petugas SS, saya ingin melihat detail percakapan sebelumnya agar bisa memahami konteks masalah | - Riwayat chat ditampilkan saat klik tiket - Info tiket (trigger, tanggal) ditampilkan di atas chat |

**Ticket Status Flow:**
```
User trigger "Hubungkan ke Petugas"
        ↓
    [OPEN] ← Tiket baru, agan SS
        ↓
SS klik "Ambil Tiket"
        ↓
[ON PROGRESS] ← SS handle, bisa chat
        ↓
SS klik "Selesai"
        ↓
    [DONE] ← User balik ke AI Bot
```

---

### Epic 2: Risk Management

#### Feature 2.1: Risk Center

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-2.1.1 | Sebagai petugas SS, saya ingin melihat daftar mahasiswa berisiko agar bisa melakukan intervensi dini | - Tabel menampilkan nama, NIM, semester, mode, kategori, alfa, score, level - Badge warna sesuai risk level |
| US-2.1.2 | Sebagai petugas SS, saya ingin memfilter mahasiswa berdasarkan fakultas, semester, mode, kategori, dan risk level | - 5 filter dropdown + button Terapkan - Filter bisa dikombinasikan |
| US-2.1.3 | Sebagai petugas SS, saya ingin menghubungi mahasiswa via WhatsApp langsung dari tabel | - Button "WA" di setiap baris - Link ke wa.me dengan nomor mahasiswa |

#### Feature 2.2: Upload Data Risiko

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-2.2.1 | Sebagai petugas SS, saya ingin mengupload data risiko dari file CSV/Excel agar bisa mengupdate data mahasiswa | - Button "Upload Data" di bagian atas - Support format .csv, .xlsx, .xls |
| US-2.2.2 | Sebagai petugas SS, saya ingin drag & drop file untuk upload agar lebih mudah | - Upload zone dengan drag & drop - Highlight saat file di-drag over |
| US-2.2.3 | Sebagai petugas SS, saya ingin melihat preview file sebelum diproses | - Preview menampilkan nama file dan ukuran - Button "Proses Data" untuk konfirmasi |

---

### Epic 3: Communication & Engagement

#### Feature 3.1: Templates

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-3.1.1 | Sebagai petugas SS, saya ingin membuat template pesan agar bisa mengirim pesan follow-up dengan cepat | - Button "Tambah Template" - Modal dengan nama dan isi template |
| US-3.1.2 | Sebagai petugas SS, saya ingin menggunakan variabel personalisasi agar pesan lebih personal | - Support {{name}}, {{nim}}, {{semester}} - Preview di bawah input |

#### Feature 3.2: Broadcast

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-3.2.1 | Sebagai petugas SS, saya ingin mengirim broadcast ke mahasiswa tertarget | - Form judul dan isi pesan - Pilih template dari dropdown |
| US-3.2.2 | Sebagai petugas SS, saya ingin memilih target berdasarkan atribut atau grup | - Tab "Filter Atribut" dan "By Group" - Estimasi penerima update real-time |
| US-3.2.3 | Sebagai petugas SS, saya ingin melihat estimasi penerima sebelum mengirim | - Counter penerima di bagian bawah - Update saat filter berubah |

#### Feature 3.3: Group Manager

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-3.3.1 | Sebagai petugas SS, saya ingin membuat grup mahasiswa untuk segmentasi broadcast | - Button "Buat Grup Baru" - Modal dengan nama, deskripsi, anggota |
| US-3.3.2 | Sebagai petugas SS, saya ingin menambah anggota grup dengan pencarian | - Search berdasarkan nama/NIM - Badge "Sudah ditambahkan" - checklist untuk nambahin |
| US-3.3.3 | Sebagai petugas SS, saya ingin mengedit dan menghapus grup | - Button edit dan hapus di setiap card - Konfirmasi sebelum hapus |

---

### Epic 4: Feedback & Analytics

#### Feature 4.1: Feedback Analytics

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-4.1.1 | Sebagai petugas SS, saya ingin mengupload feedback mahasiswa dari CSV | - Upload zone drag & drop - Support format CSV |
| US-4.1.2 | Sebagai petugas SS, saya ingin melihat AI summary dari feedback | - Top Positive, Top Complaint, Recommendation - Highlight warna hijau, merah, biru |
| US-4.1.3 | Sebagai petugas SS, saya ingin melihat keyword frequency dari feedback | - Badge dengan ukuran berbeda sesuai frekuensi |

#### Feature 4.2: Historical Feedback

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-4.2.1 | Sebagai petugas SS, saya ingin melihat riwayat feedback untuk analisis tren | - Tabel dengan kolom: Tanggal, Sumber, Sentimen, Topik, Ringkasan |
| US-4.2.2 | Sebagai petugas SS, saya ingin memfilter feedback berdasarkan periode | - Dropdown: Semua, 7 Hari, 30 Hari, 90 Hari |
| US-4.2.3 | Sebagai petugas SS, saya ingin melihat sumber feedback (WhatsApp, Survey, Chatbot) | - Badge warna berbeda per sumber |
| US-4.2.4 | Sebagai petugas SS, saya ingin melihat sentimen feedback | - Badge: Positif (hijau), Netral (kuning), Negatif (merah) |
| US-4.2.5 | Sebagai petugas SS, saya ingin pagination untuk navigasi data yang banyak | - Info "Menampilkan X dari Y feedback" - Button Previous/Next |

---

### Epic 5: Knowledge & Architecture

#### Feature 5.1: Knowledge Base

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-5.1.1 | Sebagai petugas SS, saya ingin mengupload dokumen untuk AI Bot | - Support PDF, DOCX, XLSX, TXT, CSV - Drag & drop zone |
| US-5.1.2 | Sebagai petugas SS, saya ingin melihat daftar dokumen yang sudah diupload | - Tabel: Nama, Tipe, Ukuran, Tanggal, Status - Status: Aktif, Diproses, Error |
| US-5.1.3 | Sebagai petugas SS, saya ingin menghapus dokumen dari knowledge base | - Button hapus dengan konfirmasi - Update count otomatis |

#### Feature 5.2: Architecture View

| ID | User Story | Acceptance Criteria |
|----|------------|---------------------|
| US-5.2.1 | Sebagai petugas SS, saya ingin memahami arsitektur sistem | - Visualisasi alur: Student → WhatsApp → AI Bot → SS Dashboard |

---

## 🔄 User Flow

### Flow 1: Handover AI → SS (Ticketing)
```
1. User chat dengan AI Bot di WhatsApp
2. AI Bot tidak bisa menyelesaikan masalah
3. User trigger "Hubungkan ke Petugas"
4. Tiket "Open" muncul di Bot Monitoring
5. SS melihat tiket dan klik "Ambil Tiket"
6. Status berubah "On Progress", SS bisa chat
7. SS dan user berdiskusi menyelesaikan masalah
8. SS klik "Selesai"
9. Status "Done", user kembali chat dengan AI
```

### Flow 2: Risk Management
```
1. SS upload data risiko (CSV/Excel) di Risk Center
2. Data diproses dan ditampilkan di tabel
3. SS filter berdasarkan fakultas/semester/risk level
4. SS identifikasi mahasiswa berisiko tinggi
5. SS klik button WA untuk menghubungi
6. SS gunakan template untuk follow-up
```

### Flow 3: Broadcast Communication
```
1. SS buat broadcast baru
2. Pilih template (opsional)
3. Set target: filter atribut atau pilih grup
4. Lihat estimasi penerima
5. Kirim broadcast
```

---

## 📊 Data Model

### Ticket
```javascript
{
  id: "TKT001",              // Unique ID
  chatId: "CHAT002",         // Reference ke conversation
  studentId: "ST003",        // Reference ke student
  status: "open",            // open | on-progress | done
  summary: "...",            // Ringkasan masalah
  triggerReason: "...",      // Alasan trigger
  createdAt: "2026-06-05",   // Tanggal dibuat
  updatedAt: "2026-06-05"    // Tanggal update terakhir
}
```

### Conversation
```javascript
{
  id: "CHAT001",             // Unique ID
  studentId: "ST001",        // Reference ke student
  status: "AI Handling",     // AI Handling | Waiting SS | SS Handling
  sentiment: "Negative",     // Positive | Neutral | Negative | Critical
  topic: "KRS",              // Topik percakapan
  messages: [...]            // Array of messages
}
```

### Student
```javascript
{
  id: "ST001",               // Unique ID
  nim: "20230001",           // NIM
  name: "Budi Santoso",      // Nama
  faculty: "...",            // Fakultas
  major: "...",              // Jurusan
  semester: 5,               // Semester
  riskScore: 82,             // Risk Score (0-100)
  riskLevel: "High"          // Low | Medium | High | Critical
}
```

---

## 🎨 UI Components

### Badge Colors
| Status | Class | Color |
|--------|-------|-------|
| Open | badge-high | 🟡 Warning |
| On Progress | badge-medium | 🔵 Info |
| Done | badge-low | 🟢 Success |
| Positive | badge-low | 🟢 Green |
| Neutral | badge-medium | 🟡 Yellow |
| Negative | badge-high | 🔴 Red |

### Button Types
| Type | Class | Usage |
|------|-------|-------|
| Primary | btn-primary | Main action |
| Success | btn-success | Selesai/Complete |
| Warning | btn-warning | Trigger/Alert |
| Outline | btn-outline | Secondary action |
| Small | btn-sm | Compact button |

---

## 📈 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Ticket Response Time | < 5 menit | Rata-rata waktu Open → On Progress |
| Ticket Resolution Time | < 30 menit | Rata-waktu Open → Done |
| Bot Resolution Rate | > 70% | % chat diselesaikan tanpa handover |
| User Satisfaction | > 4.0/5.0 | Survey kepuasan mahasiswa |
| Risk Intervention Rate | > 80% | % mahasiswa berisiko yang diintervensi |

---

## 🚀 Release Plan

### Phase 1 (Current) ✅
- [x] Executive Dashboard
- [x] Bot Monitoring (SS Ticketing)
- [x] Risk Center + Upload
- [x] Templates
- [x] Broadcast
- [x] Group Manager
- [x] Feedback Analytics + Historical
- [x] Knowledge Base
- [x] Architecture View

### Phase 2 (Next)
- [ ] Real-time notification saat tiket baru
- [ ] Auto-assign tiket ke SS berdasarkan workload
- [ ] Export laporan tiket ke PDF/Excel
- [ ] Integration dengan SIAKAD real
- [ ] AI-powered risk prediction

### Phase 3 (Future)
- [ ] Mobile app untuk SS
- [ ] Chatbot training interface
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

---

## 📝 Glossary

| Term | Definition |
|------|------------|
| **SS** | Student Success - Petugas yang menangani kebutuhan mahasiswa |
| **AI Bot** | Chatbot WhatsApp yang menjawab pertanyaan mahasiswa |
| **Handover** | Proses transfer dari AI Bot ke petugas SS |
| **Ticket** | Catatan permintaan bantuan dari mahasiswa ke SS |
| **Risk Score** | Skor 0-100 yang menunjukkan tingkat risiko mahasiswa |
| **Broadcast** | Pesan massal yang dikirim ke grup mahasiswa |

---

*Document ends*
