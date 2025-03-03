function generateLink() {
    // Obtener códigos del editor
    const html = document.getElementById('html').value;
    const css = document.getElementById('css').value;
    const js = document.getElementById('js').value;

    // Combinar en un solo documento HTML
    const combinedHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <style>${css}</style>
            </head>
            <body>${html}
                <script>${js}<\/script>
            </body>
        </html>
    `;

    // Comprimir y codificar
    const compressed = LZString.compressToEncodedURIComponent(combinedHTML);
    const link = `${window.location.origin}/visor.html?code=${compressed}`;

    // Mostrar enlace generado
    const linkContainer = document.getElementById('linkContainer');
    linkContainer.innerHTML = `
        <a href="${link}" target="_blank">Abrir Preview</a>
        <button onclick="navigator.clipboard.writeText('${link}')">Copiar</button>
    `;

    // Actualizar la vista previa en vivo
    updateLivePreview(combinedHTML);
}

// Actualización en tiempo real de la previsualización
document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', () => {
        const combinedHTML = `
            <!DOCTYPE html>
            <html>
                <head><style>${document.getElementById('css').value}</style></head>
                <body>${document.getElementById('html').value}
                    <script>${document.getElementById('js').value}<\/script>
                </body>
            </html>
        `;
        updateLivePreview(combinedHTML);
    });
});

function updateLivePreview(html) {
    document.getElementById('livePreview').srcdoc = html;
}
