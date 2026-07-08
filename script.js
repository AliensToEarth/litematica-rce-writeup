(function() {
    const currentLang = localStorage.getItem('litematica-rce-lang') || 'en';

    function setLang(lang) {
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === lang) {
                el.removeAttribute('hidden');
            } else {
                el.setAttribute('hidden', '');
            }
        });
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === 'lang-' + lang);
        });
        localStorage.setItem('litematica-rce-lang', lang);
        document.documentElement.lang = lang;
    }

    document.getElementById('lang-en').addEventListener('click', () => setLang('en'));
    document.getElementById('lang-ru').addEventListener('click', () => setLang('ru'));

    setLang(currentLang);
})();

(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 80;
            const bottom = top + section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < bottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = link.getAttribute('href') === '#' + current
                ? 'var(--accent)'
                : '';
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
})();

(function() {
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        const btn = document.createElement('button');
        btn.textContent = 'copy';
        btn.style.cssText = `
            position: absolute;
            top: 6px;
            right: 6px;
            font-family: inherit;
            font-size: 11px;
            padding: 3px 9px;
            background: #1a1a24;
            color: #666;
            border: 1px solid #2a2a3a;
            border-radius: 3px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.15s;
        `;

        pre.style.position = 'relative';
        pre.appendChild(btn);

        pre.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
        pre.addEventListener('mouseleave', () => { btn.style.opacity = '0'; });

        btn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                btn.textContent = 'copied!';
                btn.style.color = '#7ecf8e';
                setTimeout(() => {
                    btn.textContent = 'copy';
                    btn.style.color = '#666';
                }, 1500);
            } catch {
                btn.textContent = 'failed';
                setTimeout(() => { btn.textContent = 'copy'; }, 1500);
            }
        });
    });
})();
