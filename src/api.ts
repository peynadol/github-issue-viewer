const token = import.meta.env.VITE_GITHUB_TOKEN;
const BASE_URL = "https://api.github.com/repos";

type fetchIssueParams = {
  author: string;
  repo: string;
};

export const fetchIssues = async ({ author, repo }: fetchIssueParams) => {
  const data = await fetch(`${BASE_URL}/${author}/${repo}/issues`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data.json();
};
