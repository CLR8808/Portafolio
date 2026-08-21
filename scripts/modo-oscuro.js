class ModoOscuro {
    constructor() {
        this.boton = document.getElementById('alternadorModoOscuro');
        this.icono = this.boton.querySelector('i');
        this.inicializar();
    }

    inicializar() {
        // Verificar preferencia guardada o usar preferencia del sistema
        const modoGuardado = localStorage.getItem('modoOscuro');
        const preferenciaSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (modoGuardado === null) {
            if (preferenciaSistema) {
                this.activarModoOscuro();
            } else {
                this.desactivarModoOscuro();
            }
        } else {
            if (modoGuardado === 'true') {
                this.activarModoOscuro();
            } else {
                this.desactivarModoOscuro();
            }
        }

        this.agregarEventListeners();
    }

    agregarEventListeners() {
        this.boton.addEventListener('click', () => this.alternarModo());
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('modoOscuro')) {
                if (e.matches) {
                    this.activarModoOscuro();
                } else {
                    this.desactivarModoOscuro();
                }
            }
        });
    }

    alternarModo() {
        if (document.documentElement.getAttribute('data-tema') === 'oscuro') {
            this.desactivarModoOscuro();
        } else {
            this.activarModoOscuro();
        }
    }

    activarModoOscuro() {
        document.documentElement.setAttribute('data-tema', 'oscuro');
        this.icono.classList.remove('fa-moon');
        this.icono.classList.add('fa-sun');
        localStorage.setItem('modoOscuro', 'true');
    }

    desactivarModoOscuro() {
        document.documentElement.removeAttribute('data-tema');
        this.icono.classList.remove('fa-sun');
        this.icono.classList.add('fa-moon');
        localStorage.setItem('modoOscuro', 'false');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ModoOscuro();
});