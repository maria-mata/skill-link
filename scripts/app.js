const baseURL = 'https://young-peak-51032.herokuapp.com/'
// const baseURL = 'http://localhost:8080/'

$(document).ready(function() {
	authorizeUser()
	$('.chips').material_chip()
	$('.button-collapse').sideNav()
	$('form.login').submit(logIn)
	$('form.signup').submit(signup)

	$.get(`${baseURL}skills`)
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

function signup(event) {
	event.preventDefault()
	const name = $('input[name=signup-name]').val()
	const email = $('input[name=signup-email]').val()
	const username = $('input[name=signup-username]').val()
	const password = $('input[name=signup-password]').val()
	const data = {
		name: name,
		email: email,
		username: username,
		password: password,
		bio: "",
		photo: "http://emblemsbattlefield.com/uploads/posts/2014/10/facebook-default-photo-male_1.jpg",
		phone: "",
		skill_learn: 1
	}
	$.post(`${baseURL}auth/signup`, data).then(res => {
		if (res.error) {
			alert(res.error)
		} else {
			alert('Sign up successful.')
			localStorage.setItem('token', res.data)
			location.href = '/main.html'
		}
	})
}

function logIn(event) {
	event.preventDefault()
	const username = $('input[name=login-username]').val()
	const password = $('input[name=login-password]').val()
	const data = {
		username,
		password
	}
	$.post(`${baseURL}auth/login`, data)
		.then(res => {
			if (res.error) {
				alert(res.error)
			} else {
				localStorage.setItem('token', res.data)
				location.href = '/main.html'
			}
		})
}

function authorizeUser() {
	let token = localStorage.getItem('token')
	if (token) {
		location.href = '/main.html'
	}
}
