import React from "react";
import docs from "./docs.md";
import { marked } from "marked";
export default function Page() {
  return (
    <div className="flex justify-center">
      <div
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: marked(docs) }}
      ></div>
    </div>
  );
}
