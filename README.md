# CS2 Auto-Optimizer

Este es un proyecto web de ingresos pasivos diseñado para la comunidad de Counter-Strike 2. 

## 🚀 Cómo funciona
1. Los usuarios seleccionan sus componentes.
2. El script en `app.js` genera la configuración óptima para maximizar los FPS.
3. Si el usuario tiene hardware de gama baja (ej. RX 550), la web despliega un cuadro de advertencia recomendando actualizar la PC e incluye tu **Link de Afiliado**.

## 💰 Próximos pasos para ti
1. **Crear cuenta de Afiliados:**
   Ve a [Amazon Afiliados](https://afiliados.amazon.es/) (o MercadoLibre/TiendaMia si prefieres el mercado local de Argentina) y regístrate. Te darán un link especial.
2. **Reemplazar Links en el Código:**
   Abre el archivo `app.js` y busca la línea donde dice: `affiliateLink.href = "https://tu-link-de-afiliado.com/rx7600";`. Reemplázalo con el link que te dio Amazon/MercadoLibre.
3. **Subir a Internet (Gratis):**
   Crearemos una cuenta en **GitHub** y usaremos **GitHub Pages** (o Vercel) para que tu página web tenga un link público como: `www.cs2optimizer.com` (o algo gratuito como `tu-nombre.github.io/cs2optimizer`).

## Estructura
- `index.html`: La interfaz (hecha con TailwindCSS para que se vea moderna y oscura, estilo CSGO).
- `app.js`: El cerebro. Analiza y crea los archivos `.cfg` o `.txt`.
