var Intro = require("../views/1-intro");
var Orgasme = require("../views/2a-orgasme");
var Caress = require("../views/2b-caress");

class HarmonyClass {
  constructor(step, timerDuration) {
    this.step = step;
    this.timerDuration = timerDuration;
    this.timerActual = timerDuration;
    this.maxStep = 4
  }

  setRole(name, socketRole) {
    socketRole.name = name;
    switch (name) {
      case "orgasme":
        socketRole.logic = Orgasme;
        break;

      case "hand":
        socketRole.logic = Caress;
        socketRole.logic.img = "hand";
        break;

      case "neck":
        socketRole.logic = Caress;
        socketRole.logic.img = "neck";
        break;

      default:
        console.error("Erreur de rôles");
        break;
    }
  }

  nextStep(socket) {
    this.step++;

    console.log(this.step);
    let step = {};
    switch (this.step) {
      case 1:
        step = {
          code: Intro.show(),
          event: false
        };
        return step;
        break;
      case 2:
        step = {
          code: socket.role.logic.showInstructions(),

          event: false
        };
        this.step--;
        return step;
        break;

      case 3:
        let lastTime = Date.now();
        // socket.emit('harmony role', )

        let interval = setInterval(() => {
          this.timerActual--;
          socket.emit("update time", {
            time: this.timerActual,
            timerDuration: this.timeDuration
          });

          if (this.timerActual <= 0) {
            let step = this.nextStep(socket);
            socket.emit("end", step.code);
            socket.broadcast.emit("end", step.code);
            clearInterval(interval);
            clearInterval(interval2);
          }
        }, 1000);

        let interval2 = setInterval(() => {
            let roles = ['orgasme', 'hand', 'neck']
            let role = roles[Math.floor(Math.random()*((roles.length-1)+1))]
            socket.emit("harmony game", role);
          }, 2000);

        step = {
          code: socket.role.logic.showGame(),
          event: true
        };
        return step;
        break;

      case 4:
        this.step = 0;
        this.timerActual = this.timerDuration;
        step = {
          code: socket.role.logic.showEnd(),
          event: false
        };
        return step;

        break;
      default:
        break;
    }
  }
  getStep(socket) {
    this.step;
    console.log(this.step);
    let step = {};
    switch (this.step) {
      case 1:
        step = {
          code: Intro.show(),
          event: false
        };
        return step;
        break;
      case 2:
        step = {
          code: socket.role.logic.showInstructions(),

          event: false
        };
        return step;
        break;

      case 3:
        let lastTime = Date.now();
        // socket.emit('harmony role', )

        let interval = setInterval(() => {
          this.timerActual--;
          socket.emit("update time", {
            time: this.timerActual,
            timerDuration: this.timeDuration
          });

          if (this.timerActual <= 0) {
            clearInterval(interval);
          }
        }, 1000);
        step = {
          code: socket.role.logic.showGame(),
          event: true
        };
        return step;
        break;

      case 4:
        this.step = 0;
        this.timerActual = this.timerDuration;
        step = {
          code: socket.role.logic.showEnd(),
          event: false
        };
        return step;

        break;
      default:
        break;
    }
  }
  setUp(socket) {
    socket.role = {};
    let bodyParts = ["orgasme", "hand", "neck"];
    let rand = Math.round(Math.random() * bodyParts.length - 1)
    this.setRole(
      bodyParts[rand],
      socket.role
    );
    socket.emit("add event");
    socket.emit("harmony game start", bodyParts);
  }
}

module.exports = HarmonyClass;
