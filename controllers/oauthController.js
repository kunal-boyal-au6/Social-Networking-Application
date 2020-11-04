module.exports = {
    async fetchUserFromGoogle(req, res) {
        try {
            const { user } = req;
            const accessToken = await user.generateToken();
            user.accessToken = accessToken
            await user.save()
            await res.cookie('accessToken', accessToken, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
                httpOnly: true,
                sameSite: "none"
            });
            // res.redirect(301,'http://localhost:1234/#dashboard')
            res.redirect(`https://secure-river-06925.herokuapp.com/#dashboard`)

        }
        catch (err) {
            console.log("Error", err.message)

        }
    },
    async fetchUserFromFacebook(req, res){
        const user = req.user;
       const accessToken = await user.generateToken();
       user.accessToken = accessToken
    // Send the token as a cookie ..
       res.cookie("accessToken", accessToken, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 12),
      httpOnly: true,
      sameSite: "none"
    });
    res.redirect("https://secure-river-06925.herokuapp.com/#dashboard");
    }
}