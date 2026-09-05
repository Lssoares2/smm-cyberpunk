(function() {
    // Inserção automática da estrutura do letreiro, busca e WhatsApp se já não existirem
    if (!document.querySelector('.cyber-marquee-wrapper')) {
        const containerHtml = `
        <div class="cyber-marquee-wrapper">
          <div class="cyber-marquee-content">
            🌐 GENERAL UNLOCKING — Conectando sua bancada ao melhor servidor GSM do mercado. ⚡ Processamento rápido, painel automatizado e suporte especializado. 💻 Faça seu pedido agora!         🌐 GENERAL UNLOCKING — Conectando sua bancada ao melhor servidor GSM do mercado. ⚡ Processamento rápido, painel automatizado e suporte especializado. 💻 Faça seu pedido agora!
          </div>
        </div>

        <div class="cyber-search-container" onclick="event.stopPropagation()">
          <div class="cyber-search-wrapper" style="position: relative; display: flex; gap: 10px; align-items: center;">
            <input type="text" id="globalCyberSearch" placeholder="BUSCAR EM TODOS OS SERVIÇOS..." 
                   onkeyup="(function(){
                     let q = document.getElementById('globalCyberSearch').value.toLowerCase();
                     let box = document.getElementById('searchResultsList');
                     if(q.length < 2){ box.style.display='none'; return; }
                     let els = document.querySelectorAll('a, .service-item, .card, tr, li');
                     let res = [];
                     els.forEach(el => {
                       let txt = el.innerText || el.textContent;
                       let href = el.getAttribute('href');
                       if(txt && href && href !== '#' && !href.startsWith('javascript') && txt.toLowerCase().includes(q)){
                         if(!res.some(i => i.href === href)) res.push({text: txt.trim().split('\n')[0], href: href});
                       }
                     });
                     box.innerHTML = '';
                     if(res.length === 0){
                       box.innerHTML = '<div class=\'search-item\'>Nenhum serviço encontrado.</div>';
                     } else {
                       res.slice(0, 10).forEach(i => {
                         box.innerHTML += '<a href=\'' + i.href + '\' class=\'search-item\'><span>' + i.text + '</span><span style=\'color:#00ff66;\'>➜ Ver</span></a>';
                       });
                     }
                     box.style.display = 'block';
                   })()" 
                   autocomplete="off" style="flex: 1;">
            
            <div class="cyber-lang-selector">
              <select id="idiomaSelect" onchange="mudarIdioma(this.value)">
                <option value="pt">🇧🇷 PT</option>
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
              </select>
            </div>
            
            <div id="searchResultsList" class="cyber-search-results"></div>
          </div>
        </div>

        <a href="https://wa.me/15818938174" class="cyber-whatsapp-float" target="_blank" title="Fale com o Suporte no WhatsApp">
          <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp Suporte">
        </a>

        <canvas id="cyberMatrixCanvas"></canvas>`;
        
        document.body.insertAdjacentHTML('afterbegin', containerHtml);
    }

    // Canvas Matrix Pixels
    const canvas = document.getElementById('cyberMatrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let mouse = { x: null, y: null, radius: 150 };
        window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
        window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

        let particlesArray = [];
        const numberOfParticles = Math.floor((width * height) / 12000);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 1;
                this.speedY = Math.random() * 1.5 + 0.5;
                this.density = (Math.random() * 30) + 1;
            }
            draw() {
                ctx.fillStyle = '#00ff66';
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#00ff66';
                ctx.fillRect(this.x, this.y, this.size, this.size);
                ctx.shadowBlur = 0;
            }
            update() {
                this.y += this.speedY;
                if (this.y > height) { this.y = 0; this.x = Math.random() * width; }
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < mouse.radius) {
                        let force = (mouse.radius - distance) / mouse.radius;
                        this.x -= (dx / distance) * force * this.density;
                        this.y -= (dy / distance) * force * this.density;
                    }
                }
            }
        }

        for (let i = 0; i < numberOfParticles; i++) particlesArray.push(new Particle());
        function animate() {
            ctx.clearRect(0, 0, width, height);
            particlesArray.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        animate();
    }
})();

