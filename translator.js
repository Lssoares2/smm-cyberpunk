/* =========================================================
   ESTRATÉGIA OTIMIZADA: SELETORES DIRETOS E CACHE DE NÓS
   ========================================================= */

// Dicionário unificado de chaves de interface
const INTERFACE_TRANSLATIONS = {
    'en': {
        'settings': 'Settings',
        'home': 'Home',
        'services': 'Services'
    },
    'es': {
        'settings': 'Configuración',
        'home': 'Inicio',
        'services': 'Servicios'
    }
};

function applyOptimizedTranslation() {
    // 1. Traduz elementos marcados explicitamente no HTML (Performance máxima)
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = INTERFACE_TRANSLATIONS[currentLanguage]?.[key];
        
        if (translation) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // 2. Fallback para elementos dinâmicos do painel nativo que não possuem data-i18n
    if (currentLanguage === 'pt-BR') return;
    
    const dictionary = INTERFACE_TRANSLATIONS[currentLanguage];
    if (!dictionary) return;

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;

    while (node = walker.nextNode()) {
        const parent = node.parentElement;
        if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;

        const originalText = node.nodeValue.trim();
        if (dictionary[originalText]) {
            // Evita reescrever se já estiver traduzido
            if (node.nodeValue !== dictionary[originalText]) {
                node.nodeValue = node.nodeValue.replace(originalText, dictionary[originalText]);
            }
        }
    }
}
