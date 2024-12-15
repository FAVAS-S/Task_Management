import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import axiosInstance from "../../axios";

export default function Task() {
  const [task, setTask] = useState("");
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(null);

  function handleTask(e) {
    setTask(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEdit) {
      const data = await axiosInstance.post("/list", { list: task });

      if (data) {
        alert(data.data.message);
      }
    } else {
      const data = await axiosInstance.put(`/list/${id}`, { list: task });

      if (data) {
        alert(data.data.message);
      }
    }
    handleClear();
    setTrigger(!trigger);
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

  const handleClear = () => {
    setIsEdit(false);
    setTask("");
  };

  const handleDelete = async(id) => {
    if(confirm("Do you want to delete")){
        const data = await axiosInstance.delete(`/list/${id}`);
        setTrigger(!trigger);
        if (data) {
         
          alert(data.data.message);
        }
    }
     
    }
  

  const handleEdit = (item) => {
    setIsEdit(true);
    setTask(item.list);
    setId(item._id);
  };

  return (
    <div className="d-flex align-items-center flex-column w-100 h-100 justify-content-center">
        <InputGroup className="w-50 mb-3">
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
            {isEdit ? "Update" : "Add"}
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
      <div className="d-flex flex-column w-50 h-75 bg-light p-3 align-items-center rounded overflow-scroll sm-w-100">
        <div className="w-100">
            {/* maping List data array */}
          {data?.length > 0 &&
            data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-light w-100 mt-2 text-body d-flex justify-content-between shadow-sm p-3 bg-body-tertiary rounded flex-wrap"
                >
                  <div className="text-truncate" style={{ maxWidth: "60%" }}>
                    {item.list}
                  </div>
                  <div className="d-flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(item)} variant="warning">
                      Edit
                    </Button>
                    <button className="sm btn btn-danger" onClick={() => handleDelete(item._id)}> Delete</button>
                   
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