// Dicionário de Idiomas
const gsmDicionario = {
  pt: {
    "search_placeholder": "BUSCAR EM TODOS OS SERVIÇOS (UNLOCKTOOL, IMEI, SERVIDOR...)",
    "Recent Added": "Adicionados Recentemente",
    "Best Selling": "Mais Vendidos",
    "We Are Official Seller": "Somos Vendedores Oficiais",
    "Quick Delivery": "Entrega Rápida",
    "Results within minutes": "Resultados em minutos",
    "100% Secure": "100% Seguro",
    "SSL encrypted platform": "Plataforma criptografada SSL",
    "24/7 Support": "Suporte 24/7",
    "Always here to help you": "Sempre aqui para ajudar",
    "Easy Recharge": "Fácil Recarga",
    "Binance, Tether, Visa & more": "Binance, Tether, Visa e mais",
    "Company": "Empresa",
    "Home": "Início",
    "About Us": "Sobre Nós",
    "Contact Us": "Contato",
    "Reseller Panel": "Painel de Revendedor",
    "Free IMEI Checker": "Consulta IMEI Grátis",
    "Quick Access": "Acesso Rápido",
    "IMEI Service": "Serviço IMEI",
    "Server Service": "Serviço de Servidor",
    "Remote Service": "Serviço Remoto",
    "Service by Group": "Serviço por Grupo",
    "Legal": "Legal",
    "Privacy Policy": "Política de Privacidade",
    "Terms of Service": "Termos de Serviço",
    "Delivery Policy": "Política de Entrega",
    "Cancellation Policy": "Política de Cancelamento",
    "Refund & Return Policy": "Política de Reembolso",
    "Get the App": "Baixe o Aplicativo",
    "Order, track & get support from your phone.": "Peça, acompanhe e suporte pelo celular.",
    "Download on the": "Baixe na",
    "App Store": "App Store",
    "Get it on": "Disponível no",
    "Google Play": "Google Play",
    "Dashboard": "Painel Inicial",
    "Services": "Serviços",
    "Place Order": "Fazer Pedido",
    "Mass Order": "Pedido em Massa",
    "Orders": "Meus Pedidos",
    "Order History": "Histórico de Pedidos",
    "Add Funds": "Adicionar Saldo",
    "API": "API",
    "Tickets": "Suporte / Chamados",
    "Support": "Suporte",
    "Profile": "Perfil",
    "Logout": "Sair",
    "Login": "Entrar",
    "Register": "Cadastrar",
    "Username": "Usuário",
    "Password": "Senha",
    "Search": "Pesquisar",
    "Status": "Status",
    "Price": "Preço",
    "Quantity": "Quantidade",
    "Submit": "Enviar Pedido",
    "Success": "Sucesso",
    "Error": "Erro",
    "Pending": "Pendente",
    "Processing": "Processando",
    "Completed": "Concluído",
    "Cancelled": "Cancelado",
    "Rejected": "Rejeitado",
    "Service": "Serviço",
    "Description": "Descrição",
    "Total": "Total",
    "Actions": "Ações",
    "View": "Ver",
    "Details": "Detalhes",
    "Balance": "Saldo Disponível",
    "API Key": "Chave da API",
    "FAQ": "Dúvidas Frequentes",
    "Terms": "Termos",
    "Updates": "Atualizações"
  },
  en: {
    "search_placeholder": "SEARCH ALL SERVICES (UNLOCKTOOL, IMEI, SERVER...)",
    "Recent Added": "Recent Added",
    "Best Selling": "Best Selling",
    "We Are Official Seller": "We Are Official Seller",
    "Quick Delivery": "Quick Delivery",
    "Results within minutes": "Results within minutes",
    "100% Secure": "100% Secure",
    "SSL encrypted platform": "SSL encrypted platform",
    "24/7 Support": "24/7 Support",
    "Always here to help you": "Always here to help you",
    "Easy Recharge": "Easy Recharge",
    "Binance, Tether, Visa & more": "Binance, Tether, Visa & more",
    "Company": "Company",
    "Home": "Home",
    "About Us": "About Us",
    "Contact Us": "Contact Us",
    "Reseller Panel": "Reseller Panel",
    "Free IMEI Checker": "Free IMEI Checker",
    "Quick Access": "Quick Access",
    "IMEI Service": "IMEI Service",
    "Server Service": "Server Service",
    "Remote Service": "Remote Service",
    "Service by Group": "Service by Group",
    "Legal": "Legal",
    "Privacy Policy": "Privacy Policy",
    "Terms of Service": "Terms of Service",
    "Delivery Policy": "Delivery Policy",
    "Cancellation Policy": "Cancellation Policy",
    "Refund & Return Policy": "Refund & Return Policy",
    "Get the App": "Get the App",
    "Order, track & get support from your phone.": "Order, track & get support from your phone.",
    "Download on the": "Download on the",
    "App Store": "App Store",
    "Get it on": "Get it on",
    "Google Play": "Google Play",
    "Dashboard": "Dashboard",
    "Services": "Services",
    "Place Order": "Place Order",
    "Mass Order": "Mass Order",
    "Orders": "Orders History",
    "Order History": "Order History",
    "Add Funds": "Add Funds",
    "API": "API",
    "Tickets": "Support Tickets",
    "Support": "Support",
    "Profile": "Profile",
    "Logout": "Logout",
    "Login": "Login",
    "Register": "Register",
    "Username": "Username",
    "Password": "Password",
    "Search": "Search",
    "Status": "Status",
    "Price": "Price",
    "Quantity": "Quantity",
    "Submit": "Submit Order",
    "Success": "Success",
    "Error": "Error",
    "Pending": "Pending",
    "Processing": "Processing",
    "Completed": "Completed",
    "Cancelled": "Cancelled",
    "Rejected": "Rejected",
    "Service": "Service",
    "Description": "Description",
    "Total": "Total",
    "Actions": "Actions",
    "View": "View",
    "Details": "Details",
    "Balance": "Available Balance",
    "API Key": "API Key",
    "FAQ": "FAQ",
    "Terms": "Terms of Service",
    "Updates": "Updates"
  },
  es: {
    "search_placeholder": "BUSCAR EN TODOS LOS SERVICIOS (UNLOCKTOOL, IMEI, SERVIDOR...)",
    "Recent Added": "Agregados Recientemente",
    "Best Selling": "Más Vendidos",
    "We Are Official Seller": "Somos Vendedores Oficiales",
    "Quick Delivery": "Entrega Rápida",
    "Results within minutes": "Resultados en minutos",
    "100% Secure": "100% Seguro",
    "SSL encrypted platform": "Plataforma cifrada SSL",
    "24/7 Support": "Soporte 24/7",
    "Always here to help you": "Siempre aquí para ayudarte",
    "Easy Recharge": "Recarga Fácil",
    "Binance, Tether, Visa & more": "Binance, Tether, Visa y más",
    "Company": "Empresa",
    "Home": "Inicio",
    "About Us": "Sobre Nosotros",
    "Contact Us": "Contacto",
    "Reseller Panel": "Panel de Revendedor",
    "Free IMEI Checker": "Verificador IMEI Gratis",
    "Quick Access": "Acceso Rápido",
    "IMEI Service": "Servicio IMEI",
    "Server Service": "Servicio de Servidor",
    "Remote Service": "Servicio Remoto",
    "Service by Group": "Servicio por Grupo",
    "Legal": "Legal",
    "Privacy Policy": "Política de Privacidad",
    "Terms of Service": "Términos de Servicio",
    "Delivery Policy": "Política de Entrega",
    "Cancellation Policy": "Política de Cancelación",
    "Refund & Return Policy": "Política de Reembolso",
    "Get the App": "Obtener la Aplicación",
    "Order, track & get support from your phone.": "Pide, rastrea y obtén soporte desde tu teléfono.",
    "Download on the": "Descárgalo en la",
    "App Store": "App Store",
    "Get it on": "Disfrútalo en",
    "Google Play": "Google Play",
    "Dashboard": "Panel Inicial",
    "Services": "Servicios",
    "Place Order": "Hacer Pedido",
    "Mass Order": "Pedido Masivo",
    "Orders": "Historial de Pedidos",
    "Order History": "Historial de Pedidos",
    "Add Funds": "Agregar Saldo",
    "API": "API",
    "Tickets": "Soporte / Tickets",
    "Support": "Soporte",
    "Profile": "Perfil",
    "Logout": "Salir",
    "Login": "Entrar",
    "Register": "Registrarse",
    "Username": "Usuario",
    "Password": "Contraseña",
    "Search": "Buscar",
    "Status": "Estado",
    "Price": "Precio",
    "Quantity": "Cantidad",
    "Submit": "Enviar Pedido",
    "Success": "Éxito",
    "Error": "Error",
    "Pending": "Pendiente",
    "Processing": "Procesando",
    "Completed": "Completado",
    "Cancelled": "Cancelado",
    "Rejected": "Rechazado",
    "Service": "Servicio",
    "Description": "Descripción",
    "Total": "Total",
    "Actions": "Acciones",
    "View": "Ver",
    "Details": "Detalles",
    "Balance": "Saldo Disponible",
    "API Key": "Clave API",
    "FAQ": "Preguntas Frecuentes",
    "Terms": "Términos de Servicio",
    "Updates": "Actualizaciones"
  }
};

