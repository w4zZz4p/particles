/* global Vector,Physics */
function Particle(x, y, bounds, pattern) {
	this.position = new Vector(x, y);
	this.pattern = pattern;
	this.active = false;
	this.deltaCenter = Math.floor(this.pattern.width/2);

	this.physics = new Physics(
		this.getPosition(),
		this.getWidth(),
		this.getHeight(),
		bounds
	);
}

Particle.prototype.getPosition = function() {
    return this.position;
};

Particle.prototype.getHeight = function() {
    return this.pattern.height;
};

Particle.prototype.getWidth = function() {
    return this.pattern.width;
};

Particle.prototype.isActive = function() {
	return this.active;
};

Particle.prototype.activate = function() {
	this.active = true;
	return this;
};

Particle.prototype.update = function() {
	if (this.isActive()) {
		this.position = this.physics.getNewPosition();
	}
};

Particle.prototype.drawPixel = function(paper, x, y, pixel) {
	var oldPixel = paper.pixel(x, y);
	var newPixel = pixel.slice();
	var a1 = oldPixel[3]  / 255;
	var a2 = pixel[3] / 255;
	newPixel[3] = Math.round((Math.max(a1, a2) + (a1 * a2)) * 255);
	paper.pixel(x, y, newPixel);
};

Particle.prototype.drawOn = function(paper) {
	for (var y = -this.deltaCenter; y < this.getHeight() - this.deltaCenter; y++) {
		for (var x = -this.deltaCenter; x < this.getWidth() - this.deltaCenter; x++) {
			this.drawPixel(
				paper,
				this.position.x + x,
				this.position.y + y,
				this.pattern.data[y + this.deltaCenter][x + this.deltaCenter]
			);
		}
	}
};
