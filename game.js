/* ============================================================
   NEON STRIKE — Arena Prototype
   Lobby · Modes · Slide / Walljump / Mantle · Loadouts · Binds
   ============================================================ */

const THREE = window.THREE;

// ---------- DEFAULT BINDS ----------
const DEFAULT_BINDS = {
  forward: 'KeyW',
  back: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
  jump: 'Space',
  sprint: 'ShiftLeft',
  slide: 'ControlLeft',
  interact: 'KeyE',
  shoot: 'Mouse0',
  ability1: 'KeyQ',       // Teleport Pearl
  ability2: 'KeyF',       // Fire Charge
  ability3: 'KeyC',       // Plasma Shield
  pause: 'Escape'
};

const BIND_LABELS = {
  forward: 'Move Forward',
  back: 'Move Back',
  left: 'Move Left',
  right: 'Move Right',
  jump: 'Jump / Mantle',
  sprint: 'Sprint',
  slide: 'Slide',
  interact: 'Interact / Portal',
  shoot: 'Shoot',
  ability1: 'Teleport Pearl',
  ability2: 'Fire Charge',
  ability3: 'Plasma Shield',
  pause: 'Pause / Menu'
};

// ---------- ABILITIES ----------
const ABILITIES = {
  pearl: {
    id: 'pearl',
    name: 'TELEPORT PEARL',
    key: 'ability1',
    cooldown: 6,
    color: 0x88ffcc,
    icon: '◉'
  },
  fire: {
    id: 'fire',
    name: 'FIRE CHARGE',
    key: 'ability2',
    cooldown: 5,
    color: 0xff6622,
    icon: '✦'
  },
  shield: {
    id: 'shield',
    name: 'PLASMA SHIELD',
    key: 'ability3',
    cooldown: 10,
    duration: 3.2,
    color: 0x44aaff,
    icon: '◈'
  }
};

// ---------- WEAPONS (slot: primary | secondary | melee) ----------
const WEAPONS = {
  // PRIMARY — ARs, shotguns, snipers
  pulse: {
    id: 'pulse', name: 'PULSE AR', icon: '🔫', slot: 'primary',
    damage: 32, fireRate: 0.1, bulletSpeed: 110, spread: 0.018, pellets: 1,
    color: 0x00f3ff, ammoLabel: '∞', desc: 'Balanced assault rifle', melee: false
  },
  shot: {
    id: 'shot', name: 'SHOTBLASTER', icon: '🔥', slot: 'primary',
    damage: 16, fireRate: 0.5, bulletSpeed: 75, spread: 0.13, pellets: 7,
    color: 0xffe600, ammoLabel: '∞', desc: 'Pump shotgun', melee: false
  },
  sniper: {
    id: 'sniper', name: 'VOID SNIPER', icon: '🎯', slot: 'primary',
    damage: 140, fireRate: 1.0, bulletSpeed: 220, spread: 0.001, pellets: 1,
    color: 0xaa66ff, ammoLabel: '∞', desc: 'Heavy sniper', melee: false
  },
  rail: {
    id: 'rail', name: 'RAIL CANNON', icon: '⚡', slot: 'primary',
    damage: 85, fireRate: 0.7, bulletSpeed: 180, spread: 0.004, pellets: 1,
    color: 0x00ff9d, ammoLabel: '∞', desc: 'Energy marksman', melee: false
  },
  lmg: {
    id: 'lmg', name: 'ARC LMG', icon: '💢', slot: 'primary',
    damage: 20, fireRate: 0.075, bulletSpeed: 95, spread: 0.045, pellets: 1,
    color: 0xff8800, ammoLabel: '∞', desc: 'Suppressive LMG', melee: false
  },
  // SECONDARY — pistols, SMGs, flare, mini-shot
  pistol: {
    id: 'pistol', name: 'NEON SIDEARM', icon: '🔫', slot: 'secondary',
    damage: 38, fireRate: 0.2, bulletSpeed: 105, spread: 0.02, pellets: 1,
    color: 0xffffff, ammoLabel: '∞', desc: 'Semi-auto pistol', melee: false
  },
  smg: {
    id: 'smg', name: 'PLASMA SMG', icon: '💥', slot: 'secondary',
    damage: 18, fireRate: 0.05, bulletSpeed: 90, spread: 0.055, pellets: 1,
    color: 0xff00aa, ammoLabel: '∞', desc: 'Close-range SMG', melee: false
  },
  minishot: {
    id: 'minishot', name: 'MINI SWEEPER', icon: '🔶', slot: 'secondary',
    damage: 12, fireRate: 0.4, bulletSpeed: 70, spread: 0.12, pellets: 5,
    color: 0xffcc00, ammoLabel: '∞', desc: 'Compact shotgun', melee: false
  },
  // MELEE
  knife: {
    id: 'knife', name: 'BUTTERFLY KNIFE', icon: '🦋', slot: 'melee',
    damage: 90, fireRate: 0.35, bulletSpeed: 45, spread: 0, pellets: 1,
    color: 0xccccff, ammoLabel: 'MELEE', desc: 'Fast blade', melee: true, meleeRange: 2.8
  },
  katana: {
    id: 'katana', name: 'NEON KATANA', icon: '🗡️', slot: 'melee',
    damage: 120, fireRate: 0.55, bulletSpeed: 50, spread: 0, pellets: 1,
    color: 0xff2244, ammoLabel: 'MELEE', desc: 'Wide slash', melee: true, meleeRange: 3.4
  },
  hammer: {
    id: 'hammer', name: 'GRAV HAMMER', icon: '🔨', slot: 'melee',
    damage: 160, fireRate: 0.85, bulletSpeed: 35, spread: 0, pellets: 1,
    color: 0xffaa00, ammoLabel: 'MELEE', desc: 'Heavy smash', melee: true, meleeRange: 3.0
  },
  blade: {
    id: 'blade', name: 'ENERGY BLADE', icon: '⚔️', slot: 'melee',
    damage: 110, fireRate: 0.45, bulletSpeed: 48, spread: 0, pellets: 1,
    color: 0x00f3ff, ammoLabel: 'MELEE', desc: 'Balanced melee', melee: true, meleeRange: 3.0
  },
  // UTILITY (slot 4)
  flare: {
    id: 'flare', name: 'FLARE GUN', icon: '✨', slot: 'utility',
    damage: 55, fireRate: 0.9, bulletSpeed: 55, spread: 0.03, pellets: 1,
    color: 0xff6622, ammoLabel: '∞', desc: 'Burning flare shot', melee: false
  },
  shock: {
    id: 'shock', name: 'SHOCK BURST', icon: '⚡', slot: 'utility',
    damage: 45, fireRate: 0.7, bulletSpeed: 70, spread: 0.04, pellets: 1,
    color: 0x66ffff, ammoLabel: '∞', desc: 'Electric bolt', melee: false
  },
  sticky: {
    id: 'sticky', name: 'STICKY CHARGE', icon: '💣', slot: 'utility',
    damage: 70, fireRate: 1.0, bulletSpeed: 40, spread: 0.02, pellets: 1,
    color: 0xff4400, ammoLabel: '∞', desc: 'High explosive', melee: false
  },
  needle: {
    id: 'needle', name: 'NEEDLE DART', icon: '💉', slot: 'utility',
    damage: 35, fireRate: 0.25, bulletSpeed: 130, spread: 0.01, pellets: 1,
    color: 0xaa88ff, ammoLabel: '∞', desc: 'Fast toxin dart', melee: false
  }
};

const CHARACTERS = {
  ronin: { id: 'ronin', name: 'RONIN', color: 0x00f3ff, accent: 0x0088ff, desc: 'Neon samurai operative' },
  gekko: { id: 'gekko', name: 'GEKKO', color: 0x00ff9d, accent: 0x00aa66, desc: 'Street runner' },
  viper: { id: 'viper', name: 'VIPER', color: 0xff00aa, accent: 0xaa0066, desc: 'Night assassin' },
  titan: { id: 'titan', name: 'TITAN', color: 0xffaa00, accent: 0xff6600, desc: 'Heavy enforcer' }
};

// ---------- CONFIG ----------
const CFG = {
  gravity: 28,
  playerSpeed: 11,
  sprintMult: 1.55,
  slideMult: 1.85,
  slideDuration: 0.75,
  slideCooldown: 0.9,
  jumpForce: 11.5,
  wallJumpForce: 12.5,
  wallJumpPush: 10,
  mantleReach: 1.35,
  mantleHeight: 2.4,
  mouseSens: 0.0022,
  maxHp: 200,
  respawnTime: 2.8,
  matchTime: 180,
  botCount: 4,
  maxPlayers: 5,
  lobbySize: 60,
  arenaSize: 72,
  eyeHeight: 1.7,
  crouchHeight: 1.05,
  adminCode: 'SVS0803'
};

// ---------- STATE ----------
let renderer, scene, camera, clock;
let player;
let yaw = 0, pitch = 0;
let bullets = [], bots = [], particles = [], lights = [];
let abilityProjectiles = [];
let walls = [], floor, portals = [];
let mode = 'menu';
let scores = { blue: 0, red: 0 };
let matchTimer = CFG.matchTime;
let matchRunning = false;
let locked = false;
let lastShot = 0;
let keys = {};
let flags = { blue: null, red: null };
let isAdmin = false;
let adminFly = false;
let adminAimbot = false;
let currentUser = null;
let banList = [];
let privateServer = { name: '', password: '', open: false };
let selectedCharacter = 'ronin';
let loadout = { primary: 'pulse', secondary: 'pistol', melee: 'katana', utility: 'flare' };
let activeSlot = 'primary';
let weaponSwapT = 0;
let pendingMode = null;
let hill = null;
let hillProgress = { blue: 0, red: 0 };
let wallBoxes = [];
let dmgNumbers = [];
let killBannerT = 0;
let deathBannerT = 0;

// Settings / binds
let binds = { ...DEFAULT_BINDS };
let listeningBind = null;
let autoMantle = true;

const $ = id => document.getElementById(id);

// ---------- INIT ----------
function hideLoading() {
  const el = document.getElementById('loading');
  if (el) {
    el.classList.add('hidden');
    el.style.display = 'none';
  }
}

function init() {
  try {
    if (typeof THREE === 'undefined') {
      throw new Error('THREE.js failed to load (check internet / CDN)');
    }
    loadSettings();
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03010a);
    scene.fog = new THREE.FogExp2(0x050218, 0.018);

    camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 200);
    camera.position.set(0, CFG.eyeHeight, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    document.body.appendChild(renderer.domElement);

    const amb = new THREE.AmbientLight(0x1a1030, 0.55);
    scene.add(amb);
    const hemi = new THREE.HemisphereLight(0x4060ff, 0x100818, 0.35);
    scene.add(hemi);

    buildLobby();
    createPlayer();
    setupInput();
    setupUI();
    try { buildGunList(); } catch (e) { console.warn('buildGunList', e); }
    try { buildBindList(); } catch (e) { console.warn('buildBindList', e); }

    window.addEventListener('resize', onResize);
    animate();
  } catch (err) {
    console.error('INIT FAILED', err);
    const el = document.getElementById('loading');
    if (el) {
      el.innerHTML = 'LOAD ERROR<br><span style="font-size:0.7rem;opacity:0.8">' +
        (err && err.message ? err.message : err) +
        '</span><br><button onclick="location.reload()" style="margin-top:1rem;padding:0.5rem 1rem;cursor:pointer">RETRY</button>';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.gap = '0.5rem';
      return;
    }
  }
  hideLoading();
}

// ---------- SETTINGS / BINDS ----------
function loadSettings() {
  try {
    const raw = localStorage.getItem('neonstrike_settings');
    if (raw) {
      const data = JSON.parse(raw);
      if (data.binds) binds = { ...DEFAULT_BINDS, ...data.binds };
      if (data.sens != null) CFG.mouseSens = data.sens;
      if (data.loadout) loadout = { ...loadout, ...data.loadout };
      if (data.character) selectedCharacter = data.character;
      if (data.autoMantle != null) autoMantle = data.autoMantle;
    }
    const bans = localStorage.getItem('neonstrike_bans');
    if (bans) banList = JSON.parse(bans);
    const user = localStorage.getItem('neonstrike_user');
    if (user) currentUser = JSON.parse(user);
    if (localStorage.getItem('neonstrike_admin') === '1') isAdmin = true;
  } catch (e) {}
}

function saveSettings() {
  localStorage.setItem('neonstrike_settings', JSON.stringify({
    binds,
    sens: CFG.mouseSens,
    loadout,
    character: selectedCharacter,
    autoMantle
  }));
}

function saveUser() {
  if (currentUser) localStorage.setItem('neonstrike_user', JSON.stringify(currentUser));
}

function saveBans() {
  localStorage.setItem('neonstrike_bans', JSON.stringify(banList));
}

// ---------- ACCOUNTS / FRIENDS / CLANS (local demo) ----------
function registerOrLogin(username, password) {
  if (!username || username.length < 2) { showToast('USERNAME TOO SHORT'); return false; }
  const key = 'neonstrike_acc_' + username.toLowerCase();
  const existing = localStorage.getItem(key);
  if (existing) {
    const acc = JSON.parse(existing);
    if (acc.password !== password) { showToast('WRONG PASSWORD'); return false; }
    currentUser = { username: acc.username, friends: acc.friends || [], clan: acc.clan || null };
  } else {
    const acc = { username, password, friends: [], clan: null };
    localStorage.setItem(key, JSON.stringify(acc));
    currentUser = { username, friends: [], clan: null };
  }
  saveUser();
  showToast('WELCOME, ' + currentUser.username.toUpperCase());
  updateAccountUI();
  return true;
}

function addFriend(name) {
  if (!currentUser) { showToast('LOGIN FIRST'); return; }
  if (!name || name === currentUser.username) return;
  if (!currentUser.friends.includes(name)) {
    currentUser.friends.push(name);
    saveUser();
    const key = 'neonstrike_acc_' + currentUser.username.toLowerCase();
    const acc = JSON.parse(localStorage.getItem(key) || '{}');
    acc.friends = currentUser.friends;
    localStorage.setItem(key, JSON.stringify(acc));
    showToast('FRIEND ADDED: ' + name);
    updateAccountUI();
  }
}

