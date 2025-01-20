import { Copyright } from "@phosphor-icons/react";
import { GithubLogo } from "@phosphor-icons/react";
import { LinkedinLogo } from "@phosphor-icons/react";
import { InstagramLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-50 flex items-center justify-center gap-11 border-t border-neutral-200 p-6 text-neutral-400">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Copyright size={15}/>
          <span>Copyright 2024. All rights Reserved</span>
        </div>
        <p>Made by Đorđe Elesin</p>
      </div>
      <div className="flex items-center gap-4">
        <Link to="https://www.instagram.com/djoleelesin/">
          <InstagramLogo size={25}/>
        </Link>
        <Link to="https://www.linkedin.com/in/%C4%91or%C4%91e-elesin-14a066299/">
          <LinkedinLogo size={25}/>
        </Link>
        <Link to="https://github.com/DjordjeElesin">
          <GithubLogo size={25}/>
        </Link>
      </div>
    </footer>
  )
}
