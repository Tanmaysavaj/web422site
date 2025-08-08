import validObjectIDList from '@/public/data/validObjectIDList.json';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork() {
  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(
    finalQuery
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
      : null
  );

  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (data?.objectIDs && data.objectIDs.length > 0) {
      const filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data.objectIDs.includes(x)
      );

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        results.push(filteredResults.slice(i, i + PER_PAGE));
      }

      setArtworkList(results);
      setPage(1);
    } else {
      setArtworkList([]);
    }
  }, [data]);

  const previousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (artworkList && page < artworkList.length) setPage(page + 1);
  };

  if (error) return <Error statusCode={404} />;
  if (!artworkList || artworkList.length === 0) return <p>No artworks found.</p>;

  return (
    <>
      <Row className="gy-4">
        {artworkList[page - 1].map((currentObjectID) => (
          <Col lg={3} key={currentObjectID}>
            <ArtworkCard objectID={currentObjectID} />
          </Col>
        ))}
      </Row>
      <br />
      <Pagination>
        <Pagination.Prev onClick={previousPage} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={nextPage}
          disabled={page === artworkList.length}
        />
      </Pagination>
    </>
  );
}