function createClan(name) {
  if (!currentUser) { showToast('LOGIN FIRST'); return; }
  if (!name || name.length < 2) return;
  currentUser.clan = name.toUpperCase();
  saveUser();
  const key = 'neonstrike_acc_' + currentUser.username.toLowerCase();
  const acc = JSON.parse(localStorage.getItem(key) || '{}');
  acc.clan = currentUser.clan;
  localStorage.setItem(key, JSON.stringify(acc));
  showToast('CLAN CREATED: ' + currentUser.clan);
  updateAccountUI();
}

function updateAccountUI() {
  const el = $('accountInfo');
  if (!el) return;
  if (currentUser) {
    el.textContent = currentUser.username + (currentUser.clan ? ' [' + currentUser.clan + ']' : '') +
      (isAdmin ? ' · ADMIN' : '');
  } else {
    el.textContent = 'Not logged in';
  }
  const fl = $('friendList');
  if (fl && currentUser) {
    fl.innerHTML = (currentUser.friends || []).map(f => `<div class="friend-row">${f}</div>`).join('') || '<div class="friend-row">No friends yet</div>';
  }
}

// ---------- ADMIN ----------
function tryAdminCode(code) {
  if (code === CFG.adminCode) {
    isAdmin = true;
    localStorage.setItem('neonstrike_admin', '1');
    showToast('ADMIN ACCESS GRANTED');
    $('adminPanel') && $('adminPanel').classList.remove('hidden');
    updateAccountUI();
    return true;
  }
  showToast('INVALID ADMIN CODE');
  return false;
}

function adminKickBot(id) {
  if (!isAdmin) return;
  const bot = bots.find(b => b.id === id);
  if (bot) {
    scene.remove(bot.mesh);
    bots = bots.filter(b => b !== bot);
    showToast('KICKED BOT ' + id);
    refreshAdminPlayerList();
  }
}

function adminBanName(name) {
  if (!isAdmin || !name) return;
  if (!banList.includes(name)) {
    banList.push(name);
    saveBans();
    showToast('BANNED: ' + name);
    // remove matching bots
    bots.forEach(b => {
      if (('BOT_' + b.id) === name || banList.includes('BOT_' + b.id)) {
        scene.remove(b.mesh);
      }
    });
    bots = bots.filter(b => !banList.includes('BOT_' + b.id));
    refreshAdminPlayerList();
  }
}

function refreshAdminPlayerList() {
  const el = $('adminPlayers');
  if (!el) return;
  el.innerHTML = bots.map(b =>
    `<div class="admin-row">BOT_${b.id} (${b.team})
      <button data-kick="${b.id}">KICK</button>
      <button data-ban="BOT_${b.id}">BAN</button>
    </div>`
  ).join('') || '<div class="admin-row">No bots in match</div>';
  el.querySelectorAll('[data-kick]').forEach(btn => {
    btn.onclick = () => adminKickBot(parseInt(btn.dataset.kick, 10));
  });
  el.querySelectorAll('[data-ban]').forEach(btn => {
    btn.onclick = () => adminBanName(btn.dataset.ban);
  });
}

function buildBindList() {
  const list = $('bindList');
  list.innerHTML = '';
  Object.keys(BIND_LABELS).forEach(action => {
    const row = document.createElement('div');
    row.className = 'bind-row';
    row.dataset.action = action;
    row.innerHTML = `<span class="action">${BIND_LABELS[action]}</span><span class="key">${keyDisplay(binds[action])}</span>`;
    row.onclick = () => startListening(action, row);
    list.appendChild(row);
  });
}

function keyDisplay(code) {
  if (!code) return '—';
  if (code === 'Mouse0') return 'LMB';
  if (code === 'Mouse2') return 'RMB';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  if (code === 'ShiftLeft' || code === 'ShiftRight') return 'SHIFT';
  if (code === 'ControlLeft' || code === 'ControlRight') return 'CTRL';
  if (code === 'Space') return 'SPACE';
  if (code === 'Escape') return 'ESC';
  return code;
}

function startListening(action, row) {
  if (listeningBind) {
    document.querySelectorAll('.bind-row').forEach(r => r.classList.remove('listening'));
  }
  listeningBind = action;
  row.classList.add('listening');
  row.querySelector('.key').textContent = '…';
}

function finishListening(code) {
  if (!listeningBind) return;
  // Prevent binding Escape to anything except pause
  if (code === 'Escape' && listeningBind !== 'pause') {
    listeningBind = null;
    buildBindList();
    return;
  }
  binds[listeningBind] = code;
  listeningBind = null;
  buildBindList();
}

function isDown(action) {
  const code = binds[action];
  if (!code) return false;
  if (code.startsWith('Mouse')) return false; // handled separately
  return !!keys[code];
}

// ---------- LOADOUT / CHARACTER UI ----------
function buildCharacterList() {
  const list = $('charList');
  if (!list) return;
  list.innerHTML = '';
  Object.values(CHARACTERS).forEach(c => {
    const card = document.createElement('div');
    card.className = 'gun-card' + (selectedCharacter === c.id ? ' selected' : '');
    card.innerHTML = `<div class="gun-icon" style="color:#${new THREE.Color(c.color).getHexString()}">◆</div>
      <h3>${c.name}</h3><div class="stats">${c.desc}</div>`;
    card.onclick = () => {
      selectedCharacter = c.id;
      buildCharacterList();
    };
    list.appendChild(card);
  });
}

function buildGunList() {
  const list = $('gunList');
  if (!list) return;
  list.innerHTML = '';
  ['primary', 'secondary', 'melee', 'utility'].forEach(slot => {
    const header = document.createElement('div');
    header.className = 'slot-header';
    header.textContent = slot.toUpperCase() + (slot === 'utility' ? ' (4)' : '');
    list.appendChild(header);
    Object.values(WEAPONS).filter(w => w.slot === slot).forEach(w => {
      const card = document.createElement('div');
      card.className = 'gun-card' + (loadout[slot] === w.id ? ' selected' : '');
      card.innerHTML = `<div class="gun-icon">${w.icon}</div><h3>${w.name}</h3>
        <div class="stats">${w.desc}<br>DMG ${w.damage}</div>`;
      card.onclick = () => {
        loadout[slot] = w.id;
        buildGunList();
      };
      list.appendChild(card);
    });
  });
}

function hideAllOverlays() {
  ['menu', 'modeSelect', 'gunSelect', 'settings', 'pause', 'end',
   'accountPanel', 'adminPanel', 'adminGate', 'loading'].forEach(id => {
    const el = $(id);
    if (el) el.classList.add('hidden');
  });
  const inter = $('interact');
  if (inter) inter.classList.remove('show');
}

function openGunSelect(afterMode) {
  pendingMode = afterMode || null;
  buildCharacterList();
  buildGunList();
  hideAllOverlays();
  const gs = $('gunSelect');
  if (gs) gs.classList.remove('hidden');
  const btn = $('gunConfirm');
  if (btn) {
    btn.textContent = pendingMode ? 'START MATCH' : 'CONFIRM LOADOUT';
  }
  document.exitPointerLock();
}

function confirmGun() {
  activeSlot = 'primary';
  saveSettings();
  const modeToStart = pendingMode;
  pendingMode = null;
  hideAllOverlays();
  if (modeToStart) {
    // Start match immediately after confirming loadout
    try {
      startMode(modeToStart);
    } catch (err) {
      console.error('startMode failed', err);
      showToast('FAILED TO START — TRY AGAIN');
      mode = 'lobby';
      buildLobby();
      spawnPlayer('lobby');
      $('menu').classList.add('hidden');
    }
  } else if (matchRunning) {
    updateWeaponHUD();
    playWeaponSwapAnim();
    renderer.domElement.requestPointerLock();
  } else {
    $('menu').classList.remove('hidden');
  }
}

function currentWeapon() {
  const id = loadout[activeSlot] || loadout.primary;
  return WEAPONS[id] || WEAPONS.pulse;
}

function switchSlot(slot) {
  if (activeSlot === slot) return;
  activeSlot = slot;
  playWeaponSwapAnim();
  updateWeaponHUD();
  showToast(currentWeapon().name);
}

function playWeaponSwapAnim() {
  weaponSwapT = 0.42; // holster + draw
  const w = currentWeapon();
  showToast('▲ ' + w.name);
}

function updateWeaponHUD() {
  const w = currentWeapon();
  if ($('weapon')) $('weapon').textContent = w.name;
  if ($('ammo')) $('ammo').textContent = w.ammoLabel;
  // slot indicators
  const bar = $('slotBar');
  if (bar) {
    bar.innerHTML = ['primary', 'secondary', 'melee', 'utility'].map((s, i) => {
      const ww = WEAPONS[loadout[s]];
      return `<div class="slot-ind ${activeSlot === s ? 'active' : ''}">${i + 1} ${ww ? ww.icon : '?'}</div>`;
    }).join('');
  }
}

// ---------- WORLD BUILDERS ----------
function clearWorld() {
  while (scene.children.length > 0) {
    const obj = scene.children[0];
    scene.remove(obj);
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  }
  walls = [];
  wallBoxes = [];
  portals = [];
  particles = [];
  lights = [];
  bullets = [];
  abilityProjectiles = [];
  bots = [];
  dmgNumbers = [];
  flags = { blue: null, red: null };
  hill = null;
  if (player && player.shieldMesh) {
    player.shieldMesh = null;
    player.shieldActive = false;
  }

  const amb = new THREE.AmbientLight(0x1a1035, 0.65);
  scene.add(amb);
  const hemi = new THREE.HemisphereLight(0x7090ff, 0x150820, 0.4);
  scene.add(hemi);
}

function cacheWall(mesh) {
  walls.push(mesh);
  mesh.updateMatrixWorld(true);
  wallBoxes.push(new THREE.Box3().setFromObject(mesh));
}

function buildLobby() {
  clearWorld();

  const floorGeo = new THREE.PlaneGeometry(CFG.lobbySize * 2, CFG.lobbySize * 2, 40, 40);
  floor = new THREE.Mesh(floorGeo, new THREE.MeshStandardMaterial({
    color: 0x050510, metalness: 0.85, roughness: 0.35,
    emissive: 0x001122, emissiveIntensity: 0.15
  }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(CFG.lobbySize * 2, 40, 0x00f3ff, 0x002244);
  grid.material.opacity = 0.45;
  grid.material.transparent = true;
  grid.position.y = 0.02;
  scene.add(grid);

  const wallH = 8;
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a20, metalness: 0.7, roughness: 0.4,
    emissive: 0x110033, emissiveIntensity: 0.3
  });
  const wallData = [
    [[0, wallH/2, -CFG.lobbySize], [CFG.lobbySize*2, wallH, 1.2]],
    [[0, wallH/2, CFG.lobbySize], [CFG.lobbySize*2, wallH, 1.2]],
    [[-CFG.lobbySize, wallH/2, 0], [1.2, wallH, CFG.lobbySize*2]],
    [[CFG.lobbySize, wallH/2, 0], [1.2, wallH, CFG.lobbySize*2]]
  ];
  wallData.forEach(([p, s]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(...s), wallMat);
    m.position.set(...p);
    m.castShadow = true;
    m.receiveShadow = true;
    scene.add(m);
    walls.push(m);
  });

  // Central platform
  const plat = new THREE.Mesh(
    new THREE.CylinderGeometry(8, 9, 0.6, 32),
    new THREE.MeshStandardMaterial({
      color: 0x0a0a25, metalness: 0.9, roughness: 0.25,
      emissive: 0x003355, emissiveIntensity: 0.4
    })
  );
  plat.position.y = 0.3;
  scene.add(plat);

  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(9 + i * 1.8, 0.08, 8, 64),
      new THREE.MeshBasicMaterial({ color: i % 2 ? 0xff00aa : 0x00f3ff })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.35 + i * 0.05;
    scene.add(ring);
  }

  // Pillars
  const pillarPos = [
    [-18, -18], [18, -18], [-18, 18], [18, 18],
    [0, -22], [0, 22], [-22, 0], [22, 0]
  ];
  pillarPos.forEach((p, idx) => {
    const h = 5 + (idx % 3);
    const pillar = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, h, 0.7),
      new THREE.MeshStandardMaterial({
        color: 0x101025,
        emissive: idx % 2 ? 0xff00aa : 0x00f3ff,
        emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.3
      })
    );
    pillar.position.set(p[0], h / 2, p[1]);
    pillar.castShadow = true;
    scene.add(pillar);
    walls.push(pillar);
    const pl = new THREE.PointLight(idx % 2 ? 0xff00aa : 0x00f3ff, 1.8, 18, 2);
    pl.position.set(p[0], h + 0.5, p[1]);
    scene.add(pl);
    lights.push(pl);
  });

  // Climbable ledges for mantle practice — diagonals only, clear of portals
  [[-10, -10], [10, -10], [-10, 10], [10, 10]].forEach((p) => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 2.2, 3.2),
      new THREE.MeshStandardMaterial({
        color: 0x0e0e28, metalness: 0.7, roughness: 0.4,
        emissive: 0x002244, emissiveIntensity: 0.35
      })
    );
    box.position.set(p[0], 1.1, p[1]);
    box.castShadow = true;
    box.receiveShadow = true;
    scene.add(box);
    walls.push(box);
  });

  createPortal(-14, 0, 0, 'tdm', 'TEAM DEATHMATCH', 0x00f3ff);
  createPortal(14, 0, 0, 'ffa', 'FREE FOR ALL', 0xff00aa);
  createPortal(0, 0, -14, 'ctf', 'CAPTURE THE FLAG', 0x00ff9d);
  createPortal(0, 0, 14, 'koth', 'KING OF THE HILL', 0xffe600);
  createPortal(-10, 0, 10, 'train', 'TRAINING GROUND', 0xffffff);

  // Fewer deco cubes for FPS
  for (let i = 0; i < 5; i++) {
    const c = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({
        color: 0x111133,
        emissive: i % 2 ? 0x00f3ff : 0xff00aa,
        emissiveIntensity: 0.7
      })
    );
    c.position.set((i - 2) * 8, 4, (i % 2 ? 1 : -1) * 16);
    c.userData.spin = 0.01;
    c.userData.bob = i;
    scene.add(c);
    particles.push({ mesh: c, type: 'deco' });
  }
  wallBoxes = walls.map(w => {
    w.updateMatrixWorld(true);
    return new THREE.Box3().setFromObject(w);
  });
}

