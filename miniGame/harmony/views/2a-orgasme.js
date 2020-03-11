let Orgasme = {
    showInstructions() {
        return `
            <p>Tu es le</p>
            <h2>Chef d'orgasme</h2>
            <p>Tu devras guider les autres joueurs</p>
            <button onclick="harmnyrdy()" >Prêt.e ?</button>
        `
    },
    showGame() {
        return `
            <div id="timer"></div>
            <p>Orgasme</p>
        `
    },
    showEnd() {
        return `
            <p>Orgasme fin</p>
        `
    }
}

module.exports = Orgasme