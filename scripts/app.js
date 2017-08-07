$(document).ready(function() {
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
				// let token = parseJWT(res.data)
				localStorage.setItem('token', res.data)
				location.href = '/main.html'
			}
		})
}

function parseJWT(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};
