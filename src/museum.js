import * as THREE from "three";

const canvas = document.querySelector("#museum");
const intro = document.querySelector("#intro");
const enterButton = document.querySelector("#enterButton");
const hud = document.querySelector("#hud");
const plaque = document.querySelector("#plaque");
const finalReflection = document.querySelector("#finalReflection");
const wingLabel = document.querySelector("#wingLabel");
const wingTitle = document.querySelector("#wingTitle");
const wingTheme = document.querySelector("#wingTheme");
const plaqueWorks = document.querySelector("#plaqueWorks");
const plaqueTitle = document.querySelector("#plaqueTitle");
const plaqueBody = document.querySelector("#plaqueBody");
const progressFill = document.querySelector("#progressFill");
const exhibitModal = document.querySelector("#exhibitModal");
const closeModal = document.querySelector("#closeModal");
const modalKicker = document.querySelector("#modalKicker");
const modalTitle = document.querySelector("#modalTitle");
const modalBody = document.querySelector("#modalBody");
const enterRoomButton = document.querySelector("#enterRoomButton");
const roomActions = document.querySelector("#roomActions");
const exitRoomButton = document.querySelector("#exitRoomButton");

const wings = [
  {
    key: "Entrance Hall",
    title: "The Archive Opens",
    works: "Museum Directory",
    theme: "Stories are how we learn to survive ourselves.",
    body: "A neutral lobby frames English not as separate books, but as a four-year path through identity, power, isolation, morality, and becoming human.",
    z: 8,
    color: 0xf2c57c,
    fog: 0x11100d,
  },
  {
    key: "Grade 9 Wing",
    title: "Belonging and Dreams",
    works: "Kim's Convenience / A Raisin in the Sun",
    theme: "Identity, family, belonging, and dreams.",
    body: "The first exhibits feel grounded: dinner tables, shelves, framed rooms, and the pressure of wanting more while still needing a place to belong.",
    z: -22,
    color: 0xffb46b,
    fog: 0x1d1610,
  },
  {
    key: "Grade 10 Wing",
    title: "Fear, Survival, Collapse",
    works: "Macbeth / Moon of the Crusted Snow",
    theme: "Fear, survival, ambition, and social breakdown.",
    body: "The museum darkens. Thrones, snow, candles, and forest corridors show how quickly order can become fragile when fear starts making decisions.",
    z: -56,
    color: 0x8fd8ff,
    fog: 0x0b1419,
  },
  {
    key: "Grade 11 Wing",
    title: "Systems Under Pressure",
    works: "Anthem / Things Fall Apart / Watchmen",
    theme: "Society, control, ideology, and collapse of systems.",
    body: "This wing fractures into propaganda, panels, screens, and broken architecture. The focus expands from personal identity to the systems that define, distort, or destroy people.",
    z: -92,
    color: 0x9db4ff,
    fog: 0x11131f,
  },
  {
    key: "Grade 12 Wing",
    title: "Memory, Mortality, Responsibility",
    works: "Brother / Frankenstein / Hamlet",
    theme: "Mortality, isolation, memory, responsibility, and existential uncertainty.",
    body: "The final wing turns inward: mirrors, rain, laboratory glass, subway echoes, and floating monologues. The question is no longer only what the texts mean, but what they reveal about responsibility and selfhood.",
    z: -130,
    color: 0xb9f1df,
    fog: 0x0a1012,
  },
  {
    key: "Final Room",
    title: "The Player Becomes the Exhibit",
    works: "Graduation Reflection",
    theme: "The museum ends by looking back at the person walking through it.",
    body: "The final exhibit is not another book. It is the reader, changed by four years of stories about who we are, what we owe, and who we are becoming.",
    z: -166,
    color: 0xffffff,
    fog: 0x050506,
  },
];

