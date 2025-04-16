import AdminRepository from "../repository/admin.repo.js";

export default class AdminController {
  constructor() {
    this.adminRepo = new AdminRepository();
  }

  createNewAdmin = async (req, res) => {
    try {
      const { Email, password } = req.body;

      if (!Email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const newAdmin = await this.adminRepo.createAdmin(Email, password);

      if (!newAdmin) {
        return res.status(500).json({ message: "Failed to create admin" });
      }

      res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
      console.error("Error in AdminController:", error);

    }
  };

  async Adminlogin(req, res) {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }

    try {
      const admin = await this.adminRepo.Adminlogin(Email, password);
      if (!admin) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }
      res.status(200).send(admin);
  
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
}
