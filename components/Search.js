// components/Search.js
import { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from "@/lib/userData";

export default function Search() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = async (e) => {
    e.preventDefault();
    const searchQuery = searchField.trim();
    if (searchQuery) {
      const queryString = `title=true&q=${searchQuery}`;

      //  Save to history
      const updatedHistory = await addToHistory(queryString);
      setSearchHistory(updatedHistory);

      // Go to results page
      router.push(`/artwork?${queryString}`);
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
