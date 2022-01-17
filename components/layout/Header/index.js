import React, { useEffect, useContext } from "react";
import Link from "next/link";
import cn from "classnames";

import useComponentVisible from "../../../hooks/useComponentVisible";
import useWindowSize from "../../../hooks/useWindowSize";
import CONST from "../../../util/constants";
import ModalContext from "../../../store/modal";
import { AuthContext } from "../../../store/auth";
import Button from "../../button";
import NavigationDropdown from "../../nav-dropdown";
import { Menu, Close, Logo } from "../../icons";

import styles from "./Header.module.scss";

const Header = ({ className, ...props }) => {
  const { handleComponentVisible } = useContext(ModalContext);
  const { isAuthenticated, authState, logout } = useContext(AuthContext);

  const { ref, toggleRef, isComVis, setIsComVis } = useComponentVisible(false);
  const size = useWindowSize();

  useEffect(() => {
    if (size.width > CONST.MOBILE_SIZE) {
      setIsComVis(false);
    }
  }, [size]);

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.container}>
        <div ref={toggleRef} className={styles.menuContainer}>
          <Button
            className={styles.menu}
            onClick={() => setIsComVis((isOpen) => !isOpen)}
          >
            {isComVis ? <Close /> : <Menu />}
          </Button>
        </div>
        <Button className={styles.logo} href="/">
          <Logo />
          <p>
            clone-of-stack<span>overflow</span>
          </p>
        </Button>
        <div style={{ flex: 1 }}></div>

        {isAuthenticated() ? (
          <div className={styles.userInfo}>
            <p>
              Welcome{" "}
              <Link
                href="/users/[user]"
                as={`/users/${authState.userInfo.username}`}
              >
                <a>{authState.userInfo.username}!</a>
              </Link>
            </p>
            <a onClick={() => logout()}>log out</a>
          </div>
        ) : (
          <>
            <Button
              className={styles.auth}
              secondary
              onClick={() => handleComponentVisible(true, "login")}
            >
              Log in
            </Button>
            <Button
              className={styles.auth}
              primary
              onClick={() => handleComponentVisible(true, "signup")}
            >
              Sign up
            </Button>
          </>
        )}
      </div>

      <div ref={ref}>{isComVis && <NavigationDropdown />}</div>
    </header>
  );
};

export default Header;
