const unit_type = "vh";
var canvas = new daize.displayCanvas(160, 100, unit_type);
document.querySelector("center").appendChild(canvas);

canvas.style.backgroundColor = "#111111";

var vignette_layer = new daize.sprite(160, 100, 80, 50, 0, unit_type);
vignette_layer.costume = "graphics/vignette.svg";
vignette_layer.layer = 696969;
vignette_layer.style.mixBlendMode = "multiply";
canvas.addsprite(vignette_layer);

var playable = new daize.sprite(10, 10, 50, 50, 0, unit_type);
playable.costume = "graphics/bug1.svg";
canvas.addsprite(playable);
playable.style.filter = "drop-shadow(0 0 0.5vh #00AAFF) drop-shadow(0 0 2vh #00AAFF)";
playable.style.mixBlendMode = "screen";

var instuctionsLabel = new daize.sprite(10, 10, 10, 10, 0, unit_type);
instuctionsLabel.layer = 696969;
canvas.addsprite(instuctionsLabel);
instuctionsLabel.innerText = "Arrow keys to move, space to shoot";
instuctionsLabel.style.color = "white";
instuctionsLabel.style.fontSize = "1.69" + unit_type;
instuctionsLabel.style.fontFamily = "monospace";
instuctionsLabel.style.filter = "drop-shadow(0 0 0.5vh #00AAFF) drop-shadow(0 0 2vh #00AAFF)";

var score = 0;
var scoreLabel = new daize.sprite(25, 5, 140, 10, 0, unit_type);
scoreLabel.layer = 696969;
canvas.addsprite(scoreLabel);
scoreLabel.innerText = "SCORE: " + score.toString();
scoreLabel.style.color = "white";
scoreLabel.style.fontSize = "4" + unit_type;
scoreLabel.style.fontFamily = "monospace";
scoreLabel.style.filter = "drop-shadow(0 0 0.5vh #00AAFF) drop-shadow(0 0 2vh #00AAFF)";

var keysDown = {};
window.addEventListener("keydown", function(e) { keysDown[e.key] = true; });
window.addEventListener("keyup", function(e) { keysDown[e.key] = false; });
var spaceHeld = false;

var bullets = [];

function mainGameLoop() {
    if (keysDown.ArrowUp) {
        playable.movevec(0.69, Math.PI / 2 - playable.angle);
    }
    if (keysDown.ArrowRight) {
        playable.angle += 0.069;
    }
    if (keysDown.ArrowLeft) {
        playable.angle -= 0.069;
    }
    if (keysDown[" "] && !spaceHeld) {
        var bullet = new daize.sprite(2, 2, playable.x, playable.y, Math.PI / 2 - playable.angle, unit_type);
        bullet.costume = "graphics/bullet1.svg";
        canvas.addsprite(bullet);
        bullet.style.filter = "drop-shadow(0 0 1vh #00AAFF)";
        bullet.style.mixBlendMode = "screen";
        spaceHeld = true;
        bullets.push(bullet);
        score++;
        scoreLabel.innerText = "SCORE: " + score.toString();
    }
    if (!keysDown[" "]) spaceHeld = false;

    for (var bullet of bullets) {
        bullet.movevec(1, bullet.angle);
        if (bullet.x < 0 || bullet.x > 160) bullet.angle = Math.PI - bullet.angle;
        if (bullet.y < 0 || bullet.y > 100) bullet.angle *= -1;
    }

    if (Object.keys(keysDown).length > 0) instuctionsLabel.visibility = 0;

    requestAnimationFrame(mainGameLoop);
}

mainGameLoop();