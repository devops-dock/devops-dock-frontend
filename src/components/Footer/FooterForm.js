import React, { useState } from 'react'
import axios from 'axios';

const FooterForm = () => {
    const [subscribeEmail, setSubscribeEmail] = useState(null);

    const handleFooterEmail = (e) => {
        setSubscribeEmail({
            [e.target.name]: e.target.value
        });
    }

    const handleFooterSubmit = async (e) => {
        e.preventDefault();
        const sent = await axios.post("http://localhost:5003/subscribe", subscribeEmail)
        alert(sent.data)
        const mailBody = {
            to: subscribeEmail,
            subject: 'Thank You for Subscription',
            html: `
                <div>
                    <ph2>Hello <b>${subscribeEmail.email},</b></h2>
                    <div style="text-align: center; margin: 10px auto; width: 100%;">
                        <h1 style="text-align: center; padding: 10px 0;">DevOps Dock</h1>
                        <h3>Thank you for visiting us and subscribe to our DevOpsDock group.</h3>
                        <h4>We will post updates with latest news, tools and features added to DevOpsDock group. </h4>
                        <h3>In the mean time please visit our <a href='https://techiescamp.com/'><b>Techie's Camp Blog</b></a> for more updates on DevOps </h3>                           
                    </div>              
                    <p>Regards,</p>
                    <p>DevOps Dock</p>
                    <hr />
                    <p style="text-align: center">If you already got this mail please ignore :) </p>
                </div>
            `
        }
        const result = await axios.post("http://localhost:5003/send-mail", mailBody)
        alert(result.data)
        setSubscribeEmail('')
}

return (
    <form className='mb-2 ps-4' onSubmit={handleFooterSubmit}>
        <div className="input-group mb-3">
            <input
                type="email"
                name='email'
                className='form-control border-secondary'
                placeholder='Your email'
                onChange={handleFooterEmail}
                aria-describedby="submitBtn"
                aria-label="your email"
            />
            <button className='btn btn-success input-group-text' type="submit" id="submitBtn">Submit</button>
        </div>
    </form>
)
}

export default FooterForm