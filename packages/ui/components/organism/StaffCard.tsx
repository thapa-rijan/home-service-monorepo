import React from "react";
import type { User } from "@home-service/lib";
import { Card } from "../atoms/Card";
import { Button } from "./Button";

interface Props {
  user: User;
}

export const StaffCard: React.FC<Props> = ({ user }) => {
  const initials = (user.name || "")
    .split(" ")
    .map((n) => n.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const languages =
    typeof user.languages === "string"
      ? user.languages
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : Array.isArray(user.languages)
      ? user.languages
      : [];

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold">
            {initials || user.name?.charAt(0)}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-xs text-gray-500">
                {user.jobTitle || "Staff"}
              </p>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">
                {user.hourlyRate ? `Rs. ${user.hourlyRate}/hr` : "-"}
              </div>
              <div className="text-xs text-gray-500">
                {user.isActive ? "Available" : "Unavailable"}
              </div>
            </div>
          </div>

          {languages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l}
                  className="text-xs bg-muted/20 text-muted-foreground rounded-full px-2 py-1"
                >
                  {l}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-2">
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button variant="primary" size="sm">
              Hire
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StaffCard;
