// Datos de productos mejorados
const productos = [
    {
        id: 1,
        nombre: "Textil Maya con Hilos de Oro",
        precio: "85 USDC",
        categoria: "textil",
        artesano: "María González - Comunidad Maya",
        imagen: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        descripcion: "Textil tradicional tejido a mano con hilos de oro de 24k. Técnica ancestral transmitida por generaciones que representa la conexión entre la tierra y el cielo.",
        historia: "Cada patrón cuenta una historia de la cosmovisión Maya. Los colores se obtienen de plantas locales y el tejido puede tomar hasta 3 meses completarse.",
        nft: true,
        caracteristicas: ["Tejido a mano", "Hilos de oro 24k", "Tintes naturales", "3 meses de trabajo"]
    },
    {
        id: 2,
        nombre: "Vaso Ceremonial de Barro Negro",
        precio: "45 USDC",
        categoria: "ceramica",
        artesano: "Juan Martínez - Oaxaca, México",
        imagen: "https://images.unsplash.com/photo-1572017932224-6e3a8f7a3b0e?w=400&h=300&fit=crop",
        descripcion: "Vaso ceremonial hecho con barro negro tradicional de San Bartolo Coyotepec, pulido con cuarzo y cocido en horno de leña.",
        historia: "Técnica única que data de la época prehispánica, pasada de abuelas a nietas. El brillo metálico se logra puliendo con piedras de río antes de la cocción.",
        nft: true,
        caracteristicas: ["Barro negro natural", "Pulido con cuarzo", "Horno de leña", "Técnica ancestral"]
    },
    {
        id: 3,
        nombre: "Collar de Plata con Turquesa",
        precio: "120 USDC",
        categoria: "joyeria",
        artesano: "Ana López - Comunidad Quechua",
        imagen: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
        descripcion: "Collar artesanal de plata 925 con turquesa natural de minas locales. Diseño inspirado en la Pachamama (Madre Tierra).",
        historia: "Cada turquesa es seleccionada manualmente por su energía y belleza natural. Los símbolos representan los elementos de la naturaleza.",
        nft: true,
        caracteristicas: ["Plata 925", "Turquesa natural", "Design Pachamama", "Hecho a mano"]
    },
    {
        id: 4,
        nombre: "Tapiz Andino Multicolor",
        precio: "95 USDC",
        categoria: "textil",
        artesano: "Carlos Mamani - Andes Peruanos",
        imagen: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
        descripcion: "Tapiz tejido en telar de cintura con lana de alpaca teñida naturalmente con plantas andinas.",
        historia: "Los colores representan los diferentes pisos ecológicos de los Andes. El diseño muestra la relación entre las montañas y el cielo.",
        nft: true,
        caracteristicas: ["Lana de alpaca", "Tintes naturales", "Telar de cintura", "Design andino"]
    },
    {
        id: 5,
        nombre: "Máscara Ritual de Madera",
        precio: "150 USDC",
        categoria: "madera",
        artesano: "Diego Huaman - Amazonía Peruana",
        imagen: "https://images.unsplash.com/photo-1562778612-e1e0c0f0a1e5?w=400&h=300&fit=crop",
        descripcion: "Máscara ceremonial tallada en madera de chonta, utilizada en rituales ancestrales de la Amazonía.",
        historia: "Cada máscara representa un espíritu de la selva. La talla puede tomar hasta 2 meses y se utilizan herramientas tradicionales.",
        nft: true,
        caracteristicas: ["Madera de chonta", "Talla manual", "Pigmentos naturales", "Uso ceremonial"]
    },
    {
        id: 6,
        nombre: "Set de Cerámica Precolombina",
        precio: "180 USDC",
        categoria: "ceramica",
        artesano: "Rosa Quispe - Cultura Aymara",
        imagen: "https://images.unsplash.com/photo-1577985057584-707d06bd00d9?w=400&h=300&fit=crop",
        descripcion: "Set de 3 piezas de cerámica con diseños precolombinos, elaboradas con arcilla local y técnicas milenarias.",
        historia: "Los diseños se basan en petroglifos encontrados en la región. Cada pieza cuenta una historia diferente de la cosmovisión Aymara.",
        nft: true,
        caracteristicas: ["Arcilla local", "Diseños precolombinos", "Técnica milenaria", "Set de 3 piezas"]
    }
];

