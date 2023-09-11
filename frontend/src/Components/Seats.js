import React, { useState, useEffect } from 'react'
import "../styles/seats.css"
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './authorization/Logout';
import { contx } from '../App';
import { fullLink } from './link';
function Seats() {
    const navigate = useNavigate()
    const role_id = localStorage.getItem("role_id")
    const [shows, setShows] = useState([])
    const [movieId, setMovieId] = useState("")
    const [bookingDatas, setBookingDatas] = useState([])
    const { id } = useParams()
    const username = localStorage.getItem("username")

    const email = localStorage.getItem('email')
    // const [prize, setPrize] = useState(0)
    const { prize, setPrize } = useContext(contx)

    let input = id.split("-")
    let num = +input[1]
    let theatername = input[0]
    const [load, setLoad] = useState(false)





    const foo = () => {
        fetch(`${fullLink}/bookseat/${id}`
            , {
                method: "GET",
                headers: { "x-auth-token": localStorage.getItem('token') }
            }
        )
            .then(data => data.json())
            .then(res => {
                setShows(res.shows);

                setMovieId(res.shows[num]._id)
            })

    }
    useEffect(() => foo(), [])


    function handleChange(e) {

        const value = e.target.value
        const checked = e.target.checked
        if (checked) {
            setBookingDatas([...bookingDatas, value])
            setPrize(prize + 200)
        } else {
            const updatedItems = bookingDatas.filter(ele => (ele != bookingDatas[bookingDatas.length - 1]))
            setBookingDatas(updatedItems)
            setPrize(prize - 200)

        }

        console.log(value, checked)
        console.log(bookingDatas)
    }
    async function handleSubmit(e) {
        setLoad(true)
        e.preventDefault()

        if (prize == 0) {
            setLoad(false)
            toast.warn("please enter the amount", {
                position: toast.POSITION.TOP_RIGHT
            })
        } else {
            // navigate("/pay")
            const data = await fetch(`${fullLink}/userseatbooking/${theatername}/${username}/${movieId}`, {
                method: "PUT",
                body: JSON.stringify(bookingDatas),
                headers: { "Content-type": "application/json" }
            })
            const result = await data.json()
            navigate("/thankYou")
        }








    }

    return (

        <div className="small-box">
            <Logout />

            <div>
                <div className="booking box" style={{ display: "flex", padding: "10px", marginTop: "50px", justifyContent: "center" }}>
                    <div className="booking-section">
                        <form onSubmit={handleSubmit}>
                            <li>

                                <ol className='rows'>
                                    {

                                        shows[num] ?
                                            shows[num].allseats.map((res, index) => {

                                                return (

                                                    <>

 <li className="each-seat" >
     <input disabled={res.booked} type="checkbox" id={`seat-${res.seat_no}`} onChange={handleChange} value={res._id} className="seat-select" />
     <label
         for={`seat-${res.seat_no}`} className={res.booked ? "booked-seat" : "seat"}>{res.seat_no}</label>
 </li>



                                                    </>
                                                )


                                            })
                                            : null




                                    }


                                </ol><h3 style={{ textAlign: "center" }}>₹ {prize}</h3>
                                <Button style={{ margin: "18px", textAlign: "center" }} type="submit" color="success" variant="contained">{load ? <i className="fa fa-circle-o-notch fa-spin"></i> : null}Submit </Button>
                            </li>
                        </form>

                    </div>


                </div>
                <div style={{ margin: "20px", textAlign: "center" }}>
                    <div>Green colour : Booked</div>
                    <div>White colour : not Booked</div>
                    <div>Red colour     : selected</div>
                </div>

                {role_id == 1 ? (<div style={{ display: "flex", alignItems: "center", alignContent: "center", flexDirection: "column" }}>
                    <h2>Booked Users</h2>
                    {

                        shows[num] ?
                            shows[num].allseats.map((res) => {
                                let username = res.username;
                                let booked = res.booked
                                return (
                                    <div>
                                        {res.booked ? <div style={{ display: "flex", justifyContent: "space-between", margin: "20px", width: "300px" }} >
                                            {`${res.seat_no}. ${res.username}`}

                                        </div> : null}
                                    </div>

                                )

                            }) : null
                    }
                </div>) : null}

            </div>




        </div>
    )

}

export default Seats
