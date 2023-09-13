export const loginV1 = (req, res, next)=>{
    console.log(req.body);
    res.status(200).json(req.body);
}