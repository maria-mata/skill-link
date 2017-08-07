var userId = 1 // The user ID of the person logged in
const decodedToken = parseJWT(localStorage.getItem('token'))

$(document).ready(function() {
	$('.button-collapse').sideNav()
	$('.modal').modal()
	// $('.logOut').click(logOut)

	$.get(`https://young-peak-51032.herokuapp.com/users/${userId}`)
		.then(showUserProfile)

	$.get('https://young-peak-51032.herokuapp.com/skills')
		.then(showAllSkills)

	$.get(`https://young-peak-51032.herokuapp.com/users/skills/${userId}`)
		.then(showSkillsHave)

	$.get(`https://young-peak-51032.herokuapp.com/users/matches/${userId}`)
		.then(appendSkillMatches)

	$('#user-put').submit(updateProfile)
	// $('#skills-put').submit(updateSkills)

});

function showUserProfile(data) { // THIS WORKS
	// missing photo display
	$('.card-title').text(data[0].name)
	$('#name').val(data[0].name)
	$('#email').val(data[0].email)
	$('#phone').val(data[0].phone)
	$('#bio').val(data[0].bio)
	Materialize.updateTextFields()
};

function showAllSkills(data) { // THIS WORKS
	for (let i = 0; i < data.length; i++) {
		let skill = `<p>
      <input class="skill" type="checkbox" id="${data[i].id}"/>
      <label for="test5">${data[i].name}</label>
    </p>`
		$('#skills-have').append(skill)
	}
}

function showSkillsHave(data) {
	let skills = $('#skills-have.skill')
	for (let i = 0; i < data.length; i++) {
		let have = skills.find((el) => {
			return $(el).attr('id') == data[i].skills_id
		})
		if (have !== undefined) {
			$(have).attr('checked', 'checked')
		}
	}
}

function updateProfile(event) { // THIS WORKS
	event.preventDefault()
	$.ajax({
		url: `https://young-peak-51032.herokuapp.com/users/${userId}`,
		type: 'PUT',
		data: {
			// missing photo part
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

// returns the name of the skill when passed the skill id
function skillWant(data) {
	return data.filter((el) => {
		return el.id == skillId
	}, []).filter((el) => {
		return el.name
	}, [])
};

function updateSkills(event) {
	// put request to change skills they have and skill they want
}

function appendSkillMatches(data) { // THIS WORKS
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

function showMatchProfile(match) { // THIS WORKS
	$('#match-modal > div.modal-content').empty()
	let content = `<h4>${match.name}</h4>
        <p><b>Bio:</b>  ${match.bio}</p>
        <p><b>Email:</b>  ${match.email}</p>
        <p><b>Phone:</b>  ${match.phone}</p>
        <p><b>Can Teach You:</b>  </p>
        <p><b>Wants to Learn:</b>  </p>`
	$('#match-modal > div.modal-content').append(content) >>>
		>>> > master
}

function parseJWT(token) {
	let base64Url = token.split('.')[1];
	let base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};

function logOut(event) {
	event.preventDefault()
	localStorage.removeItem('token')
	location.href = '/'
}
