import { useState, useEffect, useRef } from "react";

const CSS = `
  @import url('[fonts.googleapis.com](https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap)');

  .pk-root *, .pk-root *::before, .pk-root *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .pk-root {
    --bg: #141414;
    --bg2: #1a1a1a;
    --bg3: #1f1f1f;
    --surface: #252525;
    --border: rgba(255,255,255,0.06);
    --border2: rgba(255,255,255,0.12);
    --text: #e8e8e8;
    --text2: #a0a0a0;
    --text3: #555;
    --green: #3ddc84;
    --green2: #2ab970;
    --blue: #5ac8fa;
    --purple: #bf5af2;
    --orange: #ff9f0a;
    --red: #ff453a;
    --yellow: #ffd60a;
    --pink: #ff6b9d;
    --mono: 'JetBrains Mono', monospace;
    font-family: var(--mono);
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* MENUBAR */
  .pk-menubar {
    position: fixed;
    top: 0; left: 0; right: 0;
    height: 28px;
    background: rgba(20,20,20,0.92);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 16px;
    z-index: 999;
    gap: 20px;
    font-size: 13px;
  }
  .pk-menubar-logo { font-size: 16px; }
  .pk-menubar-right { margin-left: auto; color: var(--text2); }

  /* LAYOUT */
  .pk-desktop {
    padding-top: 48px;
    padding-bottom: 100px;
    max-width: 860px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  /* WINDOW */
  .pk-window {
    background: var(--bg2);
    border: 1px solid var(--border2);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 24px;
  }
  .pk-titlebar {
    height: 36px;
    background: var(--bg3);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 14px;
    gap: 10px;
  }
  .pk-traffic { display: flex; gap: 6px; }
  .pk-t-red, .pk-t-yellow, .pk-t-green {
    width: 12px; height: 12px; border-radius: 50%;
  }
  .pk-t-red { background: #ff5f57; }
  .pk-t-yellow { background: #febc2e; }
  .pk-t-green { background: #28c840; }
  .pk-win-title { font-size: 12px; color: var(--text3); margin-left: 8px; }

  /* HERO */
  .pk-hero-art { padding: 40px 32px; }
  .pk-hero-ascii {
    font-family: var(--mono);
    font-size: 10px;
    line-height: 1.2;
    color: var(--green);
    display: block;
    margin-bottom: 36px;
    overflow-x: auto;
    opacity: 0.7;
  }
  .pk-hero-name {
    font-size: 56px;
    font-weight: 300;
    color: var(--text);
    letter-spacing: -2px;
    line-height: 1.05;
    margin-bottom: 12px;
  }
  .pk-hero-name span { color: var(--green); }
  .pk-hero-role { font-size: 13px; color: var(--text3); margin-bottom: 32px; letter-spacing: 0.5px; }
  .pk-badges { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
  .pk-badge {
    font-size: 11px; padding: 4px 10px;
    border-radius: 4px; border: 1px solid;
    font-family: var(--mono);
  }
  .pk-badge-green  { color: var(--green);  border-color: rgba(61,220,132,0.25); background: rgba(61,220,132,0.06); }
  .pk-badge-blue   { color: var(--blue);   border-color: rgba(90,200,250,0.25); background: rgba(90,200,250,0.06); }
  .pk-badge-purple { color: var(--purple); border-color: rgba(191,90,242,0.25); background: rgba(191,90,242,0.06); }
  .pk-badge-orange { color: var(--orange); border-color: rgba(255,159,10,0.25); background: rgba(255,159,10,0.06); }
  .pk-badge-pink   { color: var(--pink);   border-color: rgba(255,107,157,0.25); background: rgba(255,107,157,0.06); }
  .pk-badge-gray   { color: var(--text3);  border-color: rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); }

  .pk-hero-links { display: flex; gap: 12px; flex-wrap: wrap; }
  .pk-btn {
    font-family: var(--mono); font-size: 12px;
    padding: 9px 22px; border-radius: 6px;
    text-decoration: none; transition: all 0.15s ease;
    cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
  }
  .pk-btn-primary { background: var(--green); color: #0a1a0a; border: none; font-weight: 600; }
  .pk-btn-primary:hover { background: var(--green2); transform: translateY(-1px); }
  .pk-btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border2); }
  .pk-btn-ghost:hover { color: var(--text); border-color: rgba(255,255,255,0.25); transform: translateY(-1px); }

  /* TABS */
  .pk-tabs {
    display: flex; gap: 0;
    border-bottom: 1px solid var(--border2);
    overflow-x: auto; scrollbar-width: none;
    padding: 0 24px;
  }
  .pk-tabs::-webkit-scrollbar { display: none; }
  .pk-tab {
    font-family: var(--mono); font-size: 12px;
    padding: 10px 20px; color: var(--text3);
    cursor: pointer; border-bottom: 2px solid transparent;
    transition: all 0.15s; white-space: nowrap;
    background: none; border-top: none; border-left: none; border-right: none;
    display: flex; align-items: center; gap: 6px;
  }
  .pk-tab:hover { color: var(--text2); }
  .pk-tab.active { color: var(--green); border-bottom-color: var(--green); }
  .pk-tab-content { padding: 24px; }

  /* PROJECTS */
  .pk-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: 8px;
    overflow: hidden;
  }
  .pk-project-card {
    background: var(--bg2);
    padding: 24px;
    transition: background 0.2s;
    cursor: default;
  }
  .pk-project-card:hover { background: var(--bg3); }
  .pk-project-card:hover .pk-project-title { color: var(--green); }
  .pk-project-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; gap: 10px; }
  .pk-project-title { font-size: 13px; font-weight: 500; color: var(--text); transition: color 0.15s; }
  .pk-project-desc { font-size: 11.5px; color: var(--text2); line-height: 1.65; margin-bottom: 16px; }
  .pk-project-stats { display: flex; gap: 16px; margin-bottom: 14px; flex-wrap: wrap; }
  .pk-project-stat { font-size: 11px; color: var(--text3); }
  .pk-project-stat span { color: var(--green); font-weight: 500; }
  .pk-project-stack { display: flex; flex-wrap: wrap; gap: 5px; }
  .pk-stack-tag {
    font-size: 10px; padding: 2px 7px; border-radius: 3px;
    background: rgba(255,255,255,0.04); color: var(--text3);
    border: 1px solid var(--border); font-family: var(--mono);
  }

  /* SKILLS */
  .pk-skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }
  .pk-skill-group { }
  .pk-skill-group-title {
    font-size: 10px; color: var(--text3);
    text-transform: uppercase; letter-spacing: 2px;
    margin-bottom: 12px; display: flex; align-items: center; gap: 8px;
  }

  /* EXPERIENCE */
  .pk-exp-item {
    padding-left: 24px;
    margin-bottom: 40px;
    position: relative;
    border-left: 1px solid var(--border2);
  }
  .pk-exp-item::before {
    content: '';
    position: absolute;
    left: -4px; top: 8px;
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--green);
  }
  .pk-exp-company { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .pk-exp-role { font-size: 12px; color: var(--green); margin-bottom: 4px; }
  .pk-exp-period { font-size: 11px; color: var(--text3); margin-bottom: 14px; }
  .pk-exp-bullets { list-style: none; }
  .pk-exp-bullets li {
    font-size: 12.5px; color: var(--text2);
    line-height: 1.7; margin-bottom: 6px;
    padding-left: 14px; position: relative;
  }
  .pk-exp-bullets li::before { content: '▸'; position: absolute; left: 0; color: var(--green); }

  .pk-edu-box { margin-top: 32px; }
  .pk-edu-label {
    font-size: 10px; color: var(--text3);
    text-transform: uppercase; letter-spacing: 2px;
    margin-bottom: 16px;
  }
  .pk-edu-entry { padding: 16px; background: var(--bg3); border-radius: 6px; margin-bottom: 12px; }
  .pk-edu-name { font-size: 13px; color: var(--text); font-weight: 500; margin-bottom: 4px; }
  .pk-edu-degree { font-size: 11px; color: var(--blue); margin-bottom: 4px; }
  .pk-edu-period { font-size: 10px; color: var(--text3); }

  /* ACHIEVEMENTS */
  .pk-achieve-list { list-style: none; }
  .pk-achieve-list li {
    display: flex; align-items: flex-start; gap: 14px;
    padding: 16px 0; border-bottom: 1px solid var(--border);
    font-size: 12.5px; color: var(--text2); line-height: 1.55;
  }
  .pk-achieve-list li:last-child { border-bottom: none; }
  .pk-achieve-icon { font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .pk-achieve-title { color: var(--text); font-weight: 500; font-size: 13px; margin-bottom: 3px; }

  /* CONTACT */
  .pk-contact-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  }
  .pk-contact-item {
    padding: 16px; border-radius: 6px;
    background: var(--bg3);
    display: flex; align-items: center; gap: 12px;
    text-decoration: none; transition: background 0.15s;
  }
  .pk-contact-item:hover { background: var(--surface); }
  .pk-contact-icon { font-size: 18px; }
  .pk-contact-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
  .pk-contact-value { font-size: 11px; color: var(--green); font-family: var(--mono); }

  /* INTERACTIVE TERMINAL */
  .pk-iterm {
    background: #0d0d0d;
    border-radius: 0 0 10px 10px;
    padding: 24px 28px;
    font-family: var(--mono);
    font-size: 13px;
    line-height: 1.7;
    min-height: 320px;
  }
  .pk-term-out {
    min-height: 200px; margin-bottom: 16px;
    max-height: 360px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: var(--border2) transparent;
  }
  .pk-term-input-line { display: flex; align-items: center; }
  .pk-term-input {
    background: transparent; border: none; outline: none;
    font-family: var(--mono); font-size: 13px;
    color: var(--text); flex: 1; caret-color: var(--green);
  }
  .pk-term-hint { font-size: 11px; color: var(--text3); margin-top: 10px; }
  .pk-term-hint kbd {
    background: rgba(255,255,255,0.06); border: 1px solid var(--border2);
    border-radius: 3px; padding: 1px 5px;
    font-family: var(--mono); font-size: 10px; color: var(--text2);
  }

  /* DOCK */
  .pk-dock {
    position: fixed;
    bottom: 20px; left: 50%;
    transform: translateX(-50%);
    display: flex; gap: 6px;
    background: rgba(20,20,20,0.9);
    backdrop-filter: blur(20px);
    border: 1px solid var(--border2);
    border-radius: 16px;
    padding: 8px 14px;
    z-index: 999;
  }
  .pk-dock-item {
    width: 40px; height: 40px; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: transform 0.15s, background 0.15s;
    font-size: 20px; position: relative;
  }
  .pk-dock-item:hover { transform: translateY(-6px) scale(1.1); background: rgba(255,255,255,0.07); }
  .pk-dock-item .pk-dock-label {
    position: absolute; bottom: 48px; left: 50%; transform: translateX(-50%);
    background: rgba(20,20,20,0.95); color: var(--text2);
    font-size: 10px; padding: 3px 8px; border-radius: 4px;
    white-space: nowrap; opacity: 0; pointer-events: none;
    transition: opacity 0.15s; border: 1px solid var(--border2);
  }
  .pk-dock-item:hover .pk-dock-label { opacity: 1; }
  .pk-dock-divider { width: 1px; background: var(--border2); margin: 6px 2px; }

  @media (max-width: 600px) {
    .pk-hero-name { font-size: 36px; }
    .pk-projects-grid { grid-template-columns: 1fr; }
    .pk-hero-ascii { font-size: 7px; }
    .pk-hero-art { padding: 24px 20px; }
    .pk-tabs { padding: 0 16px; }
    .pk-tab-content { padding: 20px 16px; }
    .pk-desktop { padding-left: 16px; padding-right: 16px; }
  }
`;

