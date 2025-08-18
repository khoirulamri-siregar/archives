document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    const allContentContainers = document.querySelectorAll('.content-container');
    const bugListContainer = document.getElementById('bug-list-container');
    const roadmapContainer = document.querySelector('.roadmap-container');
    const toolsContainer = document.querySelector('.tools-list-container');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    let currentLanguage = 'id';
    const translations = {
        'id': {
            home: 'Halaman Awal',
            bugList: 'Daftar Jenis Bug',
            roadmap: 'Peta Jalan Belajar',
            tools: '15 Tools Populer',
            theme: 'Mode:',
            lang: 'Bahasa:',
            welcomeTitle: 'Red Team Archives',
            welcomeSubtitle: 'Perpustakaan pribadi tentang bug dan teknik keamanan.',
            bugListHeader: 'Daftar Jenis Bug',
            searchPlaceholder: 'Cari bug...',
            roadmapHeader: 'Peta Jalan Belajar',
            toolsHeader: '15 Tools Populer',
            modul: 'Modul:',
            intro: 'Pengantar: Apa Itu',
            whatis: 'Apa Itu',
            howitworks: 'Cara Kerja dan Dampak',
            exploitation: 'Teknik Eksploitasi (Langkah Praktis)',
            identify: 'Mengidentifikasi',
            payload: 'Payload Eksploitasi:',
            mitigation: 'Mitigasi dan Pencegahan',
            forDev: 'Untuk Pengembang Web:',
            sqliDesc: 'Menyuntikkan kode SQL berbahaya ke database.',
            xssDesc: 'Menyuntikkan skrip ke browser pengguna lain.',
            lfiDesc: 'Membaca file sensitif dari server.',
            rceDesc: 'Mengeksekusi perintah di server dari jarak jauh.',
            csrfDesc: 'Memaksa pengguna mengirim permintaan yang tidak disengaja.',
            ssrfDesc: 'Memaksa server mengakses URL internal.',
            idorDesc: 'Mengakses data pengguna lain dengan manipulasi ID.',
            authBypassDesc: 'Melewati proses login untuk mendapatkan akses.',
            fileUploadDesc: 'Mengunggah file berbahaya untuk mengambil alih server.',
            cmdInjectionDesc: 'Menjalankan perintah OS melalui input yang tidak divalidasi.',
            openRedirectDesc: 'Mengarahkan pengguna ke situs berbahaya.',
            brokenACDesc: 'Mengakses fitur terbatas untuk role tertentu.',
            infoDisclosureDesc: 'Mengungkap data sensitif secara tidak sengaja.',
            misconfigDesc: 'Kesalahan konfigurasi yang menyebabkan celah.',
            xxeDesc: 'Memanfaatkan kelemahan pada parser XML.',
            beginnerLevel: 'Tingkat Dasar (Basic)',
            intermediateLevel: 'Tingkat Menengah (Intermediate)',
            advancedLevel: 'Tingkat Lanjut (Advanced)',
        },
        'en': {
            home: 'Home',
            bugList: 'Bug Types List',
            roadmap: 'Learning Roadmap',
            tools: '15 Popular Tools',
            theme: 'Mode:',
            lang: 'Language:',
            welcomeTitle: 'Red Team Archives',
            welcomeSubtitle: 'A personal library of security bugs and techniques.',
            bugListHeader: 'Bug Types List',
            searchPlaceholder: 'Search bugs...',
            roadmapHeader: 'Learning Roadmap',
            toolsHeader: '15 Popular Tools',
            modul: 'Module:',
            intro: 'Introduction: What is',
            whatis: 'What is',
            howitworks: 'How it Works and Impact',
            exploitation: 'Exploitation Techniques (Practical Steps)',
            identify: 'Identifying',
            payload: 'Exploitation Payload:',
            mitigation: 'Mitigation and Prevention',
            forDev: 'For Web Developers:',
            sqliDesc: 'Injecting malicious SQL code into the database.',
            xssDesc: 'Injecting scripts into other users\' browsers.',
            lfiDesc: 'Reading sensitive files from the server.',
            rceDesc: 'Executing commands on the server remotely.',
            csrfDesc: 'Forcing a user to submit an unintentional request.',
            ssrfDesc: 'Forcing the server to access an internal URL.',
            idorDesc: 'Accessing other users\' data by manipulating IDs.',
            authBypassDesc: 'Bypassing the login process to gain access.',
            fileUploadDesc: 'Uploading a malicious file to take over the server.',
            cmdInjectionDesc: 'Running OS commands via unvalidated input.',
            openRedirectDesc: 'Redirecting users to a malicious site.',
            brokenACDesc: 'Accessing restricted features for certain roles.',
            infoDisclosureDesc: 'Accidentally revealing sensitive data.',
            misconfigDesc: 'A misconfiguration that causes a vulnerability.',
            xxeDesc: 'Exploiting weaknesses in an XML parser.',
            beginnerLevel: 'Beginner Level',
            intermediateLevel: 'Intermediate Level',
            advancedLevel: 'Advanced Level',
        }
    };

    const bugsData = [
        { id: 'sqli', title: 'SQL Injection (SQLi)', description: translations.id.sqliDesc, icon: 'SQL' },
        { id: 'xss', title: 'Cross-Site Scripting (XSS)', description: translations.id.xssDesc, icon: '💻' },
        { id: 'lfi', title: 'Local File Inclusion (LFI)', description: translations.id.lfiDesc, icon: '📁' },
        { id: 'rce', title: 'Remote Code Execution (RCE)', description: translations.id.rceDesc, icon: '🔥' },
        { id: 'csrf', title: 'Cross-Site Request Forgery (CSRF)', description: translations.id.csrfDesc, icon: '🔗' },
        { id: 'ssrf', title: 'Server-Side Request Forgery (SSRF)', description: translations.id.ssrfDesc, icon: '🌐' },
        { id: 'idor', title: 'Insecure Direct Object Reference (IDOR)', description: translations.id.idorDesc, icon: '🔑' },
        { id: 'auth-bypass', title: 'Authentication Bypass', description: translations.id.authBypassDesc, icon: '🔓' },
        { id: 'file-upload', title: 'File Upload Vulnerability', description: translations.id.fileUploadDesc, icon: '📤' },
        { id: 'cmd-injection', title: 'Command Injection', description: translations.id.cmdInjectionDesc, icon: '▶️' },
        { id: 'open-redirect', title: 'Open Redirect', description: translations.id.openRedirectDesc, icon: '➡️' },
        { id: 'broken-ac', title: 'Broken Access Control', description: translations.id.brokenACDesc, icon: '🛑' },
        { id: 'info-disclosure', title: 'Information Disclosure', description: translations.id.infoDisclosureDesc, icon: '📜' },
        { id: 'misconfig', title: 'Security Misconfiguration', description: translations.id.misconfigDesc, icon: '⚙️' },
        { id: 'xxe', title: 'XML External Entity (XXE)', description: translations.id.xxeDesc, icon: 'XML' }
    ];

    const roadmapData = [
        { level: translations.id.beginnerLevel, bugs: ['xss', 'csrf', 'idor'] },
        { level: translations.id.intermediateLevel, bugs: ['sqli', 'lfi', 'ssrf'] },
        { level: translations.id.advancedLevel, bugs: ['rce', 'file-upload', 'cmd-injection'] }
    ];

    const toolsData = [
        { name: 'Burp Suite', description: 'Alat proxy untuk menguji keamanan aplikasi web.', icon: '🕷️' },
        { name: 'OWASP ZAP', description: 'Alat pemindai keamanan web gratis dan *open-source*.', icon: '⚡' },
        { name: 'Nmap', description: 'Pemindai port dan pencari celah di jaringan.', icon: '📡' },
        { name: 'Metasploit', description: 'Platform untuk menguji dan mengeksploitasi kerentanan.', icon: '💣' },
        { name: 'Sublist3r', description: 'Untuk menemukan subdomain suatu situs web.', icon: '🔍' },
        { name: 'Dirb / Dirbuster', description: 'Untuk menemukan direktori dan file tersembunyi.', icon: '📁' },
        { name: 'SQLmap', description: 'Alat otomatisasi untuk mendeteksi dan mengeksploitasi SQLi.', icon: '🤖' },
        { name: 'Wireshark', description: 'Penganalisis protokol jaringan.', icon: '🌐' },
        { name: 'Hydra', description: 'Alat *brute-force* untuk menebak kata sandi.', icon: '🔑' },
        { name: 'Nessus', description: 'Pemindai kerentanan komersial.', icon: '🛡️' },
        { name: 'John the Ripper', description: 'Alat *password cracker* cepat.', icon: '🪓' },
        { name: 'Aircrack-ng', description: 'Tools untuk menguji keamanan jaringan nirkabel.', icon: '📶' },
        { name: 'Hashcat', description: 'Alat pemulihan kata sandi yang canggih.', icon: '⚙️' },
        { name: 'Gobuster', description: 'Alat cepat untuk *directory busting*.', icon: '🏃' },
        { name: 'Shodan', description: 'Mesin pencari untuk perangkat dan layanan yang terhubung ke internet.', icon: '🕵️' }
    ];

    const toolsDataEN = [
        { name: 'Burp Suite', description: 'A proxy tool for web application security testing.', icon: '🕷️' },
        { name: 'OWASP ZAP', description: 'A free and open-source web security scanner.', icon: '⚡' },
        { name: 'Nmap', description: 'A network port scanner and vulnerability finder.', icon: '📡' },
        { name: 'Metasploit', description: 'A platform for testing and exploiting vulnerabilities.', icon: '💣' },
        { name: 'Sublist3r', description: 'For finding subdomains of a website.', icon: '🔍' },
        { name: 'Dirb / Dirbuster', description: 'For finding hidden directories and files.', icon: '📁' },
        { name: 'SQLmap', description: 'An automated tool for detecting and exploiting SQLi.', icon: '🤖' },
        { name: 'Wireshark', description: 'A network protocol analyzer.', icon: '🌐' },
        { name: 'Hydra', description: 'A brute-force tool for guessing passwords.', icon: '🔑' },
        { name: 'Nessus', description: 'A commercial vulnerability scanner.', icon: '🛡️' },
        { name: 'John the Ripper', description: 'A fast password cracker tool.', icon: '🪓' },
        { name: 'Aircrack-ng', description: 'Tools for testing wireless network security.', icon: '📶' },
        { name: 'Hashcat', description: 'An advanced password recovery tool.', icon: '⚙️' },
        { name: 'Gobuster', description: 'A fast tool for directory busting.', icon: '🏃' },
        { name: 'Shodan', description: 'A search engine for internet-connected devices and services.', icon: '🕵️' }
    ];

    function updateLanguage(lang) {
        currentLanguage = lang;
        const langData = translations[lang];

        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            element.textContent = langData[key];
        });

        populateBugList();
        populateRoadmap();
        populateToolsList();
        updateCurrentModuleContent();

        searchInput.placeholder = langData.searchPlaceholder;
    }

    function updateCurrentModuleContent() {
        const activeContainer = document.querySelector('.content-container.active');
        if (activeContainer) {
            const id = activeContainer.id.replace('content-', '');
            if (bugsData.find(bug => bug.id === id)) {
                document.getElementById(`content-${id}`).innerHTML = getBugModuleContent(id);
            }
        }
    }

    function populateBugList() {
        bugListContainer.innerHTML = '';
        bugsData.forEach(bug => {
            const bugCard = document.createElement('div');
            bugCard.className = 'bug-card';
            bugCard.onclick = () => showBugModule(bug.id);
            bugCard.setAttribute('data-category', bug.title);
            const desc = currentLanguage === 'id' ? translations.id[`${bug.id}Desc`] : translations.en[`${bug.id}Desc`];
            bugCard.innerHTML = `
                <div class="bug-card-title"><span class="icon">${bug.icon}</span> ${bug.title}</div>
                <p class="bug-card-description">${desc}</p>
            `;
            bugListContainer.appendChild(bugCard);
        });
    }

    function populateRoadmap() {
        roadmapContainer.innerHTML = '';
        roadmapData.forEach(level => {
            const roadmapSection = document.createElement('div');
            roadmapSection.className = 'roadmap-section';
            const levelText = currentLanguage === 'id' ? level.level : translations.en[`${level.bugs[0]}Level`];
            roadmapSection.innerHTML = `<h3>${levelText}</h3><div class="roadmap-level"></div>`;
            const roadmapLevel = roadmapSection.querySelector('.roadmap-level');

            level.bugs.forEach(bugId => {
                const bug = bugsData.find(b => b.id === bugId);
                const roadmapCard = document.createElement('div');
                roadmapCard.className = 'roadmap-card';
                roadmapCard.onclick = () => showBugModule(bug.id);
                const desc = currentLanguage === 'id' ? translations.id[`${bug.id}Desc`] : translations.en[`${bug.id}Desc`];
                roadmapCard.innerHTML = `
                    <div class="card-icon">${bug.icon}</div>
                    <div class="card-content">
                        <h4>${bug.title}</h4>
                        <p>${desc}</p>
                    </div>
                `;
                roadmapLevel.appendChild(roadmapCard);
            });
            roadmapContainer.appendChild(roadmapSection);
        });
    }

    function populateToolsList() {
        toolsContainer.innerHTML = '';
        const tools = currentLanguage === 'id' ? toolsData : toolsDataEN;
        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-card-icon">${tool.icon}</div>
                <h4>${tool.name}</h4>
                <p>${tool.description}</p>
            `;
            toolsContainer.appendChild(toolCard);
        });
    }

    function getBugModuleContent(bugId) {
        const lang = currentLanguage;
        const texts = translations[lang];
        const bug = bugsData.find(b => b.id === bugId);

        let content = '';
        const moduleHeader = `
            <div class="content-header">
                <h2>${texts.modul} ${bug.title}</h2>
            </div>
        `;

        switch (bugId) {
            case 'sqli':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</
