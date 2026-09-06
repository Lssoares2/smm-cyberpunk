/* ============================================================
    GENERAL UNLOCKING - CYBERPUNK LANGUAGE SYSTEM
    Versão Corrigida para Eventos de Clique
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
        container.style.cssText = "position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: inherit;";
        
        container.innerHTML = `
            <button type="button" id="gu-current-btn" style="background: #111; color: #00ffcc; border: 1px solid #00ffcc; padding: 10px 15px; border-radius: 8px; cursor: pointer; font-weight: bold; box-shadow: 0 0 10px rgba(0,255,204,0.3);">🇧🇷 PT-BR</button>
            <div id="gu-menu-box" style="display: none; position: absolute; bottom: 45px; right: 0; background: #111; border: 1px solid #333; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.5);">
                <button type="button" data-lang="pt-BR" style="display: block; width: 100%; padding: 10px 15px; background: none; border: none; color: #fff; text-align: left; cursor: pointer;">🇧🇷 Português</button>
                <button type="button" data-lang="en" style="display: block; width: 100%; padding: 10px 15px; background: none; border: none; color: #fff; text-align: left; cursor: pointer;">🇺🇸 English</button>
                <button type="button" data-lang="es" style="display: block; width: 100%; padding: 10px 15px; background: none; border: none; color: #fff; text-align: left; cursor: pointer;">🇪🇸 Español</button>
            </div>
        `;
        document.body.appendChild(container);

        const currentBtn = document.getElementById('gu-current-btn');
        const menuBox = document.getElementById('gu-menu-box');

        currentBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuBox.style.display = menuBox.style.display === 'block' ? 'none' : 'block';
        });

        container.querySelectorAll('[data-lang]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                menuBox.style.display = 'none';
                setLanguage(btn.getAttribute('data-lang'));
            });
        });

        document.addEventListener('click', () => {
            menuBox.style.display = 'none';
        });
    }

    function updateButton() {
        const btn = document.getElementById('gu-current-btn');
        if (!btn) return;
        const lang = CONFIG.languages[currentLanguage];
        btn.textContent = lang.flag + ' ' + lang.short;
    }

    function translateInterface() {
        const dict = INTERFACE_TRANSLATIONS[currentLanguage];
        
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!node.parentElement) continue;
            const tag = node.parentElement.tagName;
            if (['SCRIPT', 'STYLE', 'NOSCRIPT', 'INPUT'].includes(tag)) continue;

            const text = node.nodeValue.trim();
            
            // Se voltar para PT-BR, restaura o texto original se guardado, ou apenas aplica tradução se for EN/ES
            if (currentLanguage === 'pt-BR') {
                // Opcional: recarregar a página é mais seguro para resetar tudo perfeitamente ao mudar para PT
                continue;
            }

            if (dict && dict[text]) {
                node.nodeValue = node.nodeValue.replace(text, dict[text]);
            }
        }
    }

    function setLanguage(lang) {
        if (!CONFIG.languages[lang]) return;
        currentLanguage = lang;
        saveLanguage(lang);
        
        if (lang === 'pt-BR') {
            location.reload(); // Recarrega limpo para voltar ao PT-BR original
        } else {
            updateButton();
            translateInterface();
        }
    }

    function init() {
        currentLanguage = getSavedLanguage();
        createLanguageSelector();
        updateButton();
        if (currentLanguage !== 'pt-BR') {
            setTimeout(translateInterface, 500);
        }
    }

    window.GUTranslator = { setLanguage, getLanguage: () => currentLanguage };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
