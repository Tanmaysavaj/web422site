import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  if (!objectID) return <p>Loading artwork...</p>;

  // Convert string to number safely
  const parsedObjectID = parseInt(objectID);

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={parsedObjectID} />
      </Col>
    </Row>
  );
}
