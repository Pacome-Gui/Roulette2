;(function(global) {
  let Goo = class {
    constructor(width, height, other) {
      this.currentFilter = '<feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" /> <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" /> <feComposite in="SourceGraphic" in2="gooey" operator="atop" />';
      let svgElement;
      if (width === undefined) {
        svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        document.body.appendChild(svgElement);
      } else if (typeof width != typeof {}) {
        svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElement.setAttribute("width", width);
        svgElement.setAttribute("height", height);
        svgElement.classList.add(other)
        document.getElementById(other == "fire"? "hot": "cold").parentNode.insertBefore(svgElement,document.getElementById(other == "fire"? "hot": "cold"));
      } else {
        if (width.tagName == "DIV") {
          svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          if (other != undefined) {
            svgElement.setAttribute("width", height);
            svgElement.setAttribute("height", other);
          }
          width.appendChild(svgElement);
        } else {
          svgElement = width;
        }
      }
      this.element = svgElement;
      this.addFilter("goojs-default", this.currentFilter);
      this.differentFilters = 0;
    }
    
    get filterID() {
      return this.differentFilters++;
    }
    
    deleteFilter(name) {
      let filter = this.element.getElementById(name);
      if (filter) {
        filter.parentNode.removeChild(filter);
      }
    }
    
    addFilter(name, filterData) {
      this.deleteFilter(name);
      let defs = this.element.getElementsByTagName("defs")[0];
      if (!defs) {
        defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        this.element.appendChild(defs);
      }
      let newFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
      newFilter.setAttribute("id", name);
      newFilter.setAttribute("x", "-100%");
      newFilter.setAttribute("y", "-100%");
      newFilter.setAttribute("width", "300%");
      newFilter.setAttribute("height", "300%");
      newFilter.innerHTML = filterData;
      defs.appendChild(newFilter);
    }
    
    get filter() {
      return this.currentFilter;
    }
    
    set filter(newFilter) {
      this.currentFilter = newFilter;
      this.addFilter("goojs-default", this.currentFilter);
    }
    
    layer() {
      return new GooLayer(this);
    }
    
    get width() {
      return this.element.getAttribute("width");
    }
    
    set width(val) {
      this.element.setAttributeNS(null, "width", val);
    }
    
    get height() {
      return this.element.getAttribute("height");
    }
    
    set height(val) {
      this.element.setAttributeNS(null, "height", val);
    }
  }
  
  let GooLayer = class {
    constructor(goo) {
      this.currentFilter = "goojs-default";
      this.goo = goo;
      let svgns = "http://www.w3.org/2000/svg";
      this.group = document.createElementNS(svgns, "g");
      this.group.setAttribute("filter", "url(#" + this.currentFilter + ")");
      this.goo.element.appendChild(this.group);
      this.circles = [];
    }
    
    color(color) {
      for (let circle of this.circles) {
        circle.color(color);
      }
    }
    
    circle() {
      let circle = new GooCircle(this);
      this.circles.push(circle);
      return circle;
    }
    
    set filter(filterData) {
      if (this.currentFilter != "goojs-default") {
        this.goo.deleteFilter(this.currentFilter);
      }
      this.currentFilter = this.goo.filterID;
      this.group.setAttribute("filter", "url(#goojs-filter-" + this.currentFilter + ")");
      this.goo.addFilter("goojs-filter-" + this.currentFilter, filterData);
    }
  }
  
  let GooCircle = class {
    constructor(layer) {
      this.layer = layer;
      let svgns = "http://www.w3.org/2000/svg";
      this.circle = document.createElementNS(svgns, "circle");
      this.data = {
        xpos: 100,
        ypos: 100,
        radius: 30,
        color: "#000000",
      }
      this.update();
      this.layer.group.appendChild(this.circle);
    }
    
    update() {
      this.circle.setAttributeNS(null, "cx", this.data.xpos);
      this.circle.setAttributeNS(null, "cy", this.data.ypos);
      this.circle.setAttributeNS(null, "r", this.data.radius);
      this.circle.setAttributeNS(null, "fill", this.data.color);
    }
    
    pos(x, y) {
      this.data.xpos = x;
      this.data.ypos = y;
      this.update();
      return this;
    }
    
    x(x) {
      if (x) {
        this.data.xpos = x;
        this.update();
        return this;
      } else {
        return this.data.xpos;
      }
    }
    
    y(y) {
      if (y) {
        this.data.ypos = y;
        this.update();
        return this;
      } else {
        return this.data.ypos;
      }
    }
    
    color(color) {
      if (color) {
        this.data.color = color;
        this.update();
        return this;
      } else {
        return this.data.color;
      }
    }
    
    size(size) {
      if (size) {
        this.data.radius = size / 2;
        this.update();
        return this;
      } else {
        return this.data.radius * 2;
      }
    }
    
    radius(size) {
      if (size) {
        this.data.radius = size;
        this.update();
        return this;
      } else {
        return this.data.radius;
      }
    }
    
    detatch() {
      this.circle.parentNode.removeChild(this.circle);
    }
    
    remove() {
      this.circle.parentNode.removeChild(this.circle);
    }
    
    delete() {
      this.circle.parentNode.removeChild(this.circle);
    }
  }
  
  global.Goo = Goo;
})(window);



