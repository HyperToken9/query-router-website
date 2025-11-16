"use client";

export default function MainButton({
  onClick = () => {},
  content = "Press Me",
  type = "button",
  isLoading = false,
  bounce = false,
  className = "",
}: {
  onClick?: () => void;
  content?: string;
  type?: "button" | "submit" | "reset";
  bounce?: boolean;
  isLoading?: boolean;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        text-base font-bold text-white
        rounded-xl px-5 py-3 bg-purple-400
        hover:px-7 hover:py-5 hover:bg-purple-500 
        ${bounce ? "hover:animate-bounce" : ""} 
        active:bg-purple-600
        transition-all duration-200 ease-in-out
        ${className}
      `}
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
