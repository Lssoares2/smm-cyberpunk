/* ============================================================
    GENERAL UNLOCKING - CYBERPUNK LANGUAGE SYSTEM
    Versão Direta para Painéis GSM/SMM com API Dinâmica
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

    const DICTIONARY = {
        'en': {
            'Início': 'Home',
            'Serviços': 'Services',
            'Server Service List': 'Server Service List',
            'Quick Delivery': 'Quick Delivery',
            'Results within minutes': 'Results within minutes',
            '100% Secure': '100% Secure',
            'SSL encrypted platform': 'SSL encrypted platform',
            '24/7 Support': '24/7 Support',
            'Always here to help you': 'Always here to help you',
            'Easy Recharge': 'Easy Recharge',
            'Company': 'Company',
            'About Us': 'About Us',
            'Contact Us': 'Contact Us',
            'Terms of Service': 'Terms of Service',
            'Privacy Policy': 'Privacy Policy'
        },
        'es': {
            'Início': 'Inicio',
            'Serviços': 'Servicios',
            'Server Service List': 'Lista de Servicios de Servidor',
            'Quick Delivery': 'Entrega Rápida',
            'Results within minutes': 'Resultados en minutos',
            '100% Secure': '100% Seguro',
            'SSL encrypted platform': 'Plataforma cifrada SSL',
            '24/7 Support': 'Soporte 24/7',
            'Always here to help you': 'Siempre aquí para ayudarte',
            'Easy Recharge': 'Recarga Fácil',
            'Company': 'Compañía',
            'About Us': 'Sobre Nosotros',
            'Contact Us': 'Contáctenos',
            'Terms of Service': 'Términos de Servicio',
            'Privacy Policy': 'Política de Privacidad'
        }
    };

    let currentLanguage = localStorage.getItem(CONFIG.storageKey) || CONFIG.defaultLanguage;

    function createUI() {
        if (document.getElementById('gu-language-switcher')) return;

        const div = document.createElement('div');
        div.id = 'gu-language-switcher';
        div.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:999999;';
        
        div.innerHTML = `
            <select id="gu-select-lang" style="background:#0b0f19; color:#00ffcc; border:1px solid #00ffcc; padding:8px 12px; border-radius:6px; font-weight:bold; cursor:pointer; outline:none;">
                <option value="pt-BR" ${currentLanguage === 'pt-BR' ? 'selected' : ''}>🇧🇷 PT-BR</option>
                <option value="en" ${currentLanguage === 'en' ? 'selected' : ''}>🇺🇸 EN</option>
                <option value="es" ${currentLanguage === 'es' ? 'selected' : ''}>🇪🇸 ES</option>
            </select>
        `;
        document.body.appendChild(div);

        document.getElementById('gu-select-lang').addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem(CONFIG.storageKey, lang);
            location.reload(); // Recarrega aplicando o idioma via URL ou parâmetro direto
        });
    }

    function translateTextNodes() {
        if (currentLanguage === 'pt-BR') return;
        const map = DICTIONARY[currentLanguage];
        if (!map) return;

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const text = node.nodeValue.trim();
            if (map[text]) {
                node.nodeValue = map[text];
            }
        }
    }

    function init() {
        createUI();
        if (currentLanguage !== 'pt-BR') {
            setTimeout(translateTextNodes, 600);
            // Executa de novo caso a tabela demore a carregar via API
            setTimeout(translateTextNodes, 1500);
        }
    }

    window.GUTranslator = {
        getLanguage: () => currentLanguage,
        setLanguage: (l) => { localStorage.setItem(CONFIG.storageKey, l); location.reload(); }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
