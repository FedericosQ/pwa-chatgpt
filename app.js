document.addEventListener("DOMContentLoaded", function () {
    function generateLink() {
        const html = document.getElementById('html')?.value || "";
        const css = document.getElementById('css')?.value || "";
        const js = document.getElementById('js')?.value || "";
    
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
    
        const compressed = LZString.compressToEncodedURIComponent(combinedHTML);
        const link = `${window.location.origin}/visor.html?code=${compressed}`;
    
        const linkContainer = document.getElementById('linkContainer');
        if (linkContainer) {
            linkContainer.innerHTML = `
                <a href="${link}" target="_blank">Abrir Preview</a>
                <button onclick="navigator.clipboard.writeText('${link}')">Copiar</button>
            `;
        }
    
        updateLivePreview(combinedHTML);
    }

    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.addEventListener('input', () => {
            const combinedHTML = `
                <!DOCTYPE html>
                <html>
                    <head><style>${document.getElementById('css')?.value || ""}</style></head>
                    <body>${document.getElementById('html')?.value || ""}
                        <script>${document.getElementById('js')?.value || ""}<\/script>
                    </body>
                </html>
            `;
            updateLivePreview(combinedHTML);
        });
    });

    function updateLivePreview(html) {
        const preview = document.getElementById('livePreview');
        if (preview) {
            preview.srcdoc = html;
        }
    }
});
