import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

  const [isFavourite, setIsFavourite] = useState(false);

  // Check if the artwork is in favourites on load
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    setIsFavourite(favourites.includes(objectID));
  }, [objectID]);

  const toggleFavourite = () => {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (isFavourite) {
      favourites = favourites.filter(id => id !== objectID);
    } else {
      favourites.push(objectID);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    setIsFavourite(!isFavourite);
  };

  if (error) return <Error statusCode={404} />;
  if (!data) return null;

  const {
    primaryImageSmall,
    title,
    objectDate,
    classification,
    medium,
  } = data;

  const hasImage = primaryImageSmall && primaryImageSmall.length > 0;

  return (
    <Card style={{ minHeight: '100%', height: '100%' }}>
      {hasImage && (
        <Card.Img
          variant="top"
          src={primaryImageSmall}
          alt={title || 'No image available'}
          style={{ objectFit: 'cover', height: '375px' }}
        />
      )}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {objectDate || 'N/A'} <br />
          <strong>Classification:</strong> {classification || 'N/A'} <br />
          <strong>Medium:</strong> {medium || 'N/A'}
        </Card.Text>

        <div className="d-flex justify-content-between">
          <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
            <Button variant="primary">Details</Button>
          </Link>
          <Button
            variant={isFavourite ? 'danger' : 'outline-primary'}
            onClick={toggleFavourite}
          >
            {isFavourite ? 'Remove Favourite' : 'Add Favourite'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
