import { useEffect, useState } from 'react';
import ArtworkCard from '../components/ArtworkCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const favIDs = JSON.parse(localStorage.getItem('favourites')) || [];
    setFavourites(favIDs);
  }, []);

  return (
    <Container>
      <h1 className="my-4">Favourite Artworks</h1>
      <Row className="gy-4">
        {favourites.length > 0 ? (
          favourites.map((objectID) => (
            <Col lg={3} md={4} sm={6} xs={12} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}
