function playSound(soundURI) {
    (new Audio(soundURI)).play();
}

function playLoop(soundURI) {
    var beat = new Audio(soundURI); 
    beat.addEventListener("ended", function() {
        this.currentTime = 0;
        this.play();
    }, false);
    document.body.appendChild(beat);
    beat.play();
}