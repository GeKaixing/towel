import express from 'express';
import { allreplyApi, commentApi, fliterpsotApi,
     forgetpasswordApi, forgetpasswordverificationcodeApi,
      loginApi, nodemailerRegisterApi, postApi, registerApi } from "../../controllers/common.js";

const router = express.Router();

router.post("/login", loginApi);
// send this coe for Register
router.post("/nodemailerRegister", nodemailerRegisterApi);
// send this coe for Register
router.post("/forgetpasswordverificationcode", forgetpasswordverificationcodeApi);

router.post("/forgetpassword",forgetpasswordApi);

router.post("/register",registerApi);
//this is get the post API
router.get("/post", postApi);
//this a filter post API
router.post("/fliterpsot",fliterpsotApi);
//get all comments API
router.get("/comment/:id",commentApi );
// this is an api for getAll  reply APi
router.get("/allreply/:id", allreplyApi);

export default  router;
