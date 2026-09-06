/* ============================================================
   GENERAL UNLOCKING
   CYBERPUNK LANGUAGE SYSTEM
   PT-BR / EN / ES

   Arquivo externo para integração com GSM Theme.
   (Versão Otimizada com suporte a data-i18n e TreeWalker)
   ============================================================ */

(function () {
    'use strict';

    /* Evita carregar duas vezes */
    if (window.GUTranslatorLoaded) return;
    window.GUTranslatorLoaded = true;

    const CONFIG = {
        storageKey: 'GU_SELECTED_LANGUAGE',
        defaultLanguage: 'pt-BR',

        languages: {
            'pt-BR': {
                name: 'Português',
                short: 'PT-BR',
                flag: '🇧🇷'
            },

            'en': {
                name: 'English',
                short: 'EN',
                flag: '🇺🇸'
            },

            'es': {
                name: 'Español',
                short: 'ES',
                flag: '🇪🇸'
            }
        }
    };


    /* =========================================================
       TRADUÇÕES DO SEU PRÓPRIO CÓDIGO
       ========================================================= */

    const TRANSLATIONS = {

        'pt-BR': {

            search:
                'BUSCAR EM TODOS OS SERVIÇOS (UNLOCKTOOL, IMEI, SERVIDOR...)',

            none:
                'Nenhum serviço encontrado.',

            view:
                '➜ Ver',

            support:
                'Fale com o Suporte no WhatsApp',

            banner:
                '🌐 GENERAL UNLOCKING — Conectando sua bancada ao melhor servidor GSM do mercado. ⚡ Processamento rápido, painel automatizado e suporte especializado. 💻 Faça seu pedido agora!'
        },


        'en': {

            search:
                'SEARCH ALL SERVICES (UNLOCKTOOL, IMEI, SERVER...)',

            none:
                'No service found.',

            view:
                '➜ View',

            support:
                'Contact Support on WhatsApp',

            banner:
                '🌐 GENERAL UNLOCKING — Connecting your workbench to one of the best GSM servers on the market. ⚡ Fast processing, automated panel and specialized support. 💻 Place your order now!'
        },


        'es': {

            search:
                'BUSCAR EN TODOS LOS SERVICIOS (UNLOCKTOOL, IMEI, SERVIDOR...)',

            none:
                'No se encontró ningún servicio.',

            view:
                '➜ Ver',

            support:
                'Contactar al Soporte por WhatsApp',

            banner:
                '🌐 GENERAL UNLOCKING — Conectando su bancada con uno de los mejores servidores GSM del mercado. ⚡ Procesamiento rápido, panel automatizado y soporte especializado. 💻 ¡Realice su pedido ahora!'
        }
    };


    /* =========================================================
       TRADUÇÕES OPCIONAIS DO GSM THEME
       ========================================================= */

    const INTERFACE_TRANSLATIONS = {

        'en': {
            'Início': 'Home',
            'Serviços': 'Services',
            'Pedidos': 'Orders',
            'Saldo': 'Balance',
            'Configurações': 'Settings',
            'Sair': 'Logout',
            'Entrar': 'Login',
            'Perfil': 'Profile',
            'Dashboard': 'Dashboard',

            'Buscar': 'Search',
            'Pesquisar': 'Search',
            'Comprar': 'Buy',
            'Adicionar': 'Add',
            'Salvar': 'Save',
            'Cancelar': 'Cancel',
            'Voltar': 'Back',
            'Continuar': 'Continue',
            'Confirmar': 'Confirm',
            'Enviar': 'Submit',
            'Fechar': 'Close',
            'Detalhes': 'Details'
        },


        'es': {
            'Início': 'Inicio',
            'Serviços': 'Servicios',
            'Pedidos': 'Pedidos',
            'Saldo': 'Saldo',
            'Configurações': 'Configuración',
            'Sair': 'Salir',
            'Entrar': 'Iniciar sesión',
            'Perfil': 'Perfil',
            'Dashboard': 'Panel',

            'Buscar': 'Buscar',
            'Pesquisar': 'Buscar',
            'Comprar': 'Comprar',
            'Adicionar': 'Añadir',
            'Salvar': 'Guardar',
            'Cancelar': 'Cancelar',
            'Voltar': 'Volver',
            'Continuar': 'Continuar',
            'Confirmar': 'Confirmar',
            'Enviar': 'Enviar',
            'Fechar': 'Cerrar',
            'Detalhes': 'Detalles'
        }
    };


    let currentLanguage = CONFIG.defaultLanguage;
    let observer = null;
    let translating = false;


    /* =========================================================
       STORAGE
       ========================================================= */

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved && CONFIG.languages[saved]) {
                return saved;
            }
        } catch (error) {}
        return CONFIG.defaultLanguage;
    }


    function saveLanguage(language) {
        try {
            localStorage.setItem(CONFIG.storageKey, language);
        } catch (error) {}
    }


    /* =========================================================
       TEXTO
       ========================================================= */

    function getTranslation(key) {
        if (TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage][key]) {
            return TRANSLATIONS[currentLanguage][key];
        }
        return TRANSLATIONS[CONFIG.defaultLanguage][key] || key;
    }


    /* =========================================================
       SELETOR DE IDIOMA
       ========================================================= */

    function createLanguageSelector() {
        if (document.getElementById('gu-language-switcher')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'gu-language-switcher';

        container.innerHTML = `
            <button type="button" class="gu-language-current" aria-label="Selecionar idioma">
                🇧🇷 PT-BR
            </button>
            <div class="gu-language-menu">
                <button type="button" data-language="pt-BR">🇧🇷 Português</button>
                <button type="button" data-language="en">🇺🇸 English</button>
                <button type="button" data-language="es">🇪🇸 Español</button>
            </div>
        `;

        document.body.appendChild(container);

        const currentButton = container.querySelector('.gu-language-current');

        currentButton.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            container.classList.toggle('gu-open');
        });

        const languageButtons = container.querySelectorAll('[data-language]');

        languageButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                const language = button.getAttribute('data-language');
                setLanguage(language);
                container.classList.remove('gu-open');
            });
        });

        document.addEventListener('click', function () {
            container.classList.remove('gu-open');
        });
    }


    /* =========================================================
       ATUALIZA BOTÃO
       ========================================================= */

    function updateLanguageButton() {
        const button = document.querySelector('.gu-language-current');
        if (!button) return;

        const language = CONFIG.languages[currentLanguage];
        button.textContent = language.flag + ' ' + language.short;
        button.title = language.name;
    }


    /* =========================================================
       TRADUZ SUA FAIXA
       ========================================================= */

    function translateBanner() {
        const banner = document.querySelector('.cyber-marquee-content');
        if (!banner) return;

        const message = getTranslation('banner');
        banner.textContent = message + '        ' + message;
    }


    /* =========================================================
       TRADUZ BUSCA
       ========================================================= */

    function translateSearch() {
        const search = document.getElementById('globalCyberSearch');
        if (!search) return;

        search.placeholder = getTranslation('search');

        document.querySelectorAll('.gu-search-empty').forEach(function (element) {
            element.textContent = getTranslation('none');
        });

        document.querySelectorAll('.gu-search-view').forEach(function (element) {
            element.textContent = getTranslation('view');
        });
    }


    /* =========================================================
       WHATSAPP
       ========================================================= */

    function translateWhatsApp() {
        const button = document.querySelector('.cyber-whatsapp-float');
        if (!button) return;

        button.title = getTranslation('support');

        const image = button.querySelector('img');
        if (image) {
            image.alt = getTranslation('support');
        }
    }


    /* =========================================================
       TRADUÇÃO OTIMIZADA (data-i18n + TreeWalker Híbrido)
       ========================================================= */

    function translateInterface() {
        // 1. Prioridade máxima: Elementos marcados explicitamente no HTML com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(function (element) {
            const key = element.getAttribute('data-i18n');
            const dictionary = INTERFACE_TRANSLATIONS[currentLanguage];
            const translation = dictionary ? dictionary[key] : null;

            if (translation) {
                if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // 2. Fallback para o restante do painel dinâmico (mantém o TreeWalker para o GSM Theme)
        if (currentLanguage === 'pt-BR') {
            return;
        }

        const dictionary = INTERFACE_TRANSLATIONS[currentLanguage];
        if (!dictionary) return;

        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );

        const nodes = [];
        let node;

        while ((node = walker.nextNode())) {
            if (!node.parentElement) {
                continue;
            }

            const tag = node.parentElement.tagName;
            if (
                tag === 'SCRIPT' ||
                tag === 'STYLE' ||
                tag === 'NOSCRIPT' ||
                tag === 'CANVAS'
            ) {
                continue;
            }

            const original = node.nodeValue.trim();
            if (!original) {
                continue;
            }

            if (Object.prototype.hasOwnProperty.call(dictionary, original)) {
                nodes.push({
                    node: node,
                    original: original,
                    translated: dictionary[original]
                });
            }
        }

        nodes.forEach(function (item) {
            if (item.node.nodeValue !== item.translated) {
                item.node.nodeValue = item.node.nodeValue.replace(
                    item.original,
                    item.translated
                );
            }
        });
    }


    /* =========================================================
       APLICA IDIOMA
       ========================================================= */

    function applyLanguage() {
        if (translating) return;
        translating = true;

        try {
            document.documentElement.setAttribute('lang', currentLanguage);
            document.documentElement.setAttribute('data-gu-language', currentLanguage);

            updateLanguageButton();
            translateBanner();
            translateSearch();
            translateWhatsApp();
            translateInterface();
        } finally {
            translating = false;
        }
    }


    /* =========================================================
       TROCAR IDIOMA
       ========================================================= */

    function setLanguage(language) {
        if (!CONFIG.languages[language]) {
            return;
        }

        currentLanguage = language;
        saveLanguage(language);
        applyLanguage();

        document.dispatchEvent(
            new CustomEvent(
                'GU_LANGUAGE_CHANGED',
                {
                    detail: {
                        language: language
                    }
                }
            )
        );
    }


    /* =========================================================
       OBSERVER
       ========================================================= */

    function startObserver() {
        if (observer) return;
        if (!document.body) return;

        observer = new MutationObserver(function (mutations) {
            let changed = false;

            mutations.forEach(function (mutation) {
                if (
                    mutation.type === 'childList' &&
                    mutation.addedNodes.length
                ) {
                    changed = true;
                }
            });

            if (!changed) return;

            clearTimeout(startObserver.timer);

            startObserver.timer = setTimeout(function () {
                applyLanguage();
            }, 150);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }


    /* =========================================================
       INICIALIZAÇÃO
       ========================================================= */

    function init() {
        currentLanguage = getSavedLanguage();

        createLanguageSelector();
        applyLanguage();
        startObserver();

        [500, 1200, 2500, 5000].forEach(function (delay) {
            setTimeout(function () {
                createLanguageSelector();
                applyLanguage();
            }, delay);
        });
    }


    /* =========================================================
       API GLOBAL
       ========================================================= */

    window.GUTranslator = {
        setLanguage: setLanguage,
        getLanguage: function () {
            return currentLanguage;
        }
    };


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, {
            once: true
        });
    } else {
        init();
    }

})();
