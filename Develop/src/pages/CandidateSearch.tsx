import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      const githubUsers = await searchGithub();
      const detailedCandidates = await Promise.all(
        githubUsers.map((user: { login: string }) =>
          searchGithubUser(user.login)
        )
      );
      setCandidates(detailedCandidates);
    };
    fetchCandidates();
  }, []);

  const saveCandidate = () => {
    const saved = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    saved.push(candidates[currentIndex]);
    localStorage.setItem("savedCandidates", JSON.stringify(saved));
    nextCandidate();
  };

  const nextCandidate = () => {
    if (currentIndex < candidates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCandidates([]);
    }
  };

  if (!candidates.length) {
    return <h2 style={{ textAlign: "center", color: "white" }}>No more candidates are available!</h2>;
  }

  const currentCandidate = candidates[currentIndex];

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Candidate Search</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#000",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
        margin: "0 auto"
      }}>
        <img
          src={currentCandidate.avatar_url}
          alt={currentCandidate.name}
          style={{ width: "150px", borderRadius: "50%" }}
        />
        <h2>
          {currentCandidate.name || "N/A"} (<i>{currentCandidate.login}</i>)
        </h2>
        <p>Location: {currentCandidate.location || "N/A"}</p>
        <p>Email: <a href={`mailto:${currentCandidate.email}`} style={{ color: "lightblue" }}>{currentCandidate.email || "N/A"}</a></p>
        <p>Company: {currentCandidate.company || "N/A"}</p>
        <p>Bio: {currentCandidate.bio || "N/A"}</p>
        <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer" style={{ color: "coral" }}>
          View GitHub Profile
        </a>
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
          <button
            onClick={nextCandidate}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            −
          </button>
          <button
            onClick={saveCandidate}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateSearch;
