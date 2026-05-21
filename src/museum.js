import * as THREE from "three";

// ─── DOM ────────────────────────────────────────────────────────────────────
const canvas        = document.querySelector("#museum");
const intro         = document.querySelector("#intro");
const enterButton   = document.querySelector("#enterButton");
const hud           = document.querySelector("#hud");
const plaque        = document.querySelector("#plaque");
const wingLabel     = document.querySelector("#wingLabel");
const wingTitle     = document.querySelector("#wingTitle");
const wingTheme     = document.querySelector("#wingTheme");
const plaqueWorks   = document.querySelector("#plaqueWorks");
const plaqueTitle   = document.querySelector("#plaqueTitle");
const plaqueBody    = document.querySelector("#plaqueBody");
const progressFill  = document.querySelector("#progressFill");
const exhibitModal  = document.querySelector("#exhibitModal");
const closeModal    = document.querySelector("#closeModal");
const modalKicker   = document.querySelector("#modalKicker");
const modalTitle    = document.querySelector("#modalTitle");
const modalBody     = document.querySelector("#modalBody");
const enterRoomBtn  = document.querySelector("#enterRoomButton");
const roomActions   = document.querySelector("#roomActions");
const exitRoomBtn   = document.querySelector("#exitRoomButton");
const exhibitCanvas = document.querySelector("#exhibitCanvas");

// ─── WING DATA ───────────────────────────────────────────────────────────────
const wings = [
  {
    key: "Entrance Hall", title: "The Archive Opens",
    works: "Museum Directory",
    theme: "Stories are how we learn to survive ourselves.",
    body: "English is not a collection of separate books, but as a four-year path through identity, power, isolation, morality, and becoming human.",
    z: 8,   color: 0xf2c57c, fog: 0x11100d,
  },
  {
    key: "Grade 9 Wing", title: "Belonging and Dreams",
    works: "Kim's Convenience / A Raisin in the Sun",
    theme: "Identity, family, belonging, and dreams.",
    body: "The first exhibits feel grounded: dinner tables, shelves, framed rooms, and the pressure of wanting more while still needing a place to belong.",
    z: -22,  color: 0xffb46b, fog: 0x1d1610,
  },
  {
    key: "Grade 10 Wing", title: "Fear, Survival, Collapse",
    works: "Macbeth / Moon of the Crusted Snow",
    theme: "Fear, survival, ambition, and social breakdown.",
    body: "The museum darkens. Thrones, snow, candles, and forest corridors show how quickly order can become fragile when fear starts making decisions.",
    z: -56,  color: 0x8fd8ff, fog: 0x0b1419,
  },
  {
    key: "Grade 11 Wing", title: "Systems Under Pressure",
    works: "Anthem / Things Fall Apart / Watchmen",
    theme: "Society, control, ideology, and collapse of systems.",
    body: "This wing fractures into propaganda, panels, screens, and broken architecture. The focus expands from personal identity to the systems that define, distort, or destroy people.",
    z: -92,  color: 0x9db4ff, fog: 0x11131f,
  },
  {
    key: "Grade 12 Wing", title: "Memory, Mortality, Responsibility",
    works: "Brother / Frankenstein / Hamlet",
    theme: "Mortality, isolation, memory, responsibility, and existential uncertainty.",
    body: "The final wing turns inward: mirrors, rain, laboratory glass, subway echoes, and floating monologues. The question is no longer only what the texts mean, but what they reveal about responsibility and selfhood.",
    z: -130, color: 0xb9f1df, fog: 0x0a1012,
  },
  {
    key: "Final Room", title: "The Player Becomes the Exhibit",
    works: "Graduation Reflection",
    theme: "The museum ends by looking back at the person walking through it.",
    body: "The final exhibit is not another book. It is the reader, changed by four years of stories about who we are, what we owe, and who we are becoming.",
    z: -166, color: 0xffffff, fog: 0x050506,
  },
];

