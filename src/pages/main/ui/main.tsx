import type { ReactNode } from "react";
import "./style.css";
import { ViewProducts } from "./view-products/view-products";
import { ToCatalogButton } from "../../../shared";

export function Main(): ReactNode {
  return (
    <>
      <main className="main">
        <div className="head-container">
          <p className="head-text">
            THIS IS FOR<br></br>ETERNITY
          </p>
          <ToCatalogButton />
        </div>
        <div className="sale-container">
          <div className="sale-content"></div>
        </div>
        <div className="history-container" id="history">
          <h2>COMPANY HISTORY</h2>
          <div className="content-history">
            <div className="image-history"></div>
            <p className="text-history">
              "Fust and RUSH" was founded in 2002 in Germany by three automotive
              engineers who worked for a well-known car company. They decided
              that they could create something unique based on their knowledge
              and experience. The main goal was to create cars that not only
              look attractive, but also offer the user a high level of comfort
              and safety.<br></br>
              <br></br>
              From the very beginning, the company has been committed to the
              philosophy of sustainability and environmental safety. This was
              reflected in their first models, which utilized advanced
              technology to reduce emissions and improve fuel efficiency. The
              first "Fust and RUSH" vehicles were well received by the market.
              The company quickly gained a reputation for reliability with
              quality builds and innovative solutions.<br></br>
              <br></br>
              During the first ten years of its existence, "Fust and RUSH"
              significantly expanded the range of models produced. Thanks to
              successful sales in Europe, the company was able to start
              expanding into international markets, including Asia and North
              America.
            </p>
          </div>
        </div>
        <div className="best-product-container">
          <h2>OUR BEST CARS</h2>
          <ViewProducts />
        </div>
        <div className="technology-container" id="technology">
          <h2>INNOVATION AND TECHNOLOGY</h2>
          <div className="content-technology">
            <p className="text-technology">
              Fust and RUSH emphasizes the incorporation of modern technology
              into its vehicles. It is actively working on the development of
              electric and hybrid models to significantly reduce carbon dioxide
              emissions and dependence on fossil fuels. For this purpose, the
              latest advances in battery technology and energy management are
              used.<br></br>
              <br></br>
              Equally important is the issue of safety. Fust and RUSH invests
              heavily in researching new active and passive safety systems. For
              example, autonomous driving technologies and driver assistance
              systems have become important aspects of all new models. This not
              only improves comfort, but also reduces the number of accidents on
              the road.
            </p>
            <div className="image-technology"></div>
          </div>
        </div>
      </main>
    </>
  );
}
