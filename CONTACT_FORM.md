# Formulario de Contacto - Configuración

## ¿Cómo funciona?

El formulario de contacto utiliza **FormSubmit.co**, un servicio gratuito que permite enviar emails desde formularios HTML sin necesidad de backend.

## Activación Inicial (IMPORTANTE)

**La primera vez que uses el formulario**, debes activar el servicio FormSubmit:

1. Abre el sitio web en tu navegador
2. Ve a la sección de **Contacto**
3. Llena el formulario con datos de prueba
4. Haz clic en **"Enviar Mensaje"**
5. FormSubmit enviará un email de confirmación a `sotillo257@gmail.com`
6. **Revisa tu bandeja de entrada** (o spam) y haz clic en el enlace de activación
7. Una vez activado, el formulario funcionará para todos los visitantes

## Características Implementadas

### ✅ Mejoras Realizadas:

1. **Validación mejorada del formulario**
   - Validación en tiempo real del email
   - Verificación de campos vacíos
   - Mensajes de error específicos

2. **Campos ocultos de FormSubmit configurados**
   - `_subject`: Define el asunto del email
   - `_template`: Usa formato de tabla para los datos
   - `_captcha`: Deshabilitado para mejor experiencia de usuario

3. **Mensajes de feedback visuales**
   - Notificaciones animadas de éxito/error
   - Indicador de "Enviando..." en el botón
   - Auto-desaparición después de 5 segundos

4. **Manejo de errores robusto**
   - Mensajes informativos en caso de error
   - Email de contacto alternativo mostrado
   - Logs en consola para debugging

5. **Endpoint AJAX de FormSubmit**
   - Utiliza `/ajax/` endpoint para mejor compatibilidad
   - No requiere redirección
   - Respuesta JSON para manejo programático

## Configuración de Destinatarios

Para agregar más emails que reciban los mensajes:

1. Abre el archivo `data/email-config.json`
2. Agrega emails al array `recipients`:

```json
{
  "recipients": [
    "sotillo257@gmail.com",
    "otro-email@ejemplo.com"
  ],
  "formSubmitSettings": {
    "successMessage": "¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.",
    "errorMessage": "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
  }
}
```

**Nota:** El primer email será el destinatario principal, los demás irán en copia (CC).

## Personalización de Mensajes

Puedes personalizar los mensajes de éxito y error editando `formSubmitSettings` en `data/email-config.json`.

## Solución de Problemas

### El formulario no envía emails

1. **Verifica que hayas activado FormSubmit** (ver "Activación Inicial")
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que el email en `email-config.json` sea correcto
4. Asegúrate de tener conexión a internet

### Los emails van a spam

- Pide a los destinatarios que marquen los emails como "No es spam"
- Esto mejorará la reputación del remitente

### Quiero usar mi propio servicio de email

Si prefieres usar otro servicio:

1. Modifica la función `initContactForm()` en `js/app.js`
2. Cambia el endpoint `https://formsubmit.co/ajax/${recipients[0]}`
3. Ajusta el formato de los datos según el nuevo servicio

## Alternativas a FormSubmit

Si FormSubmit no funciona para ti, considera:

- **EmailJS**: Requiere cuenta pero ofrece más control
- **Formspree**: Similar a FormSubmit con más opciones
- **Getform**: Gratuito con límite de envíos
- **Backend propio**: Usando Node.js, PHP, o Python

## Contacto Directo

En caso de que el formulario no funcione, los visitantes pueden contactar directamente a:
**sotillo257@gmail.com**

Este email se muestra automáticamente en los mensajes de error.
