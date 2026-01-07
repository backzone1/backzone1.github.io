const routes = {
    home: () => renderHome(),
    memory: () => renderMemorySolver(),
    settings: () => renderSettings()
};

let currentPage = 'home';

function navigate(page) {
    currentPage = page;
    render();
}

function Sidebar() {
    const menuItems = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'memory', icon: '🃏', label: 'Memory Solver' },
        { id: 'settings', icon: '⚙️', label: 'Settings' }
    ];

    return `
        <aside class="fixed left-0 top-0 h-full w-64 bg-secondary/50 backdrop-blur-lg border-r border-white/10 p-4">
            <div class="mb-8">
                <h1 class="text-2xl font-bold text-gradient">7K Tools</h1>
                <p class="text-gray-400 text-sm">Helper & Utilities</p>
            </div>
            <nav class="space-y-2">
                ${menuItems.map(item => `
                    <button 
                        onclick="navigate('${item.id}')"
                        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-white/10 ${currentPage === item.id ? 'nav-active' : ''}"
                    >
                        <span class="text-xl">${item.icon}</span>
                        <span>${item.label}</span>
                    </button>
                `).join('')}
            </nav>
            <div class="absolute bottom-4 left-4 right-4">
                <div class="text-xs text-gray-500 text-center">
                    Made with ❤️ for 7K players
                </div>
            </div>
        </aside>
    `;
}

function renderHome() {
    return `
        <div class="animate-fadeIn">
            <h2 class="text-3xl font-bold mb-2">Welcome! 👋</h2>
            <p class="text-gray-400 mb-8">เลือกเครื่องมือที่ต้องการใช้งาน</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div onclick="navigate('memory')" class="card-hover cursor-pointer bg-secondary/50 rounded-2xl p-6 border border-white/10">
                    <div class="text-4xl mb-4">🃏</div>
                    <h3 class="text-xl font-bold text-gold mb-2">Memory Solver</h3>
                    <p class="text-gray-400 text-sm">ช่วยจำไพ่ในมินิเกมจับคู่ 24 ใบ อัดหน้าจอแล้วให้ AI หาคู่ให้</p>
                </div>
                
                <div class="card-hover cursor-pointer bg-secondary/50 rounded-2xl p-6 border border-white/10 opacity-50">
                    <div class="text-4xl mb-4">🎰</div>
                    <h3 class="text-xl font-bold text-gray-400 mb-2">Gacha Simulator</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </div>
                
                <div class="card-hover cursor-pointer bg-secondary/50 rounded-2xl p-6 border border-white/10 opacity-50">
                    <div class="text-4xl mb-4">📊</div>
                    <h3 class="text-xl font-bold text-gray-400 mb-2">Stats Calculator</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </div>
            </div>
        </div>
    `;
}

