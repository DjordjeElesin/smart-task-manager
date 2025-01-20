import ReactMarkdown from "react-markdown";
import { aboutMeTxt } from "../../lib/utils/LandingPageHelper";

export default function About() {
  return (
    <section id="about" className="w-full flex justify-center py-16">
      <div className="leading-relaxed max-w-xl">
        <img
          loading="lazy"
          src="profile.jpg"
          className="w-32 h-32 md:w-52 md:h-52 rounded-lg float-left mr-8 mb-8 object-center object-cover"
        />
        <ReactMarkdown
          children={aboutMeTxt}
          components={{
            p: ({ node, ...props }) => (
              <p className="mb-4  text-neutral-700" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc p-6 space-y-2 " {...props} />
            ),
            li: ({ node, ...props }) => (
              <li
                className="text-md text-neutral-700 font-semibold ml-3"
                {...props}
              />
            ),
          }}
        />
      </div>
    </section>
  );
}