// ─── BOOK ROOMS ──────────────────────────────────────────────────────────────
const bookRooms = [
  {
    slug: "kims-convenience", grade: "Grade 9",
    title: "Kim's Convenience", side: -1, z: -18, color: 0xffb46b,
    theme: "Identity is negotiated between family loyalty, cultural inheritance, and individual ambition.",
    objects: [
      {
        title: "Store Counter", shape: "counter",
        position: [0, 0.65, -1.2],
        analysis: "The counter is both architecture and argument. Appa built his entire identity behind it over decades of daily labour — to sell the store would require selling a version of himself he cannot afford to lose. But the counter also creates a physical grammar of authority that makes real conversation difficult: you are either behind it, running things, or in front of it, being served. This spatial dynamic repeats in the family's emotional relationships, where the same person can feel both deeply loved and held at a distance. The play ultimately asks whether a legacy built on sacrifice can be received as a gift, or whether it always arrives feeling like debt.",
      },
      {
        title: "Family Photograph", shape: "frame",
        position: [-2.8, 2.4, -3.4],
        analysis: "The photograph turns a complicated living family into a manageable image. Fixed in a frame, they look the way families are supposed to look — together, whole, smiling — and this version is easier to love than the daily reality of misunderstanding and missed connection. Photographs in immigrant households often carry extra weight: they are evidence of a life that had to be rebuilt from scratch, and proof that the sacrifice produced something. But the frame also becomes a burden because it insists on a version of the family that no one can fully inhabit. The image of togetherness sits in the window of a store that has often been the source of the family's deepest divisions.",
      },
      {
        title: "Neon Open Sign", shape: "sign",
        position: [2.7, 2.2, -3.2],
        analysis: "The sign performs a hospitality that the family's interior dynamics frequently contradict. It declares the store available — lit, open, ready — while the family inside often struggles to be any of those things with each other. The neon light has a quality of persistence: it does not turn off because feelings are complicated, does not dim when conversations go badly. That unconditional availability is one of the store's values and one of the play's quiet critiques: the Kims are reliably open for business in ways they cannot always be for one another. The brightness of commercial welcome exists alongside the difficulty of emotional honesty.",
      },
    ],
  },
  {
    slug: "a-raisin-in-the-sun", grade: "Grade 9",
    title: "A Raisin in the Sun", side: 1, z: -29, color: 0xffc483,
    theme: "Dreams become a way to measure dignity, pressure, and hope inside a constrained world.",
    objects: [
      {
        title: "Window Plant", shape: "plant",
        position: [-2.8, 1.05, -3.2],
        analysis: "Mama's plant is the play's most patient symbol. It lives in conditions that were never designed for it — thin light, insufficient space, air that belongs to other people's apartments — and it persists anyway, not because circumstances improved, but because it is consistently tended. This mirrors the Younger family's understanding of dignity: not something granted by favourable conditions, but something maintained by daily effort even when the environment offers nothing. The plant connects Mama to a kind of continuity that exists outside the apartment walls, a belief in growth as something worth caring for independent of whether it is witnessed or rewarded. When she takes it to the new house, the gesture is the most complete statement in the play: what I have kept alive does not get left behind.",
      },
      {
        title: "Insurance Check", shape: "paper",
        position: [0, 1.45, -1.4],
        analysis: "The insurance check does not arrive as opportunity — it arrives as grief made liquid. Walter Sr.'s death has been converted into a dollar amount, and the play's central question becomes what that number means for people who have been structurally denied the chance to accumulate wealth. Walter Lee wants it to become business and self-determination; Beneatha wants education and professional identity; Mama wants a home that cannot be taken away. The check does not create these desires — it forces them into contact with each other and with the reality that they cannot all be satisfied simultaneously. Its eventual misuse becomes the play's darkest moral test: how much does a dream cost when someone else paid for it with their life?",
      },
      {
        title: "Apartment Table", shape: "table",
        position: [2.4, 0.75, -1.8],
        analysis: "The table is where the Younger family is most fully itself — where arguments erupt because there is nowhere to avoid them, where meals are eaten in proximity that makes distance impossible, where every version of this family's dream gets stated and contested. It is also where survival is most literal, where the work of feeding people and keeping them together happens daily regardless of how any individual is feeling. Hansberry understood that cramped shared space creates a particular kind of emotional intensity: you cannot perform composure at a table this small. Every conversation here is involuntarily intimate. The table does not just host the play's drama — it produces it, by leaving no room for retreat.",
      },
    ],
  },
  {
    slug: "macbeth", grade: "Grade 10",
    title: "Macbeth", side: -1, z: -50, color: 0x8fd8ff,
    theme: "Ambition becomes destructive when fear replaces moral judgment.",
    objects: [
      {
        title: "Broken Crown", shape: "crown",
        position: [0, 1.4, -1.5],
        analysis: "The crown represents power obtained without legitimate foundation, which means it can never be securely worn. Macbeth kills his way to the throne and discovers that possession does not produce the stability he imagined — without the consent of those being governed, the crown is just a heavy object that makes you a target. Its broken form makes that instability physical: this is what authority looks like when it is built on murder rather than on order, trust, or right. Shakespeare understood that tyranny is structurally anxious — it cannot stop consuming because it cannot trust. The broken crown shows that some forms of ambition achieve their object and destroy themselves simultaneously, with the same gesture.",
      },
      {
        title: "Floating Dagger", shape: "dagger",
        position: [-2.4, 2.3, -2.8],
        analysis: "The dagger that appears to Macbeth is one of drama's earliest and most exact images of how imagination becomes morality's enemy. It is not real, but it is persuasive — it shows Macbeth a path toward what he wants and gives his desire a physical shape it did not have before. The vision externalises the moment when temptation stops being abstract and starts being a plan. Shakespeare locates the horror not in the supernatural but in the psychology: the dagger does not appear because the witches sent it, but because Macbeth is already the kind of person who would see it. The floating knife is a self-portrait of a mind that has decided but not yet admitted it.",
      },
      {
        title: "Blood Basin", shape: "basin",
        position: [2.5, 0.9, -2.1],
        analysis: "Lady Macbeth's compulsive handwashing and Macbeth's horror at his own hands both point toward blood as the play's central moral image — guilt that will not remain internal. Blood exteriorises, makes visible, spreads. The basin represents the attempt to contain or wash away what cannot be contained: complicity, responsibility, the knowledge of what has been done. The classical cleansing gesture becomes pathological because it cannot achieve its object. The blood is not on the hands; it is in the conscience, and no physical act can reach it. By the play's end, almost everyone is implicated in its violence — the contamination has spread beyond any basin's capacity to hold.",
      },
    ],
  },
  {
    slug: "moon-of-the-crusted-snow", grade: "Grade 10",
    title: "Moon of the Crusted Snow", side: 1, z: -63, color: 0xbdefff,
    theme: "Survival depends on community, memory, and returning to knowledge that colonial systems tried to erase.",
    objects: [
      {
        title: "Silent Radio", shape: "radio",
        position: [-2.4, 1.2, -1.8],
        analysis: "The radio's silence is the novel's first signal that the outside world has stopped being a resource. For a community that had been integrated into modern communication and supply networks, the dead radio is not just an inconvenience but a revelation: those systems were never stable, and the community was not in control of them. Waubgeshig Rice uses this moment to set up the novel's central argument — colonial modernity made the community dependent on systems it did not build and cannot repair. The silence forces a turn inward, toward knowledge and practices that exist independently of those systems. The radio's dead signal is what Indigenous survivance looks like at the beginning: the moment before the community remembers what it already knows.",
      },
      {
        title: "Snowed Window", shape: "window",
        position: [0, 2.2, -3.4],
        analysis: "The snow that closes in around the community creates a double isolation: it is genuinely dangerous, cutting off supply routes and limiting movement, but it also creates a boundary between the community's space and the outside world's chaos. The window makes this ambiguity visible — you can see the snow accumulating, understand the threat, and simultaneously understand that the accumulation is keeping certain things out. The novel resists making the snow simply hostile: it is also the land behaving as it always has, independent of human convenience and consistent in ways that colonial systems never were. Looking through a snowed window is looking at the world the community's ancestors survived, unchanged and still available to those who remember how to read it.",
      },
      {
        title: "Food Cache", shape: "crate",
        position: [2.6, 0.75, -2.1],
        analysis: "The food cache represents a form of knowledge that survived colonisation: understanding how to prepare for scarcity, how to read the land's rhythms, how to store against uncertain seasons. This is not nostalgia in Rice's novel — it is practical resistance. The characters who know how to use the cache and the hunting grounds hold a form of power that no outside infrastructure can replicate or remove. Stored food is also an act of community: you do not cache for yourself alone, you cache because scarcity is collective. The cache asks who in the community still holds this knowledge, and whether it was devalued or forgotten under decades of assimilation pressure. That answer, in the novel, determines survival.",
      },
    ],
  },
  {
    slug: "anthem", grade: "Grade 11",
    title: "Anthem", side: -1, z: -82, color: 0xa8b8ff,
    theme: "Individual identity emerges as resistance against enforced sameness.",
    objects: [
      {
        title: "Forbidden Light", shape: "bulb",
        position: [0, 2.3, -2.4],
        analysis: "The light bulb that Equality 7-2521 rediscovers is dangerous not because of what it does physically but because of what it represents epistemologically: the possibility of individual discovery, of knowledge that belongs to a self. In a society where the first-person singular has been abolished and all thought is performed collectively, the ability to make something alone — to have a private idea and follow it to a conclusion — is the most subversive act imaginable. The light is the ego made visible. What it actually illuminates in the novel is not the room but the distance between the collective's imposed ignorance and what one mind, left alone, can achieve. Rand uses the bulb to argue that the suppression of individual genius is itself a form of violence against humanity's capacity to grow.",
      },
      {
        title: "We Plaque", shape: "poster",
        position: [-2.9, 2.2, -3.4],
        analysis: "The mandatory use of 'we' in Anthem is not just a political rule but a cognitive one: it shapes what is possible to think by eliminating the grammatical first person. Language is not neutral in this world — it is the architecture of consciousness, and the collective has built a language in which selfhood is structurally impossible to express. The plaque makes this visible as an object: 'we' displayed as a word of affirmation becomes a word of erasure, cancelling the self each time it is used. This connects to Orwell's concept of Newspeak — if you cannot say 'I', the idea of 'I' becomes increasingly difficult to hold. The plaque is the word the collective uses to make a person into a function.",
      },
      {
        title: "Tunnel Desk", shape: "desk",
        position: [2.4, 0.85, -1.8],
        analysis: "Equality 7-2521's hidden workspace represents the survival of curiosity in a system designed to prevent it. The tunnel is not just a place to conduct experiments — it is proof that private thought cannot be fully suppressed even by a society that has organised itself around that suppression. The desk is where the individual exists before it has a word for itself, before 'I' has been recovered. Rand is making a point about the unkillability of the creative impulse: even under total collective pressure, the mind that wants to know something will find a way to pursue the question. The hidden desk is optimistic in this sense — it insists that intellectual freedom is not a social construction but something more fundamental, something that asserts itself in tunnels when it cannot assert itself above ground.",
      },
    ],
  },
  {
    slug: "things-fall-apart", grade: "Grade 11",
    title: "Things Fall Apart", side: 1, z: -94, color: 0xd8c16b,
    theme: "Personal identity and cultural order fracture under pride, change, and colonial disruption.",
    objects: [
      {
        title: "Cracked Yam Barn", shape: "crate",
        position: [-2.3, 0.9, -2],
        analysis: "Yam farming in Umuofia is not simply agriculture — it is the performance of masculinity and social standing that defines worth within the community's value system. Okonkwo's identity is inseparable from his barn: a full barn means a successful man, a respected man, a man who is definitively not his father. The crack in the barn signals what the novel shows throughout: the value system Okonkwo has structured his entire selfhood around is more fragile than his labour made it seem. Achebe is not criticising Igbo culture through Okonkwo's rigidity — he is showing how any culture's most demanding ideals can become prisons for those who cannot adapt when circumstances change. The cracked barn is Okonkwo's first warning that the world he built himself to inhabit is not as stable as he believed.",
      },
      {
        title: "Village Mask", shape: "mask",
        position: [0, 2.25, -3.3],
        analysis: "The mask in Umuofia ceremonies is not a disguise — it is a transformation. The egwugwu who wear the masks are not playing characters; they become the ancestors, temporarily inhabited by ancestral authority. This distinction matters enormously: the masks are not theatrical props but ontological events, not symbols of power but power itself in a specific cultural form. Displaying the mask in a museum performs a category error that the novel itself understands — removing a cultural object from its living context does not preserve it, it arrests it. Achebe wrote Things Fall Apart in part to challenge the colonial representation of Igbo culture as primitive and static, and the mask sits at the centre of that challenge: it is evidence of a rich ceremonial and legal tradition that colonial authority refused to recognise as such.",
      },
      {
        title: "Broken Drum", shape: "drum",
        position: [2.5, 0.95, -1.8],
        analysis: "The drum in Umuofia controls time — it announces ceremonies, calls meetings, signals danger, marks the rhythm of communal life. A broken drum is not just damaged equipment but a disrupted calendar: a community whose shared sense of time and occasion is being interrupted. Achebe uses the collapse of communal ceremony throughout the novel to show how colonisation destroys not just political structures but the temporal and spiritual rhythms that make a culture feel coherent from the inside. Okonkwo's tragedy is partly that he cannot hear the new rhythm being imposed and cannot accept that the old one is being broken. When you can no longer call the community together in the old way, the community you were calling together no longer fully exists.",
      },
    ],
  },
  {
    slug: "watchmen", grade: "Grade 11",
    title: "Watchmen", side: -1, z: -106, color: 0xffd34e,
    theme: "Power becomes morally unstable when people decide they are allowed to save the world by controlling it.",
    objects: [
      {
        title: "Smiley Badge", shape: "badge",
        position: [0, 1.65, -2.2],
        analysis: "The badge is the novel's central icon precisely because it refuses to stabilise into a single meaning. Its cheerful yellow face belongs to a murdered man — a mercenary who served corrupt power willingly and with pleasure. The blood that drips across it transforms a symbol of cultural innocence into evidence of complicity, asking what happens to the optimistic symbols of an era when they are pressed against the reality of what was done in that era's name. Moore and Gibbons understood that heroic iconography functions as a kind of moral laundering: the smiley face tells you everything is fine so you do not look too closely at what produced it. The stain is not accidental. It is the truth the smile was always covering.",
      },
      {
        title: "Comic Panels", shape: "panels",
        position: [-2.8, 2.3, -3.4],
        analysis: "Watchmen's most radical argument is formal: the comic-book panel itself is a frame that constrains and directs understanding. By fragmenting its narrative into competing perspectives, parallel timelines, embedded texts, and unreliable narrators, Moore insists that no single panel, no single character's account, contains the whole truth. The exhibit of panels asks viewers to do what the novel trains readers to do: understand that information only exists within a frame, and that the frame is always chosen by someone with interests. This is the epistemological heart of Watchmen — heroism, history, and morality are not objective facts but constructions. The panels are not just a formal technique; they are the argument itself, embedded in the medium.",
      },
      {
        title: "Clock at Midnight", shape: "clock",
        position: [2.8, 2.1, -3.1],
        analysis: "The Doomsday Clock operates throughout Watchmen as both literal countdown and moral pressure. Its near-midnight position insists that the characters are making decisions under conditions of extremity — that the stakes of their choices are not personal but civilisational. Moore uses this pressure to test each character's moral framework to destruction: Rorschach maintains his absolute ethics even when they become self-destructive; Veidt decides the scale of the threat justifies any means; Dr. Manhattan stops caring about the difference. The clock does not simply threaten nuclear war — it is the device by which the novel examines what people are willing to do when they believe the alternative is annihilation. The problem is that everyone at midnight believes they are the one who understands the situation clearly enough to act.",
      },
    ],
  },
  {
    slug: "brother", grade: "Grade 12",
    title: "Brother", side: 1, z: -122, color: 0x8ed0c0,
    theme: "Memory, grief, race, and place shape identity long after violence has passed.",
    objects: [
      {
        title: "Record Player", shape: "record",
        position: [-2.5, 1.05, -1.8],
        analysis: "Music in David Chariandy's novel is not background — it is the medium through which Francis and Michael build their sense of self and their bond with each other. The record player and the music that comes from it connect the brothers to a diasporic cultural tradition that exists in tension with the neighbourhood's specific pressures and their Trinidadian inheritance. Music provides a language for feelings and identities that the dominant culture around them does not have words for. After Francis's death, music becomes the primary form in which Michael can continue to exist near his brother — the songs hold the emotional texture of their shared life in a way that memory alone cannot sustain. The record player is not a metaphor for grief; it is grief's actual mechanism, its physical infrastructure.",
      },
      {
        title: "Apartment Window", shape: "window",
        position: [0, 2.25, -3.4],
        analysis: "The window in Brother frames the neighbourhood as something to be watched and understood — Scarborough as a specific ecosystem with its own pressures, its own hierarchy, its own beauty that mainstream Canadian culture has consistently refused to see. For Michael, the neighbourhood is simultaneously the world that shaped him and the world that claimed Francis. The window creates the ambiguity the novel lives in: home and trap, community and constraint, the place that made you and the place that cannot offer you safety. Looking through this window means understanding that belonging is not a simple positive — it is a relationship with a place that is itself subject to forces it cannot control. The view from this window is always the view from somewhere that has been overlooked.",
      },
      {
        title: "Empty Jacket", shape: "jacket",
        position: [2.5, 1.55, -2.2],
        analysis: "The jacket makes Francis's absence physical. It is the most intimate object in the novel because clothing carries the shape and presence of a person — it is designed to be inhabited, and when the person is gone, the garment's vacancy becomes a kind of presence. Chariandy is working in a tradition of grief literature that understands objects as grief's repositories: they hold the dead because they were held by the dead, because they remember a body's dimensions and warmth. The empty jacket also asks what a young Black man's death leaves behind in a community that has already been conditioned to expect it, to absorb it, to continue. The jacket is not only Michael's grief — it is the neighbourhood's accumulated grief, the quiet weight of losses that never made the news.",
      },
    ],
  },
  {
    slug: "frankenstein", grade: "Grade 12",
    title: "Frankenstein", side: -1, z: -135, color: 0xb9f1df,
    theme: "Creation without responsibility becomes a form of abandonment.",
    objects: [
      {
        title: "Laboratory Table", shape: "lab",
        position: [0, 0.95, -1.7],
        analysis: "Victor Frankenstein's laboratory is where ambition becomes pathology. The table is where he does the work — methodical, sustained, brilliant work — but the work is always separated from its implications. Victor never thinks past the achievement to the responsibility: he wants to be the one who animated life, and the animated life's subsequent experience of existing is not part of his calculation. The table is therefore a symbol of creation without ethics, of science performed as self-actualisation rather than as obligation. Mary Shelley was writing at the beginning of industrial modernity, when the relationship between scientific capability and moral accountability was becoming urgent in exactly the ways it remains urgent now. The laboratory table is still being used, and the question it asks has not been answered.",
      },
      {
        title: "Glass Heart", shape: "heart",
        position: [-2.5, 2.15, -2.9],
        analysis: "The Creature's capacity for feeling is the novel's most persistent moral argument. He experiences loneliness, desire for connection, aesthetic pleasure in music and nature, grief at rejection — all the apparatus of a full emotional life — and the novel insists that these experiences are as real and valid as any human's. The glass heart makes this visible and fragile: the Creature's emotional interior is not protected by the social recognition that would make it legible to others. He is treated as a monster because he looks like one, and the irony Shelley pursues throughout is that Victor, who looks human, behaves far more monstrously. The question the glass heart poses is where humanity actually lives — in biology, in social recognition, or in the experience of feeling itself.",
      },
      {
        title: "Ice Wall", shape: "ice",
        position: [2.8, 2.1, -3.4],
        analysis: "The Arctic setting of Frankenstein's frame narrative turns isolation into geography. Both Victor and the Creature end up in the ice — pursuing and being pursued, locked into a relationship of mutual destruction that neither can exit. The cold that makes the ice also makes thought clearer and starker: in the Arctic there is no comfort, no society, no distraction from the essential problem. Shelley uses the ice to strip the novel down to its core question: what do you owe to what you create? The vast white emptiness says the answer cannot be deferred. Victor pursued his ambition past all natural limits and created something that exists outside any natural boundary, and the ice is what that looks like when you follow it all the way to its conclusion — both of them trapped there, not by the cold, but by the unresolved question of responsibility between them.",
      },
    ],
  },
  {
    slug: "hamlet", grade: "Grade 12",
    title: "Hamlet", side: 1, z: -148, color: 0xc7c3ff,
    theme: "Existential uncertainty turns action, memory, and morality into problems that cannot be solved cleanly.",
    objects: [
      {
        title: "Skull", shape: "skull",
        position: [0, 1.35, -2.1],
        analysis: "The skull in the graveyard scene strips Hamlet's existential problem of all decoration. Yorick's skull is specific — this was a person Hamlet knew, who had wit and warmth and particular qualities — and it has been reduced to a container, an object that can be held in a hand and examined. The scene forces confrontation with the endpoint: once you know how Yorick ends up, every account of his life is retrospective, coloured by the skull's knowledge. Hamlet's famous delay is partly the paralysis of someone who understands mortality too clearly — he knows that action ends in death as surely as inaction does, and that knowledge makes decisive movement feel less obviously necessary. The skull is what Hamlet already knew before he picked it up. Holding it is just admitting that he knows it.",
      },
      {
        title: "Ghost Curtain", shape: "curtain",
        position: [-2.9, 2.25, -3.4],
        analysis: "The ghost complicates everything it appears to clarify. It arrives with a story and a command — your father was murdered, revenge him — but it arrives in a form Hamlet cannot fully trust. Is it his father? Is it a devil using his father's shape? Is it a product of his own grief and psychological instability? The play refuses to settle this, and that refusal is the source of its tragic structure: Hamlet cannot act on certainty he does not have, and the ghost's nature prevents certainty from being achievable. The curtain represents the membrane between states — living and dead, truth and illusion, command and confusion — that Hamlet must try to see through without ever being able to tear it away. All of the play's moral and political disasters follow from this fundamental uncertainty about what kind of evidence the ghost constitutes.",
      },
      {
        title: "Poisoned Cup", shape: "cup",
        position: [2.4, 1.1, -1.9],
        analysis: "The cup that kills Gertrude is intended for Hamlet and prepared by Claudius — it is the direct product of political corruption attempting to protect itself. By the time it reaches her lips, so many interlocking plots and counter-plots are in motion that the death is both inevitable and accidental: no one specifically chose for Gertrude to die at this moment, but the conditions everyone chose created a world where her death could not be avoided. Poison in Hamlet works as a structural metaphor: it is invisible until it acts, it spreads through contact, it corrupts whatever it touches. The court at Elsinore has been a poisoned cup since before the play began, and the final scene is simply the moment when that contamination becomes visible to everyone at once. The cup does not kill one person — it reveals what the entire system has always been.",
      },
    ],
  },
];

