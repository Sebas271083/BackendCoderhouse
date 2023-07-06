

export const admin = async(req, res)=>{
    try {
        const auth = req.isAuthenticated();
        console.log(auth)
        console.log(req.user.isAdmin)
        if(req.user.isAdmin) {
            res.render('admin')
        } else {
            res.send("Usuario no autorizado")
        }

    } catch (error) {
        console.log(error)
    }
}
