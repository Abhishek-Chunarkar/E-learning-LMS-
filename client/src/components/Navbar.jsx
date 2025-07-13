import { Menu, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div className="h-16 bg-white dark:bg-[#020817] shadow-md border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-50">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-4">
          <School size={30} />
          <Link to="/">
            <h1 className="font-extrabold text-2xl">Codemate</h1>
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-4 pr-24 py-2 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-[#0f172a] dark:text-white"
          />
          <Button
            onClick={handleSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2 text-sm"
            size="sm"
          >
            Search
          </Button>
        </div>

        {/* User & dark mode */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="/my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login?tab=login")}
              >
                Login
              </Button>
              <Button onClick={() => navigate("/login?tab=signup")}>
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">Codemate</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  );
};

export default Navbar;

// MobileNavbar
const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">Codemate</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p onClick={() => navigate("/login")}>Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
