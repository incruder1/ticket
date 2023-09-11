import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom'
import Seats from './Seats';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/shows.css";
import Logout from './authorization/Logout';
import { fullLink } from './link';
import moment from 'moment/moment';
function Shows() {
    const navigate = useNavigate()
    const { id } = useParams()
    const todayDate = new Date()
    console.log(todayDate)
    const [shows, setShows] = useState([])
    const role_id = localStorage.getItem("role_id")

    const foo = () => {

        fetch(`${fullLink}/shows/${id}`
            , {
                method: "GET",
                headers: { "x-auth-token": localStorage.getItem('token') }
            }
        )
            .then(data => data.json())
            .then(res => setShows(res.shows))

    }
    const delshows = (id, mid) => {


        const data = fetch(`${fullLink}/delshows/${id}-${mid}`, {
            method: "PUT"
        })
            .then((data => data.json()))
            .then(res => toast.success(res.message, {
                position: toast.POSITION.TOP_CENTER
            }))
    }
    useEffect(() => foo(), [])
    return (
        <div>
            <Logout />
            <h1 style={{ textAlign: "center" }} >
                Shows
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap" }} >
{
    shows.map((res, index) => {
        var showTime = new Date(res.gettingDates).toLocaleString(undefined, { timeZone: "Asia/Kolkata" })
        return (
            res.moviename != "" && moment(res.gettingDates).isAfter(todayDate) ? (
    <div className="movie-box" key={index} style={{ width: "300px", display: "flex", padding: "30px", margin: "15px", borderRadius: "7px", boxShadow: "2px 2px 20px lightgrey", flexDirection: "column", alignItems: "center" }}>
 <img className='movie-image' src={res.movieimage} alt={res.moviename} />
 <h2 >{res.moviename}</h2>
 <div style={{ margin: "15px" }}>{showTime}</div>
 <Button onClick={() => navigate(`/bookseat/${id}-${index}`)} variant="contained">seats</Button>
 {role_id == 1 ? (<Button style={{ margin: "20px" }} color="error" onClick={() => delshows(id, res._id)} variant="contained">Delete Show</Button>
 ) : null}
                </div>
            ) : null
        )
    })
}</div>
        </div>
    )
}

export default Shows