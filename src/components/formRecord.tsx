import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface FormData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const formInitial: FormData = {
  userId: 0,
  id: 0,
  title: "",
  body: "",
};

function Form(props: any): React.ReactElement {
  const [formData, setFormData] = useState<FormData>(formInitial);

  const reset = () => {
    setFormData(formInitial);
    props.setAction({ type: "insert", data: null });
  };

  const handleInputChange = (e: ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() != "" && formData.body.trim() != "") {
      switch (props.action.type) {
        case "insert":
          props.addItem({ ...formData, id: props.lastId });
          break;
        case "update":
          props.updateItem(props.action.data.id, formData);
          break;
      }
      reset();
    }
  };

  useEffect(() => {
    if (props.action.type == "update") {
      setFormData(props.action.data);
    }
  }, [props.action.type]);

  return (
    <form onSubmit={handleSubmit}>
      <label>Titulo</label>
      <input
        required={true}
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <label htmlFor="body">Descripción</label>
      <textarea
        required={true}
        name="body"
        id="body"
        rows={5}
        value={formData.body}
        onChange={handleInputChange}
      ></textarea>
      <div className="btn-submit">
        <button type="submit">Submit</button>
        {props.action.type == "update" && (
          <button type="button" onClick={() => reset()}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default Form;
