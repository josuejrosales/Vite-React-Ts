import React, { useMemo, useState } from "react";
import { useRecords } from "../hooks/useRecords";
import { useAxios } from "../contexts/AxiosContext";
import { AxiosInstance } from "axios";
import Form from "./formRecord";

interface FormState {
  type: string;
  data: any;
}

function RecordAll() {
  const axiosInstance: AxiosInstance = useAxios();
  const { records, removeItem, updateItem, addItem, loading } =
    useRecords(axiosInstance);

  const [action, setAction] = useState<FormState>({
    type: "insert",
    data: null,
  });

  const lastId = useMemo((): number => {
    return records.length;
  }, [records]);

  return (
    <React.Fragment>
      <Form
        action={action}
        setAction={setAction}
        addItem={addItem}
        updateItem={updateItem}
        lastId={lastId}
      />

      {loading && (
        <div className="container-loading">
          <div className="loading"></div>
        </div>
      )}
      <div className="record-all">
        {records.map((item, i) => (
          <div className="record-item" key={i}>
            <div className="description">
              <p className="title">{item.title}</p>
              <p className="body">{item.body}</p>
            </div>
            <span className="actions">
              <button
                className="edit"
                onClick={(e) => setAction({ type: "update", data: item })}
              >
                Edit
              </button>
              <button className="delete" onClick={(e) => removeItem(item.id)}>
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default RecordAll;
