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