// ─── MAIN SCENE SETUP ────────────────────────────────────────────────────────
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x07090b);
scene.fog = new THREE.FogExp2(0x11100d, 0.018);

const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.1, 600);
camera.position.set(0, 2.1, 13);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

const museum = new THREE.Group();
scene.add(museum);

const raycaster = new THREE.Raycaster();
const pointer   = new THREE.Vector2();
const clickable  = [];

// shared geometry — avoids creating a new BufferGeometry per box
const _unitBox = new THREE.BoxGeometry(1, 1, 1);

scene.add(new THREE.HemisphereLight(0xf7f1e4, 0x171614, 0.65));

const playerLight = new THREE.PointLight(0xf7f1e4, 1.8, 28, 1.8);
playerLight.position.set(0, 4, 8);
scene.add(playerLight);

// ─── SHARED MATERIALS ────────────────────────────────────────────────────────
const floorMat   = new THREE.MeshStandardMaterial({ color: 0x171411, roughness: 0.82, metalness: 0.03 });
const wallMat    = new THREE.MeshStandardMaterial({ color: 0x24211c, roughness: 0.88 });
const ceilMat    = new THREE.MeshStandardMaterial({ color: 0x101112, roughness: 0.95 });
const brassMat   = new THREE.MeshStandardMaterial({ color: 0xb98d4f, roughness: 0.38, metalness: 0.46 });
const darkGlass  = new THREE.MeshPhysicalMaterial({
  color: 0x0b1013, metalness: 0.4, roughness: 0.16, transmission: 0.08, clearcoat: 1,
});

