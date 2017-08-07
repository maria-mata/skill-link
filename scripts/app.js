$(document).ready(function() {
	authorizeUser()
	$('.chips').material_chip()
	$('.button-collapse').sideNav()
	$('form.login').submit(logIn)

	// const baseURL = 'https://young-peak-51032.herokuapp.com/'
	const baseURL = 'http://localhost:8080/'

	$.get(baseURL + 'skills')
		.then(appendSkills)

	$('.info').click(function() {
		$('#slide-out').toggle()
	})
});

function appendSkills(data) {
	for (let i = 0; i < data.length; i++) {
		let skill = `<li>
                  <div class="chip">
                    <i class="material-icons">code</i> ${data[i].name}
                  </div>
                </li>`

		$('#skillsList').append(skill)
	}
};

function logIn(event) {
	event.preventDefault()
	const username = $('input[name=login-username]').val()
	const password = $('input[name=login-password]').val()
	const data = {
		username,
		password
	}
	$.post(`http://localhost:8080/auth/login`, data)
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