function makePortalLabel(text, color) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 512, 128);
  // soft glow backdrop
  ctx.fillStyle = 'rgba(0,0,15,0.75)';
  ctx.fillRect(20, 28, 472, 72);
  ctx.strokeStyle = '#' + new THREE.Color(color).getHexString();
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 28, 472, 72);
  ctx.font = 'bold 36px Orbitron, Rajdhani, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#' + new THREE.Color(color).getHexString();
  ctx.shadowColor = '#' + new THREE.Color(color).getHexString();
  ctx.shadowBlur = 18;
  ctx.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(6.5, 1.6), mat);
  return mesh;
}

function createPortal(x, y, z, modeId, label, color) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(3.2, 3.5, 0.4, 24),
    new THREE.MeshStandardMaterial({
      color: 0x0a0a20, metalness: 0.8, roughness: 0.3,
      emissive: color, emissiveIntensity: 0.25
    })
  );
  base.position.y = 0.2;
  group.add(base);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.6, 0.12, 12, 48),
    new THREE.MeshBasicMaterial({ color })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 2.8;
  group.add(ring);

  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const col = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 4.5, 6),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.55 })
    );
    col.position.set(Math.cos(a) * 2.5, 2.5, Math.sin(a) * 2.5);
    group.add(col);
  }

  const core = new THREE.Mesh(
    new THREE.SphereGeometry(1.1, 16, 16),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35 })
  );
  core.position.y = 2.8;
  group.add(core);

  const pl = new THREE.PointLight(color, 2.5, 16, 2);
  pl.position.y = 3;
  group.add(pl);

  // Floating label above portal — always faces camera
  const labelMesh = makePortalLabel(label, color);
  labelMesh.position.y = 5.4;
  group.add(labelMesh);

  group.userData = { mode: modeId, label, color, core, ring, labelMesh };
  scene.add(group);
  portals.push(group);
}

function addCover(x, z, w, h, d, emissive) {
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({
      color: 0x0e0e28, metalness: 0.7, roughness: 0.4,
      emissive: emissive || 0x002244, emissiveIntensity: 0.35
    })
  );
  box.position.set(x, h / 2, z);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);
  cacheWall(box);
  // neon edge (no collision)
  const edge = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.05, 0.08, d + 0.05),
    new THREE.MeshBasicMaterial({ color: emissive || 0x00f3ff })
  );
  edge.position.set(x, h + 0.04, z);
  scene.add(edge);
  return box;
}

function addMapLight(x, y, z, color, intensity, dist) {
  const pl = new THREE.PointLight(color, intensity, dist, 2);
  pl.position.set(x, y, z);
  scene.add(pl);
  lights.push(pl);
  // visible lamp
  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.25, 8, 8),
    new THREE.MeshBasicMaterial({ color })
  );
  lamp.position.set(x, y, z);
  scene.add(lamp);
}

function buildOpenSky() {
  // Open sky — no ceiling, soft horizon fog only
  scene.background = new THREE.Color(0x0a0620);
  scene.fog = new THREE.FogExp2(0x0a0620, 0.008);
  // Hemisphere sky feel
  const hemi = new THREE.HemisphereLight(0x6080ff, 0x1a1025, 0.55);
  scene.add(hemi);
  // Moon / key light
  const moon = new THREE.DirectionalLight(0xc0d0ff, 0.45);
  moon.position.set(30, 80, 20);
  moon.castShadow = true;
  scene.add(moon);
}

function buildArena(modeId) {
  clearWorld();
  mode = modeId;
  const size = CFG.arenaSize;
  buildOpenSky();

  // Large open floor
  floor = new THREE.Mesh(
    new THREE.PlaneGeometry(size * 2.2, size * 2.2, 48, 48),
    new THREE.MeshStandardMaterial({
      color: 0x08081a, metalness: 0.85, roughness: 0.4,
      emissive: 0x001018, emissiveIntensity: 0.15
    })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(size * 2, 36, 0x00aaff, 0x001133);
  grid.material.opacity = 0.25;
  grid.material.transparent = true;
  grid.position.y = 0.02;
  scene.add(grid);

  // Soft boundary walls (low, not a closed box) — open feel
  const boundH = 2.2;
  const boundMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a22, metalness: 0.6, roughness: 0.5,
    emissive: 0x110033, emissiveIntensity: 0.25, transparent: true, opacity: 0.85
  });
  [
    [[0, boundH/2, -size], [size*2+4, boundH, 1]],
    [[0, boundH/2, size], [size*2+4, boundH, 1]],
    [[-size, boundH/2, 0], [1, boundH, size*2+4]],
    [[size, boundH/2, 0], [1, boundH, size*2+4]]
  ].forEach(([p, s]) => {
    const w = new THREE.Mesh(new THREE.BoxGeometry(...s), boundMat);
    w.position.set(...p);
    scene.add(w);
    walls.push(w);
  });

  if (modeId === 'train') {
    buildTrainingGround(size);
  } else {
    buildValorantLayout(size, modeId);
  }

  // Fewer lights for performance (buildings already have neon emissives)
  [
    [0, 10, 0, 0xffffff, 1.0, 40],
    [-30, 7, -30, 0x00f3ff, 1.4, 30],
    [30, 7, 30, 0xff00aa, 1.4, 30],
    [30, 7, -30, 0xffe600, 1.2, 28],
    [-30, 7, 30, 0x00ff9d, 1.2, 28]
  ].forEach(([x, y, z, c, i, d]) => addMapLight(x, y, z, c, i, d));

  if (modeId === 'ctf') {
    flags.blue = createFlag(-size + 12, 0, 0, 0x00f3ff, 'blue');
    flags.red = createFlag(size - 12, 0, 0, 0xff00aa, 'red');
  } else if (modeId === 'koth') {
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(6, 6.5, 0.5, 24),
      new THREE.MeshStandardMaterial({
        color: 0x151530, emissive: 0xffe600, emissiveIntensity: 0.5, metalness: 0.8
      })
    );
    platform.position.set(0, 0.25, 0);
    scene.add(platform);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(6.2, 0.15, 8, 48),
      new THREE.MeshBasicMaterial({ color: 0xffe600 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.55;
    scene.add(ring);
    hill = { mesh: platform, radius: 6.5, pos: new THREE.Vector3(0, 0, 0) };
    hillProgress = { blue: 0, red: 0 };
  }

  if (modeId !== 'train') spawnBots(modeId);

  // Cache all wall AABBs once (huge perf win vs setFromObject every frame)
  wallBoxes = walls.map(w => {
    w.updateMatrixWorld(true);
    return new THREE.Box3().setFromObject(w);
  });
}

/** Cyberpunk Tokyo street layout — tall neon towers, alleys, mid plaza */
function buildValorantLayout(size, modeId) {
  const neonColors = [0x00f3ff, 0xff00aa, 0x00ff9d, 0xffe600, 0xaa66ff, 0xff6622];

  // Skyscraper blocks (visual + cover)
  const towers = [
    [-40, -35, 10, 22, 10], [40, -35, 10, 26, 10],
    [-40, 35, 10, 20, 10], [40, 35, 12, 28, 10],
    [-55, -10, 8, 18, 8], [55, 10, 8, 24, 8],
    [-20, -45, 7, 16, 7], [20, 45, 7, 18, 7],
    [-48, 15, 6, 14, 6], [48, -15, 6, 15, 6]
  ];
  towers.forEach(([x, z, w, h, d], i) => {
    const col = neonColors[i % neonColors.length];
    // Window texture (cheap high-detail look)
    const cv = document.createElement('canvas');
    cv.width = 128; cv.height = 256;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#0a0a18';
    ctx.fillRect(0, 0, 128, 256);
    const hex = '#' + new THREE.Color(col).getHexString();
    for (let row = 0; row < 14; row++) {
      for (let coln = 0; coln < 6; coln++) {
        if (Math.random() > 0.35) {
          ctx.fillStyle = Math.random() > 0.5 ? hex : '#ffe8a0';
          ctx.globalAlpha = 0.35 + Math.random() * 0.55;
          ctx.fillRect(8 + coln * 20, 10 + row * 17, 12, 12);
        }
      }
    }
    ctx.globalAlpha = 1;
    const tex = new THREE.CanvasTexture(cv);
    const mat = new THREE.MeshStandardMaterial({
      map: tex, color: 0xffffff, metalness: 0.7, roughness: 0.35,
      emissive: col, emissiveIntensity: 0.2, emissiveMap: tex
    });
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    tower.position.set(x, h / 2, z);
    scene.add(tower);
    walls.push(tower);
    // Neon strip
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, h * 0.92, 0.35),
      new THREE.MeshBasicMaterial({ color: col })
    );
    strip.position.set(x + w * 0.48, h / 2, z);
    scene.add(strip);
    // Top billboard
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.75, 2.4, 0.3),
      new THREE.MeshBasicMaterial({ color: col })
    );
    sign.position.set(x, h - 1.8, z + d / 2 + 0.15);
    scene.add(sign);
  });

  // Street cover / market stalls
  const streetCover = [
    [-15, -10, 3, 1.8, 2.5], [15, 10, 3, 1.8, 2.5],
    [-8, 8, 2, 2.4, 4], [8, -8, 2, 2.4, 4],
    [0, -18, 5, 2.0, 1.5], [0, 18, 5, 2.0, 1.5],
    [-25, 0, 2.5, 3.0, 6], [25, 0, 2.5, 3.0, 6],
    [-12, 22, 4, 1.5, 2], [12, -22, 4, 1.5, 2],
    [-30, -20, 3, 2.2, 3], [30, 20, 3, 2.2, 3]
  ];
  streetCover.forEach(([x, z, w, h, d], i) => {
    addCover(x, z, w, h, d, neonColors[i % neonColors.length]);
  });

  // Elevated walkways
  [[-10, 0, 2, 5, 14], [10, 0, 2, 5, 14]].forEach(([x, z, w, h, d], i) => {
    const walk = new THREE.Mesh(
      new THREE.BoxGeometry(w, 0.4, d),
      new THREE.MeshStandardMaterial({
        color: 0x121228, metalness: 0.9, roughness: 0.25,
        emissive: 0x00f3ff, emissiveIntensity: 0.2
      })
    );
    walk.position.set(x, h, z);
    scene.add(walk);
    walls.push(walk);
    // pillars
    [-5, 5].forEach(oz => {
      const p = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, h, 0.5),
        new THREE.MeshStandardMaterial({ color: 0x0e0e20, emissive: 0x003344, emissiveIntensity: 0.4 })
      );
      p.position.set(x, h / 2, z + oz);
      scene.add(p);
      walls.push(p);
    });
  });

  // Central plaza neon ring
  const plaza = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7.5, 0.35, 32),
    new THREE.MeshStandardMaterial({
      color: 0x101028, metalness: 0.9, roughness: 0.2,
      emissive: 0xff00aa, emissiveIntensity: 0.3
    })
  );
  plaza.position.set(0, 0.18, 0);
  scene.add(plaza);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(7.2, 0.12, 8, 48),
    new THREE.MeshBasicMaterial({ color: 0x00f3ff })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.4;
  scene.add(ring);

  // Street lamps (limited for FPS)
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const r = 32;
    const lx = Math.cos(a) * r;
    const lz = Math.sin(a) * r;
    const post = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.15, 5, 6),
      new THREE.MeshStandardMaterial({ color: 0x222233, metalness: 0.8 })
    );
    post.position.set(lx, 2.5, lz);
    scene.add(post);
    const c = neonColors[i % neonColors.length];
    addMapLight(lx, 5.2, lz, c, 1.5, 14);
  }

  // Spawn gates
  addCover(-58, 0, 3, 4, 12, 0x00f3ff);
  addCover(58, 0, 3, 4, 12, 0xff00aa);
}

function buildTrainingGround(size) {
  // Open range with backstop + lanes
  addCover(0, -22, 24, 3.5, 1.5, 0x00f3ff);
  for (let i = -2; i <= 2; i++) {
    addCover(i * 8, -8, 1.2, 1.8, 1.2, 0x00ff9d);
  }
  // Shooter platform
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(7, 7.5, 0.4, 32),
    new THREE.MeshStandardMaterial({
      color: 0x101028, emissive: 0x00f3ff, emissiveIntensity: 0.35, metalness: 0.8
    })
  );
  pad.position.set(0, 0.2, 12);
  scene.add(pad);

  // Aim trainers only — gunless, non-aggressive, move on tracks
  bots = [];
  // 1–2 horizontal (left ↔ right)
  for (let i = 0; i < 2; i++) {
    const bot = createAimTrainer('strafe', i);
    bots.push(bot);
    scene.add(bot.mesh);
  }
  // 1–2 vertical (up ↔ down float)
  for (let i = 0; i < 2; i++) {
    const bot = createAimTrainer('vertical', i + 2);
    bots.push(bot);
    scene.add(bot.mesh);
  }
  showToast('AIM TRAIN — L/R + up/down targets (no return fire)');
}

