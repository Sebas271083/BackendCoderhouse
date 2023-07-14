import {getNosotros, updateNosotros, addNosotros} from '../service/Nosotros.service.js'


export const findAllNosotros = async(req, res)=>{
    try {
        const nosotros = await getNosotros()
        if(nosotros.length){
            console.log(nosotros)
            // res.json(nosotros)
            res.render('nosotros', {nosotros})
        } else {
            res.status(200).json({message:"No Nosotros"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const findAllNosotrosUpdate = async(req, res)=>{
    try {
        const nosotros = await getNosotros()
        if(nosotros.length){
            console.log(nosotros)
            // res.json(nosotros)
            res.render('nosotrosAdminUpdate', {nosotros})
        } else {
            res.status(200).json({message:"No Nosotros"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const getUpdate = async (req, res)=> {
    const nosotros = await getNosotros()
    console.log(nosotros)
    if(nosotros.length) {
        res.send("La pagina Nosotros ya tiene datos, debe modificarlos")
    } else {
        res.render('nosotrosAdmin', {layout: 'administracion'})
    }
}

export const findUpdateNosotros = async(req, res)=>{
    try {
        const nosotros = await getNosotros()
        if(nosotros.length){
            console.log(nosotros)
            // res.json(nosotros)
            res.render('nosotrosAdminUpdate', {nosotros})
        } else {
            res.status(200).json({message:"No Nosotros"})
        }
    } catch (error) {
        console.log(error)
    }
}

export const addNosotrosAll = async(req, res)=>{
    const {parrafo1, parrafo2, parrafo3, parrafo4, equipo, mision} = req.body
    if(!parrafo1 || !parrafo2 || !parrafo3 || !parrafo4 || !equipo || !mision) {
        res.status(400).json({message: 'Data missing'})
    }
    try {
        const newNosotros = req.body
        console.log("newNosotros", newNosotros)
        const createdNosotros = await addNosotros(newNosotros)
        res.status(200).json({message: 'Nosotros Created', Nosotros: newNosotros})
        // res.render('nosotros');
    } catch (error) {
        console.log(error)
    }
}


export const updateN = async(req, res)=>{
    try {
        console.log(req.params)
        const {id} = req.params;
        console.log(id)
        const updatedNosotros = await updateNosotros(id, req.body);
        console.log(updatedNosotros)
        res.redirect('/admin');
      } catch (error) {
        console.log(error)
      }
}
