import React from "react";
import { usePortfolio } from "../contexts/PortfolioContext";
import MotionReveal from "./MotionReveal";

export const Setup: React.FC = () => {
  const { data } = usePortfolio();
  const setupItems = [
    { label: "Hardware", value: data.setup.hardware },
    { label: "Operating system", value: data.setup.os },
    { label: "Code editor", value: data.setup.codeEditor },
  ];

  return (
    <section id="setup" className="dn-section dn-setup" aria-labelledby="setup-title">
      <MotionReveal className="dn-container dn-setup__frame" direction="scale">
        <div className="dn-setup__intro">
          <p>Studio tools</p>
          <h2 id="setup-title">A quiet setup for focused work.</h2>
        </div>
        <dl>
          {setupItems.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value || "Updating soon"}</dd>
            </div>
          ))}
        </dl>
      </MotionReveal>
    </section>
  );
};

export default Setup;