// ─── MAIN SCENE HELPERS ──────────────────────────────────────────────────────
function addBox({ position, scale, material, group = museum, castShadow = true, receiveShadow = true }) {
  const m = new THREE.Mesh(_unitBox, material);
  m.position.set(...position);
  m.scale.set(...scale);
  m.castShadow = castShadow;
  m.receiveShadow = receiveShadow;
  group.add(m);
  return m;
}

function addPlane({ position, rotation, scale, material, group = museum }) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  m.position.set(...position);
  m.rotation.set(...rotation);
  m.scale.set(...scale);
  m.receiveShadow = true;
  group.add(m);
  return m;
}

function makeInteractive(mesh, data) {
  mesh.userData.interaction = data;
  clickable.push(mesh);
  return mesh;
}

function wrapText(ctx, text, x, y, maxW, lh) {
  const words = text.split(" ");
  let line = "";
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) { ctx.fillText(line, x, y); line = w + " "; y += lh; }
    else line = test;
  }
  ctx.fillText(line, x, y);
}

function makeTextTexture(lines, opts = {}) {
  const cv = document.createElement("canvas"); cv.width = 1024; cv.height = 512;
  const cx = cv.getContext("2d");
  cx.fillStyle = opts.bg ?? "rgba(10,10,10,0.82)"; cx.fillRect(0, 0, 1024, 512);
  cx.strokeStyle = "rgba(247,241,228,0.36)"; cx.lineWidth = 10;
  cx.strokeRect(18, 18, 988, 476);
  cx.fillStyle = opts.accent ?? "#f2c57c"; cx.font = "bold 34px Segoe UI,Arial,sans-serif";
  cx.fillText(lines[0].toUpperCase(), 58, 78);
  cx.fillStyle = "#f7f1e4"; cx.font = "bold 62px Segoe UI,Arial,sans-serif";
  wrapText(cx, lines[1], 58, 164, 910, 70);
  cx.fillStyle = "#d9d0c2"; cx.font = "34px Segoe UI,Arial,sans-serif";
  wrapText(cx, lines[2], 58, 314, 910, 44);
  const t = new THREE.CanvasTexture(cv); t.anisotropy = 8; return t;
}

function makeRoomTexture(room) {
  return makeTextTexture([room.grade, room.title, room.theme], {
    accent: `#${room.color.toString(16).padStart(6, "0")}`, bg: "rgba(8,9,10,0.9)",
  });
}

function addPlaque3D(wing, x, z, angle = 0) {
  const mat = new THREE.MeshBasicMaterial({
    map: makeTextTexture([wing.key, wing.title, wing.works], {
      accent: `#${wing.color.toString(16).padStart(6, "0")}`,
    }),
  });
  addPlane({ position: [x, 2.55, z], rotation: [0, angle, 0], scale: [5.8, 2.9, 1], material: mat });
}

// ─── MINI EXHIBIT RENDERER ───────────────────────────────────────────────────
const eScene  = new THREE.Scene();
eScene.background = new THREE.Color(0x05070a);

const eCamera = new THREE.PerspectiveCamera(40, 2, 0.1, 50);
eCamera.position.set(0, 0.9, 5);
eCamera.lookAt(0, 0, 0);

const eRenderer = new THREE.WebGLRenderer({ canvas: exhibitCanvas, antialias: false });
eRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
eRenderer.shadowMap.enabled = true;
eRenderer.shadowMap.type = THREE.BasicShadowMap;
eRenderer.setSize(480, 240);

eScene.add(new THREE.HemisphereLight(0xf5f0e8, 0x141210, 0.9));
const eKey = new THREE.SpotLight(0xfff4e0, 4, 25, Math.PI / 7, 0.5, 1.5);
eKey.position.set(2.5, 5, 4); eKey.castShadow = true;
eScene.add(eKey);
const eFill = new THREE.PointLight(0x88aaff, 0.7, 15);
eFill.position.set(-3, 1.5, -1);
eScene.add(eFill);
const eAccent = new THREE.PointLight(0xffffff, 1.2, 10);
eAccent.position.set(0, 3, 2);
eScene.add(eAccent);

const eGround = new THREE.Mesh(
  new THREE.CircleGeometry(3.5, 48),
  new THREE.MeshStandardMaterial({ color: 0x0c0e12, roughness: 0.95 })
);
eGround.rotation.x = -Math.PI / 2;
eGround.position.y = -0.95;
eGround.receiveShadow = true;
eScene.add(eGround);

let eGroup = null, eAnimId = null;

// helpers scoped to eScene
function eAdd(mesh) {
  mesh.castShadow = true; mesh.receiveShadow = true; eGroup.add(mesh); return mesh;
}
function eBox(pos, size, mat) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.position.set(...pos);
  return eAdd(mesh);
}
function eSph(pos, r, mat, seg = 28) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg), mat);
  mesh.position.set(...pos);
  return eAdd(mesh);
}
function eCyl(pos, rt, rb, h, mat, seg = 28) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  mesh.position.set(...pos);
  return eAdd(mesh);
}

