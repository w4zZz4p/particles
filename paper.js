function Paper(canvas) {
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;

    this.pixels = this.ctx.createImageData(this.width, this.height);
}

Paper.prototype.updateCanvas = function() {
    this.ctx.putImageData(this.pixels, 0, 0);
};

Paper.prototype.pixel = function(x, y, pixel) {
    var p = (x * 4) + y * (this.width * 4);
    if (pixel) {
    	this.pixels.data[p + 0] = pixel[0];
    	this.pixels.data[p + 1] = pixel[1];
    	this.pixels.data[p + 2] = pixel[2];
    	this.pixels.data[p + 3] = pixel[3];
    } else {
        pixel = [
        	this.pixels.data[p + 0],
        	this.pixels.data[p + 1],
        	this.pixels.data[p + 2],
        	this.pixels.data[p + 3]
        ];
    }
    return pixel;
};
