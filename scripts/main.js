var userId = 1 // this will change based on authentication

$(document).ready(function() {
  $('.button-collapse').sideNav()
  $('.modal').modal()

  $.get(`https://young-peak-51032.herokuapp.com/users/${userId}`)
    .then(showUserProfile)

  $.get(`https://young-peak-51032.herokuapp.com/users/matches/${userId}`)
    .then(appendSkillMatches)

  $('#user-put').submit(updateProfile)
  // $('#skills-put').submit(updateSkills)

});

function showUserProfile(data) {
  // missing photo display
  $('.card-title').text(data[0].name)
  $('#name').val(data[0].name)
  $('#email').val(data[0].email)
  $('#phone').val(data[0].phone)
  $('#bio').val(data[0].bio)
  Materialize.updateTextFields() // ensure labels don't screw up content
};

function updateProfile(event) {
  event.preventDefault()
  $.ajax({
    url: `https://young-peak-51032.herokuapp.com/users/${userId}`,
    type: 'PUT',
    data: {
      // add photo later
      name: $('#name').val(),
      email: $('#email').val(),
      phone: $('#phone').val(),
      bio: $('#bio').val()
    },
    success: function(result) {
      showUserProfile(result)
    }
  })
};

// returns an array of skills that a user has
function skillsHave(userId) {
  let output = []
  $.get(`https://young-peak-51032.herokuapp.com/users/skills/${userId}`)
    .then(function(data) {
      for (let i = 0; i < data.length; i++) {
        output.push(data[i].name)
      }
    })
}

// returns the name of the skill when passed the skill id
function skillWant(skillId) {
  $.get('https://young-peak-51032.herokuapp.com/skills')
    .then(function(data) {
      return data.filter((el) => {
        return el.id == skillId
      }, []).filter((el) => {
        return el.name
      }, [])
    })
}

function updateSkills(event) {
  // get skills they have => users/skills AND /skills - many to many
  // get skills they want => users/:id AND /skills - one to many
}



function appendSkillMatches(data) {
  for (let i = 0; i < data.length; i++) {
    let match = `<li class="collection-item avatar">
                  <img src="http://www.cdn.innesvienna.net//Content/user-default.png"
                  alt="${data[i].name}" class="circle">
                  <span class="title"><b>${data[i].name}</b></span>
                  <p>Can Teach You: <br>
                     Wants to Learn:
                     <a id="${data[i].id}" href="#match-modal"
                     class="secondary-content modal-trigger">
                     <i class="material-icons">remove_red_eye</i></a>
                  </p>
                </li>`
    $('#matches').append(match)
    $(`#${data[i].id}`).click(() => {
      showMatchProfile(data[i])
    })
  }
};

function showMatchProfile(match) {
  $('#match-modal > div.modal-content').empty()
  let content = `<h4>${match.name}</h4>
    <ul>
      <li></li>
    </ul>`
  $('#match-modal > div.modal-content').append(content)
}
