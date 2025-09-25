import React from "react";
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GrantScout. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ at Cloudflare</p>
        </div>
      </div>
    </footer>
  );
};