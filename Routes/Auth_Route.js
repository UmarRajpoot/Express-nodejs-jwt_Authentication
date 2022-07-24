import { Router } from "express";
import Auth_Controller from "../Controller/Auth_Controller";

import check_token from "../Middleware/check_token";
import generate_refresh from "../Middleware/generate_refresh";

const router = Router();

router.post("/register", Auth_Controller.register);
router.post("/login", Auth_Controller.login);

router.get("/fetchUsers", check_token, Auth_Controller.fetch_data);

export default router;
