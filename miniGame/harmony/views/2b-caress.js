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
                document.getElementById('timer').style.width = time;

                let harmony = {}

                harmony.hisTurn = false
                harmony.mouseIsDown = false
                harmony.mousePoint = 0

                document.body.addEventListener('mousedown', listener1 = () => {
                    harmony.mouseIsDown = true
                })
                
                document.body.addEventListener('mousemove', listener2 = () => {
                    if (harmony.mouseIsDown && harmony.hisTurn) {
                        harmony.mousePoint++
                    } else if (harmony.mouseIsDown && !harmony.hisTurn) {
                        harmony.mousePoint--
                    }
                    console.log(harmony.mousePoint)
                })
                
                document.body.addEventListener('mouseup', listener3 = () => {
                    harmony.mouseIsDown = false
                })
                
                harmony.interval1 = setInterval(()=>{
                    if (Math.random() > .5) {
                        harmony.hisTurn = !harmony.hisTurn
                    }
                    harmony.hisTurn ? document.body.style.background = 'white' : document.body.style.background = 'red'
                }, 500)

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