# Update Log — Student Success AI Dashboard

## v2.0 — Input Data Mahasiswa (Juli 2026)

### Fitur Baru

#### 1. View "Input Data" (Sidebar)
- Navigasi baru di sidebar dengan icon `user-plus`
- Layout 2 kolom: tabel (kiri) + form/upload (kanan)

#### 2. Form Input Manual
- 8 field: Nama, NIM, Angkatan, No. Telepon, Tipe Kelas, Mode Kelas, Fakultas, Semester
- Tipe Kelas: dropdown (Reguler / Profesional)
- Mode Kelas: dropdown (Hybrid / Online)
- Validasi semua field wajib diisi

#### 3. Upload Excel
- Drag-and-drop atau klik untuk upload file `.xlsx`, `.xls`, `.csv`
- **Auto-detect kolom** — header Excel dicocokkan otomatis:
  - `nama/name/nama_lengkap` → Nama
  - `nim/npm/id_student` → NIM
  - `angkatan/year/batch` → Angkatan
  - `telepon/telp/phone/no_hp/wa` → Telepon
  - `tipe_kelas/class_type` → Tipe Kelas
  - `mode_kelas/learning_mode/mode` → Mode Kelas
  - `fakultas/faculty` → Fakultas
  - `semester/sem` → Semester
- **Preview** sebelum import — tampilkan mapping kolom + data yang terdeteksi
- **Konfirmasi Import** — insert semua data ke tabel sekaligus

#### 4. Tabel Data dengan Pagination
- Max 10 baris per halaman
- Pagination angka (‹ 1 2 3 ›) + info "Menampilkan 1-10 dari 22 data"
- Kolom: Nama, NIM, Angkatan, Telepon, Tipe, Mode, Fakultas, Sem, Aksi

#### 5. Edit & Hapus Data
- Tombol **Edit** (pencil) di setiap baris → buka modal edit
- Tombol **Hapus** (trash) dengan konfirmasi
- Modal edit: semua field bisa diubah, simpan perubahan langsung update tabel

#### 6. Filter Tabel
- Search by Nama / NIM (auto-filter on type)
- Dropdown: Angkatan, Tipe Kelas, Mode Kelas, Fakultas, Semester
- Tombol "Filter" untuk apply

#### 7. Simulated Integration Layer
- Fungsi `simulatePOST(endpoint, payload)` — mock POST ke API
- Endpoint `/api/students` — push data baru ke `mockData.students`
- Delay 800ms untuk simulasi network
- Return `{ ok: true, status: 201 }`

### File yang Diubah

| File | Perubahan |
|------|-----------|
| `index.html` | Tambah nav link "Input Data", CDN SheetJS, modal edit mahasiswa |
| `js/app.js` | Tambah `simulatePOST()`, `renderInputData()`, `renderPagination()`, `openEditStudentModal()`, `deleteStudent()`, `refreshInputTable()`, `goToInputPage()` |
| `js/data.js` | Tambah 15 data mahasiswa dummy (total 22) |
| `css/styles.css` | — |
| `AGENTS.md` | Update dokumentasi |

### Library Baru

- **SheetJS (xlsx)** — CDN `https://cdn.sheetjs.com/xlsx-0.20.1/package/dist/xlsx.full.min.js` untuk parse file Excel di browser

### Dummy Data

- Awal: 7 mahasiswa
- Sekarang: 22 mahasiswa (ST001–ST022)
- Spread across: 5 fakultas, semester 1–8, mix Reguler/Profesional & Hybrid/Online

### Flow Upload Excel

```
Upload File → Parse (SheetJS) → Auto-detect Header → Preview Data → Konfirmasi Import → Data masuk tabel
```
