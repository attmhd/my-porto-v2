import React from "react";
import { PORTFOLIO_CONTENT as data, UI_CONTENT } from "../data/portfolioContent";
import Reveal from "./Reveal";

export const Setup: React.FC = () => {
  const setupItems = [
    { label: UI_CONTENT.setup.hardwareLabel, value: data.setup.hardware },
    { label: UI_CONTENT.setup.osLabel, value: data.setup.os },
    { label: UI_CONTENT.setup.editorLabel, value: data.setup.codeEditor },
  ];

  return (
    <section id="setup" className="dn-section dn-setup" aria-labelledby="setup-title">
      <Reveal className="dn-container dn-setup__frame" direction="scale">
        <div className="dn-setup__intro">
          <p>{UI_CONTENT.setup.label}</p>
          <h2 id="setup-title">{UI_CONTENT.setup.title}</h2>
        </div>
        <dl>
          {setupItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value || UI_CONTENT.setup.empty}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
};

export default Setup;