// Elementos del DOM
const productsGrid = document.getElementById('productsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('productModal');
const modalContent = document.getElementById('modalContent');
const closeModal = document.querySelector('.close-modal');
const connectWalletBtn = document.getElementById('connectWallet');

// Estado de la aplicación
let walletConnected = false;

// Cargar productos en la grid
function cargarProductos(categoria = 'all') {
    productsGrid.innerHTML = '';
    
    const productosFiltrados = categoria === 'all' 
        ? productos 
        : productos.filter(producto => producto.categoria === categoria);
    
    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: var(--text-light);"></i>
                <h3>No hay productos en esta categoría</h3>
                <p>Prueba con otra categoría o vuelve más tarde</p>
            </div>
        `;
        return;
    }
    
    productosFiltrados.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${producto.nombre}</h3>
                <p class="product-artisan">${producto.artesano}</p>
                <div class="product-price">${producto.precio}</div>
                <div class="product-actions">
                    <button class="btn-buy" onclick="comprarProducto(${producto.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Comprar
                    </button>
                    <button class="btn-details" onclick="mostrarDetalles(${producto.id})">
                        <i class="fas fa-eye"></i>
                        Detalles
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Mostrar detalles del producto en modal - VERSIÓN MEJORADA CON AR
function mostrarDetalles(productoId) {
    const producto = productos.find(p => p.id === productoId);
    
    const caracteristicasHTML = producto.caracteristicas.map(caract => 
        `<li><i class="fas fa-check" style="color: var(--primary);"></i> ${caract}</li>`
    ).join('');
    
    modalContent.innerHTML = `
        <div class="modal-product">
            <div class="modal-images">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="modal-main-image">
            </div>
            <div class="modal-details">
                <h2>${producto.nombre}</h2>
                <p class="modal-artisan">${producto.artesano}</p>
                
                <div class="modal-price-section">
                    <div class="modal-price">${producto.precio}</div>
                    <div class="nft-badge">
                        <i class="fas fa-certificate"></i>
                        NFT de Autenticidad Incluido
                    </div>
                </div>
                
                <div class="modal-description">
                    <h4>Descripción</h4>
                    <p>${producto.descripcion}</p>
                </div>
                
                <div class="modal-history">
                    <h4>Historia y Origen</h4>
                    <p>${producto.historia}</p>
                </div>
                
                <div class="modal-features">
                    <h4>Características</h4>
                    <ul class="features-list">
                        ${caracteristicasHTML}
                    </ul>
                </div>

                <!-- NUEVA SECCIÓN DE REALIDAD AUMENTADA -->
                <div class="modal-ar-section">
                    <h4>Ver en tu Espacio</h4>
                    <button class="btn-ar" onclick="activateAR(${producto.id})">
                        <i class="fas fa-cube"></i>
                        Ver en Realidad Aumentada
                    </button>
                    <div id="arViewer-${producto.id}" class="ar-viewer" style="display: none;">
                        <p>🔍 Apunta tu cámara a una superficie plana</p>
                        <p><small>Esta funcionalidad está en desarrollo. Pronto podrás ver esta pieza en tu espacio real.</small></p>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn btn-primary" onclick="comprarProducto(${producto.id})" style="width: 100%;">
                        <i class="fas fa-bolt"></i>
                        Comprar Ahora con USDC
                    </button>
                    <p class="modal-note">
                        <i class="fas fa-info-circle"></i>
                        Pago seguro mediante contrato inteligente. 98% va directo al artesano.
                    </p>
                </div>
            </div>
        </div>
        <span class="close-modal">&times;</span>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Actualizar el event listener del close
    const newCloseModal = modalContent.querySelector('.close-modal');
    newCloseModal.addEventListener('click', cerrarModal);
}

// Función de Realidad Aumentada
function activateAR(productId) {
    const arViewer = document.getElementById(`arViewer-${productId}`);
    const btn = event.target;
    
    // Simular activación de AR
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Activando AR...';
    btn.disabled = true;
    
    setTimeout(() => {
        arViewer.style.display = 'block';
        btn.style.display = 'none';
        
        // En una implementación real, aquí inicializarías AR.js o similar
        mostrarNotificacion('AR activado. Apunta tu cámara a una superficie plana.', 'success');
        
        // Simular vista AR después de 2 segundos
        setTimeout(() => {
            arViewer.innerHTML = `
                <p>🎯 Enfoca tu cámara a un espacio vacío</p>
                <div style="background: var(--primary-light); color: white; padding: 2rem; border-radius: var(--radius); margin: 1rem 0;">
                    <i class="fas fa-cube" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>Modelo 3D cargado exitosamente</p>
                </div>
                <p><small>Mueve tu dispositivo para ver la artesanía desde diferentes ángulos</small></p>
            `;
        }, 2000);
    }, 1500);
}

function cerrarModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navegación móvil
document.querySelector('.nav-toggle')?.addEventListener('click', function() {
    this.classList.toggle('active');
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
});

// Cerrar menú móvil al hacer clic en un link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-toggle').classList.remove('active');
        document.querySelector('.nav-menu').classList.remove('active');
    });
});

