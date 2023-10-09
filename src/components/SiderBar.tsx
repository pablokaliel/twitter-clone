import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { House, MagnifyingGlass, Bell, EnvelopeSimple, BookmarkSimple, File, User, DotsThreeCircle, DotsThree } from "@phosphor-icons/react";
import { useAuth } from "../utils/AuthContext";

const links = [
  { id: "", name: "Home", icon: <House size={32} /> },
  { id: "explorer", name: "Explore", icon: <MagnifyingGlass size={32} /> },
  { id: "notifications", name: "Notifications", icon: <Bell size={32} /> },
  { id: "messages", name: "Messages", icon: <EnvelopeSimple size={32} /> },
  { id: "bookmarks", name: "Bookmarks", icon: <BookmarkSimple size={32} /> },
  { id: "lists", name: "Lists", icon: <File size={32} /> },
  { id: "profile", name: "Profile", icon: <User size={32} /> },
  { id: "more", name: "More", icon: <DotsThreeCircle size={32} /> },
];

interface SideBarProps {
  userName: string | null;
  userLogin: string | null;
}

function SideBar(props: SideBarProps) {
  const [focusedLinks, setFocusedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { logout } = useAuth();
  const isAuthenticated = useAuth().isAuthenticated;
  const [showModal, setShowModal] = useState(false);

  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);



  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setIsEscapeKeyPressed(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", closeModalOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [showModal]);

  useEffect(() => {
    if (isEscapeKeyPressed && showModal) {
      setShowModal(false);
      setIsEscapeKeyPressed(false);
    }
  }, [isEscapeKeyPressed, showModal]);

  const handleLinkFocus = (linkId: string) => {
    setFocusedLinks((prevFocusedLinks) => ({
      ...prevFocusedLinks,
      [linkId]: true,
    }));
  };

  const handleLinkBlur = (linkId: string) => {
    setFocusedLinks((prevFocusedLinks) => ({
      ...prevFocusedLinks,
      [linkId]: false,
    }));
  };

  const isLinkFocused = (linkId: string) => {
    return focusedLinks[linkId];
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    logout();
    setShowModal(!showModal);
  };

  const handleCloseModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setShowModal(!showModal);
    }
  };

  return (
    <aside className="pt-6 px-5 flex flex-col md:items-center justify-between h-screen sticky top-0 md:px-0 sm:hidden">
      <nav className="flex flex-col gap-1 md:items-center ">
        {links.map((link) => (
          <NavLink
            key={link.id}
            className="flex items-center gap-5 w-fit text-xl font-bold rounded-full py-2 pl-2 pr-6 hover:bg-zinc-100  hover:dark:bg-zinc-800 md:p-2 active:text-twitterBlue"
            to={`/${link.id}`}
            onFocus={() => handleLinkFocus(link.id)}
            onBlur={() => handleLinkBlur(link.id)}
          >
            {isLinkFocused(link.id)
              ? React.cloneElement(link.icon, { weight: "fill" })
              : React.cloneElement(link.icon, { weight: "regular" })}
            <p className="md:hidden">{link.name}</p>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 flex items-center gap-3 my-3 rounded-full transition-colors duration-200 select-none cursor-pointer md:w-16 md:h-16 md:p-3 ">
        {isAuthenticated ? (
          <>
            <img
              src="https://github.com/pabloKaliel.png"
              alt="Foto de perfil do usuário"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-1 justify-between items-center md:hidden">
              <div className="flex flex-col flex-shrink-0 text-sm">
                <span className="font-bold">{props.userName}</span>
                <span className="opacity-70 dark:opacity-50">
                  @{props.userLogin}
                </span>
              </div>

              <button
                onClick={toggleModal}
                className="hover:bg-gray-400/30 p-2 rounded-full"
              >
                <DotsThree weight="bold" size={18.75} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-1 justify-between items-center md:hidden">
              <div className="flex flex-col flex-shrink-0 text-sm">
                <span className="font-bold">usuário</span>
                <span className="opacity-70 dark:opacity-50">@user</span>
              </div>

              <button
                onClick={toggleModal}
                className="hover:bg-gray-400/30 p-2 rounded-full"
              >
                <DotsThree weight="bold" size={18.75} />
              </button>
            </div>
          </>
        )}

        {showModal && (
          <div
            className="absolute right-[3%] flex bottom-[10%] items-center justify-center z-50"
            onClick={handleCloseModalClick}
          >
            <div className="bg-gray-400/30 rounded-lg p-4">
              <div className="flex justify-end">
                <button
                  className="text-twitterBlue font-semibold mr-4 relative"
                  onClick={toggleModal}
                >
                  Cancelar
                </button>
                {/* Conditional rendering based on authentication status */}
                {isAuthenticated ? (
                  <button
                    className="text-red-500 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="text-twitterBlue font-semibold">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