/** Gunless moving target for training ground */
function createAimTrainer(motion, id) {
  const color = motion === 'strafe' ? 0xff00aa : 0x00f3ff;
  const accent = motion === 'strafe' ? 0xff66cc : 0x66ffff;
  const group = buildCharacterMesh(color, accent);
  const bot = {
    mesh: group,
    pos: group.position,
    vel: new THREE.Vector3(),
    hp: CFG.maxHp,
    team: 'red',
    dead: false,
    respawnTimer: 0,
    lastShot: 0,
    wanderAngle: 0,
    id: 200 + id,
    color,
    carrying: null,
    cds: { pearl: 999, fire: 999, shield: 999 },
    shieldActive: false,
    shieldTimer: 0,
    shieldMesh: null,
    walkPhase: 0,
    // Trainer-specific
    trainer: true,
    gunless: true,
    motion, // 'strafe' | 'vertical'
    phase: Math.random() * Math.PI * 2,
    speed: motion === 'strafe' ? 4.5 + id * 0.8 : 2.2 + id * 0.3,
    center: new THREE.Vector3(
      motion === 'strafe' ? 0 : (id % 2 === 0 ? -10 : 10),
      0,
      motion === 'strafe' ? -14 - id * 3 : -16
    ),
    amplitude: motion === 'strafe' ? 14 : 3.5
  };
  if (motion === 'strafe') {
    bot.pos.set(bot.center.x, 0, bot.center.z);
  } else {
    bot.pos.set(bot.center.x, 0, bot.center.z);
  }
  group.position.copy(bot.pos);
  return bot;
}

function createFlag(x, y, z, color, team) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 4.5, 8),
    new THREE.MeshStandardMaterial({ color: 0x888899, metalness: 0.9 })
  );
  pole.position.y = 2.25;
  group.add(pole);
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(1.8, 1.1),
    new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
  );
  flag.position.set(0.95, 3.8, 0);
  group.add(flag);
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 0.7, 0.3, 12),
    new THREE.MeshStandardMaterial({ color: 0x222233, emissive: color, emissiveIntensity: 0.4 })
  );
  base.position.y = 0.15;
  group.add(base);
  const pl = new THREE.PointLight(color, 1.5, 12);
  pl.position.y = 3;
  group.add(pl);
  group.userData = { team, carriedBy: null, home: new THREE.Vector3(x, y, z), flagMesh: flag };
  scene.add(group);
  return group;
}

// ---------- PLAYER ----------
function createPlayer() {
  player = {
    pos: new THREE.Vector3(0, CFG.eyeHeight, 8),
    vel: new THREE.Vector3(),
    hp: CFG.maxHp,
    team: 'blue',
    dead: false,
    respawnTimer: 0,
    kills: 0,
    deaths: 0,
    carrying: null,
    onGround: true,
    sliding: false,
    slideTimer: 0,
    slideCooldown: 0,
    slideDir: new THREE.Vector3(),
    wallNormal: null,
    wallJumpCount: 0,
    mantling: false,
    mantleTarget: null,
    mantleTimer: 0,
    crouched: false,
    eyeY: CFG.eyeHeight,
    // abilities
    cds: { pearl: 0, fire: 0, shield: 0 },
    shieldActive: false,
    shieldTimer: 0,
    shieldMesh: null
  };
  camera.position.copy(player.pos);
}

/** Build a neon soldier humanoid (head, torso, arms, legs, visor, pack) */
function buildCharacterMesh(teamColor, accentColor) {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x12122a, metalness: 0.75, roughness: 0.35,
    emissive: teamColor, emissiveIntensity: 0.25
  });
  const accentMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a35, metalness: 0.6, roughness: 0.4,
    emissive: accentColor, emissiveIntensity: 0.55
  });
  const visorMat = new THREE.MeshBasicMaterial({ color: accentColor });

  // Legs
  const legGeo = new THREE.CapsuleGeometry(0.14, 0.45, 4, 6);
  const legL = new THREE.Mesh(legGeo, bodyMat);
  legL.position.set(-0.16, 0.42, 0);
  legL.castShadow = true;
  g.add(legL);
  const legR = new THREE.Mesh(legGeo, bodyMat);
  legR.position.set(0.16, 0.42, 0);
  legR.castShadow = true;
  g.add(legR);

  // Torso
  const torso = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.32, 0.55, 6, 8),
    bodyMat
  );
  torso.position.y = 1.05;
  torso.castShadow = true;
  g.add(torso);

  // Chest plate glow
  const plate = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.35, 0.18),
    accentMat
  );
  plate.position.set(0, 1.1, 0.22);
  g.add(plate);

  // Shoulders
  const shoulderGeo = new THREE.SphereGeometry(0.16, 8, 8);
  const shL = new THREE.Mesh(shoulderGeo, accentMat);
  shL.position.set(-0.38, 1.35, 0);
  g.add(shL);
  const shR = new THREE.Mesh(shoulderGeo, accentMat);
  shR.position.set(0.38, 1.35, 0);
  g.add(shR);

  // Arms
  const armGeo = new THREE.CapsuleGeometry(0.1, 0.4, 4, 6);
  const armL = new THREE.Mesh(armGeo, bodyMat);
  armL.position.set(-0.42, 0.95, 0);
  armL.rotation.z = 0.15;
  g.add(armL);
  const armR = new THREE.Mesh(armGeo, bodyMat);
  armR.position.set(0.42, 0.95, 0);
  armR.rotation.z = -0.15;
  g.add(armR);

  // Head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.26, 12, 12),
    bodyMat
  );
  head.position.y = 1.72;
  head.castShadow = true;
  g.add(head);

  // Helmet rim
  const helm = new THREE.Mesh(
    new THREE.TorusGeometry(0.22, 0.04, 6, 16),
    accentMat
  );
  helm.rotation.x = Math.PI / 2;
  helm.position.y = 1.78;
  g.add(helm);

  // Visor
  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.12, 0.16),
    visorMat
  );
  visor.position.set(0, 1.72, 0.2);
  g.add(visor);

  // Back pack / thruster
  const pack = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.4, 0.18),
    accentMat
  );
  pack.position.set(0, 1.15, -0.28);
  g.add(pack);

  // Weapon in right hand (simple rifle)
  const gun = new THREE.Group();
  const barrel = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.08, 0.55),
    new THREE.MeshStandardMaterial({ color: 0x222233, metalness: 0.9, roughness: 0.25, emissive: accentColor, emissiveIntensity: 0.3 })
  );
  barrel.position.z = 0.2;
  gun.add(barrel);
  const stock = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.12, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x111122, metalness: 0.7 })
  );
  stock.position.set(0, -0.02, -0.15);
  gun.add(stock);
  gun.position.set(0.45, 0.95, 0.35);
  g.add(gun);

  g.userData.parts = { legL, legR, armL, armR, torso, head, visor, gun };
  return g;
}

function spawnPlayer(modeId) {
  player.hp = CFG.maxHp;
  player.dead = false;
  player.vel.set(0, 0, 0);
  player.carrying = null;
  player.sliding = false;
  player.mantling = false;
  player.wallJumpCount = 0;
  player.crouched = false;
  player.eyeY = CFG.eyeHeight;
  player.cds = { pearl: 0, fire: 0, shield: 0 };
  player.shieldActive = false;
  player.shieldTimer = 0;
  if (player.shieldMesh) { scene.remove(player.shieldMesh); player.shieldMesh = null; }

  if (modeId === 'lobby') {
    player.pos.set(0, CFG.eyeHeight, 6);
    player.team = 'blue';
  } else if (modeId === 'ffa') {
    player.team = 'player';
    const a = Math.random() * Math.PI * 2;
    const r = 12 + Math.random() * 15;
    player.pos.set(Math.cos(a) * r, CFG.eyeHeight, Math.sin(a) * r);
  } else if (modeId === 'train') {
    player.team = 'blue';
    player.pos.set(0, CFG.eyeHeight, 12);
  } else {
    player.team = 'blue';
    player.pos.set(-CFG.arenaSize + 8 + Math.random() * 4, CFG.eyeHeight, (Math.random() - 0.5) * 16);
  }
  camera.position.copy(player.pos);
  updateHP();
  updateWeaponHUD();
}

// ---------- BOTS ----------
function spawnBots(modeId) {
  bots = [];
  const count = Math.min(CFG.botCount, CFG.maxPlayers - 1);
  for (let i = 0; i < count; i++) {
    let team;
    if (modeId === 'ffa') team = 'enemy_' + i; // unique so everyone is hostile
    else if (modeId === 'tdm' || modeId === 'ctf' || modeId === 'koth') {
      // 1 ally + rest enemies for clearer fights
      team = i === 0 ? 'blue' : 'red';
    } else team = 'red';
    if (banList.includes('BOT_' + i)) continue;
    const bot = createBot(team, i);
    bots.push(bot);
    scene.add(bot.mesh);
  }
}

function createBot(team, id) {
  const color = team === 'blue' ? 0x00aaff : (team === 'red' ? 0xff2288 : 0xaa88ff);
  const accent = team === 'blue' ? 0x00f3ff : (team === 'red' ? 0xff00aa : 0xb388ff);
  const group = buildCharacterMesh(color, accent);

  let pos;
  if (mode === 'ffa') {
    const a = Math.random() * Math.PI * 2;
    pos = new THREE.Vector3(Math.cos(a)*(10+Math.random()*18), 0, Math.sin(a)*(10+Math.random()*18));
  } else if (team === 'blue') {
    pos = new THREE.Vector3(-CFG.arenaSize+5+Math.random()*6, 0, (Math.random()-0.5)*25);
  } else {
    pos = new THREE.Vector3(CFG.arenaSize-5-Math.random()*6, 0, (Math.random()-0.5)*25);
  }
  group.position.copy(pos);

  return {
    mesh: group, pos: group.position, vel: new THREE.Vector3(),
    hp: CFG.maxHp, team, dead: false, respawnTimer: 0,
    lastShot: 0, wanderAngle: Math.random()*Math.PI*2, id, color, carrying: null,
    cds: { pearl: Math.random() * 3, fire: Math.random() * 3, shield: Math.random() * 4 },
    shieldActive: false, shieldTimer: 0, shieldMesh: null,
    walkPhase: Math.random() * Math.PI * 2
  };
}

// ---------- SHOOTING ----------
function shoot() {
  if (player.dead || player.sliding || player.mantling) return;
  if (!matchRunning && mode !== 'lobby' && mode !== 'train') return;
  if (weaponSwapT > 0.12) return; // blocked mid-swap
  const w = currentWeapon();
  const now = performance.now() / 1000;
  if (now - lastShot < w.fireRate) return;
  lastShot = now;

  let baseDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
  if (isAdmin && adminAimbot) {
    let best = null, bestD = 80;
    bots.forEach(b => {
      if (b.dead || b.team === player.team) return;
      const d = player.pos.distanceTo(b.pos);
      if (d < bestD) { bestD = d; best = b; }
    });
    if (best) {
      baseDir = best.pos.clone().add(new THREE.Vector3(0, 1.3, 0)).sub(camera.position).normalize();
    }
  }

  // Melee — instant cone damage
  if (w.melee) {
    const range = w.meleeRange || 3;
    const origin = camera.position.clone();
    spawnMuzzle(origin.clone().add(baseDir.clone().multiplyScalar(1.2)), baseDir, w.color);
    bots.forEach(bot => {
      if (bot.dead || bot.team === player.team) return;
      const to = bot.pos.clone().add(new THREE.Vector3(0, 1.1, 0)).sub(origin);
      const dist = to.length();
      if (dist < range && to.normalize().dot(baseDir) > 0.55) {
        applyDamage(bot, w.damage, player, false);
        spawnHit(bot.pos.clone().add(new THREE.Vector3(0, 1.2, 0)), w.color);
      }
    });
    return;
  }

  const origin = camera.position.clone().add(baseDir.clone().multiplyScalar(0.8));
  for (let p = 0; p < w.pellets; p++) {
    const dir = baseDir.clone();
    if (!(isAdmin && adminAimbot)) {
      dir.x += (Math.random() - 0.5) * w.spread;
      dir.y += (Math.random() - 0.5) * w.spread;
      dir.z += (Math.random() - 0.5) * w.spread;
    }
    dir.normalize();

    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(w.pellets > 1 ? 0.06 : 0.1, 6, 6),
      new THREE.MeshBasicMaterial({ color: w.color })
    );
    mesh.position.copy(origin);
    scene.add(mesh);
    mesh.add(new THREE.PointLight(w.color, 1.2, 6, 2));

    bullets.push({
      mesh, vel: dir.multiplyScalar(w.bulletSpeed), life: 2.0,
      owner: 'player', team: player.team, damage: w.damage,
      prev: origin.clone()
    });
  }
  spawnMuzzle(origin, baseDir, w.color);
}

function botShoot(bot) {
  const now = performance.now() / 1000;
  if (now - bot.lastShot < 0.35 + Math.random() * 0.25) return;
  bot.lastShot = now;

  let aim = null;
  if (!player.dead && bot.team !== player.team && bot.pos.distanceTo(player.pos) < 35) {
    aim = player.pos.clone().add(new THREE.Vector3(0, 1.4, 0));
  } else {
    let best = null, bestD = 40;
    bots.forEach(b => {
      if (b === bot || b.dead || b.team === bot.team) return;
      const d = bot.pos.distanceTo(b.pos);
      if (d < bestD) { bestD = d; best = b; }
    });
    if (best) aim = best.pos.clone().add(new THREE.Vector3(0, 1.4, 0));
  }
  if (!aim) return;
  aim.x += (Math.random()-0.5)*1.2;
  aim.y += (Math.random()-0.5)*0.8;
  aim.z += (Math.random()-0.5)*1.2;

  const dir = aim.sub(bot.pos.clone().add(new THREE.Vector3(0,1.5,0))).normalize();
  const origin = bot.pos.clone().add(new THREE.Vector3(0,1.5,0)).add(dir.clone().multiplyScalar(0.6));
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 5, 5),
    new THREE.MeshBasicMaterial({ color: bot.color })
  );
  mesh.position.copy(origin);
  scene.add(mesh);
  bullets.push({
    mesh, vel: dir.multiplyScalar(90), life: 1.5,
    owner: bot, team: bot.team, damage: 18
  });
}