// Estado de la simulación
let demoState = {
    currentStep: 1,
    selectedWallet: null,
    selectedProduct: null,
    walletConnected: false,
    walletAddress: null,
    nfts: []
};

// Productos para la demo
const demoProducts = {
    1: { name: "Textil Maya con Hilos de Oro", price: 85, image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=150&fit=crop" },
    2: { name: "Vaso de Barro Negro de Oaxaca", price: 45, image: "https://images.unsplash.com/photo-1572017932224-6e3a8f7a3b0e?w=200&h=150&fit=crop" },
    3: { name: "Collar de Plata con Turquesa", price: 120, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=150&fit=crop" }
};

// Inicializar demo
function initDemo() {
    updateDemoSteps();
    attachEventListeners();
}

// Actualizar pasos de la demo
function updateDemoSteps() {
    // Actualizar indicadores de pasos
    document.querySelectorAll('.demo-step').forEach((step, index) => {
        const stepNumber = index + 1;
        if (stepNumber === demoState.currentStep) {
            step.classList.add('active');
        } else if (stepNumber < demoState.currentStep) {
            step.classList.remove('active');
            step.classList.add('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
    
    // Mostrar contenido del paso actual
    document.querySelectorAll('.demo-step-content').forEach((content, index) => {
        const stepNumber = index + 1;
        if (stepNumber === demoState.currentStep) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Attach event listeners
function attachEventListeners() {
    // Wallet selection
    document.querySelectorAll('.wallet-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.wallet-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            demoState.selectedWallet = this.dataset.wallet;
        });
    });
    
    // Product selection
    document.querySelectorAll('.demo-product').forEach(product => {
        product.addEventListener('click', function() {
            document.querySelectorAll('.demo-product').forEach(prod => prod.classList.remove('selected'));
            this.classList.add('selected');
            demoState.selectedProduct = this.dataset.product;
            document.getElementById('selectProductBtn').disabled = false;
        });
    });
}

// CONEXIÓN REAL CON WALLET - NUEVA FUNCIÓN
async function connectRealWallet() {
    try {
        // Verificar si MetaMask está instalado
        if (typeof window.ethereum === 'undefined') {
            alert('🦊 MetaMask no detectado. Por favor instálalo desde https://metamask.io');
            // Fallback a simulación
            connectWallet();
            return;
        }

        const connectBtn = document.querySelector('#step1 .btn-primary');
        connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
        connectBtn.disabled = true;

        // Solicitar conexión de cuenta
        const accounts = await ethereum.request({ 
            method: 'eth_requestAccounts' 
        });

        const account = accounts[0];
        
        // Actualizar estado
        demoState.walletConnected = true;
        demoState.walletAddress = account;
        walletConnected = true;
        
        // Actualizar UI
        connectBtn.innerHTML = '<i class="fas fa-check"></i> ¡Conectado!';
        connectBtn.style.background = 'var(--primary-dark)';
        
        // Mostrar información de wallet real
        document.getElementById('realWalletInfo').style.display = 'block';
        const addressShort = `${account.slice(0, 6)}...${account.slice(-4)}`;
        document.getElementById('walletAddress').textContent = addressShort;
        
        // Actualizar step info
        document.querySelector('#step1 .step-info h4').textContent = `Billetera Conectada`;
        document.querySelector('#step1 .step-info p').textContent = addressShort;
        
        // Actualizar balance real
        await updateRealBalance(account);
        
        // Actualizar botón principal de wallet
        updateMainWalletButton(account);
        
        // Avanzar al siguiente paso después de 1 segundo
        setTimeout(() => {
            demoState.currentStep = 2;
            updateDemoSteps();
        }, 1000);
        
    } catch (error) {
        console.error('Error conectando wallet:', error);
        const connectBtn = document.querySelector('#step1 .btn-primary');
        connectBtn.innerHTML = '<i class="fas fa-plug"></i> Conectar Wallet Real';
        connectBtn.disabled = false;
        
        if (error.code === 4001) {
            alert('❌ Conexión rechazada por el usuario');
        } else {
            alert('⚠️ Error conectando la billetera: ' + error.message);
        }
        
        // Fallback a simulación
        connectWallet();
    }
}

// Actualizar balance real desde blockchain
async function updateRealBalance(account) {
    try {
        // Obtener balance de MATIC
        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params: [account, 'latest']
        });
        
        // Convertir de wei a MATIC
        const balanceInMatic = parseInt(balance) / 1e18;
        
        // Actualizar UI
        document.getElementById('maticBalance').textContent = balanceInMatic.toFixed(4);
        
        // Simular balance USDC (en una app real, llamarías al contrato del token)
        document.getElementById('usdcBalance').textContent = '1,000.00';
        
    } catch (error) {
        console.error('Error obteniendo balance:', error);
        document.getElementById('maticBalance').textContent = '---';
        document.getElementById('usdcBalance').textContent = '---';
    }
}

// Actualizar botón principal de wallet
function updateMainWalletButton(account) {
    if (connectWalletBtn) {
        const addressShort = `${account.slice(0, 6)}...${account.slice(-4)}`;
        connectWalletBtn.innerHTML = `<i class="fas fa-check"></i> ${addressShort}`;
        connectWalletBtn.style.background = 'var(--primary-dark)';
    }
}

// Conexión simulada (fallback)
function connectWallet() {
    if (!demoState.selectedWallet) {
        alert('Por favor selecciona una billetera primero');
        return;
    }
    
    // Simular conexión
    demoState.walletConnected = true;
    walletConnected = true;
    
    // Mostrar loading
    const connectBtn = document.querySelector('#step1 .btn-primary');
    connectBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando...';
    connectBtn.disabled = true;
    
    setTimeout(() => {
        connectBtn.innerHTML = '<i class="fas fa-check"></i> ¡Conectado!';
        
        // Actualizar botón principal
        if (connectWalletBtn) {
            connectWalletBtn.innerHTML = '<i class="fas fa-check"></i> Wallet Simulada';
            connectWalletBtn.style.background = 'var(--primary-dark)';
        }
        
        // Avanzar al siguiente paso después de 1 segundo
        setTimeout(() => {
            demoState.currentStep = 2;
            updateDemoSteps();
        }, 1000);
    }, 2000);
}

// Seleccionar producto
function selectProduct() {
    if (!demoState.selectedProduct) {
        alert('Por favor selecciona un producto primero');
        return;
    }
    
    demoState.currentStep = 3;
    updateDemoSteps();
    updateTransactionDetails();
}

// Actualizar detalles de transacción
function updateTransactionDetails() {
    const product = demoProducts[demoState.selectedProduct];
    const fee = 0.15; // Comisión de red simulada
    
    document.getElementById('txProduct').textContent = product.name;
    document.getElementById('txPrice').textContent = `${product.price} USDC`;
    document.getElementById('txFee').textContent = `${fee} MATIC`;
    document.getElementById('txTotal').textContent = `${product.price} USDC + ${fee} MATIC`;
}

// Confirmar transacción con estados de carga mejorados
function confirmTransaction() {
    const confirmBtn = document.querySelector('#step3 .btn-primary');
    confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    confirmBtn.disabled = true;
    
    // Mostrar estados de carga de blockchain
    showBlockchainLoading();
    
    // Simular procesamiento en blockchain
    setTimeout(() => {
        simulateBlockchainConfirmation();
    }, 1500);
}

// Mostrar estados de carga de blockchain
function showBlockchainLoading() {
    const steps = [
        'Firmando transacción con tu wallet...',
        'Enviando a la red Polygon...',
        'Esperando confirmaciones...',
        'Ejecutando contrato inteligente...',
        'Transferiendo NFT...'
    ];
    
    const loadingHTML = steps.map((step, index) => `
        <div class="blockchain-step ${index === 0 ? 'loading' : ''}" id="step-${index}">
            <i class="fas ${index === 0 ? 'fa-spinner fa-spin' : 'fa-clock'}"></i>
            <span>${step}</span>
        </div>
    `).join('');
    
    document.getElementById('blockchainLoading').innerHTML = loadingHTML;
    document.getElementById('blockchainLoading').style.display = 'block';
}

// Actualizar paso de blockchain
function updateBlockchainStep(stepIndex, status) {
    const stepElement = document.getElementById(`step-${stepIndex}`);
    if (stepElement) {
        stepElement.classList.remove('loading');
        if (status === 'completed') {
            stepElement.classList.add('completed');
            stepElement.innerHTML = `<i class="fas fa-check-circle"></i><span>${stepElement.textContent}</span>`;
        }
        
        // Activar siguiente paso
        const nextStep = document.getElementById(`step-${stepIndex + 1}`);
        if (nextStep && status === 'completed') {
            nextStep.classList.add('loading');
            nextStep.innerHTML = `<i class="fas fa-spinner fa-spin"></i><span>${nextStep.textContent}</span>`;
        }
    }
}

function simulateBlockchainConfirmation() {
    const steps = 5;
    let currentStep = 0;
    
    function processStep() {
        if (currentStep < steps) {
            updateBlockchainStep(currentStep, 'completed');
            currentStep++;
            
            // Simular delay diferente para cada paso
            const delays = [1000, 1500, 2000, 1500, 1000];
            setTimeout(processStep, delays[currentStep - 1] || 1000);
        } else {
            completeTransaction();
        }
    }
    
    processStep();
}

function completeTransaction() {
    // Agregar NFT a la colección
    const product = demoProducts[demoState.selectedProduct];
    demoState.nfts.push({
        name: product.name,
        image: product.image,
        price: product.price,
        tokenId: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    });
    
    // Actualizar UI
    updateNFTCollection();
    
    // Avanzar al paso final
    demoState.currentStep = 4;
    updateDemoSteps();
    generateNFTPreview();
}

function updateNFTCollection() {
    const nftContainer = document.getElementById('nftCollection');
    
    if (demoState.nfts.length === 0) {
        nftContainer.innerHTML = '<div class="empty-nft">Aún no tienes NFTs</div>';
        return;
    }
    
    nftContainer.innerHTML = demoState.nfts.map(nft => `
        <div class="nft-item">
            <img src="${nft.image}" alt="${nft.name}">
            <div>
                <div style="font-weight: 600; font-size: 0.8rem;">${nft.name}</div>
                <div style="font-size: 0.7rem; opacity: 0.7;">${nft.tokenId}</div>
            </div>
        </div>
    `).join('');
}

function generateNFTPreview() {
    const product = demoProducts[demoState.selectedProduct];
    const nftPreview = document.getElementById('nftPreview');
    const latestNFT = demoState.nfts[demoState.nfts.length - 1];
    
    nftPreview.innerHTML = `
        <div class="nft-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="nft-card-info">
                <h5>${product.name}</h5>
                <p>Certificado de Autenticidad Digital</p>
                <p><small>Token ID: ${latestNFT.tokenId}</small></p>
                <p><small>Red: Polygon</small></p>
            </div>
        </div>
    `;
}

// Navegación entre pasos
function previousStep() {
    if (demoState.currentStep > 1) {
        demoState.currentStep--;
        updateDemoSteps();
    }
}

// Reiniciar demo
function restartDemo() {
    demoState = {
        currentStep: 1,
        selectedWallet: null,
        selectedProduct: null,
        walletConnected: demoState.walletConnected, // Mantener estado de conexión
        walletAddress: demoState.walletAddress, // Mantener dirección
        nfts: [...demoState.nfts] // Mantener NFTs adquiridos
    };
    
    // Reset UI
    document.querySelectorAll('.wallet-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.demo-product').forEach(prod => prod.classList.remove('selected'));
    document.getElementById('selectProductBtn').disabled = true;
    document.getElementById('blockchainLoading').style.display = 'none';
    
    const connectBtn = document.querySelector('#step1 .btn-primary');
    if (demoState.walletConnected) {
        connectBtn.innerHTML = '<i class="fas fa-check"></i> ¡Conectado!';
        connectBtn.disabled = true;
    } else {
        connectBtn.innerHTML = '<i class="fas fa-plug"></i> Conectar Wallet Real';
        connectBtn.disabled = false;
    }
    
    updateDemoSteps();
    updateNFTCollection();
}

// Ver en blockchain (simulado)
function viewOnBlockchain() {
    if (demoState.walletConnected && demoState.walletAddress) {
        alert('🔗 En una implementación real, esto te llevaría a PolygonScan para ver los detalles de tu transacción en la blockchain.');
    } else {
        alert('🔗 Simulación: Esto te llevaría a PolygonScan para verificar la transacción.');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initDemo();
    cargarProductos();
    initScrollAnimations();
});

// Actualizar el botón original de conectar wallet
document.getElementById('connectWallet')?.addEventListener('click', async function() {
    if (typeof window.ethereum !== 'undefined' && !demoState.walletConnected) {
        await connectRealWallet();
    } else if (!demoState.walletConnected) {
        // Scroll a la sección de demo si no hay wallet conectada
        document.getElementById('web3-demo').scrollIntoView({ behavior: 'smooth' });
    }
    // Si ya está conectado, no hacer nada
});

// Simular compra de producto
function comprarProducto(productoId) {
    const producto = productos.find(p => p.id === productoId);
    
    if (!walletConnected) {
        alert('🔗 Por favor conecta tu billetera Web3 primero');
        document.getElementById('web3-demo').scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    const confirmar = confirm(`¿Confirmas la compra de "${producto.nombre}" por ${producto.precio}?\n\nEl pago se procesará mediante contrato inteligente y recibirás tu NFT de autenticidad.`);
    
    if (confirmar) {
        // Simular procesamiento
        mostrarProcesando();
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Mostrar confirmación
            mostrarConfirmacionCompra(producto);
        }, 2000);
    }
}

function mostrarProcesando() {
    modalContent.innerHTML = `
        <div class="processing">
            <div class="spinner"></div>
            <h3>Procesando tu compra...</h3>
            <p>Ejecutando contrato inteligente en Polygon</p>
            <div class="processing-steps">
                <div class="step active">
                    <i class="fas fa-check-circle"></i>
                    <span>Verificando fondos</span>
                </div>
                <div class="step">
                    <i class="fas fa-sync-alt"></i>
                    <span>Ejecutando contrato</span>
                </div>
                <div class="step">
                    <i class="fas fa-certificate"></i>
                    <span>Transfiriendo NFT</span>
                </div>
            </div>
        </div>
    `;
}

function mostrarConfirmacionCompra(producto) {
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">🎉</div>
            <h3>¡Compra Exitosa!</h3>
            <p>Has adquirido <strong>"${producto.nombre}"</strong></p>
            <div class="confirmation-details">
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <p><strong>NFT:</strong> Transferido a tu billetera</p>
                <p><strong>Artesano:</strong> ${producto.artesano}</p>
                <p><strong>Transacción:</strong> Confirmada en Polygon</p>
            </div>
            <button class="btn btn-primary" onclick="cerrarConfirmacion()">
                <i class="fas fa-check"></i>
                Entendido
            </button>
        </div>
    `;
    
    confirmation.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
    `;
    
    document.body.appendChild(confirmation);
}

function cerrarConfirmacion() {
    const confirmation = document.querySelector('.confirmation');
    if (confirmation) {
        confirmation.remove();
    }
}

// Conectar billetera (simulación)
connectWalletBtn.addEventListener('click', () => {
    if (!walletConnected) {
        // Ya manejado por la función async
        return;
    } else {
        // Desconectar
        walletConnected = false;
        demoState.walletConnected = false;
        demoState.walletAddress = null;
        connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Conectar Wallet';
        connectWalletBtn.style.background = 'var(--primary)';
        
        // Resetear demo
        restartDemo();
    }
});

// Filtros de productos
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase active al botón clickeado
        btn.classList.add('active');
        // Filtrar productos
        cargarProductos(btn.dataset.filter);
    });
});

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Scroll suave para enlaces internos
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Notificaciones
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${tipo}`;
    notification.textContent = mensaje;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${tipo === 'success' ? 'var(--primary)' : '#EF4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 4000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Animaciones al hacer scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    document.querySelectorAll('.product-card, .tech-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Escuchar cambios de cuenta en MetaMask
if (typeof window.ethereum !== 'undefined') {
    ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // Usuario desconectó su wallet
            walletConnected = false;
            demoState.walletConnected = false;
            demoState.walletAddress = null;
            
            // Actualizar UI
            if (connectWalletBtn) {
                connectWalletBtn.innerHTML = '<i class="fas fa-wallet"></i> Conectar Wallet';
                connectWalletBtn.style.background = 'var(--primary)';
            }
            
            document.getElementById('realWalletInfo').style.display = 'none';
            restartDemo();
        } else {
            // Usuario cambió de cuenta
            demoState.walletAddress = accounts[0];
            updateMainWalletButton(accounts[0]);
            updateRealBalance(accounts[0]);
        }
    });

    // Escuchar cambios de red
    ethereum.on('chainChanged', (chainId) => {
        // Recargar la página cuando cambie la red
        window.location.reload();
    });
}


