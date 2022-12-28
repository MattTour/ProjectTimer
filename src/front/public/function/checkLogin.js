console.log("test");
window.onload = function isLoggedIn () {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        window.location.href = "/login";
    }
}