const PROJECTS = [
  {
    title: "Brain Tumor Detection System",
    type: "ML / CV", typeColor: "purple",
    desc: "Deep learning classification system to detect brain tumors from MRI scans. Hybrid ensemble of DenseNet121 and Inception-V3 with Grad-CAM explainability on 800+ labeled images.",
    stats: [["Accuracy","94%+"],["Generalization","+18%"],["Dataset","800+ imgs"]],
    stack: ["Python","TensorFlow","Keras","OpenCV","DenseNet121","Inception-V3","Grad-CAM"],
  },
  {
    title: "Tyre Marking Detection & Inspection",
    type: "CV / Automation", typeColor: "orange",
    desc: "Production-ready CV pipeline for tyre sidewall marking detection and extraction. Custom YOLOv8 model trained on 500+ annotated images with automated PDF report generation.",
    stats: [["Manual time","-50%"],["Training data","500+ imgs"]],
    stack: ["Python","YOLOv8","OpenCV","EasyOCR","Regex","PDF Gen"],
  },
  {
    title: "BaggageBugs",
    type: "Fullstack", typeColor: "blue",
    desc: "Fullstack luggage storage management platform with real-time facility listings, booking workflows, and Google Maps integration. Booking efficiency improved by 40%.",
    stats: [["APIs built","50+"],["Booking efficiency","+40%"]],
    stack: ["React.js","Node.js","Express","MongoDB","Google Maps API"],
  },
  {
    title: "Nagrik Aur Sambhidhan (NaS)",
    type: "Civic Ed", typeColor: "green",
    desc: "Interactive platform to educate users about the Indian Constitution. Digital book interface with gamified quizzes, bilingual support (English + Hindi), and visual storytelling.",
    stats: [["Languages","2"],["Modules","Quizzes + Book"]],
    stack: ["React.js","Node.js","MongoDB","react-i18next","HTML5 Games"],
  },
  {
    title: "Assemble",
    type: "Analytics", typeColor: "pink",
    desc: "Fullstack analytics dashboard with real-time data access, integrated MongoDB backend services, and 25+ REST APIs for booking, auth, and facility management modules.",
    stats: [["APIs built","25+"],["Stack","MERN"]],
    stack: ["React.js","MongoDB","Express","Node.js"],
  },
];

