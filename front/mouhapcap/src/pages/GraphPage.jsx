import {useLocation} from "react-router-dom";
import {
    Button, Collapse,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@mui/material";
import {useEffect, useState} from "react";
import { usePDF } from 'react-to-pdf';
import dayjs from "dayjs";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


export const GraphPage = () => {


    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});

    const { state } = useLocation();


    const [idList, setIdList] = useState([])

    const [graphShown, setGraphShown] = useState(false);

    const [selectedList, setSelectedList] = useState([])

    const [pdfGenerated, setPdfGenerated] = useState(false);

    const list = state.map((e)=>false);

    const [buttonsMap, setButtonsMap] = useState(list);

    const [open, setOpen] = useState(true);

const filterList = ()=>{

    const list = []
    const curatedList =[]
    state.forEach((e)=>{

        list.push(e.sip_info.headers.slice(e.sip_info.headers.indexOf("Call-ID: ")+9, e.sip_info.headers.indexOf("CSeq: ")).split('\r\n')[0])

    })

    list.forEach((e)=>{
        if (!curatedList.includes(e)){
            curatedList.push(e)

        }
    })

    setIdList(curatedList)

}
useEffect(filterList,[])

const handlePDFClick = ()=>{

        setPdfGenerated(true)
    toPDF();

    }


