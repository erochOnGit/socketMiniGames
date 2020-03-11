var Intro = require('../views/1-intro')
var Orgasme = require('../views/2a-orgasme')
var Caress = require('../views/2b-caress')

class HarmonyClass {

    constructor(step, timerDuration) {
        this.role = { name: '', logic: null }
        this.step = step
        this.timerDuration = timerDuration
        this.timerActual = timerDuration
    }

    setRole(name) {
        this.role.name = name
        switch (name) {
            case 'orgasme':
                this.role.logic = Orgasme
                break;

            case 'hand':
                this.role.logic = Caress
                this.role.logic.img = 'hand'
                break;

            case 'neck':
                this.role.logic = Caress
                this.role.logic.img = 'neck'
                break;

            default:
                console.error('Erreur de rôles')
                break;
        }
    }

    nextStep(socket) {
        this.step++
        console.log(this.step)
        switch (this.step) {
            case 1:
                return Intro.show()
                break;
            case 2:
                return this.role.logic.showInstructions()
                break;

            case 3:
                let lastTime = Date.now()

                let interval = setInterval(() => {
                    this.timerActual--
                    socket.emit('update time', { time: this.timerActual, timerDuration: this.timeDuration })

                    if (this.timerActual <= 0) {
                        clearInterval(interval)
                    }
                }, 1000)

                return this.role.logic.showGame()
                break;

            case 4:
                return this.role.logic.showEnd()

                break
            default:
                break;
        }
    }
}

module.exports = HarmonyClass