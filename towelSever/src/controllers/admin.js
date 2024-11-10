module.exports= alluserAPi= async(req, res)=>{
    try {
        const data = await USERS.find();
        res.status(201).send(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}