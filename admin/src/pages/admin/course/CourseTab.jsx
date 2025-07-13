import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
  useRemoveCourseMutation,
} from "@/features/api/courseApi";
import { useGetAllCategoriesQuery } from "@/features/api/categoryApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const location = useLocation();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);
  const { data: categoriesData, isLoading: isCategoriesLoading, isError: isCategoriesError } = 
    useGetAllCategoriesQuery();

  const [publishCourse] = usePublishCourseMutation();
  const [removeCourse, { isLoading: isRemoving }] = useRemoveCourseMutation();

  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Refetch course data when returning to this page with potential updates
  const refreshCourseData = useCallback(() => {
    if (courseId) {
      refetch();
    }
  }, [courseId, refetch]);

  // Refetch when location changes, which happens when navigating back from lecture page
  useEffect(() => {
    refreshCourseData();
  }, [location.pathname, refreshCourseData]);

  // Poll for updates every 5 seconds when the publish button is disabled
  useEffect(() => {
    let interval;
    if (courseByIdData?.course?.lectures?.length === 0) {
      interval = setInterval(() => {
        refreshCourseData();
      }, 5000); // Check every 5 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [courseByIdData?.course?.lectures?.length, refreshCourseData]);

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        refetch();
        toast.success(response.data.message);
      }
    } catch {
      toast.error("Failed to publish or unpublish course");
    }
  };

  const handleRemoveCourse = async () => {
    try {
      setDialogOpen(false);
      const response = await removeCourse(courseId);
      if (response.data) {
        toast.success(response.data.message);
        navigate("/admin/course");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to delete course");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated.");
    }
    if (error) {
      toast.error(error.data?.message || "Failed to update course");
    }
  }, [isSuccess, error, data]);

  if (courseByIdLoading) return <h1>Loading...</h1>;

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courses here. Click save when you&apos;re done.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button
            disabled={courseByIdData?.course.lectures.length === 0}
            variant="outline"
            onClick={() =>
              publishStatusHandler(
                courseByIdData?.course.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-1">
                <Trash2 className="h-4 w-4" />
                Remove Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete this
                  course and all its lectures from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleRemoveCourse}
                  disabled={isRemoving}
                >
                  {isRemoving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Course"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a fullstack developer from zero to hero"
            />
          </div>
          <div>
            <Label>Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <div>
              <Label>Category</Label>
              <Select defaultValue={input.category} onValueChange={selectCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    {isCategoriesLoading ? (
                      <div className="flex items-center justify-center p-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="ml-2">Loading categories...</span>
                      </div>
                    ) : isCategoriesError ? (
                      <div className="flex items-center text-red-500 justify-center p-2">
                        <AlertCircle className="h-4 w-4" />
                        <span className="ml-2">Failed to load categories</span>
                      </div>
                    ) : categoriesData?.categories?.length > 0 ? (
                      categoriesData.categories.map((cat) => (
                        <SelectItem key={cat._id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="Next JS">Next JS</SelectItem>
                        <SelectItem value="Java">Java</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Frontend Development">
                          Frontend Development
                        </SelectItem>
                        <SelectItem value="Fullstack Development">
                          Fullstack Development
                        </SelectItem>
                        <SelectItem value="MERN Stack Development">
                          MERN Stack Development
                        </SelectItem>
                        <SelectItem value="Javascript">Javascript</SelectItem>
                        <SelectItem value="Python">Python</SelectItem>
                        <SelectItem value="Docker">Docker</SelectItem>
                        <SelectItem value="MongoDB">MongoDB</SelectItem>
                        <SelectItem value="HTML">HTML</SelectItem>
                      </>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Course Level</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advance">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Price in INR</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="h-64 my-2 rounded-md border shadow"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={updateCourseHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
