// La Sucursal - Barbería Premium - JavaScript Principal

// ===========================
// SCROLL TO TOP BUTTON
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
// CONFIGURACIÓN DE HORARIOS
// ===========================
const HORARIOS_CONFIG = {
    intervaloMinutos: 30,
    lunesViernes: { inicio: 10, fin: 20 },
    sabado: { inicio: 10, fin: 18 },
    domingo: 'cerrado'
};

// ===========================
// FORMULARIO DE RESERVA
// ===========================
const reservaForm = document.getElementById('reservaForm');
const mensajeExito = document.getElementById('mensaje-exito');
const fechaInput = document.getElementById('fecha');
const horaSelect = document.getElementById('hora');
const btnSubmit = reservaForm.querySelector('button[type="submit"]');

/**
 * Genera las opciones de horario dinámicamente basado en la configuración
 */
function generarOpcionesHorario() {
    // Limpiar opciones existentes (excepto la primera)
    horaSelect.innerHTML = '<option value="">Selecciona una hora</option>';
    
    const { intervaloMinutos, lunesViernes } = HORARIOS_CONFIG;
    const horaInicio = lunesViernes.inicio;
    const horaFin = lunesViernes.fin;
    
    for (let hora = horaInicio; hora <= horaFin; hora++) {
        for (let minuto = 0; minuto < 60; minuto += intervaloMinutos) {
            // No agregar horarios después del cierre
            if (hora === horaFin && minuto > 0) break;
            
            const horaStr = String(hora).padStart(2, '0');
            const minutoStr = String(minuto).padStart(2, '0');
            const valor = `${horaStr}:${minutoStr}`;
            
            const option = document.createElement('option');
            option.value = valor;
            option.textContent = valor;
            horaSelect.appendChild(option);
        }
    }
}

/**
 * Configura las restricciones de fecha (mínimo hoy, máximo 2 meses)
 */
function configurarFechas() {
    const hoy = new Date().toISOString().split('T')[0];
    const maxFecha = new Date();
    maxFecha.setMonth(maxFecha.getMonth() + 2);
    fechaInput.min = hoy;
    fechaInput.max = maxFecha.toISOString().split('T')[0];
}

/**
 * Actualiza los horarios disponibles según el día seleccionado
 */
function actualizarHorariosDisponibles() {
    const fechaValue = fechaInput.value;
    
    if (!fechaValue) {
        // Habilitar todas las opciones si no hay fecha
        Array.from(horaSelect.options).forEach(option => {
            if (option.value) option.disabled = false;
        });
        return;
    }
    
    const fechaSeleccionada = new Date(fechaValue + 'T00:00:00');
    const diaSemana = fechaSeleccionada.getDay(); // 0=Domingo, 6=Sábado
    
    // Domingo cerrado
    if (diaSemana === 0) {
        fechaInput.setCustomValidity('❌ Los domingos estamos cerrados');
        fechaInput.reportValidity();
        fechaInput.value = '';
        return;
    }
    
    // Determinar horario según el día
    const horario = diaSemana === 6 
        ? HORARIOS_CONFIG.sabado 
        : HORARIOS_CONFIG.lunesViernes;
    
    Array.from(horaSelect.options).forEach(option => {
        if (!option.value) return; // Skip opción vacía
        
        const [hora, minuto] = option.value.split(':').map(Number);
        
        // Deshabilitar si está fuera del horario de ese día
        option.disabled = (
            hora < horario.inicio || 
            hora > horario.fin ||
            (hora === horario.fin && minuto > 0)
        );
    });
    
    // Si la hora seleccionada quedó deshabilitada, limpiarla
    const horaSeleccionada = horaSelect.value;
    if (horaSeleccionada) {
        const optionSeleccionada = Array.from(horaSelect.options).find(o => o.value === horaSeleccionada);
        if (optionSeleccionada && optionSeleccionada.disabled) {
            horaSelect.value = '';
        }
    }
}

// ===========================
// EVENT LISTENERS
// ===========================

// Validar fecha en tiempo real
fechaInput.addEventListener('change', function() {
    const fechaSeleccionada = new Date(this.value + 'T00:00:00');
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const maxFecha = new Date();
    maxFecha.setMonth(maxFecha.getMonth() + 2);
    maxFecha.setHours(23, 59, 59, 999);
    
    if (fechaSeleccionada < hoy) {
        this.setCustomValidity('No puedes reservar fechas pasadas');
        this.reportValidity();
    } else if (fechaSeleccionada > maxFecha) {
        this.setCustomValidity('Solo puedes reservar hasta 2 meses en adelante');
        this.reportValidity();
    } else {
        this.setCustomValidity('');
        actualizarHorariosDisponibles(); // Actualizar horarios disponibles
    }
});

// Submit del formulario
reservaForm.addEventListener('submit', (e) => {
    e.preventDefault();  // ✅ Esto previene el action del form
    
    // Validación adicional antes de enviar
    const fechaSeleccionada = new Date(fechaInput.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    const maxFecha = new Date();
    maxFecha.setMonth(maxFecha.getMonth() + 2);
    
    if (fechaSeleccionada < hoy) {
        fechaInput.setCustomValidity('No puedes reservar fechas pasadas');
        fechaInput.reportValidity();
        return;
    }
    
    if (fechaSeleccionada > maxFecha) {
        fechaInput.setCustomValidity('Solo puedes reservar hasta 2 meses en adelante');
        fechaInput.reportValidity();
        return;
    }
    
    // Deshabilitar botón durante el envío
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';
    
    // Aquí deberías tener el fetch a n8n
    const formData = new FormData(reservaForm);
    fetch('https://primary-production-5b04.up.railway.app/webhook-test/webhook-barbershop', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('✅ Enviado a n8n:', data);
        mensajeExito.classList.remove('hidden');
        reservaForm.reset();
        configurarFechas(); // Re-aplicar restricciones después del reset
    })
    .catch(error => {
        console.error('❌ Error:', error);
    })
    .finally(() => {
        // Rehabilitar botón
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Confirmar Reserva';
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.classList.add('hidden');
        }, 5000);
    });
});

// ===========================
// INICIALIZACIÓN
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    generarOpcionesHorario();
    configurarFechas();
});
