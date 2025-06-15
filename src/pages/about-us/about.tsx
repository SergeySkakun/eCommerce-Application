import type { ReactElement } from "react";
import styles from "./about.module.css";

export function About(): ReactElement {
  return (
    <>
      <main className={styles.aboutPage}>
        <div className={styles.aboutContainer}>
          <p className={styles.title}>About us</p>
          <div className={styles.aboutContent}>
            <div className={styles.rsSchool}>
              <a className={styles.iconRS} href="https://rs.school/">
                RS School
              </a>
              <p className={styles.textRS}>
                We would like to express our gratitude to RS School and all its
                staff for giving us the opportunity to try something new and
                interesting. Thank you for your time. Special thanks to our
                mentor, who helped and motivated us on this long, difficult, but
                incredibly exciting journey.
              </p>
            </div>
            <div className={styles.myTeam}>
              <div className={styles.iconTeam}>My Team</div>
              <p className={styles.textTeam}>
                We are students who have come together as a team to create this
                project, gain new knowledge, and gain invaluable experience in
                development. It was the best time of our entire education. We
                came up with ideas, planned, and solved problems together.
              </p>
            </div>
            <div className={styles.author}>
              <div className={styles.iconAuthor1}>
                #1 <p className={styles.teamLead}>Team Lead</p>
              </div>
              <div className={styles.author1Content}>
                <div className={styles.imageAuthor1}></div>
                <div className={styles.textContent}>
                  <div className={styles.nameAuthor1}>
                    Sergey Skakun{" "}
                    <a
                      className={styles.iconGH}
                      href="https://github.com/SergeySkakun"
                    ></a>
                  </div>
                  <p className={styles.rank}>Team lead</p>
                  <p className={styles.textAuthor1}>
                    Hello. My name is Sergey. I'm a front-end developer. Almost.
                    I graduated from Grodno State University with a degree in
                    software engineering. But I worked as an electronics
                    engineer. After a few years, I began to feel that I was
                    doing everything on autopilot and work assignments did not
                    give me the same enthusiasm for finding a solution. And most
                    of the work was with printers. Since then I haven't really
                    liked them. In addition, I have a certain knowledge base,
                    although partially forgotten, but it’s better than nothing.
                    At the moment, I am most interested in WebGL, React and
                    Node.js. This interested me very much.
                  </p>
                  <p className={styles.rank}>Contribution</p>
                  <p className={styles.textAuthor1}>
                    Routing, authentication context, product cards, catalog
                    page, infinity scroll.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.author}>
              <div className={styles.iconAuthor2}>#2</div>
              <div className={styles.author2Content}>
                <div className={styles.textContent}>
                  <div className={styles.nameAuthor2}>
                    <a
                      className={styles.iconGH}
                      href="https://github.com/Bubnov-Roma"
                    ></a>
                    Roma Bubnov{" "}
                  </div>
                  <p className={styles.textAuthor2}>
                    Hello. My name is Roma Bubnov. I graduated from the Saratov
                    State Conservatory with a degree in music performance. My
                    fascination with programming started around 2019. Like many
                    people, I was curious about the world behind the software we
                    use every day. My first programming language was Java, but i
                    quickly found that JavaScript resonated with me in a way
                    that Java hadn't initially. I think it was the dynamic
                    nature of the language and its versatility. In the final
                    project, my team and I decided to try our hand at React; it
                    is on studying this JavaScript library that I would like to
                    focus further development.
                  </p>
                  <p className={styles.rank}>Contribution</p>
                  <p className={styles.textAuthor1}>
                    Login page, registration page, user profile page, basket
                    page.
                  </p>
                </div>
                <div className={styles.imageAuthor2}></div>
              </div>
            </div>
            <div className={styles.author}>
              <div className={styles.iconAuthor3}>#3</div>
              <div className={styles.author1Content}>
                <div className={styles.imageAuthor3}></div>
                <div className={styles.textContent}>
                  <div className={styles.nameAuthor1}>
                    Dmitry Starchenko{" "}
                    <a
                      className={styles.iconGH}
                      href="https://github.com/DmitryStarchenko"
                    ></a>
                  </div>
                  <p className={styles.textAuthor1}>
                    Hello, my name is Dima, I am 33 years old, and I am from the
                    city of Gomel (Belarus). I used to be an athlete, and then I
                    worked in public service for 12 years. After 12 years, I
                    grew tired of it and decided to pursue front-end
                    development. Although I have enjoyed it since my school
                    days.
                  </p>
                  <p className={styles.rank}>Contribution</p>
                  <p className={styles.textAuthor1}>
                    CommerceToolsAPI requests and tokens, basket context, main
                    page, detailed product page, about page, design and styles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
