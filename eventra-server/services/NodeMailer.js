import nodemailer from 'nodemailer'

// Create a transporter using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "arya12345kishan@gmail.com",
        pass: process.env.EMAIL_NODEMAILER,
    },
});


export const sendMail = async (email, subject, text, html) => {

    try {
        let info = await transporter.sendMail({
            from: 'arya12345kishan@gmail.com',
            to: email,
            subject: subject,
            text: text,
            html: `${html}`
        });

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }

}

// SENDING MAIL AND DELETING TASKNOTIFICATION FROM DATABASE
export const sendingTaskMail = async (task) => {
    console.log("SENDING NOTIFICATIONS");
    // await sendMail(`${task.email}`, "WebBook Task", "Hii User", `${getTaskNotificationHtml(task.title, task.description)}`)
    return task;
}