const bookRooms = [
  {
    slug: "kims-convenience",
    grade: "Grade 9",
    title: "Kim's Convenience",
    side: -1,
    z: -18,
    color: 0xffb46b,
    theme: "Identity is negotiated between family loyalty, cultural inheritance, and individual ambition.",
    objects: [
      {
        title: "Store Counter",
        shape: "counter",
        position: [0, 0.65, -1.2],
        analysis:
          "The counter represents both work and identity. It is where Appa protects the family business, but also where generational conflict appears because the store can feel like love, duty, and limitation at the same time.",
      },
      {
        title: "Family Photograph",
        shape: "frame",
        position: [-2.8, 2.4, -3.4],
        analysis:
          "The photograph turns family into an exhibit: something cherished, fixed, and incomplete. It suggests how memory simplifies people even when real relationships stay messy.",
      },
      {
        title: "Neon Open Sign",
        shape: "sign",
        position: [2.7, 2.2, -3.2],
        analysis:
          "The open sign symbolizes visibility. The family is open to customers and community, but emotionally the characters often struggle to stay open with one another.",
      },
    ],
  },
  {
    slug: "a-raisin-in-the-sun",
    grade: "Grade 9",
    title: "A Raisin in the Sun",
    side: 1,
    z: -29,
    color: 0xffc483,
    theme: "Dreams become a way to measure dignity, pressure, and hope inside a constrained world.",
    objects: [
      {
        title: "Window Plant",
        shape: "plant",
        position: [-2.8, 1.05, -3.2],
        analysis:
          "Mama's plant symbolizes care under difficult conditions. Its survival mirrors the family's dream of growth even when the environment gives them very little room.",
      },
      {
        title: "Insurance Check",
        shape: "paper",
        position: [0, 1.45, -1.4],
        analysis:
          "The check is not just money. It concentrates grief, opportunity, and conflict, forcing each character to reveal what they believe a better life should look like.",
      },
      {
        title: "Apartment Table",
        shape: "table",
        position: [2.4, 0.75, -1.8],
        analysis:
          "The table anchors the family in a cramped shared space. It shows how love, frustration, and ambition collide when everyone has different dreams but the same room.",
      },
    ],
  },
  {
    slug: "macbeth",
    grade: "Grade 10",
    title: "Macbeth",
    side: -1,
    z: -50,
    color: 0x8fd8ff,
    theme: "Ambition becomes destructive when fear replaces moral judgment.",
    objects: [
      {
        title: "Broken Crown",
        shape: "crown",
        position: [0, 1.4, -1.5],
        analysis:
          "The crown represents power gained without legitimacy. Its broken form shows that Macbeth's kingship is unstable because it is built on violence rather than order.",
      },
      {
        title: "Floating Dagger",
        shape: "dagger",
        position: [-2.4, 2.3, -2.8],
        analysis:
          "The dagger externalizes Macbeth's temptation. It blurs thought and action, showing how imagination can become dangerous when desire is stronger than conscience.",
      },
      {
        title: "Blood Basin",
        shape: "basin",
        position: [2.5, 0.9, -2.1],
        analysis:
          "Blood symbolizes guilt that cannot be washed away. The basin is a failed cleansing ritual, turning private guilt into something visible and permanent.",
      },
    ],
  },
  {
    slug: "moon-of-the-crusted-snow",
    grade: "Grade 10",
    title: "Moon of the Crusted Snow",
    side: 1,
    z: -63,
    color: 0xbdefff,
    theme: "Survival depends on community, memory, and returning to knowledge that colonial systems tried to erase.",
    objects: [
      {
        title: "Silent Radio",
        shape: "radio",
        position: [-2.4, 1.2, -1.8],
        analysis:
          "The radio's silence marks the collapse of outside systems. It forces the community to stop depending on distant authority and turn inward for survival.",
      },
      {
        title: "Snowed Window",
        shape: "window",
        position: [0, 2.2, -3.4],
        analysis:
          "The snow isolates the community physically, but it also creates a protective boundary. The outside world becomes both threat and absence.",
      },
      {
        title: "Food Cache",
        shape: "crate",
        position: [2.6, 0.75, -2.1],
        analysis:
          "Stored food symbolizes practical survival and cultural continuity. It shows that preparation, land knowledge, and shared responsibility are forms of resistance.",
      },
    ],
  },
  {
    slug: "anthem",
    grade: "Grade 11",
    title: "Anthem",
    side: -1,
    z: -82,
    color: 0xa8b8ff,
    theme: "Individual identity emerges as resistance against enforced sameness.",
    objects: [
      {
        title: "Forbidden Light",
        shape: "bulb",
        position: [0, 2.3, -2.4],
        analysis:
          "The light bulb symbolizes independent discovery. Its brightness is dangerous to the society because knowledge gives the individual a self beyond the collective.",
      },
      {
        title: "We Plaque",
        shape: "poster",
        position: [-2.9, 2.2, -3.4],
        analysis:
          "The word 'we' becomes oppressive when it erases the self. The plaque shows language as a tool of control, limiting what people can even imagine.",
      },
      {
        title: "Tunnel Desk",
        shape: "desk",
        position: [2.4, 0.85, -1.8],
        analysis:
          "The hidden workspace represents private thought. It is where curiosity survives beneath a public world designed to prevent individuality.",
      },
    ],
  },
  {
    slug: "things-fall-apart",
    grade: "Grade 11",
    title: "Things Fall Apart",
    side: 1,
    z: -94,
    color: 0xd8c16b,
    theme: "Personal identity and cultural order fracture under pride, change, and colonial disruption.",
    objects: [
      {
        title: "Cracked Yam Barn",
        shape: "crate",
        position: [-2.3, 0.9, -2],
        analysis:
          "Yams symbolize status, masculinity, and achievement. The cracked barn shows how Okonkwo's ideals are tied to a social order that is becoming unstable.",
      },
      {
        title: "Village Mask",
        shape: "mask",
        position: [0, 2.25, -3.3],
        analysis:
          "The mask represents spiritual and communal authority. Displaying it in a museum also asks what happens when living culture is frozen, interpreted, or displaced.",
      },
      {
        title: "Broken Drum",
        shape: "drum",
        position: [2.5, 0.95, -1.8],
        analysis:
          "The drum suggests communication and ceremony. Broken, it captures the novel's central image of a culture whose rhythms are interrupted by internal conflict and colonial pressure.",
      },
    ],
  },
  {
    slug: "watchmen",
    grade: "Grade 11",
    title: "Watchmen",
    side: -1,
    z: -106,
    color: 0xffd34e,
    theme: "Power becomes morally unstable when people decide they are allowed to save the world by controlling it.",
    objects: [
      {
        title: "Smiley Badge",
        shape: "badge",
        position: [0, 1.65, -2.2],
        analysis:
          "The smiley badge turns innocence into irony. Its stain suggests that beneath heroic symbols are violence, compromise, and moral contamination.",
      },
      {
        title: "Comic Panels",
        shape: "panels",
        position: [-2.8, 2.3, -3.4],
        analysis:
          "The panels represent fragmented perspective. Watchmen asks readers to assemble truth from competing frames instead of trusting a single heroic narrative.",
      },
      {
        title: "Clock at Midnight",
        shape: "clock",
        position: [2.8, 2.1, -3.1],
        analysis:
          "The clock symbolizes apocalypse and pressure. Its near-midnight position makes every choice feel urgent, which is exactly when morality becomes easiest to rationalize.",
      },
    ],
  },
  {
    slug: "brother",
    grade: "Grade 12",
    title: "Brother",
    side: 1,
    z: -122,
    color: 0x8ed0c0,
    theme: "Memory, grief, race, and place shape identity long after violence has passed.",
    objects: [
      {
        title: "Record Player",
        shape: "record",
        position: [-2.5, 1.05, -1.8],
        analysis:
          "Music becomes memory made physical. The record player suggests how sound can preserve love, youth, and loss when ordinary language is not enough.",
      },
      {
        title: "Apartment Window",
        shape: "window",
        position: [0, 2.25, -3.4],
        analysis:
          "The window frames the neighborhood as both home and pressure. It shows how environment shapes identity while also limiting what feels possible.",
      },
      {
        title: "Empty Jacket",
        shape: "jacket",
        position: [2.5, 1.55, -2.2],
        analysis:
          "The empty jacket makes absence visible. It represents the way grief turns everyday objects into reminders of someone who should still be there.",
      },
    ],
  },
  {
    slug: "frankenstein",
    grade: "Grade 12",
    title: "Frankenstein",
    side: -1,
    z: -135,
    color: 0xb9f1df,
    theme: "Creation without responsibility becomes a form of abandonment.",
    objects: [
      {
        title: "Laboratory Table",
        shape: "lab",
        position: [0, 0.95, -1.7],
        analysis:
          "The laboratory table symbolizes ambition turned clinical. Victor treats creation as achievement, then refuses the emotional responsibility that follows.",
      },
      {
        title: "Glass Heart",
        shape: "heart",
        position: [-2.5, 2.15, -2.9],
        analysis:
          "The heart points to the Creature's humanity. It asks whether monstrosity comes from being made unnatural or from being denied love and recognition.",
      },
      {
        title: "Ice Wall",
        shape: "ice",
        position: [2.8, 2.1, -3.4],
        analysis:
          "The ice recalls isolation and pursuit. It makes the novel's emotional coldness physical: Victor and the Creature are trapped by consequences neither can escape.",
      },
    ],
  },
  {
    slug: "hamlet",
    grade: "Grade 12",
    title: "Hamlet",
    side: 1,
    z: -148,
    color: 0xc7c3ff,
    theme: "Existential uncertainty turns action, memory, and morality into problems that cannot be solved cleanly.",
    objects: [
      {
        title: "Skull",
        shape: "skull",
        position: [0, 1.35, -2.1],
        analysis:
          "The skull makes mortality unavoidable. It strips identity down to its endpoint, forcing Hamlet to confront what remains after status, wit, and memory disappear.",
      },
      {
        title: "Ghost Curtain",
        shape: "curtain",
        position: [-2.9, 2.25, -3.4],
        analysis:
          "The ghostly curtain represents uncertainty between truth and illusion. Hamlet's tragedy begins because knowledge arrives in a form he cannot fully trust.",
      },
      {
        title: "Poisoned Cup",
        shape: "cup",
        position: [2.4, 1.1, -1.9],
        analysis:
          "The cup condenses corruption into an ordinary object. It shows how revenge contaminates the entire court until even celebration becomes fatal.",
      },
    ],
  },
];

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07090b);
scene.fog = new THREE.FogExp2(0x11100d, 0.018);

