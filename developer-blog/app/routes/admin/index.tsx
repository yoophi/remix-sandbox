import React from "react";
import { Link } from "remix";

export default function AdminIndex() {
  return (
    <div>
      <Link to="new">Create New Post</Link>
    </div>
  );
}
