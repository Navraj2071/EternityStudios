import React from "react";
import Link from "next/link";
const footer = () => {
  return (
    <div className="footer">
      <section>
        <p>
          Hi. I'm an inde web-developer and blockchain enthusiast. I believe the
          blockchain technology has the potential to completely change the way
          we interact with the internet, in a good way.
        </p>
        <p>
          My mission is to make the blockchain accessible to everyone in a
          secure manner.
        </p>
        <p>
          This website has been created as a personal non-profit project by me
          as a small step towards my mission.
        </p>
      </section>
      <section>
        If you like my work and want to support me, please do that
        <a href="/fundme" style={{ color: "#61dafb" }}>
          {" "}
          here.
        </a>
        <p>
          For any complaints/queries/suggestion, please write to me at
          navraj2071@outlook.com
        </p>
      </section>
    </div>
  );
};

export default footer;
