# Sukuna v3 - WhatsApp Bot

Este es un bot de WhatsApp Multi-Device optimizado para estabilidad y bajo consumo de recursos.

## 🚀 Instalación en Termux

Para instalar y ejecutar el bot en Termux, copia y pega el siguiente comando:

```bash
pkg update && pkg upgrade -y && pkg install -y git nodejs ffmpeg imagemagick yarn && git clone https://github.com/The-King-Destroy/Sukuna-v3 && cd Sukuna-v3 && npm install && node index.js
```

### Pasos Detallados:

1. **Actualizar paquetes:**
   ```bash
   pkg update && pkg upgrade -y
   ```

2. **Instalar dependencias:**
   ```bash
   pkg install -y git nodejs ffmpeg imagemagick yarn
   ```

3. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/The-King-Destroy/Sukuna-v3
   cd Sukuna-v3
   ```

4. **Instalar módulos de Node.js:**
   ```bash
   npm install
   ```

5. **Iniciar el bot:**
   ```bash
   node index.js
   ```

## 🛠 Estructura del Proyecto

- `index.js`: Archivo de entrada principal.
- `src/handler.js`: Manejador central de mensajes y lógica del bot.
- `src/plugins/`: Carpeta que contiene todos los comandos y funcionalidades.
- `src/lib/`: Librerías y utilidades del sistema.

## ⚙️ Optimización

Este bot ha sido refactorizado para ofrecer:
- **Baja latencia:** Carga dinámica de comandos y caché de sesiones.
- **Estabilidad:** Manejo mejorado de conexiones y errores.
- **Ligereza:** Eliminación de plugins innecesarios.

---
Hecho con ❤️ por **Abrahan**
