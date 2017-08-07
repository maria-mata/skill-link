const userId = 1
const userURL = 'https://young-peak-51032.herokuapp.com/users/'
const decodedToken = parseJWT(localStorage.getItem('token'))
console.log(decodedToken);

$(document).ready(function() {

	$('.button-collapse').sideNav()
	$('.modal').modal();
	$('.logOut').click(logOut)



	$.get(userURL + userId)
		.then(showUserProfile)

	$('#user-put').submit(userPutRequest)
});

function showUserProfile(data) {
	// missing photo display
	$('.card-title').text(data[0].name)
	$('#name').val(data[0].name)
	$('#email').val(data[0].email)
	$('#phone').val(data[0].phone)
	$('#bio').val(data[0].bio)
}

function userPutRequest(event) {
	event.preventDefault()
	// add photo later
	let putURL = userURL + userId
	$.ajax({
		url: putURL,
		type: 'PUT',
		data: {
			name: $('#name').val(),
			email: $('#email').val(),
			phone: $('#phone').val(),
			bio: $('#bio').val()
		},
		success: function(result) {
			// Do something with the result
			showUserProfile(result)
		}
	});
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
