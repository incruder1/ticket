import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup"
import Logout from './authorization/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fullLink } from './link';

const bookV = Yup.object({
    theatername: Yup.string().min(3, "Please enter valid theater name").required("Please enter a Theater name")
})
function CreateTheater() {
    const [load, setLoad] = useState(false)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            theatername: ""
        }, validationSchema: bookV, onSubmit: async (values) => {
            setLoad(true)
            const theaterName = {
                theatername: values.theatername,
                shows: [{
                    moviename: "",
                    currentDates: "",
                    gettingDates: "",
                    movieEndDateandTime: "",
                    seats: "",

                }]
            }
            let data = await fetch(`${fullLink}/createtheater`, {
                method: 'POST',
                body: JSON.stringify(theaterName),
                headers: {
                    "Content-type": "application/json",
                    "x-auth-token": localStorage.getItem('token')
                }
            })

            const result = await data.json()
            console.log(result)
            if (result.message == "Theater created Successfully") {
                toast.success("Theater Created Successfully wait till 3 seconds", { position: toast.POSITION.TOP_LEFT })
                setTimeout(() => {

                    navigate(`/theaters`)
                }, 3000);
            } else {
                setLoad(false)
                toast.warn("theatername already created", { postion: toast.POSITION.TOP_LEFT })
            }



        }
    })
    return (
        <>
            <Logout />
            <div style={{ textAlign: "center" }}>
                <h1 style={{ textAlign: "center", marginTop: "15px" }}>Create Theater</h1>
            </div>
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "flex-end" }}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField onBlur={formik.handleBlur} style={{ marginRight: "25px" }} id="standard-basic" name="theatername" label="Enter a Theater Name" onChange={formik.handleChange} value={formik.values.theatername} variant="standard" />
                    <div style={{ color: "red", fontSize: "15px", marginLeft: "5px", marginTop: "15px" }}>
                        {formik.touched.theatername && formik.errors.theatername ? formik.errors.theatername : null}

                    </div>
                    <Button style={{ marginTop: "8px" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}
                        Create Theater</Button>
                </form>
            </div>
        </>

    )
}

export default CreateTheater