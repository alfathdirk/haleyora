"use client";

export default function NotAuthorized() {
  return (
    <div className="absolute items-center justify-center mb-16 text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        403
      </span>
      <h2 className="my-2 text-2xl font-bold font-heading">Not Authorized</h2>
      <p>You do not have permission to access the page.</p>
    </div>
  );
}
