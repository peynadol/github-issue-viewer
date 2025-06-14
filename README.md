# GitHub Issues Viewer

A lightweight React application that fetches and displays issues from any public GitHub repository.

## Tech Stack

- React with TypeScript
- TanStack Query for data fetching
- TanStack Table for advanced data tables
- shadcn/ui and Tailwind CSS for styling
- GitHub REST API

## Features

- Accepts a GitHub repository URL as input
- Displays open issues in a sortable, paginated table
- Truncated issue titles with full text on hover
- Displays issue labels as styled badges
- Visual indicator for open/closed state
- Author links to GitHub profiles
- Formatted creation dates
- Handles loading and error states

## Live Demo

You can try the app here: [Live Site](https://github-issue-viewer-ashy.vercel.app/)

## Future Improvements

- Infinite scrolling using `useInfiniteQuery`
- Filters for issue state and labels
- Issue detail view or modal
- Avatar display for authors
- Light/dark theme toggle
