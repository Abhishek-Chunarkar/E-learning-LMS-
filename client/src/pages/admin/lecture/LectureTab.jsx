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
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isFree, setIsFree] = useState(false);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setVideoUrl(lecture?.videoInfo?.videoUrl || "");
    }
  }, [lecture]);

  const [edtiLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] =
    useRemoveLectureMutation();

  const editLectureHandler = async () => {
    if (!lectureTitle || !videoUrl) {
      toast.error("Title and Video URL are required");
      return;
    }

    await edtiLecture({
      lectureTitle,
      videoInfo: { videoUrl },
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLectureHandler}>
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video URL <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://your.video.url.paste.here"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>

        <div className="mt-4">
          <Button disabled={isLoading} onClick={editLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
