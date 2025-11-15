"use client";

export default function MainButton({
  onClick = () => {},
  content = "Press Me",
  type = "button",
  isLoading = false,
}: {
  onClick?: () => void;
  content?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        text-base font-bold text-white
        rounded-xl px-5 py-3 bg-purple-400
      "
    >
      {isLoading ? (
        <div
          className="
          animate-spin rounded-full 
          h-5 w-5 // Spinner size
          border-4 border-solid border-white border-t-transparent // Spinner style
        "
        ></div>
      ) : (
        content
      )}
    </button>
  );
}
