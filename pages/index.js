import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { publicFetch } from "../util/fetcher";

import Layout from "../components/layout";
import Header from "../components/layout/Header";

const HomePage = () => {
  const router = useRouter();

  const [questions, setQuestions] = useState(null);
  const [sortType, setSortType] = useState("Votes");

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await publicFetch.get("/questions");
      setQuestions(data);
    };

    const fetchQuestionsByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`);
      setQuestions(data);
    };

    if (router.query.tag) {
      fetchQuestionsByTag();
    } else {
      fetchQuestions();
    }
  }, [router.query.tag]);

  const handleSorting = () => {
    switch (sortType) {
      case "Votes":
        return (a, b) => b.score - a.score;
    }
  };

  return <div>HOME</div>;
};

export default HomePage;
