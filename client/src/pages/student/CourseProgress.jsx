import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactPlayer from "react-player";
import CertificateTemplate from "./certificateTemplet";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureComplete = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    toast.success("Lecture marked as completed");
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <div className="flex gap-2">
          <CertificateTemplate
            courseTitle={courseTitle}
            studentName={data.data.user?.name || "Student Name"}
            courseId={courseId}
            lecturesCount={courseDetails.lectures?.length || 0}
            instructorName={courseDetails.creator?.name || "Course Instructor"}
            completed={completed}
          />
          <Button
            onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
            variant={completed ? "outline" : "default"}
          >
            {completed ? (
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>
              </div>
            ) : (
              "Mark as completed"
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 rounded-lg shadow-lg p-4 bg-white dark:bg-gray-800">
          <div className="relative w-full pb-[56.25%]">
            {currentLecture?.videoInfo?.videoUrl ||
            initialLecture?.videoInfo?.videoUrl ? (
              <div className="absolute inset-0">
                <ReactPlayer
                  url={
                    currentLecture?.videoInfo?.videoUrl ||
                    initialLecture?.videoInfo?.videoUrl
                  }
                  controls
                  width="100%"
                  height="100%"
                  className="rounded-md"
                  onEnded={() =>
                    handleLectureComplete(
                      currentLecture?._id || initialLecture?._id
                    )
                  }
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 rounded-md">
                <p className="text-center">No video available for this lecture</p>
              </div>
            )}
          </div>
          <div className="mt-4 px-1">
            <h3 className="font-medium text-lg">
              {`Lecture ${
                courseDetails.lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture._id)
                ) + 1
              } : ${
                currentLecture?.lectureTitle || initialLecture.lectureTitle
              }`}
            </h3>
            <div className="text-sm text-gray-500 mt-1">
              {isLectureCompleted(currentLecture?._id || initialLecture?._id) ? (
                <span className="flex items-center text-green-600">
                  <CheckCircle2 className="h-4 w-4 mr-2" /> You have completed this
                  lecture
                </span>
              ) : (
                <span>Watch the full video to mark this lecture as complete</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto max-h-[600px]">
            {courseDetails?.lectures.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform hover:shadow-md ${
                  lecture._id === (currentLecture?._id || initialLecture?._id)
                    ? "bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500"
                    : ""
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 🆕 Updated Progress Bar Section */}
          <div className="mt-6 p-5 bg-white dark:bg-gray-900 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Course Progress
            </h3>
            <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${(progress.length / courseDetails.lectures.length) * 100}%`,
                }}
              ></div>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                {Math.round(
                  (progress.length / courseDetails.lectures.length) * 100
                )}
                %
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {progress.length} of {courseDetails.lectures.length} lectures completed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
