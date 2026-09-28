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
        upgradeText.innerHTML = "Tu tarjeta gráfica actual está limitando severamente tus FPS en CS2. La mejor mejora calidad-precio hoy es la <strong>AMD Radeon RX 7600</strong>.";
        affiliateLink.href = "https://meli.la/1XMNxki";
    } else if (cpuTier === 'low') {
        upgradeDiv.classList.remove('hidden');
        upgradeText.innerHTML = "Tu procesador está creando un cuello de botella. Para CS2, necesitas un CPU potente. Recomendamos actualizar al <strong>Ryzen 5 5600</strong>.";
        affiliateLink.href = "https://meli.la/2xwhaQ2";
    } else {
        upgradeDiv.classList.add('hidden');
    }

    // Usar SweetAlert2 para una animación de carga estilo Hacking/CS2
    Swal.fire({
        title: 'Analizando Hardware',
        html: 'Calculando parámetros óptimos del motor Source 2...<br><br><div class="w-full bg-gray-700 h-2 rounded"><div class="bg-csgo-orange h-2 rounded w-0" id="swalProgress"></div></div>',
        background: '#141923',
        color: '#f1f2f6',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            let progress = 0;
            const bar = document.getElementById('swalProgress');
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 20) + 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    bar.style.width = '100%';
                    setTimeout(() => generateAndDownload(gpuTier, cpuTier, resolution), 500);
                } else {
                    bar.style.width = progress + '%';
                }
            }, 300);
        }
    });
});

function generateAndDownload(gpuTier, cpuTier, resolution) {
    // Generar cs2_video.txt
    let videoConfig = `"video.cfg"\n{\n\t"Version"\t\t"16"\n`;
    videoConfig += `\t"setting.fullscreen"\t\t"1"\n\t"setting.nowindowborder"\t\t"0"\n`;
    
    if (resolution === 'stretched') {
        videoConfig += `\t"setting.defaultres"\t\t"1280"\n\t"setting.defaultresheight"\t\t"960"\n\t"setting.aspectratiomode"\t\t"0"\n`;
    } else {
        videoConfig += `\t"setting.defaultres"\t\t"1920"\n\t"setting.defaultresheight"\t\t"1080"\n\t"setting.aspectratiomode"\t\t"1"\n`;
    }

    if (gpuTier === 'low') {
        videoConfig += `\t"setting.videocfg_hdr_detail"\t\t"0"\n`; 
        videoConfig += `\t"setting.videocfg_fsr_detail"\t\t"2"\n`; 
        videoConfig += `\t"setting.videocfg_shadow_quality"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_texture_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_particle_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_ao_detail"\t\t"0"\n`;
    } else if (gpuTier === 'mid') {
        videoConfig += `\t"setting.videocfg_hdr_detail"\t\t"0"\n`; 
        videoConfig += `\t"setting.videocfg_fsr_detail"\t\t"0"\n`;
        videoConfig += `\t"setting.videocfg_shadow_quality"\t\t"2"\n`;
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

    // Generar autoexec.cfg
    let autoexecConfig = `// CS2 Auto-Optimizer Pro Config\n// Generado en cs2optimizer.com\n\n`;
    autoexecConfig += `fps_max 0\n`;
    autoexecConfig += `rate 786432\n`;
    autoexecConfig += `cq_netgraph 1\n`;
    autoexecConfig += `cl_updaterate 128\n`;
    autoexecConfig += `cl_interp_ratio 1\n`;
    autoexecConfig += `cl_interp 0.015625\n`;
    
    if (cpuTier === 'low') {
        autoexecConfig += `engine_low_latency_sleep_after_client_tick true\n`;
    }

    autoexecConfig += `\nhost_writeconfig\n`;
    autoexecConfig += `echo "==============================="\n`;
    autoexecConfig += `echo "CS2 Auto-Optimizer Config CARGADA"\n`;
    autoexecConfig += `echo "==============================="\n`;

    downloadFile('cs2_video.txt', videoConfig);
    setTimeout(() => {
        downloadFile('autoexec.cfg', autoexecConfig);
        Swal.fire({
            icon: 'success',
            title: '¡Archivos Generados!',
            html: '<p class="text-sm text-left mt-3 mb-2"><strong>1.</strong> Copia <code class="text-csgo-orange bg-gray-800 px-1">cs2_video.txt</code> a:<br><span class="text-xs text-gray-400 break-all">Steam/userdata/[tu_id]/730/local/cfg</span></p><p class="text-sm text-left mb-2"><strong>2.</strong> Copia <code class="text-csgo-orange bg-gray-800 px-1">autoexec.cfg</code> a:<br><span class="text-xs text-gray-400 break-all">Steam/steamapps/common/Counter-Strike Global Offensive/game/csgo/cfg</span></p>',
            background: '#141923',
            color: '#f1f2f6',
            confirmButtonColor: '#f39c12'
        });
    }, 500);
}

function downloadFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
