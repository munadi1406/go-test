import Users from '../model/UsersModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';



export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (!name || !validator.isLength(name, { min: 5, max: 50 }) || !validator.matches(name, /^[a-zA-Z_]{5,50}$/)) return res.status(400).json({ msg: "Nama harus terdiri dari 5 karakter atau lebih dan tidak boleh mengandung angka atau karakter khusus" });
    const nameExist = await Users.findOne({where:{name}})
    if(nameExist) return res.status(400).json({msg:"Nama Tidak Tersedia"})

    if (!email || !validator.isEmail(email)) return res.status(400).json({ msg: "Email yang Anda masukkan tidak valid" })

    // validasi domain email
    const domain = email.split(".")[1];
    if (["tk", "ml", "ga", "cf", "gq"].includes(domain)) return res.status(400).json({ msg: "Domain email tidak valid" });


    // validasi email jika email sudah terdafatar
    const emailExist = await Users.findOne({ where: { email: email } });
    if (emailExist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    if (!validator.isLength(password, { min: 8, max: 50 })) return res.status(400).json({ msg: "Password Minimal 8 Karakter Dan Maksimal 50 Karakter" })
    if (!password || !validator.isStrongPassword(password)) return res.status(400).json({ msg: "Password harus terdiri dari huruf besar, huruf kecil, angka, dan karakter khusus" });
    if (password != confPassword) return res.status(400).json({ msg: 'Konfirmasi Password tidak sama dengan Password' });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({ msg: 'register berhasil' });
    } catch (error) {
        res.status(500).json({ msg: "Terjadi kesalahan" });
    }
}






