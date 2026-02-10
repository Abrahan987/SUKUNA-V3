# Sukuna Bot V3

Bot de WhatsApp Multi-Device basado en Baileys.

## 🚀 Instalación en Termux

Para instalar el bot en Termux, sigue estos pasos cuidadosamente. **Es obligatorio instalar Node.js para que el comando `npm` funcione.**

### ⚡ Instalación Rápida (Recomendado)

Copia y pega este comando único para instalar todo automáticamente:

```bash
pkg update && pkg upgrade && pkg install -y git nodejs ffmpeg imagemagick && git clone https://github.com/Abrahan987/Billie-Bot && cd Billie-Bot && npm install && npm start
```

### 🛠️ Instalación Paso a Paso

1. **Configurar el almacenamiento:**

   ```bash
   termux-setup-storage
   ```

2. **Actualizar paquetes:**

   ```bash
   pkg update && pkg upgrade
   ```

3. **Instalar dependencias necesarias (¡IMPORTANTE!):**

   ```bash
   pkg install -y git nodejs ffmpeg imagemagick
   ```

   _Esto instalará `git` para descargar el bot y `nodejs` (que incluye `npm`)._

4. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/Abrahan987/Billie-Bot
   cd Billie-Bot
   ```

5. **Instalar las dependencias de Node.js:**

   ```bash
   npm install
   ```

6. **Iniciar el bot:**
   ```bash
   npm start
   ```

---

## 🛠 Scripts útiles

- **Iniciar:** `npm start`
- **Formatear código:** `npm run format`

---

### 👑 Propietario

- [Abrahan-M](https://github.com/Abrahan987)
