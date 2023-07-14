
export const admin = async(req, res)=>{
    try {
        const auth = req.isAuthenticated();
        console.log(auth)
        const user = req.user.first_name
        if(req.user.isAdmin) {
            res.render('admin', {user})
        } else {
            res.send("Usuario no autorizado")
        }
    } catch (error) {
        res.send("Usuario expiro")
        console.log(error)
    }
}
