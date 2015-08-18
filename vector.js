function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.clone = function() {
    return new Vector(this.x, this.y);
};

Vector.prototype.sub = function(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
};

Vector.prototype.set = function(v) {
    this.x = v.x;
    this.y = v.y;
    return this;
};

Vector.prototype.add = function(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
};

Vector.prototype.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.div = function(s) {
    this.x /= s;
    this.y /= s;
    return this;
};

Vector.prototype.mul = function(s) {
    this.x *= s;
    this.y *= s;
    return this;
};

Vector.prototype.zero = function() {
    this.x = 0;
    this.y = 0;
    return this;
};

Vector.prototype.normalized = function(){
    var length = this.length();
    return new Vector(this.x / length, this.y / length);
};

Vector.prototype.dot = function(v) {
    return this.x * v.x + this.y * v.y;
};
