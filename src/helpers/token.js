import jwt from 'jsonwebtoken'

const generarJWT = datos => jwt.sign({ email: datos.email }, process.env.JWT_SECRET, { expiresIn: "1d" })

export default generarJWT