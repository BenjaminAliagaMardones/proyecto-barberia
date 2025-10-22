// La Sucursal - Barbería Premium - JavaScript Principal

// ===========================
// BOTÓN VOLVER ARRIBA
// ===========================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
        scrollTopBtn.classList.add('opacity-0', 'invisible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// INTEGRACIÓN CON CALENDLY
// ===========================
const CALENDLY_URL = 'https://calendly.com/benjaminmardones15/30min';

// ===========================
// FORMULARIO DE RESERVA
// ===========================
const reservaForm = document.getElementById('reservaForm');

/**
 * Abre Calendly en popup con los datos del formulario pre-llenados
 */
function abrirCalendlyConDatos(nombre, email, servicio, notas) {
    // Construir los parámetros para pre-llenar Calendly
    const prefillData = {
        name: nombre,
        email: email,
        customAnswers: {
            a1: servicio, // Respuesta personalizada 1: Servicio solicitado
            a2: notas || 'Sin notas adicionales' // Respuesta personalizada 2: Notas
        }
    };
    
    // Abrir Calendly en popup
    Calendly.initPopupWidget({
        url: CALENDLY_URL,
        prefill: prefillData,
        text: 'Agendar Cita',
        color: '#D4AF37',
        textColor: '#000000',
        branding: true
    });
    
    return false;
}

// ===========================
// EVENTOS
// ===========================

// Envío del formulario
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obtener datos del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value;
    
    // Construir notas combinadas
    const notas = `Servicio: ${servicio}\nTeléfono: ${telefono}${mensaje ? '\nNotas: ' + mensaje : ''}`;
    
    // Abrir Calendly con los datos
    abrirCalendlyConDatos(nombre, email, servicio, notas);
});

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Sistema de reservas con Calendly iniciado');
});