function spawnMuzzle(pos, dir, color) {
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
    );
    p.position.copy(pos);
    const v = dir.clone().add(new THREE.Vector3((Math.random()-0.5)*0.6,(Math.random()-0.5)*0.6,(Math.random()-0.5)*0.6)).multiplyScalar(8+Math.random()*10);
    scene.add(p);
    particles.push({ mesh: p, vel: v, life: 0.12+Math.random()*0.1, type: 'spark' });
  }
}

function spawnHit(pos, color = 0x00f3ff) {
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 4, 4),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
    );
    p.position.copy(pos);
    const v = new THREE.Vector3((Math.random()-0.5)*12, Math.random()*8, (Math.random()-0.5)*12);
    scene.add(p);
    particles.push({ mesh: p, vel: v, life: 0.25+Math.random()*0.2, type: 'spark' });
  }
}

function spawnDeath(pos, color) {
  for (let i = 0; i < 8; i++) {
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.12, 0.12),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.9 })
    );
    p.position.copy(pos);
    const v = new THREE.Vector3((Math.random()-0.5)*16, Math.random()*12, (Math.random()-0.5)*16);
    scene.add(p);
    particles.push({ mesh: p, vel: v, life: 0.5+Math.random()*0.4, type: 'spark' });
  }
}

// ---------- DAMAGE ----------
function applyDamage(target, amount, attacker, isPlayer) {
  if (target.dead) return;
  if (target.shieldActive) {
    amount *= 0.15;
    spawnHit(
      isPlayer ? player.pos.clone().add(new THREE.Vector3(0, 1, 0)) : target.pos.clone().add(new THREE.Vector3(0, 1, 0)),
      0x44aaff
    );
  }
  const dealt = Math.round(amount);
  target.hp -= amount;

  // Floating damage number (when YOU deal damage)
  if (!isPlayer && (attacker === player || attacker === 'player')) {
    const pos = target.pos.clone().add(new THREE.Vector3(0, 1.8, 0));
    spawnDamageNumber(pos, dealt, target.hp <= 0);
  }

  if (isPlayer) { updateHP(); flashDamage(); }
  if (target.hp <= 0) kill(target, attacker, isPlayer);
}

function spawnDamageNumber(worldPos, amount, isKill) {
  dmgNumbers.push({
    pos: worldPos.clone(),
    amount,
    isKill,
    life: 0.9,
    vy: 1.8 + Math.random() * 0.6,
    vx: (Math.random() - 0.5) * 0.8
  });
}

function updateDamageNumbers(dt) {
  const el = $('dmgLayer');
  if (!el) return;
  // Update life
  for (let i = dmgNumbers.length - 1; i >= 0; i--) {
    const d = dmgNumbers[i];
    d.life -= dt;
    d.pos.y += d.vy * dt;
    d.pos.x += d.vx * dt;
    if (d.life <= 0) dmgNumbers.splice(i, 1);
  }
  // Project to screen (max 12)
  let html = '';
  const limit = Math.min(dmgNumbers.length, 12);
  for (let i = 0; i < limit; i++) {
    const d = dmgNumbers[i];
    const v = d.pos.clone().project(camera);
    if (v.z > 1) continue;
    const x = (v.x * 0.5 + 0.5) * innerWidth;
    const y = (-v.y * 0.5 + 0.5) * innerHeight;
    const op = Math.min(1, d.life * 2);
    const cls = d.isKill ? 'dmg-num kill' : 'dmg-num';
    html += `<div class="${cls}" style="left:${x}px;top:${y}px;opacity:${op}">${d.amount}</div>`;
  }
  el.innerHTML = html;
}

// ---------- ABILITIES ----------
function usePearl() {
  if (player.dead || player.cds.pearl > 0 || player.mantling) return;
  player.cds.pearl = ABILITIES.pearl.cooldown;
  updateAbilityHUD();

  const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
  // slight upward arc
  dir.y = Math.max(0.15, dir.y + 0.2);
  dir.normalize();
  const origin = camera.position.clone().add(dir.clone().multiplyScalar(0.6));

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0x88ffcc })
  );
  mesh.position.copy(origin);
  const glow = new THREE.PointLight(0x88ffcc, 2, 8, 2);
  mesh.add(glow);
  scene.add(mesh);

  abilityProjectiles.push({
    type: 'pearl',
    mesh,
    vel: dir.multiplyScalar(28),
    life: 1.4,
    owner: 'player',
    team: player.team,
    bounced: false
  });
  showToast('TELEPORT PEARL');
}

function useFireCharge() {
  if (player.dead || player.cds.fire > 0 || player.mantling) return;
  player.cds.fire = ABILITIES.fire.cooldown;
  updateAbilityHUD();

  const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).normalize();
  const origin = camera.position.clone().add(dir.clone().multiplyScalar(0.9));

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.22, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xff6622 })
  );
  mesh.position.copy(origin);
  const glow = new THREE.PointLight(0xff4400, 2.5, 10, 2);
  mesh.add(glow);
  scene.add(mesh);

  abilityProjectiles.push({
    type: 'fire',
    mesh,
    vel: dir.multiplyScalar(36),
    life: 1.5,
    owner: 'player',
    team: player.team,
    damage: 38
  });
  showToast('FIRE CHARGE');
}

function useShield() {
  if (player.dead || player.cds.shield > 0 || player.shieldActive) return;
  player.cds.shield = ABILITIES.shield.cooldown;
  player.shieldActive = true;
  player.shieldTimer = ABILITIES.shield.duration;
  updateAbilityHUD();

  // Visual bubble
  if (player.shieldMesh) {
    scene.remove(player.shieldMesh);
  }
  const bubble = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 24, 24),
    new THREE.MeshBasicMaterial({
      color: 0x44aaff,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  );
  bubble.position.copy(player.pos);
  scene.add(bubble);
  player.shieldMesh = bubble;
  showToast('PLASMA SHIELD');
}

function explodeFire(pos, ownerTeam, owner) {
  // Visual burst
  for (let i = 0; i < 20; i++) {
    const p = new THREE.Mesh(
      new THREE.SphereGeometry(0.08 + Math.random() * 0.1, 4, 4),
      new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? 0xff6622 : 0xffaa00, transparent: true, opacity: 0.95 })
    );
    p.position.copy(pos);
    const v = new THREE.Vector3((Math.random()-0.5)*18, Math.random()*12, (Math.random()-0.5)*18);
    scene.add(p);
    particles.push({ mesh: p, vel: v, life: 0.4 + Math.random() * 0.3, type: 'spark' });
  }
  const flash = new THREE.PointLight(0xff5500, 4, 14, 2);
  flash.position.copy(pos);
  scene.add(flash);
  setTimeout(() => scene.remove(flash), 120);

  const radius = 4.2;
  // Damage player
  if (!player.dead && player.team !== ownerTeam) {
    if (player.pos.distanceTo(pos) < radius) {
      const falloff = 1 - player.pos.distanceTo(pos) / radius;
      applyDamage(player, 38 * falloff, owner, true);
    }
  }
  bots.forEach(bot => {
    if (bot.dead || bot.team === ownerTeam) return;
    if (bot.pos.distanceTo(pos) < radius) {
      const falloff = 1 - bot.pos.distanceTo(pos) / radius;
      applyDamage(bot, 38 * falloff, owner === 'player' ? player : owner, false);
    }
  });
}

function updateAbilityProjectiles(dt) {
  for (let i = abilityProjectiles.length - 1; i >= 0; i--) {
    const p = abilityProjectiles[i];
    p.vel.y -= (p.type === 'pearl' ? 18 : 6) * dt;
    p.mesh.position.add(p.vel.clone().multiplyScalar(dt));
    p.life -= dt;

    let remove = p.life <= 0;
    const pos = p.mesh.position;

    // Ground
    if (pos.y < 0.2) {
      pos.y = 0.2;
      if (p.type === 'pearl') {
        // Teleport owner
        if (p.owner === 'player' && !player.dead) {
          player.pos.set(pos.x, CFG.eyeHeight, pos.z);
          // keep in bounds
          const bound = mode === 'lobby' ? CFG.lobbySize - 2 : CFG.arenaSize - 2;
          player.pos.x = Math.max(-bound, Math.min(bound, player.pos.x));
          player.pos.z = Math.max(-bound, Math.min(bound, player.pos.z));
          camera.position.copy(player.pos);
          spawnHit(pos, 0x88ffcc);
        } else if (p.owner !== 'player' && p.owner && !p.owner.dead) {
          p.owner.pos.set(pos.x, 0, pos.z);
          spawnHit(pos, 0x88ffcc);
        }
        remove = true;
      } else if (p.type === 'fire') {
        explodeFire(pos.clone(), p.team, p.owner);
        remove = true;
      }
    }

    // Wall hit
    if (!remove) {
      for (const w of walls) {
        const box = new THREE.Box3().setFromObject(w);
        if (box.containsPoint(pos)) {
          if (p.type === 'pearl') {
            if (p.owner === 'player' && !player.dead) {
              player.pos.set(pos.x, Math.max(CFG.eyeHeight, pos.y + 0.5), pos.z);
              camera.position.copy(player.pos);
              spawnHit(pos, 0x88ffcc);
            } else if (p.owner !== 'player' && p.owner && !p.owner.dead) {
              p.owner.pos.set(pos.x, 0, pos.z);
            }
          } else if (p.type === 'fire') {
            explodeFire(pos.clone(), p.team, p.owner);
          }
          remove = true;
          break;
        }
      }
    }

    // Fire charge hits entities
    if (!remove && p.type === 'fire') {
      if (p.owner !== 'player' && !player.dead && player.team !== p.team) {
        if (pos.distanceTo(player.pos) < 1.2) {
          explodeFire(pos.clone(), p.team, p.owner);
          remove = true;
        }
      }
      if (!remove) {
        bots.forEach(bot => {
          if (remove || bot.dead || bot.team === p.team) return;
          if (p.owner !== 'player' && p.owner === bot) return;
          if (pos.distanceTo(bot.pos.clone().add(new THREE.Vector3(0, 1, 0))) < 1.1) {
            explodeFire(pos.clone(), p.team, p.owner);
            remove = true;
          }
        });
      }
    }

    if (remove) {
      scene.remove(p.mesh);
      abilityProjectiles.splice(i, 1);
    }
  }
}

function updateAbilities(dt) {
  // Cooldowns
  ['pearl', 'fire', 'shield'].forEach(k => {
    if (player.cds[k] > 0) {
      player.cds[k] = Math.max(0, player.cds[k] - dt);
    }
  });
  // Shield timer
  if (player.shieldActive) {
    player.shieldTimer -= dt;
    if (player.shieldMesh) {
      player.shieldMesh.position.copy(player.pos);
      player.shieldMesh.material.opacity = 0.15 + Math.sin(performance.now() * 0.01) * 0.12;
    }
    if (player.shieldTimer <= 0) {
      player.shieldActive = false;
      if (player.shieldMesh) {
        scene.remove(player.shieldMesh);
        player.shieldMesh = null;
      }
    }
  }
  // Throttle ability HUD (DOM writes are expensive)
  if (!updateAbilities._acc) updateAbilities._acc = 0;
  updateAbilities._acc += dt;
  if (updateAbilities._acc > 0.12) {
    updateAbilities._acc = 0;
    updateAbilityHUD();
  }
}

function updateAbilityHUD() {
  const el = $('abilityBar');
  if (!el || !player) return;
  const items = [
    { id: 'pearl', key: binds.ability1, a: ABILITIES.pearl },
    { id: 'fire', key: binds.ability2, a: ABILITIES.fire },
    { id: 'shield', key: binds.ability3, a: ABILITIES.shield }
  ];
  el.innerHTML = items.map(({ id, key, a }) => {
    const cd = player.cds[id];
    const ready = cd <= 0;
    const pct = ready ? 100 : Math.max(0, 100 - (cd / a.cooldown) * 100);
    return `<div class="ability ${ready ? 'ready' : 'cd'}" data-id="${id}">
      <div class="ability-icon" style="color:#${new THREE.Color(a.color).getHexString()}">${a.icon}</div>
      <div class="ability-name">${a.name}</div>
      <div class="ability-key">${keyDisplay(key)}</div>
      <div class="ability-cd" style="width:${pct}%"></div>
    </div>`;
  }).join('');
}

function kill(victim, killer, isPlayerVictim) {
  victim.dead = true;
  victim.hp = 0;
  // Aim trainers respawn fast for continuous practice
  victim.respawnTimer = victim.trainer ? 1.2 : CFG.respawnTime;
  victim.vel.set(0, 0, 0);
  if (victim.carrying) {
    const flag = victim.carrying;
    flag.userData.carriedBy = null;
    flag.position.copy(victim.pos);
    flag.position.y = 0;
    victim.carrying = null;
  }
  const pos = isPlayerVictim ? player.pos.clone() : victim.pos.clone();
  pos.y += 1;
  spawnDeath(pos, isPlayerVictim ? 0x00f3ff : victim.color);

  if (mode === 'tdm' || mode === 'ctf' || mode === 'koth') {
    if (killer && killer.team && killer.team !== victim.team) {
      if (killer.team === 'blue') scores.blue++;
      else if (killer.team === 'red') scores.red++;
    }
  } else if (mode === 'ffa') {
    if (killer === 'player' || killer === player) {
      player.kills++;
      scores.blue = player.kills;
    }
  }
  updateScores();
  addKillFeed(killer, victim, isPlayerVictim);
  if (isPlayerVictim) {
    player.deaths++;
    player.sliding = false;
    player.mantling = false;
    showDeathUI(killer);
  } else if (killer === player || killer === 'player') {
    showKillUI(victim);
  }
  if (!isPlayerVictim) victim.mesh.visible = false;
}

function showKillUI(victim) {
  const el = $('killBanner');
  if (!el) return;
  const name = victim.team ? (victim.team + ' BOT').toUpperCase() : 'ENEMY';
  el.innerHTML = `<div class="kb-title">ELIMINATED</div><div class="kb-name">${name}</div>`;
  el.classList.add('show');
  killBannerT = 2.2;
}