const camera = new THREE.PerspectiveCamera(68, window.innerWidth / window.innerHeight, 0.1, 600);
camera.position.set(0, 2.1, 13);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const museum = new THREE.Group();
scene.add(museum);
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const clickableObjects = [];

const ambient = new THREE.HemisphereLight(0xf7f1e4, 0x171614, 0.65);
scene.add(ambient);

const playerLight = new THREE.PointLight(0xf7f1e4, 1.8, 28, 1.8);
playerLight.position.set(0, 4, 8);
scene.add(playerLight);

const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x171411, roughness: 0.82, metalness: 0.03 });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x24211c, roughness: 0.88 });
const ceilingMaterial = new THREE.MeshStandardMaterial({ color: 0x101112, roughness: 0.95 });
const brassMaterial = new THREE.MeshStandardMaterial({ color: 0xb98d4f, roughness: 0.38, metalness: 0.46 });
const darkGlassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x0b1013,
  metalness: 0.4,
  roughness: 0.16,
  transmission: 0.08,
  clearcoat: 1,
});

function addBox({ position, scale, material, group = museum, castShadow = true, receiveShadow = true }) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  group.add(mesh);
  return mesh;
}

function addPlane({ position, rotation, scale, material, group = museum }) {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function makeInteractive(mesh, data) {
  mesh.userData.interaction = data;
  clickableObjects.push(mesh);
  return mesh;
}

function makeRoomTextTexture(room) {
  return makeTextTexture([room.grade, room.title, room.theme], {
    accent: `#${room.color.toString(16).padStart(6, "0")}`,
    bg: "rgba(8, 9, 10, 0.9)",
  });
}

function makeTextTexture(lines, options = {}) {
  const canvasEl = document.createElement("canvas");
  canvasEl.width = 1024;
  canvasEl.height = 512;
  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = options.bg ?? "rgba(10, 10, 10, 0.82)";
  ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
  ctx.strokeStyle = options.stroke ?? "rgba(247, 241, 228, 0.36)";
  ctx.lineWidth = 10;
  ctx.strokeRect(18, 18, canvasEl.width - 36, canvasEl.height - 36);
  ctx.fillStyle = options.accent ?? "#f2c57c";
  ctx.font = "bold 34px Segoe UI, Arial, sans-serif";
  ctx.fillText(lines[0].toUpperCase(), 58, 78);
  ctx.fillStyle = "#f7f1e4";
  ctx.font = "bold 62px Segoe UI, Arial, sans-serif";
  wrapText(ctx, lines[1], 58, 164, 910, 70);
  ctx.fillStyle = "#d9d0c2";
  ctx.font = "34px Segoe UI, Arial, sans-serif";
  wrapText(ctx, lines[2], 58, 314, 910, 44);
  const texture = new THREE.CanvasTexture(canvasEl);
  texture.anisotropy = 8;
  return texture;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function addPlaque3D(wing, x, z, angle = 0) {
  const texture = makeTextTexture([wing.key, wing.title, wing.works], {
    accent: `#${wing.color.toString(16).padStart(6, "0")}`,
  });
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: false });
  const mesh = addPlane({
    position: [x, 2.55, z],
    rotation: [0, angle, 0],
    scale: [5.8, 2.9, 1],
    material,
  });
  mesh.userData.wing = wing;
}

