window.onload = function isLoggedIn () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "/login";
    }
}
