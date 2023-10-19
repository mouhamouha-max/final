import {Fragment, useRef,useState,useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
    Button,
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    TextField
} from "@mui/material";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import baseURL from "../utils/BaseURL";
import toast from "react-hot-toast";
const AnalyzePage = () => {

    const navigate = useNavigate();
    const { state } = useLocation();
    const list = state.map((e)=>false)
    const [buttonsMap, setButtonsMap] = useState(list);
    const [data,setData]=useState({})
    const [open, setOpen] = useState(true);
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [packetsList,setPacketsList] = useState(state)
    const headers = ["No","Time","Source","Destination","Protocol","Length","Sequence Number","Info"];
    const dayjs = require('dayjs')
    const getStatistics=async()=>{
        const res= axios.get(`${baseURL}/sip-statistics/`).then(response=>setData(response.data))
    }

    useEffect(()=>{
        getStatistics()
        // state.map((e,i)=>{
        //     buttonsMap.set(i,false)
        // });
        // console.log(buttonsMap)
    },[])

 const handleFilter = () => {





      if (destination ===""){


          const list = packetsList.filter((e) => (e.sip_info.from != null)?e.sip_info.from.includes(source):false);
          setPacketsList(list);
          setShowDetails(true)
          toast.success("data is filtered")

      }
      else if (source ===""){

           const list = packetsList.filter((e) => (e.sip_info.to != null)?e.sip_info.to.includes(destination):false);
           setPacketsList(list);
           setShowDetails(true)
           toast.success("data is filtered")
      }
      else{


          const list = packetsList.filter((e) => ((e.sip_info.from != null)?e.sip_info.from.includes(source):false) && ((e.sip_info.to != null)?e.sip_info.to.includes(destination):false));
          setPacketsList(list);
          setShowDetails(true)
          toast.success("data is filtered")
      }



    }

    const [openm, setOpenm] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    const cancelButtonRef = useRef(null)

const handleNav = ()=>{


        navigate("/graph",{state:packetsList, replace:true})

    }



  const handleClick = (i) => {

        const list = buttonsMap
        list.fill(false);
        list[i]=true;
        setButtonsMap(list);
        setOpen(!open)
  };

    return (
        <div className="mt-20">
            <Transition.Root show={openm} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setOpenm}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-transparent  bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-[#808080] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-[#808080] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base text-xl font-semibold leading-6 text-gray-900">
                      General statistics
                      </Dialog.Title>
                      <div className="mt-2  ">
                      {data?.general_statistics?.invite_count>0?<p className="text-sm text-white  p-4">invite count: {data?.general_statistics?.invite_count} </p>:""}
                      {data?.general_statistics?.ack_count>0?<p className="text-sm text-white  p-4">ack count: {data?.general_statistics?.ack_count} </p>:""}
                      {data?.general_statistics?.options_count>0?<p className="text-sm text-white  p-4">options count: {data?.general_statistics?.options_count} </p>:""}
                      {data?.general_statistics?.bye_count>0?<p className="text-sm text-white  p-4">bye count: {data?.general_statistics?.bye_count} </p>:""}
                      {data?.general_statistics?.cancel_count>0?<p className="text-sm text-white  p-4">cancel count: {data?.general_statistics?.cancel_count} </p>:""}
                      {data?.general_statistics?.prack_count>0?<p className="text-sm text-white  p-4">prack count: {data?.general_statistics?.prack_count} </p>:""}
                      {data?.general_statistics?.info_count>0?<p className="text-sm text-white  p-4">info count: {data?.general_statistics?.info_count} </p>:""}
                
                      </div>
                      <Dialog.Title as="h3" className="text-base text-xl font-semibold leading-6 text-gray-900">
                      Client errors
                      </Dialog.Title>
                      <div className="mt-2  ">
                        
                        {data?.client_errors?.c400?.count>0?<p className="text-sm text-white  p-4">400 Bad Request: {data?.client_errors?.c400?.count} </p>:""}
                        {data?.client_errors?.c401?.count>0?<p className="text-sm text-white  p-4">401 Unauthorized: {data?.client_errors?.c401?.count} </p>:""}
                        {data?.client_errors?.c403?.count>0?<p className="text-sm text-white  p-4"> 403 Forbidden: {data?.client_errors?.c403?.count} </p>:""}
                        {data?.client_errors?.c404?.count>0?<p className="text-sm text-white  p-4">404 Not Found: {data?.client_errors?.c404?.count} </p>:""}
                        {data?.client_errors?.c405?.count>0?<p className="text-sm text-white  p-4">405 Method Not Allowed: {data?.client_errors?.c405?.count} </p>:""}
                        {data?.client_errors?.c407?.count>0?<p className="text-sm text-white  p-4">407 Proxy Authentication Required: {data?.client_errors?.c407?.count} </p>:""}
                        {data?.client_errors?.c408?.count>0?<p className="text-sm text-white  p-4">408 Request Timeout: {data?.client_errors?.c408?.count} </p>:""}
                        {data?.client_errors?.c436?.count>0?<p className="text-sm text-white  p-4">436 Bad Identity Info: {data?.client_errors?.c436?.count} </p>:""}
                        {data?.client_errors?.c480?.count>0?<p className="text-sm text-white  p-4">480 Temporarily Unavailable: {data?.client_errors?.c480?.count} </p>:""}
                        {data?.client_errors?.c481?.count>0?<p className="text-sm text-white  p-4">481 Call/Transaction Does Not Exist: {data?.client_errors?.c481?.count} </p>:""}
                        {data?.client_errors?.c486?.count>0?<p className="text-sm text-white  p-4">486 Busy Here: {data?.client_errors?.c486?.count} </p>:""}
                        {data?.client_errors?.c484?.count>0?<p className="text-sm text-white  p-4">484 Address Incomplete: {data?.client_errors?.c484?.count} </p>:""}
                        {data?.client_errors?.c400?.count==0 &&
                        data?.client_errors?.c401?.count==0 &&
                        data?.client_errors?.c403?.count==0 &&
                        data?.client_errors?.c404?.count==0 &&
                        data?.client_errors?.c405?.count==0 &&
                        data?.client_errors?.c407?.count==0 &&
                        data?.client_errors?.c408?.count==0 &&
                        data?.client_errors?.c436?.count==0 &&
                        data?.client_errors?.c480?.count==0 &&
                        data?.client_errors?.c481?.count==0 &&
                        data?.client_errors?.c486?.count==0 &&
                        data?.client_errors?.c484?.count==0 
                        ?<p className="text-sm text-white  p-4">There is no Client errors </p>:""}
                      
                      </div>
                      <Dialog.Title as="h3" className="text-base text-xl font-semibold leading-6 text-gray-900">
                      Server errors
                      </Dialog.Title>
                      <div className="mt-2  ">
                      {data?.server_errors?.c500?.count>0?<p className="text-sm text-white  p-4">500 Internal Server Error: {data?.server_errors?.c500?.count} </p>:""}
                      {data?.server_errors?.c501?.count>0?<p className="text-sm text-white  p-4">501 Not Implemented: {data?.server_errors?.c501?.count} </p>:""}
                      {data?.server_errors?.c502?.count>0?<p className="text-sm text-white  p-4">502 Bad Gateway or Proxy Error: {data?.server_errors?.c502?.count} </p>:""}
                      {data?.server_errors?.c503?.count>0?<p className="text-sm text-white  p-4">503 Service Unavailable: {data?.server_errors?.c503?.count} </p>:""}
                       {data?.server_errors?.c500?.count==0&&data?.server_errors?.c501?.count==0&&data?.server_errors?.c502?.count==0&& data?.server_errors?.c503?.count==0?<p className="text-sm text-gray-500  p-4">There is no Server errors </p>:""}
              
                      
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#808080] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    onClick={() => setOpenm(false)}
                  >
                    Close
                  </button>
                 
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
            <div style={{width:"100%",display:"flex", flexDirection:"row", justifyContent:"space-evenly", alignItems:"center"}}>
                <TextField style={{width:"260px", height:"50px"}} variant={"outlined"} label={"From"} onChange={(event) => {
                        setSource(event.target.value);
                    }}></TextField>

                <TextField style={{width:"260px", height:"50px"}}  label={"To"} onChange={(event) => {
                        setDestination(event.target.value);
                    }}></TextField>
                <div className="flex justify-between">
                <a onClick={handleFilter} className="bg-black text-white py-3 w-40 rounded-lg text-center mr-8 cursor-pointer">Filter</a>
                <a onClick={()=>setOpenm(true)} className="bg-black text-white py-3 w-40 rounded-lg text-center cursor-pointer mr-8">Statistics</a>
                {showDetails?<a  onClick={handleNav} className="bg-black text-white py-3 w-40 rounded-lg text-center cursor-pointer ">Details</a>:''}
                </div>
            </div>
            <br/>
       
            <br/><br/><br/>

<List dense={true}

      sx={{ width: '100%', bgcolor: 'white' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader  sx={{marginLeft:"-150px",display:"flex",flexDirection: "row", justifyContent:"space-evenly"}}  style={{flexDirection:"row",display:"flex",justifyContent:"space-evenly", alignContent:"space-evenly", backgroundColor:"grey"}} inset={true} component="div" id="nested-list-subheader" children={headers.map((e)=><div style={{width:"150px",display:"inline", flex:"auto", fontWeight:"bold"}}>{"| "+e+" "}</div>)}>
        </ListSubheader>
      }
>

    {packetsList.map((e, index)=><div><ListItemButton dense={true} key={index} divider={true} sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} onClick={()=>handleClick(index)}>
        <ListItemText style={{overflow:"clip"}} >{index}</ListItemText>
     <ListItemText style={{overflow:"clip"}}>{dayjs.unix(e.sip_info.time).format('DD/MM/YYYY HH:mm:ss')}</ListItemText>
        <ListItemText style={{overflow:"clip"}}>{e.sip_info.src_ip.trim()}</ListItemText>
      <ListItemText style={{overflow:"clip"}}>{e.sip_info.dst_ip.trim()}</ListItemText>
         <ListItemText>SIP/SDP</ListItemText>
          <ListItemText>{e.sip_info?.body?.length}</ListItemText>
                  <ListItemText>seq_number</ListItemText>

         <ListItemText>{(typeof e.sip_info.summary === 'string')?e.sip_info.summary.split(",")[0]:"Not decodable"}</ListItemText>

         {buttonsMap[index] && open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
    <Collapse in={buttonsMap[index] == true && open} timeout="auto" children={

        <List component="div" disablePadding style={{backgroundColor:"white"}}>
        <div style={{marginTop:"30px",marginBottom:"30px"}}>
            <div style={{marginLeft:"30px", color:"red",fontWeight:"bold"}}>Request-Line:  </div><div className="mt-5">{(typeof e.sip_info.summary === 'string')?e.sip_info.summary?.split(',').map((e)=><div style={{marginLeft:"30px"}}>{e}</div>):"Expert Info (Warning/Undecoded): Trailing stray characters ( check problem with WireShark )"}</div>
        </div>

            <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{marginLeft:"30px", marginBottom:"20px", color:"red",fontWeight:"bold"}}>Message-Header:  </div>
               

                {e?.sip_info.headers?.split('\r\n').map((e) =>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                                    <div style={{ fontWeight: "bold", color: "black", marginLeft: "30px" }}>{e?.split(":")[0]}</div>
                                                    <div style={{ marginLeft: "30px" }}>{((e?.split(":")[0]?.trim() == 'From') || (e?.split(":")[0]?.trim() == 'To')) ? e?.split(":")[2]?.split('@')[0] : e?.split(":")[1]}</div></div>)}
                                        </div>


                                        {e.sip_info.body != "" ? <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", flexDirection: "column", overflow: "", justifyContent: "start", alignItems: "start" }}> <div style={{marginLeft:"30px",color:"red",fontWeight:"bold"}}>Request-Body:  </div>
                    {(typeof e?.sip_info.body === 'string')?e?.sip_info.body?.split('\r\n')?.map((e)=><div style={{marginLeft:"30px"}}>{e?.trim()}</div>):
                    "Expert Info (Warning/Undecoded): Trailing stray characters ( check problem with WireShark )"}
            </div>:
                <div></div>}
        </List>} >

      </Collapse>
    </div>

    )}

</List>
    </div>
        )
}
export default AnalyzePage