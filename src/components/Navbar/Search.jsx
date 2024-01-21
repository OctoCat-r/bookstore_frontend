import React, { useContext } from "react";
import { Button, IconButton, Input } from "@material-tailwind/react";
import { Search } from "@mui/icons-material";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

const Search1 = () => {
  const navigate = useNavigate();
  const { searchQuery, handleSearchChange, handleSearchClick } =
    useContext(SearchContext);

  return (
    <form onSubmit={handleSearchClick}>
      <div className="relative w-full gap-2 md:w-max">
        <Input
          type="search"
          placeholder="Search"
          value={searchQuery.value}
          onChange={handleSearchChange}
          containerProps={{
            className: "min-w-[288px]",
          }}
          className=" !border-t-blue-gray-300 pl-9 placeholder:text-blue-gray-300 focus:!border-blue-gray-300"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
        />
        <div className="absolute inset-y-0 right-0  flex items-center">
          <IconButton type="submit">
            <Search />
          </IconButton>
        </div>
      </div>
    </form>
  );
};

export default Search1;
