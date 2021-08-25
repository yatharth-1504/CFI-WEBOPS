let userBoard : (req : any, res : any) => void;
userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
export = userBoard;