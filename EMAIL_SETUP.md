# Configuración del Sistema de Emails

Este documento explica cómo configurar y usar el sistema de envío de emails para el formulario de contacto.

## Configuración Actual

El sistema está configurado para enviar emails a: **sotillo257@gmail.com**

## Servicio Utilizado

Utilizamos **FormSubmit.co**, un servicio gratuito que permite enviar emails desde formularios estáticos sin necesidad de backend.

### Primera Vez - Activación Requerida

⚠️ **IMPORTANTE**: La primera vez que alguien envíe el formulario, FormSubmit.co enviará un email de confirmación a sotillo257@gmail.com. Debes hacer clic en el enlace de confirmación en ese email para activar el servicio.

## Cómo Agregar o Cambiar Emails

Puedes agregar múltiples emails editando el archivo `data/email-config.json`:

```json
{
  "recipients": [
    "sotillo257@gmail.com",
    "otro-email@ejemplo.com",
    "tercer-email@ejemplo.com"
  ],
  "formSubmitSettings": {
    "redirectUrl": "",
    "successMessage": "¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.",
    "errorMessage": "Hubo un error al enviar el mensaje. Por favor intenta nuevamente."
  }
}
```

### Explicación de los campos:

- **recipients**: Lista de emails que recibirán las notificaciones. El primero será el destinatario principal, los demás recibirán copia (CC).
- **successMessage**: Mensaje que se muestra cuando el email se envía correctamente.
- **errorMessage**: Mensaje que se muestra si hay un error al enviar.

## Características

- ✅ Envío de emails sin backend
- ✅ Múltiples destinatarios con CC
- ✅ Mensajes personalizables
- ✅ Validación de formulario
- ✅ Indicador de "Enviando..." mientras se procesa
- ✅ Emails formateados en tabla para fácil lectura

## Formato del Email

Los emails que recibirás tendrán el siguiente formato:

**Asunto**: Nuevo contacto de ojeador: [Nombre del contacto]

**Contenido**:
- Nombre del Club/Representante
- Email
- Teléfono
- Mensaje

## Solución de Problemas

### El formulario no envía emails

1. Verifica que hayas confirmado el email en FormSubmit.co (primer uso)
2. Revisa que el archivo `email-config.json` esté bien formateado
3. Verifica la consola del navegador para ver errores

### No recibo los emails

1. Revisa la carpeta de spam
2. Asegúrate de haber activado el servicio haciendo clic en el enlace de confirmación
3. Verifica que el email en `email-config.json` sea correcto

## Alternativas

Si prefieres usar otro servicio, puedes modificar el código en `js/app.js` en la función `initContactForm()` para usar:

- Formspree
- EmailJS
- SendGrid
- Tu propio backend

## Seguridad

- Los emails solo se envían desde tu dominio
- No se almacena información sensible en el código
- FormSubmit.co incluye protección contra spam
