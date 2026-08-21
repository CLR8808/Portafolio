document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando menú móvil mejorado...');
    
    const botonMenu = document.querySelector('.alternador-navegacion');
    const menu = document.querySelector('.enlaces-navegacion');
    const body = document.body;
    
    if (!botonMenu || !menu) {
        console.error('❌ Error: No se encontraron los elementos del menú');
        return;
    }
    
    console.log('✅ Elementos del menú encontrados correctamente');

    const overlay = document.createElement('div');
    overlay.className = 'overlay-menu';
    document.body.appendChild(overlay);

    function abrirMenu() {
        console.log('👉 ABRIENDO menú móvil mejorado...');
        menu.classList.add('activo');
        setTimeout(() => {
            menu.classList.add('mostrar');
        }, 10);
        botonMenu.classList.add('activo');
        body.classList.add('menu-abierto');
        overlay.classList.add('activo');
        console.log('✅ Menú abierto: Panel lateral visible');
    }

    function cerrarMenu() {
        console.log('👈 CERRANDO menú móvil...');
        menu.classList.remove('mostrar');
        setTimeout(() => {
            menu.classList.remove('activo');
        }, 300);
        botonMenu.classList.remove('activo');
        body.classList.remove('menu-abierto');
        overlay.classList.remove('activo');
        console.log('✅ Menú cerrado');
    }

    // Botón hamburguesa
    botonMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🖱️ Botón hamburguesa clickeado');
        
        if (menu.classList.contains('activo')) {
            cerrarMenu();
        } else {
            abrirMenu();
        }
    });

    // Enlaces del menú
    document.querySelectorAll('.enlaces-navegacion a').forEach(enlace => {
        enlace.addEventListener('click', function() {
            console.log('🔗 Enlace clickeado:', this.textContent);
            if (window.innerWidth <= 768) {
                cerrarMenu();
            }
        });
    });

    overlay.addEventListener('click', function() {
        console.log('🎯 Clic en overlay - cerrando menú');
        cerrarMenu();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menu.classList.contains('activo')) {
            console.log('⌨️ Tecla Escape - cerrando menú');
            cerrarMenu();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('activo')) {
            cerrarMenu();
        }
    });
});

// Efecto de scroll en navegación
window.addEventListener('scroll', function() {
    const navegacion = document.querySelector('.navegacion');
    if (window.scrollY > 100) {
        navegacion.classList.add('desplazada');
    } else {
        navegacion.classList.remove('desplazada');
    }
});

// Scroll suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const objetivo = document.querySelector(this.getAttribute('href'));
        if (objetivo) {
            objetivo.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sistema de notificaciones (usado por el formulario)
function mostrarNotificacion(mensaje, tipo = 'info') {
    const notificacionExistente = document.querySelector('.notificacion');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }
    
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <div class="contenido-notificacion">
            <i class="fas fa-${obtenerIconoNotificacion(tipo)}"></i>
            <span>${mensaje}</span>
        </div>
        <button class="cerrar-notificacion" aria-label="Cerrar notificación">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${obtenerColorNotificacion(tipo)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--sombra-lg);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: deslizarDerecha 0.3s ease-out;
    `;
    
    const botonCerrar = notificacion.querySelector('.cerrar-notificacion');
    botonCerrar.addEventListener('click', () => {
        notificacion.style.animation = 'deslizarFueraDerecha 0.3s ease-in forwards';
        setTimeout(() => notificacion.remove(), 300);
    });
    
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.style.animation = 'deslizarFueraDerecha 0.3s ease-in forwards';
            setTimeout(() => notificacion.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notificacion);
    
    if (!document.querySelector('#estilos-notificacion')) {
        const estilo = document.createElement('style');
        estilo.id = 'estilos-notificacion';
        estilo.textContent = `
            @keyframes deslizarDerecha {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes deslizarFueraDerecha {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .cerrar-notificacion {
                background: none; border: none; color: white; 
                cursor: pointer; padding: 0; font-size: 0.9rem;
            }
        `;
        document.head.appendChild(estilo);
    }
}

function obtenerIconoNotificacion(tipo) {
    const iconos = { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' };
    return iconos[tipo] || 'info-circle';
}

function obtenerColorNotificacion(tipo) {
    const colores = { success: '#10b981', error: '#ef4444', info: '#3b82f6' };
    return colores[tipo] || '#3b82f6';
}

// Animaciones de entrada
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('desvanecer-entrada');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tarjeta-proyecto, .contenido-sobre-mi, .visual-sobre-mi, .info-contacto, .formulario-contacto, .tarjeta-certificacion').forEach(el => {
        observador.observe(el);
    });
});

// Efectos hover para tarjetas
document.querySelectorAll('.tarjeta-proyecto').forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    tarjeta.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});
// Efectos para tarjetas de certificación
document.querySelectorAll('.tarjeta-certificacion').forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    tarjeta.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
    });
});