function buildExhibitMesh(shape, colorHex) {
  // cleanup
  if (eGroup) {
    eScene.remove(eGroup);
    eGroup.traverse(c => {
      if (c.isMesh) { c.geometry.dispose(); if (c.material?.dispose) c.material.dispose(); }
    });
  }
  eGroup = new THREE.Group();

  eAccent.color.setHex(colorHex);

  const mat  = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.38, metalness: 0.14, emissive: colorHex, emissiveIntensity: 0.12 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.6 });
  const pale = new THREE.MeshStandardMaterial({ color: 0xe6d9c0, roughness: 0.7 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xadd8e6, roughness: 0.08, metalness: 0.05, transmission: 0.65, transparent: true, opacity: 0.55 });
  const green = new THREE.MeshStandardMaterial({ color: 0x3d7042, roughness: 0.65 });
  const soil  = new THREE.MeshStandardMaterial({ color: 0x3a2512, roughness: 0.9 });

  switch (shape) {
    case "counter":
    case "table":
    case "desk":
    case "lab": {
      eBox([0, 0, 0], [2.2, 0.14, 1.1], mat);
      for (const [lx, lz] of [[-0.95, -0.42], [0.95, -0.42], [-0.95, 0.42], [0.95, 0.42]])
        eBox([lx, -0.55, lz], [0.12, 0.9, 0.12], dark);
      if (shape === "lab") {
        eCyl([0.4, 0.27, 0], 0.11, 0.16, 0.32, mat);
        eBox([0.4, 0.48, 0], [0.055, 0.22, 0.055], pale);
      }
      if (shape === "counter") eBox([-0.4, 0.21, -0.24], [0.5, 0.26, 0.44], dark);
      break;
    }
    case "frame":
    case "poster": {
      eBox([0, 0, 0], [1.9, 1.3, 0.09], dark);
      eBox([0, 0, 0.055], [1.65, 1.05, 0.07], pale);
      eBox([0, 0.74, -0.01], [0.55, 0.045, 0.045], dark);
      break;
    }
    case "window":
    case "ice": {
      eBox([0, 0, 0], [1.9, 1.45, 0.11], dark);
      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(1.62, 1.18, 0.05), glass);
      glassPanel.position.set(0, 0, 0.06);
      eAdd(glassPanel);
      eBox([0, 0, 0.09], [1.62, 0.055, 0.07], mat);
      eBox([0, 0, 0.09], [0.055, 1.18, 0.07], mat);
      break;
    }
    case "sign":
    case "panels": {
      eBox([0, 0, 0], [2.1, 0.9, 0.13], mat);
      for (let i = 0; i < 3; i++) eBox([-0.45 + i * 0.46, 0.14 - i * 0.23, 0.09], [0.52, 0.055, 0.045], pale);
      break;
    }
    case "plant": {
      eCyl([0, -0.55, 0], 0.42, 0.32, 0.65, dark);
      eCyl([0, -0.25, 0], 0.4, 0.4, 0.065, soil);
      eCyl([0, -0.1, 0], 0.035, 0.05, 0.55, green);
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 10), green);
        leaf.position.set(Math.cos(a) * 0.38, 0.2 + Math.sin(i * 1.9) * 0.14, Math.sin(a) * 0.3);
        leaf.scale.set(1, 0.4, 0.78); leaf.castShadow = true; eGroup.add(leaf);
      }
      break;
    }
    case "crown": {
      const torus = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.1, 16, 56), mat);
      torus.rotation.x = Math.PI / 2; torus.castShadow = true; eGroup.add(torus);
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        eBox([Math.cos(a) * 0.72, 0.52 + (i % 2) * 0.28, Math.sin(a) * 0.72], [0.12, 0.7, 0.12], mat);
        const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.1, 0), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05, metalness: 0.9 }));
        gem.position.set(Math.cos(a) * 0.72, 0.93 + (i % 2) * 0.28, Math.sin(a) * 0.72); gem.castShadow = true; eGroup.add(gem);
      }
      break;
    }
    case "dagger": {
      eBox([0, 0.1, 0], [0.1, 0.1, 1.85], mat);
      eBox([0, 0.1, 0.72], [0.92, 0.13, 0.19], dark);
      eCyl([0, 0.1, 1.25], 0.08, 0.09, 0.68, dark);
      eSph([0, 0.1, 1.62], 0.14, mat);
      eGroup.rotation.x = 0.28; eGroup.rotation.y = 0.4;
      break;
    }
    case "basin": {
      const b = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.55, 0.58, 36), mat);
      b.castShadow = true; eGroup.add(b);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.065, 14, 48), mat);
      rim.rotation.x = Math.PI / 2; rim.position.y = 0.29; rim.castShadow = true; eGroup.add(rim);
      break;
    }
    case "drum": {
      eCyl([0, 0, 0], 0.72, 0.65, 0.88, mat);
      eBox([0, 0.47, 0], [1.52, 0.06, 1.52], dark);
      eBox([0, -0.47, 0], [1.52, 0.06, 1.52], dark);
      break;
    }
    case "cup": {
      eCyl([0, 0, 0], 0.46, 0.36, 0.78, mat);
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.055, 10, 28, Math.PI), mat);
      handle.position.set(0.55, 0, 0); handle.rotation.z = Math.PI / 2; handle.castShadow = true; eGroup.add(handle);
      break;
    }
    case "radio": {
      eBox([0, 0, 0], [1.7, 0.9, 0.95], mat);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++)
        eBox([-0.52 + c * 0.25, 0.13 - r * 0.21, 0.48], [0.13, 0.065, 0.045], dark);
      const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.055, 28), pale);
      dial.rotation.x = Math.PI / 2; dial.position.set(0.52, 0.06, 0.48); dial.castShadow = true; eGroup.add(dial);
      break;
    }
    case "crate": {
      eBox([0, 0, 0], [1.65, 1.05, 1.25], mat);
      eBox([0, 0.54, 0], [1.67, 0.065, 1.27], dark);
      eBox([0, -0.54, 0], [1.67, 0.065, 1.27], dark);
      eBox([0.84, 0, 0], [0.065, 1.05, 1.27], dark);
      eBox([-0.84, 0, 0], [0.065, 1.05, 1.27], dark);
      break;
    }
    case "bulb": {
      const gMat = new THREE.MeshPhysicalMaterial({ color: colorHex, roughness: 0.08, metalness: 0.05, transmission: 0.38, emissive: colorHex, emissiveIntensity: 0.45 });
      eSph([0, 0.1, 0], 0.75, gMat, 32);
      eBox([0, 0.1, 0], [0.045, 0.62, 0.045], new THREE.MeshStandardMaterial({ color: 0xffcc44, emissive: 0xffcc44, emissiveIntensity: 4 }));
      eCyl([0, -0.76, 0], 0.3, 0.36, 0.38, dark);
      const glow = new THREE.PointLight(colorHex, 2.5, 7); eGroup.add(glow);
      break;
    }
    case "badge": {
      const face = new THREE.Mesh(new THREE.SphereGeometry(0.78, 36, 28), mat);
      face.scale.set(1, 1, 0.1); face.castShadow = true; eGroup.add(face);
      const smileGeo = new THREE.TorusGeometry(0.3, 0.065, 10, 28, Math.PI);
      const smile = new THREE.Mesh(smileGeo, dark);
      smile.position.set(0, -0.12, 0.082); smile.rotation.z = Math.PI; eGroup.add(smile);
      for (const ex of [-0.23, 0.23]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 14, 10), dark);
        eye.position.set(ex, 0.21, 0.082); eye.scale.set(1, 1, 0.5); eGroup.add(eye);
      }
      const drop = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 10), new THREE.MeshStandardMaterial({ color: 0xcc1111, roughness: 0.4, emissive: 0x880000, emissiveIntensity: 0.2 }));
      drop.position.set(0.19, 0.4, 0.082); eGroup.add(drop);
      break;
    }
    case "clock": {
      const face = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.12, 56), pale);
      face.rotation.x = Math.PI / 2; face.castShadow = true; eGroup.add(face);
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.075, 14, 56), dark);
      rim.position.z = 0.02; eGroup.add(rim);
      eBox([0, 0.28, 0.1], [0.055, 0.52, 0.04], dark);      // minute hand
      eBox([0.17, 0.09, 0.12], [0.055, 0.36, 0.04], mat);   // hour hand (near midnight)
      eBox([0, 0.68, 0.1], [0.065, 0.17, 0.04], dark);      // 12 tick
      eSph([0, 0, 0.1], 0.07, dark, 14);                     // pivot
      break;
    }
    case "record": {
      const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.88, 0.88, 0.065, 64), dark);
      disc.rotation.x = Math.PI / 2; disc.castShadow = true; eGroup.add(disc);
      const label = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.075, 36), mat);
      label.rotation.x = Math.PI / 2; label.position.z = 0.01; label.castShadow = true; eGroup.add(label);
      for (let r = 0.37; r < 0.83; r += 0.15) {
        const groove = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 6, 64), new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 }));
        groove.position.z = 0.04; eGroup.add(groove);
      }
      break;
    }
    case "heart": {
      eSph([0, 0, 0], 0.72, mat, 32);
      const inner = new THREE.PointLight(colorHex, 2.2, 5); eGroup.add(inner);
      break;
    }
    case "skull": {
      eSph([0, 0.1, 0], 0.76, pale, 32);
      for (const ex of [-0.29, 0.29]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.21, 22, 18), dark);
        eye.position.set(ex, 0.09, 0.64); eye.scale.set(1, 0.75, 0.5); eGroup.add(eye);
      }
      eBox([0, -0.22, 0.7], [0.19, 0.19, 0.3], dark);
      const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.34, 0.72), pale);
      jaw.position.set(0, -0.78, 0.1); jaw.castShadow = true; jaw.receiveShadow = true; eGroup.add(jaw);
      for (let i = 0; i < 6; i++) {
        const tooth = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.18, 0.11), new THREE.MeshStandardMaterial({ color: 0xf0e8d0, roughness: 0.5 }));
        tooth.position.set(-0.28 + i * 0.114, -0.67, 0.33); eGroup.add(tooth);
      }
      break;
    }
    case "mask": {
      eBox([0, 0, 0], [1.25, 1.85, 0.19], mat);
      for (const ex of [-0.3, 0.3]) eBox([ex, 0.36, 0.1], [0.33, 0.22, 0.15], dark);
      eBox([0, -0.38, 0.1], [0.56, 0.15, 0.15], dark);
      break;
    }
    case "jacket": {
      eBox([0, 0.05, 0], [1.28, 1.58, 0.23], mat);
      eBox([-0.85, 0.28, 0], [0.44, 1.12, 0.21], mat);
      eBox([ 0.85, 0.28, 0], [0.44, 1.12, 0.21], mat);
      eBox([0, 0.88, 0.06], [0.38, 0.24, 0.13], dark);
      eBox([0, 0.04, 0.13], [0.055, 1.42, 0.045], dark);
      break;
    }
    case "curtain": {
      for (let i = 0; i < 5; i++) {
        const wave = Math.sin(i * 1.3) * 0.18;
        eBox([wave, 0, i * 0.13 - 0.26], [1.18, 2.25, 0.09], mat);
      }
      eBox([0, 1.22, 0], [1.45, 0.07, 0.82], dark);
      break;
    }
    case "paper": {
      eBox([0, 0, 0], [1.45, 1.05, 0.045], pale);
      for (let i = 0; i < 7; i++)
        eBox([(-0.08 + Math.random() * 0.16), 0.36 - i * 0.11, 0.032], [0.88 + Math.random() * 0.18, 0.038, 0.022], dark);
      break;
    }
    default:
      eSph([0, 0, 0], 0.76, mat);
  }

  eScene.add(eGroup);
}

