import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "@/features/api/categoryApi";
import { Loader2 } from "lucide-react";

// Fallback categories in case API fails
const defaultCategories = [
  { id: "Next JS", label: "Next JS" },
  { id: "Data Science", label: "Data Science" },
  { id: "Frontend Development", label: "Frontend Development" },
  { id: "Fullstack Development", label: "Fullstack Development" },
  { id: "MERN Stack Development", label: "MERN Stack Development" },
  { id: "Javascript", label: "Javascript" },
  { id: "Python", label: "Python" },
  { id: "Docker", label: "Docker" },
  { id: "MongoDB", label: "MongoDB" },
  { id: "HTML", label: "HTML" },
  { id: "Java", label: "Java" },
];

const Filter = ({ handleFilterChange }) => {
  const { data: categoryData, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  
  // Transform API categories to the format needed by the component
  const categories = categoryData?.categories?.map(cat => ({
    id: cat.name,
    label: cat.name
  })) || defaultCategories;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId)
        ? prevCategories.filter((id) => id !== categoryId)
        : [...prevCategories, categoryId];

        handleFilterChange(newCategories, sortByPrice);
        return newCategories;
    });
  };

  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  }
  
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="font-semibold mb-2">CATEGORY</h1>
        {isCategoriesLoading ? (
          <div className="flex items-center space-x-2 my-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading categories...</span>
          </div>
        ) : (
          categories.map((category) => (
            <div className="flex items-center space-x-2 my-2" key={category.id}>
              <Checkbox
                id={category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category.label}
              </Label>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Filter;
