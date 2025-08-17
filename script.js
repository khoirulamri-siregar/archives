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

    // Updated data for English translations
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

        // Update dynamic content
        populateBugList();
        populateRoadmap();
        populateToolsList();
        updateCurrentModuleContent();

        // Update search placeholder
        searchInput.placeholder = langData.searchPlaceholder;
    }

    function updateCurrentModuleContent() {
        const activeContainer = document.querySelector('.content-container.active');
        if (activeContainer) {
            const id = activeContainer.id.replace('content-', '');
            if (bugsData.find(bug => bug.id === id)) {
                // Re-render the module with the new language
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

    // --- Bug Modules Content Functions (semua materi ada di sini) ---
    function getBugModuleContent(bugId) {
        const lang = currentLanguage;
        const texts = translations[lang];
        const bug = bugsData.find(b => b.id === bugId);

        let content = '';
        // Perbaikan: Hapus tombol menu dari dalam modul
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
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>SQL Injection (SQLi)</strong> ${lang === 'id' ? 'adalah teknik serangan yang menyuntikkan kode SQL berbahaya melalui input aplikasi. Tujuannya adalah untuk memanipulasi basis data (database) agar melakukan perintah yang tidak seharusnya.' : 'is an attack technique that injects malicious SQL code through application input. Its purpose is to manipulate the database to perform unintended commands.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Ketika aplikasi web menerima input dari pengguna, ia sering kali langsung memasukkannya ke dalam kueri SQL. Jika tidak ada validasi, penyerang dapat menyisipkan kode SQL mereka sendiri.' : 'When a web application receives user input, it often directly includes it in an SQL query. Without validation, an attacker can insert their own SQL code.'}</p>
                        <p><strong>${lang === 'id' ? 'Dampak yang Ditimbulkan:' : 'Impact:'}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Pencurian Data:' : 'Data Theft:'}</strong> ${lang === 'id' ? 'Mengambil data sensitif.' : 'Stealing sensitive data.'}</li>
                        </ul>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} SQLi:</strong></p>
                        <p>${lang === 'id' ? 'Coba tambahkan karakter kutip tunggal (<code>\'</code>) di parameter URL. Jika halaman error, itu bisa jadi indikasi SQLi.' : 'Try adding a single quote character (<code>\'</code>) in the URL parameter. If the page throws an error, it could be an indication of SQLi.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>' OR 1=1--</code></pre>
                        <p>${lang === 'id' ? 'Payload ini akan selalu bernilai benar, digunakan untuk bypass login.' : 'This payload will always evaluate to true, used to bypass logins.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Prepared Statements:' : 'Use Prepared Statements:'}</strong> ${lang === 'id' ? 'Ini adalah metode paling efektif.' : 'This is the most effective method.'}</li>
                            <li><strong>${lang === 'id' ? 'Validasi Input:' : 'Validate Input:'}</strong> ${lang === 'id' ? 'Selalu periksa dan sanitasi input dari pengguna.' : 'Always check and sanitize user input.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'xss':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Cross-Site Scripting (XSS)</strong> ${lang === 'id' ? 'adalah kerentanan di mana penyerang menyuntikkan kode skrip berbahaya (biasanya JavaScript) ke dalam halaman web.' : 'is a vulnerability where an attacker injects malicious script code (usually JavaScript) into a web page.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Ada tiga jenis XSS: <strong>Reflected</strong>, <strong>Stored</strong>, dan <strong>DOM-based</strong>.' : 'There are three types of XSS: <strong>Reflected</strong>, <strong>Stored</strong>, and <strong>DOM-based</strong>.'}</p>
                        <p><strong>${lang === 'id' ? 'Dampak yang Ditimbulkan:' : 'Impact:'}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Pencurian Cookie Sesi:' : 'Session Cookie Theft:'}</strong> ${lang === 'id' ? 'Penyerang dapat membajak akun pengguna.' : 'Attackers can hijack user accounts.'}</li>
                        </ul>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} XSS:</strong></p>
                        <p>${lang === 'id' ? 'Cari fitur input seperti kolom pencarian atau komentar. Coba masukkan payload dasar seperti:' : 'Look for input features like search boxes or comments. Try entering a basic payload like:'}</p>
                        <pre><code>&lt;script&gt;alert('XSS')&lt;/script&gt;</code></pre>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>&lt;img src=x onerror=alert(document.cookie)&gt;</code></pre>
                        <p>${lang === 'id' ? 'Ini akan menampilkan cookie sesi pengguna.' : 'This will display the user\'s session cookie.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Output Encoding:' : 'Output Encoding:'}</strong> ${lang === 'id' ? 'Selalu enkode data yang dimasukkan pengguna.' : 'Always encode data entered by the user.'}</li>
                            <li><strong>Content Security Policy (CSP):</strong> ${lang === 'id' ? 'Gunakan header CSP untuk menginstruksikan browser agar hanya menjalankan skrip dari sumber terpercaya.' : 'Use a CSP header to instruct the browser to only execute scripts from trusted sources.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'lfi':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Local File Inclusion (LFI)</strong> ${lang === 'id' ? 'adalah kerentanan di mana penyerang dapat membaca file dari sistem lokal server melalui manipulasi input.' : 'is a vulnerability where an attacker can read files from the server\'s local system by manipulating input.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'LFI sering terjadi pada fungsi yang bertugas menyertakan file, seperti <code>include()</code> di PHP. Penyerang dapat menyisipkan nama file sistem (misalnya, <code>/etc/passwd</code>).' : 'LFI often occurs in functions that include files, such as <code>include()</code> in PHP. An attacker can insert a system file name (e.g., <code>/etc/passwd</code>).'}</p>
                        <p><strong>${lang === 'id' ? 'Dampak yang Ditimbulkan:' : 'Impact:'}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Pembacaan File Sensitif:' : 'Reading Sensitive Files:'}</strong> ${lang === 'id' ? 'Penyerang dapat membaca file konfigurasi atau data sensitif lainnya.' : 'Attackers can read configuration files or other sensitive data.'}</li>
                        </ul>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} LFI:</strong></p>
                        <p>${lang === 'id' ? 'Cari parameter URL seperti <code>page=</code>, <code>file=</code>, atau <code>halaman=</code>.' : 'Look for URL parameters like <code>page=</code>, <code>file=</code>, or <code>halaman=</code>.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>../../../../etc/passwd</code></pre>
                        <p>${lang === 'id' ? 'Payload ini akan mencoba keluar dari direktori web server dan membaca file <code>passwd</code>.' : 'This payload will try to exit the web server\'s directory and read the <code>passwd</code> file.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Whitelist:' : 'Use a Whitelist:'}</strong> ${lang === 'id' ? 'Buat daftar file yang diizinkan untuk diakses.' : 'Create a list of files that are allowed to be accessed.'}</li>
                            <li><strong>${lang === 'id' ? 'Validasi Input:' : 'Validate Input:'}</strong> ${lang === 'id' ? 'Hapus semua karakter yang tidak diinginkan dari input pengguna, seperti <code>..</code> atau <code>/</code>.' : 'Remove all unwanted characters from user input, such as <code>..</code> or <code>/</code>.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'rce':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Remote Code Execution (RCE)</strong> ${lang === 'id' ? 'adalah kerentanan keamanan paling parah di mana penyerang dapat mengeksekusi perintah di server dari jarak jauh. Ini memberikan penyerang kendali penuh atas server target.' : 'is the most severe security vulnerability where an attacker can execute commands on the server remotely. This gives the attacker full control over the target server.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'RCE terjadi ketika aplikasi web menjalankan input pengguna sebagai perintah sistem operasi atau kode pemrograman tanpa validasi yang ketat. Ini bisa terjadi melalui kerentanan lain seperti <strong>Command Injection</strong> atau <strong>File Upload</strong>.' : 'RCE occurs when a web application executes user input as an operating system command or programming code without strict validation. This can happen through other vulnerabilities like <strong>Command Injection</strong> or <strong>File Upload</strong>.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} RCE:</strong></p>
                        <p>${lang === 'id' ? 'Cari fitur yang berinteraksi dengan sistem operasi, misalnya fitur <code>ping</code> atau <code>diagnostik jaringan</code>.' : 'Look for features that interact with the operating system, such as a <code>ping</code> or <code>network diagnostic</code> feature.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>127.0.0.1; ls -la</code></pre>
                        <p>${lang === 'id' ? 'Menggunakan karakter pemisah perintah seperti <code>|</code>, <code>&</code>, atau <code>;</code>.' : 'Using command separator characters like <code>|</code>, <code>&</code>, or <code>;</code>.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Hindari Fungsi Berbahaya:' : 'Avoid Dangerous Functions:'}</strong> ${lang === 'id' ? 'Jangan gunakan fungsi seperti <code>eval()</code>, <code>system()</code> atau <code>exec()</code> dengan input pengguna.' : 'Do not use functions like <code>eval()</code>, <code>system()</code>, or <code>exec()</code> with user input.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'csrf':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Cross-Site Request Forgery (CSRF)</strong> ${lang === 'id' ? 'adalah serangan yang memaksa pengguna yang sudah terautentikasi (sudah login) untuk melakukan tindakan yang tidak mereka inginkan di sebuah situs web yang rentan.' : 'is an attack that forces an authenticated user to perform an unwanted action on a vulnerable website.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Penyerang mengirimkan link atau gambar berbahaya yang berisi permintaan HTTP. Ketika pengguna yang sudah login mengklik link tersebut, browser-nya akan otomatis menyertakan cookie sesi mereka dan mengirimkan permintaan berbahaya.' : 'An attacker sends a malicious link or image containing an HTTP request. When a logged-in user clicks the link, their browser automatically includes their session cookie and sends the malicious request.'}</p>
                        <p><strong>${lang === 'id' ? 'Dampak yang Ditimbulkan:' : 'Impact:'}</strong></p>
                        <ul>
                            <li>${lang === 'id' ? 'Mengubah kata sandi pengguna.' : 'Changing the user\'s password.'}</li>
                            <li>${lang === 'id' ? 'Melakukan transfer dana dari rekening pengguna.' : 'Transferring funds from the user\'s account.'}</li>
                        </ul>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} CSRF:</strong></p>
                        <p>${lang === 'id' ? 'Cari form yang melakukan tindakan sensitif. Periksa apakah form tersebut memiliki <strong>token CSRF</strong> yang unik.' : 'Look for forms that perform sensitive actions. Check if the form has a unique <strong>CSRF token</strong>.'}</p>
                        <h3>B. POC Eksploitasi:</h3>
                        <pre><code>&lt;html&gt;
    &lt;body onload="document.forms[0].submit()"&gt;
        &lt;form action="http://vulnerable-site.com/change-password" method="POST"&gt;
            &lt;input type="hidden" name="new_password" value="hacked123"&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;</code></pre>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Token Anti-CSRF:' : 'Use Anti-CSRF Tokens:'}</strong> ${lang === 'id' ? 'Ini adalah cara paling efektif.' : 'This is the most effective method.'}</li>
                            <li><strong>Header <code>SameSite</code>:</strong> ${lang === 'id' ? 'Gunakan atribut <code>SameSite=Lax</code> atau <code>SameSite=Strict</code> pada cookie sesi.' : 'Use the <code>SameSite=Lax</code> or <code>SameSite=Strict</code> attribute on session cookies.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'ssrf':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Server-Side Request Forgery (SSRF)</strong> ${lang === 'id' ? 'adalah kerentanan di mana penyerang dapat memaksa server web untuk mengirimkan permintaan ke URL yang ditentukan oleh penyerang. Ini berbeda dari CSRF karena serangan ini terjadi di sisi server.' : 'is a vulnerability where an attacker can force the web server to send a request to a URL specified by the attacker. This differs from CSRF because the attack occurs on the server-side.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'SSRF terjadi ketika aplikasi web mengambil URL dari input pengguna dan kemudian mengambil data dari URL tersebut tanpa validasi yang memadai. Penyerang bisa menyisipkan URL yang mengarah ke server internal atau file lokal.' : 'SSRF occurs when a web application takes a URL from user input and then retrieves data from that URL without proper validation. An attacker can insert a URL that points to an internal server or local file.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} SSRF:</strong></p>
                        <p>${lang === 'id' ? 'Cari parameter URL yang mengambil URL lain sebagai input.' : 'Look for URL parameters that take another URL as input.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>http://site.com/image_proxy?url=http://127.0.0.1</code></pre>
                        <p>${lang === 'id' ? 'Payload ini akan memaksa server untuk mengakses dirinya sendiri.' : 'This payload will force the server to access itself.'}</p>
                        <pre><code>http://site.com/image_proxy?url=file:///etc/passwd</code></pre>
                        <p>${lang === 'id' ? 'Payload ini mencoba membaca file <code>passwd</code> di server.' : 'This payload attempts to read the <code>passwd</code> file on the server.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Validasi Input:' : 'Validate Input:'}</strong> ${lang === 'id' ? 'Lakukan validasi ketat pada URL yang diberikan pengguna. Gunakan daftar izin (whitelist).' : 'Perform strict validation on the user-provided URL. Use a whitelist of allowed domains.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'idor':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Insecure Direct Object Reference (IDOR)</strong> ${lang === 'id' ? 'adalah kerentanan di mana penyerang dapat mengakses objek (misalnya data atau akun pengguna) dengan mengubah nilai parameter yang mengacu pada objek tersebut, tanpa ada validasi otorisasi.' : 'is a vulnerability where an attacker can access objects (e.g., user data or accounts) by changing the value of a parameter that refers to that object, without any authorization validation.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Ketika aplikasi web menggunakan ID yang bisa ditebak atau diubah (misalnya ID pengguna <code>123</code>), penyerang bisa mencoba mengubah ID tersebut. Jika server tidak memverifikasi hak akses pengguna, maka penyerang bisa melihat data milik pengguna lain.' : 'When a web application uses a guessable or modifiable ID (e.g., user ID <code>123</code>), an attacker can try changing that ID. If the server doesn\'t verify the user\'s access rights, the attacker can see data belonging to other users.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} IDOR:</strong></p>
                        <p>${lang === 'id' ? 'Lakukan tindakan di web dan perhatikan parameter URL seperti <code>http://site.com/profile?id=123</code>.' : 'Perform an action on the website and look for URL parameters like <code>http://site.com/profile?id=123</code>.'}</p>
                        <h3>B. POC Eksploitasi:</h3>
                        <p>${lang === 'id' ? 'Ubah nilai <code>id</code> menjadi nilai lain, misalnya <code>id=124</code>. Jika kamu bisa melihat profil milik pengguna lain tanpa login sebagai mereka, maka IDOR berhasil ditemukan.' : 'Change the <code>id</code> value to another value, for example <code>id=124</code>. If you can see the profile of another user without logging in as them, then IDOR has been found.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Mekanisme Kontrol Akses:' : 'Use Access Control Mechanisms:'}</strong> ${lang === 'id' ? 'Selalu verifikasi bahwa pengguna yang sedang login memiliki hak untuk mengakses ID tersebut.' : 'Always verify that the logged-in user has the right to access that ID.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'auth-bypass':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Authentication Bypass</strong> ${lang === 'id' ? 'adalah kerentanan yang memungkinkan penyerang untuk melewati mekanisme login atau otentikasi suatu aplikasi web dan mendapatkan akses ke akun pengguna atau area yang seharusnya terlarang, seperti panel admin.' : 'is a vulnerability that allows an attacker to bypass a web application\'s login or authentication mechanism and gain access to user accounts or restricted areas, such as an admin panel.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Authentication Bypass terjadi karena validasi input yang lemah (misalnya, SQLi), manipulasi cookie atau sesi, atau logika aplikasi yang cacat. Dampaknya sangat serius, termasuk pengambilalihan akun dan akses penuh ke data yang seharusnya terlindungi.' : 'Authentication Bypass occurs due to weak input validation (e.g., SQLi), cookie or session manipulation, or flawed application logic. The impact is very serious, including account takeover and full access to data that should be protected.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Authentication Bypass:</strong></p>
                        <p>${lang === 'id' ? 'Coba gunakan payload SQLi sederhana pada form login.' : 'Try using a simple SQLi payload on the login form.'}</p>
                        <h3>B. POC Eksploitasi:</h3>
                        <pre><code>Username: ' OR 1=1--
Password: (apapun)</code></pre>
                        <p>${lang === 'id' ? 'Payload ini akan membuat kueri SQL selalu bernilai benar, sehingga kamu bisa login sebagai pengguna pertama di database (seringkali admin).' : 'This payload will make the SQL query always evaluate to true, allowing you to log in as the first user in the database (often an admin).'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Prepared Statements:' : 'Use Prepared Statements:'}</strong> ${lang === 'id' ? 'Mencegah SQLi yang sering menjadi penyebab bypass.' : 'Prevents SQLi which is often a cause of bypass.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'file-upload':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>File Upload Vulnerability</strong> ${lang === 'id' ? 'adalah kerentanan yang terjadi ketika aplikasi web mengizinkan pengguna mengunggah file tanpa validasi yang memadai. Penyerang dapat mengunggah file berbahaya (misalnya, skrip shell) untuk mendapatkan Remote Code Execution (RCE) di server.' : 'is a vulnerability that occurs when a web application allows users to upload files without adequate validation. An attacker can upload a malicious file (e.g., a shell script) to gain Remote Code Execution (RCE) on the server.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Kerentanan ini terjadi karena aplikasi hanya memeriksa ekstensi file di sisi klien (frontend) atau memiliki blacklist ekstensi yang tidak lengkap. Penyerang dapat mengunggah skrip berbahaya dan kemudian mengaksesnya melalui URL, sehingga skrip tersebut dieksekusi di server.' : 'This vulnerability occurs because the application only checks the file extension on the client-side (frontend) or has an incomplete blacklist of extensions. An attacker can upload a malicious script and then access it via a URL, causing the script to be executed on the server.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} File Upload Vulnerability:</strong></p>
                        <p>${lang === 'id' ? 'Cari fitur unggah file. Coba unggah file dengan ekstensi berbahaya.' : 'Look for a file upload feature. Try uploading a file with a dangerous extension.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <p>${lang === 'id' ? 'Unggah file yang berisi skrip PHP sederhana, misalnya <code>shell.php</code>:' : 'Upload a file containing a simple PHP script, for example <code>shell.php</code>:'}</p>
                        <pre><code>&lt;?php system($_GET['cmd']); ?&gt;</code></pre>
                        <p>${lang === 'id' ? 'Setelah file diunggah, akses file tersebut dengan URL: <code>http://site.com/uploads/shell.php?cmd=whoami</code>. Jika output perintah muncul, kerentanan berhasil dieksploitasi.' : 'After the file is uploaded, access it with the URL: <code>http://site.com/uploads/shell.php?cmd=whoami</code>. If the command output appears, the vulnerability has been exploited.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Validasi di Sisi Server:' : 'Server-Side Validation:'}</strong> ${lang === 'id' ? 'Lakukan validasi ekstensi, ukuran, dan tipe file di sisi server.' : 'Perform validation of file extension, size, and type on the server-side.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'cmd-injection':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Command Injection</strong> ${lang === 'id' ? 'adalah serangan di mana penyerang dapat mengeksekusi perintah pada sistem operasi host melalui input yang tidak divalidasi. Serangan ini sering berujung pada <strong>Remote Code Execution (RCE)</strong>.' : 'is an attack where an attacker can execute commands on the host operating system through unvalidated input. This attack often leads to <strong>Remote Code Execution (RCE)</strong>.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Kerentanan ini terjadi ketika aplikasi web mengambil input dari pengguna dan meneruskannya langsung ke fungsi sistem operasi. Penyerang dapat "menyambung" perintah mereka sendiri dengan karakter khusus seperti <code>|</code>, <code>;</code>, atau <code>&</code>.' : 'This vulnerability occurs when a web application takes input from a user and passes it directly to an operating system function. An attacker can "chain" their own commands with special characters like <code>|</code>, <code>;</code>, or <code>&</code>.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Command Injection:</strong></p>
                        <p>${lang === 'id' ? 'Cari fitur di web yang menjalankan perintah sistem, seperti fitur "Ping".' : 'Look for features on the website that run system commands, such as a "Ping" feature.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>127.0.0.1; ls -la</code></pre>
                        <p>${lang === 'id' ? 'Pada fitur ping, coba masukkan payload di atas. Jika output <code>ls -la</code> muncul, berarti server rentan.' : 'In the ping feature, try entering the above payload. If the <code>ls -la</code> output appears, the server is vulnerable.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Hindari Fungsi Berbahaya:' : 'Avoid Dangerous Functions:'}</strong> ${lang === 'id' ? 'Jangan gunakan fungsi seperti <code>system()</code> atau <code>exec()</code> dengan input pengguna.' : 'Do not use functions like <code>system()</code> or <code>exec()</code> with user input.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'open-redirect':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Open Redirect</strong> ${lang === 'id' ? 'adalah kerentanan di mana aplikasi web mengizinkan penyerang untuk memanipulasi parameter URL yang digunakan untuk redirect pengguna ke URL eksternal yang berbahaya. Kerentanan ini sering digunakan dalam serangan phishing.' : 'is a vulnerability where a web application allows an attacker to manipulate a URL parameter used to redirect a user to a dangerous external URL. This vulnerability is often used in phishing attacks.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Jika URL tujuan diambil langsung dari input pengguna tanpa divalidasi, penyerang bisa mengalihkan korban ke situs phishing yang terlihat mirip dengan situs aslinya.' : 'If the destination URL is taken directly from user input without validation, an attacker can redirect the victim to a phishing site that looks similar to the original site.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Open Redirect:</strong></p>
                        <p>${lang === 'id' ? 'Cari parameter URL seperti <code>redirect=</code>, <code>url=</code>, <code>next=</code>, atau <code>halaman=</code>.' : 'Look for URL parameters like <code>redirect=</code>, <code>url=</code>, <code>next=</code>, or <code>halaman=</code>.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>http://site.com/login?redirect=http://phishing-site.com</code></pre>
                        <p>${lang === 'id' ? 'Jika kamu dialihkan ke situs phishing, kerentanan berhasil ditemukan.' : 'If you are redirected to the phishing site, the vulnerability has been found.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Gunakan Whitelist URL:' : 'Use a URL Whitelist:'}</strong> ${lang === 'id' ? 'Buat daftar URL yang diizinkan untuk redirect.' : 'Create a list of allowed URLs for redirection.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'broken-ac':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Broken Access Control</strong> ${lang === 'id' ? 'adalah kerentanan di mana aplikasi web gagal untuk mengontrol hak akses pengguna dengan benar. Ini memungkinkan pengguna biasa untuk mengakses fungsi atau data yang seharusnya hanya dapat diakses oleh pengguna dengan hak istimewa (misalnya, administrator).' : 'is a vulnerability where a web application fails to properly control user access rights. This allows regular users to access functions or data that should only be accessible to privileged users (e.g., administrator).'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Ini terjadi karena aplikasi tidak memverifikasi hak akses pengguna saat ia mencoba mengakses suatu sumber daya. Dampaknya bisa sangat serius, mulai dari pengungkapan data sensitif hingga pengambilalihan penuh akun admin.' : 'This occurs because the application does not verify the user\'s access rights when they try to access a resource. The impact can be very serious, ranging from sensitive data disclosure to full admin account takeover.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Broken Access Control:</strong></p>
                        <p>${lang === 'id' ? 'Login sebagai pengguna biasa. Coba akses URL atau fitur yang kamu tahu seharusnya hanya bisa diakses oleh admin, misalnya <code>http://site.com/admin/settings</code>.' : 'Log in as a regular user. Try to access a URL or feature that you know should only be accessible to an admin, for example <code>http://site.com/admin/settings</code>.'}</p>
                        <h3>B. POC Eksploitasi:</h3>
                        <p>${lang === 'id' ? 'Gunakan IDOR (salah satu bentuk Broken Access Control) untuk melihat data pengguna lain. Misalnya, di URL <code>http://site.com/api/v1/user/123</code>, ganti <code>123</code> dengan <code>1</code>.' : 'Use IDOR (a form of Broken Access Control) to see other users\' data. For example, in the URL <code>http://site.com/api/v1/user/123</code>, change <code>123</code> to <code>1</code>.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Implementasikan Kontrol Akses Terpusat:' : 'Implement Centralized Access Control:'}</strong> ${lang === 'id' ? 'Pastikan setiap permintaan ke sumber daya yang dilindungi melalui fungsi yang memverifikasi hak akses pengguna.' : 'Ensure every request to a protected resource goes through a function that verifies the user\'s access rights.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'info-disclosure':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Information Disclosure</strong> ${lang === 'id' ? 'adalah kerentanan di mana aplikasi web secara tidak sengaja mengungkapkan informasi sensitif tentang dirinya sendiri, infrastruktur, atau pengguna kepada penyerang. Informasi ini bisa digunakan penyerang untuk merencanakan serangan lebih lanjut.' : 'is a vulnerability where a web application unintentionally reveals sensitive information about itself, its infrastructure, or users to an attacker. This information can be used by an attacker to plan further attacks.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Kerentanan ini sering terjadi karena kesalahan konfigurasi, pesan error yang terlalu detail, atau file yang seharusnya tidak terekspos ke publik. Penyerang bisa mendapatkan informasi penting seperti versi server atau jalur direktori.' : 'This vulnerability often occurs due to misconfigurations, overly detailed error messages, or files that should not be exposed to the public. An attacker can gain important information like server versions or directory paths.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Information Disclosure:</strong></p>
                        <p>${lang === 'id' ? 'Perhatikan pesan error. Jika error yang muncul terlalu detail, itu adalah indikasi.' : 'Pay attention to error messages. If the error is too detailed, that is an indication.'}</p>
                        <h3>B. Contoh:</h3>
                        <p>${lang === 'id' ? 'Mengakses URL yang tidak ada, seperti <code>http://site.com/halaman_yg_ga_ada</code>. Jika server merespons dengan pesan error yang menunjukkan versi PHP atau jalur direktori, itu adalah bukti Information Disclosure.' : 'Accessing a non-existent URL, such as <code>http://site.com/non_existent_page</code>. If the server responds with an error message showing the PHP version or directory path, that is evidence of Information Disclosure.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Jangan Tampilkan Error Verbose:' : 'Do Not Show Verbose Errors:'}</strong> ${lang === 'id' ? 'Gunakan pesan error umum.' : 'Use general error messages.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'misconfig':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>Security Misconfiguration</strong> ${lang === 'id' ? 'adalah kerentanan yang terjadi karena pengaturan keamanan yang salah pada aplikasi web, server, framework, atau komponen lainnya. Ini adalah salah satu kerentanan paling umum.' : 'is a vulnerability that occurs due to incorrect security settings on a web application, server, framework, or other components. This is one of the most common vulnerabilities.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Ini terjadi karena pengaturan default yang tidak aman, manajemen error yang salah, atau hak akses yang terlalu longgar. Penyerang dapat memanfaatkan miskonfigurasi ini untuk mengakses fitur terlarang atau mendapatkan data sensitif.' : 'This occurs due to insecure default settings, improper error management, or overly permissive access rights. An attacker can exploit this misconfiguration to access forbidden features or gain sensitive data.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} Security Misconfiguration:</strong></p>
                        <p>${lang === 'id' ? 'Cari halaman atau direktori yang seharusnya terlindungi tetapi bisa diakses. Coba cari file backup atau direktori yang menampilkan daftar file (directory listing).' : 'Look for pages or directories that should be protected but are accessible. Try to find backup files or directories that display a list of files (directory listing).'}</p>
                        <h3>B. Contoh:</h3>
                        <p>${lang === 'id' ? 'Mengakses <code>http://site.com/.git/config</code>. Jika kamu bisa melihat file ini, berarti server salah mengonfigurasi <code>web root</code> dan membiarkan direktori <code>.git</code> terekspos.' : 'Accessing <code>http://site.com/.git/config</code>. If you can see this file, it means the server has misconfigured the <code>web root</code> and exposed the <code>.git</code> directory.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Ganti Konfigurasi Default:' : 'Change Default Configuration:'}</strong> ${lang === 'id' ? 'Selalu ubah kredensial default yang ada.' : 'Always change existing default credentials.'}</li>
                        </ul>
                    </div>
                `;
                break;
            case 'xxe':
                content = `
                    ${moduleHeader}
                    <div class="bug-section">
                        <h3>1. ${texts.intro} ${bug.title}?</h3>
                        <p><strong>XML External Entity (XXE)</strong> ${lang === 'id' ? 'adalah kerentanan yang terjadi ketika aplikasi web memproses input XML yang berisi referensi ke entitas eksternal. Penyerang dapat mengeksploitasi fitur ini untuk membaca file lokal atau mengakses sumber daya internal lainnya.' : 'is a vulnerability that occurs when a web application processes XML input containing references to external entities. An attacker can exploit this feature to read local files or access other internal resources.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>2. ${texts.howitworks}</h3>
                        <p>${lang === 'id' ? 'Jika parser XML tidak dikonfigurasi dengan benar, penyerang bisa mengirimkan data XML yang jahat. Ini bisa digunakan untuk membaca file lokal, melakukan serangan DoS, atau SSRF.' : 'If the XML parser is not configured correctly, an attacker can send malicious XML data. This can be used to read local files, perform DoS attacks, or SSRF.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>3. ${texts.exploitation}</h3>
                        <p><strong>A. ${texts.identify} XXE:</strong></p>
                        <p>${lang === 'id' ? 'Cari aplikasi yang menerima input dalam format XML. Coba kirimkan payload XML dasar.' : 'Look for applications that accept input in XML format. Try sending a basic XML payload.'}</p>
                        <h3>B. ${texts.payload}</h3>
                        <pre><code>&lt;?xml version="1.0" ?&gt;
&lt;!DOCTYPE test [ &lt;!ENTITY xxe SYSTEM "file:///etc/passwd"&gt; ]&gt;
&lt;test&gt;&xxe;&lt;/test&gt;</code></pre>
                        <p>${lang === 'id' ? 'Payload di atas akan mencoba membaca file <code>/etc/passwd</code>. Jika aplikasi merespons dengan isi file tersebut, XXE berhasil.' : 'The payload above will try to read the <code>/etc/passwd</code> file. If the application responds with the content of that file, XXE is successful.'}</p>
                    </div>
                    <div class="bug-section">
                        <h3>4. ${texts.mitigation}</h3>
                        <p><strong>${texts.forDev}</strong></p>
                        <ul>
                            <li><strong>${lang === 'id' ? 'Nonaktifkan DTD dan Entitas Eksternal:' : 'Disable DTDs and External Entities:'}</strong> ${lang === 'id' ? 'Konfigurasikan parser XML untuk menonaktifkan pemrosesan DTD dan entitas eksternal.' : 'Configure the XML parser to disable DTD and external entity processing.'}</li>
                        </ul>
                    </div>
                `;
                break;
            default:
                content = '';
        }

        return content;
    }

    function populateBugModules() {
        const mainContentElement = document.getElementById('main-content');
        // Clear old modules first
        mainContentElement.querySelectorAll('.bug-module').forEach(el => el.remove());

        bugsData.forEach(bug => {
            const moduleContainer = document.createElement('div');
            moduleContainer.id = `content-${bug.id}`;
            moduleContainer.className = 'content-container bug-module';
            // Panggil getBugModuleContent untuk mengisi konten
            moduleContainer.innerHTML = getBugModuleContent(bug.id);
            mainContentElement.querySelector('.content-wrapper').appendChild(moduleContainer);
        });
    }

    // --- Core UI Functions ---
    window.toggleSidebar = function() {
        sidebar.classList.toggle('active');
    }

    // Fungsi baru untuk menyembunyikan semua konten
    function hideAllModulesAndContainers() {
        allContentContainers.forEach(container => {
            container.classList.remove('active');
        });
    }

    window.showContent = function(id) {
        hideAllModulesAndContainers();
        document.getElementById(`content-${id}`).classList.add('active');

        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }

    window.showBugModule = function(id) {
        hideAllModulesAndContainers();
        document.getElementById(`content-${id}`).classList.add('active');

        mainContent.scrollTo(0, 0);

        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    }

    window.filterBugs = function() {
        const filter = searchInput.value.toLowerCase();
        const bugCards = bugListContainer.getElementsByClassName('bug-card');

        for (let i = 0; i < bugCards.length; i++) {
            const card = bugCards[i];
            const title = card.querySelector('.bug-card-title').textContent || card.querySelector('.bug-card-title').innerText;
            const description = card.querySelector('.bug-card-description').textContent || card.querySelector('.bug-card-description').innerText;
            const category = card.getAttribute('data-category');

            if (title.toLowerCase().indexOf(filter) > -1 || description.toLowerCase().indexOf(filter) > -1 || category.toLowerCase().indexOf(filter) > -1) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        }
    };

    // Theme and Language Toggles
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggle.querySelector('.theme-icon').textContent = isLight ? '🌙' : '☀️';
    });

    langToggle.addEventListener('click', () => {
        const newLang = currentLanguage === 'id' ? 'en' : 'id';
        updateLanguage(newLang);
        langToggle.textContent = newLang.toUpperCase();
    });

    function handleSidebarVisibility() {
        if (window.innerWidth > 768) {
            sidebar.classList.add('active');
            mainContent.style.marginLeft = '340px';
        } else {
            sidebar.classList.remove('active');
            mainContent.style.marginLeft = '0';
        }
    }

    // Initial population and setup
    populateBugList();
    populateRoadmap();
    populateToolsList();
    populateBugModules();

    window.addEventListener('resize', handleSidebarVisibility);
    handleSidebarVisibility();
});