const SKILLS = [
  { label: "ML / Deep Learning", color: "purple", dot: "#bf5af2", tags: ["TensorFlow","Keras","PyTorch","Scikit-learn","YOLOv8","OpenCV","EasyOCR"] },
  { label: "Web Development",    color: "blue",   dot: "#5ac8fa", tags: ["React.js","Node.js","Express.js","Tailwind CSS","Spring Boot","MongoDB"] },
  { label: "Languages",          color: "green",  dot: "#3ddc84", tags: ["Python","JavaScript","Java","C/C++","SQL","HTML/CSS"] },
  { label: "Data & Visualization",color:"orange", dot: "#ff9f0a", tags: ["NumPy","Pandas","Matplotlib","Seaborn","SciPy"] },
  { label: "Concepts",           color: "pink",   dot: "#ff6b9d", tags: ["Computer Vision","Transfer Learning","NLP","CNN","Object Detection","OCR","RESTful APIs"] },
  { label: "Tools",              color: "gray",   dot: "#686868", tags: ["Git","Docker","VS Code","Jupyter","Google Colab","GitHub"] },
];

const ACHIEVEMENTS = [
  { icon: "🏆", title: "Winner — NITSilchar Hacks 2023", desc: "National-level hackathon focused on innovation and fullstack web development, competing among 200+ teams." },
  { icon: "🥇", title: "Gold — JUET Badminton Bidding League 2023", desc: "Top-tier athletic performance and strategic team play in the university-level competitive league." },
  { icon: "🥈", title: "Silver — JUET Badminton Bidding League 2024", desc: "Consistent performance and sportsmanship demonstrating leadership under pressure." },
  { icon: "📜", title: "MERN Stack Bootcamp — Angela Yu, Udemy (2024)", desc: "Full-stack development with hands-on project delivery across the complete MERN ecosystem." },
  { icon: "📜", title: "Front-end Development Certificate — Great Learning", desc: "Modern UI development, component design, and deployment best practices." },
  { icon: "📜", title: "Advanced Python Programming — Infosys Springboard", desc: "OOP, file handling, data structures, and algorithm design with hands-on modules." },
];