function buildBookRooms() {
  for (const room of bookRooms) {
    const x = room.side * 23;
    const wallX = room.side * 8.2;
    const hallwayAngle = room.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    const roomAngle = room.side < 0 ? -Math.PI / 2 : Math.PI / 2;
    const accent = new THREE.MeshStandardMaterial({
      color: room.color,
      roughness: 0.48,
      transparent: true,
      opacity: 0.5,
      emissive: room.color,
      emissiveIntensity: 0.08,
    });
    const floor = new THREE.MeshStandardMaterial({ color: 0x151716, roughness: 0.84 });
    const wall = new THREE.MeshStandardMaterial({ color: 0x202322, roughness: 0.88 });

    addBox({ position: [x, -0.1, room.z - 1.6], scale: [12, 0.22, 11], material: floor, castShadow: false });
    addBox({ position: [x, 6.05, room.z - 1.6], scale: [12, 0.28, 11], material: ceilingMaterial, castShadow: false });
    addBox({ position: [x - room.side * 6, 3, room.z - 1.6], scale: [0.35, 6, 11], material: wall, castShadow: false });
    addBox({ position: [x, 3, room.z - 7.1], scale: [12, 6, 0.35], material: wall, castShadow: false });
    addBox({ position: [x, 3, room.z + 3.9], scale: [12, 6, 0.35], material: wall, castShadow: false });
    addBox({ position: [wallX, 2.9, room.z - 1.6], scale: [0.26, 5.8, 8.6], material: accent, castShadow: false });

    const doorway = addBox({
      position: [wallX, 2.1, room.z],
      scale: [0.38, 3.8, 2.6],
      material: new THREE.MeshStandardMaterial({ color: room.color, roughness: 0.35, emissive: room.color, emissiveIntensity: 0.15 }),
    });
    makeInteractive(doorway, {
      kind: "door",
      room,
      title: `${room.title} Room`,
      kicker: room.grade,
      body: `${room.theme} Click Enter Room to step into this exhibit space.`,
    });

    const signMaterial = new THREE.MeshBasicMaterial({ map: makeRoomTextTexture(room) });
    makeInteractive(
      addPlane({
        position: [wallX - room.side * 0.08, 2.9, room.z - 3.2],
        rotation: [0, hallwayAngle, 0],
        scale: [3.4, 1.7, 1],
        material: signMaterial,
      }),
      {
        kind: "door",
        room,
        title: `${room.title} Room`,
        kicker: room.grade,
        body: `${room.theme} Click Enter Room to step into this exhibit space.`,
      },
    );

    const titleMaterial = new THREE.MeshBasicMaterial({ map: makeRoomTextTexture(room) });
    addPlane({
      position: [x - room.side * 5.82, 3.05, room.z - 1.6],
      rotation: [0, roomAngle, 0],
      scale: [4.8, 2.4, 1],
      material: titleMaterial,
    });

    const light = new THREE.PointLight(room.color, 2.2, 17, 1.5);
    light.position.set(x, 4.2, room.z - 1.7);
    museum.add(light);

    for (const object of room.objects) {
      addRoomObject(room, object);
    }
  }
}

