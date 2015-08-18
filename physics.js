/* global Vector */
var G = new Vector(0, 1);
var friction = 0.97;

function Physics(position, width, height, bounds) {
	this.position = position;
	this.velocity = new Vector(0, 0);
	this.width = width;
	this.height = height;
	this.bounds = bounds;
}

Physics.prototype.update = function(dt) {
	this.position.add(this.velocity);
	this.velocity.add(G);

	var r = this.bounds.intersects(
		this.position,
		this.velocity
	);
	while (r) {
		this.position.set(r.intersectPosition);
		this.velocity.set(r.reflectionVelocity.mul(friction));
		r = this.bounds.intersects(
			this.position,
			this.velocity,
			r.intersectVector
		);
	}
};

Physics.prototype.getNewPosition = function() {
	this.update();
    return new Vector(
		Math.round(this.position.x),
		Math.round(this.position.y)
    );
};
