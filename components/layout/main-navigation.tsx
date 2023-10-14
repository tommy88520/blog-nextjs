import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
  const { data: session, status } = useSession();
  // const session = true;
  // const status = true;
  // console.log(status);
  function logoutHandler() {
    signOut();
  }
  return (
    <header className={classes.header}>
      <Link href='/'>
        <Logo />
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/posts'>Posts</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
          {!session && status == 'unauthenticated' && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
