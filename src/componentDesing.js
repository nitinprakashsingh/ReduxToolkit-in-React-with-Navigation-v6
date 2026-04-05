import React,{useState,useEffect} from "react";


function NaggroInterview() {
  const [count,setCount] = useState(0);

   useEffect(()=>{
    setCount(count + 1);
    console.log("useEffect called",count);
  },[]);    

  return(
    <div>
      <h1>Count: {count}</h1>
    </div>
  )
}
export default NaggroInterview;