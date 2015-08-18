/* global requestAnimFrame */
function Animation(canvas) {
    this.setCanvas(canvas);
    this.stop = false;
    window.requestAnimFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame;
}

Animation.prototype.setCanvas = function (canvas) {
    this.canvas = canvas || null;
    return this.canvas;
};

Animation.prototype.getCanvas = function () {
    return this.canvas;
};

Animation.prototype.loop = function () {
    if (!this.stop)
        this.getCanvas().draw();
    requestAnimFrame(this.loop.bind(this));
};

Animation.prototype.run = function () {
    var self = this;
    document.addEventListener('click', function() {
        self.stop = !self.stop;
    });
    requestAnimFrame(this.loop.bind(this));
    return this;
};
