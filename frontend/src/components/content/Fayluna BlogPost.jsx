import React from "react";
import { format } from "date-fns";

const BlogPost = ({ title, author, date, content, tags = [] }) => {
  return (
    <article className="bg-white p-6 rounded-2xl shadow-md mb-6 max-w-3xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="text-sm text-gray-500 mt-1">
          By <span className="font-medium">{author}</span> on{" "}
          {format(new Date(date), "MMMM dd, yyyy")}
        </div>
      </header>

      <section className="prose max-w-none text-gray-800">
        {typeof content === "string" ? (
          <p>{content}</p>
        ) : (
          content
        )}
      </section>

      {tags.length > 0 && (
        <footer className="mt-6 border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Tags:
          </h4>
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </footer>
      )}
    </article>
  );
};

export default BlogPost;
