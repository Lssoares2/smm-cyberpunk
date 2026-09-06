/* ============================================================
   GENERAL UNLOCKING
   CYBERPUNK PURE JAVASCRIPT LANGUAGE SYSTEM (SMM / GSM THEME)
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

    /* =========================================================
       DICIONÁRIO COMPLETO DE TERMOS SMM / GSM / PAINEL
       ========================================================= */
    const TRANSLATIONS = {
        'en': {
            /* Textos Principais e Banner */
            'banner': '🌐 GENERAL UNLOCKING — Connecting your workbench to one of the best GSM servers on the market. ⚡ Fast processing, automated panel and specialized support. 💻 Place your order now!',
            'search': 'SEARCH ALL SERVICES (UNLOCKTOOL, IMEI, SERVER...)',
            'none': 'No service found.',
            'view': '➜ View',
            'support': 'Contact Support on WhatsApp',

            /* Menus e Navegação Comuns */
            'Início': 'Home',
            'Serviços': 'Services',
            'Serviço': 'Service',
            'Lista de Serviços': 'Service List',
            'Server Service List': 'Server Service List',
            'Pedidos': 'Orders',
            'Novo Pedido': 'New Order',
            'Histórico': 'History',
            'Saldo': 'Balance',
            'Adicionar Saldo': 'Add Balance',
            'API': 'API',
            'Tickets': 'Support Tickets',
            'Suporte': 'Support',
            'Configurações': 'Settings',
            'Perfil': 'Profile',
            'Sair': 'Logout',
            'Entrar': 'Login',
            'Cadastrar': 'Register',
            'Dashboard': 'Dashboard',

            /* Tabelas e Campos de Formulário */
            'Pesquisar': 'Search',
            'Buscar': 'Search',
            'Search Service': 'Search Service',
            'ID': 'ID',
            'Nome': 'Name',
            'Preço': 'Price',
            'Min': 'Min',
            'Máx': 'Max',
            'Descrição': 'Description',
            'Tempo médio': 'Average time',
            'Status': 'Status',
            'Ações': 'Actions',
            'Quantidade': 'Quantity',
            'Link': 'Link',
            'Comprar': 'Buy',
            'Fazer Pedido': 'Place Order',
            'Salvar': 'Save',
            'Cancelar': 'Cancel',
            'Voltar': 'Back',
            'Continuar': 'Continue',
            'Confirmar': 'Confirm',
            'Enviar': 'Submit',
            'Fechar': 'Close',
            'Detalhes': 'Details',
            'USD': 'USD',
            '1-10 MINUTES': '1-10 MINUTES',
            'SUPPORT': 'SUPPORT'
        },
        'es': {
            /* Textos Principais e Banner */
            'banner': '🌐 GENERAL UNLOCKING — Conectando su bancada con uno de los mejores servidores GSM del mercado. ⚡ Procesamiento rápido, panel automatizado y soporte especializado. 💻 ¡Realice su pedido ahora!',
            'search': 'BUSCAR EN TODOS LOS SERVICIOS (UNLOCKTOOL, IMEI, SERVIDOR...)',
            'none': 'No se encontró ningún servicio.',
            'view': '➜ Ver',
            'support': 'Contactar al Soporte por WhatsApp',

            /* Menus e Navegação Comuns */
            'Início': 'Inicio',
            'Serviços': 'Servicios',
            'Serviço': 'Servicio',
            'Lista de Serviços': 'Lista de Servicios',
            'Server Service List': 'Lista de Servicios del Servidor',
            'Pedidos': 'Pedidos',
            'Novo Pedido': 'Nuevo Pedido',
            'Histórico': 'Historial',
            'Saldo': 'Saldo',
            'Adicionar Saldo': 'Añadir Saldo',
            'API': 'API',
            'Tickets': 'Tickets de Soporte',
            'Suporte': 'Soporte',
            'Configurações': 'Configuración',
            'Perfil': 'Perfil',
            'Sair': 'Salir',
            'Entrar': 'Iniciar sesión',
            'Cadastrar': 'Registrarse',
            'Dashboard': 'Panel',

            /* Tabelas e Campos de Formulário */
            'Pesquisar': 'Buscar',
            'Buscar': 'Buscar',
            'Search Service': 'Buscar Servicio',
            'ID': 'ID',
            'Nome': 'Nombre',
            'Preço': 'Precio',
            'Min': 'Mín',
            'Máx': 'Máx',
            'Descrição': 'Descripción',
            'Tempo médio': 'Tiempo promedio',
            'Status': 'Estado',
            'Ações': 'Acciones',
            'Quantidade': 'Cantidad',
            'Link': 'Enlace',
            'Comprar': 'Comprar',
            'Fazer Pedido': 'Realizar Pedido',
            'Salvar': 'Guardar',
            'Cancelar': 'Cancelar',
            'Voltar': 'Volver',
            'Continuar': 'Continuar',
            'Confirmar': 'Confirmar',
            'Enviar': 'Enviar',
            'Fechar': 'Cerrar',
            'Detalhes': 'Detalles',
            'USD': 'USD',
            '1-10 MINUTES': '1-10 MINUTOS',
            'SUPPORT': 'SOPORTE'
        },
        'pt-BR': {
            /* Mantém o padrão original caso volte para PT */
        }
    };

    let currentLanguage = CONFIG.defaultLanguage;
    let observer = null;
    let translating = false;

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved && CONFIG.languages[saved]) return saved;
        } catch (e) {}
        return CONFIG.defaultLanguage;
    }

    function saveLanguage(language) {
        try {
            localStorage.setItem(CONFIG.storageKey, language);
        } catch (e) {}
    }

    function createLanguageSelector() {
        if (document.getElementById('gu-language-switcher')) return;

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
        currentButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.classList.toggle('gu-open');
        });

        container.querySelectorAll('[data-language]').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const lang = button.getAttribute('data-language');
                setLanguage(lang);
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

    /* =========================================================
       MOTOR DE TRADUÇÃO PURAMENTE EM JAVASCRIPT (TREEWALKER)
       ========================================================= */
    function applyTranslations() {
        if (translating) return;
        translating = true;

        try {
            document.documentElement.setAttribute('lang', currentLanguage);
            updateLanguageButton();

            // 1. Traduz o Banner de Aviso
            const banner = document.querySelector('.cyber-marquee-content');
            if (banner) {
                const msg = currentLanguage === 'pt-BR' 
                    ? '🌐 GENERAL UNLOCKING — Conectando sua bancada ao melhor servidor GSM do mercado. ⚡ Processamento rápido, painel automatizado e suporte especializado. 💻 Faça seu pedido agora!'
                    : (TRANSLATIONS[currentLanguage]['banner'] || '');
                if (msg) banner.textContent = msg + '         ' + msg;
            }

            // 2. Traduz o Placeholder da Busca
            const searchInput = document.getElementById('globalCyberSearch');
            if (searchInput) {
                const searchMsg = currentLanguage === 'pt-BR'
                    ? 'BUSCAR EM TODOS OS SERVIÇOS (UNLOCKTOOL, IMEI, SERVIDOR...)'
                    : (TRANSLATIONS[currentLanguage]['search'] || '');
                if (searchMsg) searchInput.placeholder = searchMsg;
            }

            // Se for Português, recarrega a página ou limpa substituições se necessário (opcional)
            if (currentLanguage === 'pt-BR') {
                // Se desejar restaurar sem refresh, pode gerenciar, mas o padrão costuma ser recarregar ou manter o dic invertido.
                // Para simplificar, vamos processar via dicionário de qualquer forma:
            }

            const dict = TRANSLATIONS[currentLanguage];
            if (!dict) return;

            // Varredura segura em todos os nós de texto da página
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let node;
            
            while ((node = walker.nextNode())) {
                if (!node.parentElement) continue;
                const tag = node.parentElement.tagName;
                if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'CANVAS'].includes(tag)) continue;

                const originalText = node.nodeValue.trim();
                if (!originalText) continue;

                // Verifica correspondência exata no dicionário
                if (dict[originalText]) {
                    node.nodeValue = node.nodeValue.replace(originalText, dict[originalText]);
                }
            }

            // 3. Traduz placeholders de inputs gerais (como "Search Service")
            document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
                const pText = input.placeholder.trim();
                if (dict[pText]) {
                    input.placeholder = dict[pText];
                }
            });

        } finally {
            translating = false;
        }
    }

    function setLanguage(language) {
        if (!CONFIG.languages[language]) return;
        currentLanguage = language;
        saveLanguage(language);
        
        // Se mudar para pt-BR, recarregar a página garante que todos os textos originais voltem limpos perfeitamente
        if (language === 'pt-BR') {
            window.location.reload();
            return;
        }

        applyTranslations();

        document.dispatchEvent(new CustomEvent('GU_LANGUAGE_CHANGED', {
            detail: { language }
        }));
    }

    /* =========================================================
       OBSERVADOR PARA ELEMENTOS DINÂMICOS (AJAX / SPA)
       ========================================================= */
    function startObserver() {
        if (observer || !document.body) return;
        observer = new MutationObserver(() => {
            clearTimeout(startObserver.timer);
            startObserver.timer = setTimeout(() => {
                createLanguageSelector();
                if (currentLanguage !== 'pt-BR') {
                    applyTranslations();
                }
            }, 300);
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function init() {
        currentLanguage = getSavedLanguage();
        createLanguageSelector();
        updateLanguageButton();

        if (currentLanguage !== 'pt-BR') {
            applyTranslations();
        }

        startObserver();

        // Reforça a tradução caso o painel carregue componentes tardios
        [600, 1500, 3000].forEach(delay => {
            setTimeout(() => {
                createLanguageSelector();
                if (currentLanguage !== 'pt-BR') {
                    applyTranslations();
                }
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
