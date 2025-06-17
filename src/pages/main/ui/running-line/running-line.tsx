import type { ReactElement } from "react";
import "./styles.css";

export function RunningLine(): ReactElement {
  return (
    <>
      <div className="marquee marquee--8">
        <div className="marquee__item">T</div>
        <div className="marquee__item">H</div>
        <div className="marquee__item">E</div>
        <div className="marquee__item"></div>
        <div className="marquee__item">F</div>
        <div className="marquee__item">U</div>
        <div className="marquee__item">T</div>
        <div className="marquee__item">U</div>
        <div className="marquee__item">R</div>
        <div className="marquee__item">E</div>
        <div className="marquee__item"></div>
        <div className="marquee__item">I</div>
        <div className="marquee__item">S</div>
        <div className="marquee__item"></div>
        <div className="marquee__item">I</div>
        <div className="marquee__item">N</div>
        <div className="marquee__item"></div>
        <div className="marquee__item">Y</div>
        <div className="marquee__item">O</div>
        <div className="marquee__item">U</div>
        <div className="marquee__item">R</div>
        <div className="marquee__item"></div>
        <div className="marquee__item">H</div>
        <div className="marquee__item">A</div>
        <div className="marquee__item">N</div>
        <div className="marquee__item">D</div>
        <div className="marquee__item">S</div>
        <div className="marquee__item"></div>
      </div>
    </>
  );
}
