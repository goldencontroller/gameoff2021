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

var keysDown = {};
window.addEventListener("keydown", function(e) { keysDown[e.key] = true; });
window.addEventListener("keyup", function(e) { keysDown[e.key] = false; });
var spaceHeld = false;

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
    }
    if (!keysDown[" "]) spaceHeld = false;
    requestAnimationFrame(mainGameLoop);
}

mainGameLoop();