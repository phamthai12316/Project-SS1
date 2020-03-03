$().ready(function () {
    $('#signup-form').validate({
        rules:{
            username: "required",
            password: {
                required: true,
                minLength: 6
            },
            email: {
                required: true,
                email: true
            },
        },
        message: {
            username: "Please enter your username",
            password: {
                required: "Please provide a password",
                minLength: "Your password must be at least 6 characters long"
            },
        }
    })
});