export function adminCheck(req, res, next){
    if(req.session?.user?.role === "admin"){
        return next()
    }
    return res.status(403).send("Autentication Error")
}

export function validUser(req, res, next){
    if(req.session?.user){
        return next();
    }
    return res.status(401).render("error", {err: "autentication error"})
}