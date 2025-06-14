import { useQuery } from "@tanstack/react-query";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { type Issue } from "./Columns";
import { fetchIssues } from "../api";

export default function IssuesPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["issues"],
    queryFn: () => fetchIssues({ author: "facebook", repo: "react" }),
  });

  const issues: Issue[] =
    data?.map((issue: any) => ({
      title: issue.title,
      labels: issue.labels.map((label: any) => ({ name: label.name })),
      state: issue.state,
      author: issue.user.login,
      created_at: issue.created_at,
    })) || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">GitHub Issues</h1>
      <DataTable columns={columns} data={issues} />
    </div>
  );
}
