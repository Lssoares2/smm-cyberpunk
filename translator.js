/* ============================================================
   GENERAL UNLOCKING
   CYBERPUNK AUTOMATIC LANGUAGE SYSTEM (GOOGLE TRANSLATE API)
   ============================================================ */

(function () {
    'use strict';

    if (window.GUTranslatorLoaded) return;
    window.GUTranslatorLoaded = true;

    const CONFIG = {
        storageKey: 'GU_SELECTED_LANGUAGE',
        defaultLanguage: 'pt',
        languages: {
            'pt': { name: 'Português', short: 'PT-BR', flag: '🇧🇷' },
            'en': { name: 'English', short: 'EN', flag: '🇺🇸' },
            'es': { name: 'Español', short: 'ES', flag: '🇪🇸' }
        }
    };

    let currentLanguage = CONFIG.defaultLanguage;

    /* =========================================================
       1. CARREGAR SCRIPT OFICIAL DO GOOGLE TRANSLATE
       ========================================================= */
    function loadGoogleTranslateScript() {
        if (document.getElementById('google-translate-script')) return;

        // Cria a div oculta exigida pelo Google Translate
        if (!document.getElementById('google_translate_element')) {
            const hiddenDiv = document.createElement('div');
            hiddenDiv.id = 'google_translate_element';
            hiddenDiv.style.display = 'none';
            document.body.appendChild(hiddenDiv);
        }

        window.googleTranslateElementInit = function () {
            new google.translate.TranslateElement({
                pageLanguage: 'pt',
                includedLanguages: 'pt,en,es',
                autoDisplay: false
            }, 'google_translate_element');
        };

        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.head.appendChild(script);
    }

    /* =========================================================
       2. CRIAR O SELETOR VISUAL CYBERPUNK
       ========================================================= */
    function createLanguageSelector() {
        if (document.getElementById('gu-language-switcher')) return;

        const container = document.createElement('div');
        container.id = 'gu-language-switcher';
        container.innerHTML = `
            <button type="button" class="gu-language-current" aria-label="Selecionar idioma">
                🇧🇷 PT-BR
            </button>
            <div class="gu-language-menu">
                <button type="button" data-language="pt">🇧🇷 Português</button>
                <button type="button" data-language="en">🇺🇸 English</button>
                <button type="button" data-language="es">🇪🇸 Español</button>
            </div>
        `;
        document.body.appendChild(container);

        // Ações de clique
        const currentButton = container.querySelector('.gu-language-current');
        currentButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            container.classList.toggle('gu-open');
        });

        container.querySelectorAll('[data-language]').forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                const lang = button.getAttribute('data-language');
                changeLanguage(lang);
                container.classList.remove('gu-open');
            });
        });

        document.addEventListener('click', () => {
            container.classList.remove('gu-open');
        });
    }

    /* =========================================================
       3. ATUALIZAR ESTADO DO BOTÃO
       ========================================================= */
    function updateButtonUI() {
        const button = document.querySelector('.gu-language-current');
        if (!button) return;
        const lang = CONFIG.languages[currentLanguage] || CONFIG.languages['pt'];
        button.textContent = `${lang.flag} ${lang.short}`;
        button.title = lang.name;
    }

    /* =========================================================
       4. ACIONAR A TRADUÇÃO VIA COMBOBOX DO GOOGLE
       ========================================================= */
    function changeLanguage(langCode) {
        currentLanguage = langCode;
        try {
            localStorage.setItem(CONFIG.storageKey, langCode);
        } catch (e) {}

        updateButtonUI();

        // Procura o select oculto gerado pelo Google Translate e força a troca
        const selectField = document.querySelector('.goog-te-combo');
        if (selectField) {
            selectField.value = langCode;
            selectField.dispatchEvent(new Event('change'));
        } else {
            // Se o script do Google ainda estiver carregando, tenta novamente em 1 segundo
            setTimeout(() => {
                const retrySelect = document.querySelector('.goog-te-combo');
                if (retrySelect) {
                    retrySelect.value = langCode;
                    retrySelect.dispatchEvent(new Event('change'));
                }
            }, 1000);
        }

        document.dispatchEvent(new CustomEvent('GU_LANGUAGE_CHANGED', { detail: { language: langCode } }));
    }

    /* =========================================================
       5. INICIALIZAÇÃO
       ========================================================= */
    function init() {
        // Recupera idioma salvo
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved && CONFIG.languages[saved]) {
                currentLanguage = saved;
            }
        } catch (e) {}

        loadGoogleTranslateScript();
        createLanguageSelector();
        updateButtonUI();

        // Aplica o idioma salvo assim que o Google Translate carregar na página
        const checkGoogleLoaded = setInterval(() => {
            const selectField = document.querySelector('.goog-te-combo');
            if (selectField && currentLanguage !== 'pt') {
                selectField.value = currentLanguage;
                selectField.dispatchEvent(new Event('change'));
                clearInterval(checkGoogleLoaded);
            }
        }, 500);
    }

    window.GUTranslator = {
        setLanguage: changeLanguage,
        getLanguage: () => currentLanguage
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
