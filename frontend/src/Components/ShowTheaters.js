import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Logout from './authorization/Logout';
import { fullLink } from './link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ShowTheaters() {
    const navigate = useNavigate()
    const [datas, setDatas] = useState([])
    const role_id = localStorage.getItem('role_id')
    const theaterData = () => {
        const values = fetch(`${fullLink}/gettheaters`, {
            method: "GET"
        })
            .then(values => values.json())
            .then(data => setDatas(data))



    }
    const deltheater = (name) => {
        const data = fetch(`${fullLink}/deltheater/${name}`, {
            method: "DELETE"
        })
            .then((data => data.json()))
            .then(res => {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                const dDatas = datas.filter(result => {
                    return (result.theatername != name)
                })
                setDatas(dDatas)
            })

    }

    useEffect(() => theaterData(), [])

    return (
        <div>
            <Logout />
            <div style={{ textAlign: "center" }}><h2>Theaters</h2></div>
            <div style={{ textAlign: 'center', margin: "20px" }}>
                {role_id == 1 ? (<Button style={{ margin: "20px" }} onClick={() => navigate(`/createtheater`)} variant="contained">Create theater</Button>
                ) : null}
            </div>

            {
                datas.map((res, index) => {
                    return (
                        <div key={index} style={{ display: "flex", padding: "30px", margin: "15px", borderRadius: "7px", boxShadow: "2px 2px 20px lightgrey", flexDirection: "column", alignItems: "center" }} >
                            <h4 style={{}}>{res.theatername}</h4>
                            {role_id == 1 ? (<Button style={{ margin: "20px" }} onClick={() => { navigate(`/createshows/${res.theatername}`) }} variant="contained">Create show</Button>
                            ) : null}
                            <Button onClick={() => { navigate(`/shows/${res.theatername}`) }} variant="contained">shows</Button>

                            {role_id == 1 ? (<Button style={{ margin: "18px" }} onClick={() => { deltheater(res.theatername); }} color="error" variant="contained">Delete Theater</Button>
                            ) : null}


                        </div>

                    )
                })
            }
        </div>

    )
}

export default ShowTheaters