/* global Vector */
function Bounds(vectors) {
    this.groups = arguments;
    this.vectors = [];
    for (var i = 0; i < this.groups.length; i++) {
        this.vectors  = this.vectors.concat(this.groups[i]);
    }
}

Bounds.prototype.line = function(paper, x0, y0, x1, y1) {
    var dx = Math.abs(x1 - x0);
    var dy = Math.abs(y1 - y0);
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    var err = dx - dy;

    while (true) {
        paper.pixel(x0, y0, [255, 255, 255, 50]);
        if ((x0 == x1) && (y0 == y1)) break;
        var e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
};

Bounds.prototype.drawOn = function(paper) {
    for ( var n = 0; n < this.groups.length; n++) {
        for ( var i = 0; i < this.groups[n].length-1; i++) {
            this.line(paper, this.groups[n][i].x, this.groups[n][i].y, this.groups[n][i + 1].x, this.groups[n][i + 1].y);
        }
    }
};

Bounds.prototype.intersects = function(p, v, skip) {
    var from = p;
    var to = p.clone().add(v);

    var p2_x = from.x;
    var p2_y = from.y;
    var p3_x = to.x;
    var p3_y = to.y;

    for ( var n = 0; n < this.groups.length; n++) {
        for ( var i = 0; i < this.groups[n].length-1; i++) {

            var p0_x = this.groups[n][i].x;
            var p0_y = this.groups[n][i].y;
            var p1_x = this.groups[n][i+1].x;
            var p1_y = this.groups[n][i+1].y;

            if (skip == p0_x) continue;

            var s1_x = p1_x - p0_x;
            var s1_y = p1_y - p0_y;
            var s2_x = p3_x - p2_x;
            var s2_y = p3_y - p2_y;

            var s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
            var t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

            if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
                var w = this.groups[n][i+1].clone().sub(this.groups[n][i]).normalized();
                var d = v.dot(w);
                var r = new Vector(
                    2 * d * w.x - v.x,
                    2 * d * w.y - v.y
                );
                var ip = new Vector (
                    p0_x + (t * s1_x),
                    p0_y + (t * s1_y)
                );

                return {
                    intersectPosition: ip,
                    reflectionVelocity: r,
                    intersectVector: p0_x
                };
            }
        }
    }

    return false; // No collision
};