function startExhibitAnim() {
  if (eAnimId) cancelAnimationFrame(eAnimId);
  const t0 = performance.now();
  function frame(now) {
    eAnimId = requestAnimationFrame(frame);
    const t = (now - t0) * 0.001;
    if (eGroup) {
      eGroup.rotation.y = t * 0.48;
      eGroup.position.y = Math.sin(t * 1.05) * 0.09;
      eGroup.rotation.z = Math.sin(t * 0.62) * 0.042;
    }
    eRenderer.render(eScene, eCamera);
  }
  eAnimId = requestAnimationFrame(frame);
}

function stopExhibitAnim() {
  if (eAnimId) { cancelAnimationFrame(eAnimId); eAnimId = null; }
}

// ─── ROOM OBJECT BUILDER (main scene) ────────────────────────────────────────
function buildBookRooms() {
  for (const room of bookRooms) {
    const x  = room.side * 23;
    const wx = room.side * 8.2;
    const hAngle = room.side < 0 ? Math.PI / 2 : -Math.PI / 2;
    const rAngle = room.side < 0 ? -Math.PI / 2 : Math.PI / 2;

    const accent = new THREE.MeshStandardMaterial({
      color: room.color, roughness: 0.48, transparent: true, opacity: 0.5,
      emissive: room.color, emissiveIntensity: 0.08,
    });
    const fl = new THREE.MeshStandardMaterial({ color: 0x151716, roughness: 0.84 });
    const wl = new THREE.MeshStandardMaterial({ color: 0x202322, roughness: 0.88 });

    addBox({ position: [x, -0.1, room.z - 1.6],           scale: [12, 0.22, 11],  material: fl,   castShadow: false });
    addBox({ position: [x, 6.05, room.z - 1.6],           scale: [12, 0.28, 11],  material: ceilMat, castShadow: false });
    addBox({ position: [x - room.side * 6, 3, room.z - 1.6], scale: [0.35, 6, 11],  material: wl, castShadow: false });
    addBox({ position: [x, 3, room.z - 7.1],              scale: [12, 6, 0.35],   material: wl,   castShadow: false });
    addBox({ position: [x, 3, room.z + 3.9],              scale: [12, 6, 0.35],   material: wl,   castShadow: false });
    addBox({ position: [wx, 2.9, room.z - 1.6],           scale: [0.26, 5.8, 8.6], material: accent, castShadow: false });

    const doorway = addBox({
      position: [wx, 2.1, room.z], scale: [0.38, 3.8, 2.6],
      material: new THREE.MeshStandardMaterial({ color: room.color, roughness: 0.35, emissive: room.color, emissiveIntensity: 0.15 }),
    });
    makeInteractive(doorway, { kind: "door", room, title: `${room.title} Room`, kicker: room.grade, body: `${room.theme} Click Enter Room to step inside.` });

    const sigMat = new THREE.MeshBasicMaterial({ map: makeRoomTexture(room) });
    makeInteractive(
      addPlane({ position: [wx - room.side * 0.08, 2.9, room.z - 3.2], rotation: [0, hAngle, 0], scale: [3.4, 1.7, 1], material: sigMat }),
      { kind: "door", room, title: `${room.title} Room`, kicker: room.grade, body: `${room.theme} Click Enter Room to step inside.` }
    );

    addPlane({
      position: [x - room.side * 5.82, 3.05, room.z - 1.6], rotation: [0, rAngle, 0], scale: [4.8, 2.4, 1],
      material: new THREE.MeshBasicMaterial({ map: makeRoomTexture(room) }),
    });

    const light = new THREE.PointLight(room.color, 2.2, 17, 1.5);
    light.position.set(x, 4.2, room.z - 1.7); museum.add(light);

    for (const obj of room.objects) addRoomObject(room, obj);
  }
}

function worldInRoom(room, pos) {
  return [room.side * 23 + pos[0], pos[1], room.z + pos[2]];
}

function addRoomObject(room, obj) {
  const mat  = new THREE.MeshStandardMaterial({ color: room.color, roughness: 0.4, metalness: 0.12, emissive: room.color, emissiveIntensity: 0.06 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x0e0e0e, roughness: 0.5 });
  const paper= new THREE.MeshStandardMaterial({ color: 0xe8dcc5, roughness: 0.68 });
  const [x, y, z] = worldInRoom(room, obj.position);
  const interactionData = {
    kind: "object",
    room,
    title: obj.title,
    kicker: room.title,
    body: obj.analysis,
    shape: obj.shape,
  };
  let mesh;

  switch (obj.shape) {
    case "counter": case "table": case "desk": case "lab":
      mesh = addBox({ position: [x, y, z], scale: [2.2, 0.35, 1.2], material: mat });
      addBox({ position: [x - 0.85, y - 0.55, z - 0.42], scale: [0.18, 1, 0.18], material: dark });
      addBox({ position: [x + 0.85, y - 0.55, z + 0.42], scale: [0.18, 1, 0.18], material: dark });
      break;
    case "frame": case "poster": case "window": case "ice":
      mesh = addBox({ position: [x, y, z], scale: [1.8, 1.25, 0.1], material: obj.shape === "window" || obj.shape === "ice" ? darkGlass : paper });
      break;
    case "sign": case "panels":
      mesh = addBox({ position: [x, y, z], scale: [1.8, 0.75, 0.12], material: mat }); break;
    case "plant": {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.28, 0.65, 18), dark);
      mesh.position.set(x, y, z); mesh.castShadow = true; museum.add(mesh);
      const lm = new THREE.MeshStandardMaterial({ color: 0x477b4d, roughness: 0.65 });
      for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 8), lm);
        leaf.position.set(x + Math.cos(i) * 0.34, y + 0.48 + Math.sin(i * 1.7) * 0.14, z + Math.sin(i) * 0.24);
        leaf.scale.set(1, 0.36, 0.7); museum.add(leaf);
        makeInteractive(leaf, interactionData);
      }
      break;
    }
    case "crown": {
      mesh = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.08, 12, 36), mat);
      mesh.position.set(x, y, z); mesh.rotation.x = Math.PI / 2; mesh.castShadow = true; museum.add(mesh);
      for (let i = 0; i < 5; i++) {
        const support = addBox({ position: [x - 0.55 + i * 0.28, y + 0.38, z], scale: [0.1, 0.75 - (i % 2) * 0.22, 0.1], material: mat });
        makeInteractive(support, interactionData);
      }
      break;
    }
    case "dagger":
      mesh = addBox({ position: [x, y, z], scale: [0.12, 0.12, 1.5], material: mat });
      mesh.rotation.y = 0.75;
      const hilt = addBox({ position: [x, y - 0.03, z + 0.75], scale: [0.75, 0.14, 0.18], material: dark });
      makeInteractive(hilt, interactionData);
      break;
    case "basin": case "drum": case "cup": case "radio": {
      mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.45, 0.55, 24), mat);
      mesh.position.set(x, y, z); mesh.castShadow = true; museum.add(mesh);
      break;
    }
    case "crate":
      mesh = addBox({ position: [x, y, z], scale: [1.5, 1, 1.1], material: mat }); break;
    case "bulb": case "badge": case "clock": case "record": case "heart": case "skull": {
      mesh = new THREE.Mesh(new THREE.SphereGeometry(0.62, 28, 18), mat);
      mesh.position.set(x, y, z); mesh.castShadow = true; museum.add(mesh);
      if (obj.shape === "record" || obj.shape === "clock" || obj.shape === "badge") mesh.scale.set(1, 1, 0.12);
      if (obj.shape === "heart") mesh.scale.set(0.95, 1.12, 0.72);
      break;
    }
    case "mask": case "jacket": case "curtain":
      mesh = addBox({ position: [x, y, z], scale: [1.15, 1.75, 0.16], material: mat }); break;
    default:
      mesh = addBox({ position: [x, y, z], scale: [1, 1, 1], material: mat });
  }

  makeInteractive(mesh, interactionData);

  const halo = new THREE.PointLight(room.color, 0.6, 4, 2);
  halo.position.set(x, y + 0.6, z); museum.add(halo);
  return mesh;
}

