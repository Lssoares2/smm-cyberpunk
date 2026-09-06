/* ============================================================
   GENERAL UNLOCKING
   CYBERPUNK LANGUAGE SYSTEM - REVISED & FIXED
   ============================================================ */

(function () {
    'use strict';

    if (window.GUTranslatorLoaded) return;
    window.GUTranslatorLoaded = true;

    const CONFIG = {
        storageKey: 'GU_SELECTED_LANGUAGE',
        defaultLanguage: 'pt-BR',
        languages: {
            'pt-BR': { name: 'Português', short: 'PT-BR', flag: '🇧🇷' },
            'en': { name: 'English', short: 'EN', flag: '🇺🇸' },
            'es': { name: 'Español', short: 'ES', flag: '🇪🇸' }
        }
    };

    /* Dicionário de termos comuns de painéis GSM / SMM */
    const TRANSLATIONS = {
        'en': {
            'SERVER SERVICE LIST': 'SERVER SERVICE LIST',
            'Home': 'Home',
            'Search Service': 'Search Service',
            'USD': 'USD',
            '1-10 MINUTES': '1-10 MINUTES',
            'SUPPORT': 'SUPPORT',
            'search': 'SEARCH ALL SERVICES (UNLOCKTOOL, IMEI, SERVER...)',
            'none': 'No service found.',
            'view': '➜ View',
            'support': 'Contact Support on WhatsApp',
            'banner': '🌐 GENERAL UNLOCKING — Connecting your workbench to one of the best GSM servers on the market. ⚡ Fast processing, automated panel and specialized support. 💻 Place your order now!'
        },
        'es': {
            'SERVER SERVICE LIST': 'LISTA DE SERVICIOS DEL SERVIDOR',
            'Home': 'Inicio',
            'Search Service': 'Buscar Servicio',
            'USD': 'USD',
            '1-10 MINUTES': '1-10 MINUTOS',
            'SUPPORT': 'SOPORTE',
            'search': 'BUSCAR EN TODOS LOS SERVICIOS (UNLOCKTOOL, IMEI, SERVIDOR...)',
            'none': 'No se encontró ningún servicio.',
            'view': '➜ Ver',
            'support': 'Contactar al Soporte por WhatsApp',
            'banner': '🌐 GENERAL UNLOCKING — Conectando su bancada con uno de los mejores servidores GSM del mercado. ⚡ Procesamiento rápido, panel automatizado y soporte especializado. 💻 ¡Realice su pedido ahora!'
        },
        'pt-BR': {
            'SERVER SERVICE LIST': 'SERVER SERVICE LIST',
            'Home': 'Início',
            'Search Service': 'Search Service',
            'USD': 'USD',
            '1-10 MINUTES': '1-10 MINUTES',
            'SUPPORT': 'SUPPORT',
            'search': 'BUSCAR EM TODOS OS SERVIÇOS (UNLOCKTOOL, IMEI, SERVIDOR...)',
            'none': 'Nenhum serviço encontrado.',
            'view': '➜ Ver',
            'support': 'Fale com o Suporte no WhatsApp',
            'banner': '🌐 GENERAL UNLOCKING — Conectando sua bancada ao melhor servidor GSM do mercado. ⚡ Processamento rápido, painel automatizado e suporte especializado. 💻 Faça seu pedido agora!'
        }
    };

    let currentLanguage = CONFIG.defaultLanguage;
    let observer = null;
    let translating = false;

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved && CONFIG.languages[saved]) return saved;
        } catch (error) {}
        return CONFIG.defaultLanguage;
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(CONFIG.storageKey, language);
        } catch (error) {}
    }

    function createLanguageSelector() {
        if (document.getElementById('gu-language-switcher')) return;

        const container = document.createElement('div');
        container.id = 'gu-language-switcher';
        container.innerHTML = `
            <button type="button" class="gu-language-current" aria-label="Selecionar idioma">🇧🇷 PT-BR</button>
            <div class="gu-language-menu">
                <button type="button" data-language="pt-BR">🇧🇷 Português</button>
                <button type="button" data-language="en">🇺🇸 English</button>
                <button type="button" data-language="es">🇪🇸 Español</button>
            </div>
        `;
        document.body.appendChild(container);

        container.querySelector('.gu-language-current').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.classList.toggle('gu-open');
        });

        container.querySelectorAll('[data-language]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                setLanguage(button.getAttribute('data-language'));
                container.classList.remove('gu-open');
            });
        });

        document.addEventListener('click', () => {
            container.classList.remove('gu-open');
        });
    }

    function updateLanguageButton() {
        const button = document.querySelector('.gu-language-current');
        if (!button) return;
        const lang = CONFIG.languages[currentLanguage];
        button.textContent = `${lang.flag} ${lang.short}`;
        button.title = lang.name;
    }

    function applyTranslations() {
        if (translating) return;
        translating = true;

        try {
            document.documentElement.setAttribute('lang', currentLanguage);
            updateLanguageButton();

            // Traduz a faixa de aviso
            const banner = document.querySelector('.cyber-marquee-content');
            if (banner) {
                const msg = TRANSLATIONS[currentLanguage]['banner'] || TRANSLATIONS['pt-BR']['banner'];
                banner.textContent = msg + '         ' + msg;
            }

            // Traduz o input de busca geral
            const search = document.getElementById('globalCyberSearch');
            if (search) {
                search.placeholder = TRANSLATIONS[currentLanguage]['search'] || TRANSLATIONS['pt-BR']['search'];
            }

            // Varredura de textos na página com base no dicionário
            const dict = TRANSLATIONS[currentLanguage];
            if (!dict) return;

            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            while ((node = walker.nextNode())) {
                if (!node.parentElement) continue;
                const tag = node.parentElement.tagName;
                if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CANVAS', 'INPUT'].includes(tag)) continue;

                const text = node.nodeValue.trim();
                if (text && dict[text]) {
                    node.nodeValue = node.nodeValue.replace(text, dict[text]);
                }
            }
        } finally {
            translating = false;
        }
    }

    function setLanguage(language) {
        if (!CONFIG.languages[language]) return;
        currentLanguage = language;
        saveLanguage(language);
        applyTranslations();

        document.dispatchEvent(new CustomEvent('GU_LANGUAGE_CHANGED', {
            detail: { language }
        }));
    }

    function startObserver() {
        if (observer || !document.body) return;
        observer = new MutationObserver(() => {
            clearTimeout(startObserver.timer);
            startObserver.timer = setTimeout(() => {
                createLanguageSelector();
                applyTranslations();
            }, 250);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function init() {
        currentLanguage = getSavedLanguage();
        createLanguageSelector();
        applyTranslations();
        startObserver();

        [500, 1500, 3000].forEach(delay => {
            setTimeout(() => {
                createLanguageSelector();
                applyTranslations();
            }, delay);
        });
    }

    window.GUTranslator = {
        setLanguage,
        getLanguage: () => currentLanguage
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