function showDeathUI(killer) {
  const el = $('deathBanner');
  if (!el) return;
  let by = 'ENEMY';
  if (killer && killer.team) by = (killer.team + ' BOT').toUpperCase();
  el.innerHTML = `<div class="db-title">YOU DIED</div><div class="db-name">Killed by ${by}</div><div class="db-sub">Respawning…</div>`;
  el.classList.add('show');
  deathBannerT = CFG.respawnTime;
}

function updateBanners(dt) {
  if (killBannerT > 0) {
    killBannerT -= dt;
    if (killBannerT <= 0) $('killBanner') && $('killBanner').classList.remove('show');
  }
  if (deathBannerT > 0) {
    deathBannerT -= dt;
    if (deathBannerT <= 0) $('deathBanner') && $('deathBanner').classList.remove('show');
  }
}

function respawn(entity, isPlayer) {
  entity.dead = false;
  entity.hp = CFG.maxHp;
  entity.vel.set(0, 0, 0);
  if (isPlayer) {
    spawnPlayer(mode);
    showToast('RESPAWNED');
  } else {
    entity.mesh.visible = true;
    if (mode === 'ffa') {
      const a = Math.random()*Math.PI*2;
      entity.pos.set(Math.cos(a)*(10+Math.random()*18), 0, Math.sin(a)*(10+Math.random()*18));
    } else if (entity.team === 'blue') {
      entity.pos.set(-CFG.arenaSize+5+Math.random()*5, 0, (Math.random()-0.5)*22);
    } else {
      entity.pos.set(CFG.arenaSize-5-Math.random()*5, 0, (Math.random()-0.5)*22);
    }
  }
}

// ---------- MOVEMENT HELPERS ----------
function getWallNormal() {
  // Raycast-ish: check nearby walls around player
  const origin = player.pos.clone();
  origin.y -= 0.3;
  const dirs = [
    new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
    new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1),
    new THREE.Vector3(0.7, 0, 0.7), new THREE.Vector3(-0.7, 0, 0.7),
    new THREE.Vector3(0.7, 0, -0.7), new THREE.Vector3(-0.7, 0, -0.7)
  ];
  const reach = 0.75;
  for (const d of dirs) {
    const test = origin.clone().add(d.clone().multiplyScalar(reach));
    for (const w of walls) {
      const box = new THREE.Box3().setFromObject(w);
      // Only consider vertical-ish surfaces (not floors)
      if (box.max.y - box.min.y < 1.2) continue;
      if (box.containsPoint(test) || (
        test.x > box.min.x - 0.05 && test.x < box.max.x + 0.05 &&
        test.z > box.min.z - 0.05 && test.z < box.max.z + 0.05 &&
        test.y > box.min.y && test.y < box.max.y
      )) {
        // Approximate outward normal
        const cx = (box.min.x + box.max.x) / 2;
        const cz = (box.min.z + box.max.z) / 2;
        const n = new THREE.Vector3(origin.x - cx, 0, origin.z - cz).normalize();
        if (n.lengthSq() < 0.01) n.copy(d).negate();
        return n;
      }
    }
  }
  return null;
}

function tryMantle() {
  if (player.mantling || player.onGround) return false;
  // Look for a ledge in front of player at roughly chest-to-head height
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const checkOrigin = player.pos.clone();
  checkOrigin.y = player.pos.y - player.eyeY + 0.3; // near feet-ish then scan up

  // Sample points ahead at various heights
  for (let h = 0.8; h <= CFG.mantleHeight; h += 0.35) {
    const sample = player.pos.clone();
    sample.y = player.pos.y - player.eyeY + h;
    const ahead = sample.clone().add(forward.clone().multiplyScalar(CFG.mantleReach));

    for (const w of walls) {
      const box = new THREE.Box3().setFromObject(w);
      // Is there a solid at ahead?
      if (ahead.x > box.min.x && ahead.x < box.max.x &&
          ahead.z > box.min.z && ahead.z < box.max.z &&
          sample.y < box.max.y && sample.y > box.min.y - 0.2) {
        // Top of this box is a potential ledge
        const ledgeY = box.max.y;
        const climb = ledgeY - (player.pos.y - player.eyeY);
        if (climb > 0.4 && climb < CFG.mantleHeight + 0.3) {
          // Check clear space on top
          const topCheck = new THREE.Vector3(ahead.x, ledgeY + 0.3, ahead.z);
          let blocked = false;
          for (const w2 of walls) {
            if (w2 === w) continue;
            const b2 = new THREE.Box3().setFromObject(w2);
            if (b2.containsPoint(topCheck)) { blocked = true; break; }
          }
          if (!blocked) {
            player.mantling = true;
            player.mantleTimer = 0.28;
            player.mantleTarget = new THREE.Vector3(ahead.x, ledgeY + CFG.eyeHeight, ahead.z);
            player.vel.set(0, 0, 0);
            player.sliding = false;
            setMoveState('MANTLE');
            return true;
          }
        }
      }
    }
  }
  return false;
}

function setMoveState(text) {
  const el = $('moveState');
  if (!text) {
    el.classList.remove('show');
    return;
  }
  el.textContent = text;
  el.classList.add('show');
}

// ---------- INPUT ----------
function setupInput() {
  document.addEventListener('keydown', e => {
    keys[e.code] = true;

    if (listeningBind) {
      e.preventDefault();
      finishListening(e.code);
      return;
    }

    if (e.code === binds.pause || e.code === 'Escape') {
      if (matchRunning) togglePause();
      else if (mode === 'lobby') {
        document.exitPointerLock();
        $('menu').classList.remove('hidden');
        mode = 'menu';
      }
      return;
    }

    if (e.code === binds.interact && mode === 'lobby') tryEnterPortal();

    // Jump / walljump / mantle
    if (e.code === binds.jump) {
      if (player.dead || player.mantling) return;
      if (player.onGround && !player.sliding) {
        player.vel.y = CFG.jumpForce;
        player.onGround = false;
        player.wallJumpCount = 0;
      } else if (!player.onGround) {
        // Try mantle first
        if (autoMantle && tryMantle()) return;
        // Wall jump
        const n = getWallNormal();
        if (n && player.wallJumpCount < 2) {
          player.vel.y = CFG.wallJumpForce;
          player.vel.x += n.x * CFG.wallJumpPush;
          player.vel.z += n.z * CFG.wallJumpPush;
          player.wallJumpCount++;
          player.wallNormal = n;
          setMoveState('WALL JUMP');
          setTimeout(() => setMoveState(null), 400);
        } else if (!autoMantle) {
          tryMantle();
        }
      }
    }

    // Slide
    if (e.code === binds.slide) {
      tryStartSlide();
    }

    // Abilities
    if (e.code === binds.ability1) usePearl();
    if (e.code === binds.ability2) useFireCharge();
    if (e.code === binds.ability3) useShield();

    // Weapon slots 1 / 2 / 3
    if (e.code === 'Digit1' || e.code === 'Numpad1') switchSlot('primary');
    if (e.code === 'Digit2' || e.code === 'Numpad2') switchSlot('secondary');
    if (e.code === 'Digit3' || e.code === 'Numpad3') switchSlot('melee');
    if (e.code === 'Digit4' || e.code === 'Numpad4') switchSlot('utility');

    // Enter confirms loadout / starts match when panel is open
    if (e.code === 'Enter') {
      const gs = $('gunSelect');
      if (gs && !gs.classList.contains('hidden')) {
        e.preventDefault();
        confirmGun();
      }
    }
  });

  document.addEventListener('keyup', e => {
    keys[e.code] = false;
  });

  renderer.domElement.addEventListener('click', () => {
    if (!locked && (matchRunning || mode === 'lobby')) {
      renderer.domElement.requestPointerLock();
    }
  });

  document.addEventListener('pointerlockchange', () => {
    locked = document.pointerLockElement === renderer.domElement;
  });

  document.addEventListener('mousemove', e => {
    if (!locked) return;
    yaw -= e.movementX * CFG.mouseSens;
    pitch -= e.movementY * CFG.mouseSens;
    pitch = Math.max(-1.45, Math.min(1.45, pitch));
  });

  document.addEventListener('mousedown', e => {
    if (listeningBind) {
      const code = e.button === 0 ? 'Mouse0' : (e.button === 2 ? 'Mouse2' : null);
      if (code) {
        e.preventDefault();
        finishListening(code);
      }
      return;
    }
    if (e.button === 0 && locked) {
      if (binds.shoot === 'Mouse0') shoot();
    }
  });

  document.addEventListener('contextmenu', e => e.preventDefault());
}

function tryStartSlide() {
  if (player.dead || player.sliding || player.mantling || !player.onGround) return;
  if (player.slideCooldown > 0) return;
  // Must be moving forward-ish and preferably sprinting
  const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
  const moving = isDown('forward') || isDown('back') || isDown('left') || isDown('right');
  const sprinting = isDown('sprint');
  if (!moving && !sprinting) return;

  player.sliding = true;
  player.slideTimer = CFG.slideDuration;
  player.slideCooldown = CFG.slideCooldown + CFG.slideDuration;
  player.crouched = true;
  player.eyeY = CFG.crouchHeight;

  // Direction of slide
  let dir = new THREE.Vector3();
  if (isDown('forward')) dir.add(forward);
  if (isDown('back')) dir.sub(forward);
  const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
  if (isDown('left')) dir.sub(right);
  if (isDown('right')) dir.add(right);
  if (dir.lengthSq() < 0.01) dir.copy(forward);
  dir.normalize();
  player.slideDir.copy(dir);

  // Boost
  player.vel.x = dir.x * CFG.playerSpeed * CFG.slideMult;
  player.vel.z = dir.z * CFG.playerSpeed * CFG.slideMult;
  setMoveState('SLIDE');
}

// ---------- UI ----------
function setupUI() {
  $('play').onclick = () => {
    $('menu').classList.add('hidden');
    mode = 'lobby';
    buildLobby();
    spawnPlayer('lobby');
    $('hud').classList.add('hidden');
    setTimeout(() => renderer.domElement.requestPointerLock(), 150);
    showToast('LOBBY — Portals · WASD · E to enter');
  };

  document.querySelectorAll('.mode-card').forEach(card => {
    card.onclick = () => openGunSelect(card.dataset.mode);
  });

  $('modeBack') && ($('modeBack').onclick = () => {
    $('modeSelect').classList.add('hidden');
    $('menu').classList.remove('hidden');
  });

  $('gunConfirm').onclick = confirmGun;
  $('gunBack').onclick = () => {
    $('gunSelect').classList.add('hidden');
    pendingMode = null;
    if (matchRunning) renderer.domElement.requestPointerLock();
    else $('menu').classList.remove('hidden');
  };

  // Settings
  $('openSettings').onclick = () => openSettings();
  $('settingsClose').onclick = () => {
    $('settings').classList.add('hidden');
    if (mode === 'menu') $('menu').classList.remove('hidden');
  };
  $('settingsSave').onclick = () => {
    CFG.mouseSens = parseInt($('sensSlider').value, 10) / 10000;
    autoMantle = $('autoMantle').checked;
    saveSettings();
    showToast('SETTINGS SAVED');
    $('settings').classList.add('hidden');
    if (mode === 'menu') $('menu').classList.remove('hidden');
  };
  $('settingsReset').onclick = () => {
    binds = { ...DEFAULT_BINDS };
    CFG.mouseSens = 0.0022;
    autoMantle = true;
    loadout = { primary: 'pulse', secondary: 'pistol', melee: 'katana', utility: 'flare' };
    selectedCharacter = 'ronin';
    activeSlot = 'primary';
    $('sensSlider').value = 22;
    $('sensVal').textContent = '22';
    $('autoMantle').checked = true;
    buildBindList();
    saveSettings();
    showToast('RESET TO DEFAULTS');
  };
  $('sensSlider').oninput = () => {
    $('sensVal').textContent = $('sensSlider').value;
  };

  $('resume').onclick = () => {
    $('pause').classList.add('hidden');
    matchRunning = true;
    renderer.domElement.requestPointerLock();
  };
  $('pauseGuns').onclick = () => {
    $('pause').classList.add('hidden');
    openGunSelect(null);
  };
  $('pauseSettings').onclick = () => {
    $('pause').classList.add('hidden');
    openSettings(true);
  };
  $('quit').onclick = () => {
    $('pause').classList.add('hidden');
    goToMainMenu();
  };
  $('again').onclick = () => {
    $('end').classList.add('hidden');
    openGunSelect(mode);
  };
  $('endMenu').onclick = () => {
    $('end').classList.add('hidden');
    goToMainMenu();
  };

  // Account
  $('openAccount') && ($('openAccount').onclick = () => {
    $('menu').classList.add('hidden');
    $('accountPanel').classList.remove('hidden');
    updateAccountUI();
  });
  $('accountClose') && ($('accountClose').onclick = () => {
    $('accountPanel').classList.add('hidden');
    $('menu').classList.remove('hidden');
  });
  $('loginBtn') && ($('loginBtn').onclick = () => {
    registerOrLogin($('loginUser').value.trim(), $('loginPass').value);
  });
  $('addFriendBtn') && ($('addFriendBtn').onclick = () => {
    addFriend($('friendName').value.trim());
    $('friendName').value = '';
  });
  $('createClanBtn') && ($('createClanBtn').onclick = () => {
    createClan($('clanName').value.trim());
    $('clanName').value = '';
  });

  // Private server (local session tag)
  $('createServerBtn') && ($('createServerBtn').onclick = () => {
    privateServer.name = $('serverName').value.trim() || 'NEON SERVER';
    privateServer.password = $('serverPass').value;
    privateServer.open = true;
    showToast('PRIVATE SERVER: ' + privateServer.name + (privateServer.password ? ' (LOCKED)' : ''));
    showToast('NOTE: Online multiplayer needs a backend host');
  });

  // Admin
  $('openAdmin') && ($('openAdmin').onclick = () => {
    $('menu').classList.add('hidden');
    $('adminGate').classList.remove('hidden');
  });
  $('adminUnlock') && ($('adminUnlock').onclick = () => {
    if (tryAdminCode($('adminCodeInput').value.trim())) {
      $('adminGate').classList.add('hidden');
      $('adminPanel').classList.remove('hidden');
      refreshAdminPlayerList();
    }
  });
  const closeAdmin = () => {
    $('adminPanel') && $('adminPanel').classList.add('hidden');
    $('adminGate') && $('adminGate').classList.add('hidden');
    $('menu').classList.remove('hidden');
  };
  $('adminClose') && ($('adminClose').onclick = closeAdmin);
  $('adminPanelClose') && ($('adminPanelClose').onclick = closeAdmin);
  $('toggleFly') && ($('toggleFly').onclick = () => {
    if (!isAdmin) return;
    adminFly = !adminFly;
    showToast(adminFly ? 'FLY ON' : 'FLY OFF');
    $('toggleFly').textContent = adminFly ? 'FLY: ON' : 'FLY: OFF';
  });
  $('toggleAimbot') && ($('toggleAimbot').onclick = () => {
    if (!isAdmin) return;
    adminAimbot = !adminAimbot;
    showToast(adminAimbot ? 'AIMBOT ON' : 'AIMBOT OFF');
    $('toggleAimbot').textContent = adminAimbot ? 'AIMBOT: ON' : 'AIMBOT: OFF';
  });
  $('adminBanInputBtn') && ($('adminBanInputBtn').onclick = () => {
    adminBanName($('adminBanInput').value.trim());
    $('adminBanInput').value = '';
  });

  updateAccountUI();
  if (isAdmin && $('openAdmin')) {
    // already unlocked
  }
}