function worldInRoom(room, position) {
  return [room.side * 23 + position[0], position[1], room.z + position[2]];
}

function addRoomObject(room, object) {
  const material = new THREE.MeshStandardMaterial({
    color: room.color,
    roughness: 0.4,
    metalness: 0.12,
    emissive: room.color,
    emissiveIntensity: 0.06,
  });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.5 });
  const paper = new THREE.MeshStandardMaterial({ color: 0xe8dcc5, roughness: 0.68 });
  const [x, y, z] = worldInRoom(room, object.position);
  let mesh;

  if (object.shape === "counter" || object.shape === "table" || object.shape === "desk" || object.shape === "lab") {
    mesh = addBox({ position: [x, y, z], scale: [2.2, 0.35, 1.2], material });
    addBox({ position: [x - 0.85, y - 0.55, z - 0.42], scale: [0.18, 1, 0.18], material: dark });
    addBox({ position: [x + 0.85, y - 0.55, z + 0.42], scale: [0.18, 1, 0.18], material: dark });
  } else if (object.shape === "frame" || object.shape === "poster" || object.shape === "window" || object.shape === "ice") {
    mesh = addBox({ position: [x, y, z], scale: [1.8, 1.25, 0.1], material: object.shape === "window" || object.shape === "ice" ? darkGlassMaterial : paper });
  } else if (object.shape === "sign" || object.shape === "panels") {
    mesh = addBox({ position: [x, y, z], scale: [1.8, 0.75, 0.12], material });
  } else if (object.shape === "plant") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.65, 18), dark);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    museum.add(mesh);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x477b4d, roughness: 0.65 });
    for (let i = 0; i < 5; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 8), leafMaterial);
      leaf.position.set(x + Math.cos(i) * 0.34, y + 0.48 + Math.sin(i * 1.7) * 0.14, z + Math.sin(i) * 0.24);
      leaf.scale.set(1, 0.36, 0.7);
      museum.add(leaf);
    }
  } else if (object.shape === "crown") {
    mesh = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.08, 12, 36), material);
    mesh.position.set(x, y, z);
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = true;
    museum.add(mesh);
    for (let i = 0; i < 5; i++) {
      addBox({ position: [x - 0.55 + i * 0.28, y + 0.38, z], scale: [0.1, 0.75 - (i % 2) * 0.22, 0.1], material });
    }
  } else if (object.shape === "dagger") {
    mesh = addBox({ position: [x, y, z], scale: [0.12, 0.12, 1.5], material });
    mesh.rotation.y = 0.75;
    addBox({ position: [x, y - 0.03, z + 0.75], scale: [0.75, 0.14, 0.18], material: dark });
  } else if (object.shape === "basin" || object.shape === "drum" || object.shape === "cup" || object.shape === "radio") {
    mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.45, 0.55, 24), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    museum.add(mesh);
  } else if (object.shape === "crate") {
    mesh = addBox({ position: [x, y, z], scale: [1.5, 1, 1.1], material });
  } else if (object.shape === "bulb" || object.shape === "badge" || object.shape === "clock" || object.shape === "record" || object.shape === "heart" || object.shape === "skull") {
    mesh = new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 18), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    museum.add(mesh);
    if (object.shape === "record" || object.shape === "clock" || object.shape === "badge") mesh.scale.set(1, 1, 0.12);
    if (object.shape === "heart") mesh.scale.set(0.95, 1.12, 0.72);
  } else if (object.shape === "mask" || object.shape === "jacket" || object.shape === "curtain") {
    mesh = addBox({ position: [x, y, z], scale: [1.15, 1.75, 0.16], material });
  } else {
    mesh = addBox({ position: [x, y, z], scale: [1, 1, 1], material });
  }

  makeInteractive(mesh, {
    kind: "object",
    room,
    title: object.title,
    kicker: room.title,
    body: object.analysis,
  });

  const halo = new THREE.PointLight(room.color, 0.6, 4, 2);
  halo.position.set(x, y + 0.6, z);
  museum.add(halo);
  return mesh;
}