const TERM_COMMANDS = {
  help: () => `<span style="color:#3ddc84">Available commands:</span>
  <span style="color:#5ac8fa">whoami</span>        — about Pratham
  <span style="color:#5ac8fa">ls projects</span>  — list all projects
  <span style="color:#5ac8fa">skills</span>       — technical skills
  <span style="color:#5ac8fa">experience</span>   — work history
  <span style="color:#5ac8fa">contact</span>      — get in touch
  <span style="color:#5ac8fa">achievements</span> — hackathons & awards
  <span style="color:#5ac8fa">clear</span>        — clear terminal
  <span style="color:#5ac8fa">neofetch</span>     — system info`,

  whoami: () => `<span style="color:#3ddc84">Pratham Karmarkar</span>
Fullstack Developer & ML Engineer
B.Tech CSE @ JUET, Guna (2023–2027)
Currently: Fullstack Dev @ AS Airspace Travels Pvt. Ltd.
Email: <span style="color:#5ac8fa">karmarkarpratham46@gmail.com</span>
Phone: <span style="color:#5ac8fa">+91 6260729359</span>`,

  "ls projects": () => `<span style="color:#bf5af2">drwxr-xr-x</span>  Brain Tumor Detection System    <span style="color:#3ddc84">[ML/CV]</span>
<span style="color:#bf5af2">drwxr-xr-x</span>  Tyre Marking Detection          <span style="color:#ff9f0a">[CV/Automation]</span>
<span style="color:#bf5af2">drwxr-xr-x</span>  BaggageBugs                     <span style="color:#5ac8fa">[Fullstack]</span>
<span style="color:#bf5af2">drwxr-xr-x</span>  Nagrik Aur Sambhidhan (NaS)     <span style="color:#3ddc84">[Civic Ed]</span>
<span style="color:#bf5af2">drwxr-xr-x</span>  Assemble (Analytics Dashboard)  <span style="color:#ff6b9d">[Analytics]</span>`,

  skills: () => `<span style="color:#3ddc84">ML/DL:</span>     TensorFlow · Keras · PyTorch · Scikit-learn · YOLOv8 · OpenCV
<span style="color:#5ac8fa">Web:</span>       React.js · Node.js · Express.js · MongoDB · Tailwind CSS
<span style="color:#bf5af2">Languages:</span> Python · JavaScript · Java · C/C++ · SQL · HTML/CSS
<span style="color:#ff9f0a">Data:</span>      NumPy · Pandas · Matplotlib · Seaborn · SciPy
<span style="color:#ff6b9d">Concepts:</span>  Computer Vision · Transfer Learning · NLP · CNN · OCR`,

  experience: () => `<span style="color:#3ddc84">AS Airspace Travels Pvt. Ltd.</span>
  Role:   Fullstack Developer (Full-time)
  Period: Jan 2025 – Present
  Stack:  React.js · Tailwind CSS · Node.js · MongoDB
  ▸ Reduced manual inquiry handling by <span style="color:#3ddc84">60%</span>
  ▸ Improved SEO & engagement by <span style="color:#3ddc84">35%</span>`,

  contact: () => `<span style="color:#3ddc84">Email:    </span> karmarkarpratham46@gmail.com
<span style="color:#5ac8fa">Phone:    </span> +91 6260729359
<span style="color:#bf5af2">Location: </span> Bhopal, Madhya Pradesh, India`,

  achievements: () => `🏆 <span style="color:#ffd60a">Winner</span> — NITSilchar Hacks 2023 (200+ teams)
🥇 <span style="color:#ffd60a">Gold</span>   — JUET Badminton Bidding League 2023
🥈 <span style="color:#5ac8fa">Silver</span> — JUET Badminton Bidding League 2024
📜 <span style="color:#3ddc84">Cert</span>   — MERN Stack Bootcamp (Angela Yu, Udemy 2024)
📜 <span style="color:#3ddc84">Cert</span>   — Front-end Dev Certificate, Great Learning
📜 <span style="color:#3ddc84">Cert</span>   — Advanced Python, Infosys Springboard`,

  neofetch: () => `<span style="color:#3ddc84">pratham</span>@<span style="color:#5ac8fa">portfolio</span>
-----------------
<span style="color:#3ddc84">OS:</span>      macOS Sequoia 15.4
<span style="color:#3ddc84">Host:</span>    MacBook Pro (M2)
<span style="color:#3ddc84">Shell:</span>   zsh 5.9
<span style="color:#3ddc84">Stack:</span>   MERN + PyTorch + YOLOv8
<span style="color:#3ddc84">Role:</span>    Fullstack Dev & ML Engineer
<span style="color:#3ddc84">Degree:</span>  B.Tech CSE (2023–2027)
<span style="color:#3ddc84">Hacks:</span>   NITSilchar 2023 Winner 🏆
<span style="color:#3ddc84">Sports:</span>  Badminton (Gold 🥇, Silver 🥈)

<span style="color:#ff5f57">●</span> <span style="color:#febc2e">●</span> <span style="color:#28c840">●</span>`,
};

