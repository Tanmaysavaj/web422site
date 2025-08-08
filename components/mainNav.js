// components/MainNav.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { readToken, removeToken } from "@/lib/authenticate";
import Search from "@/components/Search"; // ✅ import search bar component

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userName, setUserName] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      setIsExpanded(false); // Collapse nav on route change
      setUserName(readToken()?.userName); // Get user token
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    handleRouteChange(); // Also run on initial load

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    setUserName(null);
    router.push("/");
  };

  return (
    <Navbar className="fixed-top navbar-dark bg-primary" expand="lg" expanded={isExpanded}>
      <Container>
        <Navbar.Brand>TanmaySavaj</Navbar.Brand>
        <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>Home</Nav.Link>
            </Link>

            {userName && (
              <>
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                </Link>
              </>
            )}
          </Nav>

          {userName && <Search />} {/* ✅ Show Search component if logged in */}

          <Nav>
            {!userName ? (
              <>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                </Link>
              </>
            ) : (
              <NavDropdown title={userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
