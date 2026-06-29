document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Navigation Logic
    const navItems = document.querySelectorAll('.nav-item');
    const viewTitle = document.getElementById('view-title');
    const viewContainer = document.getElementById('view-container');

    const views = {
        dashboard: renderDashboard,
        monitoring: renderMonitoring,
        'risk-center': renderRiskCenter,
        templates: renderTemplates,
        broadcast: renderBroadcast,
        analytics: renderAnalytics,
        groups: renderGroups,
        'knowledge-base': renderKnowledgeBase
    };

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');

            // Update Active State
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Update Title
            viewTitle.textContent = item.querySelector('span').textContent;

            // Render View
            if (views[view]) {
                views[view]();
                lucide.createIcons();
            }
        });
    });

    // Initial View
    renderDashboard();

    // --- Global Functions for Prototypes ---
    window.closeModal = () => {
        document.getElementById('modal-template').classList.remove('active');
    };

    window.openTemplateModal = () => {
        document.getElementById('tpl-name').value = '';
        document.getElementById('tpl-content').value = '';
        document.getElementById('modal-template').classList.add('active');
    };

    // Global Functions for Absence Modal
    window.closeAbsenceModal = () => {
        const modal = document.getElementById('modal-absence-detail');
        if (modal) modal.classList.remove('active');
    };

    window.openAbsenceDetail = (studentId) => {
        const student = mockData.students.find(s => s.id === studentId);
        if (!student) return;

        // Set Data Mahasiswa
        document.getElementById('detail-student-name').textContent = student.name;
        document.getElementById('detail-student-nim').textContent = `NIM: ${student.nim}`;

        // Set Rincian Absensi
        const container = document.getElementById('absence-list-container');

        if (student.absences === 0) {
            container.innerHTML = '<li style="padding: 12px 0; color: var(--text-muted);">Mahasiswa ini tidak memiliki riwayat alfa.</li>';
        } else {
            // Mocking data spesifik per matkul untuk keperluan purwarupa (prototype)
            // Di sistem aslinya, data ini diambil dari properti object student (misal: student.absenceDetails)
            const mockSubjects = [
                'Consumer Behaviour',
                'Business & Economics Mathematic',
                'Digital Marketing',
                'English for Business',
                'Introduction to Information System'
            ];

            let remainingAlfa = student.absences;
            let listHtml = '';

            // Generate rincian dummy berdasarkan total alfa
            while (remainingAlfa > 0) {
                let randomSubject = mockSubjects.splice(Math.floor(Math.random() * mockSubjects.length), 1)[0] || 'Mata Kuliah Lainnya';
                let count = Math.min(remainingAlfa, Math.floor(Math.random() * 2) + 1); // Random 1 atau 2 alfa per matkul

                listHtml += `
                    <li style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dashed #e5e7eb;">
                        <span style="font-weight: 500; color: #111827;">${randomSubject}</span>
                        <span style="background: #f3f4f6; color: #111827; padding: 4px 10px; border-radius: 6px; font-size: 0.875rem; font-weight: 600;">${count} Alfa</span>
                    </li>
                `;
                remainingAlfa -= count;
            }
            container.innerHTML = listHtml;
        }

        // Tampilkan Modal
        document.getElementById('modal-absence-detail').classList.add('active');
    };

    // Group Modal globals
    let groupModalMembers = []; // array of studentId currently selected

    window.closeGroupModal = () => {
        document.getElementById('modal-group').classList.remove('active');
        groupModalMembers = [];
    };

    window.openGroupModal = (groupId = null) => {
        groupModalMembers = [];
        document.getElementById('group-edit-id').value = '';
        document.getElementById('group-name').value = '';
        document.getElementById('group-desc').value = '';
        document.getElementById('group-member-search').value = '';
        document.getElementById('group-search-results').innerHTML = '';
        document.getElementById('modal-group-title').textContent = groupId ? 'Edit Grup' : 'Buat Grup Baru';

        if (groupId) {
            const grp = mockData.groups.find(g => g.id === groupId);
            if (grp) {
                document.getElementById('group-edit-id').value = grp.id;
                document.getElementById('group-name').value = grp.name;
                document.getElementById('group-desc').value = grp.description || '';
                groupModalMembers = [...grp.memberIds];
            }
        }
        renderGroupMemberTags();
        document.getElementById('modal-group').classList.add('active');
        setupGroupMemberSearch();
        lucide.createIcons();
    };

    window.removeGroupMember = (studentId) => {
        groupModalMembers = groupModalMembers.filter(id => id !== studentId);
        renderGroupMemberTags();
    };

    // WA Template Modal globals
    let waSelectedStudent = null;

    window.closeWATemplateModal = () => {
        document.getElementById('modal-wa-template').classList.remove('active');
        waSelectedStudent = null;
    };

    window.openWATemplateModal = (studentId) => {
        const student = mockData.students.find(s => s.id === studentId);
        if (!student) return;
        waSelectedStudent = student;

        document.getElementById('wa-student-id').value = studentId;
        document.getElementById('wa-student-info').textContent = `${student.name} (${student.nim})`;
        document.getElementById('wa-preview-group').style.display = 'none';
        document.getElementById('wa-preview').textContent = '';
        document.getElementById('btn-send-wa').disabled = true;

        const select = document.getElementById('wa-template-select');
        select.innerHTML = '<option value="">-- Pilih Template --</option>' +
            mockData.templates.map(tpl => `<option value="${tpl.id}">${tpl.name}</option>`).join('');
        select.value = '';

        select.onchange = () => {
            const tpl = mockData.templates.find(t => t.id === select.value);
            if (!tpl) {
                document.getElementById('wa-preview-group').style.display = 'none';
                document.getElementById('btn-send-wa').disabled = true;
                return;
            }
            let msg = tpl.content
                .replace(/\{\{name\}\}/g, student.name)
                .replace(/\{\{nim\}\}/g, student.nim)
                .replace(/\{\{semester\}\}/g, student.semester);
            document.getElementById('wa-preview').textContent = msg;
            document.getElementById('wa-preview-group').style.display = 'block';
            document.getElementById('btn-send-wa').disabled = false;
        };

        document.getElementById('modal-wa-template').classList.add('active');
        lucide.createIcons();
    };

    window.sendWAWithTemplate = () => {
        if (!waSelectedStudent) return;
        const preview = document.getElementById('wa-preview').textContent;
        if (!preview) return;
        const encoded = encodeURIComponent(preview);
        window.open(`https://wa.me/${waSelectedStudent.phone}?text=${encoded}`, '_blank');
        closeWATemplateModal();
    };

    // --- View Renderers ---

    function renderDashboard() {
        const kpis = mockData.kpis;
        viewContainer.innerHTML = `
            <div class="kpi-grid">
                <div class="card kpi-card">
                    <span class="kpi-label">Total Mahasiswa Aktif</span>
                    <span class="kpi-value">${kpis.totalStudents.toLocaleString()}</span>
                </div>
                <div class="card kpi-card">
                    <span class="kpi-label">Total Chat Hari Ini</span>
                    <span class="kpi-value">${kpis.totalChatsToday}</span>
                </div>
                <div class="card kpi-card">
                    <span class="kpi-label">Resolved by Bot</span>
                    <span class="kpi-value" style="color: var(--success)">${kpis.resolvedByBot}</span>
                </div>
                <div class="card kpi-card">
                    <span class="kpi-label">Handover ke SC</span>
                    <span class="kpi-value" style="color: var(--warning)">${kpis.handoverToSC}</span>
                </div>
                <div class="card kpi-card">
                    <span class="kpi-label">Risiko Tinggi</span>
                    <span class="kpi-value" style="color: var(--danger)">${kpis.highRiskStudents}</span>
                </div>
                <div class="card kpi-card">
                    <span class="kpi-label">Alfa Minggu Ini</span>
                    <span class="kpi-value">${kpis.alfaThisWeek}</span>
                </div>
            </div>

            <div class="chart-grid">
                <div class="card">
                    <h3>Volume Chat Harian</h3>
                    <canvas id="dailyChatChart"></canvas>
                </div>
                <div class="card">
                    <h3>Distribusi Sentimen</h3>
                    <canvas id="sentimentChart"></canvas>
                </div>
            </div>
        `;

        if (window.initDashboardCharts) {
            window.initDashboardCharts();
        }
    }

    function renderMonitoring() {
        const openCount = mockData.tickets.filter(t => t.status === 'open').length;
        const progressCount = mockData.tickets.filter(t => t.status === 'on-progress').length;
        const doneCount = mockData.tickets.filter(t => t.status === 'done').length;

        viewContainer.innerHTML = `
            <div class="monitoring-layout">
                <div class="chat-list">
                    <div class="chat-list-header" style="padding: 16px;">
                        <h3 style="margin-bottom: 12px; font-size: 1rem;">Tiket Handover</h3>
                        <div style="display: flex; gap: 6px; margin-bottom: 12px;">
                            <button class="btn btn-sm ticket-filter-btn active" data-filter="all" onclick="filterTicketList('all')">
                                Semua <span style="opacity: 0.7;">(${openCount + progressCount + doneCount})</span>
                            </button>
                            <button class="btn btn-sm ticket-filter-btn" data-filter="open" onclick="filterTicketList('open')">
                                Open <span style="opacity: 0.7;">(${openCount})</span>
                            </button>
                            <button class="btn btn-sm ticket-filter-btn" data-filter="on-progress" onclick="filterTicketList('on-progress')">
                                Progress <span style="opacity: 0.7;">(${progressCount})</span>
                            </button>
                            <button class="btn btn-sm ticket-filter-btn" data-filter="done" onclick="filterTicketList('done')">
                                Done <span style="opacity: 0.7;">(${doneCount})</span>
                            </button>
                        </div>
                        <input type="text" class="form-control" placeholder="Cari tiket..." id="ticket-search-input">
                    </div>
                    <div class="chat-items" id="ticket-items-list">
                        ${renderTicketListItems(mockData.tickets)}
                    </div>
                </div>

                <div class="chat-detail">
                    <div class="chat-list-header" style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 id="chat-student-name">Pilih Tiket</h3>
                            <span id="chat-student-info" style="font-size: 0.8125rem; color: var(--text-muted);">Klik tiket di sebelah kiri untuk melihat detail</span>
                        </div>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <span id="chat-status-badge" class="badge badge-low" style="display: none;"></span>
                            <button class="btn btn-primary btn-sm" id="btn-ambil-tiket" style="display: none;" onclick="ambilTiket()">
                                <i data-lucide="user-check" style="width: 14px; height: 14px;"></i> Ambil Tiket
                            </button>
                            <button class="btn btn-success btn-sm" id="btn-selesai" style="display: none;" onclick="selesaiTiket()">
                                <i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Selesai
                            </button>
                        </div>
                    </div>

                    <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                        <div class="chat-messages" id="chat-messages-container">
                            <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--text-muted);">
                                <div style="text-align: center;">
                                    <i data-lucide="message-circle" style="width: 48px; height: 48px; margin-bottom: 12px;"></i>
                                    <p>Pilih tiket untuk melihat percakapan</p>
                                </div>
                            </div>
                        </div>
                        <div class="chat-input" id="chat-input-area" style="display: none;">
                            <button class="btn btn-icon"><i data-lucide="paperclip"></i></button>
                            <input type="text" placeholder="Ketik pesan ke mahasiswa..." id="ss-chat-input">
                            <button class="btn btn-primary" id="btn-ss-send"><i data-lucide="send"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
        setupTicketSearch();
    }

    function renderTicketListItems(tickets, filter = 'all') {
        const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);

        if (filtered.length === 0) {
            return `<div style="text-align: center; padding: 40px; color: var(--text-muted);">
                <i data-lucide="check-circle" style="width: 40px; height: 40px; margin-bottom: 8px;"></i>
                <p>Tidak ada tiket.</p>
            </div>`;
        }

        return filtered.map(ticket => {
            const student = mockData.students.find(s => s.id === ticket.studentId);
            const statusConfig = {
                'open': { label: 'Open', class: 'badge-high', color: 'var(--warning)', icon: 'alert-circle' },
                'on-progress': { label: 'On Progress', class: 'badge-medium', color: 'var(--info)', icon: 'clock' },
                'done': { label: 'Done', class: 'badge-low', color: 'var(--success)', icon: 'check-circle' }
            };
            const status = statusConfig[ticket.status];
            const time = new Date(ticket.updatedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const date = new Date(ticket.updatedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });

            return `
                <div class="chat-item ticket-item" data-ticket-id="${ticket.id}" data-chat-id="${ticket.chatId}" style="${ticket.status === 'done' ? 'opacity: 0.6;' : ''}">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <span style="font-weight: 600; display: flex; align-items: center; gap: 6px;">
                            <i data-lucide="${status.icon}" style="width: 14px; height: 14px; color: ${status.color};"></i>
                            ${student ? student.name : 'Unknown'}
                        </span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${time}</span>
                    </div>
                    <div style="font-size: 0.8125rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${ticket.summary}
                    </div>
                    <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <span class="badge ${status.class}" style="font-size: 0.65rem;">${status.label}</span>
                        <span style="font-size: 0.7rem; color: var(--text-muted);">${date}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function setupTicketSearch() {
        const searchInput = document.getElementById('ticket-search-input');
        if (!searchInput) return;

        searchInput.addEventListener('input', () => {
            const q = searchInput.value.trim().toLowerCase();
            const filtered = mockData.tickets.filter(ticket => {
                const student = mockData.students.find(s => s.id === ticket.studentId);
                return student && (student.name.toLowerCase().includes(q) || ticket.summary.toLowerCase().includes(q));
            });
            document.getElementById('ticket-items-list').innerHTML = renderTicketListItems(filtered);
            lucide.createIcons();
            setupTicketItemListeners();
        });

        setupTicketItemListeners();
    }

    function setupTicketItemListeners() {
        const items = document.querySelectorAll('.ticket-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const ticketId = item.getAttribute('data-ticket-id');
                const chatId = item.getAttribute('data-chat-id');
                selectTicket(ticketId, chatId);
            });
        });
    }

    let currentTicketId = null;

    function selectTicket(ticketId, chatId) {
        const ticket = mockData.tickets.find(t => t.id === ticketId);
        const chat = mockData.conversations.find(c => c.id === chatId);
        if (!ticket || !chat) return;

        const student = mockData.students.find(s => s.id === ticket.studentId);
        currentTicketId = ticketId;

        // Update header
        document.getElementById('chat-student-name').textContent = student ? student.name : 'Unknown';
        document.getElementById('chat-student-info').textContent = student ? `${student.nim} · ${student.major} - Semester ${student.semester}` : '';

        // Update status badge
        const statusBadge = document.getElementById('chat-status-badge');
        statusBadge.style.display = 'inline-block';
        const statusConfig = {
            'open': { label: 'Open', class: 'badge-high' },
            'on-progress': { label: 'On Progress', class: 'badge-medium' },
            'done': { label: 'Done', class: 'badge-low' }
        };
        const st = statusConfig[ticket.status];
        statusBadge.textContent = st.label;
        statusBadge.className = `badge ${st.class}`;

        // Show/hide action buttons
        const btnAmbil = document.getElementById('btn-ambil-tiket');
        const btnSelesai = document.getElementById('btn-selesai');
        const chatInput = document.getElementById('chat-input-area');

        btnAmbil.style.display = ticket.status === 'open' ? 'inline-flex' : 'none';
        btnSelesai.style.display = ticket.status === 'on-progress' ? 'inline-flex' : 'none';
        chatInput.style.display = ticket.status === 'on-progress' ? 'flex' : 'none';

        // Render messages
        const container = document.getElementById('chat-messages-container');
        let messagesHtml = chat.messages.map(msg => `
            <div class="message ${msg.sender}">
                ${msg.text}
                <div style="font-size: 0.65rem; margin-top: 4px; opacity: 0.7; text-align: right;">${msg.time}</div>
            </div>
        `).join('');

        // Add ticket info at top
        messagesHtml = `
            <div style="padding: 12px; background: #eff6ff; border-radius: 8px; margin-bottom: 16px; font-size: 0.8125rem;">
                <div style="font-weight: 600; margin-bottom: 4px;">📋 Info Tiket ${ticket.id}</div>
                <div style="color: var(--text-muted);">Trigger: ${ticket.triggerReason}</div>
                <div style="color: var(--text-muted); margin-top: 4px;">Dibuat: ${new Date(ticket.createdAt).toLocaleString('id-ID')}</div>
            </div>
        ` + messagesHtml;

        container.innerHTML = messagesHtml;
        container.scrollTop = container.scrollHeight;

        lucide.createIcons();
        setupSSChatInput();
    }

    function setupSSChatInput() {
        const input = document.getElementById('ss-chat-input');
        const sendBtn = document.getElementById('btn-ss-send');
        const container = document.getElementById('chat-messages-container');

        if (!input || !sendBtn) return;

        const sendMessage = () => {
            const text = input.value.trim();
            if (!text) return;

            const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            const msgDiv = document.createElement('div');
            msgDiv.className = 'message sc';
            msgDiv.innerHTML = `${text}<div style="font-size: 0.65rem; margin-top: 4px; opacity: 0.7; text-align: right;">${time}</div>`;
            container.appendChild(msgDiv);
            input.value = '';
            container.scrollTop = container.scrollHeight;

            // Also add to conversation data
            const ticket = mockData.tickets.find(t => t.id === currentTicketId);
            if (ticket) {
                const chat = mockData.conversations.find(c => c.id === ticket.chatId);
                if (chat) {
                    chat.messages.push({ sender: 'sc', text: text, time: time });
                }
            }
        };

        sendBtn.onclick = sendMessage;
        input.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
    }

    window.ambilTiket = () => {
        if (!currentTicketId) return;
        const ticket = mockData.tickets.find(t => t.id === currentTicketId);
        if (!ticket || ticket.status !== 'open') return;

        ticket.status = 'on-progress';
        ticket.updatedAt = new Date().toISOString();

        // Update conversation status
        const chat = mockData.conversations.find(c => c.id === ticket.chatId);
        if (chat) chat.status = 'SS Handling';

        refreshMonitoringUI();
        selectTicket(ticket.id, ticket.chatId);
        alert('Tiket berhasil diambil. Anda sekarang bisa chat dengan mahasiswa.');
    };

    window.selesaiTiket = () => {
        if (!currentTicketId) return;
        const ticket = mockData.tickets.find(t => t.id === currentTicketId);
        if (!ticket || ticket.status !== 'on-progress') return;

        ticket.status = 'done';
        ticket.updatedAt = new Date().toISOString();

        // Update conversation status back to AI
        const chat = mockData.conversations.find(c => c.id === ticket.chatId);
        if (chat) chat.status = 'AI Handling';

        refreshMonitoringUI();
        selectTicket(ticket.id, ticket.chatId);
        alert('Tiket selesai. Mahasiswa kembali ke AI Bot.');
    };

    window.filterTicketList = (filter) => {
        document.querySelectorAll('.ticket-filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === filter);
        });

        const filtered = filter === 'all' ? mockData.tickets : mockData.tickets.filter(t => t.status === filter);
        document.getElementById('ticket-items-list').innerHTML = renderTicketListItems(filtered);
        lucide.createIcons();
        setupTicketItemListeners();
    };

    function refreshMonitoringUI() {
        const openCount = mockData.tickets.filter(t => t.status === 'open').length;
        const progressCount = mockData.tickets.filter(t => t.status === 'on-progress').length;
        const doneCount = mockData.tickets.filter(t => t.status === 'done').length;

        const filterBtns = document.querySelectorAll('.ticket-filter-btn');
        filterBtns.forEach(btn => {
            const filter = btn.getAttribute('data-filter');
            const countSpan = btn.querySelector('span');
            if (!countSpan) return;

            if (filter === 'all') countSpan.textContent = `(${openCount + progressCount + doneCount})`;
            else if (filter === 'open') countSpan.textContent = `(${openCount})`;
            else if (filter === 'on-progress') countSpan.textContent = `(${progressCount})`;
            else if (filter === 'done') countSpan.textContent = `(${doneCount})`;
        });

        const activeFilter = document.querySelector('.ticket-filter-btn.active');
        const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        const filtered = currentFilter === 'all' ? mockData.tickets : mockData.tickets.filter(t => t.status === currentFilter);

        document.getElementById('ticket-items-list').innerHTML = renderTicketListItems(filtered);
        lucide.createIcons();
        setupTicketItemListeners();
    }

    function renderRiskCenter() {
        viewContainer.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="margin-bottom: 0;">Upload Data Risiko (CSV)</h3>
                    <button class="btn btn-primary" onclick="document.getElementById('risk-file-input').click()">
                        <i data-lucide="upload"></i> Upload Data
                    </button>
                    <input type="file" id="risk-file-input" accept=".csv,.xlsx,.xls" style="display:none;">
                </div>
                <div id="risk-upload-zone" class="upload-zone" style="padding: 24px;">
                    <i data-lucide="file-spreadsheet" style="width: 36px; height: 36px; color: var(--text-muted); margin-bottom: 8px;"></i>
                    <p style="font-size: 0.875rem; color: var(--text-muted);">Drag & drop file CSV/Excel di sini, atau klik tombol <strong>Upload Data</strong> di atas.</p>
                </div>
                <div id="risk-upload-preview" style="display:none; margin-top: 16px; padding: 12px; background: #f0fdf4; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p id="risk-upload-filename" style="font-weight: 600; font-size: 0.875rem;"></p>
                            <p id="risk-upload-filesize" style="font-size: 0.75rem; color: var(--text-muted);"></p>
                        </div>
                        <button class="btn btn-primary btn-sm" id="btn-do-risk-upload">Proses Data</button>
                    </div>
                </div>
            </div>
            <div class="card" style="margin-bottom: 24px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; align-items: flex-end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Fakultas</label>
                        <select id="filter-faculty" class="form-control">
                            <option value="all">Semua Fakultas</option>
                            <option>Fakultas Teknologi Informasi</option>
                            <option>Fakultas Ekonomi</option>
                            <option>Fakultas Teknik</option>
                            <option>Fakultas Ilmu Komunikasi</option>
                            <option>Fakultas Hukum</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Semester</label>
                        <select id="filter-semester" class="form-control">
                            <option value="all">Semua Semester</option>
                            ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option value="${n}">${n}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Tipe Kelas (Mode)</label>
                        <select id="filter-mode" class="form-control">
                            <option value="all">Semua Mode</option>
                            <option>Online</option>
                            <option>Hybrid</option>
                            <option>Offline</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Kategori</label>
                        <select id="filter-category" class="form-control">
                            <option value="all">Semua Kategori</option>
                            <option>Reguler</option>
                            <option>Profesional</option>
                            <option>Akselerasi</option>
                            <option>Lagi Cuti</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label>Risk Level</label>
                        <select id="filter-risk" class="form-control">
                            <option value="all">Semua Level</option>
                            <option>Critical</option>
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                        </select>
                    </div>
                    <button id="btn-apply-filter" class="btn btn-primary">Terapkan</button>
                </div>
            </div>
            <div class="card">
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nama</th>
                                <th>NIM</th>
                                <th>Sem</th>
                                <th>Mode</th>
                                <th>Kategori</th>
                                <th>Alfa</th>
                                <th>Level</th>
                                <th>Detail</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="risk-table-body">
                            </tbody>
                    </table>
                </div>
            </div>
        `;

        const applyFilter = () => {
            const faculty = document.getElementById('filter-faculty').value;
            const semester = document.getElementById('filter-semester').value;
            const mode = document.getElementById('filter-mode').value;
            const category = document.getElementById('filter-category').value;
            const risk = document.getElementById('filter-risk').value;

            const filteredStudents = mockData.students.filter(s => {
                const matchFaculty = faculty === 'all' || s.faculty === faculty;
                const matchSemester = semester === 'all' || s.semester.toString() === semester;
                const matchMode = mode === 'all' || s.learningMode === mode;
                const matchCategory = category === 'all' || s.classType === category;
                const matchRisk = risk === 'all' || s.riskLevel === risk;
                return matchFaculty && matchSemester && matchMode && matchCategory && matchRisk;
            });

            const tbody = document.getElementById('risk-table-body');
            if (filteredStudents.length === 0) {
                tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 40px; color: var(--text-muted);">Tidak ada data yang cocok dengan filter.</td></tr>`;
            } else {
                const getRiskLevel = (alfaCount) => {
                    if (alfaCount >= 6) return { level: 'Critical', class: 'badge-critical' };
                    if (alfaCount >= 4) return { level: 'High', class: 'badge-high' };
                    if (alfaCount >= 2) return { level: 'Medium', class: 'badge-medium' };
                    return { level: 'Low', class: 'badge-low' };
                };

                tbody.innerHTML = filteredStudents.map(s => {
                    const riskData = getRiskLevel(s.absences);
                    return `
                    <tr>
                        <td>
                            <div style="font-weight: 600;">${s.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${s.major}</div>
                        </td>
                        <td>${s.nim}</td>
                        <td>${s.semester}</td>
                        <td><span style="font-size: 0.8125rem;">${s.learningMode}</span></td>
                        <td><span style="font-size: 0.8125rem;">${s.classType}</span></td>
                        <td>${s.absences}</td>
                        <td><span class="badge ${riskData.class}">${riskData.level}</span></td>
                        <td>
                            <button class="btn btn-outline btn-sm" onclick="openAbsenceDetail('${s.id}')">
                                <i data-lucide="info" style="width: 14px; height: 14px;"></i> Detail
                            </button>
                        </td>
                        <td>
                            <button class="btn btn-outline btn-sm" onclick="openWATemplateModal('${s.id}')">
                                <i data-lucide="message-circle" style="width: 14px; height: 14px;"></i> WA
                            </button>
                        </td>
                    </tr>
                `;
                }).join('');
            }
            lucide.createIcons();
        };

        document.getElementById('btn-apply-filter').addEventListener('click', applyFilter);

        // Setup Risk Upload
        setupRiskUpload();

        // Initial load
        applyFilter();
    }

    function setupRiskUpload() {
        const zone = document.getElementById('risk-upload-zone');
        const input = document.getElementById('risk-file-input');
        const preview = document.getElementById('risk-upload-preview');
        let selectedFile = null;

        const showPreview = (file) => {
            selectedFile = file;
            document.getElementById('risk-upload-filename').textContent = file.name;
            document.getElementById('risk-upload-filesize').textContent = `${(file.size / 1024).toFixed(1)} KB`;
            preview.style.display = 'block';
        };

        zone.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') input.click();
        });

        zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (e.dataTransfer.files[0]) showPreview(e.dataTransfer.files[0]);
        });

        input.addEventListener('change', () => {
            if (input.files[0]) showPreview(input.files[0]);
        });

        document.getElementById('btn-do-risk-upload').addEventListener('click', () => {
            if (!selectedFile) return;
            alert(`File "${selectedFile.name}" berhasil diupload! Data risiko sedang diproses.`);
            preview.style.display = 'none';
            selectedFile = null;
            input.value = '';
        });
    }

    function renderTemplates() {
        viewContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <p style="color: var(--text-muted);">Kelola template pesan untuk follow-up cepat.</p>
                <button class="btn btn-primary" onclick="openTemplateModal()"><i data-lucide="plus"></i> Tambah Template</button>
            </div>
            <div id="templates-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
                ${mockData.templates.map(tpl => `
                    <div class="card">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <h3 style="font-size: 1rem;">${tpl.name}</h3>
                            <div style="display: flex; gap: 8px;">
                                <button class="btn btn-icon btn-sm"><i data-lucide="edit-2" style="width: 16px;"></i></button>
                                <button class="btn btn-icon btn-sm text-danger"><i data-lucide="trash-2" style="width: 16px;"></i></button>
                            </div>
                        </div>
                        <p style="font-size: 0.875rem; color: var(--text-muted); background: #f8fafc; padding: 12px; border-radius: 8px;">
                            ${tpl.content}
                        </p>
                    </div>
                `).join('')}
            </div>
        `;
        lucide.createIcons();

        // Implement Save Logic for Templates
        const btnSave = document.getElementById('btn-save-template');
        btnSave.onclick = () => {
            const name = document.getElementById('tpl-name').value;
            const content = document.getElementById('tpl-content').value;

            if (name && content) {
                const newTpl = {
                    id: `TPL${Date.now()}`,
                    name: name,
                    content: content
                };
                mockData.templates.push(newTpl);
                closeModal();
                renderTemplates(); // Refresh view
            } else {
                alert('Nama dan isi template harus diisi.');
            }
        };
    }

    function renderBroadcast() {
        viewContainer.innerHTML = `
            <div class="grid" style="display: grid; grid-template-columns: 1fr 380px; gap: 24px;">
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h3 style="margin-bottom: 0;">Buat Broadcast Baru</h3>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <label for="broadcast-template-select" style="font-size: 0.8125rem; font-weight: 500;">Gunakan Template:</label>
                            <select id="broadcast-template-select" class="form-control" style="width: 200px; padding: 6px 10px;">
                                <option value="">-- Pilih Template --</option>
                                ${mockData.templates.map(tpl => `<option value="${tpl.id}">${tpl.name}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <label>Judul Broadcast</label>
                            <input type="text" id="broadcast-title" class="form-control" placeholder="Contoh: Pengingat KRS Semester Ganjil">
                        </div>
                        <div class="form-group">
                            <label>Isi Pesan</label>
                            <textarea id="broadcast-message" class="form-control" placeholder="Tulis pesan Anda di sini..." style="min-height: 200px;"></textarea>
                            <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">Gunakan {{name}}, {{nim}}, {{semester}} untuk personalisasi.</p>
                        </div>
                        <div style="display: flex; justify-content: flex-end; gap: 12px;">
                            <button class="btn btn-outline" id="btn-save-draft">Simpan Draft</button>
                            <button class="btn btn-primary" id="btn-send-broadcast">Kirim Sekarang</button>
                        </div>
                    </div>
                </div>

                <div class="card" id="broadcast-drafts-section" style="margin-top: 24px;">
                    <h3 style="margin-bottom: 16px;">Draft Tersimpan</h3>
                    <div id="broadcast-drafts-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;">
                        <!-- Draft items will be rendered here -->
                    </div>
                </div>
                <div class="card">
                    <h3 style="margin-bottom: 16px;">Segmentasi Target</h3>

                    <div class="tab-bar">
                        <button class="tab-btn active" id="tab-filter" onclick="switchBroadcastTab('filter')">Filter Atribut</button>
                        <button class="tab-btn" id="tab-group" onclick="switchBroadcastTab('group')">By Group</button>
                    </div>

                    <div id="broadcast-tab-filter">
                        <div class="form-group">
                            <label>Fakultas</label>
                            <select id="bc-faculty" class="form-control">
                                <option value="all">Semua Fakultas</option>
                                <option>Fakultas Teknologi Informasi</option>
                                <option>Fakultas Ekonomi</option>
                                <option>Fakultas Teknik</option>
                                <option>Fakultas Ilmu Komunikasi</option>
                                <option>Fakultas Hukum</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tipe Kelas (Mode)</label>
                            <select id="bc-mode" class="form-control">
                                <option value="all">Semua Mode</option>
                                <option>Online</option>
                                <option>Hybrid</option>
                                <option>Offline</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Kategori</label>
                            <select id="bc-category" class="form-control">
                                <option value="all">Semua Kategori</option>
                                <option>Reguler</option>
                                <option>Profesional</option>
                                <option>Akselerasi</option>
                                <option>Lagi Cuti</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Semester</label>
                            <select id="bc-semester" class="form-control">
                                <option value="all">Semua Semester</option>
                                ${[1, 2, 3, 4, 5, 6, 7, 8].map(n => `<option value="${n}">${n}</option>`).join('')}
                            </select>
                        </div>
                    </div>

                    <div id="broadcast-tab-group" style="display:none;">
                        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 12px;">Pilih satu atau lebih grup. Penerima duplikat akan otomatis dihapus.</p>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            ${mockData.groups.map(grp => `
                                <label style="display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer;">
                                    <input type="checkbox" class="bc-group-check" value="${grp.id}" style="width:16px;height:16px;">
                                    <div>
                                        <div style="font-weight: 600; font-size: 0.875rem;">${grp.name}</div>
                                        <div style="font-size: 0.75rem; color: var(--text-muted);">${grp.memberIds.length} anggota</div>
                                    </div>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div style="margin-top: 20px; padding: 16px; background: #eef2ff; border-radius: 8px; text-align: center;">
                        <span style="display: block; font-size: 0.75rem; color: var(--primary); font-weight: 600;">Estimasi Penerima</span>
                        <span id="broadcast-recipient-count" style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">0 Mahasiswa</span>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
        setupBroadcastLogic();
    }

    function setupBroadcastLogic() {
        const selectTpl = document.getElementById('broadcast-template-select');
        selectTpl.onchange = (e) => {
            const tpl = mockData.templates.find(t => t.id === e.target.value);
            document.getElementById('broadcast-title').value = tpl ? tpl.name : '';
            document.getElementById('broadcast-message').value = tpl ? tpl.content : '';
        };

        const updateCount = () => {
            const filterTab = document.getElementById('broadcast-tab-filter');
            const isFilter = filterTab && filterTab.style.display !== 'none';

            let recipients = [];
            if (isFilter) {
                const faculty = document.getElementById('bc-faculty').value;
                const mode = document.getElementById('bc-mode').value;
                const category = document.getElementById('bc-category').value;
                const semester = document.getElementById('bc-semester').value;
                recipients = mockData.students.filter(s => {
                    return (faculty === 'all' || s.faculty === faculty)
                        && (mode === 'all' || s.learningMode === mode)
                        && (category === 'all' || s.classType === category)
                        && (semester === 'all' || s.semester.toString() === semester);
                });
            } else {
                const checked = [...document.querySelectorAll('.bc-group-check:checked')].map(el => el.value);
                const allIds = new Set();
                checked.forEach(gid => {
                    const grp = mockData.groups.find(g => g.id === gid);
                    if (grp) grp.memberIds.forEach(id => allIds.add(id));
                });
                recipients = mockData.students.filter(s => allIds.has(s.id));
            }

            document.getElementById('broadcast-recipient-count').textContent = `${recipients.length} Mahasiswa`;
        };

        ['bc-faculty', 'bc-mode', 'bc-category', 'bc-semester'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', updateCount);
        });

        document.querySelectorAll('.bc-group-check').forEach(el => el.addEventListener('change', updateCount));
        updateCount();

        document.getElementById('btn-send-broadcast').onclick = () => {
            const count = document.getElementById('broadcast-recipient-count').textContent;
            const title = document.getElementById('broadcast-title').value || '(tanpa judul)';
            if (count === '0 Mahasiswa') { alert('Tidak ada penerima. Periksa filter atau pilih grup terlebih dahulu.'); return; }
            alert(`Broadcast "${title}" berhasil dikirim ke ${count}!`);
        };

        // Save Draft
        document.getElementById('btn-save-draft').onclick = () => {
            const title = document.getElementById('broadcast-title').value.trim();
            const content = document.getElementById('broadcast-message').value.trim();
            if (!title && !content) { alert('Isi judul atau pesan terlebih dahulu.'); return; }

            const newDraft = {
                id: `DRT${Date.now()}`,
                title: title || '(tanpa judul)',
                content: content || '(kosong)',
                createdAt: new Date().toISOString()
            };
            mockData.broadcastDrafts.push(newDraft);

            document.getElementById('broadcast-title').value = '';
            document.getElementById('broadcast-message').value = '';

            renderBroadcastDrafts();
            document.getElementById('broadcast-drafts-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        renderBroadcastDrafts();
    }

    function renderBroadcastDrafts() {
        const container = document.getElementById('broadcast-drafts-list');
        if (!container) return;

        const drafts = mockData.broadcastDrafts;
        if (drafts.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem; text-align: center; padding: 20px;">Belum ada draft tersimpan.</p>';
            return;
        }

        container.innerHTML = drafts.map(d => `
            <div class="card" style="padding: 16px; cursor: pointer;" onclick="loadDraft('${d.id}')">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                    <strong style="font-size: 0.875rem;">${d.title}</strong>
                    <button class="btn btn-icon btn-sm" onclick="event.stopPropagation(); deleteDraft('${d.id}')" style="color:var(--danger); flex-shrink:0;">
                        <i data-lucide="trash-2" style="width:14px;"></i>
                    </button>
                </div>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${d.content}</p>
                <span style="font-size: 0.7rem; color: var(--text-muted);">${new Date(d.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `).join('');
        lucide.createIcons();
    }

    window.loadDraft = (draftId) => {
        const d = mockData.broadcastDrafts.find(d => d.id === draftId);
        if (!d) return;
        document.getElementById('broadcast-title').value = d.title === '(tanpa judul)' ? '' : d.title;
        document.getElementById('broadcast-message').value = d.content === '(kosong)' ? '' : d.content;
        document.getElementById('broadcast-drafts-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.deleteDraft = (draftId) => {
        if (!confirm('Hapus draft ini?')) return;
        mockData.broadcastDrafts = mockData.broadcastDrafts.filter(d => d.id !== draftId);
        renderBroadcastDrafts();
    };

    window.switchBroadcastTab = (tab) => {
        document.getElementById('broadcast-tab-filter').style.display = tab === 'filter' ? 'block' : 'none';
        document.getElementById('broadcast-tab-group').style.display = tab === 'group' ? 'block' : 'none';
        document.getElementById('tab-filter').classList.toggle('active', tab === 'filter');
        document.getElementById('tab-group').classList.toggle('active', tab === 'group');

        const countEl = document.getElementById('broadcast-recipient-count');
        if (tab === 'filter') {
            const total = mockData.students.length;
            countEl.textContent = `${total} Mahasiswa`;
        } else {
            countEl.textContent = '0 Mahasiswa';
        }
    };

    function renderAnalytics() {
        viewContainer.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <h3>Upload Feedback Mahasiswa (CSV)</h3>
                <div style="margin-top: 20px; border: 2px dashed var(--border-color); padding: 40px; border-radius: 12px; text-align: center;">
                    <i data-lucide="upload-cloud" style="width: 48px; height: 48px; color: var(--text-muted); margin-bottom: 12px;"></i>
                    <p>Drag and drop file CSV di sini, atau klik untuk memilih file.</p>
                    <button class="btn btn-outline" style="margin-top: 16px;">Pilih File</button>
                </div>
            </div>
            <div class="grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;">
                <div class="card">
                    <h3>AI Summary</h3>
                    <div style="margin-top: 16px; display: flex; flex-direction: column; gap: 12px;">
                        <div style="padding: 12px; background: #f0fdf4; border-left: 4px solid var(--success); font-size: 0.875rem;">
                            <strong>Top Positive:</strong> Pelayanan administrasi Fakultas Ekonomi sangat responsif dan membantu.
                        </div>
                        <div style="padding: 12px; background: #fef2f2; border-left: 4px solid var(--danger); font-size: 0.875rem;">
                            <strong>Top Complaint:</strong> Sering terjadi kendala saat login SIAKAD di jam sibuk pengisian KRS.
                        </div>
                        <div style="padding: 12px; background: #eff6ff; border-left: 4px solid var(--info); font-size: 0.875rem;">
                            <strong>Recommendation:</strong> Menambah server capacity saat masa KRS dan memperbaiki UI mobile.
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Keyword Frequency</h3>
                    <div style="margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 1rem; padding: 8px 16px;">SIAKAD</span>
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 0.875rem; padding: 6px 12px;">KRS</span>
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 1.25rem; padding: 10px 20px;">Lama</span>
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 0.75rem; padding: 4px 8px;">Dosen</span>
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 1.1rem; padding: 8px 16px;">Error</span>
                        <span class="badge" style="background: #e2e8f0; color: #1e293b; font-size: 0.9rem; padding: 6px 12px;">Bantu</span>
                    </div>
                </div>
            </div>

            <div class="card" style="margin-top: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Riwayat Feedback</h3>
                    <select id="feedback-history-filter" class="form-control" style="width: 180px; padding: 6px 10px;">
                        <option value="all">Semua Periode</option>
                        <option value="7">7 Hari Terakhir</option>
                        <option value="30" selected>30 Hari Terakhir</option>
                        <option value="90">90 Hari Terakhir</option>
                    </select>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Sumber</th>
                                <th>Sentimen</th>
                                <th>Topik</th>
                                <th>Ringkasan</th>
                            </tr>
                        </thead>
                        <tbody id="feedback-history-body">
                            <tr>
                                <td style="font-size: 0.8125rem;">12 Jun 2026</td>
                                <td><span class="badge" style="background: #dbeafe; color: #1e40af;">WhatsApp</span></td>
                                <td><span class="badge badge-high">Negatif</span></td>
                                <td style="font-size: 0.8125rem;">SIAKAD</td>
                                <td style="font-size: 0.8125rem;">Login error saat KRS, tidak bisa akses selama 2 jam</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">11 Jun 2026</td>
                                <td><span class="badge" style="background: #dcfce7; color: #166534;">Survey</span></td>
                                <td><span class="badge badge-low">Positif</span></td>
                                <td style="font-size: 0.8125rem;">Akademik</td>
                                <td style="font-size: 0.8125rem;">Dosen pembimbing sangat membantu dalam bimbingan skripsi</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">10 Jun 2026</td>
                                <td><span class="badge" style="background: #dbeafe; color: #1e40af;">WhatsApp</span></td>
                                <td><span class="badge badge-medium">Netral</span></td>
                                <td style="font-size: 0.8125rem;">Fasilitas</td>
                                <td style="font-size: 0.8125rem;">Perpustakaan sudah bagus, tapi perlu tambah ruang diskusi</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">09 Jun 2026</td>
                                <td><span class="badge" style="background: #fef9c3; color: #854d0e;">Chatbot</span></td>
                                <td><span class="badge badge-high">Negatif</span></td>
                                <td style="font-size: 0.8125rem;">Administrasi</td>
                                <td style="font-size: 0.8125rem;">Proses verifikasi KTM lambat, sudah 2 minggu belum selesai</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">08 Jun 2026</td>
                                <td><span class="badge" style="background: #dcfce7; color: #166534;">Survey</span></td>
                                <td><span class="badge badge-low">Positif</span></td>
                                <td style="font-size: 0.8125rem;">Pembelajaran</td>
                                <td style="font-size: 0.8125rem;">Kelas online sudah lebih stabil dibanding semester lalu</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">06 Jun 2026</td>
                                <td><span class="badge" style="background: #dbeafe; color: #1e40af;">WhatsApp</span></td>
                                <td><span class="badge badge-high">Negatif</span></td>
                                <td style="font-size: 0.8125rem;">Keuangan</td>
                                <td style="font-size: 0.8125rem;">Pembayaran UKT gagal tapi saldo sudah terpotong</td>
                            </tr>
                            <tr>
                                <td style="font-size: 0.8125rem;">05 Jun 2026</td>
                                <td><span class="badge" style="background: #fef9c3; color: #854d0e;">Chatbot</span></td>
                                <td><span class="badge badge-medium">Netral</span></td>
                                <td style="font-size: 0.8125rem;">KRS</td>
                                <td style="font-size: 0.8125rem;">Ingin tahu jadwal perubahan KRS untuk semester depan</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
                    <span style="font-size: 0.8125rem; color: var(--text-muted);">Menampilkan 7 dari 142 feedback</span>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-outline btn-sm" disabled>Sebelumnya</button>
                        <button class="btn btn-outline btn-sm">Selanjutnya</button>
                    </div>
                </div>
            </div>
        `;
        lucide.createIcons();
    }


    // ===== HELPER: Group Member Tags =====
    function renderGroupMemberTags() {
        const container = document.getElementById('group-member-tags');
        const countEl = document.getElementById('member-count');
        if (!container) return;
        countEl.textContent = groupModalMembers.length;
        if (groupModalMembers.length === 0) {
            container.innerHTML = `<span style="color: var(--text-muted); font-size: 0.8125rem;">Belum ada anggota ditambahkan.</span>`;
            return;
        }
        container.innerHTML = groupModalMembers.map(id => {
            const s = mockData.students.find(st => st.id === id);
            if (!s) return '';
            return `<span class="group-member-tag">
                ${s.name} <span style="opacity:0.6;">(${s.nim})</span>
                <button onclick="removeGroupMember('${s.id}')" title="Hapus">✕</button>
            </span>`;
        }).join('');
    }

    function setupGroupMemberSearch() {
        const input = document.getElementById('group-member-search');
        const results = document.getElementById('group-search-results');
        if (!input) return;

        input.addEventListener('input', () => {
            const q = input.value.trim().toLowerCase();
            if (!q) { results.innerHTML = ''; return; }

            const matched = mockData.students.filter(s =>
                s.name.toLowerCase().includes(q) || s.nim.includes(q)
            ).slice(0, 6);

            if (matched.length === 0) {
                results.innerHTML = `<div class="search-results-dropdown"><div class="search-result-item" style="color:var(--text-muted);">Tidak ditemukan.</div></div>`;
                return;
            }

            results.innerHTML = `<div class="search-results-dropdown">
                ${matched.map(s => {
                const added = groupModalMembers.includes(s.id);
                return `<div class="search-result-item ${added ? 'already-added' : ''}"
                        onclick="${added ? '' : `addGroupMember('${s.id}')`}"
                        style="${added ? '' : 'cursor:pointer;'}">
                        <strong>${s.name}</strong> <span style="color:var(--text-muted);">${s.nim} · ${s.major}</span>
                        ${added ? '<span style="float:right;color:var(--success);font-size:0.75rem;">✓ Sudah ditambahkan</span>' : ''}
                    </div>`;
            }).join('')}
            </div>`;
        });
    }

    window.addGroupMember = (studentId) => {
        if (!groupModalMembers.includes(studentId)) {
            groupModalMembers.push(studentId);
            renderGroupMemberTags();
            // refresh search results to show already-added state
            const input = document.getElementById('group-member-search');
            if (input) input.dispatchEvent(new Event('input'));
        }
    };

    // ===== FEATURE 8: GROUP MANAGER =====
    function renderGroups() {
        const groups = mockData.groups;

        viewContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                <p style="color: var(--text-muted);">Kelola grup mahasiswa lintas jurusan untuk segmentasi broadcast.</p>
                <button class="btn btn-primary" onclick="openGroupModal()">
                    <i data-lucide="plus"></i> Buat Grup Baru
                </button>
            </div>

            <div id="group-list" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                ${renderGroupCards(groups)}
            </div>
        `;
        lucide.createIcons();
        setupGroupSaveBtn();
    }

    function renderGroupCards(groups) {
        if (groups.length === 0) {
            return `<div class="card" style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted);">
                Belum ada grup. Klik "Buat Grup Baru" untuk memulai.
            </div>`;
        }
        return groups.map(grp => {
            const members = grp.memberIds.map(id => mockData.students.find(s => s.id === id)).filter(Boolean);
            return `
                <div class="card">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div>
                            <h3 style="font-size: 1rem; margin-bottom: 4px;">${grp.name}</h3>
                            <p style="font-size: 0.8125rem; color: var(--text-muted);">${grp.description || '—'}</p>
                        </div>
                        <div style="display: flex; gap: 6px; flex-shrink: 0; margin-left: 12px;">
                            <button class="btn btn-icon btn-sm" onclick="openGroupModal('${grp.id}')" title="Edit">
                                <i data-lucide="edit-2" style="width:15px;"></i>
                            </button>
                            <button class="btn btn-icon btn-sm" onclick="deleteGroup('${grp.id}')" title="Hapus" style="color:var(--danger);">
                                <i data-lucide="trash-2" style="width:15px;"></i>
                            </button>
                        </div>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 12px;">
                        ${members.slice(0, 4).map(s => `
                            <span style="background:#f3f4f6; padding:3px 8px; border-radius:12px; font-size:0.75rem;">${s.name}</span>
                        `).join('')}
                        ${members.length > 4 ? `<span style="background:#eef2ff; color:var(--primary); padding:3px 8px; border-radius:12px; font-size:0.75rem;">+${members.length - 4} lainnya</span>` : ''}
                    </div>
                    <div style="border-top: 1px solid var(--border-color); padding-top: 12px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.8125rem; color: var(--text-muted);">
                            <strong style="color:var(--text-main);">${members.length}</strong> anggota
                        </span>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">${new Date(grp.createdAt).toLocaleDateString('id-ID')}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    function setupGroupSaveBtn() {
        const btn = document.getElementById('btn-save-group');
        if (!btn) return;
        btn.onclick = () => {
            const name = document.getElementById('group-name').value.trim();
            const desc = document.getElementById('group-desc').value.trim();
            const editId = document.getElementById('group-edit-id').value;

            if (!name) { alert('Nama grup wajib diisi.'); return; }

            if (editId) {
                const grp = mockData.groups.find(g => g.id === editId);
                if (grp) {
                    grp.name = name;
                    grp.description = desc;
                    grp.memberIds = [...groupModalMembers];
                }
            } else {
                mockData.groups.push({
                    id: `GRP${Date.now()}`,
                    name,
                    description: desc,
                    memberIds: [...groupModalMembers],
                    createdAt: new Date().toISOString()
                });
            }

            closeGroupModal();
            renderGroups();
        };
    }

    window.deleteGroup = (groupId) => {
        if (!confirm('Hapus grup ini? Mahasiswa tidak akan terhapus.')) return;
        mockData.groups = mockData.groups.filter(g => g.id !== groupId);
        document.getElementById('group-list').innerHTML = renderGroupCards(mockData.groups);
        lucide.createIcons();
    };

    // ===== FEATURE 9: KNOWLEDGE BASE MANAGER =====
    function renderKnowledgeBase() {
        viewContainer.innerHTML = `
            <div class="card" style="margin-bottom: 24px;">
                <h3 style="margin-bottom: 16px;">Upload Dokumen Baru</h3>
                <div class="upload-zone" id="upload-zone">
                    <i data-lucide="upload-cloud" style="width: 40px; height: 40px; color: var(--text-muted); margin-bottom: 12px;"></i>
                    <p style="font-weight: 500; margin-bottom: 4px;">Drag & drop file di sini, atau klik untuk memilih</p>
                    <p style="font-size: 0.8125rem; color: var(--text-muted);">Didukung: PDF, DOCX, XLSX, TXT, CSV</p>
                    <input type="file" id="kb-file-input" accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.csv" style="display:none;">
                    <button class="btn btn-outline" style="margin-top: 16px;" onclick="document.getElementById('kb-file-input').click()">Pilih File</button>
                </div>
                <div id="upload-preview" style="display:none; margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p id="upload-filename" style="font-weight: 600; font-size: 0.875rem;"></p>
                            <p id="upload-filesize" style="font-size: 0.75rem; color: var(--text-muted);"></p>
                        </div>
                        <button class="btn btn-primary btn-sm" id="btn-do-upload">Upload & Proses</button>
                    </div>
                </div>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h3>Dokumen Aktif (<span id="doc-count">${mockData.knowledgeBaseDocs.length}</span>)</h3>
                </div>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Dokumen</th>
                                <th>Tipe</th>
                                <th>Ukuran</th>
                                <th>Tanggal Upload</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="kb-table-body">
                            ${renderKBRows(mockData.knowledgeBaseDocs)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        lucide.createIcons();
        setupKBUpload();
    }

    function renderKBRows(docs) {
        if (docs.length === 0) {
            return `<tr><td colspan="6" style="text-align:center; padding:40px; color:var(--text-muted);">Belum ada dokumen. Upload dokumen untuk memulai.</td></tr>`;
        }
        return docs.map(doc => {
            const date = new Date(doc.uploadedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
            const statusHtml = doc.status === 'active'
                ? `<span><span class="status-dot status-dot-active"></span>Aktif</span>`
                : doc.status === 'processing'
                    ? `<span><span class="status-dot status-dot-processing"></span>Diproses...</span>`
                    : `<span><span class="status-dot status-dot-error"></span>Error</span>`;

            return `
                <tr>
                    <td>
                        <div style="font-weight: 600;">${doc.title}</div>
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${doc.fileName}</div>
                    </td>
                    <td><span class="file-type-badge file-type-${doc.fileType}">${doc.fileType}</span></td>
                    <td style="font-size:0.8125rem;">${doc.fileSize}</td>
                    <td style="font-size:0.8125rem;">${date}</td>
                    <td style="font-size:0.8125rem;">${statusHtml}</td>
                    <td>
                        <button class="btn btn-icon btn-sm" onclick="deleteKBDoc('${doc.id}')" title="Hapus" style="color:var(--danger);">
                            <i data-lucide="trash-2" style="width:15px;"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function setupKBUpload() {
        const zone = document.getElementById('upload-zone');
        const input = document.getElementById('kb-file-input');
        const preview = document.getElementById('upload-preview');
        let selectedFile = null;

        const showPreview = (file) => {
            selectedFile = file;
            document.getElementById('upload-filename').textContent = file.name;
            document.getElementById('upload-filesize').textContent = `${(file.size / 1024).toFixed(1)} KB`;
            preview.style.display = 'block';
        };

        zone.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') input.click();
        });

        zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag-over'); });
        zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            if (e.dataTransfer.files[0]) showPreview(e.dataTransfer.files[0]);
        });

        input.addEventListener('change', () => {
            if (input.files[0]) showPreview(input.files[0]);
        });

        document.getElementById('btn-do-upload').addEventListener('click', () => {
            if (!selectedFile) return;
            const ext = selectedFile.name.split('.').pop().toLowerCase();
            const allowed = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv'];
            if (!allowed.includes(ext)) { alert('Format file tidak didukung.'); return; }

            const newDoc = {
                id: `DOC${Date.now()}`,
                title: selectedFile.name.replace(/\.[^.]+$/, ''),
                fileName: selectedFile.name,
                fileType: ext === 'doc' ? 'docx' : ext === 'xls' ? 'xlsx' : ext,
                fileSize: `${(selectedFile.size / 1024).toFixed(1)} KB`,
                uploadedAt: new Date().toISOString(),
                status: 'processing'
            };

            mockData.knowledgeBaseDocs.unshift(newDoc);
            document.getElementById('kb-table-body').innerHTML = renderKBRows(mockData.knowledgeBaseDocs);
            document.getElementById('doc-count').textContent = mockData.knowledgeBaseDocs.length;
            preview.style.display = 'none';
            selectedFile = null;
            input.value = '';
            lucide.createIcons();

            // Simulate processing → active after 3s
            setTimeout(() => {
                const doc = mockData.knowledgeBaseDocs.find(d => d.id === newDoc.id);
                if (doc) {
                    doc.status = 'active';
                    const tbody = document.getElementById('kb-table-body');
                    if (tbody) {
                        tbody.innerHTML = renderKBRows(mockData.knowledgeBaseDocs);
                        lucide.createIcons();
                    }
                }
            }, 3000);
        });
    }

    window.deleteKBDoc = (docId) => {
        if (!confirm('Hapus dokumen ini dari Knowledge Base? AI Bot tidak akan lagi menggunakan dokumen ini.')) return;
        mockData.knowledgeBaseDocs = mockData.knowledgeBaseDocs.filter(d => d.id !== docId);
        const tbody = document.getElementById('kb-table-body');
        const countEl = document.getElementById('doc-count');
        if (tbody) tbody.innerHTML = renderKBRows(mockData.knowledgeBaseDocs);
        if (countEl) countEl.textContent = mockData.knowledgeBaseDocs.length;
        lucide.createIcons();
    };

});
