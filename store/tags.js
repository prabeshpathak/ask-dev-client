import React, { createContext, useState, useEffect, Children } from "react";
import { publicFetch } from "../util/fetcher";

const TagContext = createContext();
const { Provider } = TagContext;

const TagProvider = ({ children }) => {
  const [tagState, setTagState] = useState(null);

  useEffect(() => {
    const fetchPopularTags = async () => {
      const { data } = await publicFetch.get("/tags/popularTags");
      setTagState(data);
    };

    fetchPopularTags();
  }, []);
  return <Provider value={{ tagState }}>{children}</Provider>;
};

export { TagContext, TagProvider };
