import { Button } from "@/components/ui/button";
import { type ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type Issue = {
  title: string;
  labels: { name: string }[];
  state: "open" | "closed";
  author: string;
  created_at: string;
  html_url?: string;
};

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    size: 400,
    enableResizing: false,
    cell: ({ row }) => {
      const title = row.original.title;
      const url = row.original.html_url; // 👈 make sure this is provided
      const truncated =
        title.length > 100 ? title.slice(0, 100) + "..." : title;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={title}
          className="text-left text-blue-600 hover:underline block truncate pr-2"
        >
          {truncated}
        </a>
      );
    },
  },
  {
    accessorKey: "labels",
    header: "Labels",
    size: 180,
    enableResizing: false,
    cell: ({ row }) => {
      const labels = row.original.labels;
      return (
        <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
          {labels.slice(0, 3).map((label) => (
            <Badge key={label.name} variant="outline" className="text-xs">
              {label.name}
            </Badge>
          ))}
          {labels.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{labels.length - 3}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: "State",
    size: 60,
    enableResizing: false,
    cell: ({ row }) => {
      const state = row.original.state;
      const variant = state === "open" ? "default" : "secondary";
      return (
        <div className="text-left">
          <Badge variant={variant}>
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 110,
    enableResizing: false,
    cell: ({ row }) => {
      const username = row.original.author;
      const profileUrl = `https://github.com/${username}`;
      return (
        <div className="text-left">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline truncate block"
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
          className="h-8 !px-0 font-medium hover:bg-accent !justify-start text-left w-full"
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 120,
    enableResizing: false,
    cell: ({ row }) => {
      const raw = row.original.created_at;
      const formatted = new Date(raw).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];
