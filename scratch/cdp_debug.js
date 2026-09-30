const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

async function main() {
  const userDataDir = path.join(__dirname, 'edge_user_data');
  if (!fs.existsSync(userDataDir)) {
    fs.mkdirSync(userDataDir, { recursive: true });
  }

  const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
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
          http.get('http://127.0.0.1:9222/json/version', res => {
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

    if (!versionData) {
      console.error('Could not connect to Edge CDP');
      return;
    }

    console.log('Connected to Edge CDP:', versionData.Browser);


    const newPageData = await new Promise((resolve, reject) => {
      const req = http.request('http://127.0.0.1:9222/json/new?http://localhost:3000', { method: 'PUT' }, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
        });
      });
      req.on('error', reject);
      req.end();
    });

    const wsUrl = newPageData.webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);

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
    await send('DOM.enable');


    await send('Emulation.setDeviceMetricsOverride', {
      width: 425,
      height: 800,
      deviceScaleFactor: 1,
      mobile: true,
    });

    console.log('Waiting for loading screen to complete and Hero to show...');
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape' });
    await new Promise(r => setTimeout(r, 4500));


    const debugInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const img = document.querySelector('img[alt="Captain Abyan Roaming"]');
        if (!img) return { error: 'Captain Abyan Roaming not found!' };

        const getTree = (el) => {
          const list = [];
          let cur = el;
          while (cur && cur !== document.body) {
            const rect = cur.getBoundingClientRect();
            const cs = window.getComputedStyle(cur);
            list.push({
              tag: cur.tagName.toLowerCase(),
              id: cur.id || undefined,
              className: cur.className || undefined,
              rect: {
                w: Math.round(rect.width),
                h: Math.round(rect.height),
                x: Math.round(rect.x),
                y: Math.round(rect.y)
              },
              computed: {
                width: cs.width,
                height: cs.height,
                maxWidth: cs.maxWidth,
                maxHeight: cs.maxHeight,
                flex: cs.flex,
                flexShrink: cs.flexShrink,
                flexGrow: cs.flexGrow,
                transform: cs.transform
              }
            });
            cur = cur.parentElement;
          }
          return list;
        };

        return {
          window: {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio
          },
          hierarchy: getTree(img)
        };
      })()`,
      returnByValue: true
    });

    console.log('--- DEBUG INFO (425px) ---');
    console.log(JSON.stringify(debugInfo.result.value, null, 2));


    const screenshot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshot.data, 'base64');
    fs.writeFileSync(path.join(__dirname, 'measured_425px.png'), buffer);
    console.log('Saved measured_425px.png');

    ws.close();
  } catch (err) {
    console.error('Error during CDP debug:', err);
  } finally {
    edge.kill();
  }
}

main();
