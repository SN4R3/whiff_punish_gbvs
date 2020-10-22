Vue.component('sample-component', {
  props: [
      'message',
      'onButtonClicked',
  ],
template: `
  <div class="card">
      <div class="card-content row">
          <p>{{ message }}</p>
          <button type="button" @click='onButtonClicked()'>TEST CHANGE</button>
      </div>
  </div>
  `,
})
