import { useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { usePDF } from 'react-to-pdf';
import dayjs from "dayjs";
import { ExpandLess, ExpandMore } from "@mui/icons-material";


const GraphPage = () => {


    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

    const { state } = useLocation();


    const [idList, setIdList] = useState([])

    const [graphShown, setGraphShown] = useState(false);

    const [selectedList, setSelectedList] = useState([])

    const [pdfGenerated, setPdfGenerated] = useState(false);

    const list = state.map((e) => false);

    const [buttonsMap, setButtonsMap] = useState(list);

    const [open, setOpen] = useState(true);

    const filterList = () => {

        const list = []
        const curatedList = []
        state.forEach((e) => {

            list.push(e.sip_info.headers.slice(e.sip_info.headers.indexOf("Call-ID: ") + 9, e.sip_info.headers.indexOf("CSeq: ")).split('\r\n')[0])

        })

        list.forEach((e) => {
            if (!curatedList.includes(e)) {
                curatedList.push(e)

            }
        })

        setIdList(curatedList)

    }
    useEffect(filterList, [])

    const handlePDFClick = () => {

        setPdfGenerated(true)
        toPDF();

    }


    const handleClick = (i) => {


        setGraphShown(true)

        const list = state


        const filteredList = list.filter((e, index) => e.sip_info.headers.includes(idList[i]))

        setSelectedList(filteredList)

    }
    const handleExpand = (i) => {

        const list = buttonsMap
        list.fill(false);
        list[i] = true;
        setButtonsMap(list);
        setOpen(!open)
    };




    return (
        <div >
            <Divider style={{ width: "500px", margin: "auto", color: "black", borderTopWidth: 5 }}></Divider>
            <br />

            <List dense={false} style={{ width: "500px", margin: "auto", maxHeight: 260, overflow: 'auto', marginTop: 20 }}>
                <ListSubheader style={{ fontWeight: "bold" }}>Call IDs</ListSubheader>

                {idList.map((e, index) => <ListItem >
                    <ListItemText style={{ width: "20px" }}>{index}</ListItemText>
                    <ListItemButton style={{ width: "100%", backgroundColor: "black", color: "whitesmoke" }} divider={true} onClick={() => handleClick(index)}>{e.trim()}</ListItemButton>
                    <ListItemText></ListItemText>
                </ListItem>)}
            </List>
            <Divider style={{ width: "500px", margin: "auto", height: "5px", color: "black", borderBottomWidth: 5 }}></Divider>
            <br /><br /><br />
            <div className="flex justify-center">
                <Button variant={"contained"} style={{ backgroundColor: "black" }} onClick={handlePDFClick}>Generate PDF</Button>
            </div>

            <br /><br />

            {graphShown ?
                <div ref={targetRef} style={{ flexDirection: "column", display: "flex", justifyContent: "space-evenly", alignContent: "space-evenly" }}>


                    <div style={{ width: "50%", margin: "auto" }}>


                        <div className="p-8">
                            <div className="flex mb-6">

                                <div className="w-1/2 text-left ml-[-40px]">
                                    {selectedList[0].sip_info.src_ip}
                                </div>
                                <div className="w-1/2 text-right ml-[780px]">
                                    {selectedList[0].sip_info.dst_ip}
                                </div>
                            </div>
                            {selectedList?.map(item =>
                                <div className="border-dashed border-r-2 border-l-2 border-black flex text-center py-6">

                                    <div className={`border-black border-b-2 w-full   relative ${item.sip_info.src_ip == selectedList[0].sip_info.src_ip ? "graph_arl" : "graph_arr"}`}>
                                        {item.sip_info.headers.trim().split('\r\n')[0].split(":")[0]}
                                    </div>

                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ width: "100%", flex: 1 }}>

                        <List dense={true}>
                            {selectedList.map((e, index) => <div><ListItemButton dense={true} key={index} divider={true} sx={{ display: "inline-flex", flexDirection: "row", justifyContent: "space-evenly" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "grey" }} onClick={() => handleExpand(index)}>
                                <ListItemText >{index}</ListItemText>
                                <ListItemText style={{ fontWeight: "bold", color: "whitesmoke", textDecoration: "underline", width: "40px" }}>{dayjs.unix(e.sip_info.time).format('DD/MM/YYYY HH:mm:ss')}</ListItemText>
                                <ListItemText>{e.sip_info.src_ip.trim()}</ListItemText>
                                <ListItemText>{e.sip_info.dst_ip.trim()}</ListItemText>
                                <ListItemText>SIP/SDP</ListItemText>
                                <ListItemText>{e.sip_info.body.length}</ListItemText>
                                <ListItemText>seq_number</ListItemText>

                                <ListItemText>{e.sip_info.headers?.split('\r\n')[0]?.split(':')[0]+" "+(e?.sip_info.headers?.split('\r\n')[0]?.split(':')[1]?.split('@')[0]?e?.sip_info.headers?.split('\r\n')[0]?.split(':')[1]?.split('@')[0]?.split(';')[0]:'')}</ListItemText>

                                {buttonsMap[index] && open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                                <Collapse in={buttonsMap[index] == true && open} timeout="auto" children={

                                    <List component="div" disablePadding style={{ backgroundColor: "white" }}>
                                        <div style={{ marginTop: "30px", marginBottom: "30px", }}>
                                            <div style={{ marginTop: "30px", marginLeft: "30px", color: "red", fontWeight: "bold" }}>Request-Line:  </div><div className="mt-6">{e.sip_info.summary.split(',').map((e) => <div style={{ marginLeft: "30px" }}>{e}</div>)}</div>
                                        </div>

                                        <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", flexDirection: "column", overflow: "", justifyContent: "start", alignItems: "start" }}>
                                            <div style={{ fontWeight: "bold", marginLeft: "30px", marginBottom: "20px", color: "red" }}>Message-Header:  </div>



                                            {e.sip_info.headers.split('\r\n').map((e) =>
                                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                                                    <div style={{ fontWeight: "bold", color: "black", marginLeft: "30px" }}>{e.split(":")[0]}</div>
                                                    <div style={{ marginLeft: "30px" }}>{((e.split(":")[0].trim() == 'From') || (e.split(":")[0].trim() == 'To')) ? e.split(":")[2].split('@')[0] : e.split(":")[1]}</div></div>)}
                                        </div>


                                        {e.sip_info.body != "" ? <div style={{ marginTop: "30px", marginBottom: "30px", display: "flex", flexDirection: "column", overflow: "", justifyContent: "start", alignItems: "start" }}>
                                            <div style={{ marginLeft: "30px", color: "red", fontWeight: "bold" }}>Request-Body:  </div>
                                            {e.sip_info.body.split('\r\n').map((e) => <div style={{ marginLeft: "30px" }}>{e.trim()}</div>)}
                                        </div> :
                                            <div></div>}
                                    </List>} >

                                </Collapse>
                            </div>

                            )}
                        </List>

                    </div>
                </div>
                : <div></div>}



        </div>
    )
}
export default GraphPage