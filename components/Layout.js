import MainNav from './mainNav';
import { Container } from 'react-bootstrap';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <Container style={{ paddingTop: '80px' }}>
        {children}
      </Container>
    </>
  );
}
