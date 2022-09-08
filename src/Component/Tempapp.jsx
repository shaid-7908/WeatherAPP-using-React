import React, { useEffect, useState } from 'react';

const Tempapp=()=> {

    const [city, setCity]=useState(null);
    const [search, setSearch] = useState("Mumbai");
    //Editing here==================================================================
    const [incserach,setIncsearch]=useState("Mumbai");
    const [timeo,setTimeo]=useState() 
    const [dayo,setDayo]=useState()
    const [montho,setMontho]=useState()
    //==============================================================================
    let responce;

    useEffect(()=>{
        const fetchApi = async() =>{
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ccb6270eb8d0736e9d15a7dbda8386df`;
            responce =await fetch(url);
            if(responce.status===404){
                console.log("Please set a city");
            }
            else{
                const resJson = await responce.json();
            // console.log(resJson);
            setCity(resJson.main);
            }
        }
        fetchApi();
    },[search]);
    
        const style={
            color:'yellow'
        }
        // const CurDate=document.getElementById('cdate');
        // let weathercon=document.getElementById('weathercon');
        const getCurrentDay=()=>{
            const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Satur"];
            let currentDay=new Date();
            let Day=days[currentDay.getDay()];
            return Day;
        };
        const getCurrentDate=()=>{
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let currentDate =new Date();
            let month = months[currentDate.getMonth()];
            let day = currentDate.getDate();
            let date=month+" "+day;
            return date;
        };
        const getCurrentTime=()=>{
            let currentTime=new Date();
            let hour=currentTime.getHours();
            let min=currentTime.getMinutes();
            let sec=currentTime.getSeconds();
            let period="AM";
            if(hour>11){
                period="PM";
                if(hour>12){
                    hour-=12;
                }
            }
            if(min<10){
                min= "0"+min;
            }
            if(sec<10){
                sec= "0"+sec;
            }

            let time=`${hour} : ${min} :${sec} ${period}`;
            
            //Edit here=================//
             setTimeo(time);
             setDayo(getCurrentDay());
             setMontho(getCurrentDate()) ;
            //==============================//
           
        }
        
        setInterval(getCurrentTime,1000);
        
        return (
            <>
                <div className='box'>
                    <div className="inputData">
                       //Edit here===================//
                        <input type="search" className="inputField" value={incserach} onChange={(event)=>{ setIncsearch(event.target.value) }}/>
                        <button className='button'onClick={()=>setSearch(incserach)}> Get Weather </button>
                      //===============================//
                      
                    </div>
                
                    {!city ? (
                        <h1 className='errorMsg'>No Data Found</h1>
                    ):(
                    <div>
                        <div className='wave -one'></div>
                    <div className='wave -two'></div>
                    <div className='wave -three'></div>
                    
                    <div id="weathercon">
                        <i className="fa-solid fa-sun" style={style}></i>
                    </div>
                    <div className="info">
                        <h2 className='location'>
                            <i className="fa-solid fa-street-view" ></i>{search}
                        </h2>
                        <p id='cdate'>   </p>
                        <h1 className='temp'>{city.temp} C</h1>
                        <h3 className='tempmin_max'>Min:{city.temp_min} C | Max {city.temp_max} C</h3>
                    </div>
                    </div>
                    )}
                    
                </div>
            </>
        )
    }

 
export default Tempapp;
