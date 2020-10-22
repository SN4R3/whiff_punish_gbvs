//      <sample-component message="Message from index component" :onButtonClicked="onClicked" />
var app = new Vue({
 components: [
    'sample-component',
    'sequences-component',
  ],
  el: '#root',
  template: `
    <div style="padding:25px;">
      <h5>Instructions:</h5>
      <p>Current only works for <em>GBVS</em></p>
      <p>Go into training mode and set Opponent Behaviour to "Controller". Ensure the keyboard bindings are set to default. Close the menu and hit "tab". Confirm you can move P2 around with A/W/S/D</p>

      <p>
        Set a range of possible steps (left & right) the bot will take, as well as a pause duration range. The number chosen for
        both parameters will be random per interval.
      </p>
      <p>
        Then set a set of move sequences. A sequence will be chosen at random. You might opt to only have one move in a sequence, and have
        several in another. You can also add pauses between each move within a given sequence.
      </p>

      <p>Once you've hit start, you'll have 5 seconds until it starts up. You can stop the program by pressing ESC. I recommend running the game in windowed mode incase things go wrong and you have to manually close the program.</p>

      <h5>Movement Settings:</h5>
      <div class="card">
        <div class="card-content row col-12">
          <div class="input-field col s6">
            <input v-model="settings.minSteps" type="number" min="5">
            <label>Min Walking Range</label>
          </div>
          <div class="input-field col s6">
            <input v-model="settings.maxSteps" type="number" min="5">
            <label>Max Walking Range</label>
          </div>
        </div>

        <div class="card-content row col-12">
          <div class="input-field col s6">
            <input v-model="settings.minPause" type="number">
            <label>Min Pause (in seconds)</label>
          </div>
          <div class="input-field col s6">
            <input v-model="settings.maxPause" type="number">
            <label>Max Pause (in seconds)</label>
          </div>
        </div>
      </div>

      <sequences-component ref="seqs" :inital="settings.sequences"/>

      <a :class="['waves-effect waves-light btn start-btn btn-large', settings.sequences.length && !running ? '' : 'disabled']" @click="start">{{running ? 'RUNNING' : 'START'}}</a>
    </div>
    `,
  data: {
    settings: {
      minSteps:5,
      maxSteps:18,
      minPause:0.2,
      maxPause:1,
      sequences:[[{"name":"Medium","seq":["I"]},{"name":"214","seq":["s",0.032,"a+s",0.032,"a"]},{"name":"214","seq":["s",0.032,"a+s",0.032,"a"]},{"name":"Heavy","seq":["K"]}],[{"name":"Medium","seq":["I"]},{"name":"Sleep","seq":["0.5"]},{"name":"214","seq":["s",0.032,"a+s",0.032,"a"]},{"name":"Heavy","seq":["K"]}],[{"name":"Medium","seq":["I"]},{"name":"Sleep","seq":["1"]},{"name":"Heavy","seq":["K"]}],[{"name":"Heavy","seq":["K"]}],[{"name":"Medium","seq":["I"]}],[{"name":"7","seq":["a+w"]},{"name":"Unique","seq":["j"]}],[{"name":"7","seq":["a+w"]}],[{"name":"9","seq":["w+d"]}],[{"name":"236","seq":["s",0.015,"s+d",0.015,"d"]},{"name":"Heavy","seq":["K"]}]]
    },
    running: false,
  },
  mounted () {
    if(localStorage.getItem('gbvs-whiff')) {
      this.settings = JSON.parse(localStorage.getItem('gbvs-whiff'))
    }
  },
  methods: {
    onClicked() {
      console.log("Button clicked.");
      eel.on_button_clicked();
    },
    start() {
      localStorage.setItem('gbvs-whiff', JSON.stringify(this.settings))
      let sequences = []
      this.settings.sequences.forEach((item) => {
        let set = []
        item.forEach((move) => {
          let moveSeqs = []
          move.seq.forEach((moveSeq) => {
            if(!isNaN(moveSeq)) {
              moveSeqs.push(moveSeq% 1 === 0 ? parseFloat(moveSeq) : parseInt(moveSeq))
            } else {
              moveSeqs.push(moveSeq)
            }
          })
          set.push(moveSeqs)
        })
        sequences.push(set)
      })
      console.log(this.settings.sequences)
      eel.startLoop(
        parseInt(this.settings.minSteps),
        parseInt(this.settings.maxSteps),
        parseFloat(this.settings.minPause),
        parseFloat(this.settings.maxPause),
        sequences
      )
    }
  }
})

eel.expose(showAlert)
function showAlert(message) {
    window.alert(message);
}

eel.expose(isRunning)
function isRunning() {
  app.running = true
}
eel.expose(hasStopped)
function hasStopped() {
  app.running = false
}