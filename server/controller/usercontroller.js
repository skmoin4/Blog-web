import Userrepository from "../repository/user.repository.js";

export default class UserController {
  constructor() {
    this.Userrepository = new Userrepository();
  }

  async signUp(req, res) {
    const { name, Email, Mobilenumber, password } = req.body;

    if (!name || !Email || !Mobilenumber || !password) {
      return res.status(400).send({ error: 'All fields are required' });
    }

    const user = { name, Email, Mobilenumber, password };
    
    try {
      const savedUser = await this.Userrepository.signUp(user);
      res.status(201).send(savedUser);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async login(req, res) {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    try {
      const user = await this.Userrepository.login(Email, password);
      if (!user) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }
  
      await this.Userrepository.updateLastLogin(user._id);
      console.log("Last login timestamp updated for user:", user._id);
      res.status(200).send({ message: "Login successful", user });
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  async getUser(req, res) {
    try {
      const users = await this.Userrepository.getUser();
      
      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }
      users.forEach(user => {
        console.log(user._id.toString()); // Convert ObjectId to string
    });

      return res.status(200).json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}
