import { useQuery } from "@tanstack/react-query";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { type Issue } from "./Columns";
import { fetchIssues } from "../api";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function IssuesPage() {
  const [url, setUrl] = useState("");
  const [owner, setOwner] = useState("facebook");
  const [repo, setRepo] = useState("react");

  const { data, isPending, isError } = useQuery({
    queryKey: ["issues", owner, repo],
    queryFn: () => fetchIssues({ author: owner, repo }),
  });

  const issues: Issue[] =
    data?.map((issue: any) => ({
      title: issue.title,
      labels: issue.labels.map((label: any) => ({ name: label.name })),
      state: issue.state,
      author: issue.user.login,
      created_at: issue.created_at,
    })) || [];

  function parseRepoUrl(input: string): { owner: string; repo: string } | null {
    try {
      const parsed = new URL(input);
      const [owner, repo] = parsed.pathname.split("/").filter(Boolean);
      if (owner && repo) return { owner, repo };
    } catch (err) {
      console.error("Failed to parse repo URL:", err);
    }
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseRepoUrl(url);
    if (!parsed) return alert("Invalid GitHub repo URL");
    setOwner(parsed.owner);
    setRepo(parsed.repo);
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        GitHub Issues for{" "}
        <span className="font-mono">
          {owner}/{repo}
        </span>
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Paste a GitHub repo URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Load Issues"}
        </Button>
      </form>

      {isError && (
        <p className="mb-4 text-sm text-red-600">
          Something went wrong. Please check the repo URL.
        </p>
      )}

      {isPending && (
        <p className="mb-4 text-sm text-muted-foreground">Loading issues...</p>
      )}

      {!isPending && !isError && issues.length === 0 && (
        <p className="mb-4 text-sm text-muted-foreground">
          No issues found for this repository.
        </p>
      )}

      {!isPending && !isError && issues.length > 0 && (
        <DataTable columns={columns} data={issues} />
      )}
    </div>
  );
}
