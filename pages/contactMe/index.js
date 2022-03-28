import Navbar from "../../custom_modules/navbar";

const ContactMe = () => {
  return (
    <>
      <Navbar />
      <div className="aboutMePage">
        <div
          id="ContactMe"
          className="segment"
          style={{
            backgroundImage: 'url("ProfileImage6.png")',
            padding: "10vh 5vw 5vh 5vw",
            alignItems: "flex-start",
            animation: "none",
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
      </div>
    </>
  );
};

export default ContactMe;
