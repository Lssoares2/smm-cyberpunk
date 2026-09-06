/* ============================================================
    GENERAL UNLOCKING - CYBERPUNK LANGUAGE SYSTEM
    Versão Otimizada e Instantânea para Painéis GSM/SMM
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

    /* Dicionário completo de interface e menus do painel */
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
            'Server Service List': 'Server Service List',
            'Quick Delivery': 'Quick Delivery',
            'Results within minutes': 'Results within minutes',
            '100% Secure': '100% Secure',
            'SSL encrypted platform': 'SSL encrypted platform',
            '24/7 Support': '24/7 Support',
            'Always here to help you': 'Always here to help you',
            'Easy Recharge': 'Easy Recharge',
            'Binance, Tether, Visa & more': 'Binance, Tether, Visa & more',
            'Contact': 'Contact',
            'Company': 'Company',
            'About Us': 'About Us',
            'Contact Us': 'Contact Us',
            'Reseller Panel': 'Reseller Panel',
            'Free IMEI Checker': 'Free IMEI Checker',
            'Quick Access': 'Quick Access',
            'IMEI Service': 'IMEI Service',
            'Server Service': 'Server Service',
            'Remote Service': 'Remote Service',
            'Service by Group': 'Service by Group',
            'Best Selling': 'Best Selling',
            'Legal': 'Legal',
            'Privacy Policy': 'Privacy Policy',
            'Terms of Service': 'Terms of Service',
            'Delivery Policy': 'Delivery Policy',
            'Cancellation Policy': 'Cancellation Policy',
            'Refund & Return Policy': 'Refund & Return Policy',
            'Get the App': 'Get the App',
            'Order, track & get support from your phone.': 'Order, track & get support from your phone.',
            'Download on the': 'Download on the',
            'Get it on': 'Get it on'
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
            'Server Service List': 'Lista de Servicios de Servidor',
            'Quick Delivery': 'Entrega Rápida',
            'Results within minutes': 'Resultados en minutos',
            '100% Secure': '100% Seguro',
            'SSL encrypted platform': 'Plataforma cifrada SSL',
            '24/7 Support': 'Soporte 24/7',
            'Always here to help you': 'Siempre aquí para ayudarte',
            'Easy Recharge': 'Recarga Fácil',
            'Binance, Tether, Visa & more': 'Binance, Tether, Visa y más',
            'Contact': 'Contacto',
            'Company': 'Compañía',
            'About Us': 'Sobre Nosotros',
            'Contact Us': 'Contáctenos',
            'Reseller Panel': 'Panel de Revendedor',
            'Free IMEI Checker': 'Verificador de IMEI Gratuito',
            'Quick Access': 'Acceso Rápido',
            'IMEI Service': 'Servicio IMEI',
            'Server Service': 'Servicio de Servidor',
            'Remote Service': 'Servicio Remoto',
            'Service by Group': 'Servicio por Grupo',
            'Best Selling': 'Más Vendidos',
            'Legal': 'Legal',
            'Privacy Policy': 'Política de Privacidad',
            'Terms of Service': 'Términos de Servicio',
            'Delivery Policy': 'Política de Entrega',
            'Cancellation Policy': 'Política de Cancelación',
            'Refund & Return Policy': 'Política de Reembolso y Devolución',
            'Get the App': 'Obtener la Aplicación',
            'Order, track & get support from your phone.': 'Realiza pedidos, rastrea y obtén soporte desde tu teléfono.',
            'Download on the': 'Descargar en el',
            'Get it on': 'Disponible en'
        }
    };

    let currentLanguage = CONFIG.defaultLanguage;
    let observer = null;

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem(CONFIG.storageKey);
            if (saved && CONFIG.languages[saved]) return saved;
        } catch (e) {}
        return CONFIG.defaultLanguage;
    }

    function saveLanguage(lang) {
        try { localStorage.setItem(CONFIG.storageKey, lang); } catch (e) {}
    }

    function createLanguageSelector() {
        if (document.getElementById('gu-language-switcher')) return;

        const container = document.createElement('div');
        container.id = 'gu-language-switcher';
        container.innerHTML = `
            <button type="button" class="gu-language-current">🇧🇷 PT-BR</button>
            <div class="gu-language-menu">
                <button type="button" data-language="pt-BR">🇧🇷 Português</button>
                <button type="button" data-language="en">🇺🇸 English</button>
                <button type="button" data-language="es">🇪🇸 Español</button>
            </div>
        `;
        document.body.appendChild(container);

        container.querySelector('.gu-language-current').addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('gu-open');
        });

        container.querySelectorAll('[data-language]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                setLanguage(btn.getAttribute('data-language'));
                container.classList.remove('gu-open');
            });
        });

        document.addEventListener('click', () => container.classList.remove('gu-open'));
    }

    function updateButton() {
        const btn = document.querySelector('.gu-language-current');
        if (!btn) return;
        const lang = CONFIG.languages[currentLanguage];
        btn.textContent = lang.flag + ' ' + lang.short;
    }

    function translateInterface() {
        if (currentLanguage === 'pt-BR') return;
        const dict = INTERFACE_TRANSLATIONS[currentLanguage];
        if (!dict) return;

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!node.parentElement) continue;
            const tag = node.parentElement.tagName;
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT'].includes(tag)) continue;

            const text = node.nodeValue.trim();
            if (dict[text]) {
                node.nodeValue = node.nodeValue.replace(text, dict[text]);
            }
        }
    }

    function applyLanguage() {
        document.documentElement.setAttribute('lang', currentLanguage);
        updateButton();
        translateInterface();
    }

    function setLanguage(lang) {
        if (!CONFIG.languages[lang]) return;
        currentLanguage = lang;
        saveLanguage(lang);
        applyLanguage();
        // Recarrega a página levemente ou reaplica para refletir instantaneamente
        setTimeout(translateInterface, 100);
    }

    function init() {
        currentLanguage = getSavedLanguage();
        createLanguageSelector();
        applyLanguage();

        // Observer inteligente para tabelas carregadas via AJAX/API
        if (!observer && document.body) {
            observer = new MutationObserver(() => {
                if (currentLanguage !== 'pt-BR') translateInterface();
            });
            observer.observe(document.body, { childList: true, subtree: true });
        }
    }

    window.GUTranslator = { setLanguage, getLanguage: () => currentLanguage };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
