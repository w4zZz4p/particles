/* global Particle, Paper */
function Canvas(element, bounds, pattern) {
    var self = this;
    this.particles = [];
    this.canvas = document.getElementById(element);

    this.size(this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.setBounds(bounds);
    this.setPattern(pattern);

    this.canvas.addEventListener('click', function(event) {
        event.stopPropagation();

    console.log(event.pageX, self.canvas.offsetLeft);
        var x = event.pageX - document.getElementById('container').offsetLeft;
        var y = event.pageY - document.getElementById('container').offsetTop;

        var c = 1;
        while(c--)
            self.addParticle(x, y);
        document.getElementById('cnt').innerHTML = self.particles.length;
    });

}

Canvas.prototype.getHeight = function() {
    return this.canvas.height;
};

Canvas.prototype.getWidth = function() {
    return this.canvas.width;
};

Canvas.prototype.size = function(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
};

Canvas.prototype.setBounds = function(bounds) {
    this.bounds = bounds || null;
    return this.bounds;
};

Canvas.prototype.getBounds = function() {
    return this.bounds;
};

Canvas.prototype.setPattern = function(pattern) {
    this.pattern = pattern || null;
    return this.pattern;
};

Canvas.prototype.getPattern = function() {
    return this.pattern;
};

Canvas.prototype.addParticle = function(x, y) {
    var particle = new Particle(x, y, this.bounds, this.pattern);
    particle.activate();
    this.particles.push(particle);
};

Canvas.prototype.draw = function() {
    var paper = new Paper(this.canvas);
    this.bounds.drawOn(paper);
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
        this.particles[i].drawOn(paper);
    }
    paper.updateCanvas();
};
