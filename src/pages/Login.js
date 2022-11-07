import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {requestOTP, verifyOTP} from '../api';
import {ADMIN_EMAIL} from '../config';
import {useAuth} from "../hooks/useAuth";

const Login = ({ setIsAuthenticated }) => {
    const {login} = useAuth();

    const [email, setEmail] = useState(ADMIN_EMAIL);
    const [stage, setStage] = useState(1);
    const [otp, setOTP] = useState('');

    const handleSendOTP = async () => {
        try {
            const otp = await requestOTP();
            if (otp.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sent Email to Admin Address',
                    text: 'Please check your inbox and get your OTP',
                    showConfirmButton: true,
                    willClose: () => {
                        setStage(2);
                    }
                });
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleVerifyOTP = async () => {
        try {
            const result = await verifyOTP(otp)
            console.log(result);
            if (result && result.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success',
                    text: 'You logged in successfully',
                    showConfirmButton: true,
                    willClose: () => {
                        // localStorage.setItem('is_authenticated', true);
                        // setIsAuthenticated(true);
                        login({
                            email: ADMIN_EMAIL
                        })
                    }
                });
            } else {
                Swal.fire({
                    icon: 'Error',
                    title: 'Login',
                    text: result.message,
                    showConfirmButton: true
                });
            }
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div className="small-container">
            <h1>Admin Login11</h1>
            <label htmlFor="email">Admin Email</label>
            <input
                id="email"
                type="email"
                name="email"
                placeholder="admin@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled
            />
            {stage === 1 && <input style={{ marginTop: '12px' }} type="button" value="Send OTP to Admin Email" onClick={handleSendOTP}/>}
            {stage === 2 && <div>
                <label htmlFor="otp">Enter OTP</label>
                <input
                    id="otp"
                    type="text"
                    name="otp"
                    placeholder="Paste your OTP"
                    value={otp}
                    onChange={e => setOTP(e.target.value)}
                />
                <input style={{ marginTop: '12px' }} type="button" value="Verify OTP" onClick={handleVerifyOTP}/>
            </div>}
        </div>
    );
};

export default Login;