function renderMemorySolver() {
    return `
        <div class="animate-fadeIn">
            <h2 class="text-3xl font-bold mb-2">🃏 Memory Solver</h2>
            <p class="text-gray-400 mb-6">ช่วยจำไพ่ในมินิเกมจับคู่</p>
            
            <div class="bg-secondary/50 rounded-2xl p-6 border border-white/10 mb-6">
                <h3 class="font-bold mb-4">📖 วิธีใช้งาน</h3>
                <ol class="list-decimal list-inside space-y-2 text-gray-300">
                    <li>เข้าเกม 7K ไปที่หน้า Mini-Game</li>
                    <li>กดปุ่ม <span class="text-gold font-bold">Screen Record</span> ด้านล่าง เลือกหน้าเกม 7K</li>
                    <li>กดปุ่ม <span class="text-gold font-bold">Start</span> ในเกมเพื่อเริ่มพลิกไพ่</li>
                    <li>เมื่อพลิกไพ่ครบทุกใบแล้ว กลับมาที่แอปฯ แล้วกดปุ่ม <span class="text-gold font-bold">Stop Recording</span></li>
                    <li>รอให้แอปฯ ประมวลผลภาพและสร้างเฉลย</li>
                </ol>
            </div>
            
            <div class="flex flex-wrap gap-4 mb-6">
                <button id="startBtn" onclick="startRecording()" class="btn-glow bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <span class="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                    Screen Record
                </button>
                <button id="stopBtn" onclick="stopRecording()" disabled class="bg-gray-600 px-6 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed">
                    Stop Recording
                </button>
                <button id="resetBtn" onclick="resetMemory()" class="bg-secondary border border-white/20 px-6 py-3 rounded-xl font-bold hover:bg-white/10">
                    Reset
                </button>
            </div>
            
            <div id="status" class="text-gray-400 mb-4">พร้อมใช้งาน</div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-secondary/50 rounded-2xl p-4 border border-white/10">
                    <h3 class="font-bold mb-3">📹 Preview</h3>
                    <video id="preview" autoplay muted class="w-full rounded-lg bg-black/50 min-h-[200px]"></video>
                </div>
                
                <div id="resultSection" class="bg-secondary/50 rounded-2xl p-4 border border-white/10" style="display:none;">
                    <h3 class="font-bold mb-3">🎯 เฉลยคู่ไพ่</h3>
                    <div id="gridContainer" class="grid grid-cols-6 gap-2 mb-4"></div>
                    <div id="pairsList" class="space-y-2"></div>
                </div>
            </div>
            
            <canvas id="canvas" style="display:none;"></canvas>
        </div>
    `;
}

function renderSettings() {
    return `
        <div class="animate-fadeIn">
            <h2 class="text-3xl font-bold mb-2">⚙️ Settings</h2>
            <p class="text-gray-400 mb-6">ตั้งค่าแอปพลิเคชัน</p>
            
            <div class="bg-secondary/50 rounded-2xl p-6 border border-white/10">
                <p class="text-gray-400">Coming soon...</p>
            </div>
        </div>
    `;
}

function render() {
    const app = document.getElementById('app');
    const content = routes[currentPage] ? routes[currentPage]() : renderHome();
    
    app.innerHTML = `
        ${Sidebar()}
        <main class="ml-64 p-8">
            ${content}
        </main>
    `;
}

let mediaRecorder = null;
let recordedChunks = [];
let stream = null;
let compositeImage = null;

const PROCESSING_CONFIG = {
    fps: 10,
    scaleDown: 0.5,
    threshold: 30,
    progressUpdateInterval: 5
};

async function startRecording() {
    try {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' }
        });
        
        const preview = document.getElementById('preview');
        preview.srcObject = stream;
        
        recordedChunks = [];
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        
        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordedChunks.push(e.data);
        };
        
        mediaRecorder.onstop = () => processRecording();
        mediaRecorder.start(100);
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('status').textContent = '🔴 กำลังอัด... เล่นเกมได้เลย';
        document.getElementById('status').classList.add('text-red-400');
        
    } catch (err) {
        console.error('Error:', err);
        document.getElementById('status').textContent = '❌ ไม่สามารถเข้าถึงหน้าจอได้';
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('status').textContent = '⏳ กำลังประมวลผล...';
        document.getElementById('status').classList.remove('text-red-400');
    }
}

async function processRecording() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    document.getElementById('status').textContent = '🔍 กำลังวิเคราะห์ไพ่...';
    
    try {
        await analyzeVideo(blob);
        showResults();
    } catch (err) {
        console.error('Analysis error:', err);
        document.getElementById('status').textContent = '❌ เกิดข้อผิดพลาด: ' + err.message;
    }
}

