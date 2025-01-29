import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(
      localStorage.getItem("savedCandidates") || "[]"
    );
    setSavedCandidates(storedCandidates);
  }, []);

  const rejectCandidate = (index: number) => {
    const updatedCandidates = [...savedCandidates];
    updatedCandidates.splice(index, 1);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  if (!savedCandidates.length) {
    return <h2 style={{ textAlign: "center", color: "white" }}>No candidates have been accepted!</h2>;
  }

  return (
    <div style={{ textAlign: "center", color: "white" }}>
      <h1>Potential Candidates</h1>
      <table style={{
        width: "80%",
        margin: "0 auto",
        borderCollapse: "collapse",
        backgroundColor: "black",
        color: "white"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#333", color: "white" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((candidate, index) => (
            <tr key={candidate.login} style={{ backgroundColor: index % 2 === 0 ? "#222" : "#444" }}>
              <td>
                <img src={candidate.avatar_url} alt={candidate.name} style={{ width: "50px", borderRadius: "50%" }} />
              </td>
              <td>{candidate.name || "N/A"} (<i>{candidate.login}</i>)</td>
              <td>{candidate.location || "N/A"}</td>
              <td><a href={`mailto:${candidate.email}`} style={{ color: "lightblue" }}>{candidate.email || "N/A"}</a></td>
              <td>{candidate.company || "N/A"}</td>
              <td>{candidate.bio || "N/A"}</td>
              <td>
                <button onClick={() => rejectCandidate(index)} style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>−</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
