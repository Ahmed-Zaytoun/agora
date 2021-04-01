import React from "react";
import { Helmet } from "react-helmet";
const MetaTags = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  );
};

MetaTags.defaultProps = {
  title: "Agora",
  description: "Web Dev Project",
  keywords: "Web Dev Project",
};

export default MetaTags;