function buildArchitecture() {
  addBox({ position: [0, -0.12, -78], scale: [17, 0.24, 196], material: floorMaterial, castShadow: false });
  addBox({ position: [-8.5, 3, -78], scale: [0.45, 6, 196], material: wallMaterial, castShadow: false });
  addBox({ position: [8.5, 3, -78], scale: [0.45, 6, 196], material: wallMaterial, castShadow: false });
  addBox({ position: [0, 6.1, -78], scale: [17, 0.3, 196], material: ceilingMaterial, castShadow: false });

  for (let z = 11; z > -178; z -= 13) {
    addBox({ position: [-4.7, 0.05, z], scale: [0.12, 0.08, 6], material: brassMaterial, castShadow: false });
    addBox({ position: [4.7, 0.05, z], scale: [0.12, 0.08, 6], material: brassMaterial, castShadow: false });
  }

  for (const wing of wings) {
    const light = new THREE.PointLight(wing.color, 2.35, 30, 1.4);
    light.position.set(0, 4.8, wing.z);
    light.castShadow = true;
    museum.add(light);

    addBox({
      position: [-6.6, 2.1, wing.z],
      scale: [0.35, 3.5, 10],
      material: new THREE.MeshStandardMaterial({ color: wing.color, roughness: 0.5, transparent: true, opacity: 0.25 }),
    });
    addBox({
      position: [6.6, 2.1, wing.z],
      scale: [0.35, 3.5, 10],
      material: new THREE.MeshStandardMaterial({ color: wing.color, roughness: 0.5, transparent: true, opacity: 0.25 }),
    });
  }
}

function buildGrade9() {
  const z = -22;
  const wood = new THREE.MeshStandardMaterial({ color: 0x7a4f33, roughness: 0.7 });
  const photo = new THREE.MeshStandardMaterial({ color: 0xd8bea0, roughness: 0.55 });
  addBox({ position: [-3.2, 0.75, z - 2], scale: [3.8, 0.28, 1.8], material: wood });
  for (let x = -4.4; x <= -2; x += 1.2) addBox({ position: [x, 0.35, z - 2.55], scale: [0.18, 0.7, 0.18], material: wood });
  for (let y = 1.4; y < 3.8; y += 0.75) addBox({ position: [5.8, y, z + 0.5], scale: [1.8, 0.13, 4], material: wood });
  for (let i = 0; i < 12; i++) {
    addBox({ position: [5.7, 1.1 + (i % 4) * 0.72, z - 1.2 + Math.floor(i / 4) * 1.15], scale: [0.5, 0.45, 0.32], material: photo });
  }
  addPlaque3D(wings[1], -7.95, z - 5.7, Math.PI / 2);
}

function buildGrade10() {
  const z = -56;
  const stone = new THREE.MeshStandardMaterial({ color: 0x34333a, roughness: 0.92 });
  const snow = new THREE.MeshStandardMaterial({ color: 0xcfe6ee, roughness: 0.52 });
  addBox({ position: [0, 0.9, z - 1.5], scale: [2.4, 1.8, 1.5], material: stone });
  addBox({ position: [0, 2.4, z - 1.5], scale: [1.4, 1.2, 1], material: stone });
  addBox({ position: [0, 3.2, z - 1.5], scale: [2.1, 0.18, 1.4], material: brassMaterial });
  for (let i = 0; i < 22; i++) {
    addBox({
      position: [-7.2 + Math.random() * 14.4, 0.03, z - 8 + Math.random() * 15],
      scale: [0.25 + Math.random() * 0.55, 0.03, 0.25 + Math.random() * 0.55],
      material: snow,
      castShadow: false,
    });
  }
  for (let x of [-5.3, 5.3]) {
    const flame = new THREE.PointLight(0xff8b3d, 1.7, 12);
    flame.position.set(x, 2.5, z + 3.4);
    museum.add(flame);
    addBox({ position: [x, 1.3, z + 3.4], scale: [0.2, 1.8, 0.2], material: brassMaterial });
  }
  addPlaque3D(wings[2], 7.95, z - 6, -Math.PI / 2);
}