function openSettings(fromPause) {
  $('sensSlider').value = Math.round(CFG.mouseSens * 10000);
  $('sensVal').textContent = $('sensSlider').value;
  $('autoMantle').checked = autoMantle;
  buildBindList();
  $('settings').classList.remove('hidden');
  $('menu').classList.add('hidden');
  document.exitPointerLock();
}

function startMode(modeId) {
  if (!modeId) return;
  hideAllOverlays();
  pendingMode = null;
  matchRunning = false; // until arena is ready

  buildArena(modeId);
  spawnPlayer(modeId);
  scores = { blue: 0, red: 0 };
  matchTimer = modeId === 'train' ? 9999 : CFG.matchTime;
  matchRunning = true;
  mode = modeId;

  if ($('hud')) $('hud').classList.remove('hidden');
  const labels = {
    tdm: 'TEAM DEATHMATCH', ffa: 'FREE FOR ALL', ctf: 'CAPTURE THE FLAG',
    koth: 'KING OF THE HILL', train: 'TRAINING GROUND'
  };
  if ($('modeLabel')) $('modeLabel').textContent = labels[modeId] || modeId.toUpperCase();
  updateScores();
  updateHP();
  updateWeaponHUD();
  updateAbilityHUD();
  if (isAdmin) refreshAdminPlayerList();
  showToast((labels[modeId] || modeId) + ' — GO!');
  // Click canvas to lock mouse if browser blocks auto lock
  setTimeout(() => {
    try { renderer.domElement.requestPointerLock(); } catch (e) {}
  }, 150);
}

function returnToLobby() {
  matchRunning = false;
  mode = 'lobby';
  buildLobby();
  spawnPlayer('lobby');
  $('hud').classList.add('hidden');
  $('menu').classList.add('hidden');
  $('modeSelect').classList.add('hidden');
  $('end').classList.add('hidden');
  $('pause').classList.add('hidden');
  document.exitPointerLock();
  setTimeout(() => renderer.domElement.requestPointerLock(), 100);
  showToast('LOBBY — Walk to a portal & press E');
}

function goToMainMenu() {
  matchRunning = false;
  mode = 'menu';
  buildLobby();
  $('hud').classList.add('hidden');
  $('menu').classList.remove('hidden');
  $('modeSelect').classList.add('hidden');
  $('end').classList.add('hidden');
  $('pause').classList.add('hidden');
  $('gunSelect').classList.add('hidden');
  $('settings').classList.add('hidden');
  document.exitPointerLock();
}

function togglePause() {
  if (!matchRunning) {
    matchRunning = true;
    $('pause').classList.add('hidden');
    renderer.domElement.requestPointerLock();
  } else {
    matchRunning = false;
    $('pause').classList.remove('hidden');
    document.exitPointerLock();
  }
}

function updateHP() {
  const pct = Math.max(0, player.hp / CFG.maxHp * 100);
  $('hpbar').style.width = pct + '%';
  $('hp').textContent = Math.ceil(player.hp);
  if (pct < 30) $('hpbar').style.background = 'linear-gradient(90deg,#ff2244,#ff0066)';
  else if (pct < 60) $('hpbar').style.background = 'linear-gradient(90deg,#ffaa00,#ff6600)';
  else $('hpbar').style.background = 'linear-gradient(90deg,#00ff9d,#00cc77)';
}

function updateScores() {
  $('blueScore').textContent = scores.blue;
  $('redScore').textContent = scores.red;
}

function updateClock() {
  const m = Math.floor(matchTimer / 60);
  const s = Math.floor(matchTimer % 60);
  $('clock').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

function flashDamage() {
  const d = $('damage');
  d.style.opacity = '1';
  setTimeout(() => d.style.opacity = '0', 120);
}

function addKillFeed(killer, victim, isPlayerVictim) {
  const feed = $('killfeed');
  const div = document.createElement('div');
  let killerName = 'BOT', victimName = isPlayerVictim ? 'YOU' : 'BOT';
  if (killer === 'player' || killer === player) killerName = 'YOU';
  else if (killer && killer.team) killerName = killer.team.toUpperCase() + ' BOT';
  if (!isPlayerVictim && victim.team) victimName = victim.team.toUpperCase() + ' BOT';
  div.textContent = `${killerName}  »  ${victimName}`;
  feed.prepend(div);
  if (feed.children.length > 5) feed.lastChild.remove();
  setTimeout(() => div.remove(), 4000);
}

function tryEnterPortal() {
  if (mode !== 'lobby') return;
  for (const p of portals) {
    if (player.pos.distanceTo(p.position) < 5) {
      const modeId = p.userData.mode;
      // Clear sticky UI immediately
      const inter = $('interact');
      if (inter) inter.classList.remove('show');
      hideAllOverlays();
      // Start match right away with current loadout (change loadout from Pause → Change Loadout)
      try {
        startMode(modeId);
      } catch (err) {
        console.error(err);
        showToast('COULD NOT START MATCH');
        mode = 'lobby';
        matchRunning = false;
        buildLobby();
        spawnPlayer('lobby');
      }
      return;
    }
  }
}

// ---------- UPDATE LOOPS ----------
function updatePlayer(dt) {
  if (player.dead) {
    player.respawnTimer -= dt;
    if (player.respawnTimer <= 0) respawn(player, true);
    return;
  }

  // Mantling takes over movement
  if (player.mantling) {
    player.mantleTimer -= dt;
    const t = 1 - Math.max(0, player.mantleTimer / 0.28);
    player.pos.lerp(player.mantleTarget, 0.25 + t * 0.5);
    camera.position.copy(player.pos);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
    if (player.mantleTimer <= 0) {
      player.mantling = false;
      player.pos.copy(player.mantleTarget);
      player.onGround = true;
      player.wallJumpCount = 0;
      setMoveState(null);
    }
    return;
  }

  // Admin fly
  if (isAdmin && adminFly) {
    const speed = 22 * (isDown('sprint') ? 1.8 : 1);
    const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    let move = new THREE.Vector3();
    if (isDown('forward')) move.add(forward);
    if (isDown('back')) move.sub(forward);
    if (isDown('left')) move.sub(right);
    if (isDown('right')) move.add(right);
    if (isDown('jump')) move.y += 1;
    if (isDown('slide')) move.y -= 1;
    if (move.length() > 0) move.normalize().multiplyScalar(speed);
    player.pos.add(move.multiplyScalar(dt));
    player.vel.set(0, 0, 0);
    camera.position.copy(player.pos);
    camera.rotation.order = 'YXZ';
    camera.rotation.y = yaw;
    camera.rotation.x = pitch;
    setMoveState('FLY');
    return;
  }

  // Slide cooldown
  if (player.slideCooldown > 0) player.slideCooldown -= dt;

  // Sliding
  if (player.sliding) {
    player.slideTimer -= dt;
    const decay = player.slideTimer / CFG.slideDuration;
    const speed = CFG.playerSpeed * CFG.slideMult * (0.45 + decay * 0.55);
    player.vel.x = player.slideDir.x * speed;
    player.vel.z = player.slideDir.z * speed;
    player.eyeY = CFG.crouchHeight;

    if (player.slideTimer <= 0 || !player.onGround) {
      player.sliding = false;
      player.crouched = false;
      player.eyeY = CFG.eyeHeight;
      setMoveState(null);
    }
  } else {
    // Normal movement
    const sprinting = isDown('sprint') && isDown('forward');
    const speed = CFG.playerSpeed * (sprinting ? CFG.sprintMult : 1);
    const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
    const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));
    let move = new THREE.Vector3();
    if (isDown('forward')) move.add(forward);
    if (isDown('back')) move.sub(forward);
    if (isDown('left')) move.sub(right);
    if (isDown('right')) move.add(right);
    if (move.length() > 0) move.normalize().multiplyScalar(speed);
    player.vel.x = move.x;
    player.vel.z = move.z;
    player.eyeY = THREE.MathUtils.lerp(player.eyeY, CFG.eyeHeight, 1 - Math.pow(0.001, dt));
  }

  // Gravity
  player.vel.y -= CFG.gravity * dt;
  player.pos.x += player.vel.x * dt;
  player.pos.y += player.vel.y * dt;
  player.pos.z += player.vel.z * dt;

  // Ground
  const groundY = player.eyeY;
  if (player.pos.y < groundY) {
    player.pos.y = groundY;
    player.vel.y = 0;
    player.onGround = true;
    player.wallJumpCount = 0;
  } else {
    player.onGround = false;
  }

  // Wall collision (cached AABBs)
  const r = player.sliding ? 0.55 : 0.45;
  const p = player.pos;
  const bodyBottom = p.y - player.eyeY;
  const bodyTop = p.y + 0.2;
  for (let wi = 0; wi < wallBoxes.length; wi++) {
    const box = wallBoxes[wi];
    if (p.x + r > box.min.x && p.x - r < box.max.x &&
        p.z + r > box.min.z && p.z - r < box.max.z &&
        bodyTop > box.min.y && bodyBottom < box.max.y) {
      const cx = (box.min.x + box.max.x) / 2;
      const cz = (box.min.z + box.max.z) / 2;
      const dx = p.x - cx;
      const dz = p.z - cz;
      const overlapX = (box.max.x - box.min.x) / 2 + r - Math.abs(dx);
      const overlapZ = (box.max.z - box.min.z) / 2 + r - Math.abs(dz);
      if (overlapX < overlapZ) {
        p.x = dx > 0 ? box.max.x + r : box.min.x - r;
        if (player.sliding) player.vel.x *= 0.3;
      } else {
        p.z = dz > 0 ? box.max.z + r : box.min.z - r;
        if (player.sliding) player.vel.z *= 0.3;
      }
    }
  }

  // Bounds
  const bound = mode === 'lobby' ? CFG.lobbySize - 1 : CFG.arenaSize - 1;
  player.pos.x = Math.max(-bound, Math.min(bound, player.pos.x));
  player.pos.z = Math.max(-bound, Math.min(bound, player.pos.z));

  camera.position.set(player.pos.x, player.pos.y, player.pos.z);
  camera.rotation.order = 'YXZ';
  camera.rotation.y = yaw;
  camera.rotation.x = pitch;

  if (player.carrying) {
    player.carrying.position.copy(player.pos);
    player.carrying.position.y = 2.2;
  }
}

