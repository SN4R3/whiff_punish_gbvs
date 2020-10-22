
/**
 *           <div v-for="(seq, i) in sequences" class="current-sequence">
            <div v-for="(seqItem, j) in seq" class="sequence-item">

            </div>
          </div>
 * 
 */
Vue.component('sequences-component', {
  props: [
    'inital',
  ],
  template: `
    <div>
      <h5>Sequences:</h5>
      <div class="card">
        <div class="card-content row col-12 current-sequences-wrapper">
          <p v-show="!this.sequences.length">No sequences to show</p>
          <div v-for="(seq, i) in sequences" class="current-sequence">
            <div v-for="(seqItem, j) in seq" class="sequence-item">
              <div v-if="seqItem.name !== 'Sleep'" class="text-center">
                <img :src="'../img/'+seqItem.name+'.png'" height="34px" width="auto"/>
                <p @click="sequences[i].splice(j, 1)">Remove</p>
              </div>
              <div v-else style="display:flex;flex-direction:column;">
                <label>Delay (in s):</label> <input type="number" v-model="seqItem.seq[0]" style="width:60px"/>
                <p @click="sequences[i].splice(j, 1)">Remove</p>
              </div>
              <div class="plus" v-if="(j+1) !== seq.length"> + </div>
            </div>
            <i class="material-icons red" @click="sequences.splice(i, 1)">close</i>
          </div>
        </div>
      </div>

      <h5>New Sequence:</h5>
      <div class="card">
        <div class="card-content row col-12 new-sequence">
          <div v-for="(seq, i) in newSequence" class="new-sequence-comp">
            <div v-if="seq.name !== 'Sleep'" class="text-center">
              <img :src="'../img/'+seq.name+'.png'" height="34px" width="auto"/>
              <p @click="newSequence.splice(i, 1)">Remove</p>
            </div>
            <div v-else style="display:flex;flex-direction:column;">
              <label>Delay (in s):</label> <input type="number" v-model="seq.seq[0]" style="width:60px"/>
              <p @click="newSequence.splice(i, 1)">Remove</p>
            </div>
            <div class="plus"> + </div>
          </div>
          <div class="new-move-wrapper">
            <p><strong>Select a Move</strong></p>
            <div class="move-select">
              <div v-for="(move, i) in moves" class="move-option" @click="newSequence.push(move)">
                <img v-if="move.name !== 'Sleep'" :src="'../img/'+move.name+'.png'" height="34px" width="auto"/>
                <p v-else>Wait for X seconds</p>
              </div>
            </div>
          </div>
        </div>
        <div class="new-seq-btns">
          <a :class="['waves-effect waves-light btn', newSequence.length ? '' : 'disabled']" @click="addSequence">Add Sequence</a>
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.sequences = this.inital
  },
  watch: {
    inital: function(newVal) {
      this.sequences = newVal
    }
  },
  data() {
    return {
      moves: [
        {
          name: 'Sleep',
          seq: [0]
        },
        {
          name: 'Light',
          seq: ['U']
        },
        {
          name: '2Light',
          seq: ['U+s']
        },
        {
          name: 'Medium',
          seq: ['I']
        },
        {
          name: '2Medium',
          seq: ['I+s']
        },
        {
          name: 'Heavy',
          seq: ['K']
        },
        {
          name: '2Heavy',
          seq: ['K+s']
        },
        {
          name: 'Unique',
          seq: ['j']
        },
        {
          name: '2Unique',
          seq: ['j+s']
        },
        {
          name: 'Skill',
          seq: ['P']
        },
        {
          name: 'Block',
          seq: [';']
        },
        {
          name: '4Block',
          seq: ['a+;']
        },
        {
          name: '6Block',
          seq: ['d+;']
        },
        {
          name: 'Throw',
          seq: ['U+I']
        },
        {
          name: 'Overhead',
          seq: ['I+K']
        },
        {
          name: '236',
          seq: ['s', 0.015, 's+d', 0.015, 'd']
        }, 
        {
          name: '214',
          seq: ['s', 0.032, 'a+s', 0.032, 'a']
        },
        {
          name: '22',
          seq: ['s', 0.015, 's']
        },
        {
          name: '623',
          seq: ['d', 0.015, 's', 0.015, 's+d', 0.015]
        },
        {
          name: '421',
          seq: ['a', 0.015, 's', 0.015, 's+a', 0.015]
        },
        {
          name: '1',
          seq: ['a+s']
        },
        {
          name: '4',
          seq: ['a']
        },
        {
          name: '7',
          seq: ['a+w']
        },
        {
          name: '8',
          seq: ['w']
        },
        {
          name: '9',
          seq: ['w+d']
        },
        {
          name: '6',
          seq: ['d']
        },
        {
          name: '3',
          seq: ['d+s']
        },
        {
          name: '2',
          seq: ['s']
        },
        {
          name: '63214',
          seq: ['d', 0.032, 'd+s', 0.032, 's', 0.032, 's+a', 0.032, 'a']
        },
        {
          name: '41236',
          seq: ['a', 0.032, 'a+s', 0.032, 's', 0.032, 's+d', 0.032, 'd']
        },
      ],
      sequences: [],
      newSequence: [],
    }
  },
  methods: {
    addSequence() {
      this.sequences.push(JSON.parse(JSON.stringify(this.newSequence)))
      this.$parent.settings.sequences = this.sequences
      this.newSequence = []
    }
  }
})
