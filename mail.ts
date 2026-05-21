import * as nodemailer from "nodemailer";
import config from "@prettylab/config";

const mail = nodemailer.createTransport(config.next_be.mail as any);

export default mail;
