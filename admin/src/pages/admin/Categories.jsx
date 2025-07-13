import { useState } from "react";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/features/api/categoryApi";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { data, isLoading, isError } = useGetAllCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name: categoryName.trim() }).unwrap();
      if (result.success) {
        toast.success("Category created successfully");
        setCategoryName("");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create category");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const result = await deleteCategory(id).unwrap();
        if (result.success) {
          toast.success("Category deleted successfully");
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to delete category");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin" size={30} />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={20} />
            <p>Failed to load categories</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {data?.categories?.length === 0 ? (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No categories found
                  </td>
                </tr>
              ) : (
                data?.categories?.map((category) => (
                  <tr key={category._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-900 dark:hover:text-red-400 disabled:opacity-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
            <form onSubmit={handleCreateCategory}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter category name"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 