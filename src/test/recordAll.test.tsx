import axios from "axios";
import { describe, expect, it } from "vitest";

describe("Record All", (): void => {
  it("get records", async (): Promise<any> => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    expect(response.status).toBe(200);
    expect(response).toHaveProperty("data");
  });

  it("register a record", async (): Promise<any> => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      {
        userId: 1,
        id: 0,
        title: "title example",
        body: "body example",
      }
    );

    expect(response.status).toBe(201);
  });

  it("update a record", async (): Promise<any> => {
    const response = await axios.put(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        userId: 1,
        title: "title examples",
        body: "body examples",
      }
    );
    expect(response.status).toBe(200);
  });

  it("delete a record", async (): Promise<any> => {
    const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    expect(response.status).toBe(200);
  });
});
