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
instuctionsLabel.style.color = "#80d4ff";
instuctionsLabel.style.mixBlendMode = "screen";
instuctionsLabel.style.fontSize = "1.69" + unit_type;
instuctionsLabel.style.fontFamily = "monospace";
instuctionsLabel.style.filter = "drop-shadow(0 0 0.5vh #00AAFF) drop-shadow(0 0 2vh #00AAFF)";
instuctionsLabel.style.userSelect = "none";

var score = 0;
var scoreLabel = new daize.sprite(25, 5, 140, 10, 0, unit_type);
scoreLabel.layer = 696969;
canvas.addsprite(scoreLabel);
scoreLabel.innerText = "SCORE: " + score.toString();
scoreLabel.style.color = "#80d4ff";
scoreLabel.style.mixBlendMode = "screen";
scoreLabel.style.fontSize = "4" + unit_type;
scoreLabel.style.fontFamily = "monospace";
scoreLabel.style.filter = "drop-shadow(0 0 0.5vh #00AAFF) drop-shadow(0 0 2vh #00AAFF)";
scoreLabel.style.userSelect = "none";

var keysDown = {};
window.addEventListener("keydown", function(e) { keysDown[e.key] = true; });
window.addEventListener("keyup", function(e) { keysDown[e.key] = false; });
var spaceHeld = false;

var bullets = [];
var notYetBored = true;

function mainGameLoop() {
    if (keysDown.ArrowUp) {
        playable.movevec(0.69, Math.PI / 2 - playable.angle);
        if (playable.x < 0) playable.x = 160;
        if (playable.x > 160) playable.x = 0;
        if (playable.y < 0) playable.y = 100;
        if (playable.y > 100) playable.y = 0;
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
        bullet.movevec(5, bullet.angle);
        bullet.style.filter = "drop-shadow(0 0 1vh #00AAFF)";
        bullet.style.mixBlendMode = "screen";
        spaceHeld = true;
        bullets.push(bullet);
        score++;
        scoreLabel.innerText = "SCORE: " + score.toString();
        playSound("sounds/shoot.wav");
    }
    if (!keysDown[" "]) spaceHeld = false;

    for (var bullet of bullets) {
        bullet.movevec(1, bullet.angle);
        if (bullet.x < 0 || bullet.x > 160) {
            bullet.angle = Math.PI - bullet.angle;
            playSound("sounds/bounce.wav");
        }
        if (bullet.y < 0 || bullet.y > 100) {
            bullet.angle *= -1;
            playSound("sounds/bounce.wav");
        }
        if (Math.pow(bullet.x - playable.x, 2) + Math.pow(bullet.y - playable.y, 2) < Math.pow(5, 2)) {
            // lose
            notYetBored = false;
            loseSequence();
        }
    }

    if (notYetBored) requestAnimationFrame(mainGameLoop);
}

mainGameLoop();
function onGameStart() {
    // Edit song:
    // https://www.beepbox.co/#9n31s0k4l00e03t2ma7g0fj07r1i0o432T3v1u03f0qwx10n511d08SU005040woo22190E3bi0706T1v1u9af0q0z10t531d08AcF8BeQ0259PffffE6b160861562463378T0v1ue6f0q0y10ob3d4aw5h2E1b5T2v1u15f10w4qw02d03w0E0b4h400000000h4g000000014h000000004h400000000p1zIQvaiCkQu3hB9QPBkpukPBkpiBcVl000000
    playLoop("sounds/BeepBox-Song.wav");
    window.removeEventListener("keypress", onGameStart);

    instuctionsLabel.visibility = 0;
}
window.addEventListener("keypress", onGameStart);

function loseSequence() {
    var loseLabel = new daize.sprite(100, 20, 80, 50, 0, unit_type);
    loseLabel.layer = 696969;
    canvas.addsprite(loseLabel);
    loseLabel.innerText = "You lose";
    loseLabel.style.color = "#ff8080";
    loseLabel.style.mixBlendMode = "screen";
    loseLabel.style.fontSize = "20" + unit_type;
    loseLabel.style.fontFamily = "monospace";
    loseLabel.style.filter = "drop-shadow(0 0 0.5vh #FF0000) drop-shadow(0 0 2vh #FF0000)";
    loseLabel.style.userSelect = "none";

    var retry = new daize.sprite(20, 20, 80, 69, 0, unit_type);
    retry.costume = "graphics/retrybutton.svg";
    retry.layer = 696969;
    canvas.addsprite(retry);
    retry.style.mixBlendMode = "screen";
    retry.style.fontSize = "20" + unit_type;
    retry.style.fontFamily = "monospace";
    retry.style.filter = "drop-shadow(0 0 0.5vh #FF0000) drop-shadow(0 0 2vh #FF0000)";
    retry.addEventListener("click", function(e) { location.reload(); });

    playSound("sounds/death.wav");
}