const mockData = {
  students: [
    {
      id: "ST001",
      nim: "20230001",
      name: "Budi Santoso",
      faculty: "Fakultas Teknologi Informasi",
      major: "Teknik Informatika",
      semester: 5,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "628123456789",
      absences: 4,
      riskScore: 82,
      riskLevel: "High"
    },
    {
      id: "ST002",
      nim: "20230002",
      name: "Ani Wijaya",
      faculty: "Fakultas Ekonomi",
      major: "Akuntansi",
      semester: 3,
      classType: "Profesional",
      learningMode: "Online",
      phone: "628129876543",
      absences: 1,
      riskScore: 25,
      riskLevel: "Low"
    },
    {
      id: "ST003",
      nim: "20230003",
      name: "Siti Aminah",
      faculty: "Fakultas Teknologi Informasi",
      major: "Sistem Informasi",
      semester: 7,
      classType: "Akselerasi",
      learningMode: "Offline",
      phone: "6281355554444",
      absences: 6,
      riskScore: 95,
      riskLevel: "Critical"
    },
    {
      id: "ST004",
      nim: "20230004",
      name: "Rudi Hermawan",
      faculty: "Fakultas Teknik",
      major: "Teknik Sipil",
      semester: 1,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "62811222333",
      absences: 3,
      riskScore: 60,
      riskLevel: "Medium"
    },
    {
      id: "ST005",
      nim: "20230005",
      name: "Dewi Lestari",
      faculty: "Fakultas Ilmu Komunikasi",
      major: "Public Relations",
      semester: 5,
      classType: "Lagi Cuti",
      learningMode: "Offline",
      phone: "62899888777",
      absences: 0,
      riskScore: 10,
      riskLevel: "Low"
    },
    {
      id: "ST006",
      nim: "20230006",
      name: "Eko Prasetyo",
      faculty: "Fakultas Hukum",
      major: "Ilmu Hukum",
      semester: 4,
      classType: "Profesional",
      learningMode: "Online",
      phone: "6285711122233",
      absences: 5,
      riskScore: 78,
      riskLevel: "High"
    },
    {
      id: "ST007",
      nim: "20230007",
      name: "Linda Permata",
      faculty: "Fakultas Ekonomi",
      major: "Manajemen",
      semester: 2,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "6281244455566",
      absences: 2,
      riskScore: 40,
      riskLevel: "Medium"
    },
    {
      id: "ST008",
      nim: "20230008",
      name: "Andi Saputra",
      faculty: "Fakultas Teknik",
      major: "Teknik Elektro",
      semester: 4,
      classType: "Reguler",
      learningMode: "Online",
      phone: "6282111222333",
      absences: 3,
      riskScore: 55,
      riskLevel: "Medium"
    },
    {
      id: "ST009",
      nim: "20230009",
      name: "Rina Marlina",
      faculty: "Fakultas Teknologi Informasi",
      major: "Teknik Informatika",
      semester: 6,
      classType: "Profesional",
      learningMode: "Hybrid",
      phone: "6283122334455",
      absences: 0,
      riskScore: 5,
      riskLevel: "Low"
    },
    {
      id: "ST010",
      nim: "20230010",
      name: "Dimas Aditya",
      faculty: "Fakultas Hukum",
      major: "Ilmu Hukum",
      semester: 3,
      classType: "Reguler",
      learningMode: "Online",
      phone: "6285133445566",
      absences: 7,
      riskScore: 90,
      riskLevel: "Critical"
    },
    {
      id: "ST011",
      nim: "20230011",
      name: "Sari Dewi",
      faculty: "Fakultas Ekonomi",
      major: "Akuntansi",
      semester: 5,
      classType: "Profesional",
      learningMode: "Hybrid",
      phone: "6287144556677",
      absences: 1,
      riskScore: 20,
      riskLevel: "Low"
    },
    {
      id: "ST012",
      nim: "20230012",
      name: "Fajar Nugroho",
      faculty: "Fakultas Teknik",
      major: "Teknik Mesin",
      semester: 7,
      classType: "Reguler",
      learningMode: "Offline",
      phone: "6289155667788",
      absences: 5,
      riskScore: 75,
      riskLevel: "High"
    },
    {
      id: "ST013",
      nim: "20230013",
      name: "Maya Putri",
      faculty: "Fakultas Ilmu Komunikasi",
      major: "Digital Marketing",
      semester: 2,
      classType: "Reguler",
      learningMode: "Online",
      phone: "6281166778899",
      absences: 0,
      riskScore: 8,
      riskLevel: "Low"
    },
    {
      id: "ST014",
      nim: "20230014",
      name: "Rizky Pratama",
      faculty: "Fakultas Teknologi Informasi",
      major: "Sistem Informasi",
      semester: 4,
      classType: "Profesional",
      learningMode: "Hybrid",
      phone: "6282177889900",
      absences: 4,
      riskScore: 65,
      riskLevel: "High"
    },
    {
      id: "ST015",
      nim: "20230015",
      name: "Ayu Lestari",
      faculty: "Fakultas Ekonomi",
      major: "Manajemen",
      semester: 6,
      classType: "Reguler",
      learningMode: "Online",
      phone: "6283188990011",
      absences: 2,
      riskScore: 35,
      riskLevel: "Medium"
    },
    {
      id: "ST016",
      nim: "20230016",
      name: "Bimo Ardianto",
      faculty: "Fakultas Teknik",
      major: "Teknik Sipil",
      semester: 1,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "6285199001122",
      absences: 8,
      riskScore: 98,
      riskLevel: "Critical"
    },
    {
      id: "ST017",
      nim: "20230017",
      name: "Citra Ananda",
      faculty: "Fakultas Hukum",
      major: "Ilmu Hukum",
      semester: 5,
      classType: "Profesional",
      learningMode: "Online",
      phone: "6287100112233",
      absences: 1,
      riskScore: 15,
      riskLevel: "Low"
    },
    {
      id: "ST018",
      nim: "20230018",
      name: "Dian Kusuma",
      faculty: "Fakultas Teknologi Informasi",
      major: "Teknik Informatika",
      semester: 3,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "6289111223344",
      absences: 6,
      riskScore: 85,
      riskLevel: "High"
    },
    {
      id: "ST019",
      nim: "20230019",
      name: "Eka Wulandari",
      faculty: "Fakultas Ilmu Komunikasi",
      major: "Public Relations",
      semester: 4,
      classType: "Reguler",
      learningMode: "Offline",
      phone: "6281122334455",
      absences: 0,
      riskScore: 3,
      riskLevel: "Low"
    },
    {
      id: "ST020",
      nim: "20230020",
      name: "Gilang Ramadhan",
      faculty: "Fakultas Ekonomi",
      major: "Akuntansi",
      semester: 8,
      classType: "Profesional",
      learningMode: "Online",
      phone: "6282133445566",
      absences: 3,
      riskScore: 50,
      riskLevel: "Medium"
    },
    {
      id: "ST021",
      nim: "20230021",
      name: "Hana Permadi",
      faculty: "Fakultas Teknik",
      major: "Teknik Elektro",
      semester: 2,
      classType: "Reguler",
      learningMode: "Hybrid",
      phone: "6285144556677",
      absences: 9,
      riskScore: 99,
      riskLevel: "Critical"
    },
    {
      id: "ST022",
      nim: "20230022",
      name: "Irfan Hakim",
      faculty: "Fakultas Hukum",
      major: "Ilmu Hukum",
      semester: 6,
      classType: "Reguler",
      learningMode: "Online",
      phone: "6287155667788",
      absences: 2,
      riskScore: 30,
      riskLevel: "Medium"
    }
  ],
  conversations: [
    {
      id: "CHAT001",
      studentId: "ST001",
      status: "AI Handling",
      sentiment: "Negative",
      topic: "KRS",
      confidence: 75,
      lastMessage: "Saya bingung kenapa KRS saya ditolak terus.",
      timestamp: "2026-06-05T10:30:00Z",
      messages: [
        { sender: "student", text: "Halo, saya mau tanya soal KRS.", time: "10:25" },
        { sender: "bot", text: "Halo Budi! Ada yang bisa dibantu terkait KRS?", time: "10:25" },
        { sender: "student", text: "Saya bingung kenapa KRS saya ditolak terus.", time: "10:30" }
      ]
    },
    {
      id: "CHAT002",
      studentId: "ST003",
      status: "Waiting SS",
      sentiment: "Critical",
      topic: "Pembayaran",
      confidence: 90,
      lastMessage: "Saya minta hubungkan ke petugas.",
      timestamp: "2026-06-05T11:00:00Z",
      messages: [
        { sender: "student", text: "Mbak, ini gimana ya? Saya sudah bayar tapi status masih menunggak.", time: "10:55" },
        { sender: "bot", text: "Mohon maaf atas ketidaknyamanannya. Boleh kirimkan bukti bayarnya?", time: "10:56" },
        { sender: "student", text: "Ini bukti bayarnya. Saya butuh cepat karena mau ujian.", time: "10:58" },
        { sender: "bot", text: "Terima kasih. Saya akan coba verifikasi, mohon tunggu sebentar.", time: "10:59" },
        { sender: "student", text: "Sudah 10 menit belum ada kabar. Saya minta hubungkan ke petugas.", time: "11:00" }
      ]
    },
    {
      id: "CHAT003",
      studentId: "ST004",
      status: "SS Handling",
      sentiment: "Neutral",
      topic: "Absensi",
      confidence: 85,
      lastMessage: "Baik, saya tunggu konfirmasinya.",
      timestamp: "2026-06-05T09:15:00Z",
      messages: [
        { sender: "student", text: "Pagi, saya mau tanya soal absensi saya.", time: "09:00" },
        { sender: "bot", text: "Pagi Rudi! Kamu sudah 3 kali absen semester ini.", time: "09:01" },
        { sender: "student", text: "Saya sakit 2 minggu, ada surat dokter. Tapi tetap dihitung absen?", time: "09:05" },
        { sender: "bot", text: "Untuk kasus seperti ini, saya sarankan kamu berbicara langsung dengan petugas Student Success.", time: "09:06" },
        { sender: "student", text: "Ya, tolong hubungkan ke petugas.", time: "09:07" },
        { sender: "sc", text: "Halo Rudi, saya dari Student Success. Untuk absensi dengan surat dokter, bisa dikirimkan suratnya? Nanti saya bantu proses.", time: "09:12" },
        { sender: "student", text: "Baik, saya tunggu konfirmasinya.", time: "09:15" }
      ]
    },
    {
      id: "CHAT004",
      studentId: "ST006",
      status: "AI Handling",
      sentiment: "Negative",
      topic: "Skripsi",
      confidence: 60,
      lastMessage: "Dosen pembimbing susah dihubungi.",
      timestamp: "2026-06-06T08:30:00Z",
      messages: [
        { sender: "student", text: "Halo, saya mau konsultasi soal skripsi.", time: "08:25" },
        { sender: "bot", text: "Halo Eko! Ada kendala apa dengan skripsimu?", time: "08:26" },
        { sender: "student", text: "Dosen pembimbing susah dihubungi.", time: "08:30" }
      ]
    }
  ],
  tickets: [
    {
      id: "TKT001",
      chatId: "CHAT002",
      studentId: "ST003",
      status: "open",
      summary: "Pembayaran UKT sudah terpotong tapi status masih menunggak, butuh verifikasi segera",
      triggerReason: "User minta hubungkan ke petugas karena bot tidak bisa verifikasi pembayaran",
      createdAt: "2026-06-05T11:00:00Z",
      updatedAt: "2026-06-05T11:00:00Z"
    },
    {
      id: "TKT002",
      chatId: "CHAT003",
      studentId: "ST004",
      status: "on-progress",
      summary: "Absensi terhitung padahal sakit dengan surat dokter",
      triggerReason: "User minta hubungkan ke petugas untuk proses surat dokter",
      createdAt: "2026-06-05T09:07:00Z",
      updatedAt: "2026-06-05T09:12:00Z"
    },
    {
      id: "TKT003",
      chatId: "CHAT001",
      studentId: "ST001",
      status: "done",
      summary: "KRS ditolak terus, butuh bantuan manual dari admin",
      triggerReason: "User minta hubungkan ke petugas karena KRS ditolak 3x",
      createdAt: "2026-06-04T14:20:00Z",
      updatedAt: "2026-06-04T15:30:00Z"
    }
  ],
  templates: [
    {
      id: "TPL001",
      name: "Reminder Alfa",
      content: "Halo {{name}}, kami perhatikan kehadiran Anda sudah mencapai {{absences}} kali absen. Mohon tingkatkan kehadiran agar tidak menghambat akademik."
    },
    {
      id: "TPL002",
      name: "Reminder KRS",
      content: "Halo {{name}}, jangan lupa segera selesaikan pengisian KRS semester {{semester}} sebelum deadline tanggal 15 Juni."
    },
    {
      id: "TPL003",
      name: "Reminder Pembayaran",
      content: "Halo {{name}}, mohon segera selesaikan kewajiban pembayaran semester {{semester}} agar dapat mengikuti Ujian Tengah Semester."
    }
  ],
  kpis: {
    totalStudents: 1250,
    totalChatsToday: 45,
    resolvedByBot: 32,
    handoverToSC: 13,
    highRiskStudents: 24,
    alfaThisWeek: 18
  },
  groups: [
    {
      id: "GRP001",
      name: "Kelas Bahasa Inggris Bisnis",
      description: "Mahasiswa lintas jurusan – kelas Bahasa Inggris Bisnis sem ganjil 2025/2026",
      memberIds: ["ST001", "ST003", "ST005"],
      createdAt: "2026-06-01T08:00:00Z"
    },
    {
      id: "GRP002",
      name: "Mahasiswa Beasiswa KIP",
      description: "Penerima beasiswa KIP-Kuliah angkatan 2023",
      memberIds: ["ST002", "ST004", "ST007"],
      createdAt: "2026-06-02T09:00:00Z"
    },
    {
      id: "GRP003",
      name: "Kelas Remedial Statistik",
      description: "Mahasiswa yang mengikuti kelas remedial Statistik lintas prodi",
      memberIds: ["ST001", "ST004", "ST006", "ST007"],
      createdAt: "2026-06-03T10:00:00Z"
    }
  ],
  knowledgeBaseDocs: [
    {
      id: "DOC001",
      title: "Panduan Ganti Kelas ke Profesional",
      fileName: "panduan-ganti-kelas-profesional.pdf",
      fileType: "pdf",
      fileSize: "245 KB",
      uploadedAt: "2026-06-01T09:00:00Z",
      status: "active"
    },
    {
      id: "DOC002",
      title: "Prosedur Pengajuan Cuti Akademik",
      fileName: "prosedur-cuti-akademik.docx",
      fileType: "docx",
      fileSize: "128 KB",
      uploadedAt: "2026-06-02T10:30:00Z",
      status: "active"
    },
    {
      id: "DOC003",
      title: "Timeline Akademik Semester Ganjil 2025/2026",
      fileName: "timeline-akademik-ganjil-2526.xlsx",
      fileType: "xlsx",
      fileSize: "87 KB",
      uploadedAt: "2026-06-03T08:15:00Z",
      status: "active"
    },
    {
      id: "DOC004",
      title: "FAQ Umum Mahasiswa Baru",
      fileName: "faq-maba-2026.txt",
      fileType: "txt",
      fileSize: "32 KB",
      uploadedAt: "2026-06-04T14:00:00Z",
      status: "active"
    },
    {
      id: "DOC005",
      title: "Data Jadwal Dosen Pembimbing",
      fileName: "jadwal-dosen-pembimbing.csv",
      fileType: "csv",
      fileSize: "54 KB",
      uploadedAt: "2026-06-05T11:00:00Z",
      status: "processing"
    }
  ],
  broadcastDrafts: []
};
