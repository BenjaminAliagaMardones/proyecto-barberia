# 🪒 La Sucursal - Landing Page

Landing page premium para barbería "La Sucursal" en Temuco, Chile.

## 🎨 Características

- **Diseño Elegante**: Paleta negro y dorado con estética vintage premium
- **100% Responsive**: Optimizado para móviles, tablets y desktop
- **Tailwind CSS**: Framework utility-first para estilos
- **Animaciones suaves**: Transiciones y efectos hover profesionales
- **SEO Optimizado**: Meta tags y estructura semántica
- **Formulario de Reserva**: Sistema integrable con n8n o webhook

## 📋 Mejoras Implementadas

### ✅ Hero Section
- Degradado radial mejorado (15% opacidad)
- Logo responsive (w-48 en móvil, w-64 en desktop)
- Texto descriptivo adicional
- Tamaños de texto ajustados para móvil

### ✅ Servicios
- Botón "Reservar este servicio" en hover
- Precio con animación hover (text-gold-light)
- Sombras doradas mejoradas

### ✅ Galería
- Cursor `cursor-zoom-in`
- Loading lazy en imágenes
- Preparado para modal lightbox

### ✅ Sobre Nosotros
- Imagen antes del texto en móvil
- Íconos mejorados (👤 ✂️ ⭐ 💼)

### ✅ Horarios
- Border radius agregado
- Efecto hover:scale-105

### ✅ Formulario
- Input type="time" para mejor UX
- Placeholder en textarea
- Mensaje de éxito visual
- Precios incluidos en opciones
- Preparado para webhook n8n

### ✅ Mapa
- Google Maps embebido
- Botón "Ver en Google Maps"

### ✅ Footer
- Íconos SVG de redes sociales
- Links con target="_blank" y rel="noopener noreferrer"
- Screen reader accessible

### ✅ Detalles Técnicos
- Favicon agregado
- Loading lazy en todas las imágenes
- JavaScript para scroll-to-top
- JavaScript para formulario

## 🚀 Próximos Pasos

### 1. Imágenes
```bash
# Copiar el logo a:
cp /home/benjamin/Imágenes/Capturas\ de\ pantalla/Captura\ desde\ 2025-10-19\ 16-40-00.png assets/images/logo.png

# Agregar imágenes de galería (6 fotos):
assets/images/gallery-1.jpg
assets/images/gallery-2.jpg
assets/images/gallery-3.jpg
assets/images/gallery-4.jpg
assets/images/gallery-5.jpg
assets/images/gallery-6.jpg

# Agregar foto del local:
assets/images/about.jpg
```

### 2. Google Maps
Reemplaza la URL del iframe en la sección de ubicación:
1. Ve a [Google Maps](https://maps.google.com)
2. Busca tu dirección
3. Click en "Compartir" → "Insertar un mapa"
4. Copia el código iframe
5. Reemplaza en línea ~445 del HTML

### 3. Webhook n8n (Opcional)
En el formulario (línea ~333), descomenta y configura:
```javascript
fetch('https://tuwebhook.n8n.cloud/webhook/barberia', {
    method: 'POST',
    body: formData
});
```

### 4. Lightbox para Galería
Instala [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/):
```html
<!-- Antes de </head> -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/css/lightbox.min.css" rel="stylesheet">

<!-- Antes de </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lightbox2/2.11.3/js/lightbox-plus-jquery.min.js"></script>
```

Luego modifica las imágenes:
```html
<a href="assets/images/gallery-1.jpg" data-lightbox="gallery">
    <img src="assets/images/gallery-1.jpg" alt="Corte clásico">
</a>
```

### 5. Íconos SVG para Servicios
Reemplaza emojis con [Lucide Icons](https://lucide.dev):
```html
<!-- Antes de </head> -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- En servicios -->
<i data-lucide="scissors" class="text-5xl text-gold-primary"></i>

<!-- Antes de </body> -->
<script>lucide.createIcons();</script>
```

### 6. Comprimir Imágenes
Usa [TinyPNG](https://tinypng.com) o [Squoosh](https://squoosh.app) para optimizar todas las imágenes.

### 7. Actualizar Información
- Teléfono: +56 9 1234 5678 → tu número real
- Email: contacto@lasucursal.cl → tu email
- Dirección: Calle Principal 123 → tu dirección
- Redes sociales: Agrega tus URLs reales

## 📱 Testing

Prueba en:
- ✅ Chrome Desktop
- ✅ Firefox Desktop
- ✅ Safari Desktop
- ✅ Chrome Mobile
- ✅ Safari iOS
- ✅ Samsung Internet

## 🎯 Performance

- Lazy loading en imágenes
- CDN de Tailwind
- Fuentes de Google Fonts optimizadas
- Sin dependencias pesadas

## 📄 Licencia

© 2025 La Sucursal Barbería - Todos los derechos reservados

---

Desarrollado con ❤️ para La Sucursal con formulario para agendar hora que se conecta mediante API a google calendar