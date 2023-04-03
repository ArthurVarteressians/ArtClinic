import "./NavMob.css";
import clientAvatar from "../Imgs/img2.jpg";
import Logo from "../Imgs/logo.png";
import React, { Component } from "react";
import Images from "../Imgs/Images";

class NavMob extends Component {
  toggleSidebar = () => {
    document.body.classList.toggle("open");
  };

  render() {
    return (
      <div>
        <div class="mobileVersion">
          <div class="nav">
            <div class="logoSec">
              <img class="clinicLogo" src={Logo} />
            </div>
            <div class="funSec">
              <button
                onClick={this.toggleSidebar}
                type="button"
                class="burger"
                onclick="toggleSidebar()"
              >
                <img src={clientAvatar} class="burger-avatar" />
                <span class="burger-icon"></span>
              </button>
              <aside class="sidebar">
                <img class="sidebar-avatar" src={clientAvatar} />
                <div class="sidebar-username">Client Name</div>
                <div class="sidebar-role">Our Clinic Is One Of The Bests</div>
                <nav class="sidebar-menu">
                  <button type="button">
                    <img src={Images.iconHome} />
                    <span>Home</span>
                  </button>
                  <button type="button">
                    <img src={Images.iconSettings} />
                    <span>Settings</span>
                  </button>
                  <button type="button">
                    <img src={Images.iconAcoustic} />
                    <span>Profile</span>
                  </button>
                </nav>
                <nav class="sidebar-menu bottom">
                  <button type="button">
                    <img src={Images.iconLock} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </aside>
            </div>
          </div>
        </div>
        <div>
          <div className="errorDisplay">
            <div className="errorText">
              <p>Please use bigger screen. We don't support under 330px!</p>
            </div>
            <section className="page_404">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 ">
                    <div className="col-sm-10 col-sm-offset-1  text-center">
                      <div className="four_zero_four_bg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default NavMob;
