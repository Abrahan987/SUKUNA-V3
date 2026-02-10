#!/data/data/com.termux/files/usr/bin/bash

# Sukuna v3 - Termux Setup Script
# Developed to automate dependencies installation and bot startup

GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
BOLD='\033[1m'
RESET='\033[0m'

echo -e "${BLUE}${BOLD}--- INSTALACIÓN DE SUKUNA V3 EN TERMUX ---${RESET}"

# Update and upgrade
echo -e "${YELLOW}Actualizando paquetes...${RESET}"
pkg update -y && pkg upgrade -y

# Install dependencies
echo -e "${YELLOW}Instalando dependencias necesarias...${RESET}"
pkg install -y git nodejs ffmpeg imagemagick yarn

# Install npm dependencies
if [ -d "node_modules" ]; then
    echo -e "${GREEN}Dependencias de Node.js ya instaladas.${RESET}"
else
    echo -e "${YELLOW}Instalando módulos de Node.js...${RESET}"
    npm install
fi

# Start the bot
echo -e "${BLUE}${BOLD}Iniciando el bot...${RESET}"
node index.js
