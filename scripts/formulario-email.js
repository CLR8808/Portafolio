class FormularioContacto {
    constructor() {
        this.formulario = document.getElementById('formularioContacto');
        this.inicializado = false;
        this.inicializarEmailJS();
        this.agregarEventListeners();
    }

    inicializarEmailJS() {
        try {
            emailjs.init("h5jj-HWOTP4_2-0KN");
            this.inicializado = true;
            console.log('✅ EmailJS inicializado correctamente');
        } catch (error) {
            console.error('❌ Error inicializando EmailJS:', error);
            this.inicializado = false;
        }
    }

    agregarEventListeners() {
        if (this.formulario) {
            this.formulario.addEventListener('submit', (e) => this.enviarFormulario(e));
            

            this.formulario.addEventListener('input', (e) => this.validarCampo(e.target));
            
            console.log('✅ Event listeners del formulario agregados');
        } else {
            console.error('❌ No se encontró el formulario de contacto');
        }
    }

    validarCampo(campo) {
        const valor = campo.value.trim();
        
        switch(campo.id) {
            case 'nombre':
                if (valor && valor.length < 2) {
                    this.mostrarErrorCampo(campo, 'El nombre debe tener al menos 2 caracteres');
                } else {
                    this.limpiarErrorCampo(campo);
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (valor && !emailRegex.test(valor)) {
                    this.mostrarErrorCampo(campo, 'Ingresa un email válido');
                } else {
                    this.limpiarErrorCampo(campo);
                }
                break;
                
            case 'mensaje':
                if (valor && valor.length < 10) {
                    this.mostrarErrorCampo(campo, 'El mensaje debe tener al menos 10 caracteres');
                } else {
                    this.limpiarErrorCampo(campo);
                }
                break;
        }
    }

    mostrarErrorCampo(campo, mensaje) {
        this.limpiarErrorCampo(campo);
        campo.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-campo';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        `;
        errorElement.textContent = mensaje;
        
        campo.parentNode.appendChild(errorElement);
    }

    limpiarErrorCampo(campo) {
        campo.style.borderColor = '';
        const errorExistente = campo.parentNode.querySelector('.error-campo');
        if (errorExistente) {
            errorExistente.remove();
        }
    }

    async enviarFormulario(e) {
        e.preventDefault();
        
        if (!this.inicializado) {
            this.mostrarNotificacion('Error de configuración. Por favor, recarga la página.', 'error');
            return;
        }

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!this.validarFormulario(nombre, email, mensaje)) {
            return;
        }
        this.mostrarEstadoEnvio(true);

        try {
            // Configurar parámetros para el email
            const templateParams = {
                from_name: nombre,
                from_email: email,
                message: mensaje,
                to_email: 'lizarraga@engineer.com, car89992@gmail.com',
                fecha: new Date().toLocaleString('es-ES'),
                pagina: window.location.href
            };

            console.log('📤 Enviando email con datos:', templateParams);
            const resultado = await emailjs.send(
                'service_12xcgwi', 
                'template_yf5ygi4', 
                templateParams
            );

            console.log('✅ Email enviado exitosamente:', resultado);
            this.mostrarNotificacion('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            this.formulario.reset();

        } catch (error) {
            console.error('❌ Error enviando email:', error);
            
            let mensajeError = 'Error al enviar el mensaje. Intenta nuevamente.';
            if (error.text && error.text.includes('Invalid API key')) {
                mensajeError = 'Error de configuración. Verifica las claves de EmailJS.';
            } else if (error.text && error.text.includes('Service not found')) {
                mensajeError = 'Servicio no encontrado. Verifica el Service ID.';
            } else if (error.text && error.text.includes('Template not found')) {
                mensajeError = 'Plantilla no encontrada. Verifica el Template ID.';
            }
            
            this.mostrarNotificacion(mensajeError, 'error');
        } finally {
            this.mostrarEstadoEnvio(false);
        }
    }

    validarFormulario(nombre, email, mensaje) {
        // Validar campos vacíos
        if (!nombre || !email || !mensaje) {
            this.mostrarNotificacion('Por favor, completa todos los campos.', 'error');
            return false;
        }

        if (nombre.length < 2) {
            this.mostrarNotificacion('El nombre debe tener al menos 2 caracteres.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.mostrarNotificacion('Por favor, ingresa un email válido.', 'error');
            return false;
        }

        if (mensaje.length < 10) {
            this.mostrarNotificacion('El mensaje debe tener al menos 10 caracteres.', 'error');
            return false;
        }

        return true;
    }

    mostrarEstadoEnvio(enviando) {
        const botonEnviar = this.formulario.querySelector('button[type="submit"]');
        
        if (enviando) {
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;
        } else {
            botonEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> <span data-i18n="send_message">Enviar Mensaje</span>';
            botonEnviar.disabled = false;
        }
    }

    mostrarNotificacion(mensaje, tipo = 'info') {
        if (typeof mostrarNotificacion === 'function') {
            mostrarNotificacion(mensaje, tipo);
        } else {
            alert(mensaje);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        new FormularioContacto();
        console.log('🚀 Formulario de contacto inicializado y listo');
    }, 1000);
});