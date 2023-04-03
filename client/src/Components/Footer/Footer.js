import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="sb-footer sec-padding">
        <div className="sb-footer-links">
          <div className="sb-footer-links-div">
            <h4>For business</h4>
            <a href="/">
              <p>Employess</p>
            </a>
          </div>{" "}
          <div className="sb-footer-links-div">
            <h4>For business</h4>
            <a href="/">
              <p>Employess</p>
            </a>
          </div>{" "}
          <div className="sb-footer-links-div">
            <h4>For business</h4>
            <a href="/">
              <p>Employess</p>
            </a>
          </div>
          <div className="sb-footer-links-div">
            <h4>Social media</h4>
            <div className="socialMedia">
              <a href="/">
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-twitter"></i>
              </a>
              <a href="/">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className="sb-footer-below">
          <div className="sb-footer-copyright">
            <p>©{new Date().getFullYear()} Art Health. All rights reserved.</p>
          </div>
          <div className="sb-footer-below-links">
            <a href="/">
              <div>
                <p>Terms & conditions</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="/">
              <div>
                <p>cookies</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