function Traffic() {
  return (
    <div className="pk-traffic">
      <span className="pk-t-red" />
      <span className="pk-t-yellow" />
      <span className="pk-t-green" />
    </div>
  );
}

function Window({ id, titleIcon, title, children }) {
  return (
    <div className="pk-window" id={id}>
      <div className="pk-titlebar">
        <Traffic />
        <div className="pk-win-title">{titleIcon} {title}</div>
      </div>
      {children}
    </div>
  );
}

function HeroWindow() {
  return (
    <Window id="win-hero" titleIcon="👤" title="pratham@portfolio ~ bash">
      <div className="pk-hero-art">
        <pre className="pk-hero-ascii">{}
        </pre>
        <div className="pk-hero-name">Pratham <span>Karmarkar</span></div>
        <div className="pk-hero-role">Fullstack Developer &amp; ML Engineer</div>
        <div className="pk-badges">
          {[
            ["Fullstack Developer","green"],
            ["ML Engineer","blue"],
            ["Computer Vision","purple"],
            ["MERN Stack","orange"],
            ["Deep Learning","pink"],
          ].map(([label, color]) => (
            <span key={label} className={`pk-badge pk-badge-${color}`}>{label}</span>
          ))}
        </div>
        <div className="pk-hero-links">
          <a href="mailto:karmarkarpratham46@gmail.com" className="pk-btn pk-btn-primary">✉ get in touch</a>
          <a href="https://github.com/PRATHAMKARMARKAR" className="pk-btn pk-btn-ghost">⌥ github</a>
          <a href="https://www.linkedin.com/public-profile/settings/?trk=d_flagship3_profile_self_view_public_profile&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BHKwx7jB3TxCT5D9ZR7dgIQ%3D%3D" className="pk-btn pk-btn-ghost">⌘ linkedin</a>
        </div>
      </div>
    </Window>
  );
}

