import './App.css';
import { Routes, Route } from 'react-router-dom';
import {AnalyzePage} from "./pages/AnalyzePage";
import {UploadPage} from "./pages/UploadPage";
import {GraphPage} from "./pages/GraphPage";



function App() {
  return (

     <div className="App" >
         <header style={{display: "flex",flexDirection:"row",justifyContent:"space-between", alignItems:"center", justifyItems:"center", height:"82px", backgroundColor:"black"}}><img  src={"https://i.ibb.co/vZXCBxn/368558567-236796635999343-3212075310249196059-n.png"} width={"200px"} height={"100%"}/><div style={{height:"48px" ,display: "inline", fontSize:"48px",color:"white", marginTop:"-28px"}}>Packet Analyzer</div><div style={{width:"240px"}}></div></header>
     <br/><br/><br/><br/>

      <Routes>
        <Route path="/" element={<UploadPage />} />
          <Route path="/analyze" element={<AnalyzePage/>} render={(props) => <AnalyzePage {...props}/>}/>
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </div>
  );
}

export default App;
