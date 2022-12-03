import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthorGender = ({ authorName }: { authorName: string }) => {
  const [gender, setGender] = useState("");

  useEffect(() => {
    axios.get(`https://api.genderize.io/?name=${authorName}`).then((res) => {
      setGender(res.data.gender);
    });
  }, []);

  return <>{gender && (gender === "male" ? `🙎‍♂️` : `👩`)}</>;
};

export default AuthorGender;