// ─── ARCHITECTURE ─────────────────────────────────────────────────────────────
function buildArchitecture() {
  addBox({ position: [0, -0.12, -78],  scale: [17, 0.24, 196], material: floorMat, castShadow: false });
  addBox({ position: [-8.5, 3, -78],   scale: [0.45, 6, 196],  material: wallMat,  castShadow: false });
  addBox({ position: [8.5, 3, -78],    scale: [0.45, 6, 196],  material: wallMat,  castShadow: false });
  addBox({ position: [0, 6.1, -78],    scale: [17, 0.3, 196],  material: ceilMat,  castShadow: false });

  for (let z = 11; z > -178; z -= 13) {
    addBox({ position: [-4.7, 0.05, z], scale: [0.12, 0.08, 6], material: brassMat, castShadow: false });
    addBox({ position: [ 4.7, 0.05, z], scale: [0.12, 0.08, 6], material: brassMat, castShadow: false });
  }

  for (const wing of wings) {
    const light = new THREE.PointLight(wing.color, 2.35, 30, 1.4);
    light.position.set(0, 4.8, wing.z); light.castShadow = true; museum.add(light);
    addBox({ position: [-6.6, 2.1, wing.z], scale: [0.35, 3.5, 10], material: new THREE.MeshStandardMaterial({ color: wing.color, roughness: 0.5, transparent: true, opacity: 0.25 }) });
    addBox({ position: [ 6.6, 2.1, wing.z], scale: [0.35, 3.5, 10], material: new THREE.MeshStandardMaterial({ color: wing.color, roughness: 0.5, transparent: true, opacity: 0.25 }) });
  }
}

function buildGrade9() {
  const z = -22;
  const wood  = new THREE.MeshStandardMaterial({ color: 0x7a4f33, roughness: 0.7 });
  const photo = new THREE.MeshStandardMaterial({ color: 0xd8bea0, roughness: 0.55 });
  addBox({ position: [-3.2, 0.75, z - 2], scale: [3.8, 0.28, 1.8], material: wood });
  for (let x = -4.4; x <= -2; x += 1.2) addBox({ position: [x, 0.35, z - 2.55], scale: [0.18, 0.7, 0.18], material: wood });
  for (let y = 1.4; y < 3.8; y += 0.75) addBox({ position: [5.8, y, z + 0.5], scale: [1.8, 0.13, 4], material: wood });
  for (let i = 0; i < 12; i++)
    addBox({ position: [5.7, 1.1 + (i % 4) * 0.72, z - 1.2 + Math.floor(i / 4) * 1.15], scale: [0.5, 0.45, 0.32], material: photo });
  addPlaque3D(wings[1], -7.95, z - 5.7, Math.PI / 2);
}

function buildGrade10() {
  const z = -56;
  const stone = new THREE.MeshStandardMaterial({ color: 0x34333a, roughness: 0.92 });
  const snow  = new THREE.MeshStandardMaterial({ color: 0xcfe6ee, roughness: 0.52 });
  addBox({ position: [0, 0.9, z - 1.5],  scale: [2.4, 1.8, 1.5], material: stone });
  addBox({ position: [0, 2.4, z - 1.5],  scale: [1.4, 1.2, 1],   material: stone });
  addBox({ position: [0, 3.2, z - 1.5],  scale: [2.1, 0.18, 1.4],material: brassMat });
  for (let i = 0; i < 22; i++)
    addBox({ position: [-7.2 + Math.random()*14.4, 0.03, z - 8 + Math.random()*15], scale: [0.25 + Math.random()*0.55, 0.03, 0.25 + Math.random()*0.55], material: snow, castShadow: false });
  for (const lx of [-5.3, 5.3]) {
    const flame = new THREE.PointLight(0xff8b3d, 1.7, 12);
    flame.position.set(lx, 2.5, z + 3.4); museum.add(flame);
    addBox({ position: [lx, 1.3, z + 3.4], scale: [0.2, 1.8, 0.2], material: brassMat });
  }
  addPlaque3D(wings[2], 7.95, z - 6, -Math.PI / 2);
}

function buildGrade11() {
  const z = -92;
  const red   = new THREE.MeshStandardMaterial({ color: 0x9d2e2e, roughness: 0.7 });
  const blue  = new THREE.MeshBasicMaterial({ color: 0x1f6a9d });
  const paper = new THREE.MeshBasicMaterial({ color: 0xded3bd });
  for (let i = 0; i < 9; i++) {
    addPlane({ position: [i%2 ? -7.95 : 7.95, 1.7 + (i%3)*1.1, z - 7 + i*1.5], rotation: [0, i%2 ? Math.PI/2 : -Math.PI/2, 0], scale: [1.8, 1.05, 1], material: i%3===0 ? red : paper });
  }
  for (let i = 0; i < 6; i++)
    addBox({ position: [-3.8 + i*1.5, 2.5 + Math.sin(i)*0.8, z - 1.5 - i], scale: [1.15, 0.75, 0.08], material: blue });
  for (let i = 0; i < 8; i++)
    addBox({ position: [-4.5 + Math.random()*9, 0.55 + Math.random()*2.5, z + 5 - Math.random()*10], scale: [0.45, 1.1 + Math.random()*1.6, 0.45], material: wallMat });
  addPlaque3D(wings[3], -7.95, z - 6, Math.PI / 2);
}

function buildGrade12() {
  const z = -130;
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x9fd8c6, roughness: 0.12, metalness: 0.05, transmission: 0.32, transparent: true, opacity: 0.42 });
  for (let i = 0; i < 7; i++)
    addPlane({ position: [-5.5 + i*1.8, 2.55, z - 4 - Math.abs(3-i)*0.55], rotation: [0, (i-3)*0.16, 0], scale: [1.15, 3.4, 1], material: darkGlass });
  for (let i = 0; i < 18; i++) {
    const strand = addBox({ position: [-7.1 + Math.random()*14.2, 3.2 + Math.random()*2.1, z - 8 + Math.random()*14], scale: [0.025, 1.2 + Math.random()*2.6, 0.025], material: glass, castShadow: false });
    strand.rotation.z = Math.random() * 0.25;
  }
  addBox({ position: [4.7, 1.2, z + 2], scale: [2.3, 1.7, 1.1], material: glass });
  addBox({ position: [4.7, 2.35, z + 2], scale: [1.2, 1.2, 0.8], material: darkGlass });
  addPlaque3D(wings[4], 7.95, z - 6, -Math.PI / 2);
}

function buildFinalRoom() {
  const z = -166;
  const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  addPlane({ position: [0, 2.75, z - 7.5], rotation: [0, 0, 0], scale: [8.5, 4.8, 1], material: screenMat });
  const silMat = new THREE.MeshStandardMaterial({ color: 0x030303, roughness: 0.4 });
  const sil = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 1.35, 8, 18), silMat);
  sil.position.set(0, 1.35, z - 7.15); sil.scale.set(1, 1.25, 0.22); museum.add(sil);
  addPlaque3D(wings[5], 0, z - 8.05, 0);
}

