// components/Search.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";

export default function Search() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault();
    const searchQuery = searchField.trim();
    if (searchQuery) {
      router.push(`/artwork?title=true&q=${searchQuery}`);
      setSearchField(""); // clear the input
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitForm}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        value={searchField}
        onChange={(e) => setSearchField(e.target.value)}
      />
      <Button type="submit" variant="success">
        Search
      </Button>
    </Form>
  );
}
