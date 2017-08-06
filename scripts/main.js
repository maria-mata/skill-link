const userId = 1

$(document).ready(function() {
  $('.button-collapse').sideNav()
  $('.modal').modal()

  $.get(`https://young-peak-51032.herokuapp.com/users/${userId}`)
    .then(showUserProfile)

  $.get(`https://young-peak-51032.herokuapp.com/users/matches/${userId}`)
    .then(appendSkillMatches)

  $('#user-put').submit(userPutRequest)
  // $('#skills-put').submit(skillsPutRequest)

});

function showUserProfile(data) {
  // missing photo display
  $('.card-title').text(data[0].name)
  $('#name').val(data[0].name)
  $('#email').val(data[0].email)
  $('#phone').val(data[0].phone)
  $('#bio').val(data[0].bio)
};

function userPutRequest(event) {
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

// function skillsPutRequest(event) {
//
// }

function appendSkillMatches(data) {
  for (let i = 0; i < data.length; i++) {
    let skillMatch = `<li class="collection-item avatar">
                  <img src="http://www.cdn.innesvienna.net//Content/user-default.png" alt="" class="circle">
                  <span class="title">${data[i].name}</span>
                  <p>Can Teach You: <br>
                     Wants to Learn: ${data[i].skill_learn}
                  </p>
                  <a href="#!" class="secondary-content"><i class="material-icons">info_outline</i></a>
                </li>`
    $('#matches').append(skillMatch)
  }
}

/* SUGGESTED MATCHES APPEND ELEMENT
`            <li class="collection-item avatar">
              <img src="http://www.cdn.innesvienna.net//Content/user-default.png" alt="" class="circle">
              <span class="title">Title</span>
              <p>First Line <br>
                 Second Line
              </p>
              <a href="#!" class="secondary-content"><i class="material-icons">add</i></a>
            </li>`
*/
