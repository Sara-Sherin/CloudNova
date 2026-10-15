
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="CloudNova - Node.js, Docker, Jenkins and AWS deployment project">
<title>CloudNova | Cloud & DevOps</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Arial,sans-serif;background:#0b1120;color:#f8fafc;line-height:1.7}
a{color:inherit;text-decoration:none}
header{max-width:1180px;margin:auto;padding:24px 25px;display:flex;justify-content:space-between;align-items:center;gap:20px}
.logo{font-size:25px;font-weight:800;letter-spacing:-1px}
.logo span{color:#60a5fa}
nav{display:flex;gap:25px;font-size:14px;color:#cbd5e1}
nav a:hover{color:#60a5fa}
.hero{max-width:1180px;margin:auto;padding:95px 25px 110px;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:55px}
.tag{display:inline-block;border:1px solid #334155;background:#172554;color:#93c5fd;border-radius:30px;padding:5px 14px;font-size:13px}
h1{font-size:clamp(43px,6vw,70px);line-height:1.08;letter-spacing:-2.5px;margin:24px 0}
.gradient{background:linear-gradient(90deg,#38bdf8,#818cf8,#c084fc);color:transparent;background-clip:text}
.intro{font-size:18px;color:#b8c4d8;max-width:560px}
.actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}
.btn{padding:12px 21px;border-radius:10px;font-weight:bold;font-size:14px;display:inline-block;border:1px solid #3b82f6}
.primary{background:linear-gradient(90deg,#2563eb,#7c3aed);border:0}
.secondary{background:#101a2e}
.visual{border:1px solid #243858;border-radius:28px;padding:30px;background:radial-gradient(ellipse at center,#172e61,#101a2e 65%);text-align:center}
.cloud{font-size:105px;line-height:1.5;filter:drop-shadow(0 0 25px #3b82f6)}
.visual h2{font-size:25px;margin-top:12px}
.visual p{color:#9fb1cb;font-size:14px;margin-top:8px}
.pills{display:flex;justify-content:center;flex-wrap:wrap;gap:9px;margin-top:23px}
.pills span{border:1px solid #344968;border-radius:8px;padding:5px 10px;font-size:12px;color:#bfdbfe}
section{padding:75px 25px}
.section-inner{max-width:1180px;margin:auto}
.section-heading{text-align:center;margin-bottom:40px}
.eyebrow{font-size:12px;letter-spacing:3px;color:#818cf8;font-weight:bold}
h2{font-size:34px;line-height:1.25;margin-top:9px}
.sub{color:#9caec6;margin-top:10px}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.card{background:#111c30;border:1px solid #263955;padding:26px;border-radius:15px;transition:.2s}
.card:hover{transform:translateY(-4px);border-color:#4f8ee8}
.card .symbol{font-size:30px}
.card h3{margin:10px 0 5px;font-size:19px}
.card p{color:#9caec6;font-size:14px}
.about{background:#101a2b}
.about-content{max-width:780px;margin:auto;text-align:center}
.about-content p{color:#b8c4d8;margin-top:17px}
.status{display:inline-flex;align-items:center;gap:8px;border:1px solid #245d4b;background:#10372f;color:#86efac;padding:8px 13px;border-radius:30px;margin-top:25px;font-size:13px}
.dot{width:8px;height:8px;background:#4ade80;border-radius:50%}
footer{max-width:1180px;margin:auto;padding:26px 25px;display:flex;justify-content:space-between;gap:15px;flex-wrap:wrap;color:#8494ad;font-size:13px}
@media(max-width:760px){
 header{flex-direction:column;align-items:flex-start}
 nav{gap:15px;flex-wrap:wrap}
 .hero{grid-template-columns:1fr;padding-top:55px;gap:38px}
 .cards{grid-template-columns:1fr}
 h1{letter-spacing:-1.5px}
 h2{font-size:29px}
 .visual{padding:25px}
}
</style>
</head>
<body>
<header>
<a class="logo" href="#">☁ Cloud<span>Nova</span></a>
<nav>
<a href="#home">Home</a>
<a href="#about">About</a>
<a href="#services">Services</a>
<a href="#stack">Tech Stack</a>
</nav>
</header>

<main>
<section class="hero" id="home">
<div>
<span class="tag">CLOUD & DEVOPS PROJECT</span>
<h1>Build. Deploy.<br><span class="gradient">Scale with CloudNova.</span></h1>
<p class="intro">A modern Node.js application showcasing containerization, automated testing, CI/CD pipelines and cloud deployment using AWS.</p>
<div class="actions">
<a class="btn primary" href="#stack">Explore the project ↗</a>
<a class="btn secondary" href="/health">Check application health</a>
</div>
<div class="status"><span class="dot"></span> Application endpoint available</div>
</div>
<div class="visual">
<div class="cloud">☁</div>
<h2>Cloud-native deployment</h2>
<p>From code commit to cloud delivery.</p>
<div class="pills">
<span>Node.js</span><span>Docker</span><span>Jenkins</span>
<span>AWS ECS</span><span>Jest</span><span>GitHub</span>
</div>
</div>
</section>

<section id="services" class="about">
<div class="section-inner">
<div class="section-heading">
<div class="eyebrow">WHAT WE BUILD</div>
<h2>Designed for modern delivery</h2>
<p class="sub">A practical demonstration of core DevOps engineering workflows.</p>
</div>
<div class="cards">
<article class="card"><div class="symbol">⚙️</div><h3>CI/CD Automation</h3><p>Automate application testing and deployment with Jenkins pipelines.</p></article>
<article class="card"><div class="symbol">📦</div><h3>Containerization</h3><p>Package application code and dependencies into Docker images.</p></article>
<article class="card"><div class="symbol">☁️</div><h3>Cloud Deployment</h3><p>Publish images to Amazon ECR and run containers on Amazon ECS.</p></article>
</div>
</div>
</section>

<section id="stack">
<div class="section-inner">
<div class="section-heading">
<div class="eyebrow">OUR TOOLKIT</div>
<h2>Technologies in the stack</h2>
<p class="sub">Tools used to build, test, package and deploy CloudNova.</p>
</div>
<div class="cards">
<article class="card"><div class="symbol">🟢</div><h3>Node.js</h3><p>JavaScript application runtime.</p></article>
<article class="card"><div class="symbol">🐳</div><h3>Docker</h3><p>Consistent application containers.</p></article>
<article class="card"><div class="symbol">🔧</div><h3>Jenkins</h3><p>Continuous integration and delivery.</p></article>
<article class="card"><div class="symbol">☁️</div><h3>AWS ECS / ECR</h3><p>Container hosting and image registry.</p></article>
<article class="card"><div class="symbol">🧪</div><h3>Jest</h3><p>Automated application testing.</p></article>
<article class="card"><div class="symbol">🐙</div><h3>GitHub</h3><p>Version control and webhook triggers.</p></article>
</div>
</div>
</section>

<section id="about" class="about">
<div class="about-content">
<div class="eyebrow">ABOUT CLOUDNOVA</div>
<h2>From local development to the cloud</h2>
<p>CloudNova is a hands-on DevOps learning project. The goal is to establish a repeatable delivery pipeline, verify application quality with automated tests, and deploy a containerized service to AWS.</p>
<a class="btn primary" href="/health" style="margin-top:25px">Verify application ↗</a>
</div>
</section>
</main>

<footer>
<a class="logo" href="#">☁ Cloud<span>Nova</span></a>
<p>Built with Node.js · Docker · Jenkins · AWS</p>
<p>Automate · Deploy · Scale</p>
</footer>
</body>
</html>`);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    application: 'CloudNova'
  });
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CloudNova is running on port ${PORT}`);
  });
}

module.exports = app;
