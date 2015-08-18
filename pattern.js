function Pattern() {
    this.rgb = 'ffffff';
    this.a = [
        ['00', 'ff', 'ff', 'ff', '00'],
        ['ff', '00', '00', '00', 'ff'],
        ['ff', '00', 'ff', '00', 'ff'],
        ['ff', '00', '00', '00', 'ff'],
        ['00', 'ff', 'ff', 'ff', '00'],
    ];

    this.height = this.a.length;
    this.width = this.a[0].length;
    this.data = [];

    for (var y = 0; y < this.a.length; y++) {
        this.data[y] = [];
        for (var x = 0; x < this.a[y].length; x++) {
            var a = this.a[y][x];
            this.data[y][x] = this.rgb.match(/.{2}/g);
            for (var n = 0; n < 3; n++) {
                this.data[y][x][n] = parseInt(this.data[y][x][n], 16);
            }
            this.data[y][x][3] = parseInt(a, 16);
        }
    }
}
