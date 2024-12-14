import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axiosInstance from "../../axios";

export default function Task() {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [trigger,setTrigger]= useState(false)
  const [isEdit,setIsEdit]= useState(false)
  const [id,setId]= useState(null)
  function handleTask(e) {
    setTask(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if(!isEdit){
        const data = await axiosInstance.post("/list", { list: task });
      

        if (data) {
          
          alert(data.data.message);
         
        }

    }else{
        const data= await axiosInstance.put(`/list/${id}`,{list:task})
       
        if(data){
            alert(data.data.message)
            
            
        }
       
    }
   handleClear()
   
    setTrigger(!trigger)

 
  }

  useEffect(() => {
    axiosInstance
      .get("/list")
      .then((data) => {
        setData(data.data.data);
        console.log(data.data.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [trigger]);

  const handleClear=()=>{
        setIsEdit(false)
        setTask("")
  }

  const handleDelete=(id)=>{
    
    if( confirm("dp you Want To delete")== true){
        
      const data=   axiosInstance.delete(`/list/${id}`)
      if(data){
        setTrigger(!trigger)
        alert(data.data.message)
      }
    }
  

  }

  const handleEdit =(item)=>{
            setIsEdit(true)
            setTask(item.list)
            setId(item._id)
      
  }

  return (
    <div className="d-flex align-items-center w-100 h-100 justify-content-center flex-column">
      <InputGroup className="w-50 ">
        <Form.Control
          onChange={handleTask}
          placeholder="Today tasks"
          aria-label="Today tasks"
          aria-describedby="basic-addon2"
          value={task}
        />
        <Button
          onClick={handleSubmit}
          variant="outline-secondary"
          className="w-25"
          id="button-addon2"
        >
            {isEdit?"update":"Add"}
        </Button>
        <Button
          onClick={handleClear}
          variant="outline-secondary"
          className="w-25"
          id="button-addon2"
        >
            Clear
        </Button>
      </InputGroup>
      {data.length > 0 &&
        data.map((item, index) => {
          return (
            <div className="bg-light w-25 mt-2 text-body rounded d-flex justify-content-between">
              <div>{item.list}</div>
              <button onClick={()=>handleEdit(item)}>edit</button>
              <button onClick={()=>handleDelete(item._id)}>delete</button>
            </div>
          );
        })}
    </div>
  );
}