class RotatingFlame {
  constructor(colors, sizes, times, start, other) {
    let goo = new Goo(200, 250, other);
    this.colors = colors;
    this.sizes = sizes;
    this.times = times;
    this.layers = [];
    for (let i = 0; i < this.colors.length; i++) {
      this.layers.push(goo.layer());
    }
    this.particles = [];
    this.timer = 0;
    this.speed = 0.04;
    this.start = start;
    let move = () => {
      this.timer++;
      if (this.timer % 1 < 1) {
        //position to go
        let x = goo.width / 2
        let y = goo.height / 1.5
        for (let i = 0; i < this.colors.length; i++) {
          let dir = Math.random() * Math.PI * 2;
          let speed = 3;
          //particule gestion
          if (other=="fire") {
            this.particles.push(new Particle(this.layers[i], x, y, Math.sin(dir) * speed*0.6, -Math.abs(Math.cos(dir) * speed *1.3), this.colors[i], this.sizes[i], this.times[i], this));
          } else {
            this.particles.push(new Particle(this.layers[i], x, y, Math.sin(dir) * speed, Math.cos(dir) * speed , this.colors[i], this.sizes[i], this.times[i], this));
          }
        }
      }
      setTimeout(() => {requestAnimationFrame(move)},100);
    }
    move()
  }
}

class Particle {
  constructor(layer, x, y, xv, yv, color, size, time, flame) {
    this.layer = layer;
    this.pos = {x: x, y: y};
    this.vel = {x: xv, y: yv};
    this.size = size;
    this.time = time;
    this.initTime = time;
    this.flame = flame;
    this.circle = layer.circle().pos(x, y).color(color).size(size);
    let move = () => {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
      this.time -= 1;
      this.circle.pos(this.pos.x, this.pos.y).size(this.size * this.time / this.initTime);
      if (this.time <= 0) {
        this.circle.delete();
        this.flame.particles.splice(this.flame.particles.indexOf(this), 1);
      } else {
        setTimeout(() => {requestAnimationFrame(move)},100);
      }
    } 
    setTimeout(() => {requestAnimationFrame(move)},100);
  }
}
let size = 1.4
let time = 1
let sizes = [40*size, 60*size, 60*size, 50*size, 40*size];
size = 0.75
let sizes2 = [40*size, 40*size, 40*size, 40*size, 30*size];
let times = [30*time, 25*time, 20*time, 15*time, 10*time];
let times2 = [30*time, 30*time, 30*time, 30*time, 30*time];
setTimeout(function(){
  new RotatingFlame(["#424242", "#F4511E", "#FF9800", "#FFEB3B", "#FFF59D"], sizes, times, 0, "fire");
new RotatingFlame(["#BEFFF7", "#A6F6FF", "#9EDDFF", "#6499E9", "#FFFFFF"], sizes2, times2, 0, "water");
}, 1000);


