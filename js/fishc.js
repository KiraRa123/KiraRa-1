var w = c.width = window.innerWidth,
    h = c.height = window.innerHeight,
    ctx = c.getContext('2d'),

    opts = {
        phrases: ["2022.5.20\n在一起2052天","最爱老婆饼", "所念皆星河 星河皆是你\n\n所爱隔山海 山海皆可平", "W&Z Forever", "我想过和你散步仲夏夜海边","未来可期 余生有你","I want to dance with you til sunrise\nrun away the fate of clockwise", "愿一起甜蜜度过每个520","这世界有那么多人 多庆幸能有个我们", "在我这颗小星球里面 你就是温柔和璀璨\n即使旁系宇宙再浪漫 我也终身不换", "我喜欢的人 有光\n光而不耀 与光同尘","愿陪你看遍每个日落与黎明\n何止520", "你是我一生只会遇见一次的惊喜", "You are,\ntherefore I am","Thousands miles in the mountains\nyou are my romance hidden in the star", "The winds stop at autumn water\nI stop at you"],
        balloons: 10,
        baseVelY: -1,
        addedVelY: -1,
        baseVelX: -.25,
        addedVelX: .5,
        baseSize: 20,
        addedSize: 10,
        baseSizeAdder: 2,
        addedSizeAdder: 2,
        baseIncrementer: .01,
        addedIncrementer: .03,
        baseHue: -10,
        addedHue: 30,
        font: '20px Verdana'
    },

    cycle = 0,
    balloons = [];

ctx.font = opts.font;

function Balloon() {
    this.reset();
}

Balloon.prototype.reset = function () {

    this.size = opts.baseSize + opts.addedSize * Math.random();
    this.sizeAdder = opts.baseSizeAdder + opts.addedSizeAdder * Math.random();
    this.incrementer = opts.baseIncrementer + opts.addedIncrementer * Math.random();

    this.tick = 0;

    this.x = Math.random() * w;
    this.y = h + this.size;

    this.vx = opts.baseVelX + opts.addedVelX * Math.random();
    this.vy = opts.baseVelY + opts.addedVelY * Math.random();

    this.color = 'hsla(hue,70%,60%,.8)'.replace('hue', opts.baseHue + opts.addedHue * Math.random());
    this.phrase = opts.phrases[++cycle % opts.phrases.length].split('\n');
    this.lengths = [];

    for (var i = 0; i < this.phrase.length; ++i)
        this.lengths.push(-ctx.measureText(this.phrase[i]).width / 2);
}
Balloon.prototype.step = function () {

    this.tick += this.incrementer;
    this.x += this.vx;
    this.y += this.vy;

    var size = this.size + this.sizeAdder * Math.sin(this.tick);

    ctx.lineWidth = size / 40;
    // ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - 2);
    ctx.lineTo(this.x, this.y + size);
    ctx.stroke();
    ctx.fillStyle = this.color;

    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);
    //ctx.fillRect( -size / 2, -size / 2, size / 2, size / 2 );
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(-size / 2, -size / 2 + size / 4, size / 4, Math.PI / 2, Math.PI * 3 / 2);
    ctx.arc(-size / 2 + size / 4, -size / 2, size / 4, Math.PI, Math.PI * 2);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.rotate(-Math.PI / 4);
    ctx.translate(-this.x, -this.y);

    ctx.translate(this.x, this.y + size + 15);
    ctx.scale(size / this.size, size / this.size);
    ctx.fillStyle = '#2ebb96';
    for (var i = 0; i < this.phrase.length; ++i)
        ctx.fillText(this.phrase[i], this.lengths[i], i * 15);
    ctx.scale(this.size / size, this.size / size);
    ctx.translate(-this.x, -(this.y + size + 15));

    if (this.y < -size * 3)
        this.reset();

}

function anim() {

    window.requestAnimationFrame(anim);

    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, w, h);

    if (balloons.length < opts.balloons && Math.random() < .01)
        balloons.push(new Balloon);

    for (var i = 0; i < balloons.length; ++i)
        balloons[i].step();
}

anim();


