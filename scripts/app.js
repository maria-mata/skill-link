$(document).ready(function() {
  $(".button-collapse").sideNav()
  $('.chips').material_chip()
  $(".button-collapse").sideNav()

  // const baseURL; // need heroku link from Yousif

  // $.get(baseURL)
  //   .then(appendSkills)

  // $('.info').click(function() {
  //   $('#slide-out').toggle()
  // });
});

function appendSkills(data) {
  for (let i = 0; i < data.length; i++) {
    let skill = `<li>
                  <div class="chip">
                    <i class="material-icons">code</i>
                    ${data[i].name}
                  </div>
                </li>`

    $('#skillsList').append(skill)
  }
}
