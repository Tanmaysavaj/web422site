import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { ListGroup, Button, Card } from "react-bootstrap";
import { searchHistoryAtom } from "../store";
import { removeFromHistory } from "../lib/userData";

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  // Important: handle loading state
  if (searchHistory === undefined) return null;

  const parsedHistory = searchHistory.map((h) => {
    const params = new URLSearchParams(h);
    return Object.fromEntries(params.entries());
  });

  async function removeHistoryClicked(e, index) {
    e.stopPropagation(); // prevent click bubbling
    const updatedHistory = await removeFromHistory(searchHistory[index]);
    setSearchHistory(updatedHistory);
  }

  function historyClicked(index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  // Only render message if parsedHistory is empty AFTER it's been loaded
  if (parsedHistory.length === 0) {
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          <p>Try searching for some artwork.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <h1>Search History</h1>
      <ListGroup>
        {parsedHistory.map((item, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => historyClicked(index)}
            style={{ cursor: "pointer" }}
          >
            {Object.entries(item).map(([key, value]) => (
              <span key={key}>
                {key}: <strong>{value}</strong>&nbsp;
              </span>
            ))}
            <Button
              variant="danger"
              size="sm"
              className="float-end"
              onClick={(e) => removeHistoryClicked(e, index)}
            >
              &times;
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}
