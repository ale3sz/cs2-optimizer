// Base de datos de GPUs
const gpuDatabase = {
    "Gráficos Integrados (Intel HD / Vega)": "low",
    "NVIDIA GeForce GT 1030": "low",
    "NVIDIA GeForce GTX 750 Ti": "low",
    "NVIDIA GeForce GTX 950": "low",
    "NVIDIA GeForce GTX 960": "low",
    "NVIDIA GeForce GTX 1050": "low",
    "NVIDIA GeForce GTX 1050 Ti": "low",
    "NVIDIA GeForce GTX 1650": "low",
    "NVIDIA GeForce GTX 1060 (3GB/6GB)": "low",
    "NVIDIA GeForce GTX 1660 / Super / Ti": "mid",
    "NVIDIA GeForce RTX 2060 / Super": "mid",
    "NVIDIA GeForce RTX 2070 / Super": "mid",
    "NVIDIA GeForce RTX 3050": "mid",
    "NVIDIA GeForce RTX 3060 / Ti": "mid",
    "NVIDIA GeForce RTX 4060 / Ti": "mid",
    "NVIDIA GeForce RTX 3070 / Ti": "high",
    "NVIDIA GeForce RTX 3080 / Ti": "high",
    "NVIDIA GeForce RTX 4070 / Super / Ti": "high",
    "NVIDIA GeForce RTX 4080 / Super": "high",
    "NVIDIA GeForce RTX 4090": "high",
    "NVIDIA GeForce RTX 5080": "high",
    "NVIDIA GeForce RTX 5090": "high",
    "AMD Radeon RX 460 / 560": "low",
    "AMD Radeon RX 550": "low",
    "AMD Radeon RX 570": "low",
    "AMD Radeon RX 580": "low",
    "AMD Radeon RX 590": "low",
    "AMD Radeon RX 5500 XT": "low",
    "AMD Radeon RX 5600 XT": "mid",
    "AMD Radeon RX 5700 XT": "mid",
    "AMD Radeon RX 6500 XT": "low",
    "AMD Radeon RX 6600 / XT": "mid",
    "AMD Radeon RX 6700 XT": "mid",
    "AMD Radeon RX 7600 / XT": "mid",
    "AMD Radeon RX 6800 / XT": "high",
    "AMD Radeon RX 7800 XT": "high",
    "AMD Radeon RX 7900 XT / XTX": "high",
    "Intel Arc A380": "low",
    "Intel Arc A750": "mid",
    "Intel Arc A770": "mid"
};

// Base de datos de CPUs
const cpuDatabase = {
    "Intel Core i3 (Generaciones 2 a 9)": "low",
    "Intel Core i5 (Generaciones 2 a 7)": "low",
    "Intel Core i7 (Generaciones 2 a 7)": "low",
    "Intel Core i3 (Gen 10, 11, 12, 13, 14)": "mid",
    "Intel Core i5 (Gen 8, 9, 10, 11)": "mid",
    "Intel Core i5-12400F / 13400F / 14400F": "mid",
    "Intel Core i5-13600K / 14600K": "high",
    "Intel Core i7 (Gen 8, 9, 10, 11)": "mid",
    "Intel Core i7-12700K / 13700K / 14700K": "high",
    "Intel Core i9 (Cualquier Generación)": "high",
    "Intel Core Ultra 7 / 9 (Nuevos)": "high",
    "AMD FX Series (FX-6300, FX-8350)": "low",
    "AMD Ryzen 3 (1200, 2200G, 3200G, 4100)": "low",
    "AMD Ryzen 5 (1400, 1600, 2600, 3400G)": "low",
    "AMD Ryzen 5 3600 / 3600X": "mid",
    "AMD Ryzen 5 5600G / 5600 / 5600X": "mid",
    "AMD Ryzen 5 7600 / 7600X": "high",
    "AMD Ryzen 7 (1700, 2700)": "low",
    "AMD Ryzen 7 3700X": "mid",
    "AMD Ryzen 7 5700X / 5800X": "mid",
    "AMD Ryzen 7 5700X3D / 5800X3D": "high",
    "AMD Ryzen 7 7800X3D": "high",
    "AMD Ryzen 9 (3900X, 5900X)": "high",
    "AMD Ryzen 9 7900X3D / 7950X3D / 9950X": "high"
};

// Inicializar Selects
const gpuSelect = document.getElementById('gpuTier');
Object.keys(gpuDatabase).forEach(gpu => {
    let opt = document.createElement('option');
    opt.value = gpu;
    opt.textContent = gpu;
    gpuSelect.appendChild(opt);
});

const cpuSelect = document.getElementById('cpuTier');
Object.keys(cpuDatabase).forEach(cpu => {
    let opt = document.createElement('option');
    opt.value = cpu;
    opt.textContent = cpu;
    cpuSelect.appendChild(opt);
});

// Activar TomSelect
new TomSelect("#gpuTier", { create: false, sortField: { field: "text", direction: "asc" } });
new TomSelect("#cpuTier", { create: false, sortField: { field: "text", direction: "asc" } });

// Lógica de Generación
document.getElementById('generateBtn').addEventListener('click', () => {
    const selectedGpuName = document.getElementById('gpuTier').value;
    const selectedCpuName = document.getElementById('cpuTier').value;
    const resolution = document.getElementById('resolution').value;

    if (!selectedGpuName || !selectedCpuName) {
        Swal.fire({ icon: 'error', title: 'Faltan datos', text: 'Por favor selecciona tu gráfica y procesador antes de continuar.', background: '#141923', color: '#f1f2f6' });
        return;
    }

    const gpuTier = gpuDatabase[selectedGpuName];
    const cpuTier = cpuDatabase[selectedCpuName];

    // Lógica de Cuellos de Botella / Afiliados
    const upgradeDiv = document.getElementById('upgradeSuggestion');
    const upgradeText = document.getElementById('upgradeText');
    const affiliateLink = document.getElementById('affiliateLink');

    if (gpuTier === 'low') {
        upgradeDiv.classList.remove('hidden');
        upgradeText.innerHTML = `Tu <strong>${selectedGpuName}</strong> está limitando severamente tus FPS en CS2. La mejor mejora calidad-precio hoy es la <strong>AMD Radeon RX 7600</strong> o RTX 4060.`;
        affiliateLink.href = "https://meli.la/1XMNxki"; // Link real de RX 7600/4060
    } else if (cpuTier === 'low') {
        upgradeDiv.classList.remove('hidden');
        upgradeText.innerHTML = `Tu <strong>${selectedCpuName}</strong> está creando un cuello de botella enorme. Para CS2, recomendamos actualizar al <strong>Ryzen 5 5600</strong>.`;
        affiliateLink.href = "https://meli.la/2xwhaQ2"; // Link real de Ryzen 5600
    } else {
        upgradeDiv.classList.add('hidden');
    }

    // Animación de Carga
    Swal.fire({
        title: 'Analizando Hardware',
        html: `Optimizando motor Source 2 para:<br><span class="text-csgo-orange font-bold">${selectedCpuName}</span> + <span class="text-csgo-orange font-bold">${selectedGpuName}</span><br><br><div class="w-full bg-gray-700 h-2 rounded"><div class="bg-csgo-orange h-2 rounded w-0" id="swalProgress"></div></div>`,
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
                    setTimeout(() => generateAndDownload(gpuTier, cpuTier, resolution), 800);
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