function buildGrade11() {
  const z = -92;
  const red = new THREE.MeshStandardMaterial({ color: 0x9d2e2e, roughness: 0.7 });
  const blue = new THREE.MeshBasicMaterial({ color: 0x1f6a9d });
  const paper = new THREE.MeshBasicMaterial({ color: 0xded3bd });
  for (let i = 0; i < 9; i++) {
    const x = i % 2 ? -7.95 : 7.95;
    addPlane({
      position: [x, 1.7 + (i % 3) * 1.1, z - 7 + i * 1.5],
      rotation: [0, i % 2 ? Math.PI / 2 : -Math.PI / 2, 0],
      scale: [1.8, 1.05, 1],
      material: i % 3 === 0 ? red : paper,
    });
  }
  for (let i = 0; i < 6; i++) {
    addBox({ position: [-3.8 + i * 1.5, 2.5 + Math.sin(i) * 0.8, z - 1.5 - i], scale: [1.15, 0.75, 0.08], material: blue });
  }
  for (let i = 0; i < 8; i++) {
    addBox({ position: [-4.5 + Math.random() * 9, 0.55 + Math.random() * 2.5, z + 5 - Math.random() * 10], scale: [0.45, 1.1 + Math.random() * 1.6, 0.45], material: wallMaterial });
  }
  addPlaque3D(wings[3], -7.95, z - 6, Math.PI / 2);
}

function buildGrade12() {
  const z = -130;
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x9fd8c6, roughness: 0.12, metalness: 0.05, transmission: 0.32, transparent: true, opacity: 0.42 });
  for (let i = 0; i < 7; i++) {
    addPlane({
      position: [-5.5 + i * 1.8, 2.55, z - 4 - Math.abs(3 - i) * 0.55],
      rotation: [0, (i - 3) * 0.16, 0],
      scale: [1.15, 3.4, 1],
      material: darkGlassMaterial,
    });
  }
  for (let i = 0; i < 18; i++) {
    const strand = addBox({
      position: [-7.1 + Math.random() * 14.2, 3.2 + Math.random() * 2.1, z - 8 + Math.random() * 14],
      scale: [0.025, 1.2 + Math.random() * 2.6, 0.025],
      material: glass,
      castShadow: false,
    });
    strand.rotation.z = Math.random() * 0.25;
  }
  addBox({ position: [4.7, 1.2, z + 2], scale: [2.3, 1.7, 1.1], material: glass });
  addBox({ position: [4.7, 2.35, z + 2], scale: [1.2, 1.2, 0.8], material: darkGlassMaterial });
  addPlaque3D(wings[4], 7.95, z - 6, -Math.PI / 2);
}

function buildFinalRoom() {
  const z = -166;
  addPlane({
    position: [0, 2.75, z - 7.5],
    rotation: [0, 0, 0],
    scale: [8.5, 4.8, 1],
    material: darkGlassMaterial,
  });
  const silhouette = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.35, 8, 18), new THREE.MeshStandardMaterial({ color: 0x030303, roughness: 0.4 }));
  silhouette.position.set(0, 1.35, z - 7.15);
  silhouette.scale.set(1, 1.25, 0.22);
  museum.add(silhouette);
  addPlaque3D(wings[5], 0, z - 8.05, 0);
}

buildArchitecture();
buildGrade9();
buildGrade10();
buildGrade11();
buildGrade12();
buildBookRooms();
buildFinalRoom();
addPlaque3D(wings[0], 0, 3.5, 0);

const keys = new Set();
let started = false;
let targetZ = camera.position.z;
let yaw = 0;
let dragging = false;
let lastX = 0;
let pointerDown = { x: 0, y: 0 };
let currentWing = wings[0];
let activeRoom = null;
let pendingRoom = null;
let targetX = camera.position.x;
let lastTime = performance.now();

enterButton.addEventListener("click", () => {
  started = true;
  intro.hidden = true;
  hud.hidden = false;
  plaque.hidden = false;
  updateUi(wings[0]);
});
closeModal.addEventListener("click", hideModal);
enterRoomButton.addEventListener("click", () => {
  if (pendingRoom) enterRoom(pendingRoom);
  hideModal();
});
exitRoomButton.addEventListener("click", exitRoom);

