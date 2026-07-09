
function createNavbar() {
    // 1: Construcción de todos los elementos ----
    const topContainer = document.createElement('div');
    const flexBar = document.createElement('div');
    
    // Logo Sector
    const logoDiv = document.createElement('div');
    const logoH5 = document.createElement('h5');
    const logoLink = document.createElement('a');
    const logoImg = document.createElement('img');
    const logoText = document.createTextNode('  W3Admin');

    // Botón de menú para celulares
    const sidebarControlBtn = document.createElement('label');
    const sidebarIcon = document.createElement('i');

    // Contenedor del buscador ( onclick en la plantilla original)
    const searchWrapper = document.createElement('div');
    const searchIconTrigger = document.createElement('div');

    // Botones de la derecha (Mensajes y Alertas)
    const rightButtonsContainer = document.createElement('div');
    const btnEnvelope = document.createElement('button');
    const iconEnvelope = document.createElement('i');
    const btnBell = document.createElement('button');
    const iconBell = document.createElement('i');

    // Botón de Perfil de Usuario
    const profileContainer = document.createElement('div');
    const btnProfile = document.createElement('div');
    const circleProfile = document.createElement('div');
    const iconProfile = document.createElement('i');

    logoLink.append(logoImg, logoText);
    logoH5.append(logoLink);
    logoDiv.append(logoH5);

    sidebarControlBtn.append(sidebarIcon);
    btnEnvelope.append(iconEnvelope);
    btnBell.append(iconBell);
    rightButtonsContainer.append(btnEnvelope, btnBell);

    circleProfile.append(iconProfile);
    btnProfile.append(circleProfile);
    profileContainer.append(btnProfile);

    searchWrapper.append(searchIconTrigger);

    flexBar.append(logoDiv, sidebarControlBtn, searchWrapper, rightButtonsContainer, profileContainer);
    topContainer.append(flexBar);

    // 2: Asignación de todas las clases y estilos con classList
    topContainer.classList.add('w3-top', 'w3-card');
    topContainer.style.height = '54px';

    flexBar.className = 'w3-flex-bar w3-theme w3-left-align';

    logoDiv.className = 'admin-logo w3-bar-item w3-hide-medium w3-hide-small';
    logoH5.style.lineHeight = '1';
    logoH5.style.margin = '0';
    logoH5.style.fontWeight = '300';
    
    logoLink.className = 'w3-button w3-bold';
    logoLink.href = './index.html';

    logoImg.className = 'w3-image';
    logoImg.src = './assets/admin-logo.png';
    logoImg.alt = 'w3mix';
    logoImg.width = 26;

    sidebarControlBtn.htmlFor = 'sidebar-control';
    sidebarControlBtn.className = 'w3-button w3-large w3-opacity-min';
    sidebarIcon.className = 'fa fa-bars';

    searchWrapper.style.width = '40%';
    searchIconTrigger.className = 'w3-display-right w3-padding-small w3-margin-right';
    searchIconTrigger.id = 'navbar-search-trigger'; // ID para poder enlazarle el evento en la vista

    rightButtonsContainer.className = 'w3-right';
    btnEnvelope.type = 'button';
    btnEnvelope.className = 'w3-button w3-large w3-opacity-min';
    iconEnvelope.className = 'fa fa-envelope-open';

    btnBell.type = 'button';
    btnBell.className = 'w3-button w3-large w3-opacity-min';
    iconBell.className = 'fa fa-bell';

    profileContainer.className = 'text-right';
    btnProfile.className = 'w3-button';
    circleProfile.className = 'w3-circle w3-center w3-text-white w3-primary';
    circleProfile.style.width = '38px';
    circleProfile.style.height = '38px';
    iconProfile.className = 'fa fa-fw fa-user fa';
    iconProfile.style.marginTop = '11px';

    return topContainer;
}

