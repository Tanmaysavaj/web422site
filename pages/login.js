import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";
import { getFavourites, getHistory } from "@/lib/userData";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await authenticateUser(userName, password);
      await updateAtoms();
      router.push("/"); // ✅ go to homepage after login
    } catch (err) {
      setWarning(err.message);
    }
  }

  return (
    <Card className="bg-light">
      <Card.Body>
        <h2>Login</h2>
        <p>Enter your login information below:</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {warning && <Alert variant="danger">{warning}</Alert>}

          <Button
            variant="primary"
            type="submit"
            disabled={!userName || !password}
          >
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
