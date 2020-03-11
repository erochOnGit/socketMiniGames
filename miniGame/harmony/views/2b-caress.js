let Caress = {
        showInstructions() {
            return `
                <p>Tu t'occupera</p>
                <h2>du bras</h2>
                <button onclick="nextStepHarmony()" >Prêt.e ?</button>
            `
        },
        showGame() {
            return `
                <div id="timer"></div>
                <img src="assets/${this.img}.png" alt="">
                <script>
                
console.log('ui')
                </script>
            `
        },
        showEnd() {
            //document.body.style.background = 'white'
            //
            //document.body.removeEventListener('mousedown', listener1)
            //document.body.removeEventListener('mousemove', listener2)
            //document.body.removeEventListener('mouseup', listener3)
            //clearInterval(this.interval1)

            return `
            <p>Tes points</p>
                <h2>harmony.mousePoint</h2>
            `
        }
}

module.exports = Caress