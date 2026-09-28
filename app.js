document.getElementById('generateBtn').addEventListener('click', () => {
    const gpuTier = document.getElementById('gpuTier').value;
    const cpuTier = document.getElementById('cpuTier').value;
    const resolution = document.getElementById('resolution').value;

    // 1. Mostrar sugerencia de Upgrade (Lógica de Afiliados)
    const upgradeDiv = document.getElementById('upgradeSuggestion');
    const upgradeText = document.getElementById('upgradeText');
    const affiliateLink = document.getElementById('affiliateLink');

    if (gpuTier === 'low') {
        upgradeDiv.classList.remove('hidden');
        upgradeText.innerHTML = "Tu tarjeta gráfica actual está limitando severamente tus FPS en CS2. La mejor mejora calidad-precio hoy es la <strong>AMD Radeon RX 7600</strong> o <strong>RTX 4060</strong>.";
        affiliateLink.href = "https://meli.la/1XMNxki";
    } else if (cpuTier === 'low') {
        upgradeDiv.classList.remove('hidden');
        upgradeText.innerHTML = "Tu procesador está creando un cuello de botella. Para CS2, necesitas un CPU potente. Recomendamos actualizar al <strong>Ryzen 5 5600</strong> o superior.";
        affiliateLink.href = "https://meli.la/2xwhaQ2";
    } else {
        upgradeDiv.classList.add('hidden');
    }

    // 2. Generar contenido de cs2_video.txt
    let videoConfig = `"video.cfg"\n{\n\t"Version"\t\t"16"\n`;
    videoConfig += `\t"setting.fullscreen"\t\t"1"\n\t"setting.nowindowborder"\t\t"0"\n`; // Siempre pantalla completa exclusiva
    
    if (resolution === 'stretched') {
        videoConfig += `\t"setting.defaultres"\t\t"1280"\n\t"setting.defaultresheight"\t\t"960"\n\t"setting.aspectratiomode"\t\t"0"\n`;
    } else {
        videoConfig += `\t"setting.defaultres"\t\t"1920"\n\t"setting.defaultresheight"\t\t"1080"\n\t"setting.aspectratiomode"\t\t"1"\n`;
    }

    if (gpuTier === 'low') {
        videoConfig += `\t"setting.videocfg_hdr_detail"\t\t"0"\n`; // Rendimiento
        videoConfig += `\t"setting.videocfg_fsr_detail"\t\t"2"\n`; // FSR Balanced
        videoConfig += `\t"setting.videocfg_shadow_quality"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_texture_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_particle_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_ao_detail"\t\t"0"\n`;
    } else if (gpuTier === 'mid') {
        videoConfig += `\t"setting.videocfg_hdr_detail"\t\t"0"\n`; 
        videoConfig += `\t"setting.videocfg_fsr_detail"\t\t"0"\n`; // FSR Off / Native
        videoConfig += `\t"setting.videocfg_shadow_quality"\t\t"2"\n`; // Sombras altas importan
        videoConfig += `\t"setting.videocfg_texture_detail"\t\t"1"\n`;
        videoConfig += `\t"setting.videocfg_particle_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_ao_detail"\t\t"1"\n`;
    } else {
        videoConfig += `\t"setting.videocfg_hdr_detail"\t\t"3"\n`; 
        videoConfig += `\t"setting.videocfg_fsr_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_shadow_quality"\t\t"3"\n`;
        videoConfig += `\t"setting.videocfg_texture_detail"\t\t"2"\n`;
        videoConfig += `\t"setting.videocfg_particle_detail"\t\t"2"\n`;
        videoConfig += `\t"setting.videocfg_ao_detail"\t\t"2"\n`;
    }
    videoConfig += `\t"setting.r_low_latency"\t\t"1"\n}\n`;

    // 3. Generar contenido de autoexec.cfg
    let autoexecConfig = `// CS2 Auto-Optimizer Config\n`;
    autoexecConfig += `fps_max 0\n`;
    autoexecConfig += `rate 786432\n`;
    autoexecConfig += `cq_netgraph 1\n`;
    autoexecConfig += `cl_updaterate 128\n`;
    autoexecConfig += `cl_interp_ratio 1\n`;
    autoexecConfig += `cl_interp 0.015625\n`;
    
    if (cpuTier === 'low') {
        // Configuraciones de red seguras para evitar saturar CPU débiles
        autoexecConfig += `engine_low_latency_sleep_after_client_tick true\n`;
    }

    autoexecConfig += `\nhost_writeconfig\n`;
    autoexecConfig += `echo "CS2 Auto-Optimizer Config Cargada Correctamente!"\n`;

    // 4. Descargar archivos
    downloadFile('cs2_video.txt', videoConfig);
    
    setTimeout(() => {
        downloadFile('autoexec.cfg', autoexecConfig);
        alert('¡Tus archivos han sido generados!\n\n1. Copia cs2_video.txt en: Steam/userdata/[tu_id]/730/local/cfg\n2. Copia autoexec.cfg en: Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg');
    }, 500);
});

function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