function createSidebar() {
    // 1: Construcción
    const nav = document.createElement('nav');
    const logoLink = document.createElement('a');
    const logoImg = document.createElement('img');
    const btnClose = document.createElement('a');
    const iconClose = document.createElement('i');
    
    const linkHome = document.createElement('a');
    const link1 = document.createElement('a');
    const link2 = document.createElement('a');

    
    logoLink.append(logoImg);
    btnClose.append(iconClose);
    nav.append(logoLink, btnClose, linkHome, link1, link2);

    // 2: Clases y Estilos
    nav.id = 'mySidebar';
    nav.className = 'w3-sidebar w3-bar-block w3-collapse w3-animate-left w3-card';
    nav.style.zIndex = '3';
    nav.style.width = '250px';

    logoLink.className = 'w3-bar-item w3-button w3-border-bottom w3-large';
    logoLink.href = '#';
    logoImg.src = 'https://www.w3schools.com/images/w3schools.png';
    logoImg.style.width = '80%';

    btnClose.className = 'w3-bar-item w3-button w3-hide-large w3-large';
    btnClose.href = 'javascript:void(0)';
    btnClose.id = 'sidebar-close-btn';
    btnClose.innerText = 'Close ';
    iconClose.className = 'fa fa-remove';

    linkHome.className = 'w3-bar-item w3-button w3-teal';
    linkHome.href = '#';
    linkHome.innerText = 'Home';

    link1.className = 'w3-bar-item w3-button';
    link1.href = '#';
    link1.innerText = 'Link 1';

    link2.className = 'w3-bar-item w3-button';
    link2.href = '#';
    link2.innerText = 'Link 2';

    return nav;
}

function createFooter() {
    // 1: Construcción
    const footer = document.createElement('footer');
    const text = document.createElement('p');

    footer.append(text);

    // 2: Clases y Estilos
    footer.className = 'w3-container w3-theme';
    footer.style.padding = '32px';
    text.innerText = '© 2026 - ISFT Nº 151 - Panel de Aplicación MVC';

    return footer;
}



// WebComponent principal
class WCApplicationView extends HTMLElement {
    constructor() {
        super();

        // Inicialización modular invocando a las funciones API DOM puras
        this.navbar = createNavbar();
        this.sidebar = createSidebar();
        

        this.mainContainer = document.createElement('div');
        this.mainContainer.className = 'w3-main';
        this.mainContainer.style.marginLeft = '250px';

        // Cuerpo central vacío para la aplicación
        this.content = document.createElement('div');
        this.content.className = 'w3-container';
        this.content.style.padding = '32px';
        this.content.style.marginTop = '64px';

        this.footer = createFooter();
        this.mainContainer.append(this.navbar, this.content, this.footer);

        // Overlay para celulares
        this.overlay = document.createElement('div');
        this.overlay.className = 'w3-overlay w3-hide-large w3-animate-opacity';
        this.overlay.style.cursor = 'pointer';

        this.append(this.sidebar, this.overlay, this.mainContainer);
    }


    // Manejador de eventos del ciclo de vida

    // El manejador semántico que reemplaza al onclick directo de la plantilla
    onSearchTriggerClick(event) {
        // Ejecuta de forma segura la equivalencia del código nativo de la plantilla
        if (event.currentTarget.parentNode.children[1]) {
            event.currentTarget.parentNode.children[1].focus();
        }
    }

    onOpenSidebarClick() {
        this.sidebar.style.display = 'block';
        this.overlay.style.display = 'block';
    }

    onCloseSidebarClick() {
        this.sidebar.style.display = 'none';
        this.overlay.style.display = 'none';
    }


    connectedCallback() {
        // enlaces con funciones declaradas
        this._handleSearchRef = this.onSearchTriggerClick.bind(this);
        this._handleOpenRef = this.onOpenSidebarClick.bind(this);
        this._handleCloseRef = this.onCloseSidebarClick.bind(this);

        const searchBtn = this.querySelector('#navbar-search-trigger');
        const openBtn = this.navbar.querySelector('label[for="sidebar-control"]');
        const closeBtn = this.sidebar.querySelector('#sidebar-close-btn');

        if (searchBtn) searchBtn.onclick = this._handleSearchRef;
        if (openBtn) openBtn.onclick = this._handleOpenRef;
        if (closeBtn) closeBtn.onclick = this._handleCloseRef;
        this.overlay.onclick = this._handleCloseRef;
    }

    disconnectedCallback() {
        // Limpieza de memoria
        const searchBtn = this.querySelector('#navbar-search-trigger');
        const openBtn = this.navbar.querySelector('label[for="sidebar-control"]');
        const closeBtn = this.sidebar.querySelector('#sidebar-close-btn');

        if (searchBtn) searchBtn.onclick = null;
        if (openBtn) openBtn.onclick = null;
        if (closeBtn) closeBtn.onclick = null;
        this.overlay.onclick = null;
    }
}

customElements.define('wc-application-view', WCApplicationView);