function ProjectsTab() {
  return (
    <div className="pk-projects-grid">
      {PROJECTS.map((p) => (
        <div key={p.title} className="pk-project-card">
          <div className="pk-project-header">
            <div className="pk-project-title">{p.title}</div>
            <span className={`pk-badge pk-badge-${p.typeColor}`} style={{ fontSize: 10, padding: "2px 8px" }}>{p.type}</span>
          </div>
          <div className="pk-project-desc">{p.desc}</div>
          <div className="pk-project-stats">
            {p.stats.map(([label, val]) => (
              <div key={label} className="pk-project-stat">{label} <span>{val}</span></div>
            ))}
          </div>
          <div className="pk-project-stack">
            {p.stack.map((s) => <span key={s} className="pk-stack-tag">{s}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsTab() {
  return (
    <div className="pk-skills-grid">
      {SKILLS.map((g) => (
        <div key={g.label} className="pk-skill-group">
          <div className="pk-skill-group-title">
            <span style={{ color: g.dot }}>●</span> {g.label}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {g.tags.map((tag) => (
              <span key={tag} className={`pk-badge pk-badge-${g.color}`} style={{ fontSize: 11, padding: "3px 9px" }}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceTab() {
  return (
    <>
      <div className="pk-exp-item">
        <div className="pk-exp-company">AS Airspace Travels Pvt. Ltd.</div>
        <div className="pk-exp-role">Fullstack Developer — Full-time</div>
        <div className="pk-exp-period">Jan 2025 – Present &nbsp;·&nbsp; Bhopal, India</div>
        <ul className="pk-exp-bullets">
          <li>Designed and deployed the official company website using React.js, Tailwind CSS, Node.js, and MongoDB — improving online presence and lead generation.</li>
          <li>Built RESTful APIs and responsive UI components integrating dynamic content and contact workflows, reducing manual inquiry handling by 60%.</li>
          <li>Optimized page load performance and implemented analytics integration, boosting SEO ranking and user engagement metrics by 35%.</li>
        </ul>
      </div>
      <div className="pk-edu-box">
        <div className="pk-edu-label">Education</div>
        <div className="pk-edu-entry">
          <div className="pk-edu-name">Jaypee University of Engineering and Technology</div>
          <div className="pk-edu-degree">B.Tech — Computer Science & Engineering</div>
          <div className="pk-edu-period">Aug 2023 – Jun 2027 &nbsp;·&nbsp; Guna, MP</div>
        </div>
        <div className="pk-edu-entry" style={{ marginBottom: 0 }}>
          <div className="pk-edu-name">Sagar Public School</div>
          <div className="pk-edu-degree">CBSE Class XII</div>
          <div className="pk-edu-period">2021 – 2023 &nbsp;·&nbsp; Bhopal, MP</div>
        </div>
      </div>
    </>
  );
}

function AchievementsTab() {
  return (
    <ul className="pk-achieve-list">
      {ACHIEVEMENTS.map((a) => (
        <li key={a.title}>
          <span className="pk-achieve-icon">{a.icon}</span>
          <div>
            <div className="pk-achieve-title">{a.title}</div>
            {a.desc}
          </div>
        </li>
      ))}
    </ul>
  );
}

function ContactTab() {
  const contacts = [
    { icon: "✉", label: "Email", value: "karmarkarpratham46@gmail.com", href: "mailto:karmarkarpratham46@gmail.com" },
    { icon: "📞", label: "Phone", value: "+91 6260729359", href: "tel:+916260729359" },
    { icon: "⌥", label: "GitHub", value: "github.com/pratham", href: "[github.com](https://github.com)" },
    { icon: "⌘", label: "LinkedIn", value: "linkedin.com/in/pratham", href: "[linkedin.com](https://linkedin.com)" },
    { icon: "📍", label: "Location", value: "Bhopal, Madhya Pradesh, IN", href: "#" },
  ];
  return (
    <div className="pk-contact-grid">
      {contacts.map((c) => (
        <a key={c.label} href={c.href} className="pk-contact-item">
          <span className="pk-contact-icon">{c.icon}</span>
          <div>
            <div className="pk-contact-label">{c.label}</div>
            <div className="pk-contact-value">{c.value}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

const TABS = [
  { id: "projects",      label: "📦 projects",      Content: ProjectsTab },
  { id: "skills",        label: "⚙ skills",         Content: SkillsTab },
  { id: "experience",    label: "💼 experience",    Content: ExperienceTab },
  { id: "achievements",  label: "🏆 achievements",  Content: AchievementsTab },
  { id: "contact",       label: "✉ contact",        Content: ContactTab },
];

function MainWindow({ activeTab, setActiveTab }) {
  return (
    <Window id="win-main" titleIcon="📁" title="pratham — projects & skills">
      <div className="pk-tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`pk-tab${activeTab === t.id ? " active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pk-tab-content">
        {TABS.map(({ id, Content }) => activeTab === id && <Content key={id} />)}
      </div>
    </Window>
  );
}

function TerminalWindow() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight;
  }, [lines]);

  function promptHtml(cmd) {
    return `<span style="color:#3ddc84">pratham</span><span style="color:#686868">@</span><span style="color:#5ac8fa">portfolio</span><span style="color:#686868">:</span><span style="color:#bf5af2">~</span><span style="color:#a0a0a0"> $ </span><span style="color:#e8e8e8">${cmd}</span>`;
  }

  function runCommand(raw) {
    if (!raw.trim()) return;
    const newHistory = [raw, ...history];
    setHistory(newHistory);
    setHistIdx(-1);
    const fn = TERM_COMMANDS[raw.toLowerCase()];
    if (raw.toLowerCase() === "clear") {
      setLines([]);
      return;
    }
    const output = fn
      ? fn()
      : `<span style="color:#ff453a">zsh: command not found: ${raw}</span>\nType <span style="color:#3ddc84">help</span> for available commands.`;
    setLines((prev) => [...prev, { prompt: promptHtml(raw), output }]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx >= 0 ? history[idx] : "");
    }
  }

  return (
    <Window id="win-term" titleIcon="💻" title="interactive — Terminal — 80×24">
      <div className="pk-iterm" onClick={() => inputRef.current?.focus()}>
        <div className="pk-term-out" ref={outRef}>
          <div style={{ color: "#686868", fontSize: 12, marginBottom: 12 }}>
            Welcome to Pratham's interactive terminal. Type{" "}
            <span style={{ color: "#3ddc84" }}>help</span> to see available commands.
          </div>
          {lines.map((line, i) => (
            <div key={i} style={{ marginBottom: 8, fontSize: "12.5px", lineHeight: 1.7 }}>
              <div dangerouslySetInnerHTML={{ __html: line.prompt }} />
              <div dangerouslySetInnerHTML={{ __html: line.output }} style={{ whiteSpace: "pre-wrap" }} />
            </div>
          ))}
        </div>
        <div className="pk-term-input-line">
          <span style={{ color: "#3ddc84" }}>pratham</span>
          <span style={{ color: "#686868" }}>@</span>
          <span style={{ color: "#5ac8fa" }}>portfolio</span>
          <span style={{ color: "#686868" }}>:</span>
          <span style={{ color: "#bf5af2" }}>~</span>
          <span style={{ color: "#a0a0a0" }}>&nbsp;$&nbsp;</span>
          <input
            ref={inputRef}
            className="pk-term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type a command..."
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <div className="pk-term-hint">
          Try: <kbd>help</kbd> &nbsp; <kbd>whoami</kbd> &nbsp; <kbd>ls projects</kbd> &nbsp; <kbd>skills</kbd> &nbsp; <kbd>contact</kbd> &nbsp; <kbd>clear</kbd>
        </div>
      </div>
    </Window>
  );
}

function Dock({ setActiveTab }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const items = [
    { icon: "🏠", label: "Home",       action: () => scrollTo("win-hero") },
    { icon: "📦", label: "Projects",   action: () => { setActiveTab("projects"); scrollTo("win-main"); } },
    { icon: "⚙", label: "Skills",     action: () => { setActiveTab("skills"); scrollTo("win-main"); } },
    { icon: "💼", label: "Experience", action: () => { setActiveTab("experience"); scrollTo("win-main"); } },
    null,
    { icon: "💻", label: "Terminal",   action: () => scrollTo("win-term") },
    { icon: "✉", label: "Contact",    action: () => { setActiveTab("contact"); scrollTo("win-main"); } },
  ];

  return (
    <div className="pk-dock">
      {items.map((item, i) =>
        item === null ? (
          <div key={i} className="pk-dock-divider" />
        ) : (
          <div key={item.label} className="pk-dock-item" onClick={item.action}>
            {item.icon}
            <span className="pk-dock-label">{item.label}</span>
          </div>
        )
      )}
    </div>
  );
}

export default function PrathamPortfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [clock, setClock] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setClock(now.toLocaleString("en-IN", {
        weekday: "short", 
        day: "numeric",
        month: "short", 
        hour: "2-digit", 
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    };
    update();
    const t = setInterval(update, 1000); // Update every second for real-time
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pk-root">
      <style>{CSS}</style>

      {/* Menu Bar - Simplified */}
      <div className="pk-menubar">
        <span className="pk-menubar-logo">&#63743;</span>
        <div className="pk-menubar-right">
          <span style={{ fontSize: 12 }}>{clock}</span>
        </div>
      </div>

      {/* Desktop */}
      <div className="pk-desktop">
        <HeroWindow />
        <MainWindow activeTab={activeTab} setActiveTab={setActiveTab} />
        <TerminalWindow />
      </div>

      <Dock setActiveTab={setActiveTab} />
    </div>
  );
}
