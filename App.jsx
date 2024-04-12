import React, { useEffect, useState } from "react";
import "../src/App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter data based on search query
    const filtered = data.filter((item) => {
      // Check if any value or skill contains the search query
      return (
        Object.values(item).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(query)
        ) ||
        (item.skills &&
          item.skills.some((skill) => skill.toLowerCase().includes(query)))
      );
    });

    // If search query is empty, reload the page to fetch all data
    if (query === "") {
      window.location.reload();
    } else {
      setData(filtered);
    }
  };
  const highlightText = (text, query) => {
    if (!query.trim() || typeof text !== 'string') return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return String(text).replace(regex, '<mark>$1</mark>');
  };
  

  return (
    <div className="outer">
      <div className="search">
        <input
          type="search"
          placeholder="search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <div className="tab">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>MobileNo</th>
                <th>Skills</th>
                <th>College</th>
                <th>Degree</th>
                <th>Experience</th>
                <th>Total Exp</th>
                <th>Company</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => {
                  // console.log("Skills for item", index + 1, ":", item.skills);
                  return (
                    <tr key={index}>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(item.name, searchQuery),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(item.email, searchQuery),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            item.mobile_number,
                            searchQuery
                          ),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            item.skills ? item.skills.join(", ") : "",
                            searchQuery
                          ),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(item.college_name, searchQuery),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(item.degree, searchQuery),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(item.experience, searchQuery),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            item.total_experience,
                            searchQuery
                          ),
                        }}
                      ></td>
                      <td
                        dangerouslySetInnerHTML={{
                          __html: highlightText(
                            item.company_names,
                            searchQuery
                          ),
                        }}
                      ></td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5">No matching records found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default App;
