var app = new Vue({
  el: '#header',
  template: `
<div class="navbar-fixed">
    <nav>
        <div class="nav-wrapper blue darken-4" style="padding-left: 20px; padding-right: 20px">
            <a href="#" class="brand-logo">Whiff Punish Practice V1</a>
            <p>By Snare</p>
        </div>
    </nav>
</div>`,
  mounted () {
    eel.print_hello_from_header();
  }
})