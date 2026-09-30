const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

async function measureResolution(width, height, label) {
  const userDataDir = path.join(__dirname, 'edge_user_data_' + width);
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9223',
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  try {
    let versionData = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        versionData = await new Promise((resolve, reject) => {
          http.get('http://127.0.0.1:9223/json/version', res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
              try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
            });
          }).on('error', reject);
        });
        if (versionData && versionData.webSocketDebuggerUrl) break;
      } catch (e) {}
    }

    if (!versionData) return null;

    const newPageData = await new Promise((resolve, reject) => {
      const req = http.request('http://127.0.0.1:9223/json/new?http://localhost:3000', { method: 'PUT' }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.end();
    });

    const ws = new WebSocket(newPageData.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve, reject } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    const send = (method, params = {}) => {
      const msgId = id++;
      return new Promise((resolve, reject) => {
        callbacks.set(msgId, { resolve, reject });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    };

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });

    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await new Promise(r => setTimeout(r, 4500));

    const result = await send('Runtime.evaluate', {
      expression: `(() => {
        const img = document.querySelector('img[alt="Captain Abyan Roaming"]');
        const bubble = document.querySelector('#hero div[class*="border-cyan-400"]');
        const runway = document.querySelector('div[class*="max-w-6xl"]');
        const hero = document.querySelector('#hero');
        const video = document.querySelector('video');

        const imgRect = img ? img.getBoundingClientRect() : null;
        const imgStyle = img ? window.getComputedStyle(img) : null;
        const bubbleRect = bubble ? bubble.getBoundingClientRect() : null;
        const runwayRect = runway ? runway.getBoundingClientRect() : null;
        const runwayStyle = runway ? window.getComputedStyle(runway) : null;
        const videoRect = video ? video.getBoundingClientRect() : null;

        return {
          window: { width: window.innerWidth, height: window.innerHeight },
          image: img ? {
            rect: { w: Math.round(imgRect.width), h: Math.round(imgRect.height), x: Math.round(imgRect.x), y: Math.round(imgRect.y) },
            computed: { width: imgStyle.width, height: imgStyle.height, transform: imgStyle.transform }
          } : null,
          speechBubble: bubble ? {
            outerHTML: bubble.outerHTML.slice(0, 300),
            rect: { w: Math.round(bubbleRect.width), h: Math.round(bubbleRect.height), x: Math.round(bubbleRect.x), y: Math.round(bubbleRect.y) },
            computed: {
              width: window.getComputedStyle(bubble).width,
              minWidth: window.getComputedStyle(bubble).minWidth,
              maxWidth: window.getComputedStyle(bubble).maxWidth,
              left: window.getComputedStyle(bubble).left,
              marginLeft: window.getComputedStyle(bubble).marginLeft,
              transform: window.getComputedStyle(bubble).transform
            }
          } : null,
          runway: runway ? {
            rect: { w: Math.round(runwayRect.width), h: Math.round(runwayRect.height), x: Math.round(runwayRect.x), y: Math.round(runwayRect.y) },
            computedHeight: runwayStyle.height
          } : null,
          video: video ? {
            rect: { w: Math.round(videoRect.width), h: Math.round(videoRect.height) }
          } : null
        };
      })()`,
      returnByValue: true
    });


    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(__dirname, `screenshot_${label}.png`), Buffer.from(screenshot.data, 'base64'));

    ws.close();
    return result.result.value;
  } finally {
    edge.kill();
  }
}

async function run() {
  console.log('Measuring Tablet (768px)...');
  const tablet = await measureResolution(768, 1024, 'tablet_768px');
  console.log('TABLET 768px RESULT:', JSON.stringify(tablet, null, 2));

  console.log('\nMeasuring Mobile (425px)...');
  const mobile = await measureResolution(425, 800, 'mobile_425px');
  console.log('MOBILE 425px RESULT:', JSON.stringify(mobile, null, 2));
}

run();
