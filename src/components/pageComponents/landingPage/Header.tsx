import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function Header({elementRef}: {elementRef: React.RefObject<HTMLElement | null>}) {

  const scrollToElement = () => {
    if (elementRef?.current) {
      elementRef.current.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <section id="home" className="w-full pt-24 pb-16 px-5 text-center text-neutral-800 flex flex-col items-center gap-10 relative ">
      <div
        className="absolute w-full aspect-square  bottom-0 left-1/2 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(117,213,88,0.5) 0%, rgba(242,251,234,0) 60%)",
        }}
      />
      <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold flex flex-col items-center justify-center gap-5 md:gap-7">
          <span>Stay Organized.</span>
          <span>
            <span>Stay </span>
            <span className="relative whitespace-nowrap">
              <span className="absolute bg-neutral-800 -left-2 -top-1 -bottom-1 -right-2 md:-left-2 md:-top-0 md:-bottom-0 md:-right-2 -rotate-1"></span>
              <span className="relative text-primary-50">Ahead!</span>
            </span>
          </span>
        </h1>
        <p className="text-lg font-semibold text-neutral-800 mt-10">
          SmartTask helps you organize, prioritize, and achieve your
          goals—individually or with your team.
        </p>
        <div className="flex items-center justify-center gap-4 w-full mt-10">
          <Link to="/signup">
            <Button size="md">Get started</Button>
          </Link>
          <Button size="md" variant="secondary" onClick={scrollToElement}>
            Learn more
          </Button>
        </div>
      </div>
    </section>
  );
}
