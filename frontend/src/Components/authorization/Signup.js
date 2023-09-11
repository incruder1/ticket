import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { fullLink } from '../link';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const valiBook = Yup.object({
    username: Yup.string().required("Please fill the username"),
    password: Yup.string().required("Please fill the password"),
    email: Yup.string().required("Please fill the email")
})

function Signup() {
    const [load, setLoad] = useState(false)
    const [Sload, setSLoad] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            email: ""
        }, validationSchema: valiBook, onSubmit: async (values) => {
            setLoad(true)
            const signInfo = {
                username: values.username,
                password: values.password,
                email: values.email
            }
            let data = await fetch(`${fullLink}/signup`, {
                method: 'POST',
                body: JSON.stringify(signInfo),
                headers: { "Content-type": "application/json" }

            })
            let result = await data.json()
            if (result.message == "sign success") {
                toast.success("signin successful", { position: toast.POSITION.TOP_CENTER })
                navigate("/")
            } else {
                setLoad(false)
                alert("please try another username")
            }
        }
    })
    return (
        <div >
            <h2 style={{ textAlign: "center", margin: '25px' }}>Book My Show</h2>
            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>


                <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
                    <h4 style={{ textAlign: "center" }}>Sign Up</h4>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="username" label="Username" onChange={formik.handleChange}
                        value={formik.values.username} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.username && formik.errors.username ? formik.errors.username : null}

                    </div>
                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="password" label="Password" onChange={formik.handleChange}
                        value={formik.values.password} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                    </div>

                    <TextField onBlur={formik.handleBlur} style={{ margin: "15px", width: "300px" }} id="standard-basic"
                        name="email" label="Email" onChange={formik.handleChange}
                        value={formik.values.email} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "10px" }}>
                        {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button style={{ marginTop: "8px" }} type="submit" color="primary" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}signup</Button>
                        <Button style={{ marginTop: "8px" }} onClick={() => navigate("/")} color="primary" variant="contained">{Sload ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}login</Button>

                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup