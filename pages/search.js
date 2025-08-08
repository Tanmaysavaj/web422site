// pages/search.js
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import { addToHistory } from '../lib/userData';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      searchBy: 'title',
      isOnView: false,
      isHighlight: false,
    },
  });
async function submitForm(data) {
  let queryString = `searchBy=${encodeURIComponent(data.searchBy)}`;
  if (data.geoLocation) queryString += `&geoLocation=${encodeURIComponent(data.geoLocation)}`;
  if (data.medium) queryString += `&medium=${encodeURIComponent(data.medium)}`;
  queryString += `&isOnView=${data.isOnView}`;
  queryString += `&isHighlight=${data.isHighlight}`;
  queryString += `&q=${encodeURIComponent(data.q)}`;

  const updatedHistory = await addToHistory(queryString);
setSearchHistory(await addToHistory(queryString));

  router.push(`/artwork?${queryString}`);
}

  return (
    <Container className="mt-4" style={{ maxWidth: '700px' }}>
      <Form onSubmit={handleSubmit(submitForm)}>
        {/* Search Field */}
        <Form.Group controlId="q" className="mb-3">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter search term"
            {...register('q', { required: true })}
            className={errors.q ? 'is-invalid' : ''}
          />
          {errors.q && (
            <Form.Control.Feedback type="invalid">
              This field is required.
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {/* Dropdowns and Input Fields */}
        <Row className="mb-3">
          <Form.Group as={Col} md={4} controlId="searchBy">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register('searchBy')}>
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="geoLocation">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Geo Location"
              {...register('geoLocation')}
            />
          </Form.Group>

          <Form.Group as={Col} md={4} controlId="medium">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Medium"
              {...register('medium')}
            />
          </Form.Group>
        </Row>

        {/* Checkboxes */}
        <Row className="mb-4">
          <Form.Group as={Col} md={3} className="d-flex align-items-center" controlId="isOnView">
            <Form.Check
              type="checkbox"
              label="Is On View"
              {...register('isOnView')}
            />
          </Form.Group>

          <Form.Group as={Col} md={3} className="d-flex align-items-center" controlId="isHighlight">
            <Form.Check
              type="checkbox"
              label="Is Highlight"
              {...register('isHighlight')}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </Container>
  );
}
