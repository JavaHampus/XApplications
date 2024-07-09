"use client";

import { searchApplicationAction } from "@/actions/reviewer/search-application";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ISubmitted } from "@/schemas/submitted";
import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface SearchApplicationProps {
  applicationId: string;
}

export const SearchApplication = ({
  applicationId,
}: SearchApplicationProps) => {
  const [results, setResults] = useState<ISubmitted[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = async () => {
    if (!searchQuery) return toast.error("Please enter a search query.");
    const search = await searchApplicationAction(applicationId, searchQuery);
    if (!search)
      return toast.error("No results were found for that search query.");

    return setResults(search as any);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row space-x-3 align-middle items-center">
        <Input
          placeholder="User ID..."
          className="w-80"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {results.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Application ID</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result: ISubmitted) => (
              <TableRow key={result.submittedId}>
                <TableCell>{result.userId}</TableCell>
                <TableCell>
                  <Badge>{result.status}</Badge>
                </TableCell>
                <TableCell>{result.reviewedBy}</TableCell>
                <TableCell>{result.submittedId}</TableCell>
                <TableCell>
                  {new Date(result.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className="text-right space-x-3">
                  <a
                    href={`/reviewer/${applicationId}/applications/${result.submittedId}`}
                  >
                    <Button variant="secondary">View</Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
