import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Success() {

    const navigate = useNavigate()
    toast.success("Please wait redirecting to theaters", { position: toast.POSITION.TOP_CENTER })

    setTimeout(() => {
        navigate("/theaters")
    }, 4000);
    return (
        <div>
            <h2 style={{ display: "flex", alignContent: "center", textAlign: "center" }}>Payment Success</h2>

        </div>

    )
}

export default Success