async function analyzeVideo(blob) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(blob);

    await new Promise((resolve) => {
        video.onloadedmetadata = () => {
            video.currentTime = 0;
            resolve();
        };
    });

    await new Promise((resolve) => {
        video.onseeked = resolve;
    });

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    canvas.width = Math.floor(video.videoWidth * PROCESSING_CONFIG.scaleDown);
    canvas.height = Math.floor(video.videoHeight * PROCESSING_CONFIG.scaleDown);

    let duration = video.duration;
    if (!isFinite(duration)) {
        video.currentTime = 1e10;
        await new Promise(r => video.onseeked = r);
        duration = video.currentTime;
        video.currentTime = 0;
        await new Promise(r => video.onseeked = r);
    }

    const fps = PROCESSING_CONFIG.fps;
    const frameCount = Math.floor(duration * fps);

    video.currentTime = duration - 0.1;
    await new Promise((resolve) => {
        video.onseeked = resolve;
    });
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const baselineData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const result = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < baselineData.data.length; i++) {
        result.data[i] = baselineData.data[i];
    }

    const maxBrightness = new Float32Array(canvas.width * canvas.height);
    for (let pixelIndex = 0; pixelIndex < canvas.width * canvas.height; pixelIndex++) {
        const dataIndex = pixelIndex * 4;
        const baseBrightness = (baselineData.data[dataIndex] + baselineData.data[dataIndex + 1] + baselineData.data[dataIndex + 2]) / 3;
        maxBrightness[pixelIndex] = baseBrightness;
    }

    const threshold = PROCESSING_CONFIG.threshold;

    for (let i = 0; i < frameCount; i++) {
        video.currentTime = i / fps;
        await new Promise((resolve) => {
            video.onseeked = resolve;
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        for (let pixelIndex = 0; pixelIndex < canvas.width * canvas.height; pixelIndex++) {
            const dataIndex = pixelIndex * 4;

            const rDiff = Math.abs(currentData.data[dataIndex] - baselineData.data[dataIndex]);
            const gDiff = Math.abs(currentData.data[dataIndex + 1] - baselineData.data[dataIndex + 1]);
            const bDiff = Math.abs(currentData.data[dataIndex + 2] - baselineData.data[dataIndex + 2]);

            const totalDiff = (rDiff + gDiff + bDiff) / 3;

            if (totalDiff > threshold) {
                const brightness = (currentData.data[dataIndex] + currentData.data[dataIndex + 1] + currentData.data[dataIndex + 2]) / 3;

                if (brightness > maxBrightness[pixelIndex]) {
                    maxBrightness[pixelIndex] = brightness;
                    result.data[dataIndex] = currentData.data[dataIndex];
                    result.data[dataIndex + 1] = currentData.data[dataIndex + 1];
                    result.data[dataIndex + 2] = currentData.data[dataIndex + 2];
                    result.data[dataIndex + 3] = 255;
                }
            }
        }

        if (i % PROCESSING_CONFIG.progressUpdateInterval === 0 || i === frameCount - 1) {
            const progress = Math.round((i / frameCount) * 100);
            document.getElementById('status').textContent = `🔍 วิเคราะห์... ${progress}% (${i}/${frameCount} frames)`;
        }
    }

    ctx.putImageData(result, 0, 0);
    compositeImage = canvas.toDataURL("image/png");
    
    URL.revokeObjectURL(video.src);
}

function showResults() {
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('status').textContent = '✅ เสร็จสิ้น!';
    document.getElementById('status').classList.add('text-green-400');
    
    const grid = document.getElementById('gridContainer');
    const pairsList = document.getElementById('pairsList');
    
    grid.innerHTML = `
        <img src="${compositeImage}" class="w-full rounded-lg border border-white/20" style="grid-column: span 8;">
    `;
    grid.style.gridTemplateColumns = '1fr';
    
    pairsList.innerHTML = `
        <p class="text-green-400">✅ รูปด้านบนแสดงไพ่ทั้งหมดที่เปิดแล้ว</p>
        <p class="text-gray-400 text-sm mt-2">ใช้รูปนี้เพื่อจำตำแหน่งคู่ไพ่</p>
    `;
}

function resetMemory() {
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('status').textContent = 'พร้อมใช้งาน';
    document.getElementById('status').classList.remove('text-green-400', 'text-red-400');
    
    const preview = document.getElementById('preview');
    if (preview) preview.srcObject = null;
    
    recordedChunks = [];
    compositeImage = null;
}

render();