let idiomaAtual = localStorage.getItem('user_gsm_lang') || 'pt';

function mudarIdioma(lang) {
  idiomaAtual = lang;
  localStorage.setItem('user_gsm_lang', lang);
  aplicarIdiomaGlobal(lang);
}

function aplicarIdiomaGlobal(lang) {
  const t = gsmDicionario[lang];
  if (!t) return;
  const searchInput = document.getElementById('globalCyberSearch');
  if (searchInput && t["search_placeholder"]) searchInput.placeholder = t["search_placeholder"];

  function traduzirElementoRecursivo(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let textoOriginal = node.nodeValue.trim();
      if (textoOriginal.length > 0) {
        for (let chavePt in gsmDicionario['pt']) {
          if (gsmDicionario['pt'][chavePt].toLowerCase() === textoOriginal.toLowerCase()) {
            if (t[chavePt]) node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), t[chavePt]);
          }
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.id !== 'cyberMatrixCanvas' && node.id !== 'idiomaSelect') {
        if (node.placeholder) {
          for (let chavePt in gsmDicionario['pt']) {
            if (gsmDicionario['pt'][chavePt].toLowerCase() === node.placeholder.trim().toLowerCase()) {
              if (t[chavePt]) node.placeholder = t[chavePt];
            }
          }
        }
        for (let i = 0; i < node.childNodes.length; i++) traduzirElementoRecursivo(node.childNodes[i]);
      }
    }
  }
  traduzirElementoRecursivo(document.body);
  const select = document.getElementById('idiomaSelect');
  if (select) select.value = lang;
}

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(() => aplicarIdiomaGlobal(idiomaAtual), 300);
  const observer = new MutationObserver((mutations) => {
    if (mutations.some(m => m.addedNodes.length > 0)) aplicarIdiomaGlobal(idiomaAtual);
  });
  observer.observe(document.body, { childList: true, subtree: true });
});
