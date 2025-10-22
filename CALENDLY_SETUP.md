# Configuración de Calendly - La Sucursal

## 📋 Integración Implementada

Se ha integrado Calendly con el formulario de reservas utilizando un **modelo híbrido**:

1. El usuario completa sus datos básicos en nuestro formulario personalizado
2. Al hacer clic en "Seleccionar Fecha y Hora", se abre Calendly en popup
3. Los datos del formulario se pre-llenan automáticamente en Calendly
4. El usuario selecciona su fecha y hora disponible directamente en Calendly

## ⚙️ Configuración Requerida en Calendly

Para que la integración funcione correctamente, debes configurar **preguntas personalizadas** en tu evento de Calendly:

### Pasos:

1. Ingresa a tu cuenta de Calendly: https://calendly.com
2. Ve a tu evento "30min" (o el que estés usando)
3. En la sección **"Invitee Questions"** (Preguntas para el invitado)
4. Agrega las siguientes preguntas personalizadas:

#### Pregunta 1: Servicio Solicitado
- **Tipo**: One Line Text (Texto de una línea)
- **Pregunta**: "¿Qué servicio deseas?"
- **Campo interno**: `a1`
- **Requerido**: Sí

#### Pregunta 2: Notas Adicionales
- **Tipo**: Multi Line Text (Texto de múltiples líneas)
- **Pregunta**: "Notas adicionales (teléfono y preferencias)"
- **Campo interno**: `a2`
- **Requerido**: No

## 🎨 Personalización

El popup de Calendly está personalizado con los colores de La Sucursal:
- Color primario: `#D4AF37` (dorado)
- Color de texto: `#000000` (negro)

## 📝 Datos que se Envían

Cuando el usuario completa el formulario, se envían automáticamente:

- ✅ **Nombre completo**
- ✅ **Email**
- ✅ **Teléfono** (en las notas)
- ✅ **Servicio seleccionado**
- ✅ **Mensaje adicional** (si lo completó)

## 🔧 Modificar la URL de Calendly

Si necesitas cambiar la URL de Calendly, edita el archivo `/js/main.js`:

```javascript
const CALENDLY_URL = 'https://calendly.com/TU_USUARIO/TU_EVENTO';
```

## ✅ Ventajas de esta Integración

1. **Diseño personalizado**: Mantienes el estilo premium de La Sucursal
2. **Sin conflictos de horarios**: Calendly gestiona la disponibilidad automáticamente
3. **Recordatorios automáticos**: Calendly envía recordatorios por email/SMS
4. **Sincronización de calendario**: Se sincroniza con Google Calendar, Outlook, etc.
5. **Menos código**: No necesitas gestionar horarios manualmente
6. **Experiencia fluida**: El usuario no sale de tu sitio web

## 🚀 Próximos Pasos

1. Configurar las preguntas personalizadas en Calendly
2. Probar la integración
3. Personalizar los emails de confirmación en Calendly
4. Configurar recordatorios automáticos
