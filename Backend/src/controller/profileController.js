
//the data are dummy
const profileControlller = (req, res, next)=>{
    res.status(200).json({
        title: "Profile of a user ",
        name: "Profile name for the user",
        picture: "the user of picture"
    })
}
export default profileControlller;