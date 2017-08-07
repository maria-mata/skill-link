const baseURL = 'https://young-peak-51032.herokuapp.com/skills'

$(document).ready(function() {
  $('.chips').material_chip()
  $('.button-collapse').sideNav()

  $.get(baseURL)
    .then(appendSkills)

});

function appendSkills(data) {
  for (let i = 0; i < data.length; i++) {
    let skill = `<li>
                  <div class="chip">
                    <i class="material-icons">code</i> ${data[i].name}
                  </div>
                </li>`
    $('#skills-list').append(skill)
  }
};