// ─── BUILD ────────────────────────────────────────────────────────────────────
buildArchitecture();
buildGrade9();
buildGrade10();
buildGrade11();
buildGrade12();
buildBookRooms();
buildFinalRoom();
addPlaque3D(wings[0], 0, 3.5, 0);

// ─── INPUT STATE ─────────────────────────────────────────────────────────────
const keys   = new Set();
let started  = false;
let targetZ  = camera.position.z;
let targetX  = camera.position.x;
let yaw      = 0;          // target yaw
let smoothYaw = 0;         // smoothed yaw applied to camera
let dragging  = false;
let lastX     = 0;
let pointerDown = { x: 0, y: 0 };
let currentWing = wings[0];
let activeRoom  = null;
let pendingRoom = null;
let lastTime    = performance.now();

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
enterButton.addEventListener("click", () => {
  started = true; intro.hidden = true; hud.hidden = false; plaque.hidden = false; updateUi(wings[0]);
});
closeModal.addEventListener("click", hideModal);
enterRoomBtn.addEventListener("click", () => { if (pendingRoom) enterRoom(pendingRoom); hideModal(); });
exitRoomBtn.addEventListener("click", exitRoom);

window.addEventListener("keydown", e => {
  keys.add(e.key.toLowerCase());
  const n = Number(e.key);
  if (started && Number.isInteger(n) && n >= 1 && n <= wings.length) jumpToWing(n - 1);
  if (e.key === "Escape") { hideModal(); if (activeRoom) exitRoom(); }
});
window.addEventListener("keyup", e => keys.delete(e.key.toLowerCase()));

window.addEventListener("pointerdown", e => {
  if (!started || e.target.closest(".exhibit-modal, .room-actions, button")) return;
  dragging = true; lastX = e.clientX; pointerDown = { x: e.clientX, y: e.clientY };
});
window.addEventListener("pointerup", e => {
  if (!dragging) return; dragging = false;
  if (Math.hypot(e.clientX - pointerDown.x, e.clientY - pointerDown.y) < 8) handleSceneClick(e);
});
window.addEventListener("pointermove", e => {
  if (!dragging || !started) return;
  yaw -= (e.clientX - lastX) * 0.004; lastX = e.clientX;
});
window.addEventListener("wheel", e => { if (started) targetZ += e.deltaY * -0.035; }, { passive: true });

// ─── SCENE CLICK ─────────────────────────────────────────────────────────────
function handleSceneClick(e) {
  if (!started) return;

  const rect = canvas.getBoundingClientRect();
  pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickable, true);
  if (!hits.length) return;

  const hit = hits.find(h => h.object.userData?.interaction) || hits[0];
  const interaction = hit.object.userData?.interaction || hit.object.parent?.userData?.interaction;
  if (!interaction) return;

  showModal(interaction);
}

// ─── UI FUNCTIONS ─────────────────────────────────────────────────────────────
function getNearestWing(z) {
  return wings.reduce((n, w) => Math.abs(z - w.z) < Math.abs(z - n.z) ? w : n, wings[0]);
}

function updateUi(wing) {
  if (activeRoom) {
    wingLabel.textContent = `${activeRoom.grade} Room`;
    wingTitle.textContent = activeRoom.title;
    wingTheme.textContent = activeRoom.theme;
    plaqueWorks.textContent = "Clickable Exhibits";
    plaqueTitle.textContent = "Look for lit objects";
    plaqueBody.textContent = "Click any glowing object to open its symbolism and thematic analysis. Press Escape or Return to Wing when finished.";
    return;
  }
  wingLabel.textContent = wing.key;
  wingTitle.textContent = wing.title;
  wingTheme.textContent = wing.theme;
  plaqueWorks.textContent = wing.works;
  plaqueTitle.textContent = wing.title;
  plaqueBody.textContent = wing.body;
}

function showModal({ title, kicker, body, room, kind, shape }) {
  pendingRoom = kind === "door" ? room : null;
  modalKicker.textContent = kicker;
  modalTitle.textContent  = title;
  modalBody.textContent   = body;
  enterRoomBtn.hidden     = kind !== "door";

  // scroll to top each open
  const scroll = document.querySelector(".modal-body-scroll");
  if (scroll) scroll.scrollTop = 0;

  if (kind === "object" && shape && room) {
    buildExhibitMesh(shape, room.color);
    startExhibitAnim();
    exhibitCanvas.hidden = false;
  } else {
    stopExhibitAnim();
    exhibitCanvas.hidden = true;
  }

  exhibitModal.hidden = false;
}

function hideModal() {
  exhibitModal.hidden = true;
  pendingRoom = null;
  stopExhibitAnim();
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
function enterRoom(room) {
  activeRoom = room; targetX = room.side * 23; targetZ = room.z + 1.1;
  camera.position.x = targetX; camera.position.z = targetZ;
  yaw = smoothYaw = 0; roomActions.hidden = false; updateUi(currentWing);
}

function exitRoom() {
  if (!activeRoom) return;
  targetX = 0; targetZ = activeRoom.z;
  camera.position.x = 0; camera.position.z = targetZ;
  activeRoom = null; roomActions.hidden = true; yaw = smoothYaw = 0;
  updateUi(getNearestWing(camera.position.z));
}

function jumpToWing(index) {
  const wing = wings[index]; if (!wing) return;
  activeRoom = null; roomActions.hidden = true; hideModal();
  targetX = 0; started = true; intro.hidden = true; hud.hidden = false; plaque.hidden = false;
  targetZ = wing.z; camera.position.x = 0; camera.position.z = wing.z;
  currentWing = wing; yaw = smoothYaw = 0; updateUi(wing);
}

function jumpFromHash() {
  const slug = location.hash.replace("#", "").toLowerCase(); if (!slug) return;
  const wi = wings.findIndex(w => w.key.toLowerCase().replaceAll(" ", "-") === slug);
  if (wi >= 0) { jumpToWing(wi); return; }
  const room = bookRooms.find(r => r.slug === slug);
  if (room) { started = true; intro.hidden = true; hud.hidden = false; plaque.hidden = false; enterRoom(room); }
}

// ─── MAIN LOOP ────────────────────────────────────────────────────────────────
const fogTarget = new THREE.Color();
function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;

  if (started) {
    const speed = keys.has("shift") ? 18 : 10;
    if (keys.has("w") || keys.has("arrowup"))    targetZ -= speed * dt;
    if (keys.has("s") || keys.has("arrowdown"))  targetZ += speed * dt;
    if (keys.has("a") || keys.has("arrowleft"))  yaw += 1.5 * dt;
    if (keys.has("d") || keys.has("arrowright")) yaw -= 1.5 * dt;

    targetZ = THREE.MathUtils.clamp(targetZ,
      activeRoom ? activeRoom.z - 5.4 : wings[wings.length - 1].z - 2,
      activeRoom ? activeRoom.z + 3.1 : 13
    );

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5.5, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5.5, dt);

    // smooth yaw for cinematic camera rotation
    smoothYaw = THREE.MathUtils.damp(smoothYaw, yaw, 9.5, dt);
  }

  const progress = THREE.MathUtils.clamp(
    (13 - camera.position.z) / (13 - (wings[wings.length - 1].z - 2)), 0, 1
  );
  progressFill.style.width = `${progress * 100}%`;

  const nearest = getNearestWing(camera.position.z);
  if (!activeRoom && nearest !== currentWing) { currentWing = nearest; updateUi(nearest); }

  const isFinalRoom = currentWing.key === "Final Room";
  if (isFinalRoom) {
    fogTarget.setHex(0xffffff);
    scene.fog.color.lerp(fogTarget, 0.075);
    scene.background.lerp(fogTarget, 0.075);
    playerLight.intensity = THREE.MathUtils.damp(playerLight.intensity, 2.4, 8, dt);
  } else {
    fogTarget.setHex(currentWing.fog);
    scene.fog.color.lerp(fogTarget, 0.04);
    scene.background.lerp(fogTarget, 0.025);
    playerLight.intensity = THREE.MathUtils.damp(playerLight.intensity, 1.8, 8, dt);
  }

  camera.position.y = 2.08 + Math.sin(now * 0.0011) * 0.035;
  camera.rotation.set(0, smoothYaw, 0);
  playerLight.position.set(camera.position.x, 3.7, camera.position.z + 1.8);

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ─── INIT ─────────────────────────────────────────────────────────────────────
updateUi(wings[0]);
jumpFromHash();
requestAnimationFrame(tick);

window.__museum = { jumpTo: jumpToWing, clickables: clickable, raycaster, pointer, camera, handleSceneClick, showModal };
window.addEventListener("hashchange", jumpFromHash);