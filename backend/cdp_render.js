const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

// ── CONFIG ────────────────────────────────────────────────────────────────────
// Fill these in before running:
const RENDER_EMAIL = process.env.RENDER_EMAIL || '';
const RENDER_PASSWORD = process.env.RENDER_PASSWORD || '';

// The correct Supabase env vars to set on Render:
const ENV_VARS = {
  DATABASE_URL: 'postgresql://postgres.ogrtlaoitthdflbyxldo:Seyon_Blr$$@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true',
  DIRECT_URL:   'postgresql://postgres.ogrtlaoitthdflbyxldo:Seyon_Blr$$@aws-0-ap-south-1.pooler.supabase.com:5432/postgres',
};
// ──────────────────────────────────────────────────────────────────────────────

function sendCommand(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const handler = (data) => {
      const msg = JSON.parse(data);
      if (msg.id === id) {
        ws.off('message', handler);
        if (msg.error) reject(new Error(JSON.stringify(msg.error)));
        else resolve(msg.result);
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => {
      ws.off('message', handler);
      reject(new Error(`Timeout waiting for command ${method}`));
    }, 30000);
  });
}

function waitForEvent(ws, eventName, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const handler = (data) => {
      const msg = JSON.parse(data);
      if (msg.method === eventName) {
        ws.off('message', handler);
        resolve(msg.params);
      }
    };
    ws.on('message', handler);
    setTimeout(() => {
      ws.off('message', handler);
      reject(new Error(`Timeout waiting for event ${eventName}`));
    }, timeout);
  });
}

async function waitForLoad(ws, timeout = 60000) {
  return waitForEvent(ws, 'Page.loadEventFired', timeout);
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function navigate(ws, cmdId, url) {
  await sendCommand(ws, cmdId++, 'Page.navigate', { url });
  await waitForLoad(ws);
  await sleep(3000);
  return cmdId;
}

async function getCurrentUrl(ws, cmdId) {
  const result = await sendCommand(ws, cmdId, 'Runtime.evaluate', {
    expression: 'window.location.href',
    returnByValue: true
  });
  return result.result.value;
}

async function getPageText(ws, cmdId, maxLen = 3000) {
  const result = await sendCommand(ws, cmdId, 'Runtime.evaluate', {
    expression: 'document.body.innerText',
    returnByValue: true
  });
  return (result.result.value || '').substring(0, maxLen);
}

async function evaluate(ws, cmdId, expression, awaitPromise = false) {
  const result = await sendCommand(ws, cmdId, 'Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise,
  });
  return result.result;
}

async function typeIntoField(ws, cmdId, selector, text) {
  // Set value directly via JS + fire events
  await evaluate(ws, cmdId, `
    (function() {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false;
      el.focus();
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      nativeInputValueSetter.call(el, ${JSON.stringify(text)});
      el.dispatchEvent(new Event('input', {bubbles: true}));
      el.dispatchEvent(new Event('change', {bubbles: true}));
      return true;
    })()
  `);
}

async function clickSelector(ws, cmdId, selector, wait = 1000) {
  await evaluate(ws, cmdId, `
    (function() {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (el) { el.click(); return true; }
      return false;
    })()
  `);
  await sleep(wait);
}

async function waitForSelector(ws, cmdId, selector, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const result = await evaluate(ws, cmdId, `!!document.querySelector(${JSON.stringify(selector)})`);
    if (result.value === true) return true;
    await sleep(500);
  }
  throw new Error(`Selector ${selector} not found after ${timeout}ms`);
}

async function captureScreenshot(ws, cmdId, filename) {
  const result = await sendCommand(ws, cmdId, 'Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(filename, Buffer.from(result.data, 'base64'));
  console.log(`Screenshot saved: ${filename}`);
}

async function main() {
  if (!RENDER_EMAIL || !RENDER_PASSWORD) {
    console.error('ERROR: Please set RENDER_EMAIL and RENDER_PASSWORD environment variables');
    process.exit(1);
  }

  // Connect to Chrome
  const tabList = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const mainTab = tabList.find(t => t.type === 'page');
  if (!mainTab) throw new Error('No page tab found!');

  const ws = new WebSocket(mainTab.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.on('open', resolve);
    ws.on('error', reject);
  });

  let cmdId = 1;
  await sendCommand(ws, cmdId++, 'Page.enable');
  await sendCommand(ws, cmdId++, 'Runtime.enable');

  // ── STEP 1: Navigate to Render login ──────────────────────────────────────
  console.log('\n[1] Navigating to Render login...');
  cmdId = await navigate(ws, cmdId, 'https://dashboard.render.com/login');

  let currentUrl = await getCurrentUrl(ws, cmdId++);
  console.log('URL:', currentUrl);

  // If already logged in, skip login
  if (!currentUrl.includes('/login')) {
    console.log('Already logged in!');
  } else {
    // ── STEP 2: Fill login form ──────────────────────────────────────────────
    console.log('\n[2] Filling login form...');
    await captureScreenshot(ws, cmdId++, 'render_login.png');

    await typeIntoField(ws, cmdId++, 'input[name="email"]', RENDER_EMAIL);
    await typeIntoField(ws, cmdId++, 'input[name="password"]', RENDER_PASSWORD);
    await sleep(500);
    await captureScreenshot(ws, cmdId++, 'render_login_filled.png');

    // Click sign in button
    await evaluate(ws, cmdId++, `
      (function() {
        // Try multiple selectors for the sign-in button
        const btn = document.querySelector('button[type="submit"]') ||
                    Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Sign in'));
        if (btn) { btn.click(); return true; }
        return false;
      })()
    `);

    console.log('[3] Waiting for login to complete...');
    await waitForLoad(ws, 60000);
    await sleep(4000);

    currentUrl = await getCurrentUrl(ws, cmdId++);
    console.log('URL after login:', currentUrl);
    await captureScreenshot(ws, cmdId++, 'render_after_login.png');

    if (currentUrl.includes('/login')) {
      const text = await getPageText(ws, cmdId++);
      console.error('Still on login page. Error:', text.substring(0, 500));
      ws.close();
      process.exit(1);
    }
  }

  // ── STEP 4: Go to dashboard and find the backend service ──────────────────
  console.log('\n[4] Loading dashboard...');
  const dashText = await getPageText(ws, cmdId++);
  console.log('Dashboard page (first 2000 chars):\n', dashText);
  await captureScreenshot(ws, cmdId++, 'render_dashboard.png');

  // Find links to services
  const serviceLinks = await evaluate(ws, cmdId++, `
    (function() {
      const links = Array.from(document.querySelectorAll('a[href*="/web/"]'));
      return links.map(l => ({text: l.textContent.trim(), href: l.href})).slice(0, 20);
    })()
  `);
  console.log('\nService links found:', JSON.stringify(serviceLinks?.value || [], null, 2));

  ws.close();
  console.log('\nDone. Check the screenshots for more info.');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
