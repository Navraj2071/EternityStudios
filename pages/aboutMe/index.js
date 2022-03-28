import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";

const AboutMePage = () => {
  const router = useRouter();
  const currentPage = useRef(1);
  const canScroll = useRef(true);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const hasDropped = useRef(false);
  const [dropDown, setDropDown] = useState(false);
  const animationTime = 200;
  const [segmentStyle, setSegmentStyle] = useState({
    1: { display: "flex", animation: "none" },
    2: { display: "none", animation: "none" },
    3: { display: "none", animation: "none" },
    4: { display: "none", animation: "none" },
    5: { display: "none", animation: "none" },
    6: { display: "none", animation: "none" },
  });

  useEffect(() => {
    let aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio <= 1) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("click", (e) => {
      if (e.screenY > 0.25 * window.innerHeight) {
        hasDropped.current = false;
        setDropDown(false);
      }
    });
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("click", (e) => {
        if (e.screenY > 0.25 * window.innerHeight) {
          hasDropped.current = false;
          setDropDown(false);
        }
      });
    };
  }, []);

  const handleTouchStart = (event) => {
    let minHeight = hasDropped.current
      ? 0.3 * window.innerHeight
      : 0.05 * window.innerHeight;
    if (event.targetTouches[0].clientY > minHeight) {
      touchStartY.current = event.targetTouches[0].clientY;
    } else {
      touchStartY.current = 0;
    }
  };

  const handleTouchMove = (event) => {
    let minHeight = hasDropped.current
      ? 0.3 * window.innerHeight
      : 0.05 * window.innerHeight;
    if (event.targetTouches[0].clientY > minHeight) {
      touchEndY.current = event.targetTouches[0].clientY;
    } else {
      touchEndY.current = 0;
    }
  };
  const handleTouchEnd = (event) => {
    if (touchEndY.current === touchStartY.current) {
      return;
    }
    if (canScroll) {
      if (touchStartY.current > touchEndY.current) {
        let newPage = currentPage.current + 1;
        if (currentPage.current === 6) {
          newPage = 1;
          pageDown(newPage);
        } else {
          pageUp(newPage);
        }
      } else if (touchStartY.current < touchEndY.current) {
        canScroll.current = false;
        let newPage = currentPage.current - 1;
        if (currentPage.current === 1) {
          newPage = 6;
          pageUp(newPage);
        } else {
          pageDown(newPage);
        }
      }
    }
  };

  const handleScroll = (event) => {
    if (canScroll.current) {
      if (event["deltaY"] > 0) {
        canScroll.current = false;
        let newPage = currentPage.current + 1;
        if (currentPage.current === 6) {
          newPage = 1;
          pageDown(newPage);
        } else {
          pageUp(newPage);
        }
      } else {
        canScroll.current = false;
        let newPage = currentPage.current - 1;
        if (currentPage.current === 1) {
          newPage = 6;
          pageUp(newPage);
        } else {
          pageDown(newPage);
        }
      }
    }
  };

  const setPage = (targetPage) => {
    hasDropped.current = false;
    setDropDown(false);
    if (canScroll.current) {
      if (targetPage >= currentPage.current) {
        pageUp(targetPage);
      } else {
        pageDown(targetPage);
      }
    }
  };
  const pageDown = (targetPage) => {
    canScroll.current = false;
    if (targetPage === currentPage.current) {
      return;
    }
    let segmentStyle = {
      1: { display: "none", animation: "none" },
      2: { display: "none", animation: "none" },
      3: { display: "none", animation: "none" },
      4: { display: "none", animation: "none" },
      5: { display: "none", animation: "none" },
      6: { display: "none", animation: "none" },
    };
    let pageNumberArray = [];
    for (let i = currentPage.current; i >= targetPage; i--) {
      let pageNumber = i;
      pageNumberArray.push(pageNumber);
    }

    segmentStyle[pageNumberArray[0]] = {
      display: "flex",
      animation: "slideDownExit",
    };
    segmentStyle[pageNumberArray[1]] = {
      display: "flex",
      animation: "slideDownEnter",
    };
    setSegmentStyle({ ...segmentStyle });

    let pageNumberArrayIndex = 0;

    if (pageNumberArray.length > 2) {
      let pageSlide = setInterval(function () {
        segmentStyle[pageNumberArray[pageNumberArrayIndex]] = {
          display: "none",
          animation: "none",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
          display: "flex",
          animation: "slideDownExit",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 2]] = {
          display: "flex",
          animation: "slideDownEnter",
        };
        setSegmentStyle({ ...segmentStyle });
        if (pageNumberArray[pageNumberArrayIndex + 2] === targetPage) {
          clearInterval(pageSlide);
          setTimeout(() => {
            segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
              display: "none",
              animation: "none",
            };
            segmentStyle[pageNumberArray[pageNumberArrayIndex + 2]] = {
              display: "flex",
              animation: "none",
            };
            setSegmentStyle({ ...segmentStyle });
            canScroll.current = true;
          }, animationTime);
        } else {
          pageNumberArrayIndex++;
        }
      }, animationTime);
    } else {
      setTimeout(() => {
        segmentStyle[pageNumberArray[pageNumberArrayIndex]] = {
          display: "none",
          animation: "none",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
          display: "flex",
          animation: "none",
        };
        setSegmentStyle({ ...segmentStyle });
        canScroll.current = true;
      }, animationTime);
    }
    currentPage.current = targetPage;
  };
  const pageUp = (targetPage) => {
    canScroll.current = false;
    if (targetPage === currentPage.current) {
      return;
    }
    let segmentStyle = {
      1: { display: "none", animation: "none" },
      2: { display: "none", animation: "none" },
      3: { display: "none", animation: "none" },
      4: { display: "none", animation: "none" },
      5: { display: "none", animation: "none" },
      6: { display: "none", animation: "none" },
    };
    let pageNumberArray = [];
    for (let i = currentPage.current; i <= targetPage; i++) {
      let pageNumber = i;
      pageNumberArray.push(pageNumber);
    }

    segmentStyle[pageNumberArray[0]] = {
      display: "flex",
      animation: "slideUpExit",
    };
    segmentStyle[pageNumberArray[1]] = {
      display: "flex",
      animation: "slideUpEnter",
    };
    setSegmentStyle({ ...segmentStyle });

    let pageNumberArrayIndex = 0;

    if (pageNumberArray.length > 2) {
      let pageSlide = setInterval(function () {
        segmentStyle[pageNumberArray[pageNumberArrayIndex]] = {
          display: "none",
          animation: "none",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
          display: "flex",
          animation: "slideUpExit",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 2]] = {
          display: "flex",
          animation: "slideUpEnter",
        };
        setSegmentStyle({ ...segmentStyle });
        if (pageNumberArray[pageNumberArrayIndex + 2] === targetPage) {
          clearInterval(pageSlide);
          setTimeout(() => {
            segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
              display: "none",
              animation: "none",
            };
            segmentStyle[pageNumberArray[pageNumberArrayIndex + 2]] = {
              display: "flex",
              animation: "none",
            };
            setSegmentStyle({ ...segmentStyle });
            canScroll.current = true;
          }, animationTime);
        } else {
          pageNumberArrayIndex++;
        }
      }, animationTime);
    } else {
      setTimeout(() => {
        segmentStyle[pageNumberArray[pageNumberArrayIndex]] = {
          display: "none",
          animation: "none",
        };
        segmentStyle[pageNumberArray[pageNumberArrayIndex + 1]] = {
          display: "flex",
          animation: "none",
        };
        setSegmentStyle({ ...segmentStyle });
        canScroll.current = true;
      }, animationTime);
    }
    currentPage.current = targetPage;
  };

  const PageSlider = () => {
    const pageArray = [1, 2, 3, 4, 5, 6];
    return (
      <>
        <div className="slider">
          {pageArray.map((pageNumber) => {
            return (
              <React.Fragment
                key={
                  Math.round(Math.random() * 10000, 4).toString() +
                  pageNumber.toString()
                }
              >
                <div
                  className="slider-dot"
                  onClick={() => {
                    setPage(pageNumber);
                  }}
                  style={{
                    backgroundColor:
                      currentPage.current === pageNumber
                        ? "white"
                        : "transparent",
                  }}
                ></div>
              </React.Fragment>
            );
          })}
        </div>
      </>
    );
  };

  const NavBar = () => {
    const NavItems = () => {
      return (
        <>
          <div onClick={() => setPage(1)} className="nav-item">
            <div>About Me</div>
          </div>
          <div onClick={() => setPage(2)} className="nav-item">
            <div>My Mission</div>
          </div>
          <div onClick={() => setPage(3)} className="nav-item">
            <div>Portfolio</div>
          </div>
          <div onClick={() => setPage(4)} className="nav-item">
            <div>My Story</div>
          </div>
          <div onClick={() => setPage(6)} className="nav-item">
            <div>Contact</div>
          </div>
        </>
      );
    };

    const DropDown = () => {
      return (
        <>
          <div className="dropdown">
            <NavItems />
          </div>
        </>
      );
    };
    return (
      <>
        <div className="navbar">
          <div onClick={() => router.push("/")} className="nav-item">
            <div>Home</div>
          </div>
          {!isMobile ? (
            <NavItems />
          ) : (
            <>
              <div
                className="nav-item"
                onClick={() => {
                  hasDropped.current = !hasDropped.current;
                  setDropDown(!dropDown);
                }}
              >
                <img src="/Menu.svg" alt="Eternity Menu" />
              </div>
            </>
          )}
        </div>
        {dropDown ? <DropDown /> : ""}
      </>
    );
  };

  const AboutMe = () => {
    return (
      <>
        <div
          id="AboutMe"
          className="segment"
          style={{
            backgroundImage: 'url("/ProfileImage1.png")',
            padding: "5vh 40vw 5vh 5vw",
            display: segmentStyle[1]["display"],
            animationName: segmentStyle[1]["animation"],
          }}
        >
          <div className="heading3">Hello, I AM</div>
          <div className="heading1">Navraj Sharma</div>
          <div className="heading2">A fullstack DAPP developer</div>
        </div>
      </>
    );
  };

  const MyMission = () => {
    let myStyle = isMobile
      ? {
          display: "flex",
          flexDirection: "column",
          height: "50%",
          justifyContent: "space-between",
        }
      : { display: "grid", gridTemplateColumns: "1fr 1fr 1fr" };
    return (
      <>
        <div
          id="MyMission"
          className="segment"
          style={{
            backgroundImage: 'URL("/ProfileImage2.png")',
            color: "#fdfefe",
            textShadow: "0 0 10px #fdfcdd, 0 0 20px black",
            justifyContent: "space-between",
            display: segmentStyle[2]["display"],
            animationName: segmentStyle[2]["animation"],
          }}
        >
          <div className="heading1" style={{ textJustify: "center" }}>
            BLOCKCHAIN FOR EVERYONE
          </div>

          <div style={myStyle}>
            <div
              className="heading2"
              style={{ background: "rgba(0,0,0,0.5)", padding: "1.25vw" }}
            >
              I truly believe the blockchain technology has the potential to
              completely change the way we interact with the internet, in a good
              way.
              <p>
                However, it is still a relatively new technology and like any
                new technology, it is prone to be misused by predators.
              </p>
              <p>
                Hence, it is incumbent upon us developers to act with integrity
                and deliver this awesome technology to good people of earth, the
                way it was intended.
              </p>
            </div>
            <div></div>
            <div
              className="heading2"
              style={{ background: "rgba(0,0,0,0.5)", padding: "1.25vw" }}
            >
              An Engineer without values is a loose cannon. Most of my core
              values are inherited from the BlockChain technology itself.
              <p>Core Values:</p>
              <li>Decentrality</li>
              <li>Security</li>
              <li>Transparency</li>
              <li>Trustless systems</li>
            </div>
          </div>
          <div
            className="heading2"
            style={{ background: "black", padding: "1.25vw" }}
          >
            My mission is to make the blockchain accessible to everyone in a
            secure manner.
          </div>
        </div>
      </>
    );
  };

  const Portfolio = () => {
    return (
      <>
        <div
          id="Portfolio"
          className="segment"
          style={{
            backgroundImage: 'url("ProfileImage3.png")',
            justifyContent: "space-between",
            padding: "10vh 0px",
            display: segmentStyle[3]["display"],
            animationName: segmentStyle[3]["animation"],
          }}
        >
          <div className="heading1">Portfolio</div>
          <div
            style={{
              width: "90vw",
              display: "grid",
              padding: "1vw",
              gridTemplateColumns: "1fr 5fr",
            }}
          >
            <div
              className="heading2"
              style={{
                width: "15vw",
                borderRight: "1px solid",
                padding: "0px 5vw",
              }}
            >
              <Link href="/">Eternity Studios</Link>
            </div>
            <div className="heading2" style={{ padding: "0px 5vw" }}>
              A collection of useful DAPPs{" "}
              <p>
                <Link href="/">https://eternity-studios.vercel.app</Link>
              </p>{" "}
              <p>Fullstack developement</p>{" "}
              <div className="heading3">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 3fr",
                    gap: "1vw",
                    padding: "1vw",
                  }}
                >
                  <div>Front end </div>
                  <div>
                    <p>Framework</p>
                    <p>Github</p>
                  </div>
                  <div>
                    <p>Next js</p>
                    <p>
                      <a href="https://github.com/Navraj2071/EternityStudios">
                        /Navraj2071/EternityStudios
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 3fr",
                    gap: "1vw",
                    padding: "1vw",
                  }}
                >
                  <div>Back end </div>
                  <div>
                    <p>Framework</p>
                    <p>Github</p>
                  </div>
                  <div>
                    Django python
                    <p>
                      <a href="https://github.com/Navraj2071/eternityBackend">
                        /Navraj2071/eternityBackend
                      </a>
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 3fr",
                    gap: "1vw",
                    padding: "1vw",
                  }}
                >
                  <div>Features </div>
                  <div>
                    <p>NFTs</p>
                  </div>
                  <div>
                    Users can launch their NFTs on ethereum mainnet for free.
                    <p>
                      Files are automatically uploaded to IPFS and metadata is
                      written into the ERC721 contracts.
                    </p>
                    <p>
                      <a href="https://eternity-studios.vercel.app/nft/dc">
                        https://eternity-studios.vercel.app/nft/dc
                      </a>
                    </p>
                    <p>Users can mint a random NFT</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 3fr",
                    gap: "1vw",
                    padding: "1vw",
                  }}
                >
                  <div> </div>
                  <div>
                    <p>Wallet based User profile</p>
                  </div>
                  <div>
                    Users can connect their ethereum wallets and a profile page
                    is automatically created for them. Users can view all of
                    their NFTs on profile page.
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 3fr",
                    gap: "1vw",
                    padding: "1vw",
                  }}
                >
                  <div> </div>
                  <div>
                    <p>Crypto Lottery</p>
                  </div>
                  <div>
                    An ethereum based lottery contract where participants can
                    enter the lottery with any amount they wish. A winner is
                    selected using random number generated from Chainlink VRF.
                    <p>
                      <a href="https://eternity-studios.vercel.app/lotteryhttps://eternity-studios.vercel.app/lottery">
                        https://eternity-studios.vercel.app/lottery
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              width: "90vw",
              display: "grid",
              padding: "1vw 1vw 1vw 1vw",
              gridTemplateColumns: "1fr 5fr",
            }}
          >
            <div
              className="heading2"
              style={{
                width: "15vw",
                borderRight: "1px solid",
                padding: "0px 5vw",
              }}
            >
              Python SPG
            </div>
            <div className="heading2" style={{ padding: "0px 5vw" }}>
              Design of highway bridge superstructure with steel plate girders
              with python. <p>Very useful for Civil Engineers</p>
              <div className="heading3">
                Github:{" "}
                <a href="https://github.com/Navraj2071/PythonSPG">
                  https://github.com/Navraj2071/PythonSPG
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const MyStory = () => {
    return (
      <>
        <div
          id="MyStory"
          className="segment"
          style={{
            backgroundImage: 'url("ProfileImage4.png")',
            padding: "5vw",
            alignItems: "end",
            display: segmentStyle[4]["display"],
            animationName: segmentStyle[4]["animation"],
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.5)",
              height: "90vh",
              width: "80vw",
              padding: "2.5vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="heading1">My Story</div>
            <div className="heading2">
              An underachiever, stuck in a dead end career with an abusive boss,
              quits his job to pursue his passion. We&apos;ve all seen this
              inspiring story in countless movies and novels. But that is not my
              story.
            </div>
            <div className="heading2">
              I started my career as a bridge design engineer in 2015 and I
              actually liked my work. I soon realized that I was an Engineer at
              heart. Every project of mine was unique and came with it&apos;s
              own set of constraints and requirements and I loved solving
              problems. Watching my projects come to life, knowing that my hard
              work made a lot of people&apos;s lives a little bit easier, filled
              me with joy. I was content.
            </div>
            <div className="heading2">
              But that all changed when in 2021, I came accross Sitoshi&apos;s
              white paper - &apos;Bitcoin: A peer-to-peer Electronic Cash
              System&apos;. I knew immediately that the ideas put forth in this
              paper were revolutionary. If implemeted correctly, it had the
              potential to be the defining technology of my generation. As I
              started learning more and more about cryptocurrency, I realized
              that I was the last person to see its potential and the crypto
              space was already huge. Its not just about currency anymore. Its
              potentially a new way of how we interact with each other.
              They&apos;re calling it &apos;WEB 3.0&apos; - the third version of
              the world wide web and applications built in this ecosystem -
              DAPPs (Decentralised Applications). I realized, my impact in this
              world would be much more meaningful as a DAPP developer, and that
              is when I decided...
            </div>
            <div className="heading2" style={{ fontWeight: "600" }}>
              <p>I&apos;m going to be a DAPP developer.</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const MyStory2 = () => {
    return (
      <>
        <div
          id="MyStory2"
          className="segment"
          style={{
            backgroundImage: 'url("ProfileImage5.png")',
            padding: "5vh 25vw 5vh 5vw",
            display: segmentStyle[5]["display"],
            animationName: segmentStyle[5]["animation"],
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.5)",
              height: "80vh",
              padding: "2.5vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div className="heading1">My Story contd...</div>
            <div className="heading2">
              A brand new career in a field of which I knew nothing about... had
              no experience or education. I was lost...
            </div>
            <div className="heading2">
              But then I realized, I had 6 years of experience as an Engineer
              and DAPP developement is no different. I approached it like I had
              approached many Engineering problems in my career.
              <li>Define the problem.</li>
              <li>Figure out a possible solution</li>
              <li>Gather resources</li>
              <li>Execute the solution.</li>
              <li>Repeat until successful</li>
            </div>
            <div className="heading2">
              I started by learning what the blockchain is and how it works. I
              had to learn how to code. I started with Python, Solidity and
              Javascript and slowly moved on to frameworks like Django, Brownie
              and Next js. When I gained a little bit of confidence in this
              field I started working on some personal projects.
            </div>
            <div className="heading2">
              <Link href="/">ETERNITY STUDIOS </Link>
              has been my biggest project so far and it&apos;s still a work in
              progress.
            </div>
            <div className="heading2">
              There&apos;s still a lot to learn in this seemingly forever
              expanding field. Everyday I learn something new, which is
              rewarding by itself. Everyday I get better at what I do.
            </div>
          </div>
        </div>
      </>
    );
  };

  const ContactMe = () => {
    return (
      <>
        <div
          id="ContactMe"
          className="segment"
          style={{
            backgroundImage: 'url("ProfileImage6.png")',
            padding: "10vh 5vw 5vh 5vw",
            alignItems: "flex-start",
            display: segmentStyle[6]["display"],
            animationName: segmentStyle[6]["animation"],
          }}
        >
          <div
            style={{
              height: "90vh",
              display: "grid",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            <div>
              <div className="heading1">Contact Me</div>
              <div className="heading2">
                Of course I&apos;ll work with you.
                <p> Please write to me at : navraj2071@gmail.com</p>
                <p> Or give me a call at : +91 9878586898</p>
              </div>
            </div>
            <div>
              <div className="heading1">Support Eternity</div>
              <div className="heading2">
                I&apos;d love to hear your opinion.
                <p>Please write to me at : eternity3dstudios@gmail.com</p>
                <p>
                  Feel free to include any complaints, suggestions or feedback.
                </p>
                <div style={{ height: "5vh" }}></div>
                I&apos;m continuously trying to improve my work. If you think
                Eternity is a good idea and want to support it and see it grow,
                you can donate directly at this address
                <p>Eth-wallet: 0xAf47726af31C42ef57c771ea078D41cF0B0024A2</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="aboutMePage">
        <AboutMe />
        <MyMission />
        <Portfolio />
        <MyStory />
        <MyStory2 />
        <ContactMe />
        <NavBar />
        <PageSlider />
      </div>
    </>
  );
};

export default AboutMePage;
