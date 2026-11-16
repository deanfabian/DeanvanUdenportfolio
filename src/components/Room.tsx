import React from 'react';

interface RoomProps {
  roomContainerRef: React.RefObject<HTMLDivElement>;
}

export const Room: React.FC<RoomProps> = ({ roomContainerRef }) => {
  return (
    <div
      ref={roomContainerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-25 opacity-0 overflow-hidden bg-[#070b14]"
    >
      {/* 1. Atmospheric Ambient Lighting Layers */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

      {/* 2. Main High-Detail Room SVG Scene */}
      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full absolute inset-0 select-none pointer-events-none"
      >
        <defs>
          {/* Lamp Light Glow Falloff */}
          <radialGradient id="lampGlowPool" cx="64%" cy="58%" r="48%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.85" />
            <stop offset="25%" stopColor="#fbbf24" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#d97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#070b14" stopOpacity="0" />
          </radialGradient>

          {/* Lamp Light Cone */}
          <linearGradient id="lampConeGrad" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.4" />
            <stop offset="40%" stopColor="#fef08a" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>

          {/* Wall Gradient */}
          <linearGradient id="roomWallGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#080c16" />
            <stop offset="50%" stopColor="#0d1424" />
            <stop offset="100%" stopColor="#11192e" />
          </linearGradient>

          {/* Floor Wood Plank Gradient */}
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#080b14" />
            <stop offset="100%" stopColor="#05070d" />
          </linearGradient>

          {/* Leather Baseball Glove Gradient */}
          <linearGradient id="gloveGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a16207" />
            <stop offset="60%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Team Jacket Satin Gradient */}
          <linearGradient id="jacketGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="50%" stopColor="#172554" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>

        {/* Back Wall */}
        <rect width="1600" height="740" fill="url(#roomWallGrad)" />

        {/* Hardwood Floor */}
        <rect y="740" width="1600" height="260" fill="url(#floorGrad)" />
        {/* Floor plank seams */}
        {[780, 830, 890, 950].map((ly) => (
          <line key={ly} x1="0" y1={ly} x2="1600" y2={ly} stroke="#04060a" strokeWidth="1.5" opacity="0.6" />
        ))}

        {/* ============================================================== */}
        {/* REAR WINDOW (Over the shoulder, looking out at the city night) */}
        {/* ============================================================== */}
        <g id="rear-window-out">
          {/* Window Cutout in wall */}
          <rect x="180" y="80" width="360" height="480" rx="4" fill="#040710" />

          {/* Outside City Night Skyline */}
          <rect x="184" y="84" width="352" height="472" fill="#050914" />
          
          {/* Distant building silhouettes outside rear window */}
          <rect x="200" y="240" width="60" height="316" fill="#080e1e" />
          <rect x="280" y="180" width="90" height="376" fill="#060b18" />
          <rect x="390" y="220" width="120" height="336" fill="#080e1c" />

          {/* Distant glowing windows across the street */}
          {[
            { x: 215, y: 270, w: 8, h: 12, fill: '#fbbf24' },
            { x: 235, y: 310, w: 8, h: 12, fill: '#fbbf24' },
            { x: 295, y: 210, w: 10, h: 14, fill: '#f59e0b' },
            { x: 330, y: 250, w: 10, h: 14, fill: '#7dd3fc' }, // TV flicker
            { x: 300, y: 330, w: 10, h: 14, fill: '#fbbf24' },
            { x: 410, y: 250, w: 10, h: 14, fill: '#f59e0b' },
            { x: 450, y: 290, w: 10, h: 14, fill: '#fbbf24' },
            { x: 430, y: 360, w: 10, h: 14, fill: '#fbbf24' },
          ].map((dw, i) => (
            <rect key={i} x={dw.x} y={dw.y} width={dw.w} height={dw.h} rx="1" fill={dw.fill} opacity="0.6" />
          ))}

          {/* Rain streaks on rear window */}
          {[120, 180, 260, 340, 420].map((rx, idx) => (
            <line
              key={idx}
              x1={184 + rx}
              y1="100"
              x2={184 + rx - 6}
              y2="540"
              stroke="#93c5fd"
              strokeWidth="0.8"
              strokeDasharray="14,24"
              opacity="0.25"
            />
          ))}

          {/* Window Frame Inner Border & Mullions */}
          <rect x="180" y="80" width="360" height="480" fill="none" stroke="#090d18" strokeWidth="12" rx="4" />
          <line x1="360" y1="80" x2="360" y2="560" stroke="#090d18" strokeWidth="8" />
          <line x1="180" y1="320" x2="540" y2="320" stroke="#090d18" strokeWidth="6" />

          {/* Curtains pushed to sides */}
          <path d="M180 80 Q 220 300 205 560 L 180 560 Z" fill="#0b101d" opacity="0.85" />
          <path d="M540 80 Q 500 300 515 560 L 540 560 Z" fill="#0b101d" opacity="0.85" />
        </g>

        {/* ============================================================== */}
        {/* SHELVES & WALL OBJECTS (Baseball glove, stitched ball, books)  */}
        {/* ============================================================== */}
        <g id="shelves-and-trophies">
          {/* Floating oak shelf */}
          <rect x="620" y="240" width="380" height="16" rx="2" fill="#1e1814" />
          <rect x="620" y="240" width="380" height="4" fill="#38291f" />
          {/* Metal brackets */}
          <polygon points="650,256 658,256 658,280 650,280" fill="#0a0a0d" />
          <polygon points="960,256 968,256 968,280 960,280" fill="#0a0a0d" />

          {/* 1. Worn Leather Baseball Glove */}
          <g id="baseball-glove" transform="translate(640, 160)">
            {/* Glove base & heel */}
            <path
              d="M 10 74 C 4 60 8 40 18 28 C 24 20 36 15 48 18 C 58 20 68 30 72 45 C 76 58 72 72 64 80 C 48 84 22 84 10 74 Z"
              fill="url(#gloveGrad)"
            />
            {/* Finger pockets & webbing laces */}
            <path d="M 22 30 C 26 12 36 10 40 25" fill="none" stroke="#542403" strokeWidth="3" />
            <path d="M 38 18 C 44 8 54 8 56 22" fill="none" stroke="#542403" strokeWidth="3" />
            <path d="M 54 18 C 62 10 70 14 68 28" fill="none" stroke="#542403" strokeWidth="3" />
            {/* Leather lacing cross-stitch details */}
            <line x1="28" y1="26" x2="34" y2="30" stroke="#fef3c7" strokeWidth="1.2" opacity="0.75" />
            <line x1="44" y1="22" x2="50" y2="26" stroke="#fef3c7" strokeWidth="1.2" opacity="0.75" />
            <line x1="56" y1="28" x2="62" y2="32" stroke="#fef3c7" strokeWidth="1.2" opacity="0.75" />
            {/* Pocket deep fold */}
            <path d="M 28 50 Q 42 62 58 52" fill="none" stroke="#331402" strokeWidth="4" />
          </g>

          {/* 2. Official Stitched Baseball resting next to glove */}
          <g id="baseball-sphere" transform="translate(735, 198)">
            {/* Ball body */}
            <circle cx="20" cy="20" r="19" fill="#fdfbf7" />
            {/* Shading for 3D sphere volume */}
            <radialGradient id="ballShade" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="70%" stopColor="#e5e0d8" />
              <stop offset="100%" stopColor="#a39a8c" />
            </radialGradient>
            <circle cx="20" cy="20" r="19" fill="url(#ballShade)" opacity="0.9" />

            {/* Red curved seams */}
            <path
              d="M 8 10 Q 18 20 8 30"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="1.2"
              strokeDasharray="2.5,2.5"
            />
            <path
              d="M 32 10 Q 22 20 32 30"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="1.2"
              strokeDasharray="2.5,2.5"
            />
          </g>

          {/* 3. Stack of Creative Business & Pitching Strategy Books */}
          <g id="books-shelf" transform="translate(800, 160)">
            {/* Book 1 (leaning) */}
            <rect x="10" y="10" width="16" height="70" rx="1" fill="#1e293b" transform="rotate(-12, 10, 80)" />
            {/* Book 2 */}
            <rect x="35" y="14" width="18" height="66" rx="1" fill="#78350f" />
            <line x1="38" y1="22" x2="50" y2="22" stroke="#fbbf24" strokeWidth="1" opacity="0.6" />
            {/* Book 3 */}
            <rect x="56" y="8" width="22" height="72" rx="1" fill="#047857" />
            <line x1="60" y1="18" x2="74" y2="18" stroke="#d1fae5" strokeWidth="1" opacity="0.6" />
            {/* Book 4 */}
            <rect x="80" y="20" width="20" height="60" rx="1" fill="#4338ca" />
            {/* Book 5 */}
            <rect x="102" y="24" width="24" height="56" rx="1" fill="#b45309" />
          </g>

          {/* 4. Vintage 35mm Film Camera on shelf */}
          <g id="vintage-camera" transform="translate(930, 204)">
            {/* Camera body */}
            <rect x="0" y="10" width="50" height="26" rx="2" fill="#1f2937" />
            {/* Top chrome plate */}
            <rect x="0" y="6" width="50" height="5" fill="#9ca3af" />
            {/* Shutter & dials */}
            <rect x="8" y="2" width="6" height="4" fill="#6b7280" />
            <rect x="36" y="2" width="7" height="4" fill="#6b7280" />
            {/* Lens barrel */}
            <circle cx="25" cy="23" r="10" fill="#111827" />
            <circle cx="25" cy="23" r="7" fill="#374151" />
            <circle cx="25" cy="23" r="4" fill="#0369a1" opacity="0.8" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* WHITEBOARD (Hand-drawn pitching sequence & mechanics)          */}
        {/* ============================================================== */}
        <g id="whiteboard-pitching" transform="translate(1080, 150)">
          {/* Aluminum Frame */}
          <rect x="0" y="0" width="420" height="260" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="4" />
          {/* Whiteboard surface */}
          <rect x="10" y="10" width="400" height="240" fill="#0f172a" />

          {/* Title: Pitch Mechanics & Release Trajectory */}
          <text x="26" y="36" fill="#94a3b8" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="0.1em" opacity="0.8">
            PITCH SEQUENCING // TUNNELING
          </text>

          {/* Strike Zone Grid */}
          <rect x="36" y="60" width="70" height="90" fill="none" stroke="#475569" strokeWidth="1.5" />
          <line x1="36" y1="90" x2="106" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="36" y1="120" x2="106" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="59" y1="60" x2="59" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="83" y1="60" x2="83" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
          {/* Fastball release dot */}
          <circle cx="95" cy="74" r="4" fill="#ef4444" />
          {/* Slider break arrow */}
          <path d="M 95 74 Q 80 115 50 135" fill="none" stroke="#38bdf8" strokeWidth="1.8" />
          <polygon points="50,135 56,128 57,136" fill="#38bdf8" />

          {/* Release Angle Diagram */}
          <path d="M 160 140 Q 210 65 310 90" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <text x="160" y="156" fill="#64748b" fontFamily="Inter, sans-serif" fontSize="10">Release: 5.8ft</text>
          <text x="240" y="70" fill="#f59e0b" fontFamily="Inter, sans-serif" fontSize="10">2,420 RPM</text>

          {/* Velocity & Brand Concept sketches */}
          <rect x="36" y="176" width="140" height="56" rx="2" fill="#1e293b" opacity="0.6" />
          <text x="46" y="196" fill="#e2e8f0" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="bold">
            EUROPEAN BASEBALL
          </text>
          <text x="46" y="214" fill="#94a3b8" fontFamily="Inter, sans-serif" fontSize="10">
            Heritage · Craft · Modern Pitch Design
          </text>

          {/* Sticky Post-it Notes on board */}
          <rect x="330" y="45" width="46" height="46" rx="1" fill="#fef08a" transform="rotate(4, 330, 45)" />
          <line x1="336" y1="58" x2="368" y2="58" stroke="#854d0e" strokeWidth="1" />
          <line x1="336" y1="68" x2="364" y2="68" stroke="#854d0e" strokeWidth="1" />

          <rect x="335" y="120" width="44" height="44" rx="1" fill="#bae6fd" transform="rotate(-3, 335, 120)" />
          <line x1="341" y1="134" x2="370" y2="134" stroke="#0369a1" strokeWidth="1" />
          <line x1="341" y1="144" x2="365" y2="144" stroke="#0369a1" strokeWidth="1" />
        </g>

        {/* ============================================================== */}
        {/* DESK, LAPTOP, WARM LAMP & ACCESSORIES                          */}
        {/* ============================================================== */}
        <g id="desk-workspace">
          {/* Heavy Oak Desk Slab */}
          <rect x="420" y="580" width="860" height="32" rx="2" fill="#2d2218" />
          <rect x="420" y="580" width="860" height="6" fill="#4a3726" />
          {/* Steel Desk Legs */}
          <rect x="450" y="612" width="18" height="260" fill="#0f172a" />
          <rect x="1230" y="612" width="18" height="260" fill="#0f172a" />

          {/* Desk Lamp (Left side, casting warm cone across desk) */}
          <g id="desk-lamp" transform="translate(980, 360)">
            {/* Lamp base */}
            <ellipse cx="60" cy="220" rx="30" ry="10" fill="#18181b" />
            <ellipse cx="60" cy="218" rx="26" ry="8" fill="#27272a" />
            {/* Articulated brass armature */}
            <line x1="60" y1="218" x2="40" y2="110" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" />
            <circle cx="40" cy="110" r="6" fill="#a16207" />
            <line x1="40" y1="110" x2="10" y2="70" stroke="#ca8a04" strokeWidth="5" strokeLinecap="round" />
            {/* Bell shade tilted down towards laptop & desk */}
            <polygon points="5,50 35,58 -10,95 -25,75" fill="#18181b" />
            <polygon points="0,55 25,62 -8,90 -18,78" fill="#ca8a04" />
          </g>

          {/* Lamp Light Cone Beam */}
          <polygon
            points="960,435 600,612 1180,612"
            fill="url(#lampConeGrad)"
            style={{ mixBlendMode: 'screen' }}
          />
          {/* Warm pool of light on desk surface */}
          <ellipse cx="890" cy="590" rx="260" ry="24" fill="url(#lampGlowPool)" opacity="0.75" />

          {/* Opened Laptop (Center-right of desk) */}
          <g id="laptop" transform="translate(740, 470)">
            {/* Keyboard base */}
            <polygon points="20,110 180,110 200,126 0,126" fill="#334155" />
            <rect x="75" y="118" width="46" height="6" rx="1" fill="#1e293b" />
            {/* Screen bezel */}
            <polygon points="20,110 180,110 175,10 25,10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            {/* Screen Display (Creative business sketches & wireframes) */}
            <polygon points="26,105 174,105 170,16 30,16" fill="#0284c7" opacity="0.9" />
            {/* Screen content graphics */}
            <rect x="40" y="28" width="50" height="32" rx="2" fill="#ffffff" opacity="0.85" />
            <rect x="44" y="32" width="42" height="18" fill="#0284c7" />
            <circle cx="65" cy="41" r="5" fill="#ffffff" />
            <line x1="44" y1="54" x2="86" y2="54" stroke="#0f172a" strokeWidth="2" />
            <line x1="98" y1="30" x2="158" y2="30" stroke="#f0f9ff" strokeWidth="2" />
            <line x1="98" y1="38" x2="148" y2="38" stroke="#f0f9ff" strokeWidth="1.5" />
            <line x1="98" y1="46" x2="152" y2="46" stroke="#f0f9ff" strokeWidth="1.5" />
            {/* Colorful sticky notes stuck to screen bezel */}
            <rect x="18" y="40" width="14" height="14" rx="1" fill="#fef08a" transform="rotate(-6, 18, 40)" />
            <rect x="168" y="25" width="14" height="14" rx="1" fill="#f472b6" transform="rotate(8, 168, 25)" />
          </g>

          {/* Ceramic Coffee Mug */}
          <g id="coffee-mug" transform="translate(670, 560)">
            <rect x="0" y="0" width="18" height="24" rx="2" fill="#f8fafc" />
            {/* Handle */}
            <path d="M 0 4 C -6 4 -6 16 0 16" fill="none" stroke="#f8fafc" strokeWidth="3" />
            {/* Dark coffee top */}
            <ellipse cx="9" cy="2" rx="7" ry="2" fill="#29180c" />
            {/* Subtle vapor curl */}
            <path d="M 9 -2 Q 6 -10 11 -18" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.25" />
          </g>

          {/* Notebook with pen on right */}
          <g id="notebook-desk" transform="translate(970, 574)">
            <polygon points="0,6 64,0 72,24 8,30" fill="#f1f5f9" />
            <line x1="12" y1="10" x2="56" y2="6" stroke="#94a3b8" strokeWidth="1" />
            <line x1="14" y1="16" x2="58" y2="12" stroke="#94a3b8" strokeWidth="1" />
            <line x1="16" y1="22" x2="50" y2="18" stroke="#94a3b8" strokeWidth="1" />
            {/* Pen */}
            <line x1="62" y1="-2" x2="72" y2="28" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* ============================================================== */}
        {/* CHAIR WITH EUROPEAN BASEBALL VARSITY TEAM JACKET               */}
        {/* ============================================================== */}
        <g id="chair-and-jacket" transform="translate(560, 530)">
          {/* Chair backrest structure */}
          <rect x="40" y="40" width="110" height="160" rx="8" fill="#18181b" />
          
          {/* Team Varsity Jacket Draped Over Chair Back */}
          <g id="team-jacket">
            {/* Main torso fold of jacket */}
            <path
              d="M 28 60 C 28 42 60 38 95 38 C 130 38 162 42 162 60 L 166 180 C 145 190 110 195 95 195 C 80 195 45 190 24 180 Z"
              fill="url(#jacketGrad)"
            />
            {/* White leather sleeves hanging down sides */}
            <path d="M 28 60 Q 15 120 20 185 L 36 185 Q 36 120 44 75 Z" fill="#f8fafc" />
            <path d="M 162 60 Q 175 120 170 185 L 154 185 Q 154 120 146 75 Z" fill="#f8fafc" />
            {/* Striped knit ribbing at collar and hem */}
            <path d="M 65 39 Q 95 48 125 39" fill="none" stroke="#f59e0b" strokeWidth="3" />
            <path d="M 65 42 Q 95 51 125 42" fill="none" stroke="#f8fafc" strokeWidth="2" />
            {/* Chenille embroidered brand letter 'D' / baseball crest on back */}
            <circle cx="95" cy="105" r="24" fill="#172554" stroke="#f59e0b" strokeWidth="2" />
            <text
              x="95"
              y="114"
              fill="#fbbf24"
              fontFamily="Fraunces, serif"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
            >
              D
            </text>
            <text
              x="95"
              y="142"
              fill="#94a3b8"
              fontFamily="Inter, sans-serif"
              fontSize="8"
              letterSpacing="0.2em"
              textAnchor="middle"
            >
              BASEBALL CO.
            </text>
          </g>

          {/* Chair Gas Lift Stem & Swivel Base */}
          <rect x="90" y="210" width="10" height="70" fill="#09090b" />
          <polygon points="95,270 40,290 150,290" fill="#09090b" />
        </g>
      </svg>
    </div>
  );
};
