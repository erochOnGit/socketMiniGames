let rules = require('../../public/rules.json')
let questions = require('../../public/culture.json')

class CultureClass {
  constructor() {
    this.step = 0
  }
  test() {
    console.log('youpii')
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }
  init() {
    this.random_ID = this.getRandomInt(0)
    this.title = rules.rules[this.random_ID].title
    this.rule = rules.rules[this.random_ID].rule
    return `
<section id="s1">
<h1 id="t1">${this.title}</h1>
<p id="p1">${this.rule}</p>
<input type="button" value="jouer" id="b1" onclick="nextStepCulture()" />
</section>
`
  }
  GoQuestion() {
    let html = ''
    switch (this.random_ID) {
      case 0:
        html = this.showquiz()
        break
      case 1:
        html = whichone()
        break
      case 2:
        html = hollywood()
        break
      case 3:
        html = intox()
        break
      case 4:
        html = teleachatte()
        break
      case 5:
        html = orgasmophonie()
        break
      case 6:
        html = parodie()
    }
    return html
  }

  showquiz() {
    console.log('es tu la')
    this.random_ID = this.getRandomInt(7)
    this.question = questions.questions[this.random_ID].title
    this.answer1 = questions.questions[this.random_ID].prop_1
    this.answer2 = questions.questions[this.random_ID].prop_2
    this.answer3 = questions.questions[this.random_ID].prop_3
    this.answer4 = questions.questions[this.random_ID].prop_4

    return `
  <section id="s2">
    <h1 id="q1">${this.question}</h1>
    <input type="button"  onclick="giveanswer('${this.answer1}')" value="${this.answer1}" id="a1" /><br />
    <input type="button"  onclick="giveanswer('${this.answer2}')" value="${this.answer2}" id="a2" /><br />
    <input type="button"  onclick="giveanswer('${this.answer3}')" value="${this.answer3}" id="a3" /><br />
    <input type="button" onclick="giveanswer('${this.answer4}')" value="${this.answer4}" id="a4" />
  </section>
    `
  }

  cholafin(data) {
    let html = ''
    if (data == questions.questions[this.random_ID].answer) {
      html = 'fesses lit citation'
      //   document.getElementById('t2').innerHTML = 'fesses lit citation'
    } else {
      html = 'gros naze tes trop nul tas pas la réponse boouuuh le gros nul'
      // document.getElementById('t2').innerHTML =
      //   'gros naze tes trop nul tas pas la réponse boouuuh le gros nul'
    }

    return `
  <section id="s3">
    <h1 id="t2">${html}</h1>
  </section>
    `
  }

  nextStep(socket, data) {
    this.step++
    let step

    switch (this.step) {
      case 1:
        step = {
          code: this.init(),
          event: false
        }
        return step
      case 2:
        step = {
          code: this.GoQuestion(),
          event: false
        }
        return step
      case 3:
        this.step = 0
        step = {
          code: this.cholafin(data),
          event: false
        }
        return step

      default:
        break
    }
  }
}

module.exports = CultureClass

// // const bt = document.getElementById('b1')
// bt.addEventListener(
//   'click',
//   function() {
//     GoQuestion()
//   },
//   false
// )

// function GoQuestion() {
//   switch (random_ID) {
//     case 0:
//       culture()
//       break
//     case 1:
//       whichone()
//       break
//     case 2:
//       hollywood()
//       break
//     case 3:
//       intox()
//       break
//     case 4:
//       teleachatte()
//       break
//     case 5:
//       orgasmophonie()
//       break
//     case 6:
//       parodie()
//   }
// }

// function culture() {
//   console.log('culture')
// //   document.getElementById('s1').style.visibility = 'hidden'
// //   document.getElementById('s2').style.visibility = 'visible'
//   let i
//   let random_ID = getRandomInt(7)
//   let question = questions.questions[random_ID].title
//   let answer1 = questions.questions[random_ID].prop_1
//   let answer2 = questions.questions[random_ID].prop_2
//   let answer3 = questions.questions[random_ID].prop_3
//   let answer4 = questions.questions[random_ID].prop_4

// //   document.getElementById('q1').innerHTML = question
// //   document.getElementById('a1').value = answer1
// //   document.getElementById('a2').value = answer2
// //   document.getElementById('a3').value = answer3
// //   document.getElementById('a4').value = answer4
// //   document.querySelectorAll('#s2 input').forEach(input => {
// //     input.addEventListener('click', verifiedanswer)
// //   })
//   function verifiedanswer(event) {
//     if (event.target.value == questions.questions[random_ID].answer) {
//       console.log('fesses lit citation')
//       document.getElementById('s2').style.visibility = 'hidden'
//       document.getElementById('t2').innerHTML = 'fesses lit citation'
//     } else {
//       console.log(
//         "gros naze t'es trop nul t'as pas la réponse boouuuh le gros nul"
//       )
//       document.getElementById('t2').innerHTML =
//         'gros naze tes trop nul tas pas la réponse boouuuh le gros nul'
//       document.getElementById('s2').style.visibility = 'hidden'
//     }
//   }
// }

// function whichone() {
//   console.log('parmis ces réponses...')
//   document.getElementById('s1').style.visibility = 'hidden'
//   document.getElementById('s2').style.visibility = 'visible'
//   let i
//   let random_ID = getRandomInt(7)
//   let question = questions.questions[random_ID].title
//   let answer1 = questions.questions[random_ID].prop_1
//   let answer2 = questions.questions[random_ID].prop_2
//   let answer3 = questions.questions[random_ID].prop_3
//   let answer4 = questions.questions[random_ID].prop_4

//   document.getElementById('q1').innerHTML = question
//   document.getElementById('a1').value = answer1
//   document.getElementById('a2').value = answer2
//   document.getElementById('a3').value = answer3
//   document.getElementById('a4').value = answer4
//   document.querySelectorAll('#s2 input').forEach(input => {
//     input.addEventListener('click', verifiedanswer)
//   })

//   function verifiedanswer(event) {
//     if (event.target.value == questions.questions[random_ID].answer) {
//       console.log(
//         "gros naze t'es trop nul t'as pas la réponse boouuuh le gros nul"
//       )
//       document.getElementById('t2').innerHTML =
//         'gros naze tes trop nul tas pas la réponse boouuuh le gros nul'
//       document.getElementById('s2').style.visibility = 'hidden'
//     } else {
//     }
//   }
// }

// function hollywood() {
//   console.log('hollywood')
// }

// function intox() {
//   console.log('intox')
// }

// function teleachatte() {
//   console.log('teleachatte')
// }

// function orgasmophonie() {
//   console.log('orgasmophonie')
// }

// function parodie() {
//   console.log('parodie')
// }
