import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from "yup";
import { fullLink } from '../link';
import { toast } from 'react-toastify';

const bookVali = Yup.object({
    username: Yup.string().required("Please fill the username"),
    password: Yup.string().required("Please fill the password")
})
function Login() {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        }, validationSchema: bookVali, onSubmit: async (values) => {
            setLoad(true)
            const loginInfo = {
                username: values.username,
                password: values.password
            }
            let data = await fetch(`${fullLink}/login`, {
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: { "Content-type": "application/json" }
            })
            let result = await data.json()
            // let dataforPayment = {}
            if (result.message == "successful login") {
                toast.success("login success")
                localStorage.setItem("token", result.token)
                localStorage.setItem('role_id', result.role_id)
                localStorage.setItem("username", loginInfo.username)
                localStorage.setItem("email", result.email)

                navigate("/theaters")
            } else {
                toast.error("username or password is incorrect please try again ")
                setLoad(false)

                navigate("/")
            }
        }
    })
    return (

        <div >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: "15px" }}>Login</h2>
                <Button style={{ margin: "15px" }} onClick={() => navigate("/signup")} color="success" variant="contained">Signup</Button>

            </div>

            <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>

                <div>
                    <form style={{ padding: "40px", width: "400px", borderRadius: "7px", boxShadow: "2px 2px 20px black" }} onSubmit={formik.handleSubmit}>
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
                        <Button style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}login</Button>

                    </form>
                 
                </div>

            </div>

        </div>
    )
}

export default Login