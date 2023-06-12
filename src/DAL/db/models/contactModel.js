import mongoose from 'mongoose';


const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: {
    type: String,
    required: true
}, 
  message: { 
    type: String, 
    required: true 
}
});

const Contacto = mongoose.model('Contacto', contactSchema);
export default Contacto;