window.addEventListener("keydown", (event) => keys.add(event.key.toLowerCase()));
window.addEventListener("keydown", (event) => {
  const number = Number(event.key);
  if (!started || !Number.isInteger(number) || number < 1 || number > wings.length) return;
  jumpToWing(number - 1);
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideModal();
    if (activeRoom) exitRoom();
  }
});
window.addEventListener("keyup", (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener("pointerdown", (event) => {
  if (!started || event.target.closest(".exhibit-modal, .room-actions, button")) return;
  dragging = true;
  lastX = event.clientX;
  pointerDown = { x: event.clientX, y: event.clientY };
});
window.addEventListener("pointerup", (event) => {
  if (!dragging) return;
  dragging = false;
  const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  if (moved < 8) handleSceneClick(event);
});
window.addEventListener("pointermove", (event) => {
  if (!dragging || !started) return;
  yaw -= (event.clientX - lastX) * 0.004;
  lastX = event.clientX;
});
window.addEventListener(
  "wheel",
  (event) => {
    if (!started) return;
    targetZ += event.deltaY * -0.035;
  },
  { passive: true },
);

function getNearestWing(z) {
  return wings.reduce((nearest, wing) => (Math.abs(z - wing.z) < Math.abs(z - nearest.z) ? wing : nearest), wings[0]);
}

function updateUi(wing) {
  if (activeRoom) {
    wingLabel.textContent = `${activeRoom.grade} Room`;
    wingTitle.textContent = activeRoom.title;
    wingTheme.textContent = activeRoom.theme;
    plaqueWorks.textContent = "Clickable Exhibits";
    plaqueTitle.textContent = "Look for lit objects";
    plaqueBody.textContent = "Click an object in this room to open its symbolism, role, and thematic connection. Press Escape or Return to Wing when finished.";
    finalReflection.hidden = true;
    return;
  }
  wingLabel.textContent = wing.key;
  wingTitle.textContent = wing.title;
  wingTheme.textContent = wing.theme;
  plaqueWorks.textContent = wing.works;
  plaqueTitle.textContent = wing.title;
  plaqueBody.textContent = wing.body;
  finalReflection.hidden = wing.key !== "Final Room";
}

function showModal({ title, kicker, body, room, kind }) {
  pendingRoom = kind === "door" ? room : null;
  modalKicker.textContent = kicker;
  modalTitle.textContent = title;
  modalBody.textContent = body;
  enterRoomButton.hidden = kind !== "door";
  exhibitModal.hidden = false;
}

function hideModal() {
  exhibitModal.hidden = true;
  pendingRoom = null;
}

function handleSceneClick(event) {
  if (!started) return;
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickableObjects, false);
  if (!hits.length) return;
  showModal(hits[0].object.userData.interaction);
}

function enterRoom(room) {
  activeRoom = room;
  targetX = room.side * 23;
  targetZ = room.z + 1.1;
  camera.position.x = targetX;
  camera.position.z = targetZ;
  yaw = 0;
  roomActions.hidden = false;
  updateUi(currentWing);
}

function exitRoom() {
  if (!activeRoom) return;
  targetX = 0;
  targetZ = activeRoom.z;
  camera.position.x = 0;
  camera.position.z = targetZ;
  activeRoom = null;
  roomActions.hidden = true;
  yaw = 0;
  updateUi(getNearestWing(camera.position.z));
}

function jumpToWing(index) {
  const wing = wings[index];
  if (!wing) return;
  activeRoom = null;
  roomActions.hidden = true;
  hideModal();
  targetX = 0;
  started = true;
  intro.hidden = true;
  hud.hidden = false;
  plaque.hidden = false;
  targetZ = wing.z;
  camera.position.x = 0;
  camera.position.z = wing.z;
  currentWing = wing;
  yaw = 0;
  updateUi(wing);
}

function jumpFromHash() {
  const slug = location.hash.replace("#", "").toLowerCase();
  if (!slug) return;
  const index = wings.findIndex((wing) => wing.key.toLowerCase().replaceAll(" ", "-") === slug);
  if (index >= 0) jumpToWing(index);
  const room = bookRooms.find((bookRoom) => bookRoom.slug === slug);
  if (room) {
    started = true;
    intro.hidden = true;
    hud.hidden = false;
    plaque.hidden = false;
    enterRoom(room);
  }
}

function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  if (started) {
    const speed = keys.has("shift") ? 18 : 10;
    if (keys.has("w") || keys.has("arrowup")) targetZ -= speed * dt;
    if (keys.has("s") || keys.has("arrowdown")) targetZ += speed * dt;
    if (keys.has("a") || keys.has("arrowleft")) yaw += 1.5 * dt;
    if (keys.has("d") || keys.has("arrowright")) yaw -= 1.5 * dt;
    if (activeRoom) {
      targetZ = THREE.MathUtils.clamp(targetZ, activeRoom.z - 5.4, activeRoom.z + 3.1);
    } else {
      targetZ = THREE.MathUtils.clamp(targetZ, wings[wings.length - 1].z - 2, 13);
    }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5.5, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5.5, dt);
  }

  const progress = THREE.MathUtils.clamp((13 - camera.position.z) / (13 - (wings[wings.length - 1].z - 2)), 0, 1);
  progressFill.style.width = `${progress * 100}%`;

  const nearest = getNearestWing(camera.position.z);
  if (!activeRoom && nearest !== currentWing) {
    currentWing = nearest;
    updateUi(nearest);
  }

  const fogTarget = new THREE.Color(currentWing.fog);
  scene.fog.color.lerp(fogTarget, 0.035);
  scene.background.lerp(fogTarget, 0.02);

  camera.position.y = 2.08 + Math.sin(now * 0.0011) * 0.035;
  camera.rotation.set(0, yaw, 0);
  playerLight.position.set(camera.position.x, 3.7, camera.position.z + 1.8);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

updateUi(wings[0]);
jumpFromHash();
requestAnimationFrame(tick);

window.__museum = {
  jumpTo: jumpToWing,
};
window.addEventListener("hashchange", jumpFromHash);