const handleClick =(i)=>{


    setGraphShown(true)

    const list = state


  const filteredList =  list.filter((e,index)=>e.sip_info.headers.includes(idList[i]))

    setSelectedList(filteredList)

}
  const handleExpand = (i) => {

        const list = buttonsMap
        list.fill(false);
        list[i]=true;
        setButtonsMap(list);
        setOpen(!open)
  };




    return (
        <div >
            <Divider style={{width:"500px",margin:"auto", color:"black", borderTopWidth: 5}}></Divider>
            <br/>

            <List dense={false} style={{ width:"500px",margin:"auto",maxHeight: 260, overflow: 'auto', marginTop:-80}}>
                <ListSubheader style={{ fontWeight:"bold"}}>Call IDs</ListSubheader>

                {idList.map((e,index)=><ListItem >
                    <ListItemText style={{width:"20px"}}>{index}</ListItemText>
                    <ListItemButton style={{width:"100%",backgroundColor:"black", color:"whitesmoke"}} divider={true} onClick={()=>handleClick(index)}>{e.trim()}</ListItemButton>
                    <ListItemText></ListItemText>
                </ListItem>)}
            </List>
<Divider style={{width:"500px",margin:"auto", height:"5px", color:"black", borderBottomWidth: 5}}></Divider>
            <br/><br/><br/>

            <Button variant={"contained"} style={{backgroundColor:"black"}} onClick={handlePDFClick}>Generate PDF</Button>


            <br/><br/>

            {graphShown?
                <div ref={targetRef} style={{flexDirection:"column",display:"flex",justifyContent:"space-evenly", alignContent:"space-evenly"}}>


                  <div style={{ width:"50%", margin:"auto"}}>

                    <List style={{width:"100%", alignSelf:"center"}}>
                    <ListSubheader style={{display: "flex",
                    width:"100%",
                        marginBottom:"1px",
                    fontWeight:"bold",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        alignContent: "center",
                        color:"whitesmoke",
                        backgroundColor:"black",
                        }}
                    children={[
                    <ListItemText style={{fontWeight:"bold",}}>
                        Source
                    </ListItemText>,
                    <ListItemText style={{fontWeight:"bold",}}>
                        Method
                    </ListItemText>,
                    <ListItemText style={{fontWeight:"bold",}}>
                        Destination
                    </ListItemText>


               ]}>

                    </ListSubheader>



                {selectedList.map((e,index)=> {

                    console.log(e)

                  return  <ListItem style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",

                      height:"60px",
                      backgroundColor:"grey"
                    }}>

                        <ListItemText style={{height:"60px"}}>{e.sip_info.src_ip === selectedList[0].sip_info.src_ip ? e.sip_info.src_ip : e.sip_info.dst_ip}</ListItemText>
                       <ListItemIcon style={{display:"flex",margin:"auto", flexDirection:"row", justifyContent:"space-around", alignItems:"center", justifyItems:"center", width:"50%"}}>
                           <div style={{marginTop:"-20px",marginBottom:"18px", fontWeight:"bold", width:"100%"}}>{e.sip_info.headers.trim().split('\r\n')[0].split(":")[0]}</div>



                           {e.sip_info.src_ip == selectedList[0].sip_info.src_ip ?
                            <svg style={{marginTop:"-30px",width:"50px",margin:"auto" }} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13.022 14.999v3.251c0 .412.335.75.752.75.188 0 .375-.071.518-.206 1.775-1.685 4.945-4.692 6.396-6.069.2-.189.312-.452.312-.725 0-.274-.112-.536-.312-.725-1.451-1.377-4.621-4.385-6.396-6.068-.143-.136-.33-.207-.518-.207-.417 0-.752.337-.752.75v3.251h-9.02c-.531 0-1.002.47-1.002 1v3.998c0 .53.471 1 1.002 1z" fill-rule="nonzero"/></svg> :
                            <svg style={{marginTop:"-30px",width:"50px",margin:"auto"}} clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fill-rule="nonzero"/></svg>


                           }</ListItemIcon>

                        <div></div>
                        <ListItemText inset={true} style={{height:"60px", alignSelf:"center",margin:"auto"}}>{e.sip_info.src_ip == selectedList[0].sip_info.src_ip ? e.sip_info.dst_ip : e.sip_info.src_ip}</ListItemText>
                    </ListItem>
                })} </List></div>
                    <div style={{width:"100%", flex:1}}>

                        <List dense={true}>
                              {selectedList.map((e, index)=><div><ListItemButton dense={true} key={index} divider={true} sx={{display:"inline-flex",flexDirection:"row",justifyContent:"space-evenly"}} style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly", backgroundColor:"grey"}} onClick={()=>handleExpand(index)}>
        <ListItemText >{index}</ListItemText>
     <ListItemText style={{fontWeight:"bold",color:"whitesmoke", backgroundColor:"black", width:"40px"}}>{dayjs.unix(e.sip_info.time).format('DD/MM/YYYY HH:mm:ss')}</ListItemText>
        <ListItemText>{e.sip_info.src_ip.trim()}</ListItemText>
      <ListItemText>{e.sip_info.dst_ip.trim()}</ListItemText>
         <ListItemText>SIP/SDP</ListItemText>
          <ListItemText>{e.sip_info.body.length}</ListItemText>
                  <ListItemText>seq_number</ListItemText>

         <ListItemText>{e.sip_info.summary.split(",")[0]}</ListItemText>

         {buttonsMap[index] && open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
    <Collapse in={true} timeout="auto" children={

        <List component="div" disablePadding style={{backgroundColor:"white"}}>
        <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"row"}}>
            <div style={{marginLeft:"30px", color:"red", fontWeight:"bold"}}>Request-Line:  </div>{e.sip_info.summary.split(',').map((e)=><div style={{marginLeft:"30px"}}>{e}</div>)}
        </div>

            <div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{ fontWeight:"bold",marginLeft:"30px", marginBottom:"20px", color:"red"}}>Message-Header:  </div>



                {e.sip_info.headers.split('\r\n').map( (e)=>
                    <div style={{display:"flex",flexDirection:"row", justifyContent:"space-around"}}><div style={{fontWeight:"bold",color:"black", marginLeft:"30px"}}>{e.split(":")[0]}</div><div style={{marginLeft:"30px"}}>{((e.split(":")[0].trim()=='From')||(e.split(":")[0].trim()=='To'))?e.split(":")[2]:e.split(":")[1]}</div></div>)}
            </div>


            {e.sip_info.body!=""?<div style={{marginTop:"30px",marginBottom:"30px",display:"flex",flexDirection:"column", overflow:"", justifyContent:"start", alignItems:"start"}}>
                <div style={{marginLeft:"30px", color:"red", fontWeight:"bold"}}>Request-Body:  </div>
                    {e.sip_info.body.split('\r\n').map((e)=><div style={{marginLeft:"30px"}}>{e.trim()}</div>)}
            </div>:
                <div></div>}
        </List>} >

      </Collapse>
    </div>

    )}
                        </List>

                    </div>
                </div>
            :<div></div>}



        </div>
    )
}