#!/bin/bash

echo "========================================"
echo "  LANCEMENT DU SERVEUR LOCAL"
echo "========================================"
echo ""
echo "Le site sera disponible à : http://localhost:8000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""
echo "========================================"
echo ""

python3 -m http.server 8000