function updateBots(dt) {
  bots.forEach(bot => {
    if (bot.dead) {
      bot.respawnTimer -= dt;
      if (bot.respawnTimer <= 0) {
        if (bot.trainer) {
          // Quick respawn on track for aim practice
          bot.dead = false;
          bot.hp = CFG.maxHp;
          bot.mesh.visible = true;
          bot.phase = Math.random() * Math.PI * 2;
          bot.pos.x = bot.center.x;
          bot.pos.y = 0;
          bot.pos.z = bot.center.z;
        } else {
          respawn(bot, false);
        }
      }
      return;
    }

    // —— AIM TRAINERS: gunless, fixed tracks only ——
    if (bot.trainer) {
      bot.phase += dt * (bot.speed / Math.max(1, bot.amplitude));
      if (bot.motion === 'strafe') {
        bot.pos.x = bot.center.x + Math.sin(bot.phase) * bot.amplitude;
        bot.pos.y = 0;
        bot.pos.z = bot.center.z;
        bot.mesh.rotation.y = Math.sin(bot.phase) > 0 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        // Vertical float (up / down)
        bot.pos.x = bot.center.x;
        bot.pos.z = bot.center.z;
        bot.pos.y = 1.2 + (Math.sin(bot.phase) * 0.5 + 0.5) * bot.amplitude;
        bot.mesh.rotation.y = Math.atan2(player.pos.x - bot.pos.x, player.pos.z - bot.pos.z);
      }
      bot.mesh.position.copy(bot.pos);
      // Walk anim
      bot.walkPhase += dt * 8;
      const legs = bot.mesh.userData && bot.mesh.userData.legs;
      if (legs) {
        legs[0].rotation.x = Math.sin(bot.walkPhase) * 0.4;
        legs[1].rotation.x = Math.sin(bot.walkPhase + Math.PI) * 0.4;
      }
      return;
    }

    // Cooldowns
    ['pearl', 'fire', 'shield'].forEach(k => {
      if (bot.cds[k] > 0) bot.cds[k] = Math.max(0, bot.cds[k] - dt);
    });
    if (bot.shieldActive) {
      bot.shieldTimer -= dt;
      if (bot.shieldMesh) bot.shieldMesh.position.set(bot.pos.x, 1.1, bot.pos.z);
      if (bot.shieldTimer <= 0) {
        bot.shieldActive = false;
        if (bot.shieldMesh) { scene.remove(bot.shieldMesh); bot.shieldMesh = null; }
      }
    }

    let targetPos = null, nearest = 999;
    if (!player.dead && bot.team !== player.team) {
      const d = bot.pos.distanceTo(player.pos);
      if (d < nearest) { nearest = d; targetPos = player.pos; }
    }
    bots.forEach(other => {
      if (other === bot || other.dead || other.team === bot.team || other.trainer) return;
      const d = bot.pos.distanceTo(other.pos);
      if (d < nearest) { nearest = d; targetPos = other.pos; }
    });
    const speed = 6.5 + Math.random() * 2;
    if (targetPos && nearest < 30) {
      const dir = targetPos.clone().sub(bot.pos); dir.y = 0; dir.normalize();
      bot.vel.x = dir.x * speed; bot.vel.z = dir.z * speed;
      bot.mesh.rotation.y = Math.atan2(dir.x, dir.z);
      if (nearest < 22) botShoot(bot);

      if (nearest < 18 && bot.cds.fire <= 0 && Math.random() < 0.015) {
        botUseFire(bot, targetPos);
      }
      if (nearest < 12 && bot.cds.shield <= 0 && bot.hp < 55 && Math.random() < 0.02) {
        botUseShield(bot);
      }
      if ((nearest > 16 || bot.hp < 40) && bot.cds.pearl <= 0 && Math.random() < 0.01) {
        botUsePearl(bot, targetPos, nearest);
      }
    } else {
      bot.wanderAngle += (Math.random() - 0.5) * 0.8 * dt;
      bot.vel.x = Math.sin(bot.wanderAngle) * speed * 0.6;
      bot.vel.z = Math.cos(bot.wanderAngle) * speed * 0.6;
      bot.mesh.rotation.y = bot.wanderAngle;
    }
    bot.pos.x += bot.vel.x * dt;
    bot.pos.z += bot.vel.z * dt;
    const bound = CFG.arenaSize - 2;
    bot.pos.x = Math.max(-bound, Math.min(bound, bot.pos.x));
    bot.pos.z = Math.max(-bound, Math.min(bound, bot.pos.z));
    bot.pos.y = 0;

    // Walk animation
    const moving = Math.hypot(bot.vel.x, bot.vel.z) > 0.5;
    if (moving && bot.mesh.userData.parts) {
      bot.walkPhase += dt * 10;
      const swing = Math.sin(bot.walkPhase) * 0.35;
      bot.mesh.userData.parts.legL.rotation.x = swing;
      bot.mesh.userData.parts.legR.rotation.x = -swing;
      bot.mesh.userData.parts.armL.rotation.x = -swing * 0.6;
      bot.mesh.userData.parts.armR.rotation.x = swing * 0.6;
    }

    if (bot.carrying) {
      bot.carrying.position.copy(bot.pos);
      bot.carrying.position.y = 2.2;
    }
  });
}

function botUseFire(bot, targetPos) {
  bot.cds.fire = ABILITIES.fire.cooldown;
  const aim = targetPos.clone().add(new THREE.Vector3(0, 1.2, 0));
  aim.x += (Math.random() - 0.5) * 2;
  aim.z += (Math.random() - 0.5) * 2;
  const origin = bot.pos.clone().add(new THREE.Vector3(0, 1.3, 0));
  const dir = aim.sub(origin).normalize();
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff6622 })
  );
  mesh.position.copy(origin);
  mesh.add(new THREE.PointLight(0xff4400, 2, 8, 2));
  scene.add(mesh);
  abilityProjectiles.push({
    type: 'fire', mesh, vel: dir.multiplyScalar(32), life: 1.4,
    owner: bot, team: bot.team, damage: 32
  });
}

function botUseShield(bot) {
  bot.cds.shield = ABILITIES.shield.cooldown;
  bot.shieldActive = true;
  bot.shieldTimer = ABILITIES.shield.duration;
  if (bot.shieldMesh) scene.remove(bot.shieldMesh);
  const bubble = new THREE.Mesh(
    new THREE.SphereGeometry(1.2, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false })
  );
  bubble.position.set(bot.pos.x, 1.1, bot.pos.z);
  scene.add(bubble);
  bot.shieldMesh = bubble;
}

function botUsePearl(bot, targetPos, dist) {
  bot.cds.pearl = ABILITIES.pearl.cooldown;
  // Teleport toward or away from target
  const away = bot.hp < 40;
  let dir;
  if (away) {
    dir = bot.pos.clone().sub(targetPos); dir.y = 0; dir.normalize();
  } else {
    dir = targetPos.clone().sub(bot.pos); dir.y = 0; dir.normalize();
  }
  const dest = bot.pos.clone().add(dir.multiplyScalar(8 + Math.random() * 6));
  dest.y = 0;
  const bound = CFG.arenaSize - 3;
  dest.x = Math.max(-bound, Math.min(bound, dest.x));
  dest.z = Math.max(-bound, Math.min(bound, dest.z));
  // Trail effect then teleport
  spawnHit(bot.pos.clone().add(new THREE.Vector3(0, 1, 0)), 0x88ffcc);
  bot.pos.copy(dest);
  spawnHit(bot.pos.clone().add(new THREE.Vector3(0, 1, 0)), 0x88ffcc);
}

function segmentHitsSphere(p0, p1, center, radius) {
  // Closest point on segment p0→p1 to center
  const d = p1.clone().sub(p0);
  const len = d.length();
  if (len < 1e-6) return p0.distanceTo(center) < radius;
  d.multiplyScalar(1 / len);
  const t = Math.max(0, Math.min(len, center.clone().sub(p0).dot(d)));
  const closest = p0.clone().add(d.multiplyScalar(t));
  return closest.distanceTo(center) < radius;
}

function updateBullets(dt) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    const prev = b.prev ? b.prev.clone() : b.mesh.position.clone();
    // Sub-step to avoid tunneling at high speed
    const steps = Math.max(1, Math.ceil(b.vel.length() * dt / 0.4));
    let hit = false;
    for (let s = 0; s < steps && !hit; s++) {
      const from = b.mesh.position.clone();
      b.mesh.position.add(b.vel.clone().multiplyScalar(dt / steps));
      const to = b.mesh.position;

      // Hit player
      if (b.owner !== 'player' && b.team !== player.team && !player.dead) {
        const center = player.pos.clone();
        center.y -= 0.2;
        if (segmentHitsSphere(from, to, center, 1.0)) {
          applyDamage(player, b.damage, b.owner, true);
          spawnHit(to, 0xff4488);
          hit = true;
        }
      }
      // Hit bots
      if (!hit) {
        for (const bot of bots) {
          if (bot.dead || bot.team === b.team) continue;
          if (b.owner !== 'player' && b.owner === bot) continue;
          const center = bot.pos.clone().add(new THREE.Vector3(0, 1.15, 0));
          if (segmentHitsSphere(from, to, center, 1.15)) {
            applyDamage(bot, b.damage, b.owner === 'player' ? player : b.owner, false);
            spawnHit(to.clone(), bot.color || 0xff00aa);
            hit = true;
            break;
          }
        }
      }
      // Walls (cached boxes)
      if (!hit) {
        for (const box of wallBoxes) {
          if (box.containsPoint(to)) {
            spawnHit(to, 0x88aaff);
            hit = true;
            break;
          }
        }
      }
    }
    b.prev = b.mesh.position.clone();
    b.life -= dt;
    if (hit || b.life <= 0 || Math.abs(b.mesh.position.x) > 100 || Math.abs(b.mesh.position.z) > 100) {
      scene.remove(b.mesh);
      bullets.splice(i, 1);
    }
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    if (p.type === 'deco') {
      p.mesh.rotation.x += p.mesh.userData.spin;
      p.mesh.rotation.y += p.mesh.userData.spin * 1.3;
      p.mesh.position.y = 3 + Math.sin(performance.now() * 0.001 + p.mesh.userData.bob) * 1.2;
      continue;
    }
    p.mesh.position.add(p.vel.clone().multiplyScalar(dt));
    p.vel.y -= 18 * dt;
    p.life -= dt;
    if (p.mesh.material) p.mesh.material.opacity = Math.max(0, p.life * 2);
    if (p.life <= 0) {
      scene.remove(p.mesh);
      particles.splice(i, 1);
    }
  }
}

function updatePortals(dt) {
  portals.forEach(p => {
    p.userData.ring.rotation.z += dt * 0.8;
    p.userData.core.scale.setScalar(1 + Math.sin(performance.now() * 0.003) * 0.08);
    // Billboard label toward camera
    if (p.userData.labelMesh) {
      p.userData.labelMesh.lookAt(camera.position);
    }
  });
  let near = false;
  for (const p of portals) {
    if (player.pos.distanceTo(p.position) < 4.5) {
      near = true;
      $('interact').textContent = `[${keyDisplay(binds.interact)}] ENTER ${p.userData.label}`;
      $('interact').classList.add('show');
      break;
    }
  }
  if (!near) $('interact').classList.remove('show');
}

function updateCTF(dt) {
  if (mode !== 'ctf') return;
  ['blue', 'red'].forEach(team => {
    const flag = flags[team];
    if (!flag || flag.userData.carriedBy) return;
    if (!player.dead && player.team !== team && player.pos.distanceTo(flag.position) < 2.2) {
      flag.userData.carriedBy = player;
      player.carrying = flag;
      showToast(`PICKED UP ${team.toUpperCase()} FLAG`);
    }
    bots.forEach(bot => {
      if (bot.dead || bot.team === team || bot.carrying) return;
      if (bot.pos.distanceTo(flag.position) < 2.2) {
        flag.userData.carriedBy = bot;
        bot.carrying = flag;
      }
    });
  });
  if (player.carrying && !player.dead) {
    const enemyFlag = player.carrying;
    const home = player.team === 'blue' ? flags.blue : flags.red;
    if (home && player.pos.distanceTo(home.userData.home) < 3) {
      if (player.team === 'blue') scores.blue += 3;
      else scores.red += 3;
      updateScores();
      showToast('FLAG CAPTURED!');
      enemyFlag.userData.carriedBy = null;
      player.carrying = null;
      enemyFlag.position.copy(enemyFlag.userData.home);
    }
  }
}

function updateKOTH(dt) {
  if (mode !== 'koth' || !hill) return;
  let blueOn = 0, redOn = 0;
  if (!player.dead && player.pos.distanceTo(hill.pos) < hill.radius) {
    if (player.team === 'blue') blueOn++; else redOn++;
  }
  bots.forEach(b => {
    if (b.dead) return;
    if (b.pos.distanceTo(hill.pos) < hill.radius) {
      if (b.team === 'blue') blueOn++; else redOn++;
    }
  });
  if (blueOn > redOn) hillProgress.blue += dt;
  else if (redOn > blueOn) hillProgress.red += dt;
  if (hillProgress.blue >= 5) { scores.blue++; hillProgress.blue = 0; updateScores(); }
  if (hillProgress.red >= 5) { scores.red++; hillProgress.red = 0; updateScores(); }
}

function endMatch() {
  matchRunning = false;
  document.exitPointerLock();
  let result = 'DRAW';
  if (scores.blue > scores.red) result = mode === 'ffa' ? 'YOU WIN' : 'BLUE WINS';
  else if (scores.red > scores.blue) result = mode === 'ffa' ? 'YOU LOSE' : 'RED WINS';
  $('result').textContent = result;
  $('end').classList.remove('hidden');
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);

  if (mode === 'lobby') {
    updatePlayer(dt);
    updatePortals(dt);
    updateParticles(dt);
    updateAbilityProjectiles(dt);
    updateAbilities(dt);
  } else if (matchRunning) {
    updatePlayer(dt);
    updateBots(dt);
    updateBullets(dt);
    updateAbilityProjectiles(dt);
    updateAbilities(dt);
    updateParticles(dt);
    updateCTF(dt);
    updateKOTH(dt);
    updateDamageNumbers(dt);
    updateBanners(dt);
    matchTimer -= dt;
    updateClock();
    if (matchTimer <= 0) endMatch();
  } else {
    updateParticles(dt);
  }

  // Weapon deploy animation (holster down then raise)
  if (weaponSwapT > 0) {
    weaponSwapT = Math.max(0, weaponSwapT - dt);
    const t = 1 - weaponSwapT / 0.42;
    // 0→0.4 holster down, 0.4→1 draw up
    let dip = 0;
    let fovKick = 0;
    if (t < 0.4) {
      dip = Math.sin((t / 0.4) * Math.PI) * 0.22;
      fovKick = 6;
    } else {
      const u = (t - 0.4) / 0.6;
      dip = Math.sin((1 - u) * Math.PI) * 0.1;
      fovKick = 10 * (1 - u);
    }
    camera.fov = 75 + fovKick;
    camera.position.y -= dip;
    camera.updateProjectionMatrix();
  } else if (Math.abs(camera.fov - 75) > 0.01) {
    camera.fov = 75;
    camera.updateProjectionMatrix();
  }

  renderer.render(scene, camera);
}

function onResize() {
  if (!camera || !renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
}

// Boot: wait briefly for THREE CDN, never stay stuck on loading
(function boot() {
  let tries = 0;
  function attempt() {
    if (typeof THREE !== 'undefined') {
      init();
      return;
    }
    tries++;
    if (tries < 40) {
      setTimeout(attempt, 100);
      return;
    }
    // Still no THREE — show error, never infinite load
    const el = document.getElementById('loading');
    if (el) {
      el.innerHTML = 'THREE.JS FAILED TO LOAD<br><span style="font-size:0.65rem">Need internet for CDN, or host three.min.js locally</span>';
    }
  }
  // Safety: always clear loading after 5s even if something hangs
  setTimeout(hideLoading, 5000);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attempt);
  } else {
    attempt();
  }
})();
