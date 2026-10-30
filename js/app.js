document.addEventListener('DOMContentLoaded', (event) => {
  const darkmQ = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkmQ['matches']) {
    // document.getElementById('karive').classList.add("dark_mode");
  }
  StartEnvelope();
  FillWebsite();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("dateShow");
      }
      else {
        entry.target.classList.remove("dateShow");
      }
    });
  });
  const hiddenEllements = document.querySelectorAll('.dateBox');
  hiddenEllements.forEach((el) => observer.observe(el));
  //
  const observerX = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("riseUp");
      }
    });
  });
  const hiddenEllementsX = document.querySelectorAll('.riseDown');
  hiddenEllementsX.forEach((el) => observerX.observe(el));
  //
  const observerXX = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("wiggleUp");
      }
    });
  });
  const wiggleElement = document.querySelectorAll('.wiggle');
  wiggleElement.forEach((el) => observerXX.observe(el));
  scroollMove();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    let width = window.innerWidth;
    // window.document.getElementsByTagName('html')[0].style.width = `${width}px`;
  }
});
function StartEnvelope() {
  const width = window.innerWidth;
  const hieght = window.innerHeight;
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  let segments = ["left", "right", "down", "up"];
  let envelope = creatanelemn(`div`, `envelope envelopeTBG`, `envelope`, ``, ``, ``, ``, ``, "", ``, ``, ``);
  if (hieght > width) {
    for (var i = 0; i < segments.length; i++) {
      let clas = "env" + segments[i];
      let link = `envelope/${segments[i]}.png`;
      let img = creatanelemn(`img`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
      img.setAttribute("src", link);
      let seg = creatanelemn(`div`, clas, `id`, ``, ``, ``, ``, ``, img, ``, ``, ``);
      envelope.appendChild(seg);
    }
  }
  else {
    let switcher = {"left": "up", "right": "down", "down": "left", "up": "right"}
    for (var i = 0; i < segments.length; i++) {
      let clas = "env" + segments[i];
      let link = `envelope/${segments[i]}-flipped.png`;
      let img = creatanelemn(`img`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
      img.setAttribute("src", link);
      let seg = creatanelemn(`div`, clas, `id`, ``, ``, ``, ``, ``, img, ``, ``, ``);
      envelope.appendChild(seg);
    }
  }
  let imgs = creatanelemn(`img`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
  imgs.setAttribute("src", "envelope/stamp.png");
  let arrow = creatanelemn(`img`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
  arrow.setAttribute("src", "envelope/d.png");
  let textarw = creatanelemn(`p`, `arrowT`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `Click to open`);
  let arrowHold = creatanelemn(`div`, `arrowS`, ``, ``, ``, ``, ``, ``, arrow, ``, ``, ``);
  arrowHold.appendChild(textarw);
  let arrowMHold = creatanelemn(`div`, `arrowM`, `arrowM`, ``, ``, ``, ``, ``, arrowHold, ``, ``, ``);
  let shold = creatanelemn(`div`, `stampholder`, ``, ``, ``, ``, ``, ``, imgs, ``, ``, ``);
  let firstletter = creatanelemn(`p`, `envfrt`, ``, ``, ``, ``, ``, ``, ``, ``, ``, weddingObj["g"]);
  let seconletter = creatanelemn(`p`, `envsec`, ``, ``, ``, ``, ``, ``, ``, ``, ``, weddingObj["b"]);
  let ands = creatanelemn(`p`, `envand`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `&`);
  shold.appendChild(firstletter);shold.appendChild(ands);shold.appendChild(seconletter);
  let stamp = creatanelemn(`div`, ``, `stamp`, ``, ``, ``, ``, ``, shold, `OpenEnvelope()`, ``, ``);
  envelope.appendChild(stamp);
  envelope.appendChild(arrowMHold);
  document.getElementsByTagName('body')[0].appendChild(envelope);
  stampPulsing = gsap.to('#stamp', {scale:1.05, filter:'drop-shadow(0 0 8px gold)', duration:1.2, repeat:-1, yoyo:true});
  arrowPulsing = gsap.to('#arrowM', {scale:1.05, y:-5, duration:1.2, repeat:-1, yoyo:true});
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  disableScroll();
}
function disableScroll() {
  document.body.classList.add('stop-scrolling');
}
function enablescrollback() {
  document.body.classList.remove('stop-scrolling');
}
function OpenEnvelope() {
  document.getElementById('stamp').style.pointerEvents = "none";
  document.getElementById('arrowM').style.pointerEvents = "none";
  const hieght = window.innerHeight;
  setTimeout(() => spawnPetals(), 600);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.getElementsByClassName('envelope')[0].classList.remove('envelopeTBG');
  gsap.to('#stamp', {opacity:0, scale:0.8, duration:0.3});
  gsap.to('#arrowM', {opacity:0, scale:0.8, duration:0.3});
  gsap.to('.envup', {rotationX: -110, transformOrigin: "top center", duration:0.8});
  gsap.to('.envleft , .envdown , .envright', {y:hieght, duration:1.1, delay:0.12});
  stampPulsing.kill();arrowPulsing.kill();
  enablescrollback();
  setTimeout(function () {
    document.getElementById('envelope').remove();
  }, 2000);
  document.getElementById('invitation-audio').setAttribute("src", "Sounds/s1.mp3");
  document.getElementById('invitation-audio').play();
  document.getElementById('playButton').setAttribute("src", "img/ps.png");
  document.querySelector('.playButtonDiv').setAttribute("onclick", "mediaControl('ps')");
}
function scroollMove() {
  gsap.to('#upndown', {scale:1.05, y:7, duration:1.2, repeat:-1, yoyo:true});
}
function creatanelemn(kng, clss, id, name, style, title, type, value, elem, onclick, disabled, innertext) {
  //creatanelemn(`kng`, `clss`, `id`, `name`, `style`, `title`, `type`, `value`, `elem`, `onclick`, `disabled`, `innertext`);
  const kingbck = document.createElement(kng)
  if (clss != "") {
    kingbck.setAttribute('class', clss);
  }
  if (id != "") {
    kingbck.setAttribute('id', id);
  }
  if (name != "") {
    kingbck.setAttribute('name', name);
  }
  if (style != "") {
    kingbck.setAttribute('style', style);
  }
  if (title != "") {
    kingbck.setAttribute('title', title);
  }
  if (type != "") {
    kingbck.setAttribute('type', type);
  }
  if (value != "") {
    kingbck.setAttribute('value', value);
  }
  if (onclick != "") {
    kingbck.setAttribute('onclick', onclick);
  }
  if (disabled != "") {
    kingbck.setAttribute('disabled', disabled);
  }
  if (innertext != "") {
    kingbck.innerText = innertext;
  }
  if (elem != "") {
    kingbck.appendChild(elem);
  }
  return kingbck
}
function mediaControl(media) {
  if (media == "ps") {
    document.getElementById('playButton').setAttribute("src", "img/pl.png");
    document.querySelector('.playButtonDiv').setAttribute("onclick", "mediaControl('pl')");
    document.getElementById('invitation-audio').pause();
  }
  else if (media == "pl") {
    document.getElementById('playButton').setAttribute("src", "img/ps.png");
    document.querySelector('.playButtonDiv').setAttribute("onclick", "mediaControl('ps')");
    document.getElementById('invitation-audio').play();
  }
}
function spawnPetals(count = 14) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layer = document.getElementById('petalLayer');
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('img');
      p.src = 'themes/tlemcen/petal.png'; // swap folder with your theme
      p.className = 'petal';
      layer.appendChild(p);

      const dur = gsap.utils.random(4, 6);
      const delay = gsap.utils.random(0, 1.5);

      gsap.set(p, {
        x: gsap.utils.random(0, w),
        scale: gsap.utils.random(0.6, 1.2),
        rotation: gsap.utils.random(0, 360)
      });

      gsap.to(p, {
        y: h + 80,
        x: '+=' + gsap.utils.random(-120, 120),
        rotation: '+=' + gsap.utils.random(180, 540),
        duration: dur,
        delay: delay,
        ease: 'sine.inOut',
        onComplete: () => p.remove()
      });

      // fade out during the last second
      gsap.to(p, { opacity: 0, duration: 1, delay: delay + dur - 1 });
    }
}
function ChangeLang(lan) {
  let container = document.querySelector('#langCon');
  let lanCon = document.getElementById(`langCon${lan.toUpperCase()}`);
  lanCon.setAttribute('class', 'langHdS');
  if (lan == "e") {
    container.setAttribute('class', 'langE');
    document.querySelector('#langConA').setAttribute('class', 'langHd');
    document.querySelector('#langConF').setAttribute('class', 'langHd');
    document.querySelector('html').setAttribute('lang', 'en');
  }
  else if (lan == "a") {
    container.setAttribute('class', 'langA');
    document.querySelector('#langConE').setAttribute('class', 'langHd');
    document.querySelector('#langConF').setAttribute('class', 'langHd');
    document.querySelector('html').setAttribute('lang', 'ar');
  }
  else if (lan == "f") {
    container.setAttribute('class', 'langF');
    document.querySelector('#langConA').setAttribute('class', 'langHd');
    document.querySelector('#langConE').setAttribute('class', 'langHd');
    document.querySelector('html').setAttribute('lang', 'fr');
  }
  if (lan == "a") {
    document.querySelector('html').setAttribute('dir', 'rtl');
  }
  else {
    document.querySelector('html').setAttribute('dir', 'ltr');
  }
}
function FillWebsite() {
  let tKeys = Object.keys(lang);
  let idS = ["WD", "groom", "and", "bride", "scdn", "invConTxt", "TCBI", "TitleTL", "DBC", "seeuSon"];
  for (var i = 0; i < idS.length; i++) {
    document.querySelector(`#${idS[i]}`).innerText = lang[tKeys[i]];
  }
}
let weddingObj = {
  "g": "C",
  "b": "R",
}
let lang = {
  "event": "Wedding Day",
  "groom": "Groom",
  "and": "&",
  "bride": "Bride",
  "scrol": "Scroll Down",
  "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "tcbi": "The Celebration Begins In",
  "tl": "Time Line",
  "dbc": "Don't BRING Children\n DON'T",
  "fl": "looking forward to seeing you"
}
