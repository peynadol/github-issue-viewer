import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Issue = {
  title: string;
  labels: { name: string }[];
  state: "open" | "closed";
  author: string;
  created_at: string;
};
export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      const truncated = title.length > 50 ? title.slice(0, 50) + "..." : title;

      return (
        <div className="text-left" title={title}>
          {truncated}
        </div>
      );
    },
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: ({ row }) => {
      const labels = row.original.labels;
      return (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <span
              key={label.name}
              className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded"
            >
              {label.name}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => {
      return <div className="text-left">{row.original.state}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => {
      const username = row.original.author;
      const profileUrl = `https://github.com/${username}`;
      return (
        <div className="text-left">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {username}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const raw = row.original.created_at;
      const formatted = new Date(raw).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      return <div className="text-left">{formatted}</div>;
    },
  },
];
