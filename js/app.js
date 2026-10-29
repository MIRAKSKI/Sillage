document.addEventListener('DOMContentLoaded', (event) => {
  const darkmQ = window.matchMedia('(prefers-color-scheme: dark)');
  if (darkmQ['matches']) {
    // document.getElementById('karive').classList.add("dark_mode");
  }
  StartEnvelope();
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
  let envelope = creatanelemn(`div`, `envelope`, `envelope`, ``, ``, ``, ``, ``, "", ``, ``, ``);
  /*
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
  */
  let imgs = creatanelemn(`img`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``);
  imgs.setAttribute("src", "envelope/stamp.png");
  let shold = creatanelemn(`div`, `stampholder`, ``, ``, ``, ``, ``, ``, imgs, ``, ``, ``);
  let firstletter = creatanelemn(`p`, `envfrt`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `C`);
  let seconletter = creatanelemn(`p`, `envsec`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `R`);
  let ands = creatanelemn(`p`, `envand`, ``, ``, ``, ``, ``, ``, ``, ``, ``, `&`);
  shold.appendChild(firstletter);shold.appendChild(ands);shold.appendChild(seconletter);
  let stamp = creatanelemn(`div`, ``, `stamp`, ``, ``, ``, ``, ``, shold, `OpenEnvelope()`, ``, ``);
  envelope.appendChild(stamp);
  document.getElementsByTagName('body')[0].appendChild(envelope);
  stampPulsing = gsap.to('#stamp', {scale:1.05, filter:'drop-shadow(0 0 8px gold)', duration:1.2, repeat:-1, yoyo:true});
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
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  gsap.to('#stamp', {opacity:0, scale:0.8, duration:0.3});
  gsap.to('.envup', {rotationX: -110, transformOrigin: "top center", duration:0.8});
  gsap.to('.envleft , .envdown , .envright', {y:50, opacity: 0, duration:0.7});
  stampPulsing.kill();
  enablescrollback();
  setTimeout(function () {
    document.getElementById('envelope').remove();
  }, 